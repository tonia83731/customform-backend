const express = require("express");
const router = express.Router();
const formControllers = require("../../controllers/form-controllers");

router.delete(
  "/:formId/:questionId/delete-question",
  formControllers.deleteQuestion
);
router.get("/:formId/get-form", formControllers.getForm);
router.get("/:formId/get-preview-form", formControllers.getPreviewForm);
router.get("/:formId/get-form-questions", formControllers.getFormQuestions);
router.put(
  "/:formId/:sectionId/updated-section",
  formControllers.updatedSectionInfo
);
router.delete(
  "/:formId/:sectionId/deleted-section",
  formControllers.deleteSection
);
router.put("/:formId/edit-form", formControllers.editForm);
router.delete("/:formId/delete-form", formControllers.deleteForm);
router.patch("/:formId/published", formControllers.publishedForm);
router.post("/:formId/include-section", formControllers.includeSection);
router.delete("/:formId/exclude-section", formControllers.excludeSection);
router.post("/:formId/add-section", formControllers.addSection);
router.post("/:formId/add-question", formControllers.addQuestion);
router.get("/:formId/responses", formControllers.getFormResponses);
router.patch(
  "/:formId/updated-question-order",
  formControllers.updatedQuestionsOrder
); // V
router.put("/:questionId/edit-question", formControllers.updatedQuestion); // V

router.post("/create-form", formControllers.createForm);
router.get("/", formControllers.getForms);
module.exports = router;
