import { escapeRegex } from "./common";
import { Cartoons, Writers, Series } from "./models";
import { connectToDb } from "./utils";

const limit = 10;

export const getApi = async (writerId) => {
  try {
    await connectToDb();
    const cartoons = await Cartoons.find(
      { writer_id: writerId },
      { _id: false, id: true, title: true}
    ).sort({_id: 1});
    return cartoons;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch getWriterCartoons!");
  }
}

export const getCartoons = async (page, sort, cut, keyword) => {
  try {
    await connectToDb();
    let query = {};
    let sortQuery = {};
    
    if (sort) {
      sortQuery = { recommend: -1 };
    } else {
      sortQuery = { _id: -1 };
    }
    if (cut >= 1) {
      query.recommend = { $gte: cut };
    }

    if (keyword) {
      const escapedKeyword = escapeRegex(keyword);
      query.title = { $regex: escapedKeyword, $options: 'i' };  // 'i' 옵션은 대소문자 구분 없이 검색하기 위해 사용
    }

    const skip = (page - 1) * limit;
    const cartoons = await Cartoons.find(query).sort(sortQuery).skip(skip).limit(limit);
    const count = await Cartoons.countDocuments(query);
    return { cartoons, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch cartoons!");
  }
}

export const getWriters = async (page, sort, keyword) => {
  try {
    await connectToDb();
    let query = {};//검색
    let sortQuery = {};
    if (sort === undefined) {
      sortQuery = { _id: -1 };
    } else {
      switch(sort) {
        case "nickname":
          sortQuery = { nickname: 1 };
          break;
        case "date":
          sortQuery = { _id: 1 };
          break;
        case "count":
          sortQuery = { count: -1 };
          break;
        case "recommend":
          sortQuery = { recommend: -1 };
          break;
        case "average":
          sortQuery = { average: -1 };
          break;
        default:
          sortQuery = { _id: -1 };
          break;
      }
    }
    if (keyword) {
      const escapedKeyword = escapeRegex(keyword);
      query.nickname = { $regex: escapedKeyword, $options: 'i' };  // 'i' 옵션은 대소문자 구분 없이 검색하기 위해 사용
    }

    const skip = (page - 1) * limit;
    const writers = await Writers.find(query).sort(sortQuery).skip(skip).limit(limit);
    const count = await Writers.countDocuments(query);
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
    const cartoons = await Cartoons.find({ writer_id: writerId }).sort({ _id: -1 }).skip(skip).limit(limit);
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

export const getAnonWriterCartoons = async (nickname, page) => {
  try {
    await connectToDb();
    const skip = (page - 1) * limit;
    const cartoons = await Cartoons.find({ writer_id: "a", writer_nickname: nickname }).sort({ _id: -1 }).skip(skip).limit(limit);
    const count = await Cartoons.countDocuments({ writer_id: "a", writer_nickname: nickname });
    return { cartoons, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch getWriterCartoons!");
  }
}

export const getSeries = async (page, sort, cut, keyword) => {
  const limit = 36;
  try {
    await connectToDb();
    let query = {};
    let sortQuery = {};

    if (sort) {
      sortQuery = { average: -1 };
    } else {
      sortQuery = { last_update: -1 };
    }
    if (cut >= 1) {
      query.average = { $gte: cut };
    }
    if (keyword) {
      const escapedKeyword = escapeRegex(keyword);
      query.title = { $regex: escapedKeyword, $options: 'i' };  // 'i' 옵션은 대소문자 구분 없이 검색하기 위해 사용
    }

    const skip = (page - 1) * limit;
    const series = await Series.find(query).sort(sortQuery).skip(skip).limit(limit);
    const count = await Series.countDocuments(query);
    return { series, count, limit };
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch series!");
  }
}

export const getSeriesInfo = async (series_id) => {
  try {
    await connectToDb();
    const series = await Series.findOne({ id: series_id });
    const cartoon = await Cartoons.findOne({ id: series.cartoons_id_list[0] }, { _id: false, og_image: true });
    return { series, cartoon };
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