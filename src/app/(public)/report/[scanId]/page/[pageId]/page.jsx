"use client";

import Link from "next/link";

import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe,
  ImageIcon,
  Layers3,
  MonitorSmartphone,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  XCircle,
} from "lucide-react";

import { useParams } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";
import { Info } from "lucide-react";
import { Copy } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Monitor } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Gauge } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Zap } from "lucide-react";
import { ArrowDownRight } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Search } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { FileCode2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Code2 } from "lucide-react";
import { Eye } from "lucide-react";
import { Check } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { MapPin } from "lucide-react";
import { Palette } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { ChevronDown } from "lucide-react";

export default function PageDetailReport() {
  const params = useParams();
  const pageId = params?.pageId;
  const scanId = params?.scanId;
  const [expandedIssues, setExpandedIssues] = useState({});
  console.log("pageid: ", pageId);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`/api/page-report/${pageId}`);

        setData(res?.data);
        console.log("page response data: ", res.data);
      } catch (err) {
        console.log("Error fetching page report:", err);
      } finally {
        setLoading(false);
      }
    };

    if (pageId) fetchPage();
  }, [pageId]);

  console.log("page data: ", data);

  const calculateHealthScore = (page) => {
    const performance = page?.performance || 0;
    const seo = page?.seo || 0;
    const accessibility = page?.accessibility || 0;
    const bestPractices = page?.practices || 0;

    const score =
      performance * 0.4 + seo * 0.2 + accessibility * 0.2 + bestPractices * 0.2;

    return Math.round(score);
  };

  const allIssues = [
    ...(data?.issues?.performance || []),
    ...(data?.issues?.seo || []),
    ...(data?.issues?.accessibility || []),
    ...(data?.issues?.practices || []),
  ];

  const issueSeverityCounts = allIssues.reduce(
    (counts, issue) => {
      const severity = String(issue?.severity || "").toLowerCase();

      if (severity === "high") counts.high++;
      if (severity === "medium") counts.medium++;
      if (severity === "low") counts.low++;

      return counts;
    },
    {
      high: 0,
      medium: 0,
      low: 0,
    },
  );

  const totalIssues = allIssues.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[1200px] bg-[#f8fafc] px-2 py-0 sm:px-4 lg:px-8">
          <div className="border-x border-b border-[#dbe4ef] bg-white">
            <div className="flex min-h-[445px] flex-col items-center px-5 pb-14 pt-16 sm:px-8 sm:pt-16">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-[3px] border-[#e2e8f0]" />
                <Loader2 className="relative h-9 w-9 animate-spin text-[#4f6df5]" />
              </div>

              <p className="mt-5 text-[15px] font-semibold text-[#334155] sm:text-[16px]">
                Loading report...
              </p>

              <p className="mt-1.5 text-center text-[10px] leading-5 text-[#94a3b8] sm:text-[11px]">
                Retrieving audit results for this page. This may take a moment.
              </p>

              <div className="mt-11 w-full max-w-[1040px]">
                <div className="h-3 rounded-[3px] bg-[#f1f3f5]" />

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="h-20 rounded-[4px] bg-[#f7f8fa] sm:h-20" />
                  <div className="h-20 rounded-[4px] bg-[#f7f8fa] sm:h-20" />
                  <div className="h-20 rounded-[4px] bg-[#f7f8fa] sm:h-20" />
                  <div className="h-20 rounded-[4px] bg-[#f7f8fa] sm:h-20" />
                </div>

                <div className="mt-3 h-3 max-w-[78%] rounded-[3px] bg-[#f7f8fa]" />
              </div>
            </div>

            <div className="border-t border-[#e2e8f0] px-5 py-4 sm:px-10">
              <p className="flex items-center justify-center gap-1.5 text-center text-[9px] text-[#a8b4c5] sm:text-[10px]">
                <Info className="h-3 w-3 shrink-0" />
                If loading takes longer than expected, try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="mx-auto w-full max-w-[1200px] bg-[#f8fafc] px-2 py-0 sm:px-4 lg:px-8">
          <div className="border-x border-b border-[#dbe4ef] bg-white">
            <div className="flex min-h-[390px] flex-col items-center justify-center px-5 py-12 text-center sm:px-8">
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[9px] border border-[#fca5a5] bg-[#fffafa]">
                <AlertCircle className="h-5 w-5 text-[#ef4444]" />
              </div>

              <h2 className="mt-5 text-[19px] font-semibold tracking-[-0.01em] text-[#0f172a] sm:text-[20px]">
                Failed to load report
              </h2>

              <p className="mt-2 max-w-[220px] text-[11px] leading-[1.7] text-[#64748b] sm:text-[12px]">
                The page report could not be retrieved. This may be due to a
                network error or a problem with the scan data. The report may
                not be available for this URL.
              </p>

              <div className="mt-5 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-[5px] border border-[#dbe4ef] bg-[#f8fafc] px-3 py-2">
                <span className="font-mono text-[10px] text-[#94a3b8]">
                  &gt;_
                </span>

                <span className="truncate font-mono text-[10px] text-[#475569]">
                  Error: Unable to retrieve page report data
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#e2e8f0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <p className="flex items-center gap-1.5 text-[9px] leading-4 text-[#a8b4c5] sm:text-[10px]">
                <Info className="h-3 w-3 shrink-0" />
                If the problem persists, try navigating back to the full report
                and selecting the page again.
              </p>

              <Link
                href={`/report/${scanId}`}
                className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 border border-[#dbe4ef] bg-white px-3 text-[10px] font-semibold text-[#334155] transition-colors hover:bg-[#f8fafc]"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // MAP API → YOUR EXISTING STRUCTURE (NO UI CHANGE)
  // =========================

  const pageInfo = {
    url: data.url,
    fullUrl: data.url,
    performance: data.performance,
    seo: data.seo,
    accessibility: data.accessibility,
    practices: data.bestPractices,
    scanDate: new Date(data.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),

    scanTime: new Date(data.createdAt).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    loadTime: data.metrics?.LCP || "N/A",
    issues: totalIssues,
    rawAudits: data.rawAudits,

    // ✅ ADD THIS
    healthScore: calculateHealthScore({
      performance: data.performance,
      seo: data.seo,
      accessibility: data.accessibility,
      practices: data.bestPractices,
    }),
  };

  const metrics = [
    {
      title: "First Contentful Paint",
      short: "FCP",
      value: data.metrics?.FCP || "N/A",
      status: "Good",
      description: "First Contentful Paint",
      note: "Below 1.8 s threshold",
      icon: CheckCircle2,
    },
    {
      title: "Largest Contentful Paint",
      short: "LCP",
      value: data.metrics?.LCP || "N/A",
      status: "Poor",
      description: "Largest Contentful Paint",
      note: "Exceeds 2.5 s threshold",
      icon: CircleAlert,
    },
    {
      title: "Cumulative Layout Shift",
      short: "CLS",
      value: data.metrics?.CLS || "N/A",
      status: "Good",
      description: "Cumulative Layout Shift",
      note: "Below 0.1 threshold",
      icon: CheckCircle2,
    },
    {
      title: "Total Blocking Time",
      short: "TBT",
      value: data.metrics?.TBT || "N/A",
      status: "Average",
      description: "Total Blocking Time",
      note: "200–600 ms needs review",
      icon: TriangleAlert,
    },
    {
      title: "Speed Index",
      short: "SI",
      value: data.metrics?.SI || "N/A",
      status: "Average",
      description: "Speed Index",
      note: "3.4 s+ considered slow",
      icon: TriangleAlert,
    },
  ];

  const categoryScores = [
    {
      title: "Performance",
      value: Number(data.performance || 0),
      weight: "40% weight",
      icon: Zap,
      average: 84,
    },
    {
      title: "SEO",
      value: Number(data.seo || 0),
      weight: "20% weight",
      icon: Search,
      average: 88,
    },
    {
      title: "Accessibility",
      value: Number(data.accessibility || 0),
      weight: "20% weight",
      icon: Sparkles,
      average: 82,
    },
    {
      title: "Best Practices",
      value: Number(data.bestPractices || 0),
      weight: "20% weight",
      icon: ShieldCheck,
      average: 85,
    },
  ];

  const issueCategories = [
    {
      icon: Layers3,
      title: "Performance",
      issues: data?.issues?.performance || [],
    },
    {
      icon: SearchCheck,
      title: "SEO",
      issues: data?.issues?.seo || [],
    },
    {
      icon: MonitorSmartphone,
      title: "Accessibility",
      issues: data?.issues?.accessibility || [],
    },
    {
      icon: ShieldCheck,
      title: "Best Practices",
      issues: data?.issues?.practices || [],
    },
  ];
  function IssueElementPreview({ issue }) {
    const details = Array.isArray(issue.details)
      ? issue.details.filter(
          (item) =>
            item.nodeLabel ||
            item.selector ||
            item.snippet ||
            item.nodePath ||
            item.boundingRect,
        )
      : [];

    if (!details.length) return null;

    return (
      <section className="mt-6">
        {/* Section heading */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
              <FileCode2 className="h-4 w-4 text-slate-600" />
            </div>

            <div>
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                Audit details
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Lighthouse element diagnostics and source information
              </p>
            </div>
          </div>

          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
            {details.length} {details.length === 1 ? "element" : "elements"}
          </span>
        </div>

        <div className="space-y-3">
          {details.map((item, index) => (
            <AuditDetailCard
              key={`${item.selector || item.nodeLabel || "node"}-${index}`}
              item={item}
              index={index}
              issueId={issue.id}
            />
          ))}
        </div>

        <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          These details are collected from Lighthouse diagnostics. Element
          coordinates refer to the scanned page and viewport, and may differ
          from the current page layout.
        </p>
      </section>
    );
  }

  function AuditDetailCard({ item, index, issueId }) {
    const [expanded, setExpanded] = useState(index === 0);
    const [copied, setCopied] = useState("");

    const explanation = item.explanation || "";
    const contrast = parseContrastExplanation(explanation);

    const hasPosition =
      item.boundingRect &&
      Object.values(item.boundingRect).some(
        (value) => typeof value === "number" && Number.isFinite(value),
      );

    async function copyValue(value, key) {
      if (!value) return;

      try {
        await navigator.clipboard.writeText(String(value));
        setCopied(key);
        window.setTimeout(() => setCopied(""), 1500);
      } catch {
        setCopied("");
      }
    }

    return (
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Card header */}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="flex w-full items-start gap-3 px-4 py-4 text-left sm:px-5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Code2 className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="break-words text-sm font-semibold text-slate-900">
                {item.nodeLabel || "Unnamed element"}
              </h4>

              {issueId === "color-contrast" && (
                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
                  Contrast issue
                </span>
              )}

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                Element {index + 1}
              </span>
            </div>

            <p className="mt-1.5 break-all font-mono text-[11px] leading-5 text-slate-500">
              {item.selector || "CSS selector unavailable"}
            </p>
          </div>

          <span className="mt-1 shrink-0 text-slate-400">
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        </button>

        {expanded && (
          <div className="space-y-5 border-t border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            {/* Contrast summary */}
            {contrast && (
              <section>
                <SectionHeading
                  icon={<Palette className="h-3.5 w-3.5" />}
                  title="Contrast analysis"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <ContrastMetric
                    label="Measured ratio"
                    value={
                      contrast.ratio ? `${contrast.ratio}:1` : "Unavailable"
                    }
                    variant="warning"
                  />

                  <ContrastMetric
                    label="Required ratio"
                    value={`${contrast.expected}:1`}
                  />

                  <ContrastMetric
                    label="Foreground"
                    value={contrast.foreground}
                    color={contrast.foreground}
                  />
                </div>

                {contrast.background && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                    <span
                      className="h-9 w-9 shrink-0 rounded-lg border border-slate-200"
                      style={{ backgroundColor: contrast.background }}
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-700">
                        Background color
                      </p>
                      <p className="mt-0.5 font-mono text-xs text-slate-500">
                        {contrast.background}
                      </p>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Element identity */}
            <section>
              <SectionHeading
                icon={<Info className="h-3.5 w-3.5" />}
                title="Element information"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <DetailField label="Node label" value={item.nodeLabel} />

                <DetailField
                  label="Audit element"
                  value={item.selector}
                  copyable
                  onCopy={() => copyValue(item.selector, "selector")}
                  copied={copied === "selector"}
                  mono
                />

                <div className="sm:col-span-2">
                  <ReadableDomPath nodePath={item.nodePath} />

                  {item.nodePath && (
                    <button
                      type="button"
                      onClick={() =>
                        copyValue(
                          Array.isArray(item.nodePath)
                            ? item.nodePath.join(", ")
                            : item.nodePath,
                          "path",
                        )
                      }
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      {copied === "path" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {copied === "path" ? "Copied" : "Copy technical path"}
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Position and dimensions */}
            {hasPosition && (
              <section>
                <SectionHeading
                  icon={<MapPin className="h-3.5 w-3.5" />}
                  title="Element position"
                />

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {[
                    ["Top", item.boundingRect?.top, "px"],
                    ["Left", item.boundingRect?.left, "px"],
                    ["Width", item.boundingRect?.width, "px"],
                    ["Height", item.boundingRect?.height, "px"],
                    ["Right", item.boundingRect?.right, "px"],
                    ["Bottom", item.boundingRect?.bottom, "px"],
                  ]
                    .filter(([, value]) => typeof value === "number")
                    .map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {label}
                        </p>
                        <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-slate-800">
                          {Math.round(value)}
                          <span className="ml-0.5 text-xs font-normal text-slate-400">
                            {label === "Width" || label === "Height"
                              ? "px"
                              : "px"}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>

                <p className="mt-2 text-[11px] text-slate-400">
                  Coordinates are relative to the Lighthouse capture viewport.
                </p>
              </section>
            )}

            {/* HTML source */}
            <section>
              <SectionHeading
                icon={<FileCode2 className="h-3.5 w-3.5" />}
                title="HTML snippet"
              />

              {item.snippet ? (
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                  <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-[10px] font-medium text-slate-400">
                        HTML
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyValue(item.snippet, "snippet")}
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      {copied === "snippet" ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      {copied === "snippet" ? "Copied" : "Copy HTML"}
                    </button>
                  </div>

                  <pre className="overflow-x-auto whitespace-pre-wrap break-all p-4 font-mono text-xs leading-6 text-emerald-200">
                    <code>{item.snippet}</code>
                  </pre>
                </div>
              ) : (
                <EmptyValue text="No HTML snippet was supplied by Lighthouse." />
              )}
            </section>

            {/* Explanation */}
            <section>
              <SectionHeading
                icon={<AlertCircle className="h-3.5 w-3.5" />}
                title="Diagnostic explanation"
              />

              {explanation ? (
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 p-4">
                  <p className="whitespace-pre-wrap break-words text-xs leading-6 text-amber-950">
                    {explanation}
                  </p>
                </div>
              ) : (
                <EmptyValue text="No diagnostic explanation was supplied." />
              )}
            </section>

            {/* Resource data for performance audits */}
            {(item.url ||
              item.wastedMs != null ||
              item.wastedBytes != null ||
              item.totalBytes != null ||
              item.transferSize != null) && (
              <section>
                <SectionHeading
                  icon={<ExternalLink className="h-3.5 w-3.5" />}
                  title="Resource metrics"
                />

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {item.url && (
                    <DetailField
                      label="Resource URL"
                      value={item.url}
                      mono
                      full
                    />
                  )}

                  {item.wastedMs != null && (
                    <DetailField
                      label="Estimated time savings"
                      value={`${item.wastedMs} ms`}
                    />
                  )}

                  {item.wastedBytes != null && (
                    <DetailField
                      label="Potential byte savings"
                      value={formatBytes(item.wastedBytes)}
                    />
                  )}

                  {item.totalBytes != null && (
                    <DetailField
                      label="Total bytes"
                      value={formatBytes(item.totalBytes)}
                    />
                  )}

                  {item.transferSize != null && (
                    <DetailField
                      label="Transfer size"
                      value={formatBytes(item.transferSize)}
                    />
                  )}
                </div>
              </section>
            )}
          </div>
        )}
      </article>
    );
  }

  function SectionHeading({ icon, title }) {
    return (
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        {icon}
        <h5 className="text-[11px] font-bold uppercase tracking-[0.08em]">
          {title}
        </h5>
      </div>
    );
  }

  function DetailField({
    label,
    value,
    mono = false,
    full = false,
    copyable = false,
    onCopy,
    copied = false,
  }) {
    return (
      <div
        className={`min-w-0 rounded-xl border border-slate-200 bg-white p-3 ${
          full ? "sm:col-span-2" : ""
        }`}
      >
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          {copyable && value && (
            <button
              type="button"
              onClick={onCopy}
              className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label={`Copy ${label}`}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>

        {value ? (
          <p
            className={`break-all text-xs leading-5 text-slate-700 ${
              mono ? "font-mono" : "font-medium"
            }`}
          >
            {value}
          </p>
        ) : (
          <p className="text-xs italic text-slate-400">Not available</p>
        )}
      </div>
    );
  }

  function ContrastMetric({ label, value, variant, color }) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        <div className="mt-2 flex items-center gap-2">
          {color && (
            <span
              className="h-4 w-4 shrink-0 rounded border border-slate-200"
              style={{ backgroundColor: color }}
            />
          )}

          <p
            className={`break-all font-mono text-sm font-semibold ${
              variant === "warning" ? "text-amber-700" : "text-slate-800"
            }`}
          >
            {value || "Unavailable"}
          </p>
        </div>
      </div>
    );
  }

  function EmptyValue({ text }) {
    return (
      <p className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
        {text}
      </p>
    );
  }

  function parseContrastExplanation(text = "") {
    const ratioMatch = text.match(/insufficient color contrast of\s*([\d.]+)/i);

    const expectedMatch = text.match(/Expected contrast ratio of\s*([\d.]+)/i);

    const foregroundMatch = text.match(/foreground color:\s*(#[0-9a-f]{3,8})/i);

    const backgroundMatch = text.match(/background color:\s*(#[0-9a-f]{3,8})/i);

    if (!ratioMatch && !foregroundMatch && !backgroundMatch) {
      return null;
    }

    return {
      ratio: ratioMatch?.[1] || null,
      expected: expectedMatch?.[1] || "4.5",
      foreground: foregroundMatch?.[1] || null,
      background: backgroundMatch?.[1] || null,
    };
  }

  function formatBytes(value) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return "Unavailable";
    }

    if (value < 1024) return `${value} B`;

    if (value < 1024 * 1024) {
      return `${(value / 1024).toFixed(1)} KB`;
    }

    return `${(value / (1024 * 1024)).toFixed(2)} MB`;
  }

  function getReadableDomPath(nodePath) {
    if (!nodePath) return null;

    // Lighthouse can provide a comma-separated path or an array.
    const parts = Array.isArray(nodePath)
      ? nodePath
      : String(nodePath).split(",");

    const cleanedParts = parts
      .map((part) => String(part).trim())
      .filter(Boolean);

    if (!cleanedParts.length) return null;

    // Lighthouse paths alternate between child indexes and node names.
    const nodeNames = cleanedParts.filter((part) => !/^\d+$/.test(part));

    if (!nodeNames.length) return null;

    return nodeNames.map((name) => name.toUpperCase()).join(" → ");
  }

  function getDomPathSteps(nodePath) {
    if (!nodePath) return [];

    const parts = Array.isArray(nodePath)
      ? nodePath
      : String(nodePath).split(",");

    return parts.map((part) => String(part).trim()).filter(Boolean);
  }

  function isLikelyFilePath(value) {
    if (typeof value !== "string") return false;

    const path = value.trim();
    if (!path) return false;

    // Exclude DOM selectors, HTML snippets, and URLs.
    if (
      path.startsWith("<") ||
      path.startsWith("#") ||
      path.startsWith(".") ||
      /^https?:\/\//i.test(path)
    ) {
      return false;
    }

    // Recognize common source files and assets.
    return (
      /(?:^|[/\\])[^/\\]+\.(?:html?|css|scss|sass|less|js|jsx|mjs|cjs|ts|tsx|vue|svelte|php|json|svg|png|jpe?g|webp|gif|woff2?|ttf|otf)(?:[?#].*)?$/i.test(
        path,
      ) || /^(?:webpack|vite|turbopack|next-internal):\/\//i.test(path)
    );
  }

  function getAffectedItems(files = []) {
    if (!Array.isArray(files)) return { files: [], elements: [] };

    const uniqueItems = [
      ...new Set(
        files
          .filter((item) => typeof item === "string" && item.trim())
          .map((item) => item.trim()),
      ),
    ];

    return {
      files: uniqueItems.filter(isLikelyFilePath),
      elements: uniqueItems.filter((item) => !isLikelyFilePath(item)),
    };
  }

  function ReadableDomPath({ nodePath }) {
    const readablePath = getReadableDomPath(nodePath);
    const steps = getDomPathSteps(nodePath);

    if (!readablePath) {
      return (
        <p className="text-xs italic text-slate-400">DOM path not available</p>
      );
    }

    return (
      <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Element location in the page
        </p>

        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {readablePath.split(" → ").map((node, index, nodes) => (
            <Fragment key={`${node}-${index}`}>
              <span
                className={`rounded-md border px-2 py-1 font-mono text-[11px] ${
                  index === nodes.length - 1
                    ? "border-blue-200 bg-blue-50 font-semibold text-blue-700"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {node}
              </span>

              {index < nodes.length - 1 && (
                <span className="text-slate-300">›</span>
              )}
            </Fragment>
          ))}
        </div>

        <details className="mt-3 border-t border-slate-100 pt-2">
          <summary className="cursor-pointer text-[11px] font-medium text-slate-500 hover:text-slate-700">
            View technical node path
          </summary>

          <p className="mt-2 break-all font-mono text-[11px] leading-5 text-slate-500">
            {steps.join(", ")}
          </p>
        </details>
      </div>
    );
  }
  function ConsoleErrorsSection({ issue }) {
    const errors = Array.isArray(issue.consoleErrors)
      ? issue.consoleErrors
      : [];

    if (issue.id !== "errors-in-console" || !errors.length) {
      return null;
    }

    return (
      <section className="mt-5">
        <div className="mb-2 flex items-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 text-[#94a3b8]" />
          <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#94a3b8]">
            Browser console errors
          </p>
          <span className="rounded-full bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] text-[#64748b]">
            {errors.length}
          </span>
        </div>

        <div className="overflow-hidden rounded-[4px] border border-[#e2e8f0] bg-[#f8fafc]">
          {errors.map((error, index) => (
            <div
              key={`${error.source}-${error.line}-${index}`}
              className={`space-y-2 px-3 py-3 ${
                index !== errors.length - 1 ? "border-b border-[#e2e8f0]" : ""
              }`}
            >
              <p className="break-words text-xs leading-5 text-slate-700">
                {error.message}
              </p>

              {error.type && (
                <p className="text-[11px] text-slate-500">Type: {error.type}</p>
              )}

              {error.source && (
                <p className="break-all font-mono text-[11px] text-slate-500">
                  Source: {error.source}
                </p>
              )}

              {(error.line != null || error.column != null) && (
                <p className="text-[11px] text-slate-500">
                  {error.line != null && `Line ${error.line}`}
                  {error.line != null && error.column != null && ", "}
                  {error.column != null && `Column ${error.column}`}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f8fafc] pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="flex flex-col gap-[32px] lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-[8px]">
              <span className="h-[6px] w-[6px] rounded-full bg-[#4f6cff]" />

              <p className="text-[11px] font-bold uppercase tracking-[0.02em] text-[#4f6cff]">
                Page Level Analysis
              </p>
            </div>

            <h1 className="mt-3 text-[36px] font-bold leading-[48px] tracking-[-0.035em] text-[#0f172a] sm:text-[40px]">
              Detailed Page Report
            </h1>

            <p className="mt-2.5 text-[13px] leading-[23px] text-[#64748b] sm:text-[15px]">
              Deep analysis of performance, SEO, accessibility and best
              practices for this page.
            </p>
          </div>

          <Link
            href={`/report/${scanId}`}
            className="inline-flex h-10 items-center justify-center gap-[7px] self-start rounded-[5px] border border-[#dbe2ea] bg-white px-4 text-[13px] font-bold text-[#334155] shadow-[0_1px_3px_rgba(15,23,42,0.06)] transition-colors hover:bg-[#f8fafc] lg:self-auto"
          >
            <ArrowLeft className="h-[13px] w-[13px]" />
            Back to Report
          </Link>
        </div>

        <div className="mt-7 overflow-hidden rounded-[6px] border border-[#dbe2ea] bg-white">
          <div className="flex min-h-[52px] items-center justify-between border-b border-[#dbe2ea] bg-[#fafbfc] px-5 sm:px-6">
            <div className="flex items-center gap-[8px]">
              <FileText className="h-[14px] w-[14px] text-[#94a3b8]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                Page Overview
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.65fr_1fr]">
            <div className="min-w-0 border-b border-[#dbe2ea] p-5 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-[8px]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                  Selected Page
                </p>
              </div>

              <h2 className="mt-4 break-all font-mono text-[20px] font-bold leading-7 tracking-[-0.015em] text-[#0f172a] sm:text-[21px]">
                {pageInfo.url}
              </h2>

              <div className="mt-2.5 flex min-w-0 items-center gap-2 rounded-[5px] border border-[#dbe2ea] bg-[#f8fafc] px-3 py-2.5">
                <Globe className="h-[14px] w-[14px] shrink-0 text-[#64748b]" />

                <p className="min-w-0 flex-1 break-all text-[12px] font-medium leading-[18px] text-[#475569]">
                  {pageInfo.fullUrl}
                </p>

                <button
                  type="button"
                  className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-[4px] border border-[#dbe2ea] bg-white px-2.5 text-[10px] font-medium text-[#64748b]"
                >
                  <Copy className="h-[13px] w-[13px]" />
                  Copy
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#dbeafe] bg-[#eff6ff] px-2.5 py-1.5 text-[10px] font-bold text-[#2563eb]">
                  <LayoutDashboard className="h-[13px] w-[13px]" />
                  Service Page
                </span>

                <span className="h-5 w-px bg-[#dbe2ea]" />

                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-1.5 text-[10px] font-bold text-[#16a34a]">
                  <ShieldCheck className="h-[13px] w-[13px]" />
                  HTTPS
                </span>

                <span className="h-5 w-px bg-[#dbe2ea]" />

                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#dbe2ea] bg-[#f8fafc] px-2.5 py-1.5 text-[10px] font-medium text-[#64748b]">
                  <Monitor className="h-[13px] w-[13px]" />
                  Desktop
                </span>

                <span className="h-5 w-px bg-[#dbe2ea]" />

                <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#dbe2ea] bg-[#f8fafc] px-2.5 py-1.5 text-[10px] font-medium text-[#64748b]">
                  <CalendarDays className="h-[13px] w-[13px]" />
                  03 Oct 2026
                </span>
              </div>
            </div>

            <div className="flex items-center p-5 sm:p-6">
              <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-center lg:gap-8">
                <div className="flex shrink-0 justify-center">
                  <div className="relative h-[100px] w-[100px]">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(#22c55e ${
                          Math.min(
                            Math.max(pageInfo.healthScore || 0, 0),
                            100,
                          ) * 3.6
                        }deg, #e5e7eb 0deg)`,
                      }}
                    />

                    <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-[27px] font-bold leading-none text-[#0f172a]">
                        {pageInfo.healthScore}
                      </span>

                      <span className="mt-1 text-[10px] font-medium text-[#94a3b8]">
                        / 100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                    Overall Page Health
                  </p>

                  <p className="mt-4 text-[15px] font-bold text-[#334155]">
                    Page Health
                  </p>

                  <p className="mt-1 text-[12px] leading-[18px] text-[#94a3b8]">
                    Weighted across all four audit categories.
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-[4px] border border-[#bbf7d0] bg-[#f0fdf4] px-2.5 py-1.5 text-[10px] font-bold text-[#16a34a]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]" />
                    Good
                  </div>

                  <div className="mt-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.03em] text-[#cbd5e1]">
                      Score Weights
                    </p>

                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-[4px] w-[80px] overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div className="h-full w-[40%] rounded-full bg-[#4f6cff]" />
                        </div>

                        <span className="text-[10px] text-[#94a3b8]">
                          Performance · 40%
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-[4px] w-[80px] overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div className="h-full w-[20%] rounded-full bg-[#4f6cff]" />
                        </div>

                        <span className="text-[10px] text-[#94a3b8]">
                          SEO · 20%
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-[4px] w-[80px] overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div className="h-full w-[20%] rounded-full bg-[#4f6cff]" />
                        </div>

                        <span className="text-[10px] text-[#94a3b8]">
                          Accessibility · 20%
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-[4px] w-[80px] overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div className="h-full w-[20%] rounded-full bg-[#4f6cff]" />
                        </div>

                        <span className="text-[10px] text-[#94a3b8]">
                          Best Practices · 20%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 grid border-t border-[#dbe2ea] bg-white sm:grid-cols-2 lg:grid-cols-3">
          <div className="min-w-0 border-b border-[#dbe2ea] p-5 sm:border-r lg:border-b-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Clock3 className="h-[13px] w-[13px] text-[#94a3b8]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                  Scan Time
                </p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-1 text-[9px] font-bold text-[#16a34a]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]" />
                Completed
              </span>
            </div>

            <p className="mt-5 font-mono text-[20px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
              {pageInfo.scanDate}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <p className="font-mono text-[15px] font-bold leading-none text-[#334155]">
                {pageInfo.scanTime}
              </p>

              <span className="rounded-[4px] border border-[#dbe2ea] bg-[#f8fafc] px-1.5 py-1 text-[9px] font-medium text-[#94a3b8]">
                UTC+0
              </span>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-[#cbd5e1]">
              <RefreshCw className="h-[13px] w-[13px]" />
              Most recent scan for this page
            </p>
          </div>

          <div className="min-w-0 border-b border-[#dbe2ea] p-5 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Gauge className="h-[13px] w-[13px] text-[#94a3b8]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                  Load Time
                </p>
              </div>

              <span className="inline-flex items-center gap-1 rounded-[4px] border border-[#fed7aa] bg-[#fff7ed] px-2 py-1 text-[9px] font-bold text-[#f97316]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#f97316]" />
                Needs Review
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-1.5">
              <p className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#0f172a]">
                {pageInfo.loadTime}
              </p>

              <span className="text-[13px] text-[#94a3b8]">seconds</span>
            </div>

            <div className="mt-2 h-[5px] overflow-hidden rounded-full bg-[#edf0f3]">
              <div className="h-full w-[52%] rounded-full bg-[#f59e0b]" />
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-[#cbd5e1]">
              <Info className="h-[13px] w-[13px]" />
              Based on Largest Contentful Paint (LCP)
            </p>
          </div>

          <div className="min-w-0 p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-[13px] w-[13px] text-[#94a3b8]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                  Total Issues
                </p>
              </div>

              <span className="rounded-[4px] border border-[#dbe2ea] bg-[#f8fafc] px-2 py-1 text-[9px] font-medium text-[#64748b]">
                This page
              </span>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <p className="text-[22px] font-bold leading-none tracking-[-0.02em] text-[#ef4444]">
                {pageInfo.issues}
              </p>

              <span className="text-[13px] text-[#94a3b8]">
                issues detected
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] font-bold">
              <span className="flex items-center gap-1 text-[#ef4444]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#ef4444]" />
                {issueSeverityCounts.high} high
              </span>

              <span className="text-[#cbd5e1]">|</span>

              <span className="flex items-center gap-1 text-[#f97316]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#f97316]" />
                {issueSeverityCounts.medium} medium
              </span>

              <span className="text-[#cbd5e1]">|</span>

              <span className="flex items-center gap-1 text-[#64748b]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#94a3b8]" />
                {issueSeverityCounts.low} low
              </span>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[10px] text-[#cbd5e1]">
              <ListChecks className="h-[13px] w-[13px]" />
              Across all audit categories
            </p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-[24px] font-bold leading-8 tracking-[-0.025em] text-[#0f172a]">
                Audit Category Scores
              </h3>

              <p className="mt-1 text-[13px] leading-[20px] text-[#94a3b8]">
                Review the individual scores contributing to this page&apos;s
                overall health.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[6px] border border-[#edf1f5] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {categoryScores.map((item, index) => {
                const Icon = item.icon;
                const isGood = item.value >= 80;
                const isAverage = item.value >= 50 && item.value < 80;

                const status = isGood ? "Good" : isAverage ? "Average" : "Poor";

                const statusClasses =
                  status === "Good"
                    ? {
                        text: "text-[#16a34a]",
                        border: "border-[#bbf7d0]",
                        bg: "bg-[#f0fdf4]",
                        dot: "bg-[#16a34a]",
                        progress: "bg-[#22c55e]",
                      }
                    : status === "Average"
                      ? {
                          text: "text-[#d97706]",
                          border: "border-[#fed7aa]",
                          bg: "bg-[#fff7ed]",
                          dot: "bg-[#f59e0b]",
                          progress: "bg-[#f59e0b]",
                        }
                      : {
                          text: "text-[#ef4444]",
                          border: "border-[#fecaca]",
                          bg: "bg-[#fef2f2]",
                          dot: "bg-[#ef4444]",
                          progress: "bg-[#ef4444]",
                        };

                const isBelowAverage = item.value < item.average;

                return (
                  <div
                    key={item.title}
                    className={`min-w-0 ${
                      index !== categoryScores.length - 1
                        ? "border-b border-[#dbe2ea] md:border-r"
                        : ""
                    } ${
                      index === 1
                        ? "xl:border-r"
                        : index === 2
                          ? "md:border-r xl:border-r"
                          : ""
                    }`}
                  >
                    <div className="flex min-h-[48px] items-center justify-between gap-3 border-b border-[#dbe2ea] bg-[#fafbfc] px-5">
                      <div className="flex min-w-0 items-center gap-2">
                        <Icon className="h-[14px] w-[14px] shrink-0 text-[#64748b]" />

                        <p className="truncate text-[10px] font-bold uppercase tracking-[0.01em] text-[#64748b]">
                          {item.title}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-[4px] border border-[#e2e8f0] bg-[#f8fafc] px-2 py-1 text-[9px] font-medium text-[#94a3b8]">
                        {item.weight}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-baseline gap-1.5">
                          <p className="text-[38px] font-bold leading-none tracking-[-0.045em] text-[#0f172a]">
                            {item.value}
                          </p>

                          <span className="text-[13px] text-[#94a3b8]">
                            / 100
                          </span>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center gap-1 rounded-[4px] border px-2.5 py-1.5 text-[9px] font-bold ${statusClasses.border} ${statusClasses.bg} ${statusClasses.text}`}
                        >
                          <span
                            className={`h-[6px] w-[6px] rounded-full ${statusClasses.dot}`}
                          />
                          {status}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="h-[6px] overflow-hidden rounded-full bg-[#edf0f3]">
                          <div
                            className={`h-full rounded-full ${statusClasses.progress}`}
                            style={{
                              width: `${Math.min(Math.max(item.value, 0), 100)}%`,
                            }}
                          />
                        </div>

                        <div className="mt-1 flex justify-between">
                          <span className="text-[9px] text-[#cbd5e1]">0</span>
                          <span className="text-[9px] text-[#cbd5e1]">100</span>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-[#edf1f5] pt-3">
                        <p className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                          {isBelowAverage ? (
                            <ArrowDownRight className="h-[13px] w-[13px] text-[#f59e0b]" />
                          ) : (
                            <ArrowUpRight className="h-[13px] w-[13px] text-[#16a34a]" />
                          )}

                          {isBelowAverage
                            ? `Below site average of ${item.average}`
                            : `Above site average of ${item.average}`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-[6px] w-[6px] rounded-full bg-[#94a3b8]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.02em] text-[#94a3b8]">
                  Core Web Vitals
                </p>
              </div>

              <h3 className="mt-2 text-[24px] font-bold leading-8 tracking-[-0.025em] text-[#0f172a]">
                Performance Metrics
              </h3>

              <p className="mt-1 text-[13px] leading-[20px] text-[#94a3b8]">
                Lighthouse metrics collected during the analysis process.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-[#dbe2ea] bg-[#f8fafc] px-3 py-1.5 text-[10px] font-medium text-[#64748b]">
                <Zap className="h-[13px] w-[13px]" />
                Lighthouse 11
              </span>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-[6px] border border-[#edf1f5] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
              {metrics.map((item, index) => {
                const MetricIcon = item.icon;

                const statusClasses =
                  item.status === "Poor"
                    ? {
                        text: "text-[#ef4444]",
                        border: "border-[#fecaca]",
                        bg: "bg-[#fef2f2]",
                        progress: "bg-[#ef4444]",
                        header: "bg-[#fff7f7]",
                      }
                    : item.status === "Average"
                      ? {
                          text: "text-[#d97706]",
                          border: "border-[#fed7aa]",
                          bg: "bg-[#fff7ed]",
                          progress: "bg-[#f59e0b]",
                          header: "bg-[#fffdf5]",
                        }
                      : {
                          text: "text-[#16a34a]",
                          border: "border-[#bbf7d0]",
                          bg: "bg-[#f0fdf4]",
                          progress: "bg-[#22c55e]",
                          header: "bg-[#fafbfc]",
                        };

                const progressWidths = {
                  FCP: "30%",
                  LCP: "80%",
                  CLS: "25%",
                  TBT: "64%",
                  SI: "74%",
                };

                return (
                  <div
                    key={index}
                    className={`min-w-0 ${
                      index !== metrics.length - 1
                        ? "border-b border-[#dbe2ea] sm:border-r xl:border-b-0"
                        : ""
                    }`}
                  >
                    <div
                      className={`flex min-h-[46px] items-center justify-between gap-3 border-b border-[#dbe2ea] px-5 ${statusClasses.header}`}
                    >
                      <span className="text-[11px] font-bold text-[#475569]">
                        {item.short}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-[4px] border px-2.5 py-1 text-[9px] font-bold ${statusClasses.border} ${statusClasses.bg} ${statusClasses.text}`}
                      >
                        <span
                          className={`h-[6px] w-[6px] rounded-full ${statusClasses.progress}`}
                        />
                        {item.status}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-baseline gap-2">
                        <p
                          className={`font-mono text-[31px] font-bold leading-none tracking-[-0.025em] ${
                            item.status === "Poor"
                              ? "text-[#dc2626]"
                              : item.status === "Average"
                                ? "text-[#b45309]"
                                : "text-[#0f172a]"
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>

                      <p className="mt-1.5 text-[12px] font-medium leading-[18px] text-[#94a3b8]">
                        {item.description}
                      </p>

                      <div className="mt-2.5">
                        <div className="h-[6px] overflow-hidden rounded-full bg-[#edf0f3]">
                          <div
                            className={`h-full rounded-full ${statusClasses.progress}`}
                            style={{
                              width: progressWidths[item.short] || "50%",
                            }}
                          />
                        </div>

                        <div className="mt-1 flex justify-between">
                          <span className="text-[9px] text-[#cbd5e1]">
                            0 {item.short === "TBT" ? "ms" : "s"}
                          </span>

                          <span className="text-[9px] text-[#cbd5e1]">
                            {item.short === "CLS"
                              ? "0.25"
                              : item.short === "TBT"
                                ? "600 ms"
                                : item.short === "SI"
                                  ? "5 s"
                                  : item.short === "LCP"
                                    ? "4 s"
                                    : "3 s"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 border-t border-[#edf1f5] pt-3">
                        <p className="flex items-center gap-1.5 text-[10px] leading-[18px] text-[#94a3b8]">
                          <MetricIcon
                            className={`h-[13px] w-[13px] shrink-0 ${statusClasses.text}`}
                          />
                          {item.note}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2 text-[11px] text-[#64748b]">
                <span className="h-1.5 w-4 rounded-full bg-[#22c55e]" />
                Good
              </span>

              <span className="flex items-center gap-2 text-[11px] text-[#64748b]">
                <span className="h-1.5 w-4 rounded-full bg-[#f59e0b]" />
                Average
              </span>

              <span className="flex items-center gap-2 text-[11px] text-[#64748b]">
                <span className="h-1.5 w-4 rounded-full bg-[#ef4444]" />
                Poor
              </span>
            </div>

            <p className="flex items-center gap-1.5 text-[10px] text-[#cbd5e1]">
              <Info className="h-[13px] w-[13px]" />
              Thresholds follow Lighthouse scoring guidelines. Values are
              illustrative.
            </p>
          </div>
        </div>

        <div className="my-10 space-y-6">
          {issueCategories
            .filter((category) => category.issues?.length > 0)
            .map((category, categoryIndex) => {
              const Icon = category.icon;

              const categoryStyles =
                category.title === "Performance"
                  ? {
                      icon: "border-orange-200 bg-orange-50 text-orange-500",
                      badge: "border-red-100 bg-red-50 text-red-600",
                      accent: "text-orange-500",
                    }
                  : category.title === "SEO"
                    ? {
                        icon: "border-blue-200 bg-blue-50 text-blue-500",
                        badge: "border-red-100 bg-red-50 text-red-600",
                        accent: "text-blue-500",
                      }
                    : category.title === "Accessibility"
                      ? {
                          icon: "border-violet-200 bg-violet-50 text-violet-500",
                          badge:
                            "border-orange-100 bg-orange-50 text-orange-600",
                          accent: "text-violet-500",
                        }
                      : {
                          icon: "border-emerald-200 bg-emerald-50 text-emerald-500",
                          badge:
                            "border-orange-100 bg-orange-50 text-orange-600",
                          accent: "text-emerald-500",
                        };

              return (
                <section
                  key={categoryIndex}
                  className="overflow-hidden rounded-[6px] border border-[#dbe4ef] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.03)]"
                >
                  <div className="flex flex-col gap-3 border-b border-[#dbe4ef] bg-[#f8fafc] px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border ${categoryStyles.icon}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[13px] font-bold leading-4 text-[#1e293b]">
                            {category.title} Issues
                          </h3>

                          <span
                            className={`rounded-[3px] border px-2 py-1 text-[10px] font-bold leading-none ${categoryStyles.badge}`}
                          >
                            {category.issues.length}{" "}
                            {category.issues.length === 1 ? "issue" : "issues"}
                          </span>
                        </div>

                        <p className="mt-1 text-[11px] leading-4 text-[#94a3b8]">
                          {category.title === "Performance"
                            ? "Page speed, resource loading, and rendering optimization."
                            : category.title === "SEO"
                              ? "Search engine visibility, metadata, and page indexability."
                              : category.title === "Accessibility"
                                ? "Inclusive design, screen reader compatibility, and WCAG compliance."
                                : "Security headers, deprecated APIs, and browser compatibility practices."}
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-[3px] border border-[#e2e8f0] bg-white px-2.5 py-1.5 text-[10px] font-bold text-[#94a3b8]">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Recommendations Included
                    </div>
                  </div>

                  <div className="divide-y divide-[#edf1f5]">
                    {category.issues.map((issue, issueIndex) => {
                      const severity =
                        issue.severity === "High"
                          ? {
                              badge:
                                "border-[#FCA5A5] bg-[#FEF2F2] text-[#DC2626]",
                              icon: "text-[#ef4444]",
                            }
                          : issue.severity === "Medium"
                            ? {
                                badge:
                                  "border-[#FED7AA] bg-[#FFF7ED] text-[#B45309]",
                                icon: "text-[#f97316]",
                              }
                            : {
                                badge:
                                  "border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280]",
                                icon: "text-[#64748b]",
                              };

                      const displayValue = issue.displayValue
                        ? issue.displayValue
                            .replace(/\*\*/g, "")
                            .replace(/^Est savings of\s*/i, "")
                            .trim()
                        : "";

                      const issueKey = `${category.title}-${issue.id || issueIndex}`;
                      const isExpanded = !!expandedIssues[issueKey];

                      const toggleIssue = () => {
                        setExpandedIssues((prev) => ({
                          ...prev,
                          [issueKey]: !prev[issueKey],
                        }));
                      };

                      return (
                        <div
                          key={issueKey}
                          className="px-5 py-5 sm:px-6 sm:py-6"
                        >
                          {/* Clickable issue header */}
                          <button
                            type="button"
                            onClick={toggleIssue}
                            aria-expanded={isExpanded}
                            className="flex w-full flex-col gap-3 text-left sm:flex-row sm:items-start sm:justify-between"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start gap-3">
                                <AlertTriangle
                                  className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${severity.icon}`}
                                />

                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-[14px] font-bold leading-5 text-[#1e293b]">
                                      {issue.title}
                                    </h4>

                                    {displayValue && (
                                      <span className="rounded-[3px] border border-[#e2e8f0] bg-[#f8fafc] px-2 py-1 font-mono text-[10px] font-medium leading-none text-[#64748b]">
                                        {displayValue}
                                      </span>
                                    )}
                                  </div>

                                  <p className="mt-1 text-[12px] leading-[18px] text-[#64748b]">
                                    {issue.description}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                              <span
                                className={`inline-flex w-fit items-center rounded-[3px] border px-2.5 py-1.5 text-[10px] font-bold leading-none ${severity.badge}`}
                              >
                                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                                {issue.severity}
                              </span>

                              <ChevronDown
                                className={`h-4 w-4 text-[#94a3b8] transition-transform duration-300 ease-in-out ${
                                  isExpanded ? "rotate-180" : "rotate-0"
                                }`}
                              />
                            </div>
                          </button>

                          {/* Expandable issue details */}
                          <div
                            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                              isExpanded
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="min-h-0 overflow-hidden">
                              <div
                                className={`transition-transform duration-300 ease-in-out ${
                                  isExpanded
                                    ? "translate-y-0"
                                    : "-translate-y-2"
                                }`}
                              >
                                {(() => {
                                  const affectedFiles = Array.isArray(
                                    issue.files,
                                  )
                                    ? issue.files
                                    : [];

                                  const hasFiles = affectedFiles.length > 0;

                                  if (!hasFiles) {
                                    return;
                                  }

                                  return (
                                    <div className="mt-5 space-y-4">
                                      {hasFiles && (
                                        <div>
                                          <div className="mb-2 flex items-center gap-1.5">
                                            <FileCode2 className="h-3.5 w-3.5 text-[#94a3b8]" />
                                            <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#94a3b8]">
                                              Affected files
                                            </p>
                                            <span className="rounded-full bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] text-[#64748b]">
                                              {affectedFiles.length}
                                            </span>
                                          </div>

                                          <div className="overflow-hidden rounded-[4px] border border-[#e2e8f0] bg-[#f8fafc]">
                                            {affectedFiles.map(
                                              (item, index) => (
                                                <div
                                                  key={`${item}-${index}`}
                                                  className={`flex min-w-0 items-center justify-between gap-3 px-3 py-2.5 ${
                                                    index !==
                                                    affectedFiles.length - 1
                                                      ? "border-b border-[#e2e8f0]"
                                                      : ""
                                                  }`}
                                                >
                                                  <div className="flex min-w-0 items-center gap-2.5">
                                                    <FileCode2 className="h-3.5 w-3.5 shrink-0 text-[#94a3b8]" />
                                                    <span className="min-w-0 break-all font-mono text-[11px] text-[#475569] sm:text-[12px]">
                                                      {item}
                                                    </span>
                                                  </div>

                                                  {issue.displayValue &&
                                                    index === 0 && (
                                                      <span className="shrink-0 rounded-[3px] border border-[#e2e8f0] bg-white px-2 py-1 font-mono text-[10px] text-[#94a3b8]">
                                                        {issue.displayValue}
                                                      </span>
                                                    )}
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })()}
                                <ConsoleErrorsSection issue={issue} />
                                {Array.isArray(issue.details) &&
                                  issue.details.length > 0 && (
                                    <IssueElementPreview issue={issue} />
                                  )}

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                  <div className="rounded-[4px] border border-[#fed7aa] bg-[#fffbeb] p-4">
                                    <div className="flex items-start gap-3">
                                      <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f59e0b]" />

                                      <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#a16207]">
                                          Impact
                                        </p>

                                        <p className="mt-2 text-[11px] leading-[18px] text-[#92400e] sm:text-[12px]">
                                          {issue.impact}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="rounded-[4px] border border-[#bbf7d0] bg-[#f0fdf4] p-4">
                                    <div className="flex items-start gap-3">
                                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#16a34a]" />

                                      <div className="min-w-0">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#15803d]">
                                          Recommended Solution
                                        </p>

                                        <p className="mt-2 text-[11px] leading-[18px] text-[#166534] sm:text-[12px]">
                                          {issue.solution}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
        </div>

        <div className="mt-8 border border-[#17213a] bg-[#0b1022] px-5 py-6 text-white shadow-[0_12px_35px_rgba(15,23,42,0.16)] sm:px-8 sm:py-7 lg:px-10 lg:py-8 rounded-[8px]">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4f6df5]" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#5d7cff]">
                  Improve This Page
                </p>
              </div>

              <h3 className="mt-3 text-[23px] font-semibold leading-tight tracking-[-0.02em] text-[#f8fafc] sm:text-[25px]">
                Fix issues and improve page quality
              </h3>

              <p className="mt-2.5 max-w-[600px] text-[12px] leading-5 text-[#94a3b8] sm:text-[13px]">
                Apply the recommendations above to improve loading speed,
                accessibility, SEO visibility and overall user experience.
              </p>

              <div className="mt-5 flex flex-col gap-3 text-[10px] text-[#64748b] sm:flex-row sm:items-center sm:gap-0">
                <div className="flex items-center gap-1.5 sm:pr-5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                  <span>Performance optimizations</span>
                </div>

                <div className="hidden h-4 w-px bg-[#29334d] sm:block" />

                <div className="flex items-center gap-1.5 sm:px-5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                  <span>SEO and accessibility fixes</span>
                </div>

                <div className="hidden h-4 w-px bg-[#29334d] sm:block" />

                <div className="flex items-center gap-1.5 sm:pl-5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#22c55e]" />
                  <span>Best practices compliance</span>
                </div>
              </div>
            </div>

            <Link
              href="/analyze"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[6px] bg-[#526cf5] px-5 text-[12px] font-semibold text-white shadow-[0_6px_18px_rgba(79,109,245,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4662ee] sm:h-12 sm:px-6"
            >
              Start New Analysis
              <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <Link
          href={`/report/${scanId}/page/${pageId}/ai`}
          className="group flex h-[60px] w-[238px] items-center gap-3 rounded-[10px] border border-[#1E3460] bg-[#0B1020] px-3.5 shadow-[0_10px_30px_rgba(15,23,42,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#35538c] hover:bg-[#101a31] sm:w-[240px]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border border-[#1A3A6E] bg-[#0F2347]">
            <Sparkles className="h-4 w-4 text-[#67E8F9]" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#4F6AF5]">
              AI Assistant
            </p>

            <p className="mt-0.5 whitespace-nowrap text-[14px] font-semibold text-white">
              Generate AI Report
            </p>
          </div>

          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[5px] bg-[#0F2347]">
            <ChevronRight className="h-3.5 w-3.5 text-[#67E8F9] transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </div>
    </section>
  );
}
