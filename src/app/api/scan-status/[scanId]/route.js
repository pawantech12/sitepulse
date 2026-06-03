import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Scan from "@/models/Scan";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { scanId } = await params;

    const scan = await Scan.findById(scanId);

    return NextResponse.json({
      success: true,
      scan,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
