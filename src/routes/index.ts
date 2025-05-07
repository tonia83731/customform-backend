import express from "express";
const router = express.Router();

import authRouter from "./modules/user";
import formRouter from "./modules/form";
import questionRouter from "./modules/question";
import responseRouter from "./modules/response";
import responseListRouter from "./modules/table";

router.use("/", authRouter);
router.use("/form", formRouter);
router.use("/question", questionRouter);
router.use("/response", responseRouter);
router.use("/table", responseListRouter);

export default router;
