"use client";

import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Clock3,
  Globe,
  Layers3,
  LineChart,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { Layers } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Search } from "lucide-react";
import { Gauge } from "lucide-react";
import { ScanSearch } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { Accessibility } from "lucide-react";
import { CircleGauge } from "lucide-react";
import { ListChecks } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { GitBranch } from "lucide-react";
import { Download } from "lucide-react";
import { Info } from "lucide-react";
import { FileText } from "lucide-react";
import { ListTree } from "lucide-react";
import { Settings } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { Mail } from "lucide-react";

const brandmetrics = [
  {
    value: "10K",
    suffix: "+",
    label: "Websites Analyzed",
    Icon: Globe,
  },
  {
    value: "1M",
    suffix: "+",
    label: "Pages Scanned",
    Icon: Layers,
  },
  {
    value: "98",
    suffix: "%",
    label: "Performance Accuracy",
    Icon: CircleGauge,
  },
  {
    value: "5K",
    suffix: "+",
    label: "Developers Trust Us",
    Icon: Users,
  },
];

const auditCategories = [
  {
    label: "Performance",
    Icon: Zap,
    color: "text-[#f59e0b]",
    position: "md",
  },
  {
    label: "SEO",
    Icon: Search,
    color: "text-[#356dff]",
    position: "md",
  },
  {
    label: "Accessibility",
    Icon: Accessibility,
    color: "text-[#22c55e]",
    position: "md",
  },
  {
    label: "Core Web Vitals",
    Icon: Gauge,
    color: "text-[#8b5cf6]",
    position: "md",
  },
];

const auditIssues = [
  {
    label: "Page Structure",
    Icon: GitBranch,
    color: "text-[#64748b]",
  },
  {
    label: "Technical Issues",
    Icon: AlertTriangle,
    color: "text-[#ff4d5e]",
  },
];

const auditOutputs = [
  {
    label: "Clear Findings",
    Icon: ListChecks,
  },
  {
    label: "Actionable Recs",
    Icon: Lightbulb,
  },
  {
    label: "AI Report",
    Icon: Sparkles,
  },
];

const capabilities = [
  {
    label: "Website crawling",
    Icon: Globe,
  },
  {
    label: "Lighthouse integration",
    Icon: Gauge,
  },
  {
    label: "AI-assisted reports",
    Icon: Sparkles,
  },
];

const metrics = [
  { label: "LCP", value: "1.8s", status: "Good", color: "#16a34a" },
  { label: "INP", value: "142ms", status: "Review", color: "#f59e0b" },
  { label: "CLS", value: "0.03", status: "Good", color: "#16a34a" },
  { label: "FCP", value: "1.1s", status: "Good", color: "#16a34a" },
];

const pages = [
  { name: "/services", time: "1.4s", score: "97", color: "#16a34a" },
  { name: "/blog", time: "2.1s", score: "74", color: "#f59e0b" },
  { name: "/contact", time: "0.9s", score: "95", color: "#16a34a" },
];

const findings = [
  {
    level: "MED",
    text: "Images missing alt text",
    style: "bg-[#fff7e6] text-[#d97706]",
  },
  {
    level: "LOW",
    text: "Render-blocking resources",
    style: "bg-[#edf4ff] text-[#2865f5]",
  },
];

const detailedcapabilities = [
  {
    number: "01",
    title: "Performance Analysis",
    Icon: Zap,
    iconColor: "text-[#356dff]",
    iconBg: "bg-[#edf4ff]",
    description:
      "Identifies page-speed issues, loading behavior, and Core Web Vitals signals across discovered pages. Evaluates LCP, INP, CLS, and FCP against established thresholds.",
    tags: ["LCP", "INP", "CLS", "Core Web Vitals"],
    tagStyle: "border-[#b8e4ff] bg-[#f0faff] text-[#0284c7]",
  },
  {
    number: "02",
    title: "SEO Analysis",
    Icon: Search,
    iconColor: "text-[#356dff]",
    iconBg: "bg-[#edf4ff]",
    description:
      "Identifies technical search-related signals including meta information completeness, canonical structure, crawlability, Open Graph data, and indexability status across each audited page.",
    tags: ["Metadata", "Canonical", "Open Graph"],
    tagStyle: "border-[#e0d1ff] bg-[#f7f2ff] text-[#7c3aed]",
  },
  {
    number: "03",
    title: "Accessibility",
    Icon: Accessibility,
    iconColor: "text-[#10b981]",
    iconBg: "bg-[#effdf6]",
    description:
      "Surfaces accessibility issues that can affect usability for assistive technology users — covering image alt text, form labeling, color contrast signals, and structural heading hierarchy.",
    tags: ["Alt Text", "Form Labels", "Contrast"],
    tagStyle: "border-[#a7f3d0] bg-[#effdf6] text-[#047857]",
  },
  {
    number: "04",
    title: "Page Crawling",
    Icon: GitBranch,
    iconColor: "text-[#64748b]",
    iconBg: "bg-[#f8fafc]",
    description:
      "Discovers internal URLs from a submitted website and analyzes each page individually. Builds a structured view of page-level quality, issues, and optimization opportunities across the full site.",
    tags: ["URL Discovery", "Page-level Analysis"],
    tagStyle: "border-[#dce3ed] bg-[#f8fafc] text-[#64748b]",
  },
  {
    number: "05",
    title: "AI Recommendations",
    Icon: Sparkles,
    iconColor: "text-[#8b5cf6]",
    iconBg: "bg-[#f5f0ff]",
    description:
      "Transforms raw audit findings into understandable optimization guidance. AI-assisted reports summarize what matters and explain what to do, organized by priority and page.",
    tags: ["AI-Generated", "Prioritized", "Groq AI"],
    tagStyle: "border-[#e0d1ff] bg-[#f7f2ff] text-[#7c3aed]",
  },
];

const recommendations = [
  {
    number: "01",
    title: "Optimize image delivery",
    description:
      'Serve images in modern formats and implement responsive sizing to reduce payload. Consider adding loading="lazy" to below-fold images.',
  },
  {
    number: "02",
    title: "Reduce render-blocking resources",
    description:
      "Defer non-critical third-party scripts using the async or defer attribute. Blocking resources in the document head are delaying the first meaningful paint.",
  },
  {
    number: "03",
    title: "Improve semantic structure",
    description:
      "Ensure heading hierarchy is correctly ordered and that interactive elements carry appropriate ARIA roles and labels for accessibility conformance.",
  },
];

const directions = [
  {
    number: "01",
    eyebrow: "OUR MISSION",
    title: "Mission",
    description:
      "Help developers, businesses, and startups build faster, optimized, and search-friendly websites.",
    status: "Foundation",
    color: "#00bcd4",
    border: "#8debf0",
    Icon: Target,
  },
  {
    number: "02",
    eyebrow: "CONTINUOUS IMPROVEMENT",
    title: "Improvement",
    description:
      "Continuously improve scanning quality, reporting accuracy, and optimization recommendations.",
    status: "In Progress",
    color: "#00bcd4",
    border: "#8debf0",
    Icon: RefreshCw,
  },
  {
    number: "03",
    eyebrow: "FUTURE VISION",
    title: "Future Vision",
    description:
      "Build a modern all-in-one website intelligence platform for developers and growing SaaS companies.",
    status: "Horizon",
    color: "#635bff",
    border: "#c8c9ff",
    Icon: Sparkles,
  },
];

