import { crawlWebsite } from "@/lib/crawler";
import { runLighthouse } from "@/lib/lighthouse";
import { formatIssues } from "@/lib/formatIssues";
import { createLog } from "@/lib/createLog";
import { updateLog } from "@/lib/updateLog";

import Scan from "@/models/Scan";
import Page from "@/models/Page";
import { enrichIssuesWithAI } from "./enrichIssuesWithAI";

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

export async function processScan(scanId, url) {
  try {
    const startTime = Date.now();

    const connectingLog = await createLog(
      scanId,
      "Connecting to website",
      "running",
    );

    let pages = await crawlWebsite(url);

    if (connectingLog?._id) {
      await updateLog(connectingLog._id, "success");
    }

    const extractionLog = await createLog(
      scanId,
      "Extracting internal links",
      "running",
    );

    if (!pages.length) {
      pages = [url];
    }

    pages = [...new Set(pages)];

    if (extractionLog?._id) {
      await updateLog(extractionLog._id, "success");
    }

    await createLog(scanId, `${pages.length} pages discovered`, "success");

    await Scan.findByIdAndUpdate(scanId, {
      discoveredPages: pages,
      totalPages: pages.length,
      stage: "discovery_completed",
    });

    const createdPages = [];

    let performance = 0;
    let seo = 0;
    let accessibility = 0;
    let bestPractices = 0;

    const lighthouseLog = await createLog(
      scanId,
      "Starting Lighthouse analysis",
      "running",
      "",
      "main",
      null,
    );

    for (const pageUrl of pages) {
      await Scan.findByIdAndUpdate(scanId, {
        currentPage: pageUrl,
        stage: "lighthouse_running",
      });

      let log = null;

      try {
        log = await createLog(
          scanId,
          pageUrl,
          "running",
          pageUrl,
          "sub",
          "lighthouse",
        );

        const result = await runLighthouse(pageUrl);

        // First, format issues using Lighthouse's actual categories.
        const formattedIssues = formatIssues(result.audits, result.categories);

        // Then generate AI explanations and fixes for every issue.
        const enrichedIssues = await enrichIssuesWithAI(
          formattedIssues,
          pageUrl,
        );

        // Save both the AI-enriched issues and original Lighthouse data.
        const page = await Page.create({
          scanId,
          url: pageUrl,
          performance: result.performance,
          seo: result.seo,
          accessibility: result.accessibility,
          bestPractices: result.bestPractices,
          metrics: result.metrics,
          issues: enrichedIssues,
          rawAudits: result.audits,
        });

        createdPages.push(page);

        await Scan.findByIdAndUpdate(scanId, {
          $inc: { completedPages: 1 },
        });

        performance += result.performance;
        seo += result.seo;
        accessibility += result.accessibility;
        bestPractices += result.bestPractices;

        if (log?._id) {
          await updateLog(log._id, "success");
        }
      } catch (error) {
        console.error(error);

        await Scan.findByIdAndUpdate(scanId, {
          $inc: { failedPages: 1 },
        });

        if (log?._id) {
          await updateLog(log._id, "error");
        }
      }
    }

    if (lighthouseLog?._id) {
      await updateLog(lighthouseLog._id, "success");
    }

    const totalPages = createdPages.length;

    const scan = await Scan.findById(scanId);

    scan.status = totalPages > 0 ? "completed" : "failed";

    scan.totalPages = totalPages;

    scan.stage = totalPages > 0 ? "completed" : "failed";
    scan.currentPage = "";

    const reportLog = await createLog(
      scanId,
      "Generating final report",
      "running",
    );

    scan.overallScore =
      totalPages > 0
        ? Math.round(
            (performance + seo + accessibility + bestPractices) /
              (4 * totalPages),
          )
        : 0;

    scan.summary = {
      performance: totalPages ? Math.round(performance / totalPages) : 0,

      seo: totalPages ? Math.round(seo / totalPages) : 0,

      accessibility: totalPages ? Math.round(accessibility / totalPages) : 0,

      bestPractices: totalPages ? Math.round(bestPractices / totalPages) : 0,
    };

    scan.pages = createdPages.map((page) => page._id);

    scan.scanDuration = formatDuration(Date.now() - startTime);

    await scan.save();

    if (reportLog?._id) {
      await updateLog(reportLog._id, "success");
    }

    await createLog(scanId, "Lighthouse analysis completed", "success");
  } catch (error) {
    console.error(error);
  }
}
