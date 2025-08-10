import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 150 } 
});


const historyModel = mongoose.model("History", historySchema);

export default historyModel;
