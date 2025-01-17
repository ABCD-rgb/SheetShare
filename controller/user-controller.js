import bcrypt from 'bcrypt';
import User from '../models/user-model.js';


const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        const existing = await User.find({ username });
        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: 'Username already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User created' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating user' });
    }
};



export { createUser };