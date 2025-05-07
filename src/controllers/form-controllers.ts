import { Request, Response as ExpressResponse, NextFunction } from "express";
import Form from "../models/form-models";
import Question from "../models/question-models";

const formControllers = {
  createForm: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { title, description } = req.body;
      const form = await Form.create({
        title,
        description,
      });

      return res.status(201).json({
        success: true,
        data: form,
      });
    } catch (error) {
      next(error);
    }
  },
  getForm: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          succes: false,
          message: "Form not found",
        });

      return res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      next(error);
    }
  },
  formAddSection: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const { sections } = req.body;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          succes: false,
          message: "Form not found",
        });

      const section_data = sections.map(
        (
          section: {
            title: string;
            description?: string;
          },
          index: number
        ) => ({
          ...section,
          order: form.sections.length + index,
        })
      );

      form.sections.push(...section_data);
      await form.save();

      return res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      next(error);
    }
  },
  formRemoveSection: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId, sectionId } = req.params;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          succes: false,
          message: "Form not found",
        });

      form.sections = form.sections.filter(
        (section) => section._id?.toString() !== sectionId
      );
      await form.save();
      await Question.updateMany(
        {
          form_id: formId,
          section_id: sectionId,
        },
        { section_id: null }
      );
      const questions = await Question.find({
        form_id: formId,
        section_id: null,
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
  formRemoveAllSections: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          succes: false,
          message: "Form not found",
        });

      form.sections = [];
      await form.save();
      await Question.updateMany(
        { form_id: formId, section_id: { $ne: null } },
        { section_id: null }
      );

      const questions = await Question.find({
        form_id: formId,
        section_id: null,
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
  updatedForm: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const { title, description, thank_msg, max_response, published_end } =
        req.body;
      const form = await Form.findById(formId);

      if (!form)
        return res.status(404).json({
          succes: false,
          message: "Form not found",
        });

      if (form.is_published)
        return res.status(400).json({
          success: false,
          message: "Unable to update forms while it is published",
        });

      form.title = title ? title : form.title;
      form.description = description ? description : form.description;
      form.thank_msg = thank_msg ? thank_msg : form.thank_msg;
      form.max_response = max_response ? max_response : form.max_response;
      form.published_end = published_end ? published_end : form.published_end;

      await form.save();

      return res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      next(error);
    }
  },
  publishedForm: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);
      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      if (form?.is_published)
        return res.status(200).json({
          success: true,
          message: "Form already published",
        });

      form.is_published = true;
      await form.save();

      return res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      next(error);
    }
  },
  unpublishedForm: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);
      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      if (!form?.is_published)
        return res.status(200).json({
          success: true,
          message: "Form already unpublished",
        });

      form.is_published = false;
      await form.save();

      return res.status(200).json({
        success: true,
        data: form,
      });
    } catch (error) {
      next(error);
    }
  },
  deletedForm: async (
    req: Request,
    res: ExpressResponse,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { formId } = req.params;
      const form = await Form.findById(formId);
      if (!form)
        return res.status(404).json({
          success: false,
          message: "Form not found",
        });
      if (form?.is_published)
        return res.status(400).json({
          success: false,
          message: "Unable to delete forms while it is published",
        });

      await Question.deleteMany({ form_id: formId });
      await Form.findByIdAndDelete(formId);

      return res.status(200).json({
        success: true,
        message: "Delete form and related questions",
      });
    } catch (error) {
      next(error);
    }
  },
};

export default formControllers;
