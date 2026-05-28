export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import { crawlWebsite } from "@/lib/crawler";

import { runLighthouse } from "@/lib/lighthouse";

import Scan from "@/models/Scan";
import Page from "@/models/Page";
import { formatIssues } from "@/lib/formatIssues";

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

export async function POST(req) {
  try {
    // START TIMER
    const scanStartTime = Date.now();

    await connectDB();

    const body = await req.json();

    const { url } = body;

    const pages = await crawlWebsite(url);

    if (!pages.length) {
      pages.push(url);
    }

    const createdPages = [];

    let performance = 0;
    let seo = 0;
    let accessibility = 0;
    let bestPractices = 0;

    for (const pageUrl of pages) {
      try {
        const result = await runLighthouse(pageUrl);

        const page = await Page.create({
          url: pageUrl,

          performance: result.performance,

          seo: result.seo,

          accessibility: result.accessibility,

          bestPractices: result.bestPractices,

          metrics: result.metrics,

          issues: formatIssues(result.audits),
        });

        createdPages.push(page);

        performance += result.performance;
        seo += result.seo;
        accessibility += result.accessibility;
        bestPractices += result.bestPractices;
      } catch (pageError) {
        console.log(`Failed analyzing page: ${pageUrl}`, pageError);
      }
    }

    const totalPages = createdPages.length;

    // REALTIME DURATION
    const scanEndTime = Date.now();

    const scanDuration = formatDuration(scanEndTime - scanStartTime);

    const scan = await Scan.create({
      url,

      totalPages,

      overallScore:
        totalPages > 0
          ? Math.round(
              (performance + seo + accessibility + bestPractices) /
                (4 * totalPages),
            )
          : 0,

      summary: {
        performance: totalPages > 0 ? Math.round(performance / totalPages) : 0,

        seo: totalPages > 0 ? Math.round(seo / totalPages) : 0,

        accessibility:
          totalPages > 0 ? Math.round(accessibility / totalPages) : 0,

        bestPractices:
          totalPages > 0 ? Math.round(bestPractices / totalPages) : 0,
      },

      pages: createdPages.map((p) => p._id),

      // DYNAMIC DURATION
      scanDuration,
    });

    for (const page of createdPages) {
      page.scanId = scan._id;

      await page.save();
    }

    return NextResponse.json({
      success: true,

      scanId: scan._id,

      scanDuration,

      totalPages,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
