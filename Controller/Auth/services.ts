import express from "express";
import { validationResult } from "express-validator";
import user from "../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as status from "../../Shared/Constants/Status";
import * as V from "../../Shared/Constants/constants";
import * as F from "../../Shared/middleware/CookieParser";

export const signup = async (req: express.Request, res: express.Response) => {
  // Storing errors in input data inside errors
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      //If there are errors in the data sent, don't proceed further.
      return res.status(status.BADREQUEST).json({ errors });
    }
    //Checking if Email address entered by user while sign up is laready associated with another Profile.
    const exists = await user.find({
      email: req.body.email,
    });

    if (exists.length !== 0) {
      //Email address already associated with another ID.
      return res
        .status(status.BADREQUEST)
        .json({ Message: "User Id Already Taken.", status: "fail" });
    }

    //Encrypting Password before storing it into database
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const response = await user
      .create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      .then()
      .catch((e) => console.log(e));
    console.log("Response\n"+response);

    //Generating auth token to be sent to user.
    const authToken = jsonwebtoken.sign(
      { email: req.body.email },
      V.encryptionKey
    );

    res.cookie("authToken",authToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'none',
      maxAge: new Date().getTime() + 365 * 24 * 60 * 60,
      secure: true
    });
    
    res.sendStatus(status.CREATED);
  } catch (e) {
    return res.status(status.BADREQUEST).json({ error: e });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  // Storing errors in input data inside errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    //Email address already associated with another ID.
    return res.status(status.BADREQUEST).send({ errors });
  }

  const response = await user.findOne({
    email: req.body.email,
  });

  if (response === null)
    return res
      .status(status.BADREQUEST)
      .json({ Message: "Invalid Credentials" });

  const passwordValidation: boolean = await bcrypt.compare(
    req.body.password,
    response.password
  );

  if (passwordValidation) {
    const authToken = jsonwebtoken.sign(
      { email: req.body.email },
      V.encryptionKey
    );
    res.cookie("authToken",authToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'none',
      maxAge: new Date().getTime() + 365 * 24 * 60 * 60,
      secure: true
    });
    return res.json({ authToken: authToken }).status(status.OK);
  } else {
    return res.status(status.NOTFOUND).json({ Message: "Invalid Credentials" });
  }
};

export const logout = (req: express.Request, res: express.Response) => {
  res.clearCookie("authToken", {
    path: "/",
    httpOnly: true,
    sameSite: 'none',
    maxAge: new Date().getTime() + 365 * 24 * 60 * 60,
    secure: true
  });
  res.sendStatus(status.OK);
};

export const autoLogin = async (req: express.Request, res: express.Response) => {
  const cookie = req.headers.cookie;
  const cookiesObject = F.customCookieParser(cookie);

  try {
    if(cookiesObject["authToken"] === null || cookiesObject["authToken"]?.trim().length === 0) {
      return res.sendStatus(status.UNAUTHORIZED);
    }
  
    const result:any = jsonwebtoken.verify(cookiesObject["authToken"], V.encryptionKey);
    const response = await user.findOne({
      email: result["email"],
    });
    
    if(response === null) {
      return res.sendStatus(status.UNAUTHORIZED);
    }
  
    return res.sendStatus(status.OK);
  } catch (error) {
    res.status(status.BADREQUEST).json({error});
  }
};
