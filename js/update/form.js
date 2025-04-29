if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const mongoose_url = process.env.MONGODB_URL;
const Form = require("../models/form-models");

const initializedSection = {
  order: 1,
  title: "Section 1",
  description: "",
};

mongoose
  .connect(mongoose_url)
  .then(async () => {
    await Form.updateMany({}, { $push: { sections: initializedSection } });
    console.log("Form data updated");

    await mongoose.disconnect();
    console.log("mongodb connection closed");
  })
  .catch((err) => console.error("mongodb error!", err.message));
