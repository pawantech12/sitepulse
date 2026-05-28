"use client";

import {
  ArrowRight,
  CheckCircle2,
  Globe,
  SearchCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-36">
      {/* Background Blur */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[250px] w-[250px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div>
          {/* Badge (updated) */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" />
            Website Performance Analyzer
          </div>

          {/* Heading (updated like dashboard style) */}
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-tight">
            Analyze Your Website{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent font-extrabold">
              Like A Pro
            </span>
          </h1>

          {/* Description (updated) */}
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Scan your website and all internal pages to detect performance, SEO,
            accessibility, and best practice issues with detailed reports and
            solutions.
          </p>

          {/* Analyzer Box */}
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/40">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Input */}
              <div className="relative flex-1">
                <Globe className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="https://yourwebsite.com"
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-4 text-sm font-medium text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
                />
              </div>

              {/* Button */}
              <Link href="/analyze">
                <button className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 text-sm font-semibold text-white shadow-xl shadow-slate-300/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800">
                  <SearchCheck className="h-4 w-4" />
                  Analyze Website
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>

            {/* Bottom Text (updated typography) */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Full Website Crawl
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Detailed Reports
              </div>

              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                SEO & Performance Audit
              </div>
            </div>
          </div>
        </div>

        {/* Right Card (only typography polish) */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-indigo-500/10 via-blue-500/5 to-cyan-400/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Website Report
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  pawan-kumavat.vercel.app
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-lg font-black text-emerald-600">
                92
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 p-5 sm:gap-4 sm:p-6">
              {[
                { title: "Performance", score: "95", color: "bg-emerald-500" },
                { title: "SEO", score: "98", color: "bg-blue-500" },
                { title: "Accessibility", score: "89", color: "bg-orange-500" },
                {
                  title: "Best Practices",
                  score: "96",
                  color: "bg-violet-500",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-500">
                      {item.title}
                    </p>

                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  </div>

                  <h4 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
                    {item.score}
                  </h4>
                </div>
              ))}
            </div>

            {/* Issues */}
            <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900">
                  Issues Found
                </h4>

                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-600">
                  12 Issues
                </span>
              </div>

              <div className="space-y-3">
                {[
                  "Unused JavaScript detected",
                  "Images need optimization",
                  "Render blocking CSS found",
                ].map((issue, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />

                    <p className="text-sm font-medium text-slate-700">
                      {issue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
