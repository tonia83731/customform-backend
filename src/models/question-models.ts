import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
import {
  IOpt,
  IScaleOpt,
  optionSchema,
  scaleOptionsSchema,
  datetimeSchema,
  IDatetime,
} from "./question-options";
const Schema = mongoose.Schema;

interface IQuestion extends Document {
  form_id: mongoose.Types.ObjectId;
  question_type:
    | "shortAnswer"
    | "paragraph"
    | "multiChoice"
    | "dropdown"
    | "checkboxes"
    | "linearScale"
    | "date"
    | "time"
    | "multiChoiceGrid"
    | "checkboxGrid";
  question?: string;
  description?: string;
  section_id: mongoose.Types.ObjectId | null;
  is_required: boolean;
  options?: IOpt;
  scale_options?: IScaleOpt;
  datetime_options?: IDatetime;
  word_limit?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const questionSchema: MongooseSchema<IQuestion> = new Schema(
  {
    form_id: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    question_type: {
      type: String,
      required: true,
      enum: [
        "shortAnswer",
        "paragraph",
        "multiChoice",
        "dropdown",
        "checkboxes",
        "linearScale",
        "date",
        "time",
        "multiChoiceGrid",
        "checkboxGrid",
      ],
    },
    question: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    section_id: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    is_required: {
      type: Boolean,
      default: false,
    },
    options: optionSchema,
    scale_options: scaleOptionsSchema,
    datetime_options: datetimeSchema,
    word_limit: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel: Model<IQuestion> = mongoose.model(
  "Question",
  questionSchema
);
export default questionModel;
