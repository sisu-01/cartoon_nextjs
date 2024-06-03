import { Cartoons, Writers } from "./models";
import { connectToDb } from "./utils";

const limit = 10;

export const getCartoons = async (page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    const cartoons = await Cartoons.find().skip(skip).limit(limit);
    const count = await Cartoons.countDocuments();
    return { cartoons, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch cartoons!");
  }
}

export const getWriters = async (page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    const writers = await Writers.find().skip(skip).limit(limit);
    const count = await Writers.countDocuments();
    return { writers, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch writers!");
  }
}