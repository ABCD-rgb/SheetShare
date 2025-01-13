import Sheet from "../models/sheet-model.js";


// Get all sheets
const getAllSheets = async (req, res) => {
    try {
        const sheets = await Sheet.find().sort({ Row: 1 });
        const formattedSheets = sheets.map(sheet => {
            const row = [];
            Object.keys(sheet.toObject()).sort().forEach(key => {
                if (key !== 'Row' && key !== '_id') {
                    row.push({ value: sheet[key] || '' });
                }
            });
            return row;
        });

        res.status(200).json({formattedSheets});
    } catch (error) {
        console.error('Sheet controller error:', error);
        res.status(400).json({ success:false, message: 'Error getting sheets' });
    }
};


// Update sheet by index (row, col)
const updateSheetByIndex = async (req, res) => {
    const { row, col, value } = req.body;
    try {
        const sheet = await Sheet.findOne({ Row: row+1 });
        sheet[`Col${col+1}`] = value;
        await sheet.save();
        
        res.status(200).json({ success: true, message: 'Sheet updated' });
    } catch (error) {
        console.error('Sheet controller error:', error);
        res.status(400).json({ success:false, message: 'Error updating sheets' });
    }

};


export { getAllSheets, updateSheetByIndex };


