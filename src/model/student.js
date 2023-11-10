import mongoose from "mongoose";
const Schema = mongoose.Schema;
const student = new Schema(
  {
    mssv: { type: String, default: "default"},
    email: { type: String, default: "default", maxLength: 100 },
    password: { type: String, default: "default", },
    firstName: { type: String, default: "default", maxLength: 50 },
    lastName: { type: String, default: "default", maxLength: 50 },
    balance: { type: Number, default: "0"},
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("students", student);
