import mongoose, {ConnectOptions} from "mongoose"
import { databaseURL } from "./Constants/constants"

const dbUri:string = databaseURL

const connectToMongoose = () => {
    try {
        mongoose.connect(
            dbUri,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } as ConnectOptions,
            () => {
              console.log('Connected to MongoDB');
            }
        );
    } catch (error) {
        console.log(error);
    }
    
}

export { connectToMongoose };
