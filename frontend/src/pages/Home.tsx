import {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

function Home() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const socket = io('http://localhost:3000');
        
        socket.on('welcome', (data) => {
            console.log('Received from server:', data);
            setMessage(data);
        });

        // Clean up the connection on component unmount
        return () => {
            socket.disconnect();
        };  
    }, []);

    return (
        <>
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1>SheetShare</h1>
                <p>Welcome to SheetShare ._., a simple way to share your Google Sheets with others.</p>
                <p>
                    <strong>Real-Time Update:</strong> {message || 'Waiting for updates...'}
                </p>
            </div>
        </div>

        </>
    );
}

export default Home;