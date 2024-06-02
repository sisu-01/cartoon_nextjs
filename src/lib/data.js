import { Cartoons } from "./models";
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