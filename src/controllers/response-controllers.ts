import { Request, Response as ExpressResponse } from "express";
import Form from "../models/form-models";
import Question from "../models/question-models";
import Response from "../models/question-models";
const { v4: uuidv4 } = require("uuid");

const responseControllers = {
  checkPublishedAuth: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);

      if (!form || (form && !form.isPublished))
        return res.status(200).json({
          success: true,
          data: false,
        });

      return res.status(200).json({
        success: true,
        data: true,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getForm: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({
          formId,
        }).sort({ order: 1 }),
      ]);

      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });

      if (!form.isPublished)
        return res.status(401).json({
          success: false,
          message: "Form is not published",
        });

      return res.status(200).json({
        success: true,
        data: {
          form,
          questions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  getFormQuestions: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const { sectionId } = req.query;

      const query = {
        formId,
        sectionId: sectionId ? sectionId : null,
      };

      const questions = await Question.find(query).sort({ order: 1 });

      return res.status(200).json({
        success: true,
        data: questions,
      });
    } catch (error) {
      console.log(error);
    }
  },
  submitResponse: async (req: Request, res: ExpressResponse) => {
    try {
      const { responses } = req.body; // [{formId, questionId, response}]

      if (Array.isArray(responses) && responses.length === 0)
        return res.status(400).json({
          success: false,
          message: "Invalid response data",
        });

      let random_uuid = uuidv4();

      const submit_responses = responses.map(
        (item: { formId: string; questionId: string; response: any }) => ({
          ...item,
          respondentId: random_uuid,
        })
      );

      await Response.insertMany(submit_responses);

      res.status(201).json({
        success: true,
        message: "Responses submitted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = responseControllers;
