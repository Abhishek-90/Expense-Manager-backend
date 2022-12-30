import express from "express";
import { fetchUser } from "../../Shared/middleware/fetchUser";
const router = express.Router();
import * as service from "./services";

//ROUTE 1: API Enpoint to add about the transactions the User Makes. Login Required.
router.post("/addtransaction", fetchUser, service.addTransaction);

//ROUTE 2: API Enpoint to get transaction statement of the user. Login Required.
router.get("/statement", fetchUser, service.getStatement);

//ROUTE 3: API Enpoint to Delete a transaction of the user. Login Required.
router.delete("/remove", fetchUser, service.removeTransaction);

//ROUTE 4: API Enpoint to Update transaction information of the user. Login Required.
router.put("/update", fetchUser, service.updateTransactionDetails);

//ROUTE 5: API Enpoint to GET transaction details for Visualization. Login Required.
router.get("/getVisualData", fetchUser, service.getVisualData);

export { router };
