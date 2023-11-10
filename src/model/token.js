import mongoose from "mongoose";
const Schema = mongoose.Schema;
const token = new Schema(
  {
    accessToken: { type: String, default: "default"},
    refreshToken: { type: String, default: "default" },
    user_id: { type: String, default: "default", },
    session_id: {type: String,default: 0}
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("tokens", token);
