"use client";

import {
  ArrowRight,
  FileSearch,
  Globe,
  ScanSearch,
  Sparkles,
  Wrench,
} from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Enter Website URL",
    description:
      "Paste your website URL to begin the complete website analysis.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: ScanSearch,
    title: "Scan Internal Pages",
    description:
      "Automatically crawl and analyze all important internal pages.",
    gradient: "from-emerald-500 to-green-400",
  },
  {
    icon: FileSearch,
    title: "Generate Reports",
    description:
      "Get detailed reports for SEO, performance, and accessibility.",
    gradient: "from-violet-500 to-fuchsia-400",
  },
  {
    icon: Wrench,
    title: "Optimize Website",
    description:
      "Follow actionable solutions to improve website quality and speed.",
    gradient: "from-orange-500 to-amber-400",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-wide text-slate-600">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            Simple Workflow
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Analyze Your Website In Minutes
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-sm leading-7 text-slate-600 sm:text-base">
            A fast and simple workflow to scan your website, discover issues,
            and improve performance with detailed optimization insights.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-20">
          <div className="grid gap-6 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={index} className="relative">
                  {/* Connector Arrow */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[calc(100%-12px)] top-1/2 z-20 hidden -translate-y-1/2 lg:flex">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
                        <ArrowRight className="h-5 w-5 text-slate-500" />
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className="group relative h-full overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_10px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    {/* Glow */}
                    <div
                      className={`absolute right-0 top-0 h-28 w-28 bg-gradient-to-br ${step.gradient} opacity-10 blur-3xl transition-all duration-300 group-hover:opacity-20`}
                    />

                    {/* Step Number */}
                    <div className="absolute right-6 top-6 text-4xl font-black tracking-tight text-slate-100">
                      0{index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative mt-7">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div className="relative mt-7 h-1 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full w-2/3 rounded-full bg-gradient-to-r ${step.gradient} transition-all duration-500 group-hover:w-full`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
