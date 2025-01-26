import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function Chat({ onClose }: { onClose: () => void }) {
    const socketRef = useRef<any>(null);
    const [message, setMessage] = useState<string[]>([]);
    const [messages, setMessages] = useState<string[][]>([]);
    const username = localStorage.getItem('username') || 'Anonymous';

    useEffect(() => {
        socketRef.current = io(`${import.meta.env.VITE_BACKEND_URL}`);

        socketRef.current.on('newMessage', (message: string[]) => {
            console.log('newMessage:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);


    const handleSend = () => {
        socketRef.current.emit('sendMessage', message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setMessage([]);
        // clear input
        const input = document.querySelector('input');
        if (input) {
            input.value = '';
        }
    }

    return (
        <div>
            <div className='absolute top-36 right-10 w-80 z-50'>
                        <div className='card bg-white shadow-lg border border-gray-200 rounded-xl p-4'>
                            <div className='flex justify-between items-center mb-2'>
                                <h2 className='text-lg font-bold'>Chat</h2>
                                <button className='btn btn-sm btn-circle btn-ghost' onClick={onClose}>
                                    ✕
                                </button>
                            </div>
                            <div className='h-48 overflow-y-auto p-2 border rounded-lg bg-gray-100'> 
                                {messages.map((msg, idx) => (
                                    <div key={idx} className='p-1'>
                                        <div className='chat chat-start'>
                                            <div className='chat-header'>
                                                {msg[1]}
                                            </div>
                                            <div className='chat-bubble'>
                                                {msg[0]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <input
                                type='text'
                                placeholder='Type a message...'
                                className='input input-bordered w-full mt-2'
                                onChange={(e) => setMessage([e.target.value, username])}
                            />
                            <button className='btn btn-primary w-full mt-2' 
                                onClick={handleSend} onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}>
                                    Send
                            </button>
                        </div>
                    </div>
        </div>
    );
};

export default Chat;