"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import axios from "axios";

import {
  Activity,
  AlertTriangle,
  ArrowUpDown,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileWarning,
  Globe,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import { useParams } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Info } from "lucide-react";
import { Globe2 } from "lucide-react";
import { FileText } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Download } from "lucide-react";
import { Zap } from "lucide-react";
import { Accessibility } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { FileCode2 } from "lucide-react";
import { Copy } from "lucide-react";
import { List } from "lucide-react";
import { Circle } from "lucide-react";
import formatScanDate from "@/lib/formatDate";
import { Code2 } from "lucide-react";

export default function ReportPage() {
  const params = useParams();

  const scanId = params.scanId;

  const [search, setSearch] = useState("");

  const [selectedPage, setSelectedPage] = useState(null);

  const [activeTab, setActiveTab] = useState("performance");

  const [scan, setScan] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [openIssue, setOpenIssue] = useState(null);
  const [openElement, setOpenElement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const toggleIssue = (id) => {
    setOpenIssue((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchScan = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/report/${scanId}`);

        setScan(res.data.scan);

        if (res.data?.scan?.pages?.length > 0) {
          setSelectedPage(res.data.scan.pages[0]);
        }
      } catch (err) {
        console.log(err);

        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    fetchScan();
  }, [params.scanId]);

  const summaryCards = useMemo(() => {
    if (!scan) return [];

    return [
      {
        title: "Performance",
        score: scan.summary?.performance || 0,
        color:
          "bg-orange-50 border-orange-100 text-orange-600 shadow-orange-100/40",
      },
      {
        title: "SEO",
        score: scan.summary?.seo || 0,
        color:
          "bg-emerald-50 border-emerald-100 text-emerald-600 shadow-emerald-100/40",
      },
      {
        title: "Accessibility",
        score: scan.summary?.accessibility || 0,
        color:
          "bg-indigo-50 border-indigo-100 text-indigo-600 shadow-indigo-100/40",
      },
      {
        title: "Best Practices",
        score: scan.summary?.bestPractices || 0,
        color: "bg-cyan-50 border-cyan-100 text-cyan-600 shadow-cyan-100/40",
      },
    ];
  }, [scan]);

  const pages = useMemo(() => {
    if (!scan?.pages) return [];

    return scan.pages.map((page) => {
      const issueCount =
        (page.issues?.performance?.length || 0) +
        (page.issues?.seo?.length || 0) +
        (page.issues?.accessibility?.length || 0) +
        (page.issues?.practices?.length || 0);

      return {
        ...page,
        id: page._id,
        issueCount,
      };
    });
  }, [scan]);

  const metrics = useMemo(() => {
    if (!selectedPage?.metrics) return [];

    return [
      {
        metric: "FCP",
        value: selectedPage.metrics?.FCP || "N/A",
        status: getMetricStatus(selectedPage.metrics?.FCP),
      },
      {
        metric: "LCP",
        value: selectedPage.metrics?.LCP || "N/A",
        status: getMetricStatus(selectedPage.metrics?.LCP),
      },
      {
        metric: "CLS",
        value: selectedPage.metrics?.CLS || "N/A",
        status: getMetricStatus(selectedPage.metrics?.CLS),
      },
      {
        metric: "TBT",
        value: selectedPage.metrics?.TBT || "N/A",
        status: getMetricStatus(selectedPage.metrics?.TBT),
      },
      {
        metric: "Speed Index",
        value: selectedPage.metrics?.SI || "N/A",
        status: getMetricStatus(selectedPage.metrics?.SI),
      },
    ];
  }, [selectedPage]);

  const issues = useMemo(() => {
    if (!selectedPage?.issues) {
      return {
        performance: [],
        seo: [],
        accessibility: [],
        practices: [],
      };
    }

    const cleanDescription = (text = "") => {
      return String(text)
        .replace(/\[Learn more.*?\]\(.*?\)/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const formatCategory = (category = []) => {
      if (!Array.isArray(category)) return [];

      return category.map((issue) => ({
        id: issue.id,
        title: issue.title || "Unknown Issue",
        severity: issue.severity || "Medium",
        description: cleanDescription(issue.description),

        // Keep files and DOM elements separate.
        // Do not insert "Website Page" as a fake file.
        files: Array.isArray(issue.files)
          ? issue.files.filter(
              (file) => typeof file === "string" && file.trim(),
            )
          : [],

        elements: Array.isArray(issue.elements)
          ? issue.elements.filter(
              (item) =>
                item && typeof item === "object" && !Array.isArray(item),
            )
          : [],

        // Console errors are separate from DOM elements and files.
        consoleErrors: Array.isArray(issue.consoleErrors)
          ? issue.consoleErrors.filter(
              (item) =>
                item && typeof item === "object" && !Array.isArray(item),
            )
          : [],

        impact:
          issue.impact ||
          "This issue may negatively affect website quality and user experience.",

        solution:
          issue.solution ||
          "Follow Lighthouse recommendations to optimize this issue.",

        displayValue: issue.displayValue ?? null,
        score: issue.score ?? null,
        numericValue: issue.numericValue ?? null,

        // Keep DOM diagnostics available separately.
        details: Array.isArray(issue.details) ? issue.details : [],
      }));
    };

    return {
      performance: formatCategory(selectedPage.issues.performance),
      seo: formatCategory(selectedPage.issues.seo),
      accessibility: formatCategory(selectedPage.issues.accessibility),
      practices: formatCategory(selectedPage.issues.practices),
    };
  }, [selectedPage]);

  const filteredPages = useMemo(() => {
    return pages.filter((page) =>
      page.url.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, pages]);

  const totalFilteredPages = Math.ceil(filteredPages.length / itemsPerPage);

  const paginatedPages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return filteredPages.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPages, currentPage, itemsPerPage]);

  const startItem =
    filteredPages.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(currentPage * itemsPerPage, filteredPages.length);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    if (currentPage > totalFilteredPages && totalFilteredPages > 0) {
      setCurrentPage(totalFilteredPages);
    }
  }, [currentPage, totalFilteredPages]);

  function getMetricStatus(value) {
    if (!value) return "Average";

    const num = parseFloat(value);

    if (isNaN(num)) return "Average";

    if (num <= 2) return "Good";

    if (num <= 4) return "Needs Improvement";

    return "Poor";
  }

  const hasValidDetailData = (details = []) => {
    if (!Array.isArray(details)) return false;

    return details.some(
      (detail) =>
        detail &&
        typeof detail === "object" &&
        typeof detail.url === "string" &&
        detail.url.trim() !== "" &&
        (detail.totalBytes != null ||
          detail.wastedBytes != null ||
          detail.wastedPercent != null ||
          detail.total != null ||
          detail.scripting != null ||
          detail.scriptParseCompile != null ||
          detail.statistic != null),
    );
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#fafbfc] px-6 py-20">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-[6px] border border-[#bfdbfe] bg-[#eff6ff]">
            <Loader2 className="h-7 w-7 animate-spin text-[#2563eb]" />
          </div>

          <p className="mt-6 text-[16px] font-semibold leading-6 text-[#0f172a]">
            Loading scan report...
          </p>

          <p className="mt-2 text-[12px] leading-5 text-[#94a3b8]">
            Preparing your website performance findings
          </p>
        </div>
      </section>
    );
  }

  if (error || !scan) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafbfc] px-6 py-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-red-500/[0.025] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-orange-400/[0.025] blur-3xl" />
        </div>

        <div className="w-full max-w-[680px]">
          <div className="overflow-hidden rounded-[6px] border border-[#dbe4ef] bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
            <div className="h-[4px] w-full bg-[#ef4444]" />

            <div className="px-8 py-9 sm:px-10 sm:py-10">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[6px] border border-[#fecaca] bg-[#fef2f2]">
                  <AlertTriangle className="h-7 w-7 text-[#ef4444]" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-[21px] font-semibold leading-7 text-[#0f172a]">
                      Report Not Available
                    </h1>

                    <span className="inline-flex h-6 items-center gap-1.5 rounded-[3px] border border-[#fecaca] bg-[#fef2f2] px-2.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-[#ef4444]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
                      Error
                    </span>
                  </div>

                  <p className="mt-2 text-[13px] leading-[21px] text-[#64748b]">
                    We couldn&apos;t load this scan report. The report may have
                    been deleted, expired, or the provided scan ID is invalid.
                  </p>
                </div>
              </div>

              {error && (
                <div className="mt-7 border border-[#fed7aa] bg-[#fffaf0] px-4 py-4">
                  <div className="flex gap-4">
                    <div className="mt-0.5 h-8 w-0.5 shrink-0 bg-[#f59e0b]" />

                    <p className="min-w-0 text-[12px] leading-[20px] text-[#92400e]">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-[#edf1f5] pt-7">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#94a3b8]">
                  Recommended Actions
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/analyze"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] bg-[#0b1020] px-5 text-[12px] font-semibold text-white transition-colors hover:bg-[#171d2e]"
                  >
                    Analyze New Website
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border border-[#dbe4ef] bg-white px-5 text-[12px] font-semibold text-[#475569] transition-colors hover:bg-[#f8fafc]"
                  >
                    Try Again
                  </button>
                </div>
              </div>

              <div className="mt-8 border-t border-[#edf1f5] pt-5">
                <div className="flex items-center justify-between gap-5">
                  <p className="text-[10px] font-medium text-[#cbd5e1]">
                    SitePulse
                  </p>

                  <p className="text-right text-[10px] font-medium text-[#cbd5e1]">
                    Website Performance Intelligence Platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  console.log("Scan Data : ", scan);
  console.log("selected Page data: ", selectedPage);

  const issueCounts = (scan?.pages ?? []).reduce(
    (counts, page) => {
      const issueCategories = page.issues ?? {};

      Object.values(issueCategories).forEach((issues) => {
        if (!Array.isArray(issues)) return;

        issues.forEach((issue) => {
          const severity = issue.severity?.toLowerCase();

          if (severity === "critical" || severity === "high") {
            counts.critical += 1;
          } else if (severity === "medium" || severity === "warning") {
            counts.warnings += 1;
          } else if (
            severity === "low" ||
            severity === "info" ||
            severity === "informational"
          ) {
            counts.info += 1;
          }
        });
      });

      return counts;
    },
    { critical: 0, warnings: 0, info: 0 },
  );

  return (
    <section className="min-h-screen bg-[#fafafa] pt-28">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-[18px] lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#4F6AF5]" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.02em] text-[#4F6AF5]">
                      Website Audit Report
                    </span>
                  </div>

                  <h1 className=" text-[36px] font-bold leading-[48px] tracking-[-0.035em] text-[#0B1020] sm:text-[40px]">
                    Scan Results
                  </h1>

                  <p className=" max-w-[1000px] text-[13px] leading-[23px] text-[#6B7280] sm:text-[15px]">
                    Review your website’s overall health, category scores,
                    discovered pages, performance metrics, and actionable audit
                    findings.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-[10px] sm:flex-row">
                  <Link
                    href="/analyze"
                    className="group flex items-center justify-center gap-[7px] rounded-[5px] border border-[#DDE1EA] bg-white px-[16px] py-[9px] text-[13px] font-bold text-[#374151] transition-colors hover:border-[#c9d1dc] hover:bg-[#fafbfd]"
                  >
                    <RefreshCw className="h-[13px] w-[13px] text-[#6B7280] transition-transform duration-300 group-hover:rotate-180" />
                    Start New Scan
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-[6px] border border-[#DDE1EA] bg-white px-5">
                <div className="grid grid-cols-1 divide-y divide-[#dce2ea] sm:grid-cols-2 lg:grid-cols-[1.55fr_0.8fr_0.72fr_0.72fr_1.15fr] lg:divide-x lg:divide-y-0">
                  <div className="min-w-0 pr-[24px] py-[14px] flex flex-col gap-[3px]">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Website URL
                    </p>

                    <div className=" flex min-w-0 items-center gap-[6px]">
                      <Globe2 className="h-[12px] w-[12px] shrink-0 text-[#6B7280]" />

                      <span className="truncate font-mono text-[13px] font-bold text-[#0B1020]">
                        {scan?.url}
                      </span>
                    </div>
                  </div>

                  <div className="px-[24px] py-[14px] flex flex-col gap-[3px]">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Scan Status
                    </p>

                    <div className="flex items-center gap-[6px]">
                      <span
                        className={`h-[7px] w-[7px] rounded-full ${scan.status === "completed" ? "bg-[#22C55E]" : "bg-[#EF4444]"}`}
                      />
                      <span
                        className={`text-[13px] font-bold ${scan.status === "completed" ? "text-[#16A34A]" : "text-[#EF4444]"}`}
                      >
                        {scan.status}
                      </span>
                    </div>
                  </div>

                  <div className="px-[24px] py-[14px] flex flex-col gap-[3px]">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Scan Duration
                    </p>

                    <p className="font-mono text-[13px] font-bold text-[#374151]">
                      {scan.scanDuration}
                    </p>
                  </div>

                  <div className="px-[24px] py-[14px] flex flex-col gap-[3px]">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Report ID
                    </p>

                    <p className="font-mono text-[13px] font-bold text-[#374151]">
                      {scanId}
                    </p>
                  </div>

                  <div className="pl-[24px] py-[14px] flex flex-col gap-[3px]">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Generated
                    </p>

                    <p className="text-[13px] font-medium text-[#374151]">
                      {formatScanDate(scan.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[10px] sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-[4px]">
                  <h2 className="text-[22px] font-bold tracking-[-0.025em] text-[#0B1020]">
                    Website Health Overview
                  </h2>

                  <p className="text-[13px] text-[#9CA3AF]">
                    Combined score across all audit categories and analyzed
                    pages.
                  </p>
                </div>
              </div>

              <div className=" grid gap-[16px] lg:grid-cols-[380px_1fr]">
                <div className="overflow-hidden rounded-[5px] border border-[#DDE1EA] bg-white">
                  <div className="flex items-center justify-between border-b border-[#DDE1EA] px-[20px] h-[52px]">
                    <span className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Overall Health
                    </span>

                    <span className="flex items-center gap-[6px] rounded-[3px] border border-[#BBF7D0] bg-[#ECFDF5] px-[10px] py-[4px] text-[11px] font-bold text-[#16A34A]">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#22C55E]" />
                      Audit completed
                    </span>
                  </div>

                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="relative mx-auto h-[100px] w-[180px]">
                        <svg
                          viewBox="0 0 180 125"
                          className="h-full w-full overflow-visible"
                        >
                          <path
                            d="M 20 105 A 70 70 0 0 1 160 105"
                            fill="none"
                            stroke="#e3e7ec"
                            strokeWidth="15"
                            strokeLinecap="round"
                          />

                          <path
                            d="M 20 105 A 70 70 0 0 1 160 105"
                            fill="none"
                            stroke="#20c36a"
                            strokeWidth="15"
                            strokeLinecap="round"
                            pathLength="100"
                            strokeDasharray={`${scan.overallScore || 0} 100`}
                          />
                        </svg>

                        <div className="absolute inset-x-0 bottom-[0px] flex flex-col items-center">
                          <span className="text-[34px] font-bold leading-none tracking-[-0.05em] text-[#0B1020]">
                            {scan.overallScore}
                          </span>

                          <span className="mt-[2px] text-[11px] text-[#9CA3AF]">
                            out of 100
                          </span>
                        </div>
                      </div>

                      <div className=" flex justify-center">
                        <span className="flex items-center gap-[6px] rounded-full border border-[#BBF7D0] bg-[#ECFDF5] px-[14px] py-[5px] text-[12px] font-bold text-[#16A34A]">
                          <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
                          Good
                        </span>
                      </div>
                    </div>

                    <p className="mx-auto  max-w-[290px] text-center text-[12px] leading-[18px] text-[#9CA3AF]">
                      A combined view of the measured audit categories and
                      discovered page results.
                    </p>

                    <div className=" flex justify-between  border-t border-[#E5E7EB] pt-[16px]">
                      <div className=" text-center">
                        <p className="font-mono text-[20px] font-bold leading-none text-[#0B1020]">
                          {scan.totalPages}
                        </p>

                        <p className="mt-[5px] text-[10px] font-bold uppercase text-[#9CA3AF]">
                          Pages Analyzed
                        </p>
                      </div>
                      <div className="w-px bg-[#E5E7EB]" />

                      <div className="text-center">
                        <p className="font-mono text-[20px] font-bold leading-none text-[#0B1020]">
                          {pages.reduce(
                            (acc, page) => acc + page.issueCount,
                            0,
                          )}
                        </p>

                        <p className="mt-[5px] text-[10px] font-bold uppercase text-[#9CA3AF]">
                          Total Issues
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-[12px] sm:grid-cols-2">
                  {summaryCards.map((card, index) => {
                    const status =
                      card.score >= 80
                        ? "Good"
                        : card.score >= 70
                          ? "Review"
                          : "Needs Review";

                    const isReview = card.score < 85;

                    const Icon =
                      card.title === "Performance"
                        ? Zap
                        : card.title === "SEO"
                          ? Search
                          : card.title === "Accessibility"
                            ? Accessibility
                            : ShieldCheck;

                    const change =
                      card.title === "Performance"
                        ? "+4"
                        : card.title === "SEO"
                          ? "+2"
                          : card.title === "Accessibility"
                            ? "-3"
                            : "+1";

                    return (
                      <div
                        key={index}
                        className="overflow-hidden rounded-[5px] border border-[#DDE1EA] bg-white"
                      >
                        <div className="flex h-[48px] items-center justify-between border-b border-[#DDE1EA] px-[20px]">
                          <div className="flex items-center gap-[8px]">
                            <Icon
                              className="h-[14px] w-[14px] text-[#9CA3AF]"
                              strokeWidth={1.7}
                            />

                            <span className="text-[14px] font-bold text-[#374151]">
                              {card.title}
                            </span>
                          </div>

                          <span
                            className={`flex items-center gap-[5px] rounded-[3px] border px-[10px] py-[4px] text-[11px] font-bold ${
                              isReview
                                ? "border-[#FED7AA] bg-[#FFF7ED] text-[#B45309]"
                                : "border-[#BBF7D0] bg-[#ECFDF5] text-[#16A34A]"
                            }`}
                          >
                            <span
                              className={`h-[5px] w-[5px] rounded-full ${
                                isReview ? "bg-[#F59E0B]" : "bg-[#22C55E]"
                              }`}
                            />
                            {status}
                          </span>
                        </div>

                        <div className="px-[20px] pb-[20px] pt-[16px] flex flex-col gap-3">
                          <div className="flex items-end justify-between gap-[8px]">
                            <div className="flex items-end gap-[4px]">
                              <span className="text-[36px] font-bold leading-none tracking-[-0.045em] text-[#0B1020]">
                                {card.score}
                              </span>

                              <span className=" text-[14px] text-[#9CA3AF]">
                                / 100
                              </span>
                            </div>

                            <span
                              className={`mb-[2px] rounded-[3px] px-[8px] py-[3px] text-[11px] font-bold ${
                                change.startsWith("-")
                                  ? "bg-[#FFF7ED] text-[#B45309]"
                                  : "bg-[#ECFDF5] text-[#16A34A]"
                              }`}
                            >
                              • {change}
                            </span>
                          </div>

                          <div className=" flex flex-col gap-1">
                            <div className="h-[6px] overflow-hidden rounded-full bg-[#F3F4F6]">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${
                                  isReview ? "bg-[#F59E0B]" : "bg-[#22C55E]"
                                }`}
                                style={{
                                  width: `${Math.min(100, Math.max(0, card.score))}%`,
                                }}
                              />
                            </div>

                            <div className="flex justify-between text-[10px] text-[#D1D5DB]">
                              <span>0</span>
                              <span>100</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[16px]">
              <div className=" flex flex-col gap-1">
                <h2 className="text-[22px] font-bold tracking-[-0.025em] text-[#0B1020]">
                  Scan Information
                </h2>

                <p className="text-[13px] text-[#9CA3AF]">
                  Scores and findings reflect the pages and measurements
                  included in this completed scan.
                </p>
              </div>

              <div className="overflow-hidden rounded-[6px] border border-[#DDE1EA] bg-white">
                <div className="flex items-center gap-[8px] border-b border-[#DDE1EA] bg-[#F7F8FA] px-[24px] h-[46px]">
                  <FileText className="h-[14px] w-[14px] text-[#9CA3AF]" />

                  <span className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                    Report Metadata
                  </span>
                </div>

                <div className="grid grid-cols-1 divide-y divide-[#DDE1EA] sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
                  <div className="min-w-0 px-6 pt-[20px] pb-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                        Website URL
                      </p>

                      <ExternalLink className="h-[11px] w-[11px] text-[#C9CDD8]" />
                    </div>

                    <div className=" flex min-w-0 items-center gap-[6px]">
                      <Globe2 className="h-[13px] w-[13px] shrink-0 text-[#6B7280]" />

                      <span className="truncate text-[13px] font-bold text-[#0B1020]">
                        {scan.url
                          ?.replace(/^https?:\/\//, "")
                          .replace(/\/$/, "")}
                      </span>
                    </div>

                    <p className=" truncate font-mono text-[11px] text-[#9CA3AF]">
                      {scan.url}
                    </p>
                  </div>

                  <div className="px-6 pt-[20px] pb-6 flex flex-col gap-2">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Total Pages
                    </p>

                    <div className="flex items-end gap-[6px]">
                      <span className="font-mono text-[28px] font-bold leading-none tracking-[-0.04em] text-[#0B1020]">
                        {scan.totalPages}
                      </span>

                      <span className="text-[13px]  text-[#9CA3AF]">pages</span>
                    </div>

                    <span className="inline-flex items-center gap-[6px] rounded-[3px] border border-[#E5E7EB] bg-[#F7F8FA] px-[10px] py-[6px] text-[11px] text-[#6B7280] w-fit">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#22C55E]" />
                      All pages crawled
                    </span>
                  </div>

                  <div className="px-6 pt-[20px] pb-6 flex flex-col gap-2">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Scan Duration
                    </p>

                    <div className="flex items-center gap-[6px]">
                      <Clock3 className="h-[16px] w-[16px] text-[#6B7280]" />

                      <span className="font-mono text-[28px] font-bold leading-none tracking-[-0.04em] text-[#0B1020]">
                        {scan.scanDuration}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-[5px] rounded-[3px] border border-[#E5E7EB] bg-[#F7F8FA] px-[10px] py-[6px] text-[11px] text-[#6B7280] w-fit">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#9aa4b3]" />
                      minutes:seconds
                    </span>
                  </div>

                  <div className="px-6 pt-[20px] pb-6 flex flex-col gap-2">
                    <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                      Total Issues
                    </p>

                    <div className="flex items-end gap-[6px]">
                      <span className="font-mono text-[28px] font-bold leading-none tracking-[-0.04em] text-[#0B1020]">
                        {issueCounts.critical +
                          issueCounts.warnings +
                          issueCounts.info}
                      </span>

                      <span className=" text-[13px] text-[#9CA3AF]">
                        issues
                      </span>
                    </div>

                    <div className=" flex flex-wrap items-center gap-[8px] text-[11px] font-bold">
                      <span className="flex items-center gap-[4px] text-[#EF4444]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#ef4444]" />
                        {issueCounts.critical} critical
                      </span>

                      <span className="flex items-center gap-[4px] text-[#B45309]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#F59E0B]" />
                        {issueCounts.warnings} warnings
                      </span>

                      <span className="flex items-center gap-[4px] text-[#6B7280]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[#6B7280]" />
                        {issueCounts.info} info
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WEBSITE PAGES TABLE */}
        <div className="overflow-hidden py-10 flex flex-col gap-4">
          <div className="px-5 py-5 sm:px-6 lg:px-0 lg:pb-4 lg:pt-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0 flex flex-col gap-[6px]">
                <h3 className="text-[22px] font-bold leading-[1.25] tracking-[-0.025em] text-[#0B1020]">
                  Website Pages
                </h3>

                <p className="text-[13px] leading-5 text-[#9CA3AF]">
                  Compare the analyzed pages, review category scores, and select
                  a page to inspect its findings.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
                <div className="relative w-full sm:w-[142px]">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9aa4b3]" />

                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-[36px] w-full rounded-[5px] border border-[#dfe4eb] bg-white pl-9 pr-3 text-[13px]  text-[#C4C9D4] outline-none transition-colors placeholder:text-[#aab2bf] focus:border-[#3975ff]"
                  />
                </div>

                <div className="inline-flex items-center justify-center gap-1.5 rounded-[5px] border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-[6px] text-[12px] font-bold text-[#687489]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a7afbb]" />
                  <span>
                    {scan?.totalPages || pages.length || 0} pages analyzed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse">
              <thead>
                <tr className="border-y border-[#DDE1EA] bg-[#F7F8FA]">
                  <th className="w-[43%] px-5 py-3.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        Page URL
                      </span>

                      <ArrowUpDown className="h-3 w-3 text-[#b5bdc9]" />
                    </div>
                  </th>

                  <th className="w-[12%] px-3 py-3.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        Performance
                      </span>

                      <ArrowUpDown className="h-3 w-3 text-[#b5bdc9]" />
                    </div>
                  </th>

                  <th className="w-[10%] px-3 py-3.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        SEO
                      </span>

                      <ArrowUpDown className="h-3 w-3 text-[#b5bdc9]" />
                    </div>
                  </th>

                  <th className="w-[13%] px-3 py-3.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        Accessibility
                      </span>

                      <ArrowUpDown className="h-3 w-3 text-[#b5bdc9]" />
                    </div>
                  </th>

                  <th className="w-[12%] px-3 py-3.5 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        Issues
                      </span>

                      <ArrowUpDown className="h-3 w-3 text-[#b5bdc9]" />
                    </div>
                  </th>

                  <th className="w-[10%] px-5 py-3.5 text-left">
                    <span className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedPages.map((page, index) => {
                  const isSelected = selectedPage?.url === page.url;

                  const getScoreBarColor = (score) => {
                    if (score >= 90) return "#20b889";
                    if (score >= 75) return "#ff9900";
                    return "#ff9900";
                  };

                  const issueClass =
                    page.issueCount >= 8
                      ? "border-[#ffb9b9] bg-[#fff4f4] text-[#ef4444]"
                      : page.issueCount >= 5
                        ? "border-[#ffd6a3] bg-[#fff8ed] text-[#d97706]"
                        : "border-[#dfe4eb] bg-[#f6f7f9] text-[#687489]";

                  return (
                    <tr
                      key={index}
                      onClick={() => setSelectedPage(page)}
                      className={`group cursor-pointer border-b border-[#e5e8ed] transition-colors duration-150 last:border-b-0 ${
                        isSelected
                          ? "bg-[#EFF6FF]"
                          : "bg-white hover:bg-[#fafbfd]"
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex min-w-0 items-center gap-2">
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              isSelected ? "bg-[#3B82F6]" : "bg-[#22C55E]"
                            }`}
                          />

                          <Globe2
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isSelected ? "text-[#60A5FA]" : "text-[#9CA3AF]"
                            }`}
                          />

                          <span
                            className={`min-w-0 truncate font-mono text-[13px] font-bold leading-5 ${
                              isSelected ? "text-[#1D4ED8]" : "text-[#374151]"
                            }`}
                          >
                            {page.url}
                          </span>

                          {isSelected && (
                            <span className="shrink-0 rounded-[4px] border border-[#93C5FD] bg-[#DBEAFE] px-[7px] py-0.5 text-[10px] font-bold uppercase leading-3 text-[#2563EB]">
                              Selected
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-10 overflow-hidden rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  Math.max(Number(page.performance) || 0, 0),
                                  100,
                                )}%`,
                                backgroundColor: getScoreBarColor(
                                  page.performance,
                                ),
                              }}
                            />
                          </div>

                          <span
                            className={`text-[13px] font-bold leading-5 ${
                              isSelected ? "text-[#1D4ED8]" : "text-[#374151]"
                            }`}
                          >
                            {page.performance}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-10 overflow-hidden rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  Math.max(Number(page.seo) || 0, 0),
                                  100,
                                )}%`,
                                backgroundColor:
                                  Number(page.seo) >= 75
                                    ? "#20b889"
                                    : "#ff9900",
                              }}
                            />
                          </div>

                          <span
                            className={`text-[13px] font-bold leading-5 ${
                              isSelected ? "text-[#1D4ED8]" : "text-[#374151]"
                            }`}
                          >
                            {page.seo}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-10 overflow-hidden rounded-full bg-[#E5E7EB]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${Math.min(
                                  Math.max(Number(page.accessibility) || 0, 0),
                                  100,
                                )}%`,
                                backgroundColor:
                                  Number(page.accessibility) >= 75
                                    ? "#20b889"
                                    : "#ff9900",
                              }}
                            />
                          </div>

                          <span
                            className={`text-[13px] font-bold leading-5 ${
                              isSelected ? "text-[#1D4ED8]" : "text-[#374151]"
                            }`}
                          >
                            {page.accessibility}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex items-center rounded-[4px] border px-2 py-[3px] text-[10px] font-medium leading-3 ${issueClass}`}
                        >
                          {page.issueCount}{" "}
                          {page.issueCount === 1 ? "issue" : "issues"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          href={`/report/${params.scanId}/page/${page.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center justify-center gap-1.5 rounded-[5px] border px-[10px] py-[5px] text-[12px] font-medium leading-none transition-colors ${
                            isSelected
                              ? "border-[#3975ff] bg-[#2563EB] text-white hover:bg-[#2f68e7]"
                              : "border-[#E5E7EB] bg-[#FAFBFD] text-[#6B7280] hover:border-[#cbd2dc] hover:bg-[#f8f9fb] hover:text-[#374151]"
                          }`}
                        >
                          {isSelected ? "Inspect" : "Details"}

                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex flex-col gap-3 border-t border-[#dfe4eb] bg-[#fafbfd] px-5 py-2.5 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-[12px] leading-4 text-[#B0B7C3]">
                <Info className="h-3.5 w-3.5 shrink-0" />

                <span>
                  Showing {startItem}-{endItem} of {filteredPages.length} pages
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-[6px]">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1 || totalFilteredPages === 0}
                  className="inline-flex items-center gap-1 rounded-[5px] border border-[#DDE1EA] bg-white px-2.5 py-[5px] text-[12px] font-medium text-[#9CA3AF] transition-colors hover:bg-[#f5f6f8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-3 w-3" />
                  Prev
                </button>

                {Array.from(
                  { length: totalFilteredPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setCurrentPage(pageNumber)}
                    aria-current={
                      currentPage === pageNumber ? "page" : undefined
                    }
                    className={`min-w-[29px] rounded-[5px] px-[10px] py-[5px] text-[12px] font-medium transition-colors ${
                      currentPage === pageNumber
                        ? "bg-[#0b1020] text-white"
                        : "text-[#98a1af] hover:bg-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(totalFilteredPages, prev + 1),
                    )
                  }
                  disabled={
                    currentPage >= totalFilteredPages ||
                    totalFilteredPages === 0
                  }
                  className="inline-flex items-center gap-1 rounded-[5px] border border-[#DDE1EA] bg-white px-2.5 py-[5px] text-[12px] font-medium text-[#9CA3AF] transition-colors hover:bg-[#f5f6f8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {selectedPage && (
          <div className="mt-8 grid gap-5 xl:grid-cols-[352px_minmax(0,1fr)]">
            <aside className="h-fit overflow-hidden rounded-[6px] border border-[#dbe4ef] bg-white">
              <div className="border-b border-[#DBEAFE] bg-[#EFF6FF] px-5 h-[50px] flex items-center w-full">
                <div className="flex items-center justify-between gap-3 w-full">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#60A5FA]">
                      Selected Page
                    </p>
                    <p className="mt-0.5 text-[13px] font-bold leading-4 text-[#1D4ED8]">
                      Inspection View
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-[3px] border border-[#93C5FD] bg-[#DBEAFE] px-[9px] py-1 text-[10px] font-bold uppercase tracking-[0.04em] text-[#2563EB]">
                    <Circle className="h-1.5 w-1.5 fill-current" />
                    Available
                  </span>
                </div>
              </div>

              <div className="border-b border-[#DBEAFE] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#9CA3AF]">
                  Page URL
                </p>

                <div className="mt-2 flex items-center gap-1.5">
                  <Globe2 className="h-3 w-3 shrink-0 text-[#60A5FA]" />
                  <p className="min-w-0 truncate text-[13px] font-bold text-[#0B1020]">
                    {selectedPage.url?.replace(/^https?:\/\//, "")}
                  </p>
                </div>

                <p className="mt-1 truncate text-[11px] text-[#9CA3AF]">
                  {selectedPage.url}
                </p>

                <Link
                  href={`/report/${params.scanId}/page/${selectedPage._id}`}
                  className="mt-4 flex h-[42px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#0B1020] px-4 text-[13px] font-bold text-white transition-colors hover:bg-[#171d2e]"
                >
                  Open Full Page Report
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="px-5 py-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#9CA3AF]">
                    Core Web Vitals
                  </p>
                </div>

                <div className="divide-y divide-[#e8edf3] border-t border-[#dbe4ef]">
                  {metrics.map((item, index) => {
                    const metricDescription = {
                      FCP: "First Contentful Paint",
                      LCP: "Largest Contentful Paint",
                      CLS: "Cumulative Layout Shift",
                      TBT: "Total Blocking Time",
                      "Speed Index": "Visual load progression",
                    }[item.metric];

                    const statusStyles =
                      item.status === "Good"
                        ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a]"
                        : item.status === "Poor"
                          ? "border-[#fecaca] bg-[#fef2f2] text-[#ef4444]"
                          : "border-[#fed7aa] bg-[#fff7ed] text-[#f97316]";

                    return (
                      <div
                        key={index}
                        className="flex min-h-[52px] items-center justify-between gap-3 py-2"
                      >
                        <div className="min-w-0">
                          <p className="text-[13px] font-bold leading-4 text-[#374151]">
                            {item.metric}
                          </p>

                          <p className="truncate text-[11px] leading-3 text-[#9CA3AF]">
                            {metricDescription}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <p className="text-[13px] leading-[15px] font-bold tabular-nums text-[#374151]">
                            {item.value}
                          </p>

                          <span
                            className={`inline-flex min-w-[51px] items-center justify-center rounded-[3px] border px-2 py-1 text-[11px] font-bold ${statusStyles}`}
                          >
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
                            {item.status === "Needs Improvement"
                              ? "Needs Work"
                              : item.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>

            <section className="min-w-0 overflow-hidden rounded-[6px] border border-[#dbe4ef] bg-white">
              <div className="border-b border-[#dbe4ef] px-5 py-3.5 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[16px] font-bold leading-5 text-[#0B1020]">
                      Page Findings
                    </h3>

                    <p className="mt-0.5 text-[12px] leading-4 text-[#9CA3AF]">
                      Inspect detected issues by audit category for the selected
                      page.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border-b border-[#dbe4ef]">
                <div className="flex min-w-max">
                  {[
                    ["performance", "Performance"],
                    ["seo", "SEO"],
                    ["accessibility", "Accessibility"],
                    ["practices", "Best Practices"],
                  ].map(([tab, label]) => {
                    const isActive = activeTab === tab;
                    const count = issues?.[tab]?.length || 0;

                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative flex h-[46px] items-center gap-2 px-5 text-[13px]  transition-colors ${
                          isActive
                            ? "text-[#0B1020] font-bold"
                            : "text-[#9CA3AF] hover:text-[#475569]"
                        }`}
                      >
                        <span>{label}</span>

                        <span
                          className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                            isActive
                              ? "bg-[#0B1020] text-white"
                              : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                        >
                          {count}
                        </span>

                        {isActive && (
                          <span className="absolute bottom-0 left-5 right-5 h-[2px] bg-[#0B1020]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#dbe4ef] bg-[#f8fafc] px-5 py-2.5 h-[40px] sm:px-6">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#6B7280]">
                    <List className="h-3 w-3 text-[#9CA3AF]" />
                    {issues?.[activeTab]?.length || 0} findings
                  </span>

                  <div className="w-px h-[14px] bg-[#DDE1EA]" />

                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#DC2626]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
                    {issues?.[activeTab]?.filter(
                      (item) => item.severity === "High",
                    ).length || 0}{" "}
                    high
                  </span>

                  <div className="w-px h-[14px] bg-[#DDE1EA]" />

                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#B45309]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
                    {issues?.[activeTab]?.filter(
                      (item) => item.severity === "Medium",
                    ).length || 0}{" "}
                    medium
                  </span>

                  <div className="w-px h-[14px] bg-[#DDE1EA]" />

                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#6B7280]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9CA3AF]" />
                    {issues?.[activeTab]?.filter(
                      (item) => item.severity === "Low",
                    ).length || 0}{" "}
                    low
                  </span>
                </div>

                <p className="hidden text-[11px] text-[#C4C9D4] sm:block">
                  {{
                    performance: "Performance",
                    seo: "SEO",
                    accessibility: "Accessibility",
                    practices: "Best Practices",
                  }[activeTab] || "Audit"}{" "}
                  · {selectedPage.url?.replace(/^https?:\/\//, "")}
                </p>
              </div>

              <div>
                {issues?.[activeTab]?.length > 0 ? (
                  issues[activeTab].map((issue, index) => {
                    const issueKey = issue.id || index;
                    const isOpen = openIssue === issueKey;

                    const severityConfig =
                      issue.severity === "High"
                        ? {
                            badge:
                              "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
                            dot: "bg-[#EF4444]",
                            accent: "border-l-[#ef4444]",
                            icon: "text-[#ef4444]",
                          }
                        : issue.severity === "Low"
                          ? {
                              badge:
                                "border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280]",
                              dot: "bg-[#9CA3AF]",
                              accent: "border-l-[#94a3b8]",
                              icon: "text-[#64748b]",
                            }
                          : {
                              badge:
                                "border-[#FED7AA] bg-[#FFF7ED] text-[#B45309]",
                              dot: "bg-[#F59E0B]",
                              accent: "border-l-[#f97316]",
                              icon: "text-[#f97316]",
                            };

                    const score =
                      typeof issue.score === "number"
                        ? Math.round(issue.score * 100)
                        : null;

                    const numericValue =
                      typeof issue.numericValue === "number"
                        ? Math.round(issue.numericValue)
                        : null;

                    return (
                      <div
                        key={issueKey}
                        className={`border-b border-[#dbe4ef] ${
                          isOpen ? "bg-white" : "bg-white"
                        }`}
                      >
                        <button
                          onClick={() => toggleIssue(issueKey)}
                          className={`group flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-[#fafcff] sm:items-center sm:px-6 ${
                            isOpen ? `border-l-2 ${severityConfig.accent}` : ""
                          }`}
                        >
                          <ChevronDown
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C4C9D4] transition-transform sm:mt-0 ${
                              isOpen ? "rotate-0" : "-rotate-90"
                            }`}
                          />

                          <span
                            className={`inline-flex shrink-0 items-center gap-1 rounded-[3px] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] ${severityConfig.badge}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${severityConfig.dot}`}
                            />
                            {issue.severity === "Medium"
                              ? "MED"
                              : issue.severity.toUpperCase()}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-[14px] font-bold leading-4 text-[#0B1020]">
                                {issue.title}
                              </h4>

                              {isOpen && (
                                <span className="hidden items-center gap-1 rounded-[3px] border border-[#DBEAFE] bg-[#EFF6FF] px-[7px] py-0.5 text-[10px] font-bold text-[#2563EB] sm:inline-flex">
                                  <Zap className="h-2.5 w-2.5" />
                                  {activeTab === "practices"
                                    ? "Best Practices"
                                    : "Performance"}
                                </span>
                              )}
                            </div>

                            <p className="mt-0.5 line-clamp-2 text-[12px] leading-[14px] text-[#6B7280] sm:line-clamp-1">
                              {issue.description}
                            </p>
                          </div>

                          <div className="hidden shrink-0 items-center gap-3 sm:flex">
                            {issue.displayValue && (
                              <span className="rounded-[3px] border border-[#E5E7EB] bg-[#F3F4F6] px-2 py-1 font-mono text-[11px] text-[#6B7280]">
                                {issue.displayValue}
                              </span>
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="border-t border-[#edf1f5] bg-white">
                            {(score !== null ||
                              numericValue !== null ||
                              issue.details?.length > 0) && (
                              <div className="px-5 py-5 sm:px-6 flex flex-col gap-[10px]">
                                <div className="pb-[10px] border-b border-[#E5E7EB] flex items-center justify-between">
                                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#9CA3AF]">
                                    <BarChart3 className="h-3 w-3" />
                                    Issue Metrics
                                  </p>
                                </div>

                                <div className="overflow-hidden rounded-[4px] border border-[#E5E7EB] bg-[#F7F8FA]">
                                  <div className="grid divide-y divide-[#dbe4ef] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                                    {score !== null && (
                                      <div className="p-[14px]">
                                        <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                                          Lighthouse Score
                                        </p>

                                        <div className="mt-1.5 flex items-end gap-1">
                                          <span
                                            className={`text-[22px] font-bold leading-none ${
                                              score < 50
                                                ? "text-[#DC2626]"
                                                : score < 90
                                                  ? "text-[#f97316]"
                                                  : "text-[#16a34a]"
                                            }`}
                                          >
                                            {score}
                                          </span>

                                          <span className="mb-0.5 text-[12px] text-[#9CA3AF]">
                                            /100
                                          </span>
                                        </div>

                                        <div className="mt-2 h-1 rounded-full bg-[#E5E7EB]">
                                          <div
                                            className={`h-1 rounded-full ${
                                              score < 50
                                                ? "bg-[#EF4444]"
                                                : score < 90
                                                  ? "bg-[#f97316]"
                                                  : "bg-[#22c55e]"
                                            }`}
                                            style={{ width: `${score}%` }}
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {numericValue !== null && (
                                      <div className="p-[14px]">
                                        <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                                          Numeric Value
                                        </p>

                                        <p className="mt-1.5 font-mono text-[22px] font-bold leading-none text-[#374151]">
                                          {numericValue.toLocaleString()}
                                        </p>

                                        <p className="mt-1 text-[11px] text-[#9CA3AF]">
                                          bytes
                                        </p>
                                      </div>
                                    )}

                                    {issue.details?.length > 0 && (
                                      <div className="p-[14px]">
                                        <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                                          Affected Resources
                                        </p>

                                        <p className="mt-1.5 text-[22px] font-bold leading-none text-[#374151]">
                                          {issue.details.length}
                                        </p>

                                        <p className="mt-1 text-[11px] text-[#9CA3AF]">
                                          {issue.details.length === 1
                                            ? "JS bundle"
                                            : "JS bundles"}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="px-5 sm:px-6 flex flex-col gap-[10px]">
                              <div className="flex items-center justify-between pb-[10px] border-b border-[#E5E7EB]">
                                <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#9CA3AF]">
                                  <TriangleAlert className="h-3 w-3" />
                                  Why This Matters
                                </p>
                              </div>

                              <div className="border border-[#FDE68A] rounded-[4px] bg-[#FFFBEB] px-4 py-3.5">
                                <div className="flex gap-3">
                                  <div className="mt-0.5 w-0.5 shrink-0 bg-[#F59E0B]" />

                                  <p className="text-[13px] leading-[19px] text-[#78350F]">
                                    {issue.impact}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {issue.files?.length > 0 && (
                              <div className="px-5 py-5 sm:px-6 flex flex-col gap-[10px]">
                                <div className="flex items-center justify-between pb-[10px] border-b border-[#E5E7EB]">
                                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#9CA3AF]">
                                    <FileWarning className="h-3 w-3" />
                                    Affected Files
                                  </p>

                                  <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#6B7280]">
                                    {issue.files.length}{" "}
                                    {issue.files.length === 1
                                      ? "file"
                                      : "files"}
                                  </span>
                                </div>

                                <div className="overflow-hidden rounded-[4px] border border-[#E5E7EB]">
                                  {issue.files.map((file, fileIndex) => (
                                    <div
                                      key={fileIndex}
                                      className={`flex items-center gap-3 px-3 py-2.5 ${
                                        fileIndex !== issue.files.length - 1
                                          ? "border-b border-[#e8edf3]"
                                          : ""
                                      }`}
                                    >
                                      <FileCode2 className="h-3.5 w-3.5 shrink-0 text-[#6B7280]" />

                                      <p className="min-w-0 flex-1 truncate font-mono text-[12px] text-[#374151]">
                                        {file}
                                      </p>

                                      <button
                                        onClick={() =>
                                          navigator.clipboard.writeText(file)
                                        }
                                        className="inline-flex shrink-0 items-center gap-1 rounded-[3px] border border-[#dbe4ef] bg-[#F7F8FA] px-2 py-1 text-[11px] font-medium text-[#9CA3AF] transition-colors hover:border-[#cbd5e1] hover:text-[#475569]"
                                      >
                                        <Copy className="h-2.5 w-2.5" />
                                        Copy
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {issue.elements?.length > 0 && (
                              <div className="px-5 py-5 sm:px-6 flex flex-col gap-[10px]">
                                <div className="flex items-center justify-between pb-[10px] border-b border-[#E5E7EB]">
                                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#9CA3AF]">
                                    <Code2 className="h-3 w-3" />
                                    Affected Elements
                                  </p>

                                  <span className="rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#6B7280]">
                                    {issue.elements.length}{" "}
                                    {issue.elements.length === 1
                                      ? "element"
                                      : "elements"}
                                  </span>
                                </div>

                                <div className="space-y-3">
                                  {issue.elements.map(
                                    (element, elementIndex) => {
                                      const label =
                                        element.nodeLabel ||
                                        element.selector ||
                                        "Unnamed element";

                                      const elementKey = `${issueKey}-element-${elementIndex}`;
                                      const isExpanded =
                                        openElement === elementKey;

                                      return (
                                        <article
                                          key={`${label}-${elementIndex}`}
                                          className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm transition-shadow hover:shadow-md"
                                        >
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setOpenElement((prev) =>
                                                prev === elementKey
                                                  ? null
                                                  : elementKey,
                                              )
                                            }
                                            aria-expanded={isExpanded}
                                            className="flex w-full items-start gap-3 px-3 py-3.5 text-left sm:px-4"
                                          >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#64748B]">
                                              <Code2 className="h-4 w-4" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                              <div className="flex flex-wrap items-center gap-2">
                                                <h4 className="break-words text-[12px] font-semibold text-[#1F2937] sm:text-[13px]">
                                                  {label}
                                                </h4>

                                                <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-medium text-[#6B7280]">
                                                  Element {elementIndex + 1}
                                                </span>
                                              </div>

                                              <p className="mt-1.5 break-all font-mono text-[10px] leading-5 text-[#94A3B8] sm:text-[11px]">
                                                {element.selector ||
                                                  "CSS selector unavailable"}
                                              </p>
                                            </div>

                                            <span className="mt-1 shrink-0 text-[#94A3B8]">
                                              {isExpanded ? (
                                                <ChevronUp className="h-4 w-4" />
                                              ) : (
                                                <ChevronDown className="h-4 w-4" />
                                              )}
                                            </span>
                                          </button>

                                          {isExpanded && (
                                            <div className="space-y-4 border-t border-[#E5E7EB] bg-[#F8FAFC]/70 p-3 sm:p-4">
                                              {/* Element information */}
                                              <section>
                                                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#94A3B8]">
                                                  Element Information
                                                </p>

                                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                  {element.nodeLabel && (
                                                    <div className="min-w-0 rounded-lg border border-[#E5E7EB] bg-white p-3">
                                                      <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">
                                                        Node Label
                                                      </p>
                                                      <p className="mt-1 break-words text-xs font-medium text-[#475569]">
                                                        {element.nodeLabel}
                                                      </p>
                                                    </div>
                                                  )}

                                                  {element.selector && (
                                                    <div className="min-w-0 rounded-lg border border-[#E5E7EB] bg-white p-3">
                                                      <p className="text-[10px] font-semibold uppercase text-[#94A3B8]">
                                                        CSS Selector
                                                      </p>
                                                      <p className="mt-1 break-all font-mono text-[11px] text-[#475569]">
                                                        {element.selector}
                                                      </p>
                                                    </div>
                                                  )}
                                                </div>
                                              </section>

                                              {/* Diagnostic explanation */}
                                              {element.explanation && (
                                                <section>
                                                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#94A3B8]">
                                                    Diagnostic Explanation
                                                  </p>

                                                  <div className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-3">
                                                    <p className="whitespace-pre-wrap break-words text-[11px] leading-5 text-[#92400E]">
                                                      {element.explanation}
                                                    </p>
                                                  </div>
                                                </section>
                                              )}

                                              {/* DOM path */}
                                              {element.nodePath && (
                                                <section>
                                                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.06em] text-[#94A3B8]">
                                                    Page Structure
                                                  </p>

                                                  <div className="rounded-lg border border-[#E5E7EB] bg-white p-3">
                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                      {(Array.isArray(
                                                        element.nodePath,
                                                      )
                                                        ? element.nodePath
                                                        : String(
                                                            element.nodePath,
                                                          ).split(",")
                                                      )
                                                        .filter((part) => {
                                                          const value =
                                                            String(part).trim();
                                                          return (
                                                            value &&
                                                            !/^\d+$/.test(value)
                                                          );
                                                        })
                                                        .map(
                                                          (
                                                            part,
                                                            index,
                                                            path,
                                                          ) => (
                                                            <Fragment
                                                              key={`${part}-${index}`}
                                                            >
                                                              <span className="rounded-md border border-[#E5E7EB] bg-[#F8FAFC] px-2 py-1 font-mono text-[11px] font-medium text-[#475569]">
                                                                {String(part)
                                                                  .trim()
                                                                  .toUpperCase()}
                                                              </span>

                                                              {index !==
                                                                path.length -
                                                                  1 && (
                                                                <span className="text-[#94A3B8] text-[11px]">
                                                                  →
                                                                </span>
                                                              )}
                                                            </Fragment>
                                                          ),
                                                        )}
                                                    </div>

                                                    <p className="mt-2 text-[10px] leading-4 text-[#94A3B8]">
                                                      Shows the HTML element
                                                      hierarchy from the page
                                                      root to the affected
                                                      element.
                                                    </p>
                                                  </div>
                                                </section>
                                              )}

                                              {/* HTML snippet */}
                                              {element.snippet && (
                                                <section>
                                                  <div className="mb-2 flex items-center justify-between">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#94A3B8]">
                                                      HTML Snippet
                                                    </p>

                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        navigator.clipboard.writeText(
                                                          element.snippet,
                                                        )
                                                      }
                                                      className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-[10px] font-medium text-[#64748B] transition hover:bg-[#F1F5F9]"
                                                    >
                                                      <Copy className="h-3 w-3" />
                                                      Copy HTML
                                                    </button>
                                                  </div>

                                                  <div className="overflow-hidden rounded-lg border border-[#1E293B] bg-[#0F172A]">
                                                    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                                                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                                      <span className="text-[10px] font-medium text-slate-400">
                                                        HTML
                                                      </span>
                                                    </div>

                                                    <pre className="overflow-x-auto whitespace-pre-wrap break-all p-3 font-mono text-[10px] leading-5 text-emerald-200">
                                                      <code>
                                                        {element.snippet}
                                                      </code>
                                                    </pre>
                                                  </div>
                                                </section>
                                              )}
                                            </div>
                                          )}
                                        </article>
                                      );
                                    },
                                  )}
                                </div>
                              </div>
                            )}

                            {issue.id === "errors-in-console" &&
                              issue.consoleErrors?.length > 0 && (
                                <div className="px-5 py-5 sm:px-6 flex flex-col gap-[10px]">
                                  <div className="flex items-center justify-between pb-[10px] border-b border-[#E5E7EB]">
                                    <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#9CA3AF]">
                                      <TriangleAlert className="h-3 w-3" />
                                      Browser Console Errors
                                    </p>

                                    <span className="rounded-full border border-[#FECACA] bg-[#FEF2F2] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">
                                      {issue.consoleErrors.length}
                                    </span>
                                  </div>

                                  <div className="overflow-hidden rounded-[4px] border border-[#E5E7EB]">
                                    {issue.consoleErrors.map(
                                      (error, errorIndex) => (
                                        <div
                                          key={`${error.source || "console"}-${error.line ?? ""}-${errorIndex}`}
                                          className={`space-y-2 bg-[#FFFAFA] px-3 py-3 ${
                                            errorIndex !==
                                            issue.consoleErrors.length - 1
                                              ? "border-b border-[#E5E7EB]"
                                              : ""
                                          }`}
                                        >
                                          <p className="break-words text-[12px] leading-5 text-[#991B1B]">
                                            {error.message ||
                                              "Console error details unavailable"}
                                          </p>

                                          {error.type && (
                                            <p className="text-[11px] text-[#64748B]">
                                              Type: {error.type}
                                            </p>
                                          )}

                                          {error.source && (
                                            <p className="break-all font-mono text-[10px] text-[#64748B]">
                                              Source: {error.source}
                                            </p>
                                          )}

                                          {(error.line != null ||
                                            error.column != null) && (
                                            <p className="text-[10px] text-[#94A3B8]">
                                              {error.line != null &&
                                                `Line ${error.line}`}
                                              {error.line != null &&
                                                error.column != null &&
                                                ", "}
                                              {error.column != null &&
                                                `Column ${error.column}`}
                                            </p>
                                          )}
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}

                            {hasValidDetailData(issue.details) && (
                              <div className="px-5 py-5 sm:px-6 flex flex-col gap-[10px]">
                                <div className="flex items-center justify-between pb-[10px] border-b border-[#E5E7EB]">
                                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.05em] text-[#9CA3AF]">
                                    <BarChart3 className="h-3 w-3" />
                                    Resource Optimization Insights
                                  </p>
                                </div>

                                <div className="overflow-x-auto rounded-[4px] border border-[#E5E7EB]">
                                  <table className="w-full min-w-[650px] border-collapse">
                                    <thead>
                                      <tr className="bg-[#F7F8FA] px-3.5 h-[34px]">
                                        {[
                                          "Resource URL",
                                          "Type",
                                          "Total",
                                          "Wasted",
                                          "Waste %",
                                          "Scripting",
                                        ].map((heading) => (
                                          <th
                                            key={heading}
                                            className="border-b border-[#E5E7EB] px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.04em] text-[#9CA3AF]"
                                          >
                                            {heading}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>

                                    <tbody>
                                      {issue.details.map(
                                        (detail, detailIndex) => {
                                          const resourceUrl = detail.url || "";
                                          const isImage =
                                            /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(
                                              resourceUrl,
                                            );

                                          return (
                                            <tr
                                              key={detailIndex}
                                              className="border-b border-[#e8edf3] last:border-b-0 px-3.5 py-[10px]"
                                            >
                                              <td className="max-w-[310px] px-3 py-2.5">
                                                <div className="flex items-center gap-2">
                                                  <FileCode2 className="h-3 w-3 shrink-0 text-[#94a3b8]" />
                                                  <span className="truncate font-mono text-[11px] text-[#374151]">
                                                    {resourceUrl ||
                                                      "Website Resource"}
                                                  </span>
                                                </div>
                                              </td>

                                              <td className="px-3 py-2.5 text-[12px] text-[#6B7280]">
                                                {isImage ? "Image" : "Script"}
                                              </td>

                                              <td className="px-3 py-2.5 font-mono text-[12px] font-bold text-[#374151]">
                                                {detail.totalBytes
                                                  ? `${(detail.totalBytes / 1024).toFixed(0)} KiB`
                                                  : detail.total
                                                    ? `${(detail.total / 1000).toFixed(0)} ms`
                                                    : "—"}
                                              </td>

                                              <td className="px-3 py-2.5 font-mono text-[12px] font-bold text-[#DC2626]">
                                                {detail.wastedBytes
                                                  ? `${(detail.wastedBytes / 1024).toFixed(0)} KiB`
                                                  : "—"}
                                              </td>

                                              <td className="px-3 py-2.5 font-mono text-[12px] font-bold text-[#DC2626]">
                                                {detail.wastedPercent
                                                  ? `${detail.wastedPercent.toFixed(1)}%`
                                                  : "—"}
                                              </td>

                                              <td className="px-3 py-2.5 font-mono text-[12px] text-[#374151]">
                                                {detail.scripting
                                                  ? `${Math.round(detail.scripting)} ms`
                                                  : "—"}
                                              </td>
                                            </tr>
                                          );
                                        },
                                      )}
                                    </tbody>
                                  </table>
                                </div>

                                <p className="mt-2 text-[11px] text-[#B0B7C3]">
                                  Wasted bytes are estimates. Actual savings may
                                  vary by implementation.
                                </p>
                              </div>
                            )}

                            <div className="grid grid-cols-1 gap-5 border-t border-[#edf1f5] bg-[#f8fafc] px-5 py-5 sm:px-6 lg:grid-cols-2">
                              <div className="min-h-[210px] rounded-[4px] border border-[#dbe4ef] bg-white p-5">
                                <div className="flex items-start justify-between gap-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#94a3b8]">
                                    Audit Score
                                  </p>

                                  {score !== null && (
                                    <span
                                      className={`inline-flex h-[21px] items-center gap-1 rounded-[3px] border px-2 text-[10px] font-semibold ${
                                        score < 50
                                          ? "border-[#fecaca] bg-[#fef2f2] text-[#ef4444]"
                                          : "border-[#fed7aa] bg-[#fff7ed] text-[#f97316]"
                                      }`}
                                    >
                                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                      {score < 50
                                        ? "Needs Attention"
                                        : "Review"}
                                    </span>
                                  )}
                                </div>

                                <div className="mt-5 flex items-center gap-5">
                                  <span
                                    className={`text-[42px] font-bold leading-none tracking-[-0.03em] ${
                                      score !== null && score < 50
                                        ? "text-[#ef4444]"
                                        : "text-[#f97316]"
                                    }`}
                                  >
                                    {score ?? "—"}
                                  </span>

                                  {score !== null && (
                                    <div className="min-w-0 flex-1">
                                      <div className="h-2 rounded-full bg-[#e2e8f0]">
                                        <div
                                          className={`h-2 rounded-full ${
                                            score < 50
                                              ? "bg-[#ef4444]"
                                              : "bg-[#f97316]"
                                          }`}
                                          style={{ width: `${score}%` }}
                                        />
                                      </div>

                                      <div className="mt-1.5 flex justify-between text-[9px] font-medium text-[#cbd5e1]">
                                        <span>0</span>
                                        <span>50</span>
                                        <span>100</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <p className="mt-1 text-[11px] font-medium text-[#94a3b8]">
                                  out of 100
                                </p>

                                <div className="mt-4 border-t border-[#e2e8f0] pt-4">
                                  <p className="flex items-start gap-2.5 text-[12px] leading-[19px] text-[#64748b]">
                                    <span className="mt-[3px] inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-[#94a3b8] text-[7px] text-[#94a3b8]">
                                      i
                                    </span>
                                    <span>
                                      A low audit score indicates significant
                                      impact on user experience. This is a
                                      Lighthouse-generated metric.
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="min-h-[210px] rounded-[4px] border border-[#dbe4ef] bg-white p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#94a3b8]">
                                  Potential Impact
                                </p>

                                <div className="mt-5 flex items-start justify-between gap-6">
                                  <div className="min-w-0">
                                    <p className="font-mono text-[30px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
                                      {issue.displayValue
                                        ? issue.displayValue
                                            .replace(/^Est savings of\s*/i, "")
                                            .replace(
                                              /^Potential saving:\s*/i,
                                              "",
                                            )
                                            .trim()
                                        : "—"}
                                    </p>

                                    <p className="mt-1.5 text-[12px] font-medium text-[#94a3b8]">
                                      Potential byte reduction
                                    </p>
                                  </div>

                                  <div className="border-l border-[#e2e8f0] pl-6">
                                    <p className="text-[11px] font-medium text-[#94a3b8]">
                                      Affected files
                                    </p>

                                    <p className="mt-1.5 text-[26px] font-bold leading-none text-[#0f172a]">
                                      {issue.files?.length || 0}
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 border-t border-[#e2e8f0] pt-4">
                                  <div className="space-y-1.5">
                                    <p className="flex items-center gap-2 text-[12px] leading-[19px] text-[#475569]">
                                      <TrendingDown className="h-3.5 w-3.5 shrink-0 text-[#16a34a]" />
                                      Reducing these bundles could improve TTI
                                      and TBT scores.
                                    </p>

                                    {(() => {
                                      const totalScripting = (
                                        issue.details ?? []
                                      ).reduce(
                                        (total, detail) =>
                                          total +
                                          (Number(detail.scripting) || 0),
                                        0,
                                      );

                                      return (
                                        <p className="flex items-center gap-2 text-[12px] leading-[19px] text-[#475569]">
                                          <Clock3 className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
                                          Estimated compile time: ~
                                          {Math.round(totalScripting)} ms
                                        </p>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-[#edf1f5] px-5 py-5 sm:px-6">
                              <div className="grid gap-4 lg:grid-cols-2">
                                <div className="rounded-[4px] border border-[#dbe4ef] bg-[#f8fafc] p-4">
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-[#94a3b8]">
                                    Category Context
                                  </p>

                                  <div className="mt-3 divide-y divide-[#e2e8f0]">
                                    <div className="flex items-center justify-between py-2">
                                      <span className="text-[11px] text-[#64748b]">
                                        Category
                                      </span>

                                      <span className="rounded-[3px] bg-[#eff6ff] px-2 py-0.5 text-[10px] font-semibold text-[#2563eb]">
                                        {activeTab === "practices"
                                          ? "Best Practices"
                                          : activeTab.charAt(0).toUpperCase() +
                                            activeTab.slice(1)}
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                      <span className="text-[11px] text-[#64748b]">
                                        Page Score
                                      </span>

                                      <span className="font-mono text-[11px] font-semibold text-[#334155]">
                                        {selectedPage?.[activeTab] || "—"} / 100
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2">
                                      <span className="text-[11px] text-[#64748b]">
                                        Issue Count on Page
                                      </span>

                                      <span className="rounded-[3px] border border-[#fecaca] bg-[#fef2f2] px-2 py-0.5 text-[10px] font-semibold text-[#ef4444]">
                                        {
                                          [
                                            ...(selectedPage?.issues
                                              ?.accessibility || []),
                                            ...(selectedPage?.issues
                                              ?.performance || []),
                                            ...(selectedPage?.issues
                                              ?.practices || []),
                                            ...(selectedPage?.issues?.seo ||
                                              []),
                                          ].length
                                        }{" "}
                                        issues
                                      </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 py-2">
                                      <span className="text-[11px] text-[#64748b]">
                                        Audit ID
                                      </span>

                                      <span className="truncate font-mono text-[9px] text-[#475569]">
                                        {issue.id || "lighthouse-audit"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="rounded-[4px] border border-[#dbe4ef] bg-[#f8fafc] p-4">
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-[#94a3b8]">
                                    Other Issues on This Page
                                  </p>

                                  <div className="mt-3 space-y-2">
                                    {Object.entries(issues)
                                      .flatMap(([category, categoryIssues]) =>
                                        categoryIssues.map((item) => ({
                                          ...item,
                                          category,
                                        })),
                                      )
                                      .filter((item) => item.id !== issue.id)
                                      .slice(0, 4)
                                      .map((item, itemIndex) => (
                                        <div
                                          key={`${item.id || itemIndex}-other`}
                                          className="flex items-center gap-2"
                                        >
                                          <span
                                            className={`inline-flex min-w-[30px] justify-center rounded-[3px] border px-1.5 py-0.5 text-[9px] font-bold ${
                                              item.severity === "High"
                                                ? "border-[#fecaca] bg-[#fef2f2] text-[#ef4444]"
                                                : item.severity === "Low"
                                                  ? "border-[#e2e8f0] bg-[#f8fafc] text-[#64748b]"
                                                  : "border-[#fed7aa] bg-[#fff7ed] text-[#f97316]"
                                            }`}
                                          >
                                            {item.severity === "Medium"
                                              ? "MED"
                                              : item.severity.toUpperCase()}
                                          </span>

                                          <span className="min-w-0 flex-1 truncate text-[11px] text-[#475569]">
                                            {item.title}
                                          </span>

                                          {item.displayValue && (
                                            <span className="shrink-0 font-mono text-[10px] text-[#94a3b8]">
                                              {item.displayValue}
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-[#dbe4ef] bg-[#fffaf0] px-5 py-4 sm:px-6">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" />

                                <div>
                                  <p className="text-[12px] font-semibold text-[#92400e]">
                                    Impact Analysis
                                  </p>

                                  <p className="mt-1.5 text-[11px] leading-5 text-[#92400e]">
                                    {issue.impact}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-[#dbe4ef] bg-[#f0fdf4] px-5 py-4 sm:px-6">
                              <div className="flex items-start gap-3">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#16a34a]" />

                                <div>
                                  <p className="text-[12px] font-semibold text-[#166534]">
                                    Recommended Solution
                                  </p>

                                  <p className="mt-1.5 text-[11px] leading-5 text-[#166534]">
                                    {issue.solution}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="px-5 py-12 text-center sm:px-6">
                    <CheckCircle2 className="mx-auto h-8 w-8 text-[#22c55e]" />

                    <h3 className="mt-3 text-[14px] font-semibold text-[#0f172a]">
                      No Major Issues Found
                    </h3>

                    <p className="mx-auto mt-1.5 max-w-md text-[10px] leading-5 text-[#64748b]">
                      Lighthouse did not detect major issues in this category
                      for the selected page.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 border-t border-[#dbe4ef] bg-[#f8fafc] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-[12px] text-[#6B7280]">
                    Findings and metrics shown for{" "}
                    {activeTab === "practices"
                      ? "Best Practices"
                      : "Performance"}{" "}
                    · {selectedPage.url?.replace(/^https?:\/\//, "")}
                  </p>

                  <Link
                    href={`/report/${params.scanId}/page/${selectedPage._id}`}
                    className="inline-flex h-7 items-center justify-center gap-1.5 rounded-[4px] border border-[#dbe4ef] bg-white px-3 text-[11px] font-semibold text-[#475569] transition-colors hover:bg-[#f8fafc]"
                  >
                    Open Full Page Report
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </section>
  );
}
