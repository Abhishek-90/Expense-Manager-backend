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
    const cookie = req.headers.cookie;
    if (!cookie) {
      return res.status(status.UNAUTHORIZED).json({ Message: "Login required" });
    }

    const cookieObject = customCookieParser(req.headers.cookie);
    console.log(cookieObject["authToken"]);
    const data = jsonwebtoken.verify(cookieObject["authToken"], encryptionKey) as { email: string };
    req.body.email = data.email;
    next();
  } catch (error: any) {
    return res.status(status.BADREQUEST).json({ error });
  }
};

const customCookieParser = (cookie:string|undefined):any => {
  const cookieArray = cookie?.split(";");
  let cookieObject = {};
  cookieArray?.forEach(cookie => {
    const key = cookie.split("=")[0];
    const value = cookie.split("=")[1];
    cookieObject = {...cookieObject, [key]:value};
  })

  return cookieObject;
}
