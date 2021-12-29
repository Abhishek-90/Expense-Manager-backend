const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbUri = "mongodb+srv://expensemanager:expensemanager@cluster0.jjc6p.mongodb.net/expensemanager?retryWrites=true&w=majority";

const connectToMongoose = () => {
    mongoose.connect(dbUri, ()=>{
        console.log("Connected to Mongoose Database");
    })
}

module.exports = {connectToMongoose};
