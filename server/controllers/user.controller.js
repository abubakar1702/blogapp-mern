import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

const saltRounds = 10;

export const register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      console.log("user already exists");
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();

    res.send({
      success: true,
      message: "A user has been created",
      user: { id: newUser._id, username: newUser.username },
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid password");
    }

    const payload = { id: user._id, name:user.name, username: user.username, email:user.email };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.send({
      success: true,
      message: "Login successful",
      user: { id: user._id,name:user.name, username: user.username, email: user.email},
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
