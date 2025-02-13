const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth-controllers");

router.post("/signin", authController.login);

module.exports = router;
