import jsonwebtoken from "jsonwebtoken";
import { response, request, NextFunction } from "express";
import { encryptionKey } from "../Constants/constants";
import * as status from "../Constants/Status";
import * as F from "./CookieParser";

export const fetchUser = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.cookie;
    //Checking if received cookie or not
    console.log(cookie);
    if (!cookie) {
      return res.status(status.UNAUTHORIZED).json({ Message: "Login required" });
    }

    const cookieObject = F.customCookieParser(cookie);
    //Checking if authToken cookie is present or not
    if(!cookieObject["authToken"]) {
      return res.status(status.UNAUTHORIZED).json({ Message: "Login required" });
    }

    const data = jsonwebtoken.verify(cookieObject["authToken"], encryptionKey) as { email: string };
    req.body.email = data.email;
    next();
  } catch (error: any) {
    return res.status(status.BADREQUEST).json({ error });
  }
};


