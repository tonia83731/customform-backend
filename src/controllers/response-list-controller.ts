import { Request, Response as ExpressResponse, NextFunction } from "express";
import Form from "../models/form-models";
import Question from "../models/question-models";
import Response from "../models/response-models";

const responseListControllers = {
  getResponsesTable: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
    } catch (error) {
      next(error);
    }
  },
};

export default responseListControllers;
