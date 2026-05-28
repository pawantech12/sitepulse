"use client";

import axios from "axios";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  Loader2,
  Sparkles,
  ShieldCheck,
  Globe,
  Clock3,
  CheckCircle2,
  ChevronRight,
  Cpu,
  WandSparkles,
} from "lucide-react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github.css";
import jsPDF from "jspdf";

import MarkdownIt from "markdown-it";

import { Download } from "lucide-react";

export default function AIPageReport() {
  const { pageId } = useParams();

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const [report, setReport] = useState(null);

  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });

  useEffect(() => {
    if (!pageId) return;

    async function fetchReport() {
      try {
        const { data } = await axios.post(`/api/page/${pageId}/ai`);

        setReport(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [pageId]);

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const response = await axios.post(
        "/api/download-report",
        {
          content: report?.content,
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
      console.log("PDF Download Error:", error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-6">
        <div className="w-full max-w-sm rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-[0_10px_40px_rgba(15,23,42,0.05)]">
          {/* Loader */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>

          {/* Text */}
          <h2 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
            Generating AI Report
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Analyzing Lighthouse insights...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen overflow-hidden bg-[#f8fafc] pb-24 pt-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="absolute right-0 top-[20%] h-[380px] w-[380px] rounded-full bg-indigo-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* REPORT CONTAINER */}
        <div className="relative mt-10 overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
          {/* Top Bar */}
          <div className="flex flex-col gap-5 border-b border-slate-100 px-8 py-7 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
                AI Detailed Analysis
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Optimization Recommendations
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Successfully Generated
              </div>

              <button
                onClick={downloadPDF}
                disabled={downloading}
                className="
    group relative inline-flex h-12 items-center justify-center gap-2.5
    overflow-hidden rounded-2xl border border-slate-200
    bg-white px-5 text-sm font-semibold text-slate-700
    shadow-sm transition-all duration-300
    hover:-translate-y-0.5
    hover:border-cyan-200
    hover:bg-cyan-50
    hover:text-cyan-700
    disabled:cursor-not-allowed
    disabled:opacity-70
    disabled:hover:translate-y-0
  "
              >
                {/* Content */}
                <div className="relative flex items-center gap-2.5">
                  {downloading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-600" />

                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 transition-colors duration-300 group-hover:bg-cyan-100">
                        <Download className="h-4 w-4" />
                      </div>

                      <span>Download PDF</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* MARKDOWN CONTENT */}
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
            <article
              className="
      prose max-w-none
      prose-headings:scroll-mt-24
      prose-headings:font-bold
      prose-headings:tracking-tight
      prose-headings:text-slate-900

      prose-h1:text-4xl
      prose-h1:mb-8
      prose-h1:font-extrabold

      prose-h2:mt-14
      prose-h2:mb-5
      prose-h2:text-2xl
      prose-h2:font-bold
      prose-h2:border-b
      prose-h2:border-slate-200
      prose-h2:pb-3

      prose-h3:mt-10
      prose-h3:mb-3
      prose-h3:text-xl
      prose-h3:font-semibold

      prose-h4:mt-8
      prose-h4:mb-2
      prose-h4:text-lg
      prose-h4:font-semibold

      prose-p:text-[16px]
      prose-p:leading-8
      prose-p:text-slate-700

      prose-strong:font-semibold
      prose-strong:text-slate-900

      prose-a:text-cyan-700
      prose-a:no-underline
      hover:prose-a:text-cyan-600

      prose-ul:my-5
      prose-ul:list-disc
      prose-ul:pl-6

      prose-ol:my-6
prose-ol:list-decimal
prose-ol:pl-8
prose-ol:space-y-3
prose-ol:marker:font-bold
prose-ol:marker:text-cyan-700

      prose-li:my-2
      prose-li:pl-1
      prose-li:text-slate-700
      prose-li:marker:font-semibold
      prose-li:marker:text-slate-500

      prose-code:rounded-md
      prose-code:bg-cyan-50
      prose-code:px-1.5
      prose-code:py-1
      prose-code:text-[14px]
      prose-code:font-medium
      prose-code:text-cyan-700

      prose-pre:overflow-x-auto
      prose-pre:rounded-[24px]
      prose-pre:border
      prose-pre:border-slate-200
      prose-pre:bg-[#0f172a]
      prose-pre:px-5
      prose-pre:py-4

      prose-blockquote:rounded-r-2xl
      prose-blockquote:border-l-4
      prose-blockquote:border-cyan-500
      prose-blockquote:bg-cyan-50/60
      prose-blockquote:py-1
      prose-blockquote:pl-5
      prose-blockquote:text-slate-700

      prose-table:border
      prose-table:border-slate-200

      prose-th:bg-slate-100
      prose-th:text-slate-900
      prose-th:font-semibold

      prose-td:text-slate-700

      prose-img:rounded-3xl
      prose-img:border
      prose-img:border-slate-200

      prose-hr:border-slate-200
    "
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="bg-gradient-to-r from-cyan-700 to-indigo-700 bg-clip-text text-transparent">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="flex items-center gap-3">
                      <span className="h-8 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-indigo-500" />

                      <span>{children}</span>
                    </h2>
                  ),

                  table: ({ children }) => (
                    <div className="overflow-x-auto rounded-[24px] border border-slate-200">
                      <table>{children}</table>
                    </div>
                  ),

                  blockquote: ({ children }) => (
                    <blockquote>{children}</blockquote>
                  ),

                  ol: ({ children }) => (
                    <ol className="my-6 list-decimal space-y-3 pl-8 marker:font-bold marker:text-cyan-700">
                      {children}
                    </ol>
                  ),

                  ul: ({ children }) => (
                    <ul className="my-6 list-disc space-y-3 pl-8 marker:text-cyan-600">
                      {children}
                    </ul>
                  ),

                  li: ({ children }) => (
                    <li className="pl-2 text-slate-700 leading-8">
                      {children}
                    </li>
                  ),

                  code(props) {
                    const { children, className } = props;

                    const isInline = !className;

                    if (isInline) {
                      return (
                        <code className="rounded-md bg-cyan-50 px-1.5 py-1 font-medium text-cyan-700">
                          {children}
                        </code>
                      );
                    }

                    return <code className={className}>{children}</code>;
                  },
                }}
              >
                {report?.content || ""}
              </ReactMarkdown>
            </article>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Ready To Improve?
              </p>

              <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Apply recommendations and boost your website quality
              </h3>

              <p className="mt-5 text-base leading-8 text-slate-600">
                Follow the AI recommendations above to improve page speed,
                Lighthouse score, SEO rankings, accessibility compliance and
                overall user experience.
              </p>
            </div>

            <button className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-7 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/30">
              Start New Analysis
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
