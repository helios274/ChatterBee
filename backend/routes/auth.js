import { Router } from "express";
import { checkSchema } from "express-validator";

import { signUp, logOut, signIn } from "../controllers/auth.js";
import { signUpDataValidationSchema } from "../utils/validationSchemas.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

router.post("/sign-up", checkSchema(signUpDataValidationSchema), signUp);
router.post("/sign-in", signIn);
router.delete("/sign-out", isAuthenticated, logOut);

export default router;
