import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./utils/db/mongoDB.js";
import routes from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectMongoDB();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(PORT, () => {
  console.log("-----------------------------");
  console.log(` Server running at port ${PORT}`);
  console.log("-----------------------------");
});
