import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaMessage, FaCodeCompare } from 'react-icons/fa6';
import Spreadsheet from 'react-spreadsheet';

function Sheet() {
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        fetchSheets();
    }, []);

    const [data, setData] = useState([]);
    const [activeCell, setActiveCell] = useState({ row: null, col: null });
    const [previousCell, setPreviousCell] = useState({ row: null, col: null });

    // const [data, setData] = useState([
    //     [{ value: 'ID' }, { value: 'Name' }, { value: 'Age' }],
    //     [{ value: 1 }, { value: 'John Doe' }, { value: 28 }],
    //     [{ value: 2 }, { value: 'Jane Smith' }, { value: 34 }]
    //   ]);

    const handleChange = (newData: any) => {
        if (activeCell.row !== null && activeCell.col !== null) {
            const { row, col } = activeCell;
            setPreviousCell({ row, col });  // update previous cell (for determinining which cell was previously active)
        }
        setData(newData);
    };

    const handleSelect = (selection: any) => {
        if (!selection || !selection.range || !selection.range.start) {
            return;
        }
        const { row, column } = selection.range.start;
        setActiveCell({ row, col: column });

        // If a cell was previously active and is not the same as the current active cell, update the value (on frontend and backend)
        if (previousCell.row !== null && previousCell.col !== null && (previousCell.row !== row || previousCell.col !== column)) {
            const newValue = data[previousCell.row][previousCell.col];

            // console.log('previousCell:', previousCell, 'activeCell', activeCell, 'newValue:', newValue);
            updateSheet(previousCell.row, previousCell.col, newValue['value']);
        }
    };


     

    // ====  API calls ====
        // Get sheets
    const fetchSheets = async () => {
        try {
            const res = await axios.get('http://localhost:3000/sheets/getAllSheets');
            const sheets = res.data.formattedSheets;
            setData(sheets);
        } catch (error) {
            console.error("fetchSheetsError:",error);
        }
    };

    const updateSheet = async (_row: number, _col: number, _value: string) => {
        try {
            await axios.put('http://localhost:3000/sheets/updateSheetByIndex', {
                row: _row,
                col: _col,
                value: _value
            });
            console.log(`Cell updated: Row ${_row}, Col ${_col}, Value: ${_value}`);
        } catch (error) {
            console.error('updateSheetError:', error);
        }
    }
    // =====================


      
    return authToken ? (
        <div className='flex flex-col min-h-screen ml-8 mr-8 mt-8'>
            <Header />
            <div className='flex justify-end'>
                <FaCodeCompare className='mr-8 text-2xl' />
                <FaMessage className='mr-8 text-2xl'/>
            </div>
            <div className='grow flex justify-center items-center'>
                <Spreadsheet data={data} onChange={handleChange}  onSelect={handleSelect}/>
            </div>
        </div>
    ) 
    : <Navigate to='/' />;
}

export default Sheet;