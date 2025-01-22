
const handleSocketConnection = (socket) => {
    var clients = {};

    socket.on('join', (data) => {
        console.log(`User ${data} has joined:`, socket.id);
        clients[socket.id] = data;
    });

    // Listen for 'updateCell' event and broadcast to all clients
    socket.on('updateCell', ({ row, col, value }) => {
        console.log('[', clients[socket.id], '] Cell updated:', row, col, value);
        socket.broadcast.emit('cellUpdated', { row, col, value });
    });    

    socket.on('disconnect', () => {
        console.log('User has left:', socket.id);
    });
};

export default handleSocketConnection;