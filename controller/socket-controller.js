
const handleSocketConnection = (socket) => {
    console.log('We have a new connection!');

    // Emit a welcome message to the client
    socket.emit('welcome', 'Hello! Welcome to SheetShare.');

    socket.on('disconnect', () => {
        console.log('User has left:', socket.id);
    });
};

export default handleSocketConnection;