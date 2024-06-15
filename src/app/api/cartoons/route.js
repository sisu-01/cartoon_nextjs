import { Cartoons } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const count = await Cartoons.countDocuments();
    const random = Math.floor(Math.random() * count);
    const cartoon = await Cartoons.findOne().skip(random);
    return NextResponse.json(cartoon);
  } catch (error) {
    throw new Error("failed to fetch writer cartoons");
  }
}