import { Request, Response } from "express"

export interface ICustomRequest extends Request {
  email?:string
}