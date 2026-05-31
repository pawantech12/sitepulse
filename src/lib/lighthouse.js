import axios from "axios";

export async function runLighthouse(url) {
  try {
    const apiKey = process.env.PAGESPEED_API_KEY;

    if (!apiKey) {
      throw new Error("PAGESPEED_API_KEY is missing");
    }

    const endpoint =
      "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

    const requestUrl =
      `${endpoint}` +
      `?url=${encodeURIComponent(url)}` +
      `&strategy=mobile` +
      `&category=performance` +
      `&category=seo` +
      `&category=accessibility` +
      `&category=best-practices` +
      `&key=${apiKey}`;

    const { data } = await axios.get(requestUrl, {
      timeout: 60000,
    });

    console.log(
      "Returned Categories:",
      Object.keys(data.lighthouseResult.categories),
    );

    if (!data?.lighthouseResult) {
      throw new Error("No Lighthouse result returned");
    }

    return formatReport(data.lighthouseResult);
  } catch (error) {
    console.error("PageSpeed Error:", error.response?.data || error.message);

    throw error;
  }
}

function formatReport(report) {
  return {
    performance: Math.round((report.categories.performance?.score || 0) * 100),

    seo: Math.round((report.categories.seo?.score || 0) * 100),

    accessibility: Math.round(
      (report.categories.accessibility?.score || 0) * 100,
    ),

    bestPractices: Math.round(
      (report.categories["best-practices"]?.score || 0) * 100,
    ),

    metrics: {
      FCP: report.audits["first-contentful-paint"]?.displayValue || "N/A",

      LCP: report.audits["largest-contentful-paint"]?.displayValue || "N/A",

      CLS: report.audits["cumulative-layout-shift"]?.displayValue || "N/A",

      TBT: report.audits["total-blocking-time"]?.displayValue || "N/A",

      SI: report.audits["speed-index"]?.displayValue || "N/A",
    },

    audits: report.audits,
  };
}
