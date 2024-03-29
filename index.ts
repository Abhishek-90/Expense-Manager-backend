import express from "express";
import cors from "cors";
import { connectToMongoose } from "./db";
import * as authRoutes from "./Controller/Auth/auth";
import * as transactionRoutes from "./Controller/Transaction/transaction";
import * as V from "./Shared/Constants/constants";

const app = express();

app.use(
  cors({
    origin: [V.frontendURL],
    credentials: true,
    allowedHeaders: [
      "set-cookie",
      "Content-Type",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.use(express.json());

connectToMongoose();

app.get("/", (req, res) => {
  res.json({ Message: "Server is working" });
});

app.use("/auth", authRoutes.router);
app.use("/transaction", transactionRoutes.router);

app.listen(V.port, () => {
  console.log(`Expense Tracker listening at http://localhost:${V.port}`);
});
