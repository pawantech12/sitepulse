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
import { useEffect, useState } from "react";
import axios from "axios";

export default function PageDetailReport() {
  const params = useParams();
  const pageId = params?.pageId;
  const scanId = params?.scanId;
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-600">Loading report...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load report</p>
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
    scanTime: new Date(data.createdAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    loadTime: data.metrics?.LCP || "N/A",
    issues:
      (data.issues?.performance?.length || 0) +
      (data.issues?.seo?.length || 0) +
      (data.issues?.accessibility?.length || 0) +
      (data.issues?.practices?.length || 0),

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
    },
    {
      title: "Largest Contentful Paint",
      short: "LCP",
      value: data.metrics?.LCP || "N/A",
      status: "Poor",
    },
    {
      title: "Cumulative Layout Shift",
      short: "CLS",
      value: data.metrics?.CLS || "N/A",
      status: "Good",
    },
    {
      title: "Total Blocking Time",
      short: "TBT",
      value: data.metrics?.TBT || "N/A",
      status: "Average",
    },
    {
      title: "Speed Index",
      short: "SI",
      value: data.metrics?.SI || "N/A",
      status: "Average",
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
  return (
    <section className="min-h-screen bg-[#f8fafc] pt-28">
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Page Level Analysis
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Detailed Page Report
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Deep analysis of performance, SEO, accessibility and best
              practices for this page.
            </p>
          </div>

          <Link
            href={`/report/${scanId}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Report
          </Link>
        </div>

        {/* Overview */}
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          {/* Main */}
          <div
            className="
    overflow-hidden rounded-[32px]
    border border-slate-200/80
    bg-white/90
    shadow-[0_20px_70px_rgba(15,23,42,0.06)]
    backdrop-blur-xl
  "
          >
            {/* TOP SECTION */}
            <div className="relative overflow-hidden border-b border-slate-100">
              {/* BACKGROUND */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-cyan-50/40" />

              <div className="relative flex flex-col gap-8 p-6 sm:p-7 lg:flex-row lg:items-start lg:justify-between">
                {/* LEFT */}
                <div className="min-w-0 flex-1">
                  {/* LABEL */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />

                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Selected Page
                    </p>
                  </div>

                  {/* URL */}
                  <h2
                    className="
            mt-5 break-all
            text-2xl font-bold tracking-tight text-slate-900
            sm:text-3xl sm:leading-[1.25]
          "
                  >
                    {pageInfo.url}
                  </h2>

                  {/* FULL URL CARD */}
                  <div
                    className="
            mt-6 rounded-3xl border border-slate-200
            bg-white/80 p-5 shadow-sm backdrop-blur
          "
                  >
                    <div className="flex items-start gap-4">
                      {/* ICON */}
                      <div
                        className="
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-2xl border border-indigo-100
                bg-indigo-50
              "
                      >
                        <Globe className="h-5 w-5 text-indigo-600" />
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          Full URL
                        </p>

                        <p className="mt-2 break-all text-sm font-medium leading-7 text-slate-700">
                          {pageInfo.fullUrl}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HEALTH SCORE */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative flex h-36 w-36 items-center justify-center">
                    {/* OUTER RING */}
                    <div className="absolute inset-0 rounded-full border-[12px] border-emerald-100 bg-gradient-to-br from-emerald-50 to-white shadow-inner" />

                    {/* INNER */}
                    <div
                      className="
              relative z-10 flex h-[105px] w-[105px]
              flex-col items-center justify-center
              rounded-full bg-white shadow-sm
            "
                    >
                      <h2 className="text-4xl font-bold tracking-tight text-emerald-600">
                        {pageInfo.healthScore}
                      </h2>

                      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                        Health
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-3">
              {/* SCAN TIME */}
              <div
                className="
        group rounded-3xl border border-slate-200
        bg-slate-50/70 p-5
        transition-all duration-300
        hover:border-slate-300
        hover:bg-white
        hover:shadow-sm
      "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Scan Time
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">
                        {pageInfo.scanTime}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <Clock3 className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
              </div>

              {/* LOAD TIME */}
              <div
                className="
        group rounded-3xl border border-slate-200
        bg-slate-50/70 p-5
        transition-all duration-300
        hover:border-slate-300
        hover:bg-white
        hover:shadow-sm
      "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Load Time
                    </p>

                    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                      {pageInfo.loadTime}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <Globe className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
              </div>

              {/* ISSUES */}
              <div
                className="
        group rounded-3xl border border-red-100
        bg-gradient-to-br from-red-50 to-red-50/40 p-5
        transition-all duration-300
        hover:border-red-200
        hover:shadow-sm
      "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-red-500">
                      Total Issues
                    </p>

                    <p className="mt-4 text-3xl font-bold tracking-tight text-red-600">
                      {pageInfo.issues}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-red-100 bg-white p-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {[
              {
                title: "Performance",
                value: pageInfo.performance,
                styles: {
                  card: "border-orange-100 bg-gradient-to-br from-orange-50 to-orange-50/40",
                  badge: "bg-orange-100 text-orange-700",
                  value: "text-orange-600",
                  progress: "bg-orange-500",
                },
              },
              {
                title: "SEO",
                value: pageInfo.seo,
                styles: {
                  card: "border-emerald-100 bg-gradient-to-br from-emerald-50 to-emerald-50/40",
                  badge: "bg-emerald-100 text-emerald-700",
                  value: "text-emerald-600",
                  progress: "bg-emerald-500",
                },
              },
              {
                title: "Accessibility",
                value: pageInfo.accessibility,
                styles: {
                  card: "border-indigo-100 bg-gradient-to-br from-indigo-50 to-indigo-50/40",
                  badge: "bg-indigo-100 text-indigo-700",
                  value: "text-indigo-600",
                  progress: "bg-indigo-500",
                },
              },
              {
                title: "Best Practices",
                value: pageInfo.practices,
                styles: {
                  card: "border-cyan-100 bg-gradient-to-br from-cyan-50 to-cyan-50/40",
                  badge: "bg-cyan-100 text-cyan-700",
                  value: "text-cyan-600",
                  progress: "bg-cyan-500",
                },
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`
        group relative overflow-hidden rounded-[28px]
        border p-5 sm:p-6
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
        ${item.styles.card}
      `}
              >
                {/* SOFT GLOW */}
                <div
                  className="
          pointer-events-none absolute inset-0
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
          bg-white/20
        "
                />

                <div className="relative">
                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className={`
                inline-flex rounded-full px-3 py-1
                text-[11px] font-bold uppercase tracking-[0.16em]
                ${item.styles.badge}
              `}
                      >
                        {item.title}
                      </div>

                      <div className="mt-5 flex items-end gap-1.5">
                        <h2
                          className={`
                  text-4xl font-bold tracking-tight sm:text-5xl
                  ${item.styles.value}
                `}
                        >
                          {item.value}
                        </h2>

                        <span className="pb-1 text-sm font-semibold text-slate-500">
                          /100
                        </span>
                      </div>
                    </div>

                    {/* SCORE STATUS */}
                    <div
                      className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-2xl border border-white/70
              bg-white/80 backdrop-blur-sm
              shadow-sm
            "
                    >
                      <div
                        className={`
                h-3 w-3 rounded-full
                ${item.styles.progress}
              `}
                      />
                    </div>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-6">
                    <div className="h-2 overflow-hidden rounded-full bg-white/70">
                      <div
                        className={`h-full rounded-full ${item.styles.progress}`}
                        style={{
                          width: `${Math.min(item.value, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                Core Web Vitals
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                Performance Metrics
              </h3>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500">
              Lighthouse metrics collected during the analysis process.
            </p>
          </div>

          <div className="p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {metrics.map((item, index) => (
                <div
                  key={index}
                  className="
            group relative overflow-hidden rounded-[28px]
            border border-slate-200
            bg-gradient-to-br from-white to-slate-50/70
            p-5
            transition-all duration-300
            hover:-translate-y-1
            hover:border-slate-300
            hover:shadow-xl hover:shadow-slate-200/50
          "
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">
                    {/* SHORT LABEL */}
                    <div
                      className="
                inline-flex items-center rounded-xl
                border border-slate-200
                bg-white px-3 py-1.5
                shadow-sm
              "
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        {item.short}
                      </span>
                    </div>

                    {/* STATUS ICON */}
                    <div
                      className={`
                flex h-10 w-10 items-center justify-center
                rounded-2xl border bg-white shadow-sm
                ${
                  item.status === "Poor"
                    ? "border-red-100"
                    : item.status === "Average"
                      ? "border-orange-100"
                      : "border-emerald-100"
                }
              `}
                    >
                      {item.status === "Poor" ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : item.status === "Average" ? (
                        <TriangleAlert className="h-5 w-5 text-orange-500" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                  </div>

                  {/* VALUE */}
                  <div className="mt-7">
                    <h4 className="text-4xl font-bold tracking-tight text-slate-900">
                      {item.value}
                    </h4>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                      {item.title}
                    </p>
                  </div>

                  {/* STATUS BADGE */}
                  <div
                    className={`
              mt-6 inline-flex items-center rounded-xl
              px-3 py-1.5 text-[11px]
              font-bold uppercase tracking-[0.12em]
              ${
                item.status === "Poor"
                  ? "bg-red-50 text-red-600"
                  : item.status === "Average"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-emerald-50 text-emerald-600"
              }
            `}
                  >
                    {item.status}
                  </div>

                  {/* HOVER GLOW */}
                  <div
                    className="
              pointer-events-none absolute inset-0 rounded-[28px]
              ring-1 ring-inset ring-white/40
            "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issue Sections */}
        <div className="mt-10 space-y-8">
          {issueCategories
            .filter((category) => category.issues?.length > 0)
            .map((category, categoryIndex) => {
              const Icon = category.icon;

              return (
                <div
                  key={categoryIndex}
                  className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
                >
                  {/* Header */}
                  <div className="border-b border-slate-100 p-6 sm:p-7">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                          <Icon className="h-5 w-5 text-slate-700" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold tracking-tight text-slate-900">
                            {category.title} Issues
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            {category.issues.length} issue detected on this page
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600">
                        Recommendations Included
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-5 p-6 sm:p-7">
                    {(category.issues || []).map((issue, issueIndex) => (
                      <div
                        key={issueIndex}
                        className="rounded-[28px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6"
                      >
                        {/* Top */}
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
                                  {issue.severity} Severity
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
                              {issue.severity} Severity
                            </span>
                          </div>
                        </div>

                        {/* Affected */}
                        <div className="mt-6">
                          <div className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-slate-500" />

                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                              Affected Files / Sections
                            </p>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2.5">
                            {(issue.files || []).map((item, index) => (
                              <span
                                key={index}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Impact & Solution */}
                        <div className="mt-6 grid gap-5 xl:grid-cols-2">
                          {/* Impact */}
                          <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-500" />

                              <div>
                                <p className="text-sm font-semibold text-orange-700">
                                  Impact
                                </p>

                                <p className="mt-3 text-sm leading-7 text-orange-600">
                                  {issue.impact}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Solution */}
                          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5">
                            <div className="flex items-start gap-3">
                              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />

                              <div>
                                <p className="text-sm font-semibold text-emerald-700">
                                  Recommended Solution
                                </p>

                                <p className="mt-3 text-sm leading-7 text-emerald-600">
                                  {issue.solution}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-[30px] border border-slate-200 bg-slate-900 p-8 text-white sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-indigo-300">
                Improve This Page
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Fix issues and improve page quality
              </h3>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Apply the recommendations above to improve loading speed,
                accessibility, SEO visibility and overall user experience.
              </p>
            </div>

            <Link
              href="/analyze"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-6 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start New Analysis
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      {/* FLOATING AI REPORT BUTTON */}
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
        <Link
          href={`/report/${scanId}/page/${pageId}/ai`}
          className="floating-ai group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950 px-5 py-4 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 sm:px-6"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Animated Pulse */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/30">
            <Sparkles className="h-5 w-5 text-white" />

            <div className="absolute inset-0 rounded-2xl bg-cyan-400/40 blur-xl animate-pulse" />
          </div>

          {/* Content */}
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              AI Assistant
            </p>

            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm font-semibold text-white sm:text-[15px]">
                Generate AI Report
              </p>

              <ChevronRight className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          {/* Floating Border Glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </Link>
      </div>
    </section>
  );
}
