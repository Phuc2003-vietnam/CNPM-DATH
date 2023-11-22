import mongoose from "mongoose";
const Schema = mongoose.Schema;
const configuration = new Schema(
  {
    startDate1: { type: Date, default: Date.now},
    startDate2: { type: Date, default: Date.now}, 
    defaultBalance: { type: Number, default: Date.now, },
    currentBalance: { type: Number, maxLength: 50 },
    fileType: { type: [String], default: "default", maxLength: 50 },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("configuration", configuration);
