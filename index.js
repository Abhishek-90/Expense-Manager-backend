import express from "express";
import cors from 'cors';
import { connectToMongoose } from './db.js';
import * as authRoutes from './routes/auth.js';
import * as transactionRoutes from './routes/transaction.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors({
  origin:'*'
}));
connectToMongoose();

app.use('/auth',authRoutes.router);
app.use('/transaction',transactionRoutes.router);

app.listen( port, () => {
  console.log(`Expense Tracker listening at http://localhost:${port}`)
})
