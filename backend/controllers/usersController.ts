import User from "../models/User";
import * as jwt from "jsonwebtoken";

async function authenticate(req, res) {
  let user: any = await User.findOne({ email: req.body.email });
  if (user && (await user.matchPassword(req.body.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
    });
  } else {
    res.status("401");
    res.send("not authenticated");
  }
}

async function sign(req, res) {
  let userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    res.status(400).send("User exists");
  } else {
    let newUser: any = await User.create(req.body); //will change
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET),
      });
    } else {
      res.status(400).send("Invalid user data");
    }
  }
}

async function showProfile(req, res) {
  let user: typeof req.user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    res.send("User not found");
  }
}

export { authenticate, showProfile, sign };
