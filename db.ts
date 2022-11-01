import mongoose from "mongoose";
import { databaseURL } from "./Shared/Constants/constants";

export const connectToMongoose = async () => {
    await mongoose.connect(databaseURL).then(() => console.log("Expense Manager Connected to MongoDB")).catch((e) => {console.log(e)})
}
