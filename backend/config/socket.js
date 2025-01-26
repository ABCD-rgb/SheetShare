import Sheet from "../models/sheet-model.js";


const handleSocketConnection = (socket) => {
    var clients = {};

    socket.on('join', async (data) => {
        console.log(`User ${data} has joined:`, socket.id);

        try {
            const sheets = await Sheet.find().sort({ Row: 1 });
            const formattedSheets = sheets.map(sheet => {
                const row = [];
                Object.keys(sheet.toObject()).sort().forEach(key => {
                    if (key !== 'Row' && key !== '_id') {
                        row.push({ value: sheet[key] || '' });
                    }
                });
                return row;
            });
            socket.emit('initialSheetData', formattedSheets);
        } catch (error) {
            console.error('Error fetching sheet data:', error);
        }

        clients[socket.id] = data;
    });

    // Listen for 'updateCell' event and broadcast to all clients
    socket.on('updateCell', async ({ row, col, value }) => {
        
        try {
            const sheet = await Sheet.findOne({ Row: row+1 });
            sheet[`Col${col+1}`] = value;
            await sheet.save();
            console.log('[', clients[socket.id], '] Cell updated:', row, col, value);
            
            socket.broadcast.emit('cellUpdated', { row, col, value });
        } catch (error) {
            console.error('Error updating sheet cell:', error);
        }
        
        
    });    

    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User has left:', socket.id);
    });
};

export default handleSocketConnection;