import { NextResponse } from "next/server";

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,

  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, {
          language: lang,
        }).value;

        return `
          <pre class="code-block">
            <code>${highlighted}</code>
          </pre>
        `;
      } catch (_) {}
    }

    return `
      <pre class="code-block">
        <code>${md.utils.escapeHtml(str)}</code>
      </pre>
    `;
  },
});

export async function POST(req) {
  let browser;

  try {
    const body = await req.json();

    const markdown = body.content || "";

    if (!markdown.trim()) {
      return NextResponse.json(
        {
          error: "Report content is empty",
        },
        {
          status: 400,
        },
      );
    }

    const htmlContent = md.render(markdown);

    const generatedAt = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const html = `
      <!DOCTYPE html>

      <html>
        <head>
          <meta charset="UTF-8" />

          <style>

            /* =========================================================
               BASE
            ========================================================= */

            * {
              box-sizing: border-box;
            }

            html {
              font-size: 10px;
            }

            body {
              margin: 0;
              padding: 0;

              font-family:
                Arial,
                Helvetica,
                sans-serif;

              color: #1e293b;
              background: #ffffff;

              font-size: 10.5pt;
              line-height: 1.55;

              -webkit-font-smoothing: antialiased;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }

            /* =========================================================
               REPORT HEADER
            ========================================================= */

            .report-header {
              padding-bottom: 18px;
              margin-bottom: 24px;

              border-bottom: 1px solid #dbe2ea;
            }

            .report-kicker {
              margin-bottom: 5px;

              color: #64748b;

              font-size: 8.5pt;
              font-weight: 700;

              letter-spacing: 0.08em;
              text-transform: uppercase;
            }

            .report-title {
              margin: 0;

              color: #0f172a;

              font-size: 23pt;
              font-weight: 750;

              line-height: 1.15;
              letter-spacing: -0.02em;
            }

            .report-meta {
              margin-top: 7px;

              color: #64748b;

              font-size: 8.5pt;
              line-height: 1.4;
            }

            /* =========================================================
               TYPOGRAPHY
            ========================================================= */

            h1,
            h2,
            h3,
            h4 {
              color: #0f172a;

              font-weight: 700;

              line-height: 1.3;

              page-break-after: avoid;
              break-after: avoid-page;
            }

            h1 {
              margin: 28px 0 12px;

              font-size: 20pt;
              letter-spacing: -0.015em;
            }

            h2 {
              margin: 25px 0 10px;

              padding-bottom: 6px;

              font-size: 15pt;

              border-bottom: 1px solid #dbe2ea;
            }

            h3 {
              margin: 18px 0 7px;

              font-size: 12.5pt;
            }

            h4 {
              margin: 14px 0 6px;

              font-size: 10.5pt;
            }

            p {
              margin: 7px 0;

              color: #334155;

              font-size: 10.5pt;
              line-height: 1.58;
            }

            strong {
              color: #172033;
              font-weight: 700;
            }

            em {
              color: #475569;
            }

            /* =========================================================
               LINKS
            ========================================================= */

            a {
              color: #0369a1;
              text-decoration: none;
            }

            /* =========================================================
               LISTS
            ========================================================= */

            ul,
            ol {
              margin: 8px 0 10px;

              padding-left: 21px;
            }

            li {
              margin: 3px 0;

              padding-left: 3px;

              color: #334155;

              font-size: 10.25pt;
              line-height: 1.5;
            }

            li::marker {
              color: #64748b;
            }

            /* =========================================================
               INLINE CODE
            ========================================================= */

            code {
              font-family:
                "SFMono-Regular",
                Consolas,
                "Liberation Mono",
                monospace;
            }

            p code,
            li code,
            td code,
            th code {
              padding: 1px 4px;

              color: #075985;
              background: #f0f9ff;

              border: 1px solid #e0f2fe;
              border-radius: 3px;

              font-size: 8.5pt;
            }

            /* =========================================================
               CODE BLOCKS
            ========================================================= */

            pre.code-block {
              margin: 10px 0 13px;

              padding: 11px 13px;

              color: #e2e8f0;
              background: #0f172a;

              border: 1px solid #1e293b;
              border-radius: 5px;

              overflow: hidden;

              page-break-inside: avoid;
              break-inside: avoid;
            }

            pre.code-block code {
              display: block;

              padding: 0;

              color: #e2e8f0;
              background: transparent;

              font-family:
                "SFMono-Regular",
                Consolas,
                "Liberation Mono",
                monospace;

              font-size: 8.25pt;
              line-height: 1.5;

              white-space: pre-wrap;
              overflow-wrap: anywhere;
              word-break: break-word;
            }

            /* =========================================================
               BLOCKQUOTE
            ========================================================= */

            blockquote {
              margin: 12px 0;

              padding: 9px 13px;

              color: #475569;

              background: #f8fafc;

              border-left: 3px solid #94a3b8;
            }

            blockquote p {
              margin: 0;

              color: #475569;

              font-size: 9.75pt;
            }

            /* =========================================================
               TABLES
            ========================================================= */

            table {
              width: 100%;

              margin: 12px 0 16px;

              border-collapse: collapse;

              border: 1px solid #cbd5e1;

              font-size: 9pt;

              page-break-inside: auto;
              break-inside: auto;
            }

            thead {
              display: table-header-group;
            }

            th {
              padding: 7px 8px;

              color: #1e293b;

              background: #f1f5f9;

              border: 1px solid #cbd5e1;

              font-size: 8.75pt;
              font-weight: 700;

              text-align: left;
              vertical-align: top;
            }

            td {
              padding: 7px 8px;

              color: #334155;

              border: 1px solid #cbd5e1;

              font-size: 8.75pt;

              line-height: 1.45;

              vertical-align: top;
            }

            tr {
              page-break-inside: avoid;
              break-inside: avoid;
            }

            tr:nth-child(even) td {
              background: #fafbfc;
            }

            /* =========================================================
               HORIZONTAL RULE
            ========================================================= */

            hr {
              height: 1px;

              margin: 20px 0;

              border: 0;

              background: #dbe2ea;
            }

            /* =========================================================
               IMAGES
            ========================================================= */

            img {
              display: block;

              max-width: 100%;
              height: auto;

              margin: 12px auto;

              border: 1px solid #dbe2ea;
              border-radius: 5px;

              page-break-inside: avoid;
              break-inside: avoid;
            }

            /* =========================================================
               PAGE BREAK CONTROL
            ========================================================= */

            h1,
            h2,
            h3,
            h4 {
              break-after: avoid-page;
            }

            p,
            ul,
            ol,
            blockquote {
              orphans: 3;
              widows: 3;
            }

            /* Prevent tiny orphaned sections */
            h2 + p,
            h2 + ul,
            h2 + ol,
            h2 + table,
            h3 + p,
            h3 + ul,
            h3 + ol {
              break-before: avoid-page;
            }

            /* =========================================================
               FOOTER
            ========================================================= */

            @page {
              size: A4;

              margin:
                18mm
                16mm
                18mm
                16mm;
            }

          </style>
        </head>

        <body>

          <header class="report-header">

            <div class="report-kicker">
              SitePulse · Technical Audit
            </div>

            <h1 class="report-title">
              AI Optimization Report
            </h1>

            <div class="report-meta">
              Generated ${generatedAt}
            </div>

          </header>

          <main>
            ${htmlContent}
          </main>

        </body>
      </html>
    `;

    /* =========================================================
       LAUNCH BROWSER
    ========================================================= */

    if (process.env.VERCEL) {
      browser = await puppeteer.launch({
        args: chromium.args,

        executablePath: await chromium.executablePath(),

        headless: true,
      });
    } else {
      browser = await puppeteer.launch({
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",

        headless: true,

        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }

    const page = await browser.newPage();

    await page.setViewport({
      width: 1240,
      height: 1754,
      deviceScaleFactor: 1,
    });

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    /* =========================================================
       PDF
    ========================================================= */

    const pdfBuffer = await page.pdf({
      format: "A4",

      printBackground: true,

      preferCSSPageSize: true,

      displayHeaderFooter: true,

      headerTemplate: `
        <div></div>
      `,

      footerTemplate: `
        <div
          style="
            width: 100%;
            padding: 0 16mm;

            display: flex;
            justify-content: space-between;
            align-items: center;

            font-family: Arial, Helvetica, sans-serif;
            font-size: 7.5px;
            color: #94a3b8;
          "
        >
          <span>
            SitePulse · AI Optimization Report
          </span>

          <span>
            Page
            <span class="pageNumber"></span>
            of
            <span class="totalPages"></span>
          </span>
        </div>
      `,

      margin: {
        top: "18mm",
        right: "16mm",
        bottom: "18mm",
        left: "16mm",
      },
    });

    await browser.close();
    browser = null;

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",

        "Content-Disposition": 'attachment; filename="ai-report.pdf"',

        "Content-Length": String(pdfBuffer.length),
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);

    if (browser) {
      try {
        await browser.close();
      } catch (_) {}
    }

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
