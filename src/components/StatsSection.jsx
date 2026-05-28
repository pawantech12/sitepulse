"use client";

import { Activity, Globe, ShieldCheck, Sparkles, Zap } from "lucide-react";

const stats = [
  {
    icon: Globe,
    value: "10K+",
    label: "Pages Analyzed",
    description:
      "Scanned and analyzed across multiple websites and internal URLs.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Activity,
    value: "99%",
    label: "Accurate Reports",
    description:
      "Detailed website insights with reliable analytics and issue detection.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: ShieldCheck,
    value: "100+",
    label: "Website Checks",
    description:
      "Comprehensive checks for performance, SEO, accessibility, and more.",
    gradient: "from-violet-500 to-fuchsia-400",
  },
  {
    icon: Zap,
    value: "< 30s",
    label: "Average Scan Time",
    description: "Fast crawling and reporting for complete website analysis.",
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function StatsSection() {
  return (
    <section id="stats" className="relative overflow-hidden bg-white py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-wide text-slate-600">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            Website Analytics Insights
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Powerful Analytics For Better Websites
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Get detailed insights into website performance, SEO, accessibility,
            and technical issues with fast and accurate reports.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Glow */}
                <div
                  className={`absolute right-0 top-0 h-28 w-28 bg-gradient-to-br ${stat.gradient} opacity-10 blur-3xl transition-all duration-300 group-hover:opacity-20`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-md`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    {stat.value}
                  </h3>

                  <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">
                    {stat.label}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
