import jsonwebtoken from "jsonwebtoken"
import { response, request, NextFunction } from "express"
import { encryptionKey } from "../Constants/constants"
import * as status from "../Constants/Status"

const fetchUser = (
  req: typeof request,
  res: typeof response,
  next: NextFunction
) => {
  const token = req.header("authToken")

  if (!token) {
    return res.sendStatus(status.NOTFOUND)
  }

  try {
    const data = jsonwebtoken.verify(token , encryptionKey) as {email: string}
		req.body.email = data.email
    next()
  } catch (error:any) {
		res.setHeader('status',status.BADREQUEST)
		res.setHeader('error',error)
		return res
  }
}

export { fetchUser }
