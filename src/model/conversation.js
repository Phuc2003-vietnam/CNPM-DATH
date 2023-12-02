import mongoose from 'mongoose'


const conversation = new mongoose.Schema(
  {
    members: {
      type: [String], // This ensures that members is an array of strings
    },
  },
  { timestamps: true }
);

export default mongoose.model('conversations', conversation)
