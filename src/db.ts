import mongoose, {ConnectOptions} from "mongoose"
import { databaseURL } from "../Constants/constants"

const dbUri:string = databaseURL

export const connectToMongoose = async () => {
    await mongoose.connect(dbUri).then(() => console.log("Expense Manager Connected to MongoDB")).catch((e) => {console.log(e)})
}
