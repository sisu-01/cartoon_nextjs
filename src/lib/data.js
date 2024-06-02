import { Cartoons, Writers } from "./models";
import { connectToDb } from "./utils";

export const getCartoons = async () => {
  try {
    await connectToDb();
    const cartoons = await Cartoons.find({});
    return cartoons;
  } catch (error) {
    console.log(error);
    throw new Error("faile to fetch cartoons!");
  }
}

export const getWriters = async () => {
  try {
    await connectToDb();
    const writers = await Writers.find({});
    return writers;
  } catch (error) {
    console.log(error);
    throw new Error("faile to fetch writers!");
  }
}