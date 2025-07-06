import express from 'express';
import cors from 'cors';
import DbConnect from './utils/db.js';

import announceRouter from './routes/announceRoute.js';
import quizRouter from './routes/quizRoute.js'
const app = express();

const PORT = 5000;

// Connect to MongoDB
DbConnect();

// Middleware
app.use(cors());
app.use(express.json());

// Test root route
app.get("/", (req, res) => res.status(200).send("Welcome 😄"));

app.use(announceRouter);
app.use(quizRouter);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
