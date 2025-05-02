import express from "express";
const router = express.Router();
import userControllers from "../../controllers/user-controllers";

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
export default router;
