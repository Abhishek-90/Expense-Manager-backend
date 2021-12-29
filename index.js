const express = require('express')
const cors = require('cors');
const {connectToMongoose} = require('./db');
const app = express()
const port = 5000

app.use(express.json());
app.use(cors());
connectToMongoose();

app.use('/auth',require('./routes/auth'));
app.use('/transaction',require('./routes/transaction'));

app.listen(port, () => {
  console.log(`Expense Tracker listening at http://localhost:${port}`)
})
