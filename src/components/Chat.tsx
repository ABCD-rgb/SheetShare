

function Chat({ onClose }: { onClose: () => void }) {
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
                                <p className='text-sm text-gray-600'>Welcome to the chat!</p>
                                {/* Add chat messages here */}
                            </div>
                            <input
                                type='text'
                                placeholder='Type a message...'
                                className='input input-bordered w-full mt-2'
                            />
                            <button className='btn btn-primary w-full mt-2'>Send</button>
                        </div>
                    </div>
        </div>
    );
};

export default Chat;