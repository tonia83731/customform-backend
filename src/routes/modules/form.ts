import express from "express";
const router = express.Router();
import formControllers from "../../controllers/form-controllers";

router.patch("/:formId/remove/:sectionId", formControllers.formRemoveSection);
router.get("/:formId", formControllers.getForm);
router.put("/:formId", formControllers.updatedForm);
router.patch("/:formId/add-section", formControllers.formAddSection);
router.patch(
  "/:formId/remove-all-sections",
  formControllers.formRemoveAllSections
);
// router.patch("/:formId/adjust-published", formControllers.publishedForm);
router.post("/", formControllers.createForm);

export default router;
