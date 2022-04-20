import jsonwebtoken from 'jsonwebtoken';
import { Router, response, request } from 'express';
import { ICustomRequest } from './Interfaces';
import { encryptionKey } from '../Constants/constants';

const fetchUser = (req:typeof request, res:typeof response,next:Router) => {
    const token = req.header('authToken') || "token";
    
    if(!token){
        res.status(401).send({error:"Login Using valid Credentials"});
    }

    try {
        const data = jsonwebtoken.verify(token,encryptionKey) as {email:string};
        req.body.email = data.email;
        next(req,res);        
    } catch (error) {
        return res.status(400).send({error:"No message"});
    }
}

export {fetchUser};
