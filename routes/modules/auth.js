const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth-controllers");

router.post("/signin", authController.login);
router.post("/signup", authController.register);

module.exports = router;
