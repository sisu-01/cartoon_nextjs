import mongoose from "mongoose";

const cartoonsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: Date,
  recommend: Number,
  writer_object_id: mongoose.ObjectId,
  writer_id: String,
  writer_nickname: String
});

const nicknameHistorySchema = new mongoose.Schema({
  nickname: String,
  date: Date
});

const writersSchema = new mongoose.Schema({
  id: String,
  nickname: String,
  nickname_history: [nicknameHistorySchema],
  first_date: Date,
  last_date: Date,
  count: Number,
  recommend: Number,
  average: Number
})

export const Cartoons = mongoose.models.Cartoons || mongoose.model("Cartoons", cartoonsSchema);
export const Writers = mongoose.models.Writers || mongoose.model("Writers", writersSchema);