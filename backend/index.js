import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import i18next from './i18n.js';
import i18nextMiddleware from 'i18next-http-middleware';

import memoriesRouter from "./routes/memoriesRouter.js"
import userRouter from "./routes/userRouter.js"
import locationRouter from "./routes/locationRouter.js"
import authRouter from "./routes/authRouter.js"
import path from 'path';
import { fileURLToPath } from 'url'

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());
app.use(i18nextMiddleware.handle(i18next));

app.use('/uploads', express.static(process.env.UPLOADS_DIR));

app.get('/', (req, res) => {
  res.send('Backend works');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB: ", mongoose.connection.name))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.use('/api/memories', memoriesRouter);
app.use('/api/user', userRouter);
app.use('/api/location', locationRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const errors = {};
        Object.keys(err.errors).forEach(key => {
            errors[key] = req.t(err.errors[key].message); 
        });

        return res.status(400).json({ errors });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        return res.status(409).json({
            message: req.t('duplicateKey', { field, value }) 
        });
    }
    console.error(err);
    res.status(500).json({ message: req.t('internalServerError') || 'Internal Server Error' });
});

export default app;