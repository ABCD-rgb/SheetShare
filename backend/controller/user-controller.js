import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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


// Validate user
const validateUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if username exists
        const user = await User.find({ username });
        if (user.length === 0) {
            return res.status(400).json({ success: false, message: 'Username does not exist' });
        }

        const isValid = await bcrypt.compare(password, user[0].password);
        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

        // Create token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ success: true, token, message: 'User validated' });
        
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating user' });
    }
};


export { createUser, validateUser };