import express from "express";
import cors from 'cors';
import { connectToMongoose } from './db';
import * as authRoutes from './Controller/Auth/auth';
import * as transactionRoutes from './Controller/Transaction/transaction'

const app = express();

app.use(cors({
  origin:"http://localhost:3000",
  // allowedHeaders:'Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
  credentials: true
}))

app.use(express.json());

connectToMongoose();

const port = process.env.PORT || 5000

app.use('/auth',authRoutes.router);
app.use('/transaction',transactionRoutes.router);

app.listen( port, () => {
  console.log(`Expense Tracker listening at http://localhost:${port}`)
})
