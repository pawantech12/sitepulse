export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Page from "@/models/Page";

import AiPageReport from "@/models/AiPageReport";

import { generatePageAIReport } from "@/lib/grok";

export async function POST(req, { params }) {
  try {
    await connectDB();

    const { pageId } = await params;

    // EXISTING REPORT
    const existing = await AiPageReport.findOne({
      pageId,
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    // PAGE
    const page = await Page.findById(pageId).lean();

    if (!page) {
      return NextResponse.json(
        {
          success: false,
          message: "Page not found",
        },
        {
          status: 404,
        },
      );
    }

    // GENERATE AI REPORT
    const aiContent = await generatePageAIReport(page);

    // SAVE
    const report = await AiPageReport.create({
      pageId,

      content: aiContent,

      generatedAt: new Date(),
    });

    return NextResponse.json(report);
  } catch (error) {
    console.log(error);

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
