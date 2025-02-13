const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishCount: {
      type: Number,
      default: 0,
    },
    hasSections: {
      type: Boolean,
      default: false,
    },
    sections: [
      {
        order: {
          type: Number,
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    message: {
      type: String,
      default: "Thank you for your time! Your feedback is invaluable to us.",
    },
  },
  {
    timestamps: true,
  }
);

const formModel = mongoose.model("Form", formSchema);
module.exports = formModel;
