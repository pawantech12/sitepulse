import { connectDB } from "@/lib/mongodb";

import Scan from "@/models/Scan";
import Page from "@/models/Page";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
 const { scanId } = await params;
  const scan = await Scan.findById(scanId).populate(
    "pages",
  );

  return NextResponse.json(scan);
}