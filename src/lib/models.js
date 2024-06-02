import mongoose from "mongoose";

const cartoonsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  }
});

export const Cartoons = mongoose.models.Cartoons || mongoose.model("Cartoons", cartoonsSchema);
export const Cat = mongoose.models.Cat || mongoose.model("Cat", { name: String });