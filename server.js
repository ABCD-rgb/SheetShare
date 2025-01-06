import express from 'express';
import cors from 'cors';
import { createServer } from 'http'; // For creating an HTTP server
import { Server } from 'socket.io'; // For WebSocket support
import router from './router.js';
import handleSocketConnection from './controller/socket-controller.js';

const app = express();
app.use(express.json());

const httpServer = createServer(app);   // to be able to combine API and WebSocket in one server
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173'], // Allow frontend to connect
        credentials: true,
    },
});

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use(cors(corsOptions));

// TODO: mongodb connection


// API routes
router(app);

// WebSocket connection
io.on('connection', handleSocketConnection);


httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
});