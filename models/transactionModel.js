const mongoose = require('mongoose');
const {Schema}  = mongoose;
const user = require('./user');

const transactionSchema = new Schema({
    email:{
        type: String,
        ref:user
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

module.exports = mongoose.model('transaction',transactionSchema)
