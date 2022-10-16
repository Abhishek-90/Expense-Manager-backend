import transaction from "../../models/transactionModel"
import { response, request } from "express"
import * as status from "../../Constants/Status"

export const addTransaction = async (
  req: typeof request,
  res: typeof response
) => {
  console.log("Request Body:\n",req.cookies);
  try {
    await transaction.create({
      date: req.body.date,
      email: req.body.email,
      type: req.body.type,
      amount: req.body.amount,
      description: req.body.description,
      tag: req.body.tag,
    })

    return res.status(status.OK).json({
      success: "success",
      Message: "Transaction Added Successfully",
    })
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error })
  }
}

export const getStatement = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    const statement = await transaction.find({
      email: req.body.email,
    })

    return res
      .status(status.OK)
      .json({ statement: statement, status: "success" })
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error })
  }
}

export const removeTransaction = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    await transaction.findByIdAndRemove(req.body.id)
    return res.status(status.OK).json({ status: "success" })
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error })
  }
}

export const updateTransactionDetails = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    const exists = await transaction.findById(req.body.id)

    if (!exists)
      return res
        .status(status.BADREQUEST)
        .json({ Message: "Transaction Does Not Exists", status: "success" })

    if (req.body.email !== null) {
      await transaction.findByIdAndUpdate(req.body.id, {
        type: req.body.type,
        description: req.body.description,
        amount: req.body.amount,
        tag: req.body.tag,
      })

      return res.status(status.OK).json({
        success: "success",
        Message: "Transaction updated Successfully",
      })
    } else {
      return res
        .status(status.BADREQUEST)
        .json({ Message: "Unauthorised Access", status: "fail" })
    }
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error })
  }
}
