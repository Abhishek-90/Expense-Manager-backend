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