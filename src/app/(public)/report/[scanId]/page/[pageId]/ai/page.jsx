"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Loader2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  Globe,
  ShieldCheck,
  Clock3,
  CircleCheck,
  CircleAlert,
  RefreshCw,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function AIPageReport() {
  const params = useParams();
  const pageId = params?.pageId;

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [report, setReport] = useState(null);
  const [downloadError, setDownloadError] = useState("");

  useEffect(() => {
    if (!pageId) return;

    let cancelled = false;

    async function fetchReport() {
      try {
        setLoading(true);

        const { data } = await axios.post(`/api/page/${pageId}/ai`);

        if (!cancelled) {
          setReport(data);
        }
      } catch (error) {
        console.error("Error fetching AI report:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReport();

    return () => {
      cancelled = true;
    };
  }, [pageId]);

  const downloadPDF = async () => {
    if (!report?.content || downloading) return;

    setDownloading(true);
    setDownloadError("");

    try {
      const response = await axios.post(
        "/api/download-report",
        {
          content: report.content,
        },
        {
          responseType: "blob",
        },
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "ai-report.pdf";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Download Error:", error);
      setDownloadError("Unable to download the PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const reportContent = report?.content || "";

  const reportTitle = useMemo(() => {
    const heading = reportContent.match(/^#\s+(.+)$/m);

    return heading?.[1]?.trim() || "Performance & Optimization Report";
  }, [reportContent]);

  const reportUrl =
    report?.url || report?.pageUrl || report?.page?.url || "Page-Level Report";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-5 py-12">
        <div className="w-full max-w-md rounded-lg border border-[#dbe2ea] bg-white p-9 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#eff6ff]">
            <Loader2 className="h-6 w-6 animate-spin text-[#4263ff]" />
          </div>

          <h2 className="mt-5 text-[22px] font-bold tracking-[-0.4px] text-[#0f172a]">
            Generating AI Report
          </h2>

          <p className="mt-2 text-[14px] leading-[23px] text-[#64748b]">
            Analyzing Lighthouse insights and preparing your optimization
            recommendations.
          </p>

          <div className="mx-auto mt-7 h-1.5 w-44 overflow-hidden rounded-full bg-[#eaf0f8]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#4263ff]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-16 pt-24 text-[#0f172a] sm:pt-28">
      <header className="border-b border-[#dbe2ea] bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-6 sm:py-8 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-[#4f6cff]" />

                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#dbe6ff] bg-[#eff5ff] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.04em] text-[#4263ff]">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Detailed Analysis
                </span>
              </div>

              <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.035em] text-[#0f172a] sm:text-[40px]">
                Optimization Recommendations
              </h1>

              <p className="mt-3 max-w-[680px] text-[14px] leading-[23px] text-[#64748b] sm:text-[15px]">
                AI-generated analysis of the audited webpage. Findings,
                recommendations, and improvement priorities are based on audit
                signals and best-practice checks.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
              <div className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[5px] border border-[#bbf7d0] bg-[#f0fdf4] px-3.5 text-[12px] font-semibold text-[#15803d] sm:self-auto">
                <CheckCircle2 className="h-4 w-4" />
                Successfully Generated
              </div>

              <button
                type="button"
                onClick={downloadPDF}
                disabled={downloading || !reportContent}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[5px] border border-[#dbe2ea] bg-white px-4 text-[12px] font-bold text-[#334155] shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-colors hover:border-[#b8c8ff] hover:bg-[#f8faff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {downloading ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-lg border border-[#dbe2ea] bg-white px-4 py-4 text-[12px] text-[#64748b] sm:px-5">
            <span className="inline-flex min-w-0 items-center gap-2">
              <Globe className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
              <span className="max-w-[280px] truncate">{reportUrl}</span>
            </span>

            <span className="hidden h-4 w-px bg-[#dbe2ea] sm:block" />

            <span className="inline-flex items-center gap-2">
              <FileText className="h-3.5 w-3.5 text-[#94a3b8]" />
              Page-Level Report
            </span>

            <span className="hidden h-4 w-px bg-[#dbe2ea] sm:block" />

            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#94a3b8]" />
              AI-Generated Analysis
            </span>

            <span className="hidden h-4 w-px bg-[#dbe2ea] sm:block" />

            <span className="inline-flex items-center gap-2 font-semibold text-[#16a34a]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
              Generated
            </span>

            <span className="basis-full text-[11px] leading-[18px] text-[#94a3b8] sm:ml-auto sm:basis-auto sm:text-right">
              Results are AI-generated from audit findings. Review before
              acting.
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pt-7 sm:px-6 sm:pt-8 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-[#dbe2ea] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.025)]">
          <div className="h-[3px] w-full bg-[#4263ff]" />

          <div className="px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
            <div className="border-b border-[#e8edf4] pb-6">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.04em] text-[#4263ff]">
                <span className="h-3.5 w-[3px] rounded-full bg-[#4263ff]" />
                Generated Report
              </div>

              <h2 className="break-words text-[23px] font-bold leading-[1.4] tracking-[-0.025em] text-[#0f172a] sm:text-[28px]">
                {reportTitle}
              </h2>

              <p className="mt-3 max-w-3xl text-[13px] leading-[22px] text-[#64748b] sm:text-[14px] sm:leading-[24px]">
                This report analyzes the audited page across performance, SEO,
                accessibility, and best-practice dimensions. Findings are
                organized by improvement priority.
              </p>
            </div>

            {reportContent ? (
              <article
                className="
                  report-markdown mt-7 min-w-0 max-w-none
                  break-words text-[13px] leading-[1.85] text-[#475569]
                  sm:text-[14px]
                  [&_h1]:mb-5 [&_h1]:mt-0 [&_h1]:text-[28px] [&_h1]:font-bold [&_h1]:leading-[1.3] [&_h1]:tracking-[-0.035em] [&_h1]:text-[#0f172a]
                  [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:flex [&_h2]:scroll-mt-24 [&_h2]:items-center [&_h2]:justify-between [&_h2]:gap-3 [&_h2]:border-b [&_h2]:border-[#e8edf4] [&_h2]:pb-3 [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:leading-[1.5] [&_h2]:tracking-[-0.025em] [&_h2]:text-[#0f172a] sm:[&_h2]:text-[22px]
                  [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-[16px] [&_h3]:font-bold [&_h3]:leading-[1.6] [&_h3]:text-[#1e293b] sm:[&_h3]:text-[17px]
                  [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-[14px] [&_h4]:font-bold [&_h4]:leading-[1.5] [&_h4]:text-[#334155]
                  [&_p]:mb-4 [&_p]:leading-[1.85]
                  [&_strong]:font-semibold [&_strong]:text-[#334155]
                  [&_a]:break-all [&_a]:text-[#2563eb] [&_a]:underline-offset-2 hover:[&_a]:underline
                  [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
                  [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
                  [&_li]:pl-1 [&_li]:leading-[1.85] [&_li]:marker:text-[#4263ff]
                  [&_hr]:my-8 [&_hr]:border-[#e8edf4]
                  [&_blockquote]:my-5 [&_blockquote]:rounded-r-md [&_blockquote]:border-l-[3px] [&_blockquote]:border-[#4263ff] [&_blockquote]:bg-[#eff6ff] [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-[#475569]
                  [&_table]:w-full [&_table]:min-w-[560px] [&_table]:border-collapse [&_table]:text-left [&_table]:text-[12px] sm:[&_table]:text-[13px]
                  [&_thead]:bg-[#f0f3f7]
                  [&_th]:border [&_th]:border-[#e2e8f0] [&_th]:px-4 [&_th]:py-3 [&_th]:font-bold [&_th]:uppercase [&_th]:tracking-[0.025em] [&_th]:text-[#475569]
                  [&_td]:border [&_td]:border-[#e2e8f0] [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_td]:text-[#64748b]
                  [&_tr:nth-child(even)]:bg-[#f8fafc]
                  [&_pre]:my-5 [&_pre]:max-w-full [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:border-[#30384a] [&_pre]:bg-[#1c2232] [&_pre]:p-4 [&_pre]:text-[12px] [&_pre]:leading-[1.8] [&_pre]:text-[#e2e8f0] sm:[&_pre]:p-5 sm:[&_pre]:text-[13px]
                  [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
                  [&_code:not(pre_code)]:rounded-[4px] [&_code:not(pre_code)]:bg-[#eff6ff] [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-[12px] [&_code:not(pre_code)]:text-[#2563eb]
                  [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-md
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ children }) => <h1>{children}</h1>,
                    h2: ({ children }) => (
                      <h2>
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span className="h-5 w-[3px] shrink-0 rounded-full bg-[#4263ff]" />
                          <span className="min-w-0">{children}</span>
                        </span>
                      </h2>
                    ),
                    h3: ({ children }) => <h3>{children}</h3>,
                    table: ({ children }) => (
                      <div className="my-5 max-w-full overflow-x-auto rounded-md border border-[#e2e8f0]">
                        <table>{children}</table>
                      </div>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote>{children}</blockquote>
                    ),
                    pre: ({ children }) => (
                      <div className="my-5 max-w-full overflow-hidden rounded-md border border-[#30384a]">
                        <div className="flex h-8 items-center justify-between border-b border-[#30384a] bg-[#eef1f5] px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#fda4af]" />
                            <span className="h-2 w-2 rounded-full bg-[#fcd34d]" />
                            <span className="h-2 w-2 rounded-full bg-[#6ee7b7]" />
                          </div>
                          <span className="text-[11px] font-medium text-[#94a3b8]">
                            Code
                          </span>
                        </div>
                        <pre className="!m-0 !rounded-none !border-0">
                          {children}
                        </pre>
                      </div>
                    ),
                    a: ({ children, href }) => (
                      <a href={href} target="_blank" rel="noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {reportContent}
                </ReactMarkdown>
              </article>
            ) : (
              <div className="py-12 text-center">
                <FileText className="mx-auto h-9 w-9 text-[#94a3b8]" />
                <h3 className="mt-4 text-[17px] font-semibold text-[#334155]">
                  No report content available
                </h3>
                <p className="mt-2 text-[14px] leading-[22px] text-[#64748b]">
                  The report response did not contain any content.
                </p>
              </div>
            )}
          </div>
        </div>

        {downloadError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-4 py-3.5 text-[13px] leading-[20px] text-red-700"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{downloadError}</span>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-5 rounded-lg border border-[#dbe2ea] bg-white p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.06em] text-[#4263ff]">
              <ShieldCheck className="h-4 w-4" />
              Next Steps
            </div>

            <h3 className="mt-3 text-[21px] font-bold leading-[1.4] tracking-[-0.025em] text-[#0f172a] sm:text-[24px]">
              Apply recommendations to improve website quality
            </h3>

            <p className="mt-3 text-[13px] leading-[22px] text-[#64748b] sm:text-[14px] sm:leading-[23px]">
              Review the recommendations above to improve performance, search
              visibility, accessibility compliance, and user experience.
            </p>
          </div>

          <button
            type="button"
            onClick={downloadPDF}
            disabled={downloading || !reportContent}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[5px] bg-[#4263ff] px-5 text-[12px] font-bold text-white transition-colors hover:bg-[#3151e7] disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:px-6 sm:text-[13px]"
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download Report
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 pb-3 text-[11px] text-[#94a3b8] sm:text-[12px]">
          <span className="inline-flex items-center gap-2">
            <CircleCheck className="h-3.5 w-3.5 text-[#16a34a]" />
            Report generated
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock3 className="h-3.5 w-3.5" />
            Review findings before implementation
          </span>
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="h-3.5 w-3.5" />
            Validate changes with a new audit
          </span>
        </div>
      </section>
    </main>
  );
}
