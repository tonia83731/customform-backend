const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    formId: {
      type: Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    respondentId: {
      type: String,
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    response: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const responseModel = mongoose.model("Response", responseSchema);
module.exports = responseModel;
