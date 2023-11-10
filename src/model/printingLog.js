import mongoose from "mongoose";
const Schema = mongoose.Schema;
const printingLog = new Schema(
  {
    status: { type: String, default: "default"},
    finishDate: { type: Date, default: Date.now},
    paperSize: { type: String, default: "default", },
    numVersion: { type: Number, default: 0  },
    document: {
      title:  { type: String, default: "default", maxLength: 20}, 
      pages:  { type: Number, default: 0}, 
      fileType:  { type: String, default: "default", maxLength: 20}, 
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("printingLogs", printingLog);
