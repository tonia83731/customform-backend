import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

interface ISection {
  _id?: mongoose.Types.ObjectId;
  order: number;
  title: string;
  description: string;
}

interface IForm extends Document {
  title: string;
  description?: string;
  has_section: boolean;
  section_count: number;
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
    has_section: {
      type: Boolean,
      default: false,
    },
    section_count: {
      type: Number,
      default: 0,
    },
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

const formModel: Model<IForm> = mongoose.model("Form", formSchema);
export default formModel;
