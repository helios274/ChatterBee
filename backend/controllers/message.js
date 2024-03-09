import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import Message from "../models/message.js";
import Conversation from "../models/conversation.js";
import { CustomError } from "../utils/errors.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const senderId = req.user._id;
  const receiverId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(receiverId))
    throw new CustomError(400, "Invalid user ID");

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  if (newMessage) conversation.messages.push(newMessage._id);

  await Promise.all([conversation.save(), newMessage.save()]); // runs in parallel

  res.status(201).json(newMessage);
});

export const getMessage = asyncHandler(async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.params.id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) return res.json([]);

  res.json(conversation.messages);
});
