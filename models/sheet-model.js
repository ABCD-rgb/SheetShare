import { Schema, model } from "mongoose";

const sheetSchema = new Schema({
    Row: {
        type: Number,
        required: true
    },
    Col1: { type: String },
    Col2: { type: String },
    Col3: { type: String },
    Col4: { type: String },
    Col5: { type: String },
    Col6: { type: String },
    Col7: { type: String },
});

const Sheet = model('Sheet', sheetSchema);

export default Sheet;