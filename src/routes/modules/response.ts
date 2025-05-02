import express from "express";
const router = express.Router();
import responseControllers from "../../controllers/response-controllers";

router.get(
  "/:formId/:questionId/add-answer",
  responseControllers.createResponse
);
router.get(
  "/:formId/form-with-question-and-response",
  responseControllers.getQuestionWithResponse
);
router.get("/:answerId/update-answer", responseControllers.updatedResponse);
router.post("/:answerId/clear-answer", responseControllers.clearResponse);

export default router;
