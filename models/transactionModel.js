import mongoose from 'mongoose';
const {Schema}  = mongoose;
import user from './user.js';

const transactionSchema = new Schema({
    email:{
        type: String,
        ref: user
    },
    date:{
        type: Date,
        default: () => Date.now()
    },
    type:{
        type: String,
        required: true
    },
    amount:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tag:{
        type: String,
        required: true
    }
})

export default mongoose.model("transaction", transactionSchema);
