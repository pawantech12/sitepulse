import { connectDB } from "@/lib/mongodb";

import Page from "@/models/Page";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
 const { pageId } = await params;
  const page = await Page.findById(pageId);

  return NextResponse.json(page);
}