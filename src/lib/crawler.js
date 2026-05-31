import axios from "axios";
import * as cheerio from "cheerio";

export async function crawlWebsite(baseUrl) {
  try {
    const normalizedBase = new URL(baseUrl);

    const { data } = await axios.get(baseUrl, {
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0 SitePulseBot",
      },
    });

    const $ = cheerio.load(data);

    const links = new Set();

    $("a").each((_, element) => {
      const href = $(element).attr("href");

      if (!href) return;

      try {
        const absoluteUrl = new URL(href, baseUrl);

        if (
          absoluteUrl.hostname === normalizedBase.hostname &&
          !absoluteUrl.href.includes("#")
        ) {
          links.add(absoluteUrl.href.replace(/\/$/, ""));
        }
      } catch {}
    });

    return [...links].slice(0, 15);
  } catch (error) {
    console.log("Crawler Error:", error.message);

    return [];
  }
}
