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
    const scanStartTime = Date.now();

    await connectDB();

    const body = await req.json();

    let { url } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "URL is required",
        },
        { status: 400 },
      );
    }

    if (!url.startsWith("http")) {
      url = `https://${url}`;
    }

    // Crawl website
    let pages = await crawlWebsite(url);

    if (!pages.length) {
      pages = [url];
    }

    // Remove duplicates
    pages = [...new Set(pages)];

    const createdPages = [];

    let performance = 0;
    let seo = 0;
    let accessibility = 0;
    let bestPractices = 0;

    for (const pageUrl of pages) {
      try {
        console.log(`Scanning: ${pageUrl}`);

        const result = await runLighthouse(pageUrl);

        console.log("LIGHTHOUSE RESULT");
        console.log({
          url: pageUrl,
          performance: result.performance,
          seo: result.seo,
          accessibility: result.accessibility,
          bestPractices: result.bestPractices,
        });

        const page = await Page.create({
          url: pageUrl,

          performance: result.performance,
          seo: result.seo,
          accessibility: result.accessibility,
          bestPractices: result.bestPractices,

          metrics: result.metrics,

          issues: formatIssues(result.audits),

          rawAudits: result.audits,
        });

        createdPages.push(page);

        performance += result.performance;
        seo += result.seo;
        accessibility += result.accessibility;
        bestPractices += result.bestPractices;
      } catch (pageError) {
        console.error(`Failed scanning ${pageUrl}`, pageError.message);
      }
    }

    const totalPages = createdPages.length;

    const scanDuration = formatDuration(Date.now() - scanStartTime);

    const scan = await Scan.create({
      url,

      status: totalPages > 0 ? "completed" : "failed",

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

      pages: createdPages.map((page) => page._id),

      scanDuration,
    });

    await Promise.all(
      createdPages.map((page) => {
        page.scanId = scan._id;

        return page.save();
      }),
    );

    return NextResponse.json({
      success: true,

      scanId: scan._id,

      totalPages,

      scanDuration,

      status: scan.status,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Scan failed",
      },
      {
        status: 500,
      },
    );
  }
}
