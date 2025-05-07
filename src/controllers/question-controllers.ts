import { Request, Response as ExpressResponse, NextFunction } from "express";
import Form from "../models/form-models";
import Question from "../models/question-models";

const questionControllers = {
  getQuestions: async (
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
  getQuestion: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { questionId } = req.params;
      const question = await Question.findById(questionId);
      if (!question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      return res.status(200).json({
        success: true,
        data: question,
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

      question.question_type = updateType;
      question.settings = {};
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
      const { question, description, is_required, settings } = req.body;
      if (!data)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      data.question = question || data.question;
      data.description = description || data.description;
      data.is_required = is_required || data.is_required;
      data.settings = settings || data.settings;

      await data.save();

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      next(error);
    }
  },
  assignQuestionOrder: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId, questionId } = req.params;
      const { sectionId, insert_order } = req.body;

      const [questions, target_question] = await Promise.all([
        Question.find({
          form_id: formId,
          section_id: sectionId ?? null,
        }).sort({ order: 1 }),
        Question.findById(questionId),
      ]);

      if (!target_question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      const ordered = questions.filter((q) => typeof q.order === "number");

      ordered.splice(insert_order, 0, target_question);
      const bulkOps = ordered.map((q, index) => ({
        updateOne: {
          filter: { _id: q._id },
          update: { $set: { order: index } },
        },
      }));

      await Question.bulkWrite(bulkOps);

      return res
        .status(200)
        .json({ message: "Question inserted and order updated" });
    } catch (error) {
      next(error);
    }
  },
  reorderQuestion: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId, questionId } = req.params;
      const { sectionId, newOrder } = req.body;

      const [questions, target_question] = await Promise.all([
        Question.find({ form_id: formId, section_id: sectionId }).sort({
          order: 1,
        }),
        Question.findById(questionId),
      ]);

      if (!target_question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      const ordered = questions.filter((q) => typeof q.order === "number");

      const updated = ordered.filter((q) => q._id !== questionId);
      updated.splice(newOrder, 0, target_question);

      const bulkOps = updated.map((q, index) => ({
        updateOne: {
          filter: { _id: q._id },
          update: { $set: { order: index } },
        },
      }));
      await Question.bulkWrite(bulkOps);

      return res
        .status(200)
        .json({ message: "Question reordered successfully" });
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
      const [form, questions] = await Promise.all([
        Form.findById(deleted_question.form_id),
        Question.find({
          form_id: deleted_question.form_id,
          section_id: deleted_question.section_id,
        }),
      ]);

      // const form = await Form.findById(deleted_question.form_id);
      if (form) {
        form.question_count = (form.question_count || 0) - 1;
        await form.save();
      }

      const bulk_ops = questions.map((q, index) => ({
        updateOne: {
          filter: { _id: q._id },
          update: { $set: { order: index } },
        },
      }));

      if (bulk_ops.length > 0) {
        await Question.bulkWrite(bulk_ops);
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
