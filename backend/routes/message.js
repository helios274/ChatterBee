import { Router } from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { sendMessage, getMessage } from "../controllers/message.js";

const router = Router();

router.post("/:id", isAuthenticated, sendMessage);
router.get("/:id", isAuthenticated, getMessage);

export default router;
