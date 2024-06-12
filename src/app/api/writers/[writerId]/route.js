import { Cartoons } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

const limit = 10;

export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const { writerId } = params;
    const page = request.nextUrl.searchParams.get('page');
    const skip = (page - 1) * limit;
    const cartoons = await Cartoons.find({ writer_id: writerId }).skip(skip).limit(limit);
    const count = await Cartoons.countDocuments();
    return NextResponse.json({ cartoons, count, limit });
  } catch (error) {
    throw new Error("failed to fetch writer cartoons");
  }
}