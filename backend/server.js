import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use(cors(corsOptions));

// TODO: mongodb connection


router(app);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});