import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';


dotenv.config();

const app = express();

//midelware
app.use(express.json());

//rutas
app.use('/api/users', userRoutes);

//conexion a mongo
mongoose.connect(process.env.MONGO_URI || '').then(() => console.log('MongoDB connected')).catch((err) => console.error('Error al conectarse', err));


export default app;