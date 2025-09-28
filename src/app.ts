import express from "express";
import mongoose from "mongoose";
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

//midelware
app.use(express.json());

//conexion a mongo
mongoose.connect(process.env.MONGO_URI || '', {
    dbName: "ts-api"
}).then(() => console.log('MongoDB connected')).catch((err) => console.error('Error al conectarse', err));

//rutas
app.use('/api/users', userRoutes);

export default app;