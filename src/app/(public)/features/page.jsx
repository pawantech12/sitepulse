"use client";

import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BarChart3,
  Blocks,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  Eye,
  Gauge,
  Globe,
  Layers3,
  LineChart,
  LockKeyhole,
  Radar,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Search } from "lucide-react";
import { Accessibility } from "lucide-react";
import { Info } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Performance", score: 94, Icon: Zap, color: "#f59e0b" },
  { name: "SEO", score: 91, Icon: Search, color: "#356dff" },
  { name: "Accessibility", score: 96, Icon: Accessibility, color: "#16b85a" },
  { name: "Best Practices", score: 89, Icon: ShieldCheck, color: "#8b5cf6" },
];

const metrics = [
  { label: "LCP", value: "1.4s", status: "Good", color: "#16a34a" },
  { label: "INP", value: "110ms", status: "Review", color: "#f59e0b" },
  { label: "CLS", value: "0.04", status: "Good", color: "#16a34a" },
];

const issues = [
  {
    level: "MED",
    text: "Images missing alt text",
    status: "Needs Attention",
    color: "#f59e0b",
    badge: "bg-[#fff7e6] text-[#d97706]",
  },
  {
    level: "HIGH",
    text: "Render-blocking resources",
    status: "3 Issues",
    color: "#ef4444",
    badge: "bg-[#fff0f0] text-[#ef4444]",
  },
  {
    level: "LOW",
    text: "Meta description missing on 2 pages",
    status: "Healthy",
    color: "#16a34a",
    badge: "bg-[#edf4ff] text-[#356dff]",
  },
];

