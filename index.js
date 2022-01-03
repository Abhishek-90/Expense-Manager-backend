import express from "express";
import cors from 'cors';
import { connectToMongoose } from './db.js';
import * as authRoutes from './routes/auth.js';
import * as transactionRoutes from './routes/transaction.js'

const app = express()
app.use(cors());
app.use(express.json());
connectToMongoose();

const port = process.env.PORT || 5000

app.use('/auth',authRoutes.router);
app.use('/transaction',transactionRoutes.router);

app.listen( port, () => {
  console.log(`Expense Tracker listening at http://localhost:${port}`)
})
