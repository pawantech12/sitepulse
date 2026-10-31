import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Scan from "@/models/Scan";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { scanId } = await params;

    if (!mongoose.isValidObjectId(scanId)) {
      return NextResponse.json(
        { success: false, message: "Invalid scan ID" },
        { status: 400 },
      );
    }

    const scan = await Scan.findById(scanId);

    if (!scan) {
      return NextResponse.json(
        { success: false, message: "Scan not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      scan,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Unable to fetch scan status" },
      { status: 500 },
    );
  }
}
