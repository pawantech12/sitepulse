"use client";

import { useState } from "react";
import { FileText, GitBranch, Globe, ScanSearch, Upload } from "lucide-react";

export default function HowItWorksSection() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");

  const steps = [
    {
      number: "01",
      label: "INPUT",
      icon: Upload,
      active: false,
      title: "Website URL",
      description: "Submit the public website you want to analyze.",
      type: "input",
    },
    {
      number: "02",
      label: "DISCOVERY",
      icon: GitBranch,
      active: true,
      title: "Page Discovery",
      description: "Find supported internal pages and organize the crawl.",
      type: "discovery",
    },
    {
      number: "03",
      label: "ANALYSIS",
      icon: ScanSearch,
      active: false,
      title: "Run Audit Checks",
      description:
        "Evaluate performance, SEO, accessibility, and best-practice signals.",
      type: "analysis",
    },
    {
      number: "04",
      label: "REPORT",
      icon: FileText,
      active: false,
      title: "Generate Insights",
      description:
        "Review website-wide findings, page-level details, and AI-assisted recommendations.",
      type: "report",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = url.trim();

    if (!value) return;

    setSubmittedUrl(value);
  };

  return (
    <section
      id="how-it-works"
      className="w-full overflow-hidden bg-[#f7f8fa] font-sans text-[#0b1020]"
    >
      <div className="mx-auto max-w-[1220px] px-5 pb-[80px] pt-[82px] sm:px-8 lg:px-0 lg:pb-[86px] lg:pt-[96px]">
        <div className="grid gap-[38px] lg:grid-cols-[1.55fr_1fr] lg:gap-[110px]">
          <div>
            <div className="mb-[21px] flex items-center gap-[10px]">
              <span className="h-px w-[20px] bg-[#dbe1e9]" />
              <span className="text-[9px] font-bold uppercase tracking-[-0.01em] text-[#96A4B5] sm:text-[11px]">
                The Audit Workflow
              </span>
            </div>

            <h2 className="max-w-[650px] text-[42px] font-bold leading-[52px] tracking-[-0.045em] text-[#0B1020] sm:text-[50px] lg:text-[52px]">
              From URL to Evidence.
            </h2>
          </div>

          <div className="max-w-[440px]">
            <p className="text-[15px] font-normal leading-[26px] tracking-[-0.01em] text-[#596273] sm:text-[16px]">
              Follow the audit as SitePulse discovers pages, processes checks,
              and builds the information behind your final report.
            </p>
          </div>
        </div>

        <div className="mt-[59px] grid gap-[36px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[80px]">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">
                <div className="mb-[19px] flex h-[26px] items-center gap-[10px]">
                  <span
                    className={`flex  items-center justify-center rounded-[4px] px-3 py-1 text-[11px] font-bold ${
                      step.active
                        ? "bg-[#316df6] text-white"
                        : "bg-[#0B1020] text-white"
                    }`}
                  >
                    {step.number}
                  </span>

                  <div
                    className={`flex items-center gap-[7px] text-[11px] font-bold uppercase ${
                      step.active ? "text-[#316df6]" : "text-[#687386]"
                    }`}
                  >
                    <Icon className="h-[12px] w-[12px]" />
                    <span>{step.label}</span>
                  </div>
                </div>

                <div
                  className={`rounded-[8px] border  bg-[#ffffff] p-5 transition-all duration-200 ${
                    step.active
                      ? "border-[#2f6df6] shadow-[0_8px_30px_rgba(47,109,246,0.04)]"
                      : "border-[#DDE2EA]"
                  }`}
                >
                  <h3 className="text-[15px] font-bold leading-[1.25] tracking-[-0.025em] text-[#0B1020] sm:text-[16px]">
                    {step.title}
                  </h3>

                  <p className="mt-[5px] max-w-[245px] text-[11px] leading-[20px] text-[#596273] sm:text-[13px]">
                    {step.description}
                  </p>

                  {step.type === "input" && (
                    <form onSubmit={handleSubmit} className="mt-[13px]">
                      <div
                        className={`flex h-[40px] items-center rounded-[6px] border bg-[#F7F8FA] px-[12px] transition-colors ${
                          url ? "border-[#b9cbed]" : "border-[#DDE2EA]"
                        }`}
                      >
                        <Globe className="mr-[8px] h-[12px] w-[12px] shrink-0 text-[#96A4B5]" />

                        <input
                          type="url"
                          value={url}
                          onChange={(event) => setUrl(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleSubmit(event);
                            }
                          }}
                          placeholder="https://yourwebsite.com"
                          aria-label="Website URL"
                          className="min-w-0 flex-1 bg-transparent text-[12px] text-[#B0BCCC] outline-none placeholder:text-[#B0BCCC]"
                        />
                      </div>
                    </form>
                  )}

                  {step.type === "discovery" && (
                    <div className="mt-[14px]">
                      <div className="mb-[5px] flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#96A4B5]">
                          Crawling
                        </span>

                        <span className="text-[10px] font-bold text-[#2B6AFF]">
                          {submittedUrl ? "14 found" : "14 found"}
                        </span>
                      </div>

                      <div className="h-[3px] overflow-hidden rounded-full bg-[#EEF2FF]">
                        <div className="h-full w-[82%] rounded-full bg-[#2B6AFF]" />
                      </div>
                    </div>
                  )}

                  {step.type === "analysis" && (
                    <div className="mt-[13px]">
                      <div className="flex items-end justify-between">
                        {[
                          {
                            label: "Perf",
                            color: "#18b987",
                          },
                          {
                            label: "SEO",
                            color: "#18b987",
                          },
                          {
                            label: "A11y",
                            color: "#f2a900",
                          },
                          {
                            label: "BP",
                            color: "#d9e0ea",
                          },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex min-w-[29px] flex-col items-center gap-[5px]"
                          >
                            <span
                              className="h-[6px] w-[6px] rounded-full"
                              style={{
                                backgroundColor: item.color,
                              }}
                            />

                            <span
                              className={`text-[11px] font-medium ${
                                item.label === "BP"
                                  ? "text-[#C8D1DC]"
                                  : "text-[#596273]"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.type === "report" && (
                    <div className="mt-[12px] flex items-center justify-between">
                      <div className="flex items-center gap-[8px]">
                        <div
                          className="relative flex h-[28px] w-[28px] items-center justify-center rounded-full"
                          style={{
                            background:
                              "conic-gradient(#356df6 0deg 310deg, #dce5f5 310deg 360deg)",
                          }}
                        >
                          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
                            <span className="text-[7px] font-bold text-[#0B1020]">
                              86
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-medium text-[#596273]">
                          Overall Score
                        </span>
                      </div>

                      <span className="rounded-[4px] border border-[#F5E4B0] bg-[#FFF9F0] px-[10px] py-[3px] text-[11px] font-bold text-[#B45309]">
                        23 findings
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
