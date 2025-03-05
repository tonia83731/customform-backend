const Form = require("../models/form-models");
const Question = require("../models/question-models");
const Response = require("../models/response-models");
const { v4: uuidv4 } = require("uuid");

const responseControllers = {
  checkPublishedAuth: async (req, res) => {
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
  getForm: async (req, res) => {
    try {
      const { formId } = req.params;
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({
          formId,
        }).sort({ order: 1 }),
      ]);

      if (!form)
        return res.stats(404).json({
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
  getFormQuestions: async (req, res) => {
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
  submitResponse: async (req, res) => {
    try {
      const { responses } = req.body; // [{formId, questionId, response}]

      if (Array.isArray(responses) && responses.length === 0)
        return res.status(400).json({
          success: false,
          message: "Invalid response data",
        });

      let random_uuid = uuidv4();

      const submit_responses = responses.map((item) => ({
        ...item,
        respondentId: random_uuid,
      }));

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
