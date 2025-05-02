import express from "express";
const router = express.Router();
import questionControllers from "../../controllers/question-controllers";

router.get(
  "/:formId/form_with_questions",
  questionControllers.getFormWithQuestion
);
router.post("/:formId/add", questionControllers.addQuestion);
router.patch(
  "/:questionId/update-type",
  questionControllers.updatedQuestionType
);
router.patch(
  "/:questionId/update-section",
  questionControllers.updatedQuestionSection
);
router.put("/:questionId/update", questionControllers.updatedQuestion);
router.delete("/:questionId/delete", questionControllers.deletedQuestion);
export default router;
