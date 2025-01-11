import Sheet from "../models/sheet-model.js";


// Get all sheets
const getAllSheets = async (req, res) => {
    try {
        const sheets = await Sheet.find();
        res.status(200).json({success: true, data: sheets});
    } catch (error) {
        console.error('Sheet controller error:', error);
        res.status(400).json({ success:false, message: 'Error getting sheets' });
    }
};


export { getAllSheets };


