const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchUser  = require('../middleware/fetchUser');
const router = express.Router();
const Transaction = require('../models/transactionModel');

//ROUTE 1: API Enpoint to add about the transactions the User Makes. Login Required.
router.post('/addtransaction',
    fetchUser
,async (req,res)=>{
    try{
        const response = await Transaction.create({
            email:req.email,
            type:req.body.type,
            amount: req.body.amount,
            description: req.body.description,
            tag: req.body.tag
        });
        // console.log(response);

        if(response !== null){
            return res.send({status:'success'});
        }
    }
    catch(error){
        return res.status(400).json({error});
    }
})

//ROUTE 2: API Enpoint to get transaction statement of the user. Login Required.
router.get('/statement',
    fetchUser
,async (req,res)=>{
    try{
        const statement = await Transaction.find({
            email:req.email,
        });
        
        return res.status(200).send({'statement':statement, status:'success'});
    }
    catch(error){
        return res.status(400).json({error});
    }
})

//ROUTE 3: API Enpoint to Delete a transaction of the user. Login Required.
router.delete('/remove',
    fetchUser
,async (req,res)=>{
    try{
        
        if(req.email !== null){
            const response = await Transaction.findByIdAndRemove(req.body.id);
            return res.status(200).send({status:'success'});
        }
        else{
            return res.status(404).send({"Message":"Unauthorised Access", status:'fail'});
        }
    }
    catch(error){
        return res.status(400).send({status: 'fail'});
    }
})

//ROUTE 4: API Enpoint to Update transaction information of the user. Login Required.
router.put('/update',
    fetchUser
,async (req,res)=>{
    try{

        const exists = await Transaction.findById(req.body.id);

        if(!exists)
            return res.send(400).send({Message: 'Transaction Does Not Exists', status: 'success'});
        
        if(req.email !== null){
            const response = await Transaction.findByIdAndUpdate(req.body.id ,
                {
                    type: req.body.type,
                    description: req.body.description,
                    amount: req.body.amount,
                    tag: req.body.tag
            })
            return res.status(200).send({status:'success'});
        }
        else{
            return res.status(404).send({"Message":"Unauthorised Access", status: 'fail'});
        }
    }
    catch(error){
        return res.status(400).json({error});
    }
})

module.exports = router;
