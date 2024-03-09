import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.TOKEN_VALIDITY),
  });
  res.cookie("token", token, {
    maxAge: parseInt(process.env.TOKEN_VALIDITY) * 1000,
    expires: new Date(Date.now() + parseInt(process.env.TOKEN_VALIDITY) * 1000),
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "dev" ? false : true,
  });
};

export default generateTokenAndSetCookie;
