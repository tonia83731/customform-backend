import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

interface ISection extends Document {
  form_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  order: number;
}

const sectionSchema: MongooseSchema<ISection> = new Schema({
  form_id: {
    type: Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 300,
  },
  order: {
    type: Number,
    default: null,
  },
});

const sectionModel: Model<ISection> = mongoose.model("Section", sectionSchema);
export default sectionModel;
