import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { questionNoToDate } from "@/lib/utils";
import { getCurrentDate } from "@/lib/utils";
import fs from "fs/promises";

// we get the questionNo and the assetName from the request params
// need to check if the questionNo date is before today's date (with the 12:00:00 added)
// if it is, return the asset
// otherwise, return a 403 error
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const questionNo = searchParams.get("questionNo");
  const assetName = searchParams.get("assetName");

  if (!questionNo || !assetName) {
    return NextResponse.json({ error: "Missing questionNo or assetName" }, { status: 400 });
  }

  const rawDate = questionNoToDate(questionNo);
  const date = new Date(`${rawDate}T12:00:00`);
  const currentDate = getCurrentDate();

  if (date > currentDate) {
    return NextResponse.json({ error: "Question not released yet!" }, { status: 403 });
  }

  const asset = await fs.readFile(`src/assets/${questionNo}/${assetName}`);
  return new NextResponse(asset, { status: 200 });
}
