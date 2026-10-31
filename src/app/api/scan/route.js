import { NextResponse } from "next/server";

import Scan from "@/models/Scan";
import { getSession } from "@/lib/auth";

import { processScan } from "@/lib/processScan";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 },
      );
    }

    await connectDB();

    const scans = await Scan.find({
      userId: session.userId,
    })
      .select(
        "url overallScore totalPages scanDuration status summary discoveredPages completedPages failedPages currentPage stage createdAt updatedAt",
      )
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json({
      success: true,
      scans,
    });
  } catch (error) {
    console.error("Get scans API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch scans." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login to start a scan.",
        },
        { status: 401 },
      );
    }

    await connectDB();

    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Website URL is required.",
        },
        { status: 400 },
      );
    }

    let normalizedUrl;

    try {
      normalizedUrl = new URL(
        /^https?:\/\//i.test(url.trim()) ? url.trim() : `https://${url.trim()}`,
      );

      if (!["http:", "https:"].includes(normalizedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid website URL.",
        },
        { status: 400 },
      );
    }

    const scan = await Scan.create({
      userId: session.userId,
      url: normalizedUrl.toString(),
      status: "pending",
      totalPages: 0,
      completedPages: 0,
      failedPages: 0,
      discoveredPages: 0,
    });

    // Keep your existing scanning process
    processScan(scan._id, normalizedUrl.toString()).catch((error) => {
      console.error("Scan processing error:", error);
    });

    return NextResponse.json(
      {
        success: true,
        message: "Scan started successfully.",
        scanId: scan._id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create scan API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to start scan.",
      },
      { status: 500 },
    );
  }
}
