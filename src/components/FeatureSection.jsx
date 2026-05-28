"use client";

import {
  Activity,
  Globe,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Performance Analysis",
    description:
      "Analyze Core Web Vitals, loading speed, JavaScript execution, and rendering issues across all pages.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: SearchCheck,
    title: "SEO Audit",
    description:
      "Detect SEO issues including missing meta tags, crawlability problems, broken links, and poor structure.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Accessibility Check",
    description:
      "Identify accessibility issues like low contrast, missing labels, heading structure, and alt text problems.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Globe,
    title: "Full Website Crawl",
    description:
      "Automatically scan all internal URLs and generate detailed reports for every discovered page.",
    gradient: "from-violet-500 to-fuchsia-400",
  },
  {
    icon: Zap,
    title: "Issue Detection",
    description:
      "Find render-blocking resources, oversized images, unused CSS/JS, and caching problems instantly.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Sparkles,
    title: "Detailed Solutions",
    description:
      "Get clear developer-friendly solutions and optimization suggestions for every detected issue.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative overflow-hidden bg-white py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" />
            Powerful Website Analysis
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything You Need To Analyze A Website
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Get complete website insights with detailed reports, issue
            detection, and optimization recommendations for every internal page.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Glow */}
                <div
                  className={`absolute right-0 top-0 h-28 w-28 bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl transition-all duration-300 group-hover:opacity-20`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-md`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
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
