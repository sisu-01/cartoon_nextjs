import mongoose from "mongoose";

const cartoonsSchema = new mongoose.Schema({
  id:Number,
  title: String,
  date: Date,
  recommend: Number,
  writer_object_id: mongoose.ObjectId,
  writer_id: String,
  writer_nickname: String
});

export const Cartoons = mongoose.models.Cartoons || mongoose.model("Cartoons", cartoonsSchema);