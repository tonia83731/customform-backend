import { Request, Response as ExpressResponse, NextFunction } from "express";
import { Types } from "mongoose";
import Form, { IForm } from "../models/form-models";
import Question, { QuestionType } from "../models/question-models";

const questionControllers = {
  getFormWithQuestion: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({ form_id: formId }),
      ]);

      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });

      return res.status(200).json({
        success: true,
        data: {
          form,
          questions,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  addQuestion: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const { sectionId, question_type } = req.body;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          succes: false,
          message: "Form not found",
        });

      const question = await Question.create({
        form_id: formId,
        section_id: sectionId || null,
        question_type,
      });

      form.question_count = (form.question_count || 0) + 1;
      await form.save();

      return res.status(201).json({
        success: true,
        data: question,
      });
    } catch (error) {
      next(error);
    }
  },
  updatedQuestionType: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { questionId } = req.params;
      const { originalType, updateType } = req.body;

      const question = await Question.findById(questionId);
      if (!question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      if (question.question_type !== originalType)
        return res.status(400).json({
          success: false,
          message: "Question type does not match",
        });

      switch (originalType) {
        case "shortAnswer":
        case "paragraph":
          question.word_limit = null;
          break;
        case "singleSelect":
        case "dropdown":
        case "checkboxes":
        case "singleSelectGrid":
        case "checkboxGrid":
          question.options = undefined;
          break;
        case "linearScale":
          question.scale_options = undefined;
          break;
        case "date":
        case "time":
          question.datetime_options = undefined;
          break;
      }

      question.question_type = updateType;
      const updated_quest = await question.save();

      return res.status(200).json({
        success: true,
        data: updated_quest,
      });
    } catch (error) {
      next(error);
    }
  },
  updatedQuestionSection: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { questionId } = req.params;
      const { updatedSectionId } = req.body;
      const question = await Question.findById(questionId);
      if (!question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      if (question.section_id == updatedSectionId)
        return res.status(200).json({
          success: true,
          message: "Question is already in the specified section",
        });

      if (updatedSectionId) {
        const form = await Form.findById(question.form_id);
        if (!form)
          return res.status(404).json({
            success: false,
            message: "Form not found for the question",
          });

        const is_section_existed = form.sections.find(
          (s) => s._id?.toString() === updatedSectionId
        );
        if (!is_section_existed)
          return res.status(404).json({
            success: false,
            message: "Section not found in this form",
          });
      }

      question.section_id = updatedSectionId;
      await question.save();
      return res.status(200).json({
        success: true,
        data: question,
      });
    } catch (error) {
      next(error);
    }
  },
  updatedQuestion: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { questionId } = req.params;
      const data = await Question.findById(questionId);
      const {
        question,
        description,
        is_required,
        options,
        scale_options,
        datetime_options,
        word_limit,
      } = req.body;
      if (!data)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      data.question = question || data.question;
      data.description = description || data.description;
      data.is_required = is_required || data.is_required;

      switch (data.question_type) {
        case "shortAnswer":
        case "paragraph":
          data.word_limit = word_limit || data.word_limit;
          data.options = undefined;
          data.scale_options = undefined;
          data.datetime_options = undefined;
          break;
        case "singleSelect":
        case "dropdown":
        case "checkboxes":
        case "singleSelectGrid":
        case "checkboxGrid":
          data.options = options || data.options;
          data.word_limit = null;
          data.scale_options = undefined;
          data.datetime_options = undefined;
        case "linearScale":
          data.scale_options = scale_options || data.scale_options;
          data.options = undefined;
          data.datetime_options = undefined;
          data.word_limit = null;
        case "date":
        case "time":
          data.datetime_options = datetime_options || data.datetime_options;
          data.options = undefined;
          data.scale_options = undefined;
          data.word_limit = null;
      }
      await data.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  deletedQuestion: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { questionId } = req.params;
      const deleted_question = await Question.findByIdAndDelete(questionId);

      if (!deleted_question) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      const form = await Form.findById(deleted_question.form_id);
      if (form) {
        form.question_count = (form.question_count || 0) - 1;
        await form.save();
      }

      return res.status(200).json({
        success: true,
        message: "Question deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default questionControllers;
