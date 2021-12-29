const jwttoken = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = 'expensemanager';

const fetchuser = (req,res,next) => {

    const token = req.header('authToken');
    if(!token){
        res.status(401).send({error:"Login Using valid Credentials"});
    }

    try {
        const data = jwttoken.verify(token,secret);
        req.email = data.email;
        next();        
    } catch (error) {
        return res.status(400).send({error:"No message"});
    }
}

module.exports = fetchuser;
