import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

export interface ISection extends Document {
  title: string;
  description: string;
  order: number;
}

export const sectionSchema: MongooseSchema<ISection> = new Schema({
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
