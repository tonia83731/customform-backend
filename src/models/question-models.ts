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

export type QuestionType =
  | "shortAnswer" // "What is your age?"
  | "paragraph" // "Describe your experience with our service."
  | "singleSelect" // "What’s your favorite color?" (Red, Blue, Green)
  | "dropdown"
  | "checkboxes" // "Which fruits do you like?" (Apple, Banana, Mango)
  | "linearScale" // "Rate your satisfaction: 1 (bad) to 5 (great)"
  | "date" // "When is your birthday?"
  | "time" // "What time is your appointment?"
  | "singleSelectGrid" // Rate different services (Cleanliness, Speed) with options (Poor, Good, Excellent).
  | "checkboxGrid";
interface IQuestion extends Document {
  form_id: mongoose.Types.ObjectId;
  question_type: QuestionType;
  question?: string;
  description?: string;
  section_id: mongoose.Types.ObjectId | null;
  is_required: boolean;
  options?: IOpt;
  scale_options?: IScaleOpt;
  datetime_options?: IDatetime;
  word_limit: number | null;
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
        "singleSelect",
        "dropdown",
        "checkboxes",
        "linearScale",
        "date",
        "time",
        "singleSelectGrid",
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
      ref: "Form.sections",
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
      default: null,
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
