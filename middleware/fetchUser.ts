import jsonwebtoken from "jsonwebtoken";
import { response, request, NextFunction } from "express";
import { encryptionKey } from "../Constants/constants";
import * as status from "../Constants/Status";

const fetchUser = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  const token = req.header("authToken");
  
  if (!token) {
    return res.status(status.NOTFOUND).json({ Messgae: "Login required" });
  }

  try {
    const data = jsonwebtoken.verify(token, encryptionKey) as { email: string };
    req.body.email = data.email;
    console.log("Before calling next()");
    next();
  } catch (error: any) {
    return res.status(status.BADREQUEST).json({ error,"PM":"PM" });
  }
};

export { fetchUser };
