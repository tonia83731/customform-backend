import express from "express";
const router = express.Router();

import authRouter from "./modules/user";
import formRouter from "./modules/form";
import questionRouter from "./modules/question";
import responseRouter from "./modules/response";

router.use("/", authRouter);
router.use("/form", formRouter);
router.use("/quetion", questionRouter);

export default router;
