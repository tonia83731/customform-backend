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
      const [questions, responses] = await Promise.all([
        Question.find({ form_id: formId }).sort({ order: 1 }),
        Response.find({ form_id: formId }),
      ]);

      return res.status(200).json({
        success: true,
        data: {
          questions,
          responses,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default responseListControllers;
