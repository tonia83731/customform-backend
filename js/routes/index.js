const express = require("express");
const router = express.Router();
const form = require("./modules/form");
const response = require("./modules/response");
const auth = require("./modules/auth");
const { authenticated } = require("../middleware/api-auth");
const authController = require("../../controllers/auth-controllers");

router.use("/forms", authenticated, form);
router.get("/auth", authenticated, authController.checkedAuthentication);
router.use("/responses", response);
router.use("/", auth);

module.exports = router;
