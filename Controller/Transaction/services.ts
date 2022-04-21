import transaction from '../../models/transactionModel';
import { response, request } from 'express';

export const addTransaction =  async (req:typeof request,res:typeof response)=>{
  try{
      const response = await transaction.create({
          email:req.body.email,
          type:req.body.type,
          amount: req.body.amount,
          description: req.body.description,
          tag: req.body.tag
      });

      if(response !== null){
          return res.send({status:'success'});
      }
  }
  catch(error){
      return res.send(400).json({error});
  }
}

export const getStatement = async (req:typeof request,res:typeof response)=>{
    try{
        const statement = await transaction.find({
            email:req.body.email,
        });
        
        return res.status(200).send({'statement':statement, status:'success'});
    }
    catch(error){
        return res.status(400).json({error});
    }
}

export const removeTransaction = async (req:typeof request,res:typeof response)=>{
    try{
        
        if(req.body.email !== null){
            const response = await transaction.findByIdAndRemove(req.body.id);
            return res.status(200).send({status:'success'});
        }
        else{
            return res.status(404).send({"Message":"Unauthorised Access", status:'fail'});
        }
    }
    catch(error){
        return res.status(400).send({status: 'fail'});
    }
}

export const updateTransactionDetails = async (req:typeof request,res:typeof response) =>{
    try{

        const exists = await transaction.findById(req.body.id);

        if(!exists)
            return res.send(400).send({Message: 'Transaction Does Not Exists', status: 'success'});
        
        if(req.body.email !== null){
            const response = await transaction.findByIdAndUpdate(req.body.id ,
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
}
