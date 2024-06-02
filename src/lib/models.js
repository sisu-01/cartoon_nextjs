import mongoose from "mongoose";

const cartoonsSchema = new mongoose.Schema({
  title: {
    type: String
  }
});

export const Cartoons = mongoose.models.Cartoons || mongoose.model("Cartoons", cartoonsSchema);