import { matchedData, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import { CustomError, ValidationError } from "../utils/errors.js";
import User from "../models/user.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signUp = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ValidationError(errors);
  const { fullName, gender, username, password1 } = matchedData(req);
  const existingUser = await User.findOne({ username });
  if (existingUser)
    throw new CustomError(400, "User with this username already exists");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password1, salt);
  const maleProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const femaleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  const newUser = new User({
    fullName,
    gender,
    username,
    password: hashedPassword,
    profilePicture:
      gender === "Male" ? maleProfilePicture : femaleProfilePicture,
  });
  await newUser.save();
  res.status(201).send({
    success: true,
    message: "User created successfully",
  });
});

export const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) throw new CustomError(400, "Invalid username");
  if (!(await bcrypt.compare(password, user.password)))
    throw new CustomError(400, "Invalid password");
  generateTokenAndSetCookie(user._id, res);
  res.status(200).send({
    success: true,
    message: "User signed in successfully",
  });
});

export const logOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    success: true,
    message: "User signed out successfully",
  });
};
