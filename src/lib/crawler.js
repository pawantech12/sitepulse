import axios from "axios";
import * as cheerio from "cheerio";

export async function crawlWebsite(baseUrl) {
  const visited = new Set();

  try {
    const { data } = await axios.get(baseUrl);

    const $ = cheerio.load(data);

    $("a").each((_, el) => {
      let href = $(el).attr("href");

      if (!href) return;

      if (href.startsWith("/")) {
        visited.add(baseUrl + href);
      }

      if (href.startsWith(baseUrl)) {
        visited.add(href);
      }
    });

    return Array.from(visited).slice(0, 15);
  } catch (err) {
    return [];
  }
}