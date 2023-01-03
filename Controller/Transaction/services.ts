import transaction from "../../models/transactionModel";
import { response, request } from "express";
import * as status from "../../Shared/Constants/Status";
import * as TC from "../../Shared/Constants/TransactionConstants";

export const addTransaction = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    const response = await transaction.create({
      date: req.body.date,
      email: req.body.email,
      type: req.body.type,
      amount: req.body.amount,
      description: req.body.description,
      tag: req.body.tag,
    });
    return res.status(status.OK).json({
      success: "success",
      Message: "Transaction Added Successfully",
      transaction: response,
    });
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error });
  }
};

export const getStatement = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    const statement = await transaction.find({
      email: req.body.email,
    });

    return res
      .status(status.OK)
      .json({ statement: statement, status: "success" });
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error });
  }
};

export const removeTransaction = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    await transaction.findByIdAndRemove(req.body.id);
    return res.status(status.OK).json({ status: "success" });
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error });
  }
};

export const updateTransactionDetails = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    const exists = await transaction.findById(req.body.id);

    if (!exists)
      return res
        .status(status.BADREQUEST)
        .json({ Message: "Transaction Does Not Exists", status: "success" });

    if (req.body.email !== null) {
      await transaction.findByIdAndUpdate(req.body.id, {
        type: req.body.type,
        description: req.body.description,
        amount: req.body.amount,
        tag: req.body.tag,
      });

      const response = await transaction.findById(req.body.id);

      return res.status(status.OK).json({
        success: "success",
        Message: "Transaction updated Successfully",
        transaction: response,
      });
    } else {
      return res
        .status(status.BADREQUEST)
        .json({ Message: "Unauthorised Access", status: "fail" });
    }
  } catch (error) {
    return res.status(status.BADREQUEST).json({ error });
  }
};

export const getVisualData = async (
  req: typeof request,
  res: typeof response
) => {
  try {
    const userEmail = req.body.email;
    if (userEmail !== null) {
      const databaseResponse: typeof transaction[] = await transaction.find({
        email: userEmail,
        type: TC.EXPENSE,
      });

      let expenseData = [0, 0, 0, 0, 0, 0, 0];

      if (
        databaseResponse === null ||
        databaseResponse === undefined ||
        databaseResponse.length === 0
      ) {
        return res.status(status.OK).json({ DataPresent: false });
      }

      databaseResponse.forEach((data: any) => {
        if (data.tag === TC.FOOD) {
          expenseData[0] += data.amount;
        } else if (data.tag === TC.CLOTHING) {
          expenseData[1] += data.amount;
        } else if (data.tag === TC.LUXURY) {
          expenseData[2] += data.amount;
        } else if (data.tag === TC.ENTERTAINMENT) {
          expenseData[3] += data.amount;
        } else if (data.tag === TC.TRAVEL) {
          expenseData[4] += data.amount;
        } else if (data.tag === TC.MEDICAL) {
          expenseData[5] += data.amount;
        } else if (data.tag === TC.INVESTMENT) {
          expenseData[6] += data.amount;
        }
      });

      res.status(status.OK);
      res.json({ data: expenseData });
      res.end();
      return res;
    } else {
      res.status(status.UNAUTHORIZED).json({
        Message: "Login Required",
      });
    }
  } catch (error) {
    return res.status(status.BADREQUEST).json(error);
  }
};
