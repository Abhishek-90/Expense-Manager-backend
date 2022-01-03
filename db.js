import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

const dbUri = "mongodb+srv://expensemanager:expensemanager@cluster0.ifb0d.mongodb.net/ExpenseManager?retryWrites=true&w=majority";

const connectToMongoose = () => {
    mongoose.connect(
        dbUri,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        () => {
          console.log('Connected to MongoDB');
        }
      );
}

export { connectToMongoose };
