import { Request, Response as ExpressResponse } from "express";
import { Types } from "mongoose";
import Form from "../models/form-models";
import Question from "../models/question-models";
import Response from "../models/question-models";
import { FormResponse } from "../types/form";

const formControllers = {
  getForms: async (req: Request, res: ExpressResponse) => {
    try {
      const forms = await Form.aggregate([
        {
          $lookup: {
            from: "Question",
            localField: "_id",
            foreignField: "formId",
            as: "questions",
          },
        },
        {
          $addFields: {
            latestQuestionEdit: { $max: "$questions.updatedAt" },
            lastEditAt: {
              $cond: {
                if: { $gt: ["$latestQuestionEdit", "$updatedAt"] },
                then: "$lastestQuestionEdit",
                else: "$updatedAt",
              },
            },
          },
        },
        {
          $project: {
            questions: 0,
            latestQuestionEdit: 0,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        data: forms,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getForm: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;

      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form no found",
        });

      return res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getPreviewForm: async (req: Request, res: ExpressResponse) => {
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
  createForm: async (req: Request, res: ExpressResponse) => {
    try {
      const { title, description } = req.body;

      if (!title)
        return res.status(400).json({
          success: false,
          message: "Title cannot be blank",
        });

      const form = await Form.create({
        title,
        description,
        isPublished: false,
        hasSections: false,
        sections: [],
      });
      return res.status(201).json({
        success: true,
        data: form,
      });
    } catch (error) {
      console.log(error);
    }
  },
  editForm: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const { title, description, message } = req.body;

      const form = await Form.findById(formId);
      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form no found",
        });

      form.title = title || form.title;
      form.description = description || form.description;
      form.message = message || form.message;

      const updatedForm = await form.save();

      return res.status(200).json({
        success: true,
        data: updatedForm,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteForm: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({
          formId,
        }),
      ]);
      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form no found",
        });

      if (questions.length > 0) {
        await Question.deleteMany({ formId });
      }
      await Form.findByIdAndDelete(formId);

      return res.status(200).json({
        success: true,
        message: "Form and associated questions deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
  publishedForm: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({
          formId,
        }),
      ]);
      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form no found",
        });
      if (!form.isPublished && questions.length === 0)
        return res.status(400).json({
          success: false,
          message: "Form cannot be published without any questions",
        });
      const isBecomingPublished = !form.isPublished;
      form.isPublished = !form.isPublished;

      if (isBecomingPublished)
        form.publishCount = (form?.publishCount || 0) + 1;

      const updated_form = await form.save();
      return res.status(200).json({
        success: true,
        message: `Form has been ${
          updated_form.isPublished ? "published" : "unpublished"
        }`,
        data: updated_form,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // -------------------------------
  includeSection: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });

      if (form.hasSections)
        return res.status(200).json({
          success: true,
          message: "Section already included",
        });

      form.hasSections = true;
      if (form.sections) {
        form.sections.push({
          order: form.sections.length,
          title: "Section 1",
          description: "",
        });
      }
      const updated_form = await form.save();

      const sectionId = updated_form.sections[0]._id;

      const questions = await Question.find({
        formId,
        sectionId: null,
      });

      if (questions.length > 0) {
        await Promise.all(
          questions.map(async (quest) => {
            quest.sectionId = sectionId;
            await quest.save();
          })
        );
      }

      return res.status(200).json({
        success: true,
        data: {
          form: updated_form,
          questions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  excludeSection: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const [form, questions] = await Promise.all([
        Form.findById(formId),
        Question.find({
          formId,
        }),
      ]);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      form.hasSections = false;
      form.sections = [];
      const updated_form = await form.save();

      if (questions) {
        await Promise.all(
          questions.map(async (quest) => {
            quest.sectionId = undefined;
            await quest.save();
          })
        );
      }

      return res.status(200).json({
        success: true,
        data: {
          form: updated_form,
          questions,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  addSection: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      const body = {
        order: form.sections.length,
        title: `Section ${form.sections?.length + 1}`,
        description: "",
      };

      form.sections?.push(body);
      const updated_form = await form.save();
      const updated_sections = updated_form.sections?.sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : Infinity;
        const orderB = typeof b.order === "number" ? b.order : Infinity;
        return orderA - orderB;
      });

      return res.status(201).json({
        success: true,
        data: updated_sections,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedSectionInfo: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId, sectionId } = req.params;
      const { title, description } = req.body;
      const form = await Form.findById(formId);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      const sectionIdx = form.sections.findIndex(
        (sec) => sec._id?.toString() === sectionId
      );
      if (sectionIdx === -1) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        });
      }

      form.sections[sectionIdx].title = title;
      form.sections[sectionIdx].description = description;
      const updated_form = await form.save();
      const updated_sections = updated_form.sections.sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : Infinity;
        const orderB = typeof b.order === "number" ? b.order : Infinity;
        return orderA - orderB;
      });

      return res.status(200).json({
        success: true,
        data: updated_sections,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteSection: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId, sectionId } = req.params;

      const form = await Form.findById(formId);
      if (!form) {
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      }

      const sectionIdx = form.sections.findIndex(
        (sec) => sec._id?.toString() === sectionId
      );

      if (sectionIdx === -1) {
        return res.status(404).json({
          success: false,
          message: "Section not found",
        });
      }
      const delete_order = form.sections[sectionIdx].order as number;

      await Question.deleteMany({
        formId,
        sectionId,
      });

      form.sections.splice(sectionIdx, 1);
      form.sections.forEach((sec) => {
        if ((sec.order as number) > delete_order) (sec.order as number) -= 1;
      });

      const updated_form = await form.save();
      const updated_sections = updated_form.sections.sort((a, b) => {
        const orderA = typeof a.order === "number" ? a.order : Infinity;
        const orderB = typeof b.order === "number" ? b.order : Infinity;
        return orderA - orderB;
      });

      return res.json({
        success: true,
        data: updated_sections,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // -------------------------------
  addQuestion: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const { questionType, sectionId } = req.body;

      const questionCount = await Question.countDocuments({
        formId,
        sectionId: sectionId ? sectionId : null,
      });

      const question = await Question.create({
        formId,
        questionType,
        order: questionCount + 1,
        sectionId: sectionId ? sectionId : null,
      });

      return res.status(201).json({
        success: true,
        data: question,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deleteQuestion: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId, questionId } = req.params;
      const question = await Question.findById(questionId);

      if (!question)
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });

      const sectionId = question.sectionId;
      await Question.findByIdAndDelete(questionId);

      const remaining_quests = await Question.find({
        formId,
        sectionId,
      }).sort("order");

      const updated_orders = remaining_quests.map((q, index) => {
        return Question.findByIdAndUpdate(
          q._id,
          { order: index + 1 },
          { new: true }
        );
      });

      await Promise.all(updated_orders);

      return res.status(200).json({
        success: true,
        message: "Form and associated questions deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedQuestion: async (req: Request, res: ExpressResponse) => {
    try {
      const { questionId } = req.params;
      const {
        question,
        options,
        rowOptions,
        colOptions,
        dateOptions,
        minValue,
        maxValue,
        minLabel,
        maxLabel,
        isRequired,
        hasLimit,
        description,
        wordLimit,
        multiSelectLimit,
        maxSelectLimit,
        allowedDateRange,
        allowedTimeRange,
      } = req.body;

      const quest = await Question.findById(questionId);

      if (!quest)
        return res.status(404).json({
          success: false,
          message: "Question no found",
        });

      quest.question = question ?? quest.question;
      quest.options = options ?? quest.options;
      quest.rowOptions = rowOptions ?? quest.rowOptions;
      quest.colOptions = colOptions ?? quest.colOptions;
      quest.dateOptions = dateOptions ?? quest.dateOptions;
      quest.minValue = minValue ?? quest.minValue;
      quest.maxValue = maxValue ?? quest.maxValue;
      quest.minLabel = minLabel ?? quest.minLabel;
      quest.maxLabel = maxLabel ?? quest.maxLabel;
      quest.isRequired = isRequired ?? quest.isRequired;

      quest.hasLimit = hasLimit ?? quest.hasLimit;
      quest.description = description ?? quest.description;
      quest.wordLimit = wordLimit ?? quest.wordLimit;
      quest.multiSelectLimit = multiSelectLimit ?? quest.multiSelectLimit;
      quest.maxSelectLimit = maxSelectLimit ?? quest.maxSelectLimit;
      quest.allowedDateRange = allowedDateRange ?? quest.allowedDateRange;
      quest.allowedTimeRange = allowedTimeRange ?? quest.allowedTimeRange;

      const updated_quest = await quest.save();

      return res.status(200).json({
        success: true,
        message: "Questions updated successfully",
        data: updated_quest,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updatedQuestionsOrder: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const { sectionId, questionOrder } = req.body; // questionOrder: [{_id, order}]

      if (!Array.isArray(questionOrder) || questionOrder.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid order data. Provide an array of question IDs.",
        });
      }

      const updated_order = questionOrder.map(({ _id, order }) => ({
        updateOne: {
          filter: { _id, formId, sectionId },
          update: { $set: { order } },
        },
      }));

      if (updated_order.length > 0) {
        await Question.bulkWrite(updated_order);
      }

      const updated_quests = await Question.find({
        formId,
        sectionId,
      }).sort("order");

      return res.status(200).json({
        success: true,
        message: "Question order updated successfully",
        data: updated_quests,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // -----------------------------
  // edit here
  getFormResponses: async (req: Request, res: ExpressResponse) => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form no found",
        });

      const [questions, responses] = await Promise.all([
        Question.find({
          formId,
        }).sort({ order: 1 }),
        Response.find({ formId })
          .populate("questionId")
          .sort({ "questionId.order": 1 }),
      ]);

      // console.log(questions, responses);
      const formated_questions = questions.map((q) => ({
        questionId: q._id,
        question: q.question,
        questionType: q.questionType,
      }));

      const grouped_responses = responses.reduce((acc, res) => {
        if (!acc[res.respondentId]) acc[res.respondentId] = {};
        acc[res.respondentId][res.questionId._id] = res.response;
        return acc;
      }, {});

      const formated_responses = Object.keys(grouped_responses).map(
        (respondentId) => {
          const row = { respondentId };

          questions.forEach((question) => {
            row[question._id] =
              grouped_responses[respondentId][question._id] || null;
          });

          return row;
        }
      );

      return res.status(200).json({
        success: true,
        data: {
          form: {
            title: form.title,
            description: form.description,
          },
          questions: formated_questions,
          responses: formated_responses,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = formControllers;
