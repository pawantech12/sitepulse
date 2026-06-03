import { crawlWebsite } from "@/lib/crawler";
import { runLighthouse } from "@/lib/lighthouse";
import { formatIssues } from "@/lib/formatIssues";
import { createLog } from "@/lib/createLog";
import { updateLog } from "@/lib/updateLog";

import Scan from "@/models/Scan";
import Page from "@/models/Page";

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}

export async function processScan(scanId, url) {
  try {
    const startTime = Date.now();

    const crawlerLog = await createLog(
      scanId,
      "Initializing crawler",
      "running",
    );

    let pages = await crawlWebsite(url);

    if (crawlerLog?._id) {
      await updateLog(crawlerLog._id, "success");
    }

    await createLog(scanId, `${pages.length} pages discovered`, "success");

    if (!pages.length) {
      pages = [url];
    }

    pages = [...new Set(pages)];

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

        if (log?._id) {
          await updateLog(log._id, "success");
        }
      } catch (error) {
        console.error(error);
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

    await createLog(scanId, "Lighthouse analysis completed", "success");
  } catch (error) {
    console.error(error);
  }
}
