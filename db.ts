import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const dbUri:string = process.env.Db_Uri;

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
