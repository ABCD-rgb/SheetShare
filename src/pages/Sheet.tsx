import { useState } from 'react';
import Header from '../components/Header';
import { FaMessage, FaCodeCompare } from 'react-icons/fa6';
import Spreadsheet from 'react-spreadsheet';


function Sheet() {
    const [data, setData] = useState([
        [{ value: 'ID' }, { value: 'Name' }, { value: 'Age' }],
        [{ value: 1 }, { value: 'John Doe' }, { value: 28 }],
        [{ value: 2 }, { value: 'Jane Smith' }, { value: 34 }]
      ]);

      
    return(
        <div className='flex flex-col min-h-screen ml-8 mr-8 mt-8'>
            <Header />
            <div className='flex justify-end'>
                <FaCodeCompare className='mr-8 text-2xl' />
                <FaMessage className='mr-8 text-2xl'/>
            </div>
            <div className='grow flex justify-center items-center'>
                <Spreadsheet data={data} onChange={setData} />
            </div>
        </div>
    );
}

export default Sheet;