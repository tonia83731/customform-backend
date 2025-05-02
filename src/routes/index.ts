import express from "express";
const router = express.Router();

import authRouter from "./modules/user";
import formRouter from "./modules/form";
import responseRouter from "./modules/response";

router.use("/", authRouter);
router.use("/form", formRouter);

export default router;
