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
      "http://localhost:3000",
      "https://animated-dasik-8cb380.netlify.app/",
    ],
    credentials: true,
  })
);

app.use(express.json());

connectToMongoose();

app.use("/auth", authRoutes.router);
app.use("/transaction", transactionRoutes.router);

app.listen(V.port, () => {
  console.log(`Expense Tracker listening at http://localhost:${V.port}`);
});
