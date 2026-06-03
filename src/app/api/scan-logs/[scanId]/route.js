import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import ScanLog from "@/models/ScanLog";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { scanId } = await params;
    const logs = await ScanLog.find({
      scanId: scanId,
    })
      .sort({
        createdAt: 1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      logs,
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
