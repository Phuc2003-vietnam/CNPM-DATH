import mongoose from "mongoose";
const Schema = mongoose.Schema;
const staff = new Schema(
  {
    email: { type: String, default: "default", maxLength: 100 },
    password: { type: String, default: "default", },
    firstName: { type: String, default: "default", maxLength: 50 },
    lastName: { type: String, default: "default", maxLength: 50 },
    location: {
        facility:  { type: String, default: "CS2", maxLength: 20}, 
        department:  { type: String, default: "H1", maxLength: 20}, 
        room:  { type: String, default: "202", maxLength: 20}, 
      }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("staffs", staff);
