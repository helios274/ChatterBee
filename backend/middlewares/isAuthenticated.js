import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { CustomError } from "../utils/errors.js";
import User from "../models/user.js";

const validateToken = asyncHandler((req, res, next) => {
  const token = req.cookies?.token;
  if (!token) throw new CustomError(401, "Missing token");
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) throw new CustomError(401, "Invalid token");
    const user = await User.findById(decoded.userId, "-password");
    req.user = user;
    next();
  });
});

export default validateToken;
