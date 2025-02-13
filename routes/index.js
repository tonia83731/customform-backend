const express = require("express");
const router = express.Router();
const form = require("../routes/modules/form");
const response = require("../routes/modules/response");
const auth = require("../routes/modules/auth");
const { authenticated } = require("../middleware/api-auth");

router.use("/forms", authenticated, form);
router.use("/responses", response);
router.use("/", auth);

module.exports = router;
