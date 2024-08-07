import mongoose from "mongoose";

const cartoonsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: Date,
  recommend: Number,
  writer_object_id: mongoose.ObjectId,
  writer_id: String,
  writer_nickname: String,
  og_image: String,
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
  average: Number,
  naver: String,
  pixiv: String,
  x: String
})

const seriesSchema = new mongoose.Schema({
  id: Number,
  title: String,
  writer_id: String,
  writer_nickname: String,
  count: Number,
  last_update: Date,
  average: Number,
  cartoons_id_list: [Number],
  og_image: String,
})

export const Cartoons = mongoose.models.Cartoons || mongoose.model("Cartoons", cartoonsSchema);
export const Writers = mongoose.models.Writers || mongoose.model("Writers", writersSchema);
export const Series = mongoose.models.Series || mongoose.model("Series", seriesSchema);