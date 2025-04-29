const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
});

const authModel = mongoose.model("Auth", authSchema);
module.exports = authModel;
