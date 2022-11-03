import * as status from "../../Shared/Constants/Status";
import express from "express";
import { validationResult } from "express-validator";
import user from "../../models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import * as V from "../../Shared/Constants/constants";
import * as F from "../../Shared/CookieParser";

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

    //Generating auth token to be sent to user.
    const authToken = jsonwebtoken.sign(
      { email: req.body.email },
      V.encryptionKey
    );
    return res.status(status.CREATED).json({ authToken });
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
    res.setHeader("Access-Control-Allow-Credentials", "true");
    
    res.cookie("authToken",authToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'none',
      maxAge: new Date().getTime() + 365 * 24 * 60 * 60
    });
    return res.json({ authToken: authToken }).status(status.OK);
  } else {
    return res.status(status.NOTFOUND).json({ Message: "Invalid Credentials" });
  }
};

export const logout = (req: express.Request, res: express.Response) => {
  res.clearCookie("authToken");
  res.sendStatus(status.OK);
};

export const autoLogin = (req: express.Request, res: express.Response) => {
  const cookie = req.headers.cookie;
  const cookiesObject = F.customCookieParser(cookie);
  if(cookiesObject["authToken"]) {
    res.sendStatus(status.OK);
  } else {
    res.sendStatus(status.UNAUTHORIZED);
  }
};
