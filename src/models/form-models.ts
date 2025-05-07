import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

import { sectionSchema, ISection } from "./form-section-models";
import questionModel from "./question-models";
export interface IForm extends Document {
  title: string;
  description?: string;
  user_id: mongoose.Types.ObjectId;
  // has_section: boolean;
  // section_count: number;
  sections: ISection[];
  question_count: number;
  thank_msg: string;
  max_response: number | null;
  curr_response: number;
  is_published: boolean;
  published_end: Date | null;
}

const formSchema: MongooseSchema<IForm> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sections: [sectionSchema],
    question_count: {
      type: Number,
      default: 0,
    },
    thank_msg: {
      type: String,
      default: "Thank you for your time! Your feedback is invaluable to us.",
    },
    max_response: {
      type: Number,
      default: null,
    },
    curr_response: {
      type: Number,
      default: 0,
    },
    is_published: {
      type: Boolean,
      default: false,
    },
    published_end: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// formSchema.pre(
//   "deleteOne",
//   { document: true, query: false },
//   async function (next) {
//     try {
//       // Use this._id to access the document's ID
//       const formId = this._id;

//       // Delete related sections and questions
//       await sectionModel.deleteMany({ formId });
//       await questionModel.deleteMany({ formId });

//       next();
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// You can also use the `post` hook if you want to trigger it after the deletion

const formModel: Model<IForm> = mongoose.model("Form", formSchema);
export default formModel;
