import { Cartoons, Writers, Series } from "./models";
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

export const getWriterInfo = async (writerId) => {
  try {
    await connectToDb();
    const writerInfo = await Writers.findOne({ id: writerId });
    if (!writerInfo) {
      throw new Error("WriterInfo not found");
    }
    return writerInfo;
  } catch (error) {
    throw new Error("failed to fetch writer info");
    //수정 404 하는 방법
  }
}

export const getAnonWriterInfo = async (nickname) => {
  try {
    await connectToDb();
    const writerInfo = await Writers.findOne({ id: "a", nickname: nickname});
    if (!writerInfo) {
      throw new Error("WriterInfo not found");
    }
    return writerInfo;
  } catch (error) {
    throw new Error("failed to fetch anon writer");
  }
}

export const getSeries = async (page) => {
  const limit = 30;
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    const series = await Series.find().skip(skip).limit(limit);
    const count = await Series.countDocuments();
    return { series, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch series!");
  }
}