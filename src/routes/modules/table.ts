import express from "express";
const router = express.Router();

import responseListControllers from "../../controllers/response-list-controller";

router.get("/:formId/responses", responseListControllers.getResponsesTable);

export default router;
