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

const stats = [
  {
    icon: Globe,
    value: "10K+",
    label: "Websites Analyzed",
  },
  {
    icon: Layers3,
    value: "1M+",
    label: "Pages Scanned",
  },
  {
    icon: Zap,
    value: "98%",
    label: "Performance Accuracy",
  },
  {
    icon: Users,
    value: "5K+",
    label: "Developers Trust Us",
  },
];

const values = [
  {
    icon: SearchCheck,
    title: "Detailed Website Audits",
    description:
      "We provide deep website analysis for performance, SEO, accessibility, and modern best practices.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Developer Friendly Reports",
    description:
      "Understand issues quickly with clear explanations, optimization strategies, and actionable fixes.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: BarChart3,
    title: "Production-Level Insights",
    description:
      "Get SaaS-level reports powered by Lighthouse metrics and real-world optimization recommendations.",
    gradient: "from-violet-500 to-fuchsia-400",
  },
];

const features = [
  "Core Web Vitals Monitoring",
  "SEO & Accessibility Analysis",
  "Internal Page Crawling",
  "Detailed Optimization Reports",
  "Developer-Friendly Recommendations",
  "Performance Improvement Insights",
];

const timeline = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Help developers, businesses, and startups build faster, optimized, and search-friendly websites.",
  },
  {
    icon: LineChart,
    title: "Continuous Improvements",
    description:
      "We continuously improve scanning quality, reporting accuracy, and optimization recommendations.",
  },
  {
    icon: Clock3,
    title: "Future Vision",
    description:
      "Build a modern all-in-one website intelligence platform for developers and growing SaaS companies.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-white">
      <section className="relative overflow-hidden pt-36">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 lg:grid-cols-2 lg:px-8">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              About SitePulse
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Helping Teams Build{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text font-extrabold text-transparent">
                Faster & Better
              </span>{" "}
              Websites
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              SitePulse is a modern SaaS website analysis platform designed to
              help developers, startups, agencies, and businesses identify
              performance bottlenecks, SEO issues, accessibility problems, and
              optimization opportunities across every page.
            </p>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/analyze"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 text-sm font-semibold text-white shadow-xl shadow-slate-300/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <SearchCheck className="h-4 w-4" />
                Start Website Analysis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </div>

            {/* FEATURES */}
            <div className="mt-8 flex flex-wrap gap-4 text-xs font-medium text-slate-500">
              {[
                "Advanced Website Audits",
                "Core Web Vitals Analysis",
                "Developer-Friendly Reports",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />

                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-indigo-500/15 via-blue-500/10 to-cyan-400/15 blur-3xl" />

            {/* Image Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-3 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />

              <img
                src="/about-hero.png"
                alt="Website Analytics Dashboard"
                className="h-full min-h-[500px] w-full rounded-[26px] object-cover"
              />

              {/* Floating Card 1 */}
              <div className="absolute left-7 top-7 rounded-2xl border border-white/20 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                    <Zap className="h-5 w-5 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Performance Score
                    </p>

                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                      98/100
                    </h3>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute bottom-7 right-7 rounded-2xl border border-white/20 bg-white/80 px-5 py-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                    <SearchCheck className="h-5 w-5 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      SEO Optimized
                    </p>

                    <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
                      Advanced Analysis
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-cyan-400/5 blur-3xl" />

          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:70px_70px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Why Teams Choose SitePulse
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Built For Modern Developers,
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Agencies & SaaS Teams
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Powerful website intelligence tools combined with clear
              optimization reports, production-level insights, and
              developer-friendly workflows.
            </p>
          </div>

          {/* Main Grid */}
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7"
                >
                  {/* Background Glow */}
                  <div
                    className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${item.gradient} opacity-[0.08] blur-3xl transition-all duration-500 group-hover:opacity-[0.16]`}
                  />

                  {/* Top Section */}
                  <div className="relative flex items-start justify-between">
                    {/* Icon */}
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-slate-200/50`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Number */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-gradient-to-br ${item.gradient} shadow-lg shadow-slate-200/50`}
                      >
                        <span className="text-lg font-black tracking-tight text-white">
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative mt-8">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Line */}
                  <div className="relative mt-7 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${item.gradient} transition-all duration-500 group-hover:w-full`}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-300 group-hover:border-white/40" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-50 py-24">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-cyan-400/5 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Platform Features
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Everything You Need To
              <span className="block bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Optimize Modern Websites
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              SitePulse helps developers and businesses improve website
              performance, SEO, accessibility, and user experience with advanced
              analytics and production-level optimization reports.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 transition-all duration-300 group-hover:scale-105">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-sm font-semibold leading-6 text-slate-800">
                        {item}
                      </p>

                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Professional optimization insights and detailed website
                        analysis for modern web applications.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/analyze"
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 text-sm font-semibold text-white shadow-xl shadow-slate-300/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <SearchCheck className="h-4 w-4" />
                Start Website Analysis
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/features"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-cyan-400/10 blur-3xl" />

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.06)]">
              {/* Top */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Why Teams Choose SitePulse
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                  Built For Modern SaaS & Web Platforms
                </h3>
              </div>

              {/* Timeline */}
              <div className="relative mt-10 space-y-6">
                {/* Vertical Line */}
                <div className="absolute left-[27px] top-0 h-full w-px bg-slate-200" />

                {timeline.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="relative flex gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-slate-300 hover:bg-white"
                    >
                      {/* Icon */}
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <Icon className="h-6 w-6 text-slate-700" />
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="text-lg font-bold tracking-tight text-slate-900">
                          {item.title}
                        </h4>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute left-0 top-0 h-[260px] w-[260px] rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-16 shadow-[0_25px_90px_rgba(15,23,42,0.22)] sm:px-10 sm:py-20 lg:px-16">
            {/* Decorative Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_35%)]" />

            <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

            {/* Content */}
            <div className="relative mx-auto max-w-3xl text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-wide text-slate-200 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                AI Powered Website Optimization
              </div>

              {/* Heading */}
              <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready To Improve Your Website Performance?
              </h2>

              {/* Description */}
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Analyze website performance, discover optimization
                opportunities, and generate professional reports with actionable
                recommendations.
              </p>

              {/* Actions */}
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
