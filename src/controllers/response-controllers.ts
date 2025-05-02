import { Request, Response as ExpressResponse, NextFunction } from "express";
import Form from "../models/form-models";
import Question from "../models/question-models";
import Response from "../models/response-models";
import { v4 as uuidv4 } from "uuid";

const responseControllers = {
  getQuestionWithResponse: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const { respondentId } = req.query;
      //   const form = await Form.findById(formId);
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({ form_id: formId }),
      ]);

      if (!form || !form.is_published) {
        return res.status(404).json({
          success: false,
          message: "Form not found or not published",
        });
      }

      if (!respondentId) {
        const generateRespondentId = uuidv4();
        return res.status(200).json({
          success: true,
          respondent_id: generateRespondentId,
          data: {
            form,
            questions,
          },
        });
      }

      const response = await Response.find({
        form_id: formId,
        respondent_id: respondentId,
      });

      return res.status(200).json({
        success: true,
        data: {
          form,
          questions,
          response,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  createResponse: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId, questionId } = req.params;
      const { respondentId, answer } = req.body;

      const [form, question] = await Promise.all([
        Form.findById(formId),
        Question.findOne({ form_id: formId, _id: questionId }),
      ]);

      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });

      if (!question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      const ans_data = await Response.create({
        form_id: formId,
        question_id: questionId,
        respondent_id: respondentId,
        answer,
      });

      return res.status(201).json({
        success: true,
        data: {
          question,
          answer: ans_data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  updatedResponse: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { answerId } = req.params;
      const { answer } = req.body;

      const response = await Response.findByIdAndUpdate(
        answerId,
        { response: answer },
        { new: true }
      );

      if (!response)
        return res.status(404).json({
          success: false,
          message: "Response not found",
        });

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
  clearResponse: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { answerId } = req.params;
      const response = await Response.findByIdAndUpdate(
        answerId,
        { response: undefined },
        { new: true }
      );

      if (!response)
        return res.status(404).json({
          success: false,
          message: "Response not found",
        });

      return res.status(200).json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default responseControllers;
// async (
//     req: Request,
//     res: ExpressResponse,
//     next: NextFunction
//   ): Promise<any> => {
//     try {

//     } catch (error) {
//       next(error);
//     }
//   },
