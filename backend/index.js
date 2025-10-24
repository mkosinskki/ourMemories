import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";

import memoriesRouter from "./routes/memoriesRouter.js"
import userRouter from "./routes/userRouter.js"
import locationRouter from "./routes/locationRouter.js"

dotenv.config()
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend works');
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Połączono z bazą:", mongoose.connection.name))
  .catch((err) => console.error("❌ Błąd połączenia:", err));

app.use('/api/memories', memoriesRouter);
app.use('/api/user', userRouter);
app.use('/api/location', locationRouter);

export default app;