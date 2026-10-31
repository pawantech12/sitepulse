import { NextResponse } from "next/server";

import Scan from "@/models/Scan";
import Page from "@/models/Page";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    await connectDB();

    const { scanId } = await params;

    const scan = await Scan.findOne({
      _id: scanId,
      userId: session.userId,
    }).populate("pages");

    if (!scan) {
      return NextResponse.json(
        { success: false, message: "Scan not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      scan,
    });
  } catch (error) {
    console.error("Get scan API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch scan." },
      { status: 500 },
    );
  }
}
