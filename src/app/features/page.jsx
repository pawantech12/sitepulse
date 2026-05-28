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

const coreFeatures = [
  {
    icon: Gauge,
    title: "Performance Intelligence",
    description:
      "Monitor Lighthouse metrics, Core Web Vitals, rendering bottlenecks, and loading performance with advanced diagnostics.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: SearchCheck,
    title: "Advanced SEO Audits",
    description:
      "Detect indexing issues, metadata problems, broken links, crawlability gaps, and on-page SEO weaknesses.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Eye,
    title: "Accessibility Monitoring",
    description:
      "Improve usability with accessibility audits covering contrast, semantics, labels, and screen reader compatibility.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Workflow,
    title: "Full Website Crawling",
    description:
      "Automatically scan internal pages and generate structured reports across your entire website architecture.",
    gradient: "from-violet-500 to-fuchsia-400",
  },
];

const advancedFeatures = [
  {
    icon: BrainCircuit,
    title: "AI Optimization Reports",
    description:
      "Generate professional reports with actionable recommendations and developer-friendly explanations.",
  },
  {
    icon: Radar,
    title: "Real-Time Insights",
    description:
      "Track critical performance changes instantly with intelligent monitoring workflows.",
  },
  {
    icon: LockKeyhole,
    title: "Best Practices Analysis",
    description:
      "Identify security, browser compatibility, and modern development standard violations.",
  },
  {
    icon: Database,
    title: "Historical Scan Data",
    description:
      "Store and compare previous scans to measure website optimization progress over time.",
  },
  {
    icon: Blocks,
    title: "Framework Detection",
    description:
      "Detect React, Next.js, WordPress, Shopify, and other modern frameworks automatically.",
  },
  {
    icon: Layers3,
    title: "Detailed Page Reports",
    description:
      "Analyze every scanned page individually with issue categorization and scoring.",
  },
];

const stats = [
  {
    icon: Globe,
    value: "50K+",
    label: "Web Pages Scanned",
  },
  {
    icon: Activity,
    value: "99.2%",
    label: "Audit Accuracy",
  },
  {
    icon: Zap,
    value: "2.1s",
    label: "Average Scan Speed",
  },
  {
    icon: ShieldCheck,
    value: "24/7",
    label: "Monitoring Ready",
  },
];

const solutions = [
  "Performance & Core Web Vitals",
  "SEO Optimization Reports",
  "Accessibility Analysis",
  "Internal Link Crawling",
  "Production-Level Recommendations",
  "Developer-Friendly Fixes",
];

export default function FeaturesPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden pt-36">
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-full flex justify-center text-center px-5 pb-24  lg:px-8">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold tracking-wide text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Powerful Website Intelligence Platform
            </div>

            <h1 className="mt-6 max-w-4xl mx-auto text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Modern Features For
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text font-extrabold text-transparent">
                Website Optimization
              </span>
            </h1>

            <p className="mt-6 max-w-5xl mx-auto text-sm leading-7 text-slate-600 sm:text-base">
              Analyze performance, SEO, accessibility, and technical website
              quality with modern SaaS-level reporting tools built for
              developers, startups, and growing businesses.
            </p>

            {/* ACTIONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row mx-auto w-fit">
              <Link
                href="/analyze"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 text-sm font-semibold text-white shadow-xl shadow-slate-300/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Zap className="h-4 w-4" />
                Start Free Analysis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/pricing"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
              >
                Explore Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* BG */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* HEADING */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              Core Platform Features
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Powerful Tools To Improve
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Website Quality & Performance
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Professional auditing features designed to help teams identify,
              understand, and fix website performance issues faster.
            </p>
          </div>

          {/* GRID */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {coreFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  {/* GLOW */}
                  <div
                    className={`absolute right-0 top-0 h-40 w-40 bg-gradient-to-br ${item.gradient} opacity-10 blur-3xl transition-all duration-300 group-hover:opacity-20`}
                  />

                  <div className="relative flex items-start justify-between gap-5">
                    {/* LEFT */}
                    <div>
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>

                      <h3 className="mt-7 text-2xl font-bold tracking-tight text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>

                    {/* NUMBER */}
                    <div className="text-5xl font-black tracking-tight text-slate-100">
                      0{index + 1}
                    </div>
                  </div>

                  {/* BUTTON */}
                  <div className="relative mt-8">
                    <button className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:text-slate-900">
                      Learn More
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-24">
        {/* BG */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* HEADING */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
                <Sparkles className="h-3.5 w-3.5" />
                Advanced Platform Capabilities
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Built To Support
                <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Modern SaaS Workflows
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Powerful auditing, reporting, and optimization features designed
              for developers, agencies, startups, and growing SaaS platforms.
            </p>
          </div>

          {/* GRID */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-300 group-hover:bg-slate-900">
                    <Icon className="h-6 w-6 text-slate-700 transition-all duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* BG */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-[1fr_0.95fr] lg:px-8">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Optimization Solutions
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything Needed To
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Analyze & Optimize Websites
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              From website crawling to AI-generated optimization reports,
              SitePulse helps teams improve technical website quality with
              modern developer workflows.
            </p>

            {/* LIST */}
            <div className="mt-10 space-y-4">
              {solutions.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-slate-900">
                      {item}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Professional website analysis with modern optimization
                      workflows and production-level recommendations.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-cyan-400/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900 p-6 shadow-[0_20px_80px_rgba(15,23,42,0.14)]">
              {/* TOP */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Optimization Workflow
                  </p>

                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">
                    Website Analysis Pipeline
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <LineChart className="h-6 w-6 text-cyan-400" />
                </div>
              </div>

              {/* STEPS */}
              <div className="mt-8 space-y-5">
                {[
                  "Crawl Website Pages",
                  "Analyze Lighthouse Metrics",
                  "Detect Technical Issues",
                  "Generate AI Optimization Report",
                  "Improve Performance & SEO",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-bold text-slate-900">
                      0{index + 1}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item}
                      </h4>

                      <p className="mt-1 text-xs leading-6 text-slate-400">
                        Modern SaaS workflow designed for optimization teams.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-6 rounded-3xl border border-cyan-400/10 bg-cyan-400/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">
                    <Clock3 className="h-5 w-5 text-cyan-400" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Fast & Accurate Reports
                    </h4>

                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Generate professional website reports in minutes with
                      detailed optimization insights and developer-focused
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* BG */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 shadow-[0_25px_90px_rgba(15,23,42,0.2)] sm:px-10 sm:py-20 lg:px-16">
            {/* GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%)]" />

            {/* CONTENT */}
            <div className="relative mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                Website Intelligence Platform
              </div>

              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready To Optimize Your Website?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Generate professional website analysis reports and discover
                optimization opportunities across performance, SEO, and user
                experience.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/analyze"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-7 text-sm font-semibold text-slate-900 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  <Zap className="h-4 w-4" />
                  Start Free Analysis
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-7 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08]"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
