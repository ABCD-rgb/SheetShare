import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import { FaMessage, FaCodeCompare } from 'react-icons/fa6';
import Spreadsheet from 'react-spreadsheet';

function Sheet() {
    const authToken = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const socketRef = useRef<any>(null);

    
    useEffect(() => {
        fetchSheets();

        socketRef.current = io('http://localhost:3000');
        socketRef.current.emit('join', username);

        // listen for cell updates from the server
        socketRef.current.on('cellUpdated', ({ row, col, value }: { row: number, col: number, value: string }) => {
            setData((prevData) => {
                if (activeCell.row === row && activeCell.col === col) {
                    return prevData;  // do not update the active cell
                };
                const newData = [...prevData];
                console.log("newData:", newData, "row:", row, "col:", col, "value:", value);
                newData[row][col] = { value };
                return newData;
            });
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const [data, setData] = useState<{ value: any }[][]>([]);
    const [activeCell, setActiveCell] = useState({ row: null, col: null });
    const [previousCell, setPreviousCell] = useState({ row: null, col: null });
    const [isUpdating, setIsUpdating] = useState(false);

    // const [data, setData] = useState([
    //     [{ value: 'ID' }, { value: 'Name' }, { value: 'Age' }],
    //     [{ value: 1 }, { value: 'John Doe' }, { value: 28 }],
    //     [{ value: 2 }, { value: 'Jane Smith' }, { value: 34 }]
    //   ]);

    const handleChange = (newData: any) => {
        console.log("handleChange")
        if (activeCell.row !== null && activeCell.col !== null) {
            const { row, col } = activeCell;
            setPreviousCell({ row, col });  // update previous cell (for determinining which cell was previously active)
        }
        setData(newData);
    };

    const handleSelect = (selection: any) => {
        console.log("handleSelect")
        if (!selection || !selection.range || !selection.range.start) {
            return;
        }
        const { row, column } = selection.range.start;
        setActiveCell({ row, col: column });

        // If a cell was previously active and is not the same as the current active cell, update the value (on frontend and backend)
        if (previousCell.row !== null && previousCell.col !== null && (previousCell.row !== row || previousCell.col !== column)) {
            const newValue = data[previousCell.row][previousCell.col];

            // console.log('previousCell:', previousCell, 'activeCell', activeCell, 'newValue:', newValue);
            if (newValue['value'] !== data[row][column]['value']) {
                updateSheet(previousCell.row, previousCell.col, newValue['value']);
            };
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
        if (isUpdating) return;
        setIsUpdating(true);

        try {
            await axios.put('http://localhost:3000/sheets/updateSheetByIndex', {
                row: _row,
                col: _col,
                value: _value
            });

            // Send cell update to all clients
            socketRef.current.emit('updateCell', {
                row: _row,
                col: _col,
                value: _value
            });

            console.log(`Cell updated: Row ${_row}, Col ${_col}, Value: ${_value}`);
        } catch (error) {
            console.error('updateSheetError:', error);
        } finally {
            setIsUpdating(false);
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