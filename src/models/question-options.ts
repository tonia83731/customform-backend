import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

export interface IOpt extends Document {
  opts: string[];
  row_opts: string[];
  col_opts: string[];
  max_select: number | null;
  is_multi: boolean | null;
}
export const optionSchema: MongooseSchema<IOpt> = new Schema(
  {
    opts: [String],
    row_opts: [String],
    col_opts: [String],
    max_select: {
      type: Number,
      default: null,
    },
    is_multi: {
      type: Boolean,
      default: null,
    },
  },
  {
    _id: false,
  }
);

export interface IScaleOpt extends Document {
  min_value: number;
  max_value: number;
  min_label: string | null;
  max_label: string | null;
}
export const scaleOptionsSchema: MongooseSchema<IScaleOpt> = new Schema(
  {
    min_value: {
      type: Number,
      min: 0,
      max: 1,
      default: 0,
    },
    max_value: {
      type: Number,
      min: 2,
      max: 10,
      default: 5,
    },
    min_label: {
      type: String,
      default: null,
    },
    max_label: {
      type: String,
      default: null,
    },
  },
  {
    _id: false,
  }
);

export interface IDatetime extends Document {
  allowed_date_range: boolean | null;
  allowed_time_range: boolean | null;
}
export const datetimeSchema: MongooseSchema<IDatetime> = new Schema(
  {
    allowed_date_range: {
      type: Boolean,
      default: false,
    },
    allowed_time_range: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);
