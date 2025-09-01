import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookierParser from 'cookie-parser';
import dbConnect from './config/db.js';
import indexRoute from './routes/index.js';



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
    { origin: '*', credentials: true }
));
app.use(express.json());
app.use(cookierParser());

// Routes
app.use('/api', indexRoute);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
});