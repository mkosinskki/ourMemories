import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// testowy endpoint
app.get('/', (req, res) => {
  res.send('Backend works');
});


export default app;