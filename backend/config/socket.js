
const handleSocketConnection = (socket) => {

    socket.on('join', (data) => {
        console.log(`User ${data} has joined:`, socket.id);
    });

    // Listen for 'updateCell' event and broadcast to all clients
    socket.on('updateCell', ({ row, col, value }) => {
        console.log('Cell updated:', row, col, value, "\tby", socket.id);
        socket.broadcast.emit('cellUpdated', { row, col, value });
    });    

    socket.on('disconnect', () => {
        console.log('User has left:', socket.id);
    });
};

export default handleSocketConnection;