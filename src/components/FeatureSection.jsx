"use client";

import {
  Accessibility,
  AlertTriangle,
  Check,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Layers,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  const features = [
    {
      number: "01",
      icon: Zap,
      iconColor: "#3b7cff",
      label: "CORE WEB VITALS",
      labelClass: "bg-[#EEF4FF] text-[#2B6AFF]",
      title: "Performance Intelligence",
      description:
        "Evaluate loading behavior, Core Web Vitals, and performance signals across discovered pages.",
      contentType: "metrics",
      content: [
        { name: "LCP", value: "2.1s", width: "74%", color: "#18b987" },
        { name: "INP", value: "148ms", width: "60%", color: "#f2a900" },
        { name: "CLS", value: "0.04", width: "86%", color: "#18b987" },
      ],
    },
    {
      number: "02",
      icon: Search,
      iconColor: "#293444",
      label: "TECHNICAL SEO",
      labelClass: "bg-[#F0F0FF] text-[#5B5BEF]",
      title: "Technical SEO",
      description:
        "Identify metadata, structure, crawlability, linking, and other technical SEO signals.",
      contentType: "checks",
      content: [
        { status: "success", label: "Title" },
        { status: "warning", label: "Meta" },
        { status: "success", label: "Links" },
        { status: "success", label: "Index" },
      ],
    },
    {
      number: "03",
      icon: Accessibility,
      iconColor: "#202b3b",
      label: "WCAG SIGNALS",
      labelClass: "bg-[#F5F5F5] text-[#596273]",
      title: "Accessibility",
      description:
        "Surface potential accessibility issues involving structure, labels, contrast, and alternative text.",
      contentType: "coverage",
      content: [
        { name: "ALT TEXT", value: "82%", width: "74%" },
        { name: "LABELS", value: "94%", width: "90%" },
        { name: "CONTRAST", value: "91%", width: "84%" },
      ],
    },
    {
      number: "04",
      icon: GitBranch,
      iconColor: "#293444",
      label: "INTERNAL CRAWL",
      labelClass: "bg-[#f5f5f4] text-[#596273]",
      title: "Page Discovery",
      description:
        "Discover internal URLs and organize audit results around the pages that make up your website.",
      contentType: "tree",
      content: [
        { path: "/", color: "#18b987", root: true },
        { path: "/about", color: "#18b987" },
        { path: "/services", color: "#f2a900" },
        { path: "/pricing", color: "#18b987" },
        { path: "/contact", color: "#18b987" },
      ],
    },
    {
      number: "05",
      icon: AlertTriangle,
      iconColor: "#293444",
      label: "PRIORITIZED",
      labelClass: "bg-[#FFF9F0] text-[#B45309]",
      title: "Issue Detection",
      description:
        "Turn audit checks into prioritized findings with clear severity and contextual recommendations.",
      contentType: "findings",
      content: [
        {
          level: "High",
          count: "2",
          color: "#e34444",
          border: "#efcaca",
          background: "#fffafb",
        },
        {
          level: "Medium",
          count: "7",
          color: "#e1a000",
          border: "#f1dca5",
          background: "#fffdf7",
        },
        {
          level: "Low",
          count: "14",
          color: "#8796a9",
          border: "#cbd5e1",
          background: "#fafbfd",
        },
      ],
    },
    {
      number: "06",
      icon: Sparkles,
      iconColor: "#7654d9",
      label: "GROQ AI",
      labelClass: "bg-[#F3F0FF] text-[#7C3AED]",
      title: "AI-Assisted Analysis",
      description:
        "Generate understandable summaries and practical recommendations using Groq AI integration.",
      contentType: "recommendations",
      content: [
        "Review image optimization across /services",
        "Check metadata completeness on key pages",
        "Improve accessibility label coverage",
      ],
    },
  ];

  return (
    <section
      id="features"
      className="w-full overflow-hidden bg-[#f7f8fa] font-sans text-[#0b1020]"
    >
      <div className="mx-auto max-w-[1220px] px-5 pb-[65px] pt-[82px] sm:px-8 lg:px-0">
        <div className="grid gap-[40px] lg:grid-cols-[1.45fr_1fr] lg:gap-[105px]">
          <div className="flex flex-col gap-4">
            <div className=" flex items-center gap-[10px]">
              <span className="h-px w-[20px] bg-[#dbe1e9]" />

              <span className="text-[9px] font-bold uppercase tracking-[-0.01em] text-[#96A4B5] sm:text-[11px]">
                What SitePulse Analyzes
              </span>
            </div>

            <h2 className="max-w-[610px] text-[42px] font-bold leading-[52px] tracking-[-0.045em] text-[#0B1020]  lg:text-[52px]">
              One Audit.
              <br />
              Multiple Layers of
              <br />
              Website Intelligence.
            </h2>
          </div>

          <div className="max-w-[430px] lg:pt-[19px]">
            <p className="text-[15px] font-normal leading-[28px] tracking-[-0.01em] text-[#596273] sm:text-[17px]">
              SitePulse combines crawling, performance data, technical checks,
              and AI-assisted interpretation into one audit workflow that covers
              your entire website.
            </p>

            <Link
              href="#how-it-works"
              className="group mt-[18px] inline-flex items-center gap-[7px] text-[14px] font-semibold text-[#2B6AFF] transition-colors hover:text-[#1859df]"
            >
              See how it works
              <span className="text-[15px] transition-transform duration-200 group-hover:translate-x-[3px]">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-[62px] overflow-hidden rounded-[8px] border border-[#DDE2EA] bg-[#f8f9fb]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  className={`flex flex-col gap-5 border-[#d8dee8]  transition-colors duration-200 hover:bg-white px-6 py-7 ${
                    index % 3 !== 2 ? "lg:border-r" : ""
                  } ${index >= 3 ? "border-t" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[10px]">
                      <span className="text-[12px] font-bold text-[#C8D1DC]">
                        {feature.number}
                      </span>

                      <span className="h-[12px] w-px bg-[#DDE2EA]" />

                      <Icon
                        className="h-[14px] w-[14px]"
                        style={{ color: feature.iconColor }}
                      />
                    </div>

                    <span
                      className={`rounded-[4px] px-[10px] py-[3px] text-[10px] font-bold uppercase ${feature.labelClass}`}
                    >
                      {feature.label}
                    </span>
                  </div>

                  <div className="flex flex-col gap-[6px]">
                    <h3 className=" text-[16px] font-bold tracking-[-0.025em] leading-[20px] text-[#0B1020] sm:text-[17px]">
                      {feature.title}
                    </h3>

                    <p className="text-[11px] leading-[20px] text-[#596273] sm:text-[13px]">
                      {feature.description}
                    </p>
                  </div>

                  <div className=" border-t border-[#DDE2EA] pt-[16px]">
                    {feature.contentType === "metrics" && (
                      <>
                        <div className="mb-[10px] text-[10px] font-bold uppercase text-[#C8D1DC]">
                          Sample Metrics
                        </div>

                        <div className="flex flex-col gap-2">
                          {feature.content.map((item) => (
                            <div
                              key={item.name}
                              className="grid grid-cols-[1fr_45px_68px] items-center gap-[7px]"
                            >
                              <div className="flex items-center gap-[8px] text-[12px] font-medium text-[#596273]">
                                <span
                                  className="h-[5px] w-[5px] rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                {item.name}
                              </div>

                              <span className="text-right text-[12px] font-bold text-[#0B1020]">
                                {item.value}
                              </span>

                              <div className="h-[3px] overflow-hidden rounded-full bg-[#dfe5ec]">
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: item.width,
                                    backgroundColor: item.color,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {feature.contentType === "checks" && (
                      <>
                        <div className="mb-[10px] text-[10px] font-bold uppercase text-[#C8D1DC]">
                          Signal Checks
                        </div>

                        <div className="flex items-start gap-[8px]">
                          {feature.content.map((item) => (
                            <div key={item.label}>
                              <div
                                className={`flex h-[26px] w-[28px] items-center justify-center rounded-[6px] border ${
                                  item.status === "warning"
                                    ? "border-[#F5E4A0] bg-[#FFFBF0]"
                                    : "border-[#C6F0D6] bg-[#F2FCF5]"
                                }`}
                              >
                                {item.status === "warning" ? (
                                  <AlertTriangle className="h-[12px] w-[12px] text-[#F59E0B]" />
                                ) : (
                                  <Check className="h-[12px] w-[12px] text-[#10B981]" />
                                )}
                              </div>
                              <span className="mt-[5px] text-[10px] font-bold uppercase text-[#596273]">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {feature.contentType === "coverage" && (
                      <>
                        <div className="mb-[10px] text-[10px] font-bold uppercase text-[#C8D1DC]">
                          Coverage Sample
                        </div>

                        <div className="flex flex-col gap-2">
                          {feature.content.map((item) => (
                            <div
                              key={item.name}
                              className="grid grid-cols-[1fr_68px_29px] items-center gap-[7px]"
                            >
                              <span className="text-[12px] font-medium text-[#596273]">
                                {item.name}
                              </span>

                              <div className="h-[3px] overflow-hidden rounded-full bg-[#DDE2EA]">
                                <div
                                  className="h-full rounded-full bg-[#2B6AFF]"
                                  style={{ width: item.width }}
                                />
                              </div>

                              <span className="text-right text-[12px] font-bold text-[#0B1020]">
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {feature.contentType === "tree" && (
                      <>
                        <div className="mb-[10px] text-[10px] font-bold uppercase text-[#C8D1DC]">
                          URL Tree Sample
                        </div>

                        <div className="relative pl-[14px] text-[12px] flex flex-col gap-1 text-[#69758a]">
                          {feature.content.map((item, itemIndex) => {
                            const isRoot = itemIndex === 0;
                            const isLast =
                              itemIndex === feature.content.length - 1;

                            return (
                              <div
                                key={item.path}
                                className={`relative flex items-center ${
                                  isRoot ? "h-[13px]" : "ml-[9px] h-[15px]"
                                }`}
                              >
                                {!isRoot && (
                                  <>
                                    <span
                                      className={`absolute -left-[9px] top-1/2 w-[9px] -translate-y-1/2 border-t border-[#d8dee7]`}
                                    />

                                    <span
                                      className={`absolute -left-[9px] ${
                                        isLast ? "top-0 h-1/2" : "top-0 h-full"
                                      } border-l border-[#d8dee7]`}
                                    />
                                  </>
                                )}

                                <span
                                  className={`absolute h-[6px] w-[6px] rounded-full ${
                                    isRoot ? "-left-[14px]" : "-left-[1px]"
                                  }`}
                                  style={{ backgroundColor: item.color }}
                                />

                                <span
                                  className={`${
                                    item.root
                                      ? "font-bold text-[#0B1020]"
                                      : "text-[#596273] ml-3"
                                  }`}
                                >
                                  {item.path}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {feature.contentType === "findings" && (
                      <>
                        <div className="mb-[10px] text-[10px] font-bold uppercase text-[#C8D1DC]">
                          Finding Counts
                        </div>

                        <div className="grid grid-cols-3 gap-[8px]">
                          {feature.content.map((item) => (
                            <div
                              key={item.level}
                              className="rounded-[5px] p-3 flex flex-col gap-1"
                              style={{
                                border: `1px solid ${item.border}`,
                              }}
                            >
                              <div
                                className="flex items-center gap-[5px] text-[10px] font-bold uppercase"
                                style={{ color: item.color }}
                              >
                                <span
                                  className="h-[5px] w-[5px] rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />

                                {item.level}
                              </div>

                              <div className=" text-[28px] font-bold leading-none tracking-[-0.04em] text-[#111827]">
                                {item.count}
                              </div>

                              <div className=" text-[11px] text-[#596273]">
                                findings
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {feature.contentType === "recommendations" && (
                      <>
                        <div className="mb-[10px] text-[10px] font-bold uppercase text-[#C8D1DC]">
                          Recommendation Stream
                        </div>

                        <div className="flex flex-col gap-[6px]">
                          {feature.content.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-[8px] h-[30px] rounded-[5px] border border-[#EDE9FC]  px-[12px]"
                            >
                              <Sparkles className="h-[10px] w-[10px] shrink-0 text-[#7C3AED]" />

                              <span className="truncate text-[12px] text-[#596273]">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-[48px]">
          <div className="mb-[11px] flex items-center gap-[10px]">
            <span className="h-px w-[20px] bg-[#dbe1e9]" />

            <span className="text-[11px] font-bold uppercase tracking-[-0.01em] text-[#96A4B5]">
              Built Around Modern Web Auditing
            </span>
          </div>

          <div className="overflow-hidden rounded-[8px] border border-[#DDE2EA] bg-white">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {[
                {
                  icon: Layers,
                  label: "Next.js",
                },
                {
                  icon: Code2,
                  label: "React",
                },
                {
                  icon: Database,
                  label: "MongoDB",
                },
                {
                  icon: Gauge,
                  label: "Google PageSpeed Insights",
                },
                {
                  icon: Sparkles,
                  label: "Groq AI",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`flex h-[52px] items-center justify-center gap-[8px] border-[#d8dee8] px-[12px] text-[13px] font-bold text-[#0B1020] ${
                      index < 4 ? "lg:border-r" : ""
                    } ${index < 3 ? "border-b" : ""} sm:border-b-0 ${
                      index === 0 || index === 2 ? "sm:border-r" : ""
                    }`}
                  >
                    <Icon className="h-[13px] w-[13px] text-[#657187]" />

                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-[29px] text-[10px] leading-[1.6] text-[#96A4B5] sm:text-xs">
          Technology integrations support the audit workflow; results depend on
          available source data and page accessibility.
        </p>
      </div>
    </section>
  );
}
