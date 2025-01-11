import Sheet from "../models/sheet-model.js";


// Get all sheets
const getAllSheets = async (req, res) => {
    try {
        const sheets = await Sheet.find().sort({ Row: 1 });
        const formattedSheets = sheets.map(sheet => {
            const row = [];
            Object.keys(sheet.toObject()).sort().forEach(key => {
                if (key !== 'Row' && key !== '_id') {
                    console.log('key:', key, 'item:', sheet[key]);
                    row.push({ value: sheet[key] || '' });
                }
            });
            return row;
        });
        console.log('formattedSheets:', formattedSheets);


        res.status(200).json({formattedSheets});
    } catch (error) {
        console.error('Sheet controller error:', error);
        res.status(400).json({ success:false, message: 'Error getting sheets' });
    }
};


export { getAllSheets };


