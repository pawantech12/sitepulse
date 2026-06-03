export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Scan from "@/models/Scan";

import { processScan } from "@/lib/processScan";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    let { url } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL is required",
        },
        {
          status: 400,
        },
      );
    }

    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    const scan = await Scan.create({
      url,
      status: "running",
      totalPages: 0,
    });

    processScan(scan._id, url);

    return NextResponse.json({
      success: true,
      scanId: scan._id,
      status: "running",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
