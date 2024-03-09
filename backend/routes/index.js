import { Router } from "express";
import authRoutes from "./auth.js";
import messageRoutes from "./message.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

const urlPrefix1 = "/api/v1";

router.get("/", (req, res) => {
  res.send("ChatterBee Backend using Express.js");
});

router.use(`${urlPrefix1}/auth`, authRoutes);
router.use(`${urlPrefix1}/messages`, messageRoutes);
router.use(errorHandler);

export default router;
