if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const mongoose_url = process.env.MONGODB_URL;

const Question = require("../models/question-models");
mongoose
  .connect(mongoose_url)
  .then(async () => {
    await Question.updateMany({}, { $set: { sectionOrder: null } });
    console.log("Question data updated");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch((err) => console.error("mongodb error!", err.message));
