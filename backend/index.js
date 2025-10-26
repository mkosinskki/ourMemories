import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";

import memoriesRouter from "./routes/memoriesRouter.js"
import userRouter from "./routes/userRouter.js"
import locationRouter from "./routes/locationRouter.js"
import authRouter from "./routes/authRouter.js"

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

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

export default app;