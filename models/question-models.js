const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    questionType: {
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
        "multiChoiceGrid",
        "checkboxGrid",
      ],
    },
    question: {
      type: String,
    },
    description: {
      type: String,
    },
    options: {
      type: [String],
    },
    rowOptions: {
      type: [String],
    },
    colOptions: {
      type: [String],
    },
    dateOptions: {
      type: String,
      enum: ["date", "time", "both"],
    },
    // date
    allowedDateRange: {
      type: Boolean,
      default: false,
    },
    // date
    allowedTimeRange: {
      type: Boolean,
      default: false,
    },
    minValue: {
      type: Number,
      min: 0,
      max: 1,
      defaultValue: 0,
    },
    maxValue: { type: Number, min: 2, max: 10, defaultValue: 5 },
    minLabel: {
      type: String,
    },
    maxLabel: {
      type: String,
    },
    hasLimit: {
      type: Boolean,
      default: false,
    },
    // shortAnswer, paragraph
    wordLimit: {
      type: Number,
      min: 1,
      default: null,
    },
    // dropdown
    multiSelectLimit: {
      type: Boolean,
      default: false,
    },
    // dropdown, checkboxes
    maxSelectLimit: {
      type: Number,
      min: 1,
      default: null,
    },
    isRequired: {
      type: Boolean,
      defaultValue: false,
    },
    order: {
      type: Number,
    },
    sectionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model("Question", questionSchema);
module.exports = questionModel;
