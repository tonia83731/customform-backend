import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

interface IResponse extends Document {
  form_id: mongoose.Types.ObjectId;
  question_id: mongoose.Types.ObjectId;
  answer: any;
  respondent_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const responseSchema: MongooseSchema<IResponse> = new Schema(
  {
    form_id: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    answer: {
      type: Schema.Types.Mixed,
    },
    respondent_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const responseModel: Model<IResponse> = mongoose.model(
  "Response",
  responseSchema
);
export default responseModel;
