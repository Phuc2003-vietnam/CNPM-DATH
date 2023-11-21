import mongoose from "mongoose";
const Schema = mongoose.Schema;
const printingLog = new Schema(
  {
    status: { type: String, default: "default"},
    finishDate: { type: Date, default: null},
    paperSize: { type: String, default: "default", },
    numVersion: { type: Number, default: 0  },
    colorOption: {type: Boolean, default: false},
    landScapeOption : {type: Boolean, default: false},
    pagesPerSheet: {type: Number, default: 1},

    document: {
      title:  { type: String, default: "default", maxLength: 20}, 
      pages:  { type: Number, default: 0}, 
      fileType:  { type: String, default: "default", maxLength: 20}, 
    },
    //Foreign Key
    user_id: {type:String, default: "default"}, 
    printerId: {type: String, default: 'default', maxLength: 50},
    
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("printingLogs", printingLog);
