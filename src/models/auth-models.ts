import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const authSchema: MongooseSchema<IAuth> = new Schema({
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

const authModel: Model<IAuth> = mongoose.model("Auth", authSchema);
export default authModel;
