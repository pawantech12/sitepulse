"use client";

import { useEffect, useMemo, useState } from "react";

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

  const toggleIssue = (id) => {
    setOpenIssue((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchScan = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/report/${scanId}`);

        setScan(res.data);

        if (res.data?.pages?.length > 0) {
          setSelectedPage(res.data.pages[0]);
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
      return text
        .replace(/\[Learn more.*?\]\(.*?\)/g, "")
        .replace(/\s+/g, " ")
        .trim();
    };

    const formatCategory = (category = []) => {
      return category.map((issue) => ({
        id: issue.id,

        title: issue.title || "Unknown Issue",

        severity: issue.severity || "Medium",

        description: cleanDescription(issue.description),

        files: issue.files?.length > 0 ? issue.files : ["Website Page"],

        impact:
          issue.impact ||
          "This issue may negatively affect website quality and user experience.",

        solution:
          issue.solution ||
          "Follow Lighthouse recommendations to optimize this issue.",

        displayValue: issue.displayValue,

        details: issue.details || [],
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

  const getMetricColor = (score) => {
    if (score >= 90) {
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    }

    if (score >= 75) {
      return "bg-orange-50 text-orange-700 border-orange-100";
    }

    return "bg-red-50 text-red-700 border-red-100";
  };

  function getMetricStatus(value) {
    if (!value) return "Average";

    const num = parseFloat(value);

    if (isNaN(num)) return "Average";

    if (num <= 2) return "Good";

    if (num <= 4) return "Needs Improvement";

    return "Poor";
  }

  const getStatusIcon = (status) => {
    if (status === "Poor") {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }

    if (status === "Average" || status === "Needs Improvement") {
      return <TriangleAlert className="h-4 w-4 text-orange-500" />;
    }

    return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  };

  const hasValidDetailData = (details = []) => {
    return details.some(
      (detail) =>
        detail?.url ||
        detail?.totalBytes ||
        detail?.wastedBytes ||
        detail?.wastedPercent ||
        detail?.total ||
        detail?.scripting ||
        detail?.scriptParseCompile ||
        detail?.statistic,
    );
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-5">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />

          <p className="text-sm font-medium text-slate-600">
            Loading scan report...
          </p>
        </div>
      </section>
    );
  }

  if (error || !scan) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
        <div className="max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <AlertTriangle className="h-7 w-7 text-red-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Failed To Load Report
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">{error}</p>

          <Link
            href="/analyze"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white"
          >
            Go Back
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fafafa] pt-28">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Website Analysis Report
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Scan Results
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Comprehensive performance, SEO, accessibility and best practices
              analysis for all scanned website pages.
            </p>
          </div>

          <Link
            href="/analyze"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
          >
            Start New Scan
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* SUMMARY */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
          {summaryCards.map((card, index) => {
            const status =
              card.score >= 90
                ? "Excellent"
                : card.score >= 70
                  ? "Good"
                  : card.score >= 50
                    ? "Needs Improvement"
                    : "Critical";

            return (
              <div
                key={index}
                className={`
          group relative overflow-hidden rounded-[32px]
          border border-slate-200/80
          bg-white/90
          p-6
          shadow-[0_10px_50px_rgba(15,23,42,0.05)]
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-1.5
          hover:border-slate-300
          hover:shadow-[0_20px_70px_rgba(15,23,42,0.08)]
          ${card.color}
        `}
              >
                {/* BACKGROUND GLOW */}
                <div
                  className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.6),transparent_45%)]
          "
                />

                {/* TOP SECTION */}
                <div className="relative flex items-start justify-between gap-5">
                  {/* LEFT */}
                  <div className="min-w-0 flex-1">
                    {/* LABEL */}
                    <div
                      className="
                inline-flex items-center gap-2
                rounded-full border border-white/40
                bg-white/70 px-3 py-1.5
                shadow-sm backdrop-blur-md
              "
                    >
                      <div className="h-2 w-2 rounded-full bg-current opacity-70" />

                      <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
                        {card.title}
                      </p>
                    </div>

                    {/* SCORE */}
                    <div className="mt-7 flex items-end gap-2">
                      <h2
                        className="
                  text-5xl font-bold tracking-[-0.04em]
                  text-slate-900
                "
                      >
                        {card.score}
                      </h2>

                      <span className="pb-1.5 text-sm font-semibold text-slate-500">
                        /100
                      </span>
                    </div>

                    {/* STATUS */}
                    <div className="mt-5">
                      <div
                        className="
                  inline-flex items-center gap-2
                  rounded-2xl border border-white/50
                  bg-white/60 px-3.5 py-2
                  text-xs font-semibold text-slate-700
                  shadow-sm backdrop-blur-md
                "
                      >
                        <div className="h-2 w-2 rounded-full bg-current opacity-70" />

                        <span>{status}</span>
                      </div>
                    </div>
                  </div>

                  {/* ICON */}
                  <div
                    className="
              relative flex h-14 w-14 shrink-0
              items-center justify-center
              rounded-2xl border border-white/50
              bg-white/75
              shadow-sm backdrop-blur-md
              transition-all duration-300
              group-hover:scale-105
              group-hover:shadow-md
            "
                  >
                    <div
                      className="
                absolute inset-0 rounded-2xl
                bg-gradient-to-br from-white/40 to-transparent
              "
                    />

                    <Activity className="relative h-6 w-6 text-slate-700" />
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="relative mt-6">
                  {/* TRACK */}
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/50">
                    {/* FILL */}
                    <div
                      className="
                relative h-full rounded-full
                bg-current
                transition-all duration-700
              "
                      style={{
                        width: `${card.score}%`,
                      }}
                    >
                      <div
                        className="
                  absolute inset-0
                  bg-gradient-to-r from-white/10 to-white/40
                "
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* HEALTH + WEBSITE INFO */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[380px_1fr]">
          {/* HEALTH SCORE CARD */}
          <div
            className="
      relative overflow-hidden rounded-[32px]
      border border-slate-800
      bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900
      p-6 sm:p-7
      shadow-[0_20px_80px_rgba(15,23,42,0.35)]
    "
          >
            {/* BACKGROUND GLOW */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              {/* TOP LABEL */}
              <div
                className="
          inline-flex items-center gap-2
          rounded-full border border-white/10
          bg-white/[0.04]
          px-3 py-1.5
          backdrop-blur-xl
        "
              >
                <TrendingUp className="h-4 w-4 text-emerald-400" />

                <span className="text-xs font-semibold tracking-wide text-slate-300">
                  Overall Health Score
                </span>
              </div>

              {/* SCORE */}
              <div className="mt-8 flex items-end gap-2">
                <h2 className="text-6xl font-black tracking-[-0.04em] text-white sm:text-7xl">
                  {scan.overallScore}
                </h2>

                <span className="pb-3 text-lg font-semibold text-slate-500">
                  /100
                </span>
              </div>

              {/* STATUS */}
              <div
                className="
          mt-6 inline-flex items-center gap-2
          rounded-2xl border border-emerald-500/10
          bg-emerald-500/10
          px-4 py-3
          text-sm font-medium text-emerald-300
        "
              >
                <CheckCircle2 className="h-4 w-4" />
                Website scan completed successfully
              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-sm leading-7 text-slate-400">
                Your website audit has been completed. Review page-level issues,
                Lighthouse diagnostics and optimization recommendations.
              </p>

              {/* BOTTOM STATS */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-xs font-medium text-slate-400">
                    Total Pages
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                    {scan.totalPages}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <p className="text-xs font-medium text-slate-400">
                    Total Issues
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight text-white">
                    {pages.reduce((acc, page) => acc + page.issueCount, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WEBSITE INFO */}
          <div
            className="
      overflow-hidden rounded-[32px]
      border border-slate-200/80
      bg-white/90
      shadow-[0_10px_50px_rgba(15,23,42,0.06)]
      backdrop-blur-xl
    "
          >
            {/* HEADER */}
            <div className="border-b border-slate-100 p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="
              flex h-14 w-14 items-center justify-center
              rounded-2xl border border-indigo-100
              bg-indigo-50
              shadow-sm
            "
                  >
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      Website Information
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      Scan overview and diagnostics summary
                    </p>
                  </div>
                </div>

                <div
                  className="
            inline-flex items-center gap-2
            rounded-2xl border border-slate-200
            bg-slate-50
            px-4 py-3
            text-sm font-medium text-slate-600
          "
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Audit Completed
                </div>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="p-6 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Website",
                    value: scan.url,
                  },
                  {
                    label: "Total Pages",
                    value: scan.totalPages,
                  },
                  {
                    label: "Scan Duration",
                    value: scan.scanDuration,
                  },
                  {
                    label: "Total Issues",
                    value: pages.reduce(
                      (acc, page) => acc + page.issueCount,
                      0,
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="
              group rounded-[24px]
              border border-slate-200
              bg-slate-50/70
              p-5
              transition-all duration-300
              hover:border-slate-300
              hover:bg-white
              hover:shadow-sm
            "
                  >
                    {/* LABEL */}
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className="
                  text-[11px] font-bold uppercase
                  tracking-[0.18em] text-slate-500
                "
                      >
                        {item.label}
                      </p>

                      <div
                        className="
                  h-2 w-2 rounded-full bg-slate-300
                  transition-colors duration-300
                  group-hover:bg-indigo-500
                "
                      />
                    </div>

                    {/* VALUE */}
                    <p
                      className="
                mt-4 break-all
                text-base font-semibold tracking-tight text-slate-900
                sm:text-lg
              "
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* WEBSITE PAGES TABLE */}
        <div className="mt-10 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Website Pages
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  Compare analyzed pages and identify pages with the highest
                  issue count.
                </p>
              </div>

              <div className="relative w-full lg:w-[320px]">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search pages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              {/* HEADER */}
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  {["URL", "Performance", "SEO", "Accessibility", "Issues"].map(
                    (item, index) => (
                      <th
                        key={index}
                        className="
                  px-6 py-5 text-left
                  text-[11px] font-bold uppercase
                  tracking-[0.18em] text-slate-500
                "
                      >
                        <div className="flex items-center gap-2">
                          <span>{item}</span>

                          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {filteredPages.map((page, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedPage(page)}
                    className={`
              group cursor-pointer
              border-b border-slate-100
              transition-all duration-300
              hover:bg-slate-50/80
              ${selectedPage?.url === page.url ? "bg-cyan-50/40" : "bg-white"}
            `}
                  >
                    {/* URL */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex min-w-0 items-center gap-3">
                          {/* ALERT */}
                          <div className="shrink-0">
                            {page.issueCount >= 10 ? (
                              <div
                                className="
                          flex h-9 w-9 items-center justify-center
                          rounded-xl border border-red-100
                          bg-red-50
                        "
                              >
                                <TriangleAlert className="h-4 w-4 text-red-500" />
                              </div>
                            ) : (
                              <div
                                className="
                          flex h-9 w-9 items-center justify-center
                          rounded-xl border border-emerald-100
                          bg-emerald-50
                        "
                              >
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              </div>
                            )}
                          </div>

                          {/* URL CONTENT */}
                          <div className="min-w-0">
                            <p
                              className="
                        truncate text-sm font-semibold
                        tracking-tight text-slate-900
                      "
                            >
                              {page.url}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Lighthouse page analysis
                            </p>
                          </div>
                        </div>

                        {/* ACTION */}
                        <Link
                          href={`/report/${params.scanId}/page/${page.id}`}
                          className="
                    inline-flex shrink-0 items-center gap-2
                    rounded-xl border border-slate-200
                    bg-white px-4 py-2.5
                    text-xs font-semibold text-slate-700
                    opacity-0 shadow-sm
                    transition-all duration-300
                    hover:border-slate-300
                    hover:bg-slate-50
                    hover:text-slate-900
                    group-hover:opacity-100
                  "
                        >
                          View Details
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </td>

                    {/* PERFORMANCE */}
                    <td className="px-6 py-5">
                      <div
                        className={`
                  inline-flex items-center justify-center
                  rounded-2xl border px-4 py-2.5
                  text-sm font-bold shadow-sm
                  ${getMetricColor(page.performance)}
                `}
                      >
                        {page.performance}
                      </div>
                    </td>

                    {/* SEO */}
                    <td className="px-6 py-5">
                      <div
                        className={`
                  inline-flex items-center justify-center
                  rounded-2xl border px-4 py-2.5
                  text-sm font-bold shadow-sm
                  ${getMetricColor(page.seo)}
                `}
                      >
                        {page.seo}
                      </div>
                    </td>

                    {/* ACCESSIBILITY */}
                    <td className="px-6 py-5">
                      <div
                        className={`
                  inline-flex items-center justify-center
                  rounded-2xl border px-4 py-2.5
                  text-sm font-bold shadow-sm
                  ${getMetricColor(page.accessibility)}
                `}
                      >
                        {page.accessibility}
                      </div>
                    </td>

                    {/* ISSUES */}
                    <td className="px-6 py-5">
                      <div
                        className="
                  inline-flex items-center gap-2
                  rounded-2xl border border-red-100
                  bg-red-50 px-4 py-2.5
                  text-sm font-bold text-red-600
                  shadow-sm
                "
                      >
                        <span>{page.issueCount}</span>

                        <span className="text-red-500/80">
                          {page.issueCount === 1 ? "Issue" : "Issues"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAIL SECTION */}
        {selectedPage && (
          <div className="mt-10 grid gap-8 xl:grid-cols-[320px_1fr]">
            {/* SIDEBAR */}
            <div
              className="
    overflow-hidden rounded-[32px]
    border border-slate-200/80
    bg-white/90
    shadow-[0_10px_50px_rgba(15,23,42,0.06)]
    backdrop-blur-xl
  "
            >
              {/* TOP SECTION */}
              <div className="relative border-b border-slate-100 p-6 sm:p-7">
                {/* SOFT BACKGROUND */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-cyan-50/40" />

                <div className="relative">
                  {/* LABEL */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />

                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Selected Page
                    </p>
                  </div>

                  {/* URL */}
                  <h3
                    className="
          mt-5 break-all
          text-xl font-bold tracking-tight text-slate-900
          sm:text-2xl sm:leading-[1.3]
        "
                  >
                    {selectedPage.url}
                  </h3>

                  {/* ACTION */}
                  <Link
                    href={`/report/${params.scanId}/page/${selectedPage._id}`}
                    className="
          group mt-6 inline-flex w-full items-center justify-center gap-2.5
          rounded-2xl border border-slate-900
          bg-slate-900 px-5 py-3.5
          text-sm font-semibold text-white
          shadow-lg shadow-slate-900/10
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-slate-800
          sm:w-auto
        "
                  >
                    <span>Open Full Page Report</span>

                    <ChevronRight
                      className="
            h-4 w-4 transition-transform duration-300
            group-hover:translate-x-1
          "
                    />
                  </Link>
                </div>
              </div>

              {/* METRICS */}
              <div className="p-5 sm:p-6">
                <div className="space-y-3">
                  {metrics.map((item, index) => (
                    <div
                      key={index}
                      className="
            group flex items-center justify-between gap-4
            rounded-2xl border border-slate-200
            bg-slate-50/70 p-4
            transition-all duration-300
            hover:border-slate-300
            hover:bg-white
            hover:shadow-sm
          "
                    >
                      {/* LEFT */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.metric}
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {item.status}
                        </p>
                      </div>

                      {/* RIGHT */}
                      <div className="flex shrink-0 items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-bold tracking-tight text-slate-900">
                            {item.value}
                          </p>
                        </div>

                        <div
                          className="
                flex h-10 w-10 items-center justify-center
                rounded-xl border border-slate-200
                bg-white
                transition-all duration-300
                group-hover:border-slate-300
              "
                        >
                          {getStatusIcon(item.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ISSUES */}
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              {/* TABS */}
              <div className="overflow-x-auto border-b border-slate-100 bg-white/80 backdrop-blur-xl">
                <div className="flex min-w-max gap-3 p-4">
                  {["performance", "seo", "accessibility", "practices"].map(
                    (tab) => {
                      const isActive = activeTab === tab;

                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`
            group relative inline-flex items-center gap-2.5
            overflow-hidden rounded-2xl
            border px-5 py-3.5
            text-sm font-semibold capitalize
            transition-all duration-300
            ${
              isActive
                ? `
                  border-slate-900
                  bg-slate-900
                  text-white
                  shadow-lg shadow-slate-900/10
                `
                : `
                  border-transparent
                  bg-slate-50
                  text-slate-600
                  hover:border-slate-200
                  hover:bg-white
                  hover:text-slate-900
                  hover:shadow-sm
                `
            }
          `}
                        >
                          {/* ACTIVE INDICATOR */}
                          <span
                            className={`
              h-2.5 w-2.5 rounded-full transition-all duration-300
              ${
                isActive
                  ? "bg-emerald-400"
                  : "bg-slate-300 group-hover:bg-slate-400"
              }
            `}
                          />

                          {/* LABEL */}
                          <span className="whitespace-nowrap">
                            {tab === "practices" ? "Best Practices" : tab}
                          </span>

                          {/* ACTIVE GLOW */}
                          {isActive && (
                            <div
                              className="
                absolute inset-0 rounded-2xl
                ring-1 ring-inset ring-white/10
              "
                            />
                          )}
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6">
                <div className="space-y-5">
                  {issues?.[activeTab]?.length > 0 ? (
                    issues[activeTab].map((issue, index) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300"
                      >
                        {/* HEADER */}
                        <button
                          onClick={() => toggleIssue(issue.id || index)}
                          className={`
    group relative w-full overflow-hidden
    border-b border-slate-100
    bg-white p-5 text-left
    transition-all duration-300
    sm:p-6
    ${
      openIssue === (issue.id || index)
        ? "bg-slate-50/80"
        : "hover:bg-slate-50/70"
    }
  `}
                        >
                          {/* ACTIVE BORDER */}
                          <div
                            className={`
      absolute left-0 top-0 h-full w-1 rounded-r-full
      transition-all duration-300
      ${
        openIssue === (issue.id || index)
          ? issue.severity === "High"
            ? "bg-red-500"
            : "bg-orange-500"
          : "bg-transparent"
      }
    `}
                          />

                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            {/* LEFT SIDE */}
                            <div className="flex min-w-0 flex-1 items-start gap-4">
                              {/* ICON */}
                              <div
                                className={`
          mt-1 flex h-14 w-14 shrink-0 items-center justify-center
          rounded-2xl border transition-all duration-300
          ${
            issue.severity === "High"
              ? `
                border-red-100
                bg-gradient-to-br from-red-50 to-red-100/70
                text-red-600
              `
              : `
                border-orange-100
                bg-gradient-to-br from-orange-50 to-orange-100/70
                text-orange-600
              `
          }
        `}
                              >
                                <AlertTriangle className="h-5 w-5" />
                              </div>

                              {/* CONTENT */}
                              <div className="min-w-0 flex-1">
                                {/* TOP */}
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4
                                    className="
              text-lg font-semibold leading-7
              tracking-tight text-slate-900
              sm:text-xl
            "
                                  >
                                    {issue.title}
                                  </h4>

                                  {issue.displayValue && (
                                    <span
                                      className="
                inline-flex items-center rounded-full
                border border-slate-200
                bg-white px-3 py-1
                text-[11px] font-bold
                tracking-wide text-slate-700
                shadow-sm
              "
                                    >
                                      {issue.displayValue}
                                    </span>
                                  )}
                                </div>

                                {/* DESCRIPTION */}
                                <p
                                  className="
            mt-3 max-w-4xl
            text-sm leading-7 text-slate-600
          "
                                >
                                  {issue.description}
                                </p>

                                {/* MOBILE SEVERITY */}
                                <div className="mt-4 sm:hidden">
                                  <span
                                    className={`
              inline-flex rounded-xl border
              px-3 py-1.5
              text-[11px] font-bold uppercase
              tracking-[0.16em]
              ${
                issue.severity === "High"
                  ? "border-red-100 bg-red-50 text-red-600"
                  : "border-orange-100 bg-orange-50 text-orange-600"
              }
            `}
                                  >
                                    {issue.severity}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex shrink-0 items-center gap-3">
                              {/* SEVERITY */}
                              <span
                                className={`
          hidden rounded-2xl border
          px-4 py-2
          text-[11px] font-bold uppercase
          tracking-[0.16em]
          shadow-sm sm:inline-flex
          ${
            issue.severity === "High"
              ? "border-red-100 bg-red-50 text-red-600"
              : "border-orange-100 bg-orange-50 text-orange-600"
          }
        `}
                              >
                                {issue.severity}
                              </span>

                              {/* TOGGLE BUTTON */}
                              <div
                                className={`
          flex h-12 w-12 items-center justify-center
          rounded-2xl border border-slate-200
          bg-white shadow-sm
          transition-all duration-300
          ${
            openIssue === (issue.id || index)
              ? `
                rotate-180
                border-slate-300
                bg-slate-100
                shadow-inner
              `
              : `
                group-hover:border-slate-300
                group-hover:bg-slate-50
              `
          }
        `}
                              >
                                <ChevronDown className="h-5 w-5 text-slate-600" />
                              </div>
                            </div>
                          </div>
                        </button>

                        <div
                          className={`grid transition-all duration-500 ease-in-out ${
                            openIssue === (issue.id || index)
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              openIssue === (issue.id || index)
                                ? "translate-y-0 opacity-100"
                                : "-translate-y-2 opacity-0"
                            }`}
                          >
                            {/* METRICS */}
                            {(issue.numericValue ||
                              issue.score !== null ||
                              hasValidDetailData(issue.details)) && (
                              <div className="border-b border-slate-100 bg-slate-50/80 p-5 sm:p-6">
                                {/* HEADER */}
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                  <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                      Issue Metrics
                                    </p>

                                    <h4 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                                      Performance & Resource Insights
                                    </h4>

                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                      Lighthouse scoring, numeric analysis and
                                      affected resource data.
                                    </p>
                                  </div>

                                  <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-cyan-500" />

                                    <span className="text-sm font-semibold text-slate-700">
                                      Live Metrics
                                    </span>
                                  </div>
                                </div>

                                {/* METRICS GRID */}
                                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                  {/* SCORE */}
                                  {issue.score !== null && (
                                    <div
                                      className="
        rounded-3xl border border-slate-200
        bg-white p-5
        transition-all duration-300
        hover:border-slate-300
        hover:shadow-[0_8px_30px_rgba(15,23,42,0.05)]
      "
                                    >
                                      <div className="flex items-start justify-between gap-4">
                                        <div>
                                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800">
                                            Lighthouse Score
                                          </p>

                                          <h4 className="mt-1 text-sm font-medium text-slate-500">
                                            Audit Rating
                                          </h4>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50">
                                          <CheckCircle2 className="h-5 w-5 text-slate-600" />
                                        </div>
                                      </div>

                                      <div className="mt-5 flex items-end gap-2">
                                        <p className="text-4xl font-bold tracking-tight text-slate-900">
                                          {Math.round((issue.score ?? 0) * 100)}
                                        </p>

                                        <span className="pb-1 text-sm font-medium text-slate-400">
                                          /100
                                        </span>
                                      </div>
                                    </div>
                                  )}

                                  {/* NUMERIC VALUE */}
                                  {issue.numericValue && (
                                    <div
                                      className="
        rounded-3xl border border-slate-200
        bg-white p-5
        transition-all duration-300
        hover:border-slate-300
        hover:shadow-[0_8px_30px_rgba(15,23,42,0.05)]
      "
                                    >
                                      <div className="flex items-start justify-between gap-4">
                                        <div>
                                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800">
                                            Numeric Value
                                          </p>

                                          <h4 className="mt-1 text-sm font-medium text-slate-500">
                                            Raw Metric Data
                                          </h4>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50">
                                          <BarChart3 className="h-5 w-5 text-slate-600" />
                                        </div>
                                      </div>

                                      <div className="mt-5">
                                        <p className="text-4xl font-bold tracking-tight text-slate-900">
                                          {Math.round(issue.numericValue)}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* RESOURCES */}
                                  {issue.details?.length > 0 && (
                                    <div
                                      className="
        rounded-3xl border border-slate-200
        bg-white p-5
        transition-all duration-300
        hover:border-slate-300
        hover:shadow-[0_8px_30px_rgba(15,23,42,0.05)]
      "
                                    >
                                      <div className="flex items-start justify-between gap-4">
                                        <div>
                                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800">
                                            Affected Resources
                                          </p>

                                          <h4 className="mt-1 text-sm font-medium text-slate-500">
                                            Impacted Assets
                                          </h4>
                                        </div>

                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50">
                                          <FileWarning className="h-5 w-5 text-slate-600" />
                                        </div>
                                      </div>

                                      <div className="mt-5 flex items-end gap-2">
                                        <p className="text-4xl font-bold tracking-tight text-slate-900">
                                          {issue.details.length}
                                        </p>

                                        <span className="pb-1 text-sm font-medium text-slate-400">
                                          Files
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* AFFECTED FILES */}
                            {issue.files?.length > 0 && (
                              <div className="border-b border-slate-100 p-5 sm:p-6">
                                {/* HEADER */}
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                                      <FileWarning className="h-5 w-5 text-slate-600" />
                                    </div>

                                    <div>
                                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                        Affected Files
                                      </p>

                                      <h4 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                                        Files & Resources Impacted
                                      </h4>

                                      <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Review files associated with this
                                        Lighthouse issue.
                                      </p>
                                    </div>
                                  </div>

                                  <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-orange-500" />

                                    <span className="text-sm font-semibold text-slate-700">
                                      {issue.files.length} Files
                                    </span>
                                  </div>
                                </div>

                                {/* FILE LIST */}
                                <div className="mt-6 space-y-3">
                                  {issue.files.map((file, fileIndex) => (
                                    <div
                                      key={fileIndex}
                                      className="
            group overflow-hidden rounded-[24px]
            border border-slate-200
            bg-white
            transition-all duration-300
            hover:border-slate-300
            hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
                                    >
                                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                        {/* LEFT */}
                                        <div className="flex min-w-0 items-start gap-4">
                                          {/* ICON */}
                                          <div
                                            className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-2xl border border-slate-200
                  bg-slate-50
                  transition-colors duration-300
                  group-hover:bg-orange-50
                  group-hover:border-orange-100
                "
                                          >
                                            <FileWarning className="h-5 w-5 text-slate-600 group-hover:text-orange-600" />
                                          </div>

                                          {/* FILE CONTENT */}
                                          <div className="min-w-0">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                              File Path
                                            </p>

                                            <p
                                              className="
                    mt-2 break-all text-sm
                    font-medium leading-6 text-slate-700
                  "
                                            >
                                              {file}
                                            </p>
                                          </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="flex items-center gap-3">
                                          <button
                                            onClick={() =>
                                              navigator.clipboard.writeText(
                                                file,
                                              )
                                            }
                                            className="
                  inline-flex h-11 items-center justify-center gap-2
                  rounded-2xl border border-slate-200
                  bg-white px-5
                  text-sm font-semibold text-slate-700
                  transition-all duration-200
                  hover:border-cyan-200
                  hover:bg-cyan-50
                  hover:text-cyan-700
                "
                                          >
                                            Copy Path
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* DETAILED RESOURCE ANALYSIS */}
                            {hasValidDetailData(issue.details) && (
                              <div className="border-b border-slate-100 p-5 sm:p-6">
                                {/* HEADER */}
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                                      <BarChart3 className="h-5 w-5 text-slate-600" />
                                    </div>

                                    <div>
                                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                                        Detailed Resource Analysis
                                      </p>

                                      <h4 className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                                        Resource Optimization Insights
                                      </h4>

                                      <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Analyze affected assets, wasted bytes
                                        and performance impact.
                                      </p>
                                    </div>
                                  </div>

                                  <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2">
                                    <span className="h-2 w-2 rounded-full bg-cyan-500" />

                                    <span className="text-sm font-semibold text-slate-700">
                                      {issue.details.length} Resources
                                    </span>
                                  </div>
                                </div>

                                {/* RESOURCE LIST */}
                                <div className="mt-6 space-y-4">
                                  {issue.details.map((detail, detailIndex) => {
                                    const resourceUrl = detail.url || "";

                                    const isImage =
                                      /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(
                                        resourceUrl,
                                      );

                                    return (
                                      <div
                                        key={detailIndex}
                                        className="
              group overflow-hidden rounded-[28px]
              border border-slate-200
              bg-white
              transition-all duration-300
              hover:border-slate-300
              hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]
            "
                                      >
                                        {/* TOP SECTION */}
                                        <div className="p-5 sm:p-6">
                                          <div className="flex flex-col gap-5 lg:flex-row">
                                            {/* IMAGE */}
                                            {isImage && (
                                              <div className="w-full shrink-0 lg:w-[170px]">
                                                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                                                  <img
                                                    src={resourceUrl}
                                                    alt="Resource Preview"
                                                    className="
                          h-[130px] w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-[1.03]
                        "
                                                  />
                                                </div>
                                              </div>
                                            )}

                                            {/* CONTENT */}
                                            <div className="min-w-0 flex-1">
                                              {/* BADGES */}
                                              <div className="flex flex-wrap items-center gap-2">
                                                <span
                                                  className="
                        inline-flex items-center rounded-full
                        border border-slate-200
                        bg-slate-50
                        px-3 py-1
                        text-[11px] font-bold uppercase
                        tracking-wide text-slate-600
                      "
                                                >
                                                  {isImage
                                                    ? "Image Resource"
                                                    : "Resource"}
                                                </span>

                                                {detail.wastedPercent > 20 && (
                                                  <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-red-600">
                                                    High Waste
                                                  </span>
                                                )}
                                              </div>

                                              {/* URL */}
                                              {detail.url && (
                                                <div className="mt-4">
                                                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                                    Resource URL
                                                  </p>

                                                  <a
                                                    href={detail.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                          mt-2 block break-all
                          text-sm font-medium leading-6 text-slate-700
                          transition-colors duration-200
                          hover:text-cyan-600
                        "
                                                  >
                                                    {detail.url}
                                                  </a>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>

                                        {/* METRICS */}
                                        <div className="grid gap-3 border-t border-slate-100 bg-slate-50 p-5 sm:grid-cols-2 xl:grid-cols-4">
                                          {detail.totalBytes && (
                                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Total Size
                                              </p>

                                              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                                {(
                                                  detail.totalBytes / 1024
                                                ).toFixed(1)}
                                                <span className="ml-1 text-sm font-medium text-slate-500">
                                                  KB
                                                </span>
                                              </p>
                                            </div>
                                          )}

                                          {detail.wastedBytes && (
                                            <div className="rounded-2xl border border-red-100 bg-white p-4">
                                              <p className="text-[11px] font-semibold uppercase tracking-wide text-red-500">
                                                Wasted Bytes
                                              </p>

                                              <p className="mt-3 text-2xl font-bold tracking-tight text-red-600">
                                                {(
                                                  detail.wastedBytes / 1024
                                                ).toFixed(1)}
                                                <span className="ml-1 text-sm font-medium text-red-400">
                                                  KB
                                                </span>
                                              </p>
                                            </div>
                                          )}

                                          {detail.wastedPercent && (
                                            <div className="rounded-2xl border border-orange-100 bg-white p-4">
                                              <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-500">
                                                Wasted %
                                              </p>

                                              <p className="mt-3 text-2xl font-bold tracking-tight text-orange-600">
                                                {detail.wastedPercent.toFixed(
                                                  1,
                                                )}
                                                <span className="ml-1 text-sm font-medium text-orange-400">
                                                  %
                                                </span>
                                              </p>
                                            </div>
                                          )}

                                          {detail.total && (
                                            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                                Main Thread Time
                                              </p>

                                              <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                                                {(detail.total / 1000).toFixed(
                                                  2,
                                                )}
                                                <span className="ml-1 text-sm font-medium text-slate-500">
                                                  s
                                                </span>
                                              </p>
                                            </div>
                                          )}
                                        </div>

                                        {/* FOOTER */}
                                        <div className="flex flex-col gap-4 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                                          <div className="flex flex-wrap items-center gap-2">
                                            {isImage && (
                                              <span className="rounded-xl bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-700">
                                                Preview Available
                                              </span>
                                            )}

                                            {detail.wastedPercent > 20 && (
                                              <span className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                                                Optimization Recommended
                                              </span>
                                            )}
                                          </div>

                                          {detail.url && (
                                            <a
                                              href={detail.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="
                    inline-flex h-11 items-center justify-center gap-2
                    rounded-2xl border border-slate-200
                    bg-white px-5
                    text-sm font-semibold text-slate-700
                    transition-all duration-200
                    hover:border-cyan-200
                    hover:bg-cyan-50
                    hover:text-cyan-700
                  "
                                            >
                                              Open Resource
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* IMPACT */}
                            <div className="border-b border-slate-100 bg-gradient-to-br from-orange-50 to-orange-50/40 p-5 sm:p-6">
                              <div className="flex items-start gap-4">
                                {/* ICON */}
                                <div
                                  className="
        flex h-11 w-11 shrink-0 items-center justify-center
        rounded-2xl border border-orange-100
        bg-white shadow-sm
      "
                                >
                                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                                </div>

                                {/* CONTENT */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-sm font-semibold tracking-tight text-orange-700">
                                      Impact Analysis
                                    </p>
                                  </div>

                                  <p className="mt-3 text-sm leading-7 text-orange-700/90">
                                    {issue.impact}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* SOLUTION */}
                            <div className="bg-gradient-to-br from-emerald-50 to-emerald-50/40 p-5 sm:p-6">
                              <div className="flex items-start gap-4">
                                {/* ICON */}
                                <div
                                  className="
        flex h-11 w-11 shrink-0 items-center justify-center
        rounded-2xl border border-emerald-100
        bg-white shadow-sm
      "
                                >
                                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                </div>

                                {/* CONTENT */}
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-3">
                                    <p className="text-sm font-semibold tracking-tight text-emerald-700">
                                      Recommended Solution
                                    </p>
                                  </div>

                                  <p className="mt-3 text-sm leading-7 text-emerald-700/90">
                                    {issue.solution}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-10 text-center">
                      <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />

                      <h3 className="mt-5 text-xl font-semibold text-slate-900">
                        No Major Issues Found
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Lighthouse did not detect major issues in this category
                        for the selected page.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
