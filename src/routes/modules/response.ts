import express from "express";
const router = express.Router();
const responseControllers = require("../../../controllers/response-controllers");

router.get("/:formId/form", responseControllers.getForm);
router.get("/:formId/questions", responseControllers.getFormQuestions);
router.get("/:formId/validation", responseControllers.checkPublishedAuth);
router.post("/submit-form", responseControllers.submitResponse);

export default router;
