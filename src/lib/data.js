import { Cartoons, Writers } from "./models";
import { connectToDb } from "./utils";

const limit = 10;

export const getCartoons = async (page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    
    const cartoons = await Cartoons.find({}).skip(skip).limit(limit);

    // 전체 문서 수를 가져와 총 페이지 수 계산
    const count = await Cartoons.countDocuments();

    return {
      cartoons,
      count,
      limit: limit
    };
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