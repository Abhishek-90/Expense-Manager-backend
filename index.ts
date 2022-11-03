import express from "express";
import cors from "cors";
import { connectToMongoose } from "./db";
import * as authRoutes from "./Controller/Auth/auth";
import * as transactionRoutes from "./Controller/Transaction/transaction";
import * as V from "./Shared/Constants/constants";

const app = express();

app.use(
  cors({
    origin: [
      V.frontendURL
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"], 
  })
);

app.use(express.json());

connectToMongoose();

app.get("/", (req, res) => {
  res.json({Message:"Server is working"}).cookie("Temp Cookie","Abhishek");
});

app.use("/auth", authRoutes.router);
app.use("/transaction", transactionRoutes.router);

app.listen(V.port, () => {
  console.log(`Expense Tracker listening at http://localhost:${V.port}`);
});
