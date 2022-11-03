import jsonwebtoken from "jsonwebtoken";
import { response, request, NextFunction } from "express";
import { encryptionKey } from "../Shared/Constants/constants";
import * as status from "../Shared/Constants/Status";
import * as F from "../Shared/CookieParser";

export const fetchUser = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  try {
    const cookie = req.headers.cookie;
    //Checking if received cookie or not
    if (!cookie) {
      return res.status(status.UNAUTHORIZED).json({ Message: "Login required" });
    }

    const cookieObject = F.customCookieParser(req.headers.cookie);
    console.log("Cookie Object = \n"+cookieObject);
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


