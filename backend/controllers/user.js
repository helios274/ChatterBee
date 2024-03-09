import asyncHandler from "express-async-handler";
import Conversation from "../models/conversation";
import User from "../models/user";

export const profile = asyncHandler((req, res) => {
  return res.json(req.user);
});

export const getUserChats = asyncHandler(async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );
  res.json(users);
});