export default function FeaturesPage() {
  const [activeCapability, setActiveCapability] = useState(null);

  const capabilities = [
    {
      id: "01",
      title: "Performance Intelligence",
      tags: [
        {
          label: "Lighthouse",
          style: "border-amber-200 bg-amber-50 text-amber-700",
        },
        {
          label: "Core Web Vitals",
          style: "border-sky-200 bg-sky-50 text-sky-600",
        },
      ],
      description:
        "Analyze Lighthouse metrics, Core Web Vitals, rendering behavior, and loading performance across every discovered page.",
      icon: Zap,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-50",
      detail:
        "Evaluate loading speed, rendering performance, and Core Web Vitals to identify opportunities for a faster website.",
    },
    {
      id: "02",
      title: "SEO Auditing",
      tags: [
        {
          label: "Metadata",
          style: "border-violet-200 bg-violet-50 text-violet-600",
        },
        {
          label: "Crawlability",
          style: "border-violet-200 bg-violet-50 text-violet-600",
        },
      ],
      description:
        "Detect metadata issues, crawlability problems, broken links, indexing weaknesses, and on-page SEO gaps across your entire website.",
      icon: Search,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-50",
      detail:
        "Find technical SEO issues, broken links, missing metadata, and indexing problems that may affect search visibility.",
    },
    {
      id: "03",
      title: "Accessibility Analysis",
      tags: [
        {
          label: "WCAG",
          style: "border-emerald-200 bg-emerald-50 text-emerald-700",
        },
        {
          label: "Screen Readers",
          style: "border-emerald-200 bg-emerald-50 text-emerald-700",
        },
      ],
      description:
        "Identify accessibility issues involving contrast, semantics, labels, keyboard usability, and screen-reader support across each analyzed page.",
      icon: Accessibility,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      detail:
        "Discover accessibility barriers and improve keyboard navigation, semantic structure, labels, and readable color contrast.",
    },
    {
      id: "04",
      title: "Website Crawling",
      tags: [
        {
          label: "Internal Links",
          style: "border-sky-200 bg-sky-50 text-sky-600",
        },
        {
          label: "Page Discovery",
          style: "border-sky-200 bg-sky-50 text-sky-600",
        },
      ],
      description:
        "Automatically discover and analyze internal pages to understand website-wide technical quality, structure, and optimization opportunities.",
      icon: Globe,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-50",
      detail:
        "Map your website's internal structure, discover linked pages, and identify areas that need technical or structural improvements.",
    },
  ];
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#f6f7f9]">
        <div className="mx-auto grid min-h-[650px] max-w-[1440px] grid-cols-1 items-center gap-12 px-5 py-14 sm:px-8 sm:py-16 md:gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-12 lg:px-[7.65%] lg:py-16 xl:gap-16">
          <div className="min-w-0 lg:pb-2">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-5 bg-[#356dff]" />
              <span className="inline-flex h-5 items-center gap-1.5 rounded border border-[#c7d5ff] bg-[#edf2ff] px-3 text-[9px] font-semibold uppercase tracking-[0.01em] text-[#4565ff]">
                <span className="h-[5px] w-[5px] rounded-full bg-[#536dff]" />
                Website Intelligence Platform
              </span>
            </div>

            <h1 className="mt-6 max-w-[570px] text-[39px] font-bold leading-[1.1] tracking-[-1.35px] text-[#0d1121] sm:text-[48px] sm:leading-[1.08] sm:tracking-[-1.6px] md:text-[50px] lg:text-[48px] xl:text-[50px]">
              Everything You Need to{" "}
              <span className="text-[#3c5ee8]">Understand Your Website</span>
            </h1>

            <p className="mt-6 max-w-[500px] text-[14px] font-normal leading-[1.9] tracking-[0.01em] text-[#50617b] sm:text-[15px] sm:leading-[1.8]">
              SitePulse combines performance analysis, SEO auditing,
              accessibility checks, website crawling, and AI-powered
              recommendations into one developer-focused platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/analyze"
                className="group inline-flex min-h-[51px] items-center justify-center gap-3 rounded-[9px] bg-[#0b0f1e] px-5 text-[13px] font-semibold text-white shadow-[0_3px_8px_rgba(15,23,42,0.12)] transition-colors hover:bg-[#20283b] sm:px-6"
              >
                Start Free Analysis
                <ArrowRight className="h-[15px] w-[15px] transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex min-h-[51px] items-center justify-center gap-2 rounded-[9px] border border-[#d8e0ec] bg-white px-5 text-[13px] font-semibold text-[#35445f] transition-colors hover:bg-[#f0f4f9] sm:px-6"
              >
                Explore How It Works
                <ChevronRight className="h-[14px] w-[14px] text-[#8b9bb2] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3.5 gap-y-2.5 text-[11px] font-medium text-[#91a2bb] sm:gap-x-4">
              {["Performance", "SEO", "Accessibility", "Technical Quality"].map(
                (item, index) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#a3b5ff]" />
                    {item}
                    {index < 3 && (
                      <span className="ml-1.5 hidden h-3 w-px bg-[#dce4ef] sm:inline-block" />
                    )}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mx-auto w-full min-w-0 max-w-[660px] lg:ml-auto lg:max-w-none">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-[#dce3ed]" />
              <span className="inline-flex h-[19px] items-center gap-1.5 rounded border border-[#bfe0ff] bg-[#f0f9ff] px-2.5 text-[9px] font-semibold uppercase text-[#1685d4]">
                <span className="h-[5px] w-[5px] rounded-full bg-[#00bcd4]" />
                Live Audit Overview
              </span>
              <span className="h-px w-8 bg-[#dce3ed]" />
            </div>

            <div className="overflow-hidden rounded-[12px] border border-[#d8e0ec] bg-white shadow-[0_10px_35px_rgba(25,43,76,0.08)]">
              <div className="flex h-[37px] items-center justify-between gap-3 border-b border-[#dce3ed] bg-[#f0f2f5] px-3 sm:px-4">
                <div className="flex shrink-0 items-center gap-1.5">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#ff9da2]" />
                  <span className="h-[8px] w-[8px] rounded-full bg-[#ffd34f]" />
                  <span className="h-[8px] w-[8px] rounded-full bg-[#5ce0b4]" />
                </div>

                <div className="flex h-[24px] min-w-0 max-w-[280px] flex-1 items-center justify-center gap-1.5 rounded border border-[#d8e0ec] bg-white px-2 text-[9px] text-[#64718a] sm:text-[10px]">
                  <LockKeyhole className="h-[10px] w-[10px] shrink-0 text-[#9aabc3]" />
                  <span className="truncate">app.sitepulse.io / audit</span>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-[#91a2bb]">
                  <RefreshCw className="h-[10px] w-[10px]" />
                  <MoreHorizontal className="h-[13px] w-[13px]" />
                </div>
              </div>

              <div className="p-3.5 sm:p-[17px]">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[8px] font-semibold uppercase leading-3 text-[#91a2bb]">
                      Website Audit
                    </p>
                    <div className="mt-1 flex min-w-0 items-center gap-1.5">
                      <Globe className="h-[12px] w-[12px] shrink-0 text-[#35445f]" />
                      <h2 className="truncate font-mono text-[12px] font-bold tracking-[-0.2px] text-[#101629] sm:text-[13px]">
                        https://example.com
                      </h2>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#b8f5ce] bg-[#f0fff5] px-2.5 py-1 text-[8px] font-semibold text-[#119447]">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#20c56b]" />
                    COMPLETED
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-[90px_minmax(0,1fr)] overflow-hidden rounded-[8px] border border-[#e3eaf4] border-l-[2px] border-l-[#356dff] sm:grid-cols-[112px_minmax(0,1fr)]">
                  <div className="border-r border-[#edf1f7] px-2 py-3 text-center">
                    <p className="text-[8px] font-semibold uppercase text-[#91a2bb]">
                      Score
                    </p>

                    <div
                      className="relative mx-auto mt-2 flex h-[62px] w-[62px] items-center justify-center rounded-full"
                      style={{
                        background:
                          "conic-gradient(#536dff 0deg 331deg, #e5e7eb 331deg 360deg)",
                      }}
                    >
                      <div className="absolute inset-[6px] flex flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-[15px] font-bold leading-4 text-[#101629]">
                          92
                        </span>
                        <span className="text-[8px] leading-3 text-[#9aabc2]">
                          /100
                        </span>
                      </div>
                    </div>

                    <span className="mt-2 inline-flex rounded-full bg-[#f0fff5] px-2 py-0.5 text-[8px] font-semibold text-[#16a34a]">
                      Healthy
                    </span>
                  </div>

                  <div className="min-w-0 px-2.5 py-3 sm:px-3.5">
                    <p className="mb-1.5 text-[8px] font-semibold uppercase text-[#91a2bb]">
                      Categories
                    </p>

                    {categories.map(({ name, score, Icon, color }) => (
                      <div
                        key={name}
                        className="border-b border-[#e0e6ef] last:border-0"
                      >
                        <div className="flex h-[25px] items-center justify-between gap-2">
                          <span className="flex min-w-0 items-center gap-1.5 truncate text-[10px] text-[#40516e]">
                            <Icon
                              className="h-[10px] w-[10px] shrink-0"
                              style={{ color }}
                            />
                            <span className="truncate">{name}</span>
                          </span>
                          <span className="text-[10px] font-bold text-[#172036]">
                            {score}
                          </span>
                        </div>
                        <div className="h-[3px] overflow-hidden rounded-full bg-[#e2e8f0]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${score}%`,
                              backgroundColor: color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[8px] font-semibold uppercase text-[#91a2bb]">
                    <Gauge className="h-[10px] w-[10px]" />
                    Core Web Vitals
                  </p>
                  <span className="text-[8px] text-[#b0bdcf]">
                    Illustrative values
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-1.5 min-[420px]:grid-cols-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="min-w-0 rounded-[7px] border border-[#d8e1ee] px-2.5 py-2 sm:px-3"
                    >
                      <p className="flex items-center gap-1 text-[8px] font-semibold text-[#8da0bc]">
                        <span
                          className="h-[4px] w-[4px] rounded-full"
                          style={{ backgroundColor: metric.color }}
                        />
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[14px] font-bold leading-4 tracking-[-0.3px] text-[#101629]">
                        {metric.value}
                      </p>
                      <p
                        className="mt-1 text-[8px] font-medium"
                        style={{ color: metric.color }}
                      >
                        {metric.status}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[8px] font-semibold uppercase text-[#91a2bb]">
                    <Activity className="h-[10px] w-[10px]" />
                    Performance Trend
                  </p>
                  <span className="inline-flex items-center gap-1 rounded bg-[#edf2ff] px-2 py-1 text-[9px] font-semibold text-[#536dff]">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#536dff]" />
                    +6 pts
                  </span>
                </div>

                <div className="mt-1 flex h-[25px] items-center pl-1 sm:pl-2">
                  <svg
                    viewBox="0 0 300 30"
                    className="h-[28px] w-full max-w-[300px]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-label="Performance trend rising"
                  >
                    <path
                      d="M3 23 L36 17 L70 20 L103 11 L137 14 L170 6 L204 3 L238 1 L270 -2 L297 -5"
                      stroke="#536DFF"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="297" cy="-5" r="2.5" fill="#536DFF" />
                  </svg>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-[8px] font-semibold uppercase text-[#91a2bb]">
                    <AlertTriangle className="h-[10px] w-[10px] text-[#f59e0b]" />
                    Detected Issues
                  </p>
                  <span className="rounded-full border border-[#fbd875] bg-[#fffaf0] px-2 py-0.5 text-[8px] font-semibold text-[#d97706]">
                    3 issues
                  </span>
                </div>

                <div className="mt-2 space-y-1">
                  {issues.map((issue) => (
                    <div
                      key={issue.text}
                      className="flex min-h-[30px] items-center gap-2 rounded-[6px] border border-[#e8edf5] px-2 py-1 sm:gap-2.5 sm:px-2.5"
                    >
                      <span
                        className={`shrink-0 rounded px-1.5 py-0.5 text-[8px] font-semibold ${issue.badge}`}
                      >
                        {issue.level}
                      </span>

                      <span className="min-w-0 flex-1 truncate text-[9px] text-[#52637e] sm:text-[10px]">
                        {issue.text}
                      </span>

                      <span
                        className="shrink-0 text-right text-[8px] font-medium sm:text-[9px]"
                        style={{ color: issue.color }}
                      >
                        {issue.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto w-full max-w-[1220px]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center md:gap-10">
            <div className="md:col-span-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px w-[18px] bg-[#9AAEFF]" />
                <span className="text-[10px] font-semibold uppercase leading-4 tracking-[-0.1px] text-[#8FA1BC]">
                  Core Capabilities
                </span>
              </div>

              <h2 className="max-w-[650px] text-[30px] font-semibold leading-[1.2] tracking-[-0.8px] text-[#101426] sm:text-[36px] sm:leading-[1.25] lg:text-[40px] lg:tracking-[-1px]">
                One Platform. Every Critical
                <br className="hidden lg:block" /> Website Signal.
              </h2>
            </div>

            <div className="md:col-span-5 md:pt-5">
              <p className="max-w-[480px] text-[14px] font-normal leading-[1.9] tracking-[0.05px] text-[#53627D] sm:text-[15px]">
                SitePulse brings the most important technical website signals
                together so teams can identify problems, understand their
                impact, and prioritize what to fix.
              </p>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-[66px]">
            <div className="grid grid-cols-1 border-b border-[#DCE4F0] pb-3 sm:grid-cols-[1.12fr_1fr]">
              <div className="text-[9px] font-semibold uppercase leading-4 text-[#8FA1BC]">
                Capability
              </div>
              <div className="mt-2 text-[9px] font-semibold uppercase leading-4 text-[#8FA1BC] sm:mt-0 sm:pl-8">
                Description
              </div>
            </div>

            <div>
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                const isActive = activeCapability === capability.id;

                return (
                  <div
                    key={capability.id}
                    className="grid grid-cols-1 border-b border-[#DCE4F0] sm:grid-cols-[1.12fr_1fr]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveCapability(isActive ? null : capability.id)
                      }
                      aria-expanded={isActive}
                      className="flex min-w-0 items-center py-6 text-left transition-colors hover:bg-[#FAFBFF] sm:min-h-[123px] sm:py-6 sm:pr-5 lg:py-7"
                    >
                      <div className="flex w-full min-w-0 items-center">
                        <span className="flex h-[22px] w-[34px] shrink-0 items-center justify-center rounded-[4px] border border-[#D8E0EC] bg-[#F0F3F7] text-[11px] font-semibold leading-none text-[#69758A]">
                          {capability.id}
                        </span>

                        <span
                          className={`ml-3.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] ${capability.iconBg}`}
                        >
                          <Icon
                            size={17}
                            strokeWidth={1.8}
                            className={capability.iconColor}
                          />
                        </span>

                        <span className="mx-5 hidden h-9 w-px shrink-0 bg-[#DCE4F0] sm:block" />

                        <span className="ml-4 min-w-0 flex-1 sm:ml-0">
                          <span className="block text-[15px] font-semibold leading-[1.4] tracking-[-0.2px] text-[#111629] sm:text-[16px]">
                            {capability.title}
                          </span>

                          <span className="mt-1 flex flex-wrap gap-1.5">
                            {capability.tags.map((tag) => (
                              <span
                                key={tag.label}
                                className={`inline-flex min-h-[18px] items-center rounded-full border px-[8px] py-[1px] text-[10px] font-semibold leading-[14px] ${tag.style}`}
                              >
                                {tag.label}
                              </span>
                            ))}
                          </span>
                        </span>

                        <ArrowRight
                          size={15}
                          className={`ml-2 shrink-0 text-[#5067FF] transition-transform sm:hidden ${
                            isActive ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </button>

                    <div className="flex flex-col justify-center gap-4 border-t border-[#E7ECF4] py-5 sm:min-h-[123px] sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:border-l sm:border-t-0 sm:py-5 sm:pl-8 sm:pr-4 lg:pl-8 lg:pr-5">
                      <div className="min-w-0 flex-1">
                        <p className="max-w-[370px] text-[13px] font-normal leading-[1.75] tracking-[0.02px] text-[#596780] sm:text-[13px]">
                          {capability.description}
                        </p>

                        {isActive && (
                          <p className="mt-3 max-w-[370px] text-[12px] leading-[1.7] text-[#8A97AD]">
                            {capability.detail}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveCapability(isActive ? null : capability.id)
                        }
                        aria-expanded={isActive}
                        className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-[#4E63FF] transition-colors hover:text-[#3349E8] sm:inline-flex"
                      >
                        {isActive ? "Close" : "Explore"}
                        <ArrowRight
                          size={14}
                          strokeWidth={1.8}
                          className={`transition-transform ${
                            isActive ? "-rotate-45" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-2 text-[11px] font-normal leading-[1.7] text-[#A3B1C8] sm:items-center sm:text-[12px]">
                <Info
                  size={12}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 sm:mt-0"
                />
                <span>
                  5 total platform capabilities · All analysis categories
                  available in every audit
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveCapability(activeCapability === "all" ? null : "all")
                }
                aria-expanded={activeCapability === "all"}
                className="inline-flex w-fit shrink-0 items-center gap-2 text-[12px] font-semibold text-[#5067FF] transition-colors hover:text-[#3349E8]"
              >
                {activeCapability === "all"
                  ? "Hide Capabilities"
                  : "View All Capabilities"}
                <ArrowRight
                  size={14}
                  strokeWidth={1.8}
                  className={`transition-transform ${
                    activeCapability === "all" ? "-rotate-45" : ""
                  }`}
                />
              </button>
            </div>

            {activeCapability === "all" && (
              <div className="mt-5 rounded-lg border border-[#DCE4F0] bg-[#FAFBFF] px-5 py-4">
                <p className="text-[13px] leading-6 text-[#596780]">
                  SitePulse combines performance intelligence, SEO auditing,
                  accessibility analysis, website crawling, and additional
                  technical website checks in one audit workflow.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
