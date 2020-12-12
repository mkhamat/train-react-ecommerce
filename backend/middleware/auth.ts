import * as jwt from "jsonwebtoken"
import User from "../models/User"

export async function authorize(req, res, next) {
  let token =
    req.headers.authorization.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1]
  let decoded = token && (await jwt.verify(token, process.env.JWT_SECRET))
  if (decoded) {
    req.user = await User.findById(decoded.id).select("-password")
    next()
  } else {
    res.status(401)
    res.send("Token is invalid")
  }
}
