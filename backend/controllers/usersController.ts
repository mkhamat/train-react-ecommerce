import User from "../models/User"
import * as jwt from "jsonwebtoken"

const authenticate = async (req, res, next) => {
  try {
    let user: any = await User.findOne({ email: req.body.email })
    if (user && (await user.matchPassword(req.body.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
      })
    } else {
      res.status(401)
      throw new Error("Invalid email or password")
    }
  } catch (error) {
    next(error)
  }
}

const sign = async (req, res, next) => {
  try {
    let userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
      res.status(400).send("User exists")
    } else {
      let newUser: any = await User.create(req.body)
      if (newUser) {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET),
        })
      } else {
        res.status(400)
        throw new Error("Invalid user data")
      }
    }
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req: any, res, next) => {
  try {
    let user: typeof req.user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req: any, res, next) => {
  try {
    let user: typeof req.user = await User.findById(req.user._id)
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
      let updatedUser = await user.save()
      if (updatedUser) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
        })
      }
    } else {
      res.status(404)
      throw new Error("User not found")
    }
  } catch (error) {
    next(error)
  }
}

export { authenticate, getProfile, sign, updateProfile }
