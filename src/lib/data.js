import { Cat, Cartoons } from "./models";
import { connectToDb } from "./utils";

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

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