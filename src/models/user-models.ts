import mongoose, { Schema as MongooseSchema, Document, Model } from "mongoose";
const Schema = mongoose.Schema;

interface IUser extends Document {
  name: string;
  email: string;
  is_active: boolean;
  password?: string;
  googleId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: MongooseSchema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 4,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
