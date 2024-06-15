import { Cartoons, Writers, Series } from "./models";
import { connectToDb } from "./utils";

const limit = 10;

export const getCartoons = async (page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    const cartoons = await Cartoons.find().sort({ _id: -1 }).skip(skip).limit(limit);
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
    const writer = await Writers.findOne({ id: writerId });
    if (!writer) {
      throw new Error("writer not found");
    }
    return writer;
  } catch (error) {
    throw new Error("failed to fetch writer info");
    //수정 404 하는 방법
  }
}

export const getWriterCartoons = async (writerId, page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    console.log(skip, limit);
    const cartoons = await Cartoons.find({ writer_id: writerId }).sort({ _id: 1 }).skip(skip).limit(limit);
    const count = await Cartoons.countDocuments({ writer_id: writerId });
    return { cartoons, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch getWriterCartoons!");
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
    const series = await Series.find().sort({ last_update: -1 }).skip(skip).limit(limit);
    const count = await Series.countDocuments();
    return { series, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch series!");
  }
}

export const getSeriesDetail = async (series_id) => {
  try {
    await connectToDb();
    const series = await Series.find({ id: series_id });
    return series;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch series detail");
  }
}

export const  getSeriesList = async (series_id, page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    const temp = await Series.find({ id: series_id }, { _id: 0, cartoons_id_list: 1, count: 1 });
    const { cartoons_id_list, count } = temp[0];
    const paging = cartoons_id_list.slice(skip, skip + limit);
    const cartoons = await Cartoons.find({ id: { $in: paging}}).sort({ _id: 1 });
    return { cartoons, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch series detail");
  }
}