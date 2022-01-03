// import mongoose from "mongoose";
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const dbUri = "mongodb+srv://expensemanager:expensemanager@cluster0.ifb0d.mongodb.net/ExpenseManager?retryWrites=true&w=majority";

const connectToMongoose = () => {
    try {
        MongoClient.connect(
            dbUri,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
            () => {
              console.log('Connected to MongoDB');
            }
        );
    } catch (error) {
        console.log(error);
    }
    
}

export { connectToMongoose };
