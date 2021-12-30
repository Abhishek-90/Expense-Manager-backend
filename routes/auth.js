import express from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();
import bcrypt from 'bcrypt';
import user from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const secret = process.env.Secret_Key;

//ROUTE 1: API Endpoint for new User Registration. No Login Required.
router.post('/signup',
    [
        body('email').isEmail().withMessage("Enter Valid Email Address."),
        body('password').isLength({min: 8}).withMessage("Minimum 8 characters Password")
    ]
,async (req,res)=>{
    // Storing errors in input data inside errors
    const errors = validationResult(req);

    try{
        if(!errors.isEmpty()){
            //If there are errors in the data sent, don't proceed further.
            console.log("Error in input.")
            return res.status(400).send({errors});
        }
        
        //Checking if Email address entered by user while sign up is laready associated with another Profile.
        const exists = await user.findOne({
            email: req.body.email
        });

        if(exists){
            //Email address already associated with another ID.
            return res.status(400).json({"Message":"User Id Already Taken.", 'status':'fail'});
        }
        
        //Encrypting Password before storing it into database
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const response = await user.create({
            name:req.body.name,
            email: req.body.email,
            password: secPass
        });

        //Generating auth token to be sent to user.
        const authToken = jsonwebtoken.sign({email:req.body.email},secret);
        return res.status(200).send({'authToken': authToken, 'status':'success'});
    }
    catch(e){
        console.log("Error in Catch.")
        return res.status(400).json({error:e});
    }
})

//ROUTE 2: API Endpoint for existing users to login. No Login Required.
router.post('/login',
    [
        body('email').isEmail().withMessage("Enter Valid Email Address.")
    ]
,async (req,res)=>{
    // Storing errors in input data inside errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //Email address already associated with another ID. 
        return res.status(400).send({errors, 'status' : 'fail'});
    }

    const response = await user.findOne({
        email: req.body.email,
    });

    if(response === null)
        return res.status(400).send({"Message":"Invalid Credentials", 'status': 'fail'});

    const passwordValidation = bcrypt.compare(req.body.password, response.password);

    if(passwordValidation){
        const authToken = jsonwebtoken.sign({email:req.body.email},secret);
        return res.send({'authToken':authToken, 'status' :'success'});

    }else{
        return res.status(404).json({Message: "Invalid Credentials",status:'fail'});
    }
})

export { router };
