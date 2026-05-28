import { exec } from "child_process";

import { promisify } from "util";

const execAsync = promisify(exec);

export async function runLighthouse(url) {
  try {
    // remove trailing slash duplication
    const cleanUrl = url.replace(/\/+$/, "");

    const command = `npx lighthouse ${cleanUrl} --output=json --quiet --chrome-flags="--headless --no-sandbox --disable-gpu"`;


    const { stdout } = await execAsync(command, {
      maxBuffer: 1024 * 1024 * 10,
      windowsHide: true,
    });

    const report = JSON.parse(stdout);

    return formatReport(report);
  } catch (error) {
    /**
     * IMPORTANT:
     * Lighthouse on Windows throws EPERM temp folder errors
     * AFTER generating valid JSON.
     */

    if (error.stdout) {
      try {
        const report = JSON.parse(error.stdout);

        return formatReport(report);
      } catch (e) {
        console.log("Failed parsing Lighthouse stdout");
      }
    }

    console.log(error);

    throw error;
  }
}

function formatReport(report) {
  return {
    performance: Math.round(
      report.categories.performance.score * 100,
    ),

    seo: Math.round(
      report.categories.seo.score * 100,
    ),

    accessibility: Math.round(
      report.categories.accessibility.score * 100,
    ),

    bestPractices: Math.round(
      report.categories["best-practices"].score * 100,
    ),

    metrics: {
      FCP:
        report.audits["first-contentful-paint"]
          ?.displayValue || "N/A",

      LCP:
        report.audits[
          "largest-contentful-paint"
        ]?.displayValue || "N/A",

      CLS:
        report.audits[
          "cumulative-layout-shift"
        ]?.displayValue || "N/A",

      TBT:
        report.audits["total-blocking-time"]
          ?.displayValue || "N/A",

      SI:
        report.audits["speed-index"]
          ?.displayValue || "N/A",
    },

    audits: report.audits,
  };
}