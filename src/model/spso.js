import mongoose from "mongoose";
const Schema = mongoose.Schema;
const spso = new Schema(
  {
    email: { type: String, default: "default", maxLength: 100 },
    password: { type: String, default: "default", },
    firstName: { type: String, default: "default", maxLength: 50 },
    lastName: { type: String, default: "default", maxLength: 50 },
    facility: { type: String, default: "default", maxLength: 50 },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("spsos", spso);
