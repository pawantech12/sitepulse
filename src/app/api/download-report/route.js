import { NextResponse } from "next/server";

import puppeteer from "puppeteer";

import MarkdownIt from "markdown-it";

import hljs from "highlight.js";

const md = new MarkdownIt({
  html: true,

  linkify: true,

  breaks: true,

  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `
          <pre class="hljs">
            <code>
              ${
                hljs.highlight(str, {
                  language: lang,
                }).value
              }
            </code>
          </pre>
        `;
      } catch (_) {}
    }

    return `
      <pre class="hljs">
        <code>${md.utils.escapeHtml(str)}</code>
      </pre>
    `;
  },
});

export async function POST(req) {
  try {
    const body = await req.json();

    const markdown = body.content || "";

    const htmlContent = md.render(markdown);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />

        <style>
  * {
    box-sizing: border-box;
  }

  body {
    font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;

    padding: 48px;
    color: #0f172a;
    background: #ffffff;
    line-height: 1.8;
    font-size: 15px;
    -webkit-font-smoothing: antialiased;
  }

  /* HEADER */

  .header {
    margin-bottom: 48px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e2e8f0;
  }

  .title {
    font-size: 38px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.2;

    background: linear-gradient(
      90deg,
      #0f766e,
      #4338ca
    );

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    margin-top: 10px;
    color: #64748b;
    font-size: 14px;
  }

  /* HEADINGS */

  h1,
  h2,
  h3,
  h4 {
    color: #0f172a;
    letter-spacing: -0.03em;
    font-weight: 700;
    line-height: 1.3;
  }

  h1 {
    font-size: 34px;
    margin-top: 50px;
    margin-bottom: 20px;
    font-weight: 800;
  }

  h2 {
    font-size: 28px;
    margin-top: 44px;
    margin-bottom: 18px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e2e8f0;
    position: relative;
  }

  h2::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 4px;
    width: 5px;
    height: 32px;
    border-radius: 999px;
    background: linear-gradient(
      to bottom,
      #06b6d4,
      #4f46e5
    );
  }

  h3 {
    font-size: 22px;
    margin-top: 34px;
    margin-bottom: 12px;
  }

  h4 {
    font-size: 18px;
    margin-top: 26px;
    margin-bottom: 10px;
  }

  /* TEXT */

  p {
    margin: 16px 0;
    color: #334155;
    font-size: 15px;
    line-height: 1.9;
  }

  strong {
    color: #0f172a;
    font-weight: 700;
  }

  a {
    color: #0891b2;
    text-decoration: none;
    font-weight: 500;
  }

  /* LISTS */

  ul,
  ol {
    margin: 20px 0;
    padding-left: 26px;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 10px 0;
    color: #334155;
    padding-left: 4px;
    line-height: 1.8;
  }

  li::marker {
    color: #64748b;
    font-weight: 600;
  }

  /* INLINE CODE */

  p code,
  li code,
  td code {
    background: #ecfeff;
    color: #0e7490;
    padding: 3px 7px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    font-family:
      "Fira Code",
      monospace;
  }

  /* CODE BLOCKS */

  pre {
    background: #0f172a;
    border: 1px solid #1e293b;
    border-radius: 22px;
    overflow: hidden;
    margin: 28px 0;
    page-break-inside: avoid;
  }

  pre code {
    display: block;
    padding: 22px 24px;
    margin: 0;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;

    font-family:
      "Fira Code",
      monospace;

    font-size: 13px;
    line-height: 1.75;
    color: #e2e8f0;
    background: transparent;
  }

  .hljs {
    background: transparent !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  /* BLOCKQUOTE */

  blockquote {
    margin: 26px 0;
    padding: 18px 22px;
    border-left: 4px solid #06b6d4;
    background: rgba(236, 254, 255, 0.8);
    border-radius: 0 18px 18px 0;
    color: #334155;
  }

  blockquote p {
    margin: 0;
  }

  /* TABLE */

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 28px;
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid #e2e8f0;
  }

  thead {
    background: #f8fafc;
  }

  th {
    color: #0f172a;
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    padding: 14px 16px;
    border: 1px solid #e2e8f0;
  }

  td {
    color: #334155;
    padding: 14px 16px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }

  tr:nth-child(even) {
    background: #fcfcfd;
  }

  /* HR */

  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 42px 0;
  }

  /* IMAGES */

  img {
    width: 100%;
    border-radius: 24px;
    border: 1px solid #e2e8f0;
    margin-top: 24px;
  }

  /* PAGE BREAKS */

  h1,
  h2,
  h3,
  h4,
  pre,
  table,
  blockquote {
    page-break-inside: avoid;
  }

  /* SCROLL FIX */

  pre,
  table {
    overflow-wrap: anywhere;
  }
</style>
      </head>

      <body>
        <div class="header">
          <div class="title">
            AI Optimization Report
          </div>

          <div class="subtitle">
            Generated on ${new Date().toLocaleString()}
          </div>
        </div>

        ${htmlContent}
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: "new",

      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",

      printBackground: true,

      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition": 'attachment; filename="ai-report.pdf"',
      },
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to generate PDF",
      },
      {
        status: 500,
      },
    );
  }
}
