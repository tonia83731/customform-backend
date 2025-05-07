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
  settings:
    | { word_limit?: number | null } // For shortAnswer and paragraph
    | { options: string[] } // For singleSelect, dropdown, checkboxes
    | { options: string[]; max_select?: number | null; is_multi?: boolean } // For dropdown (multi)
    | {
        min_value: number;
        max_value: number;
        min_label?: string | null;
        max_label?: string | null;
      } // For linearScale
    | { allowed_date_range?: boolean } // For date
    | { allowed_time_range?: boolean } // For time
    | { row_options: string[]; col_options: string[] } // For singleSelectGrid
    | {
        row_options: string[];
        col_options: string[];
        max_select?: number | null;
      }; // For checkboxGrid
  order: number;
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
      // required: true,
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
    settings: {
      type: Schema.Types.Mixed,
      default: {},
    },
    order: {
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
