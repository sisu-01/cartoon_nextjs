import mongoose from "mongoose";

const cartoonsSchema = new mongoose.Schema({});

export const Cartoons = mongoose.models.Cartoons || mongoose.model("Cartoons", cartoonsSchema);