const steps = [
  {
    title: "Website",
    subtitle: "INPUT",
    Icon: Globe,
    color: "#64748b",
    border: "#dbe3ee",
    background: "#f5f7fa",
    line: "#dbe3ee",
  },
  {
    title: "Audit",
    subtitle: "CRAWL",
    Icon: ScanSearch,
    color: "#00b8e0",
    border: "#a8e8ff",
    background: "#f0fbff",
    line: "#00b8e0",
  },
  {
    title: "Analysis",
    subtitle: "MEASURE",
    Icon: ListTree,
    color: "#00c9b0",
    border: "#91f2e3",
    background: "#effefa",
    line: "#00c9b0",
  },
  {
    title: "Insights",
    subtitle: "UNDERSTAND",
    Icon: Settings,
    color: "#785bff",
    border: "#d9d0ff",
    background: "#f7f5ff",
    line: "#785bff",
  },
  {
    title: "Recommendations",
    subtitle: "PRIORITIZE",
    Icon: Lightbulb,
    color: "#5269ff",
    border: "#c8d2ff",
    background: "#f2f5ff",
    line: "#5269ff",
  },
  {
    title: "Improvement",
    subtitle: "OUTCOME",
    Icon: ChartNoAxesCombined,
    color: "#00c4e8",
    border: "#0b1329",
    background: "#0b1329",
    line: "#0b1329",
    featured: true,
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden border-b border-[#e2e6ed] bg-[#f7f8fa]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-y-0 left-[7.6%] hidden w-px bg-[#edf0f4] sm:block" />
          <div className="absolute inset-y-0 right-[7.6%] hidden w-px bg-[#edf0f4] sm:block" />
        </div>

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:grid-cols-[1.02fr_1fr] lg:gap-12 lg:px-[7.65%] lg:pb-16 lg:pt-28 xl:gap-16">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#356dff]" />
              <span className="inline-flex h-5 items-center gap-1.5 rounded border border-[#c4d8ff] bg-[#edf4ff] px-3 text-[9px] font-semibold uppercase tracking-[0.02em] text-[#2865f5]">
                <CircleHelp className="h-3 w-3" />
                About SitePulse
              </span>
            </div>

            <h1 className="mt-6 max-w-[570px] text-[38px] font-bold leading-[1.06] tracking-[-1.5px] text-[#0d1121] sm:text-[48px] sm:leading-[1.06] sm:tracking-[-1.8px] md:text-[54px] lg:text-[54px] xl:text-[58px]">
              Making Website Quality Easier to Understand.
            </h1>

            <p className="mt-2 max-w-[530px] text-[15px] font-normal leading-[1.9] tracking-[0.01em] text-[#50617b] sm:text-[16px] sm:leading-[1.8]">
              SitePulse helps developers, businesses, agencies, and SaaS teams
              discover website performance, SEO, accessibility, and optimization
              issues through clear, actionable analysis.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/analyze"
                className="group inline-flex h-[51px] items-center justify-center gap-2.5 rounded-[10px] bg-[#0d1121] px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#20283b] sm:px-6"
              >
                <ScanSearch className="h-4 w-4" />
                Start Website Analysis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex h-[51px] items-center justify-center gap-2 rounded-[10px] border border-[#d9e0eb] bg-white px-5 text-[14px] font-semibold text-[#35445f] transition-colors hover:bg-[#f1f5f9] sm:px-6"
              >
                Explore Features
                <ChevronRight className="h-4 w-4 text-[#64748b] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px] font-medium text-[#475873] sm:gap-x-6">
              <div className="inline-flex items-center gap-1.5">
                <Gauge className="h-[13px] w-[13px] text-[#356dff]" />
                Performance Analysis
              </div>
              <span className="hidden h-3.5 w-px bg-[#d9e0eb] sm:block" />
              <div className="inline-flex items-center gap-1.5">
                <Search className="h-[13px] w-[13px] text-[#356dff]" />
                SEO &amp; Accessibility
              </div>
              <span className="hidden h-3.5 w-px bg-[#d9e0eb] sm:block" />
              <div className="inline-flex items-center gap-1.5">
                <Sparkles className="h-[13px] w-[13px] text-[#356dff]" />
                AI-Powered Recommendations
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[620px] lg:ml-auto lg:max-w-none">
            <div className="mb-3 hidden items-center justify-center gap-2 sm:flex">
              <span className="h-px w-12 bg-[#e0e5ed]" />
              <span className="text-[9px] font-medium uppercase tracking-wide text-[#9aaac3]">
                Illustrative Product Preview
              </span>
              <span className="h-px w-12 bg-[#e0e5ed]" />
            </div>

            <div className="overflow-hidden rounded-[13px] border border-[#d8e0ec] bg-white shadow-[0_12px_40px_rgba(25,43,76,0.07)]">
              <div className="flex h-[39px] items-center justify-between border-b border-[#e0e5ed] bg-[#f0f2f5] px-3.5 sm:px-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-[9px] w-[9px] rounded-full bg-[#ff9da2]" />
                  <span className="h-[9px] w-[9px] rounded-full bg-[#ffd34f]" />
                  <span className="h-[9px] w-[9px] rounded-full bg-[#5ce0b4]" />
                </div>

                <div className="mx-3 flex h-[26px] min-w-0 max-w-[300px] flex-1 items-center justify-center gap-2 rounded-md border border-[#d8e0ec] bg-white px-2 text-[10px] text-[#64718a] sm:text-[11px]">
                  <LockKeyhole className="h-[10px] w-[10px] shrink-0 text-[#9aabc3]" />
                  <span className="truncate">app.sitepulse.io / audit</span>
                </div>

                <div className="flex items-center gap-2 text-[#9aa8bb]">
                  <RefreshCw className="h-3 w-3" />
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="p-3.5 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase text-[#8da0bc]">
                      Website Audit
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 shrink-0 text-[#475873]" />
                      <h2 className="truncate text-[14px] font-bold tracking-[-0.2px] text-[#111629] sm:text-[15px]">
                        example-company.com
                      </h2>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#b8f5ce] bg-[#f0fff5] px-2.5 py-1 text-[9px] font-semibold text-[#119447]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#20c56b]" />
                    Completed
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-[96px_minmax(0,1fr)] overflow-hidden rounded-lg border border-[#e3eaf4] border-l-[3px] border-l-[#356dff] sm:grid-cols-[120px_minmax(0,1fr)]">
                  <div className="border-r border-[#edf1f7] px-2 py-3 text-center">
                    <p className="text-[9px] font-semibold uppercase text-[#91a2bb]">
                      Score
                    </p>
                    <div
                      className="relative mx-auto mt-2 flex h-[54px] w-[54px] items-center justify-center rounded-full"
                      style={{
                        background:
                          "conic-gradient(#356dff 0deg 316deg, #e2e8f0 316deg 360deg)",
                      }}
                    >
                      <div className="absolute inset-[6px] flex flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-[14px] font-bold leading-4 text-[#101629]">
                          88
                        </span>
                        <span className="text-[8px] text-[#94a3b8]">/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 px-3 py-3 sm:px-4">
                    <p className="mb-1.5 text-[9px] font-semibold uppercase text-[#91a2bb]">
                      Category Breakdown
                    </p>

                    {[
                      {
                        name: "Performance",
                        score: 91,
                        Icon: Zap,
                        color: "#f59e0b",
                      },
                      {
                        name: "SEO",
                        score: 85,
                        Icon: Search,
                        color: "#356dff",
                      },
                      {
                        name: "Accessibility",
                        score: 88,
                        Icon: Accessibility,
                        color: "#22c55e",
                      },
                      {
                        name: "Best Practices",
                        score: 92,
                        Icon: ShieldCheck,
                        color: "#8b5cf6",
                      },
                    ].map(({ name, score, Icon, color }) => (
                      <div
                        key={name}
                        className="flex h-[30px] items-center justify-between gap-2 border-b border-[#dce4ef] last:border-0"
                      >
                        <span className="flex min-w-0 items-center gap-1.5 truncate text-[10px] text-[#40516e] sm:text-[11px]">
                          <Icon
                            className="h-[10px] w-[10px] shrink-0"
                            style={{ color }}
                          />
                          <span className="truncate">{name}</span>
                        </span>
                        <span className="text-[10px] font-bold text-[#172036] sm:text-[11px]">
                          {score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase text-[#91a2bb]">
                    <Activity className="h-[11px] w-[11px]" />
                    Core Web Vitals
                  </p>
                  <span className="text-[9px] text-[#a3b2c8]">
                    Sample values
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {[
                    {
                      label: "LCP",
                      value: "1.8s",
                      status: "Good",
                      color: "#16a34a",
                    },
                    {
                      label: "INP",
                      value: "142ms",
                      status: "Needs Review",
                      color: "#f59e0b",
                    },
                    {
                      label: "CLS",
                      value: "0.03",
                      status: "Good",
                      color: "#16a34a",
                    },
                    {
                      label: "FCP",
                      value: "1.1s",
                      status: "Good",
                      color: "#16a34a",
                    },
                  ].map((metric) => (
                    <div
                      key={metric.label}
                      className="min-w-0 rounded-md border border-[#d8e1ee] bg-white px-2.5 py-2.5 sm:px-3"
                    >
                      <p className="flex items-center gap-1 text-[9px] font-semibold text-[#8da0bc]">
                        <span
                          className="h-[5px] w-[5px] rounded-full"
                          style={{ backgroundColor: metric.color }}
                        />
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[15px] font-bold leading-5 tracking-[-0.5px] text-[#101629] sm:text-[16px]">
                        {metric.value}
                      </p>
                      <p
                        className="mt-0.5 truncate text-[9px] font-medium"
                        style={{ color: metric.color }}
                      >
                        {metric.status}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[9px] font-semibold uppercase text-[#91a2bb]">
                    <AlertTriangle className="h-[11px] w-[11px] text-[#f59e0b]" />
                    Findings
                  </p>
                  <span className="rounded-full border border-[#fbd875] bg-[#fffaf0] px-2 py-0.5 text-[9px] font-medium text-[#d97706]">
                    9 issues
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  {[
                    {
                      level: "MED",
                      text: "Images missing descriptive alt text",
                      color: "bg-[#fff7e6] text-[#d97706]",
                    },
                    {
                      level: "MED",
                      text: "Meta description absent on 3 pages",
                      color: "bg-[#fff7e6] text-[#d97706]",
                    },
                    {
                      level: "LOW",
                      text: "Render-blocking resources detected",
                      color: "bg-[#edf4ff] text-[#2865f5]",
                    },
                  ].map((issue) => (
                    <div
                      key={issue.text}
                      className="flex min-h-[35px] items-center gap-2 rounded-md border border-[#e8edf5] px-2.5 py-1.5 sm:gap-3 sm:px-3"
                    >
                      <span
                        className={`shrink-0 rounded px-2 py-0.5 text-[8px] font-semibold ${issue.color}`}
                      >
                        {issue.level}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[10px] text-[#52637e] sm:text-[11px]">
                        {issue.text}
                      </span>
                      <ChevronRight className="h-3 w-3 shrink-0 text-[#b5c2d3]" />
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-lg border border-[#e8edf5] bg-[#f8fafc] px-3 py-2.5">
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-[#3d4d68] sm:text-[11px]">
                    <Layers className="h-3 w-3 text-[#356dff]" />
                    24 pages discovered
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-[9px] text-[#64748b] sm:text-[10px]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                      18 complete
                    </span>
                    <span className="h-3 w-px bg-[#dbe3ed]" />
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                      6 with issues
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 sm:px-1">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#dce3ed] bg-white px-3 py-2 shadow-[0_2px_6px_rgba(15,23,42,0.05)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                <span className="text-[10px] font-semibold text-[#3d4d68]">
                  Performance
                </span>
                <span className="text-[12px] font-bold text-[#111629]">91</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-[#dce3ed] bg-white px-3 py-2 shadow-[0_2px_6px_rgba(15,23,42,0.05)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#356dff]" />
                <span className="text-[10px] font-semibold text-[#3d4d68]">
                  SEO
                </span>
                <span className="text-[10px] font-semibold text-[#356dff]">
                  Excellent
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg border border-[#dce3ed] bg-white px-3 py-2 shadow-[0_2px_6px_rgba(15,23,42,0.05)]">
                <Layers className="h-3 w-3 text-[#64748b]" />
                <span className="text-[10px] font-semibold text-[#3d4d68]">
                  24 pages crawled
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-y border-[#e2e7ef] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-[154px_repeat(4,minmax(0,1fr))] lg:px-[7.65%]">
          <div className="flex min-h-[76px] items-center border-b border-[#e2e7ef] sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:border-r lg:pr-6">
            <div className="flex items-center gap-3">
              <span className="h-8 w-[3px] rounded-full bg-[#356dff]" />
              <div>
                <p className="text-[11px] font-bold leading-4 tracking-[-0.2px] text-[#111629]">
                  SITEPULSE
                </p>
                <p className="mt-0.5 text-[10px] font-medium uppercase leading-3 text-[#91a2bb]">
                  In Numbers
                </p>
              </div>
            </div>
          </div>

          {brandmetrics.map(({ value, suffix, label, Icon }, index) => (
            <div
              key={label}
              className={`flex min-h-[76px] flex-col items-center justify-center px-3 py-3 text-center ${
                index < metrics.length - 1
                  ? "border-b border-[#e2e7ef] sm:border-b-0 sm:border-r"
                  : ""
              } ${index === 0 ? "sm:border-r-0 lg:border-r" : ""}`}
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-[36px] font-bold leading-[38px] tracking-[-1.8px] text-[#101425] sm:text-[38px]">
                  {value}
                </span>
                <span className="text-[21px] font-bold leading-none text-[#356dff]">
                  {suffix}
                </span>
              </div>

              <div className="mt-1.5 flex items-center justify-center gap-1.5">
                <Icon
                  className="h-[11px] w-[11px] shrink-0 text-[#9aabc2]"
                  strokeWidth={1.6}
                />
                <span className="text-[12px] font-medium leading-4 tracking-[0.05px] text-[#53617a]">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7f8fa] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1220px] px-5 sm:px-8 lg:px-0">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[520px_minmax(0,1fr)] lg:gap-[72px]">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-4 bg-[#356dff]" />
                <span className="text-[10px] font-semibold uppercase leading-4 tracking-[0.02em] text-[#94a3b8]">
                  Why We Built It
                </span>
              </div>

              <h2 className="mt-5 max-w-[530px] text-[32px] font-bold leading-[1.12] tracking-[-0.8px] text-[#101425] sm:text-[36px] sm:leading-[1.13]">
                Website performance should be understandable, not overwhelming.
              </h2>

              <p className="mt-5 max-w-[510px] text-[14px] font-normal leading-[1.95] tracking-[0.01em] text-[#50617b] sm:text-[15px]">
                Modern websites have become increasingly complex. Developers and
                teams often have to interpret performance metrics, SEO warnings,
                accessibility issues, and technical recommendations across
                multiple disconnected tools and dashboards.
              </p>

              <p className="mt-4 max-w-[510px] text-[14px] font-normal leading-[1.95] tracking-[0.01em] text-[#50617b] sm:text-[15px]">
                SitePulse brings those signals together into a single, clearer
                analysis workflow — one that surfaces what actually matters and
                communicates findings in terms teams can act on immediately.
              </p>

              <div className="mt-7 border-t border-[#dce2eb] pt-12">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-[3px] rounded-full bg-[#356dff]" />
                  <span className="text-[10px] font-semibold uppercase leading-4 text-[#94a3b8]">
                    The Result
                  </span>
                </div>

                <h3 className="mt-3 max-w-[460px] text-[25px] font-bold leading-[1.3] tracking-[-0.4px] text-[#101425] sm:text-[27px]">
                  From raw website signals to practical decisions.
                </h3>

                <p className="mt-2 max-w-[465px] text-[14px] leading-[1.85] text-[#64718a] sm:text-[15px]">
                  SitePulse is designed to help teams spend less time
                  interpreting audit data and more time improving the websites
                  they build.
                </p>
              </div>
            </div>

            <div className="min-w-0">
              <div className="mb-5 flex items-center justify-center gap-2">
                <span className="h-px w-12 bg-[#e0e6ef]" />
                <span className="text-[9px] font-medium uppercase tracking-wide text-[#a0aec2]">
                  Analysis Workflow
                </span>
                <span className="h-px w-12 bg-[#e0e6ef]" />
              </div>

              <div className="rounded-[13px] border border-[#d9e1ed] bg-white px-4 py-6 shadow-[0_3px_16px_rgba(15,23,42,0.025)] sm:px-7 sm:py-8">
                <div className="mb-1 text-center text-[9px] font-semibold uppercase text-[#94a3b8]">
                  Traditional Approach
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                  {auditCategories.map(({ label, Icon, color }) => (
                    <div
                      key={label}
                      className="flex min-h-[36px] items-center justify-center gap-1.5 rounded-[7px] border border-[#d9e1ed] bg-[#f8fafc] px-2 py-2"
                    >
                      <Icon className={`h-[11px] w-[11px] shrink-0 ${color}`} />
                      <span className="whitespace-nowrap text-[10px] font-medium text-[#34445f] sm:text-[11px]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative hidden h-[30px] sm:block">
                  <div className="absolute left-[12.5%] top-0 h-6 w-px bg-[#dbe3ef]" />
                  <div className="absolute left-[37.5%] top-0 h-6 w-px bg-[#dbe3ef]" />
                  <div className="absolute left-[62.5%] top-0 h-6 w-px bg-[#dbe3ef]" />
                  <div className="absolute left-[87.5%] top-0 h-6 w-px bg-[#dbe3ef]" />
                </div>

                <div className="relative mt-3 grid grid-cols-1 gap-2 sm:mt-0 sm:grid-cols-4 sm:gap-2.5">
                  {auditIssues.map(({ label, Icon, color }, index) => (
                    <div
                      key={label}
                      className={`flex min-h-[32px] items-center justify-center gap-1.5 rounded-[7px] border border-[#d9e1ed] bg-[#f8fafc] px-2 ${
                        index === 0
                          ? "sm:col-start-2 sm:col-span-1"
                          : "sm:col-start-3 sm:col-span-1"
                      }`}
                    >
                      <Icon className={`h-[11px] w-[11px] shrink-0 ${color}`} />
                      <span className="whitespace-nowrap text-[10px] font-medium text-[#34445f] sm:text-[11px]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="relative mt-4 h-4 border-b border-[#d9e1ed] sm:mt-0">
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-[#d9e1ed]" />
                  <span className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#d9e1ed]" />
                </div>

                <div className="mt-6 flex min-h-[56px] flex-wrap items-center justify-center gap-2 rounded-[10px] bg-[#0b1022] px-3 py-4 text-white sm:gap-3">
                  <Activity className="h-[15px] w-[15px] shrink-0 text-[#356dff]" />
                  <span className="text-center text-[11px] font-bold tracking-[-0.1px] sm:text-[12px]">
                    SITEPULSE ANALYSIS ENGINE
                  </span>
                  <span className="rounded bg-[#172548] px-2.5 py-1 text-[8px] font-semibold tracking-wide text-[#4d8aff]">
                    AI + LIGHTHOUSE
                  </span>
                </div>

                <div className="relative mx-auto h-[72px] w-full">
                  <div className="absolute left-1/2 top-3 h-[54px] w-px -translate-x-1/2 bg-[#356dff]" />
                  <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#356dff]" />
                  <div className="absolute bottom-0 left-[16.67%] h-5 w-px bg-[#356dff]" />
                  <div className="absolute bottom-0 left-1/2 h-5 w-px bg-[#356dff]" />
                  <div className="absolute bottom-0 left-[83.33%] h-5 w-px bg-[#356dff]" />
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-0">
                  {auditOutputs.map(({ label, Icon }) => (
                    <div
                      key={label}
                      className="flex min-h-[45px] items-center justify-center gap-2 rounded-[8px] border border-[#bfd5ff] bg-[#edf4ff] px-2.5 py-3 text-[#2455dc] sm:rounded-none sm:first:rounded-l-[8px] sm:last:rounded-r-[8px]"
                    >
                      <Icon className="h-[12px] w-[12px] shrink-0" />
                      <span className="text-[11px] font-semibold">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#edf1f7] pt-5 text-center">
                  <p className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-[#34445f] sm:text-[12px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#356dff]" />
                    One workflow. Every signal. Clear output.
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="rounded-full border border-[#a7f3c1] bg-[#f0fff5] px-2.5 py-0.5 text-[9px] font-semibold text-[#159447]">
                      Page-level detail
                    </span>
                    <span className="rounded-full border border-[#bfd5ff] bg-[#edf4ff] px-2.5 py-0.5 text-[9px] font-semibold text-[#2865f5]">
                      Priority scoring
                    </span>
                    <span className="rounded-full border border-[#ddd0ff] bg-[#f6f1ff] px-2.5 py-0.5 text-[9px] font-semibold text-[#7c3aed]">
                      AI interpretation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#0b0f1e] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-[72px]">
        <div className="mx-auto max-w-[1220px] border-y border-[#202b40] py-12 sm:py-14 lg:py-[72px]">
          <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[minmax(0,1fr)_340px] md:gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#356dff]" />
                <span className="text-[10px] font-semibold uppercase leading-4 tracking-[0.02em] text-[#415777]">
                  The SitePulse Approach
                </span>
              </div>

              <h2 className="mt-4 max-w-[660px] text-[27px] font-bold leading-[1.25] tracking-[-0.55px] text-[#f5f7fc] sm:text-[30px] sm:leading-[1.3] lg:text-[32px]">
                From raw website signals to practical decisions.
              </h2>

              <p className="mt-4 max-w-[610px] text-[14px] font-normal leading-[1.9] tracking-[0.01em] text-[#606a7e] sm:text-[15px]">
                SitePulse is designed to help teams spend less time interpreting
                audit data and more time improving the websites they build.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2">
              {capabilities.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex min-h-[52px] items-center justify-between gap-4 rounded-[8px] border border-[#202b40] bg-[#0f1524] px-4 transition-colors duration-200 hover:border-[#30405b]"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      className="h-[12px] w-[12px] shrink-0 text-[#425875]"
                      strokeWidth={1.5}
                    />
                    <span className="truncate text-[12px] font-medium tracking-[0.01em] text-[#9aacc5] sm:text-[13px]">
                      {label}
                    </span>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-[#16c76b]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16c76b]" />
                    Active
                  </span>
                </div>
              ))}

              <Link
                href="/analyze"
                className="group mt-1 inline-flex h-[44px] w-fit items-center justify-center gap-2 rounded-[8px] border border-[#202b40] px-4 text-[12px] font-medium text-[#9aacc5] transition-colors duration-200 hover:border-[#356dff] hover:bg-[#111a2c] hover:text-white"
              >
                See how it works
                <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-[#f7f8fa] py-14 sm:py-16 lg:py-[82px]">
        <div className="mx-auto max-w-[1220px] px-5 sm:px-8 lg:px-0">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-[42px]">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-px w-3.5 bg-[#356dff]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.02em] text-[#91a2bb]">
                  What SitePulse Does
                </span>
              </div>

              <h2 className="mt-4 max-w-[480px] text-[32px] font-bold leading-[1.3] tracking-[-0.8px] text-[#101425] sm:text-[36px] sm:leading-[1.17]">
                Everything teams need to understand website quality.
              </h2>

              <div className="mt-12">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <span className="h-px w-9 bg-[#e1e6ee]" />
                  <span className="text-[8px] font-medium uppercase tracking-wide text-[#9aabc2]">
                    Illustrative Audit Summary
                  </span>
                  <span className="h-px w-9 bg-[#e1e6ee]" />
                </div>

                <div className="overflow-hidden rounded-[10px] border border-[#d9e1ed] bg-white shadow-[0_3px_14px_rgba(15,23,42,0.025)]">
                  <div className="flex h-[32px] items-center justify-between gap-2 border-b border-[#e0e5ed] bg-[#f0f2f5] px-3">
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="h-[7px] w-[7px] rounded-full bg-[#ff9da2]" />
                      <span className="h-[7px] w-[7px] rounded-full bg-[#ffd34f]" />
                      <span className="h-[7px] w-[7px] rounded-full bg-[#5ce0b4]" />
                    </div>

                    <div className="flex h-[21px] min-w-0 max-w-[210px] flex-1 items-center justify-center gap-1.5 rounded border border-[#d8e0ec] bg-white px-2 text-[8px] text-[#64718a]">
                      <LockKeyhole className="h-2.5 w-2.5 shrink-0 text-[#9aabc3]" />
                      <span className="truncate">
                        app.sitepulse.io / report
                      </span>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 text-[#91a2bb]">
                      <RefreshCw className="h-2.5 w-2.5" />
                      <MoreHorizontal className="h-3 w-3" />
                    </div>
                  </div>

                  <div className="p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[8px] font-semibold uppercase text-[#91a2bb]">
                          Website Audit
                        </p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <Globe className="h-[11px] w-[11px] shrink-0 text-[#475873]" />
                          <span className="truncate text-[12px] font-bold text-[#111629]">
                            example-site.com
                          </span>
                        </div>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#b8f5ce] bg-[#f0fff5] px-2 py-0.5 text-[8px] font-semibold text-[#119447]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#20c56b]" />
                        COMPLETE
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-[78px_minmax(0,1fr)] overflow-hidden rounded-sm border border-[#e5eaf2] border-l-[2px] border-l-[#356dff] sm:grid-cols-[90px_minmax(0,1fr)]">
                      <div className="border-r border-[#e5eaf2] px-1.5 py-2 text-center">
                        <p className="text-[7px] font-semibold uppercase text-[#91a2bb]">
                          Score
                        </p>
                        <div
                          className="relative mx-auto mt-2 flex h-[39px] w-[39px] items-center justify-center rounded-full"
                          style={{
                            background:
                              "conic-gradient(#356dff 0deg 316deg, #e2e8f0 316deg 360deg)",
                          }}
                        >
                          <div className="absolute inset-[4px] flex flex-col items-center justify-center rounded-full bg-white">
                            <span className="text-[11px] font-bold leading-3 text-[#101629]">
                              88
                            </span>
                            <span className="text-[6px] text-[#94a3b8]">
                              /100
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="min-w-0 px-2 py-2">
                        <p className="mb-1 text-[7px] font-semibold uppercase text-[#91a2bb]">
                          Categories
                        </p>

                        {[
                          {
                            name: "Performance",
                            score: "91",
                            Icon: Zap,
                            color: "text-[#f59e0b]",
                          },
                          {
                            name: "SEO",
                            score: "85",
                            Icon: Search,
                            color: "text-[#356dff]",
                          },
                          {
                            name: "Accessibility",
                            score: "88",
                            Icon: Accessibility,
                            color: "text-[#22c55e]",
                          },
                          {
                            name: "Best Practices",
                            score: "92",
                            Icon: ShieldCheck,
                            color: "text-[#8b5cf6]",
                          },
                        ].map(({ name, score, Icon, color }) => (
                          <div
                            key={name}
                            className="flex h-[20px] items-center justify-between gap-1 border-b border-[#e5eaf2] last:border-0"
                          >
                            <span className="flex min-w-0 items-center gap-1 text-[8px] text-[#52637e]">
                              <Icon className={`h-2 w-2 shrink-0 ${color}`} />
                              <span className="truncate">{name}</span>
                            </span>
                            <span className="text-[8px] font-bold text-[#172036]">
                              {score}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="flex items-center gap-1 text-[8px] font-semibold uppercase text-[#91a2bb]">
                        <Activity className="h-2.5 w-2.5" />
                        Core Web Vitals
                      </p>
                      <span className="truncate text-[8px] text-[#a3b2c8]">
                        sample values
                      </span>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                      {metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="min-w-0 rounded-md border border-[#d8e1ee] px-2 py-2"
                        >
                          <p className="flex items-center gap-1 text-[7px] font-semibold text-[#8da0bc]">
                            <span
                              className="h-1 w-1 rounded-full"
                              style={{ backgroundColor: metric.color }}
                            />
                            {metric.label}
                          </p>
                          <p className="mt-0.5 text-[12px] font-bold leading-4 text-[#101629]">
                            {metric.value}
                          </p>
                          <p
                            className="text-[8px] font-medium"
                            style={{ color: metric.color }}
                          >
                            {metric.status}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="flex items-center gap-1 text-[8px] font-semibold uppercase text-[#91a2bb]">
                        <Layers className="h-2.5 w-2.5" />
                        Discovered Pages
                      </p>
                      <span className="rounded-full border border-[#bfd5ff] bg-[#edf4ff] px-2 py-0.5 text-[7px] font-semibold text-[#2865f5]">
                        24 pages
                      </span>
                    </div>

                    <div className="mt-1.5 space-y-1">
                      {pages.map((page) => (
                        <div
                          key={page.name}
                          className="flex h-[27px] items-center gap-2 rounded border border-[#e8edf5] px-2"
                        >
                          <span
                            className="h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: page.color }}
                          />
                          <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-[#344054]">
                            {page.name}
                          </span>
                          <span className="text-[8px] text-[#9aabc2]">
                            {page.time}
                          </span>
                          <span
                            className="rounded px-1 text-[8px] font-semibold"
                            style={{
                              color: page.color,
                              backgroundColor:
                                page.color === "#16a34a"
                                  ? "#f0fff5"
                                  : "#fff7e6",
                            }}
                          >
                            {page.score}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="flex items-center gap-1 text-[8px] font-semibold uppercase text-[#91a2bb]">
                        <AlertTriangle className="h-2.5 w-2.5 text-[#f59e0b]" />
                        Priority Findings
                      </p>
                      <span className="rounded-full border border-[#fbd875] bg-[#fffaf0] px-2 py-0.5 text-[7px] font-semibold text-[#d97706]">
                        9 issues
                      </span>
                    </div>

                    <div className="mt-1.5 space-y-1">
                      {findings.map((finding) => (
                        <div
                          key={finding.text}
                          className="flex min-h-[27px] items-center gap-2 rounded border border-[#e8edf5] px-2 py-1"
                        >
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[7px] font-semibold ${finding.style}`}
                          >
                            {finding.level}
                          </span>
                          <span className="min-w-0 truncate text-[8px] text-[#52637e]">
                            {finding.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:pt-[80px]">
              <p className="max-w-[410px] text-[13px] font-normal leading-[1.85] text-[#50617b] sm:text-[14px]">
                SitePulse brings performance, SEO, accessibility, technical
                analysis, and actionable recommendations into one focused
                workflow.
              </p>

              <div className="mt-1">
                {detailedcapabilities.map((capability) => {
                  const Icon = capability.Icon;

                  return (
                    <div
                      key={capability.number}
                      className="border-b border-[#dce2eb] py-5 last:border-b-0 sm:py-[18px]"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-[18px] min-w-[27px] items-center justify-center rounded bg-[#edf0f4] px-1.5 text-[9px] font-semibold text-[#64718a]">
                          {capability.number}
                        </span>

                        <span
                          className={`inline-flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] ${capability.iconBg}`}
                        >
                          <Icon
                            className={`h-[12px] w-[12px] ${capability.iconColor}`}
                            strokeWidth={1.7}
                          />
                        </span>

                        <h3 className="min-w-0 flex-1 text-[13px] font-bold tracking-[-0.15px] text-[#101425] sm:text-[14px]">
                          {capability.title}
                        </h3>

                        <ChevronRight className="h-3 w-3 shrink-0 text-[#cbd5e1]" />
                      </div>

                      <p className="mt-3 text-[12px] font-normal leading-[1.8] text-[#64718a] sm:text-[12.5px]">
                        {capability.description}
                      </p>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {capability.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-2 py-0.5 text-[8px] font-semibold leading-[1.2] ${capability.tagStyle}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-12 sm:py-16 lg:py-[62px]">
        <div className="mx-auto max-w-[1220px] px-5 sm:px-8 lg:px-0">
          <div className="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[620px]">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-3.5 bg-[#356dff]" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.02em] text-[#91a2bb]">
                  AI Report Preview
                </span>
              </div>

              <h1 className="mt-3 max-w-[590px] text-[29px] font-bold leading-[1.18] tracking-[-0.65px] text-[#101425] sm:text-[36px] sm:leading-[1.15] sm:tracking-[-0.9px] lg:text-[32px]">
                From audit data to actionable recommendations.
              </h1>

              <p className="mt-3 max-w-[590px] text-[13px] leading-[1.8] text-[#50617b] sm:text-[14px]">
                SitePulse generates structured AI reports from audit findings —
                organized by priority and written for humans rather than
                machines.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-[7px] border border-[#b9e6ff] bg-[#f0f9ff] px-3 py-2 text-[10px] font-medium text-[#0284c7] sm:text-[11px]">
              <Info className="h-3 w-3 shrink-0" />
              <span>Illustrative report structure — not real audit output</span>
            </div>
          </div>

          <div className="mt-7 overflow-hidden rounded-[9px] border border-[#d9e1ed] border-t-2 border-t-[#4263ff] bg-white shadow-[0_4px_18px_rgba(15,23,42,0.035)] sm:mt-8">
            <div className="flex min-h-[69px] flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-[#e8edf4] px-4 py-4 sm:px-6 lg:px-[34px]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] font-semibold text-[#64718a] sm:gap-x-5">
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-[10px] w-[10px] text-[#9aabc2]" />
                  AI PAGE REPORT
                </span>

                <span className="hidden h-3 w-px bg-[#dce3ed] sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-[10px] w-[10px] text-[#9aabc2]" />
                  example-site.com/services
                </span>

                <span className="hidden h-3 w-px bg-[#dce3ed] sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-[10px] w-[10px] text-[#9aabc2]" />
                  AI-Generated
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b8f5ce] bg-[#f0fff5] px-2.5 py-1 text-[8px] font-semibold text-[#119447]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#20c56b]" />
                REPORT READY
              </span>
            </div>

            <div className="px-4 py-5 sm:px-6 sm:py-7 lg:px-[34px] lg:py-[22px]">
              <div className="border-b border-[#edf1f7] pb-6">
                <div className="flex items-center gap-2">
                  <span className="h-[14px] w-[3px] rounded-full bg-[#356dff]" />
                  <span className="text-[9px] font-semibold uppercase text-[#356dff]">
                    Generated Report
                  </span>
                </div>

                <h2 className="mt-2 text-[22px] font-bold leading-[1.25] tracking-[-0.35px] text-[#101425] sm:text-[25px]">
                  Performance &amp; Optimization Report
                </h2>

                <p className="mt-2 max-w-[700px] text-[12px] leading-[1.8] text-[#64718a] sm:text-[13px]">
                  This report summarizes key audit findings for the analyzed
                  page and provides prioritized recommendations organized by
                  category and potential impact.
                </p>
              </div>

              <div className="mt-6">
                <div className="flex min-h-[36px] items-center justify-between gap-3 border-b border-[#e8edf4] pb-3">
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#101425] sm:text-[16px]">
                    <span className="h-4 w-[3px] rounded-full bg-[#101425]" />
                    Performance Analysis
                  </h3>

                  <span className="shrink-0 rounded-[4px] border border-[#a7dcff] bg-[#f0f9ff] px-2 py-0.5 text-[8px] font-bold uppercase text-[#0284c7]">
                    Performance
                  </span>
                </div>

                <p className="mt-4 max-w-[730px] text-[12px] leading-[1.9] text-[#50617b] sm:text-[13px]">
                  Your page demonstrates strong visual performance fundamentals,
                  but several opportunities remain to reduce load time and
                  improve interaction responsiveness. The Interaction to Next
                  Paint score of 142ms falls within the needs-improvement range
                  and should be prioritized before the next major release.
                </p>
              </div>

              <div className="mt-4">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-[9px] font-semibold uppercase text-[#91a2bb]">
                    Recommendations
                  </span>
                  <div className="h-px flex-1 bg-[#edf1f7]" />
                </div>

                <div className="space-y-2">
                  {recommendations.map((recommendation) => (
                    <div
                      key={recommendation.number}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-0.5 inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px] bg-[#356dff] text-[10px] font-bold text-white">
                        {recommendation.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-[12px] font-bold leading-[1.5] text-[#101425] sm:text-[13px]">
                          {recommendation.title}
                        </h4>

                        <p className="mt-0.5 max-w-[700px] text-[11px] leading-[1.8] text-[#64718a] sm:text-[12px]">
                          {recommendation.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[7px] border-l-[3px] border-[#356dff] bg-[#eff6ff]">
                <div className="flex items-center gap-2 px-3 pt-3">
                  <Info className="h-[11px] w-[11px] text-[#356dff]" />
                  <span className="text-[9px] font-semibold uppercase text-[#356dff]">
                    Implementation Note
                  </span>
                </div>

                <p className="px-3 pb-3 pt-2 text-[11px] leading-[1.8] text-[#40516e] sm:text-[12px]">
                  Results are generated from audit signals collected at the time
                  of the scan. Review findings in the context of your production
                  environment before making changes.
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {["AUDIT", "ANALYSIS", "INSIGHTS", "ACTION"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[4px] bg-[#edf0f4] px-2.5 py-1 text-[8px] font-bold text-[#64718a]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex h-[32px] w-fit items-center justify-center gap-2 rounded-[6px] border border-[#d9e1ed] bg-[#f8fafc] px-3 text-[10px] font-semibold text-[#40516e] transition-colors hover:bg-[#edf4ff]"
                >
                  <Download className="h-[11px] w-[11px]" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden border-b border-[#e0e5ec] bg-[#f6f7f9]">
        <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-[7.65%] lg:pb-[72px] lg:pt-[88px]">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] md:gap-12 lg:gap-20">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-4 bg-[#00bcd4]" />
                <span className="text-[10px] font-semibold uppercase leading-4 tracking-[0.02em] text-[#00bcd4]">
                  Our Direction
                </span>
              </div>

              <h2 className="mt-5 max-w-[650px] text-[34px] font-bold leading-[1.14] tracking-[-0.8px] text-[#101425] sm:text-[42px] sm:leading-[1.15] sm:tracking-[-1px] lg:text-[46px]">
                Built around better decisions,
                <br className="hidden sm:block" /> not just better scores.
              </h2>
            </div>

            <div className="min-w-0 md:pt-8 lg:pt-10">
              <div className="border-t border-[#d9e0e9] pt-4">
                <p className="max-w-[445px] text-[14px] font-normal leading-[1.85] tracking-[0.01em] text-[#50617b] sm:text-[15px]">
                  SitePulse is continuously evolving toward a more useful
                  website intelligence workflow for developers, agencies,
                  startups, and growing digital teams.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 sm:mt-16 lg:mt-[72px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.01em] text-[#91a2bb]">
                Mission → Improvement → Vision
              </span>

              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[3px] border border-[#b9e7ff] bg-[#f0f9ff] px-2.5 py-1 text-[10px] font-semibold text-[#0284c7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00bcd4]" />
                Conceptual roadmap
              </span>
            </div>

            <div className="relative mt-12 hidden h-[14px] sm:block lg:mt-[63px]">
              <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#dfe5ed]" />
              <div className="absolute left-0 top-1/2 h-[2px] w-[33.33%] -translate-y-1/2 bg-[#00bcd4]" />
              <div className="absolute left-[33.33%] top-1/2 h-[2px] w-[33.33%] -translate-y-1/2 bg-[#00bcd4]" />
              <div className="absolute left-[66.66%] top-1/2 h-[2px] w-0 -translate-y-1/2 bg-[#635bff]" />

              <span className="absolute left-[25.8%] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border-[2px] border-[#00bcd4] bg-[#f6f7f9]" />
              <span className="absolute left-[49.7%] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border-[2px] border-[#00bcd4] bg-[#f6f7f9]" />
              <span className="absolute left-[73.1%] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full border-[2px] border-[#635bff] bg-[#f6f7f9]" />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-[40px] lg:grid-cols-3 lg:gap-10">
              {directions.map(
                (
                  {
                    number,
                    eyebrow,
                    title,
                    description,
                    status,
                    color,
                    border,
                    Icon,
                  },
                  index,
                ) => (
                  <article key={number} className="relative min-w-0">
                    {index < 2 && (
                      <ChevronRight className="absolute right-0 top-0 hidden h-3 w-3 text-[#d7deea] lg:block" />
                    )}

                    <div className="flex min-h-[22px] items-center justify-between gap-3">
                      <span
                        className="inline-flex h-[22px] min-w-[37px] items-center justify-center rounded-[3px] border px-2 text-[11px] font-medium"
                        style={{
                          borderColor: border,
                          color,
                          backgroundColor: index === 2 ? "#f2f1ff" : "#f0ffff",
                        }}
                      >
                        {number}
                      </span>

                      <Icon
                        className="mr-1 h-[16px] w-[16px]"
                        strokeWidth={1.8}
                        style={{ color }}
                      />
                    </div>

                    <p className="mt-4 text-[9px] font-semibold uppercase leading-4 text-[#94a3b8]">
                      {eyebrow}
                    </p>

                    <h3 className="mt-3 text-[20px] font-bold leading-[1.3] tracking-[-0.3px] text-[#101425] sm:text-[21px]">
                      {title}
                    </h3>

                    <p className="mt-4 max-w-[365px] text-[13px] font-normal leading-[1.75] tracking-[0.005em] text-[#50617b] sm:text-[14px]">
                      {description}
                    </p>

                    <div className="mt-5 flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color }}
                      >
                        {status}
                      </span>
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden bg-[#f7f8fa] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-[78px]">
        <div className="mx-auto max-w-[1220px]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5">
              <span className="h-px w-4 bg-[#00bfdc]" />
              <span className="text-[10px] font-semibold uppercase leading-4 tracking-[0.02em] text-[#94a3b8]">
                The SitePulse Cycle
              </span>
            </div>

            <h2 className="mt-3 text-[27px] font-bold leading-[1.25] tracking-[-0.65px] text-[#101425] sm:text-[34px] sm:leading-[1.3] md:text-[36px]">
              From website to better web experiences.
            </h2>

            <p className="mx-auto mt-2 max-w-[750px] text-[13px] font-normal leading-6 tracking-[0.01em] text-[#94a3b8] sm:text-[15px]">
              A conceptual view of how SitePulse connects website analysis to
              continuous improvement.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 lg:mt-[52px]">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-[repeat(11,minmax(0,1fr))] lg:items-start lg:gap-x-0 lg:gap-y-0">
              {steps.map(
                (
                  {
                    title,
                    subtitle,
                    Icon,
                    color,
                    border,
                    background,
                    line,
                    featured,
                  },
                  index,
                ) => (
                  <div
                    key={title}
                    className={`relative flex min-w-0 flex-col items-center text-center ${
                      index === 5 ? "col-span-2 sm:col-span-1" : ""
                    } ${index === 0 ? "lg:col-start-1 lg:col-span-1" : ""} ${
                      index === 1 ? "lg:col-start-3 lg:col-span-1" : ""
                    } ${index === 2 ? "lg:col-start-5 lg:col-span-1" : ""} ${
                      index === 3 ? "lg:col-start-7 lg:col-span-1" : ""
                    } ${index === 4 ? "lg:col-start-9 lg:col-span-1" : ""} ${
                      index === 5 ? "lg:col-start-11 lg:col-span-1" : ""
                    }`}
                  >
                    <div
                      className={`relative flex h-[48px] w-[48px] items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] ${
                        featured
                          ? "h-[60px] w-[60px] border-[#0b1329] bg-[#0b1329] shadow-[0_5px_16px_rgba(15,23,42,0.16)]"
                          : ""
                      }`}
                      style={{
                        borderColor: border,
                        backgroundColor: featured ? "#0b1329" : "#ffffff",
                      }}
                    >
                      <span
                        className={`flex items-center justify-center rounded-full ${
                          featured ? "h-[42px] w-[42px]" : "h-[34px] w-[34px]"
                        }`}
                        style={{
                          backgroundColor: featured ? "#142341" : background,
                        }}
                      >
                        <Icon
                          className={
                            featured ? "h-[17px] w-[17px]" : "h-[15px] w-[15px]"
                          }
                          strokeWidth={1.8}
                          style={{ color }}
                        />
                      </span>
                    </div>

                    <h3
                      className={`mt-2 text-[12px] font-semibold leading-[18px] tracking-[-0.1px] ${
                        featured ? "text-[#101425]" : "text-[#394458]"
                      }`}
                    >
                      {title}
                    </h3>

                    <p
                      className={`mt-1 text-[9px] font-semibold leading-4 ${
                        featured ? "text-[#00bfe8]" : "text-[#9aa5b6]"
                      }`}
                    >
                      {subtitle}
                    </p>

                    {index < steps.length - 1 && (
                      <div
                        className="absolute left-[calc(100%+4px)] top-[24px] hidden w-[calc(100%-8px)] items-center lg:flex"
                        style={{ width: "calc(100% + 1px)" }}
                      >
                        <span
                          className="h-px flex-1"
                          style={{ backgroundColor: steps[index + 1].line }}
                        />
                        <ArrowRight
                          className="h-[12px] w-[12px] shrink-0"
                          strokeWidth={1.5}
                          style={{ color: steps[index + 1].line }}
                        />
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            <div className="mx-auto mt-7 flex max-w-[566px] flex-col items-center justify-center gap-2 rounded-[6px] border border-[#17213b] bg-[#0b1022] px-4 py-3 text-center sm:mt-2 sm:min-h-[36px] sm:flex-row sm:gap-2.5 sm:px-6 sm:py-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#00bfdc]" />

              <span className="text-[11px] font-bold leading-4 tracking-[-0.1px] text-white">
                BETTER WEB EXPERIENCES
              </span>

              <span className="hidden h-4 w-px bg-[#29334a] sm:block" />

              <span className="text-[11px] font-normal leading-4 text-[#485166]">
                Conceptual goal — not a specific implemented feature
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full overflow-hidden  px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="relative mx-auto w-full max-w-[1220px] overflow-hidden rounded-[15px] border border-[#dce4f0] border-t-[3px] border-t-[#00c4df] bg-white shadow-[0_0_22px_rgba(95,145,255,0.2)] sm:rounded-[17px]">
          <div className="grid min-h-[360px] grid-cols-1 items-center gap-9 px-6 py-10 sm:px-10 sm:py-12 md:min-h-[365px] md:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.85fr)] md:gap-10 md:px-12 lg:min-h-[362px] lg:gap-16 lg:px-[71px] lg:py-[60px]">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-px w-[14px] bg-[#00c4df]" />
                <span className="text-[9px] font-semibold uppercase leading-4 tracking-[0.01em] text-[#00b9d4]">
                  Ready to get started?
                </span>
              </div>

              <h2 className="mt-6 max-w-[590px] text-[32px] font-bold leading-[1.12] tracking-[-0.8px] text-[#0d1121] sm:text-[38px] sm:leading-[1.15] sm:tracking-[-1px] lg:text-[40px]">
                Ready to understand your website better?
              </h2>

              <p className="mt-4 max-w-[530px] text-[14px] font-normal leading-[1.75] tracking-[0.01em] text-[#586780] sm:text-[15px] sm:leading-[1.65]">
                Run a SitePulse analysis to discover performance, SEO,
                accessibility, and optimization opportunities across your
                website.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-[9px] font-medium uppercase tracking-[0.025em] text-[#9aabc2] sm:gap-x-5">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#60d5e7]" />
                  Website Analysis
                </span>

                <span className="hidden h-3 w-px bg-[#dce4ef] sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#60d5e7]" />
                  Performance
                </span>

                <span className="hidden h-3 w-px bg-[#dce4ef] sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#60d5e7]" />
                  SEO
                </span>

                <span className="hidden h-3 w-px bg-[#dce4ef] sm:block" />

                <span className="inline-flex items-center gap-1.5">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#60d5e7]" />
                  Accessibility
                </span>
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 md:pt-1">
              <Link
                href="/analyze"
                className="group inline-flex min-h-[53px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#0b0f1e] px-5 py-4 text-center text-[14px] font-semibold text-white shadow-[0_3px_8px_rgba(15,23,42,0.12)] transition-colors duration-200 hover:bg-[#182238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c4df] focus-visible:ring-offset-2"
              >
                <ScanSearch
                  className="h-[15px] w-[15px] shrink-0"
                  strokeWidth={1.8}
                />
                <span>Start Website Analysis</span>
                <ArrowRight className="h-[15px] w-[15px] shrink-0 text-[#a5adbd] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[53px] w-full items-center justify-center gap-2.5 rounded-[12px] border border-[#d8e0ec] bg-white px-5 py-4 text-center text-[14px] font-semibold text-[#35445f] transition-colors duration-200 hover:border-[#b8c8dd] hover:bg-[#f8fafc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c4df] focus-visible:ring-offset-2"
              >
                <Mail
                  className="h-[14px] w-[14px] shrink-0 text-[#586780]"
                  strokeWidth={1.7}
                />
                Contact Us
              </Link>

              <div className="mt-1 border-t border-[#edf1f7] pt-4">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] font-normal leading-4 text-[#9aabc2]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#16b45a]" />
                    No sign-up required
                  </span>

                  <span className="hidden h-3 w-px bg-[#dce4ef] sm:block" />

                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#16b45a]" />
                    Public websites only
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[39px] border-t border-[#e5eaf2] bg-white">
            <div className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-[#dfe6f0]" />

            <div className="absolute inset-x-[6%] top-0 grid h-full grid-cols-7">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="relative flex justify-center">
                  <span className="absolute top-0 h-full w-px bg-[#e0e6ef]" />
                  <span
                    className={`absolute top-1/2 z-10 h-[6px] w-[6px] -translate-y-1/2 rounded-full ${
                      index === 0 || index === 2 || index === 5
                        ? "bg-[#80d9e8]"
                        : "bg-[#cbd5e1]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
