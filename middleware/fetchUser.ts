import jsonwebtoken from "jsonwebtoken";
import { response, request, NextFunction } from "express";
import { encryptionKey } from "../Constants/constants";
import * as status from "../Constants/Status";

export const fetchUser = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  try {
    const token = req.body.authToken;
    console.log(req.headers.cookie);

    if (!token) {
      return res.status(status.UNAUTHORIZED).json({ Message: "Login required" });
    }

    const data = jsonwebtoken.verify(token, encryptionKey) as { email: string };
    req.body.email = data.email;
    next();
  } catch (error: any) {
    return res.status(status.BADREQUEST).json({ error });
  }
};
