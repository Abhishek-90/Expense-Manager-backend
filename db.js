import mongoose from "mongoose";
// import { mongoose } from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const dbUri = "mongodb+srv://expensemanager:expensemanager@cluster0.ifb0d.mongodb.net/ExpenseManager?retryWrites=true&w=majority";

mongoose.set('bufferCommands', false);

const connectToMongoose = () => {
    try {
        mongoose.connect(
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
