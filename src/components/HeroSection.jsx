"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ChevronRight,
  CircleHelp,
  Download,
  FileText,
  Globe,
  Grid2X2,
  Lock,
  MoreHorizontal,
  RefreshCw,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Layers } from "lucide-react";

export default function HeroSection() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const metrics = [
    {
      name: "Performance",
      score: 91,
      icon: Zap,
      iconClass: "#f5b400",
    },
    {
      name: "SEO",
      score: 88,
      icon: Search,
      iconClass: "#2f6df6",
    },
    {
      name: "Accessibility",
      score: 82,
      icon: ShieldCheck,
      iconClass: "#20b889",
    },
    {
      name: "Best Practices",
      score: 85,
      icon: ShieldCheck,
      iconClass: "#8b5cf6",
    },
  ];

  const pages = [
    {
      path: "/",
      name: "Homepage",
      time: "1.2s",
      score: 95,
      status: "good",
    },
    {
      path: "/about",
      name: "About Us",
      time: "0.9s",
      score: 91,
      status: "good",
    },
    {
      path: "/services",
      name: "Services",
      time: "1.8s",
      score: 78,
      status: "warning",
    },
    {
      path: "/contact",
      name: "Contact",
      time: "0.7s",
      score: 89,
      status: "good",
    },
  ];

  const findings = [
    {
      level: "MED",
      title: "Missing image alternative text",
    },
    {
      level: "LOW",
      title: "Meta description missing",
    },
    {
      level: "MED",
      title: "Render-blocking resource",
    },
    {
      level: "LOW",
      title: "Unused JavaScript detected",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = url.trim();

    if (!value) {
      setError("Enter a website URL to continue.");
      return;
    }

    const normalizedUrl = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;

    try {
      const parsedUrl = new URL(normalizedUrl);

      if (
        !["http:", "https:"].includes(parsedUrl.protocol) ||
        !parsedUrl.hostname.includes(".")
      ) {
        throw new Error("Invalid URL");
      }

      setError("");

      window.location.href = `/analyze?url=${encodeURIComponent(
        normalizedUrl,
      )}`;
    } catch {
      setError("Please enter a valid website URL.");
    }
  };

  return (
    <section className="w-full overflow-hidden bg-[#f8f9fb] font-sans">
      <div className="relative bg-[#f8f9fb]">
        <div className="mx-auto max-w-[1220px] px-5 pb-[18px] pt-[70px] sm:px-8 lg:px-0 lg:pt-32">
          <div className="max-w-[720px] flex flex-col gap-5">
            <div className="flex items-center gap-[10px]">
              <span className="h-px w-[20px] bg-[#4b82ff]" />

              <span className="text-[9px] font-bold uppercase tracking-[-0.01em] leading-[13px] text-[#2B6AFF] sm:text-[11px]">
                Website Intelligence Platform
              </span>
            </div>

            <h1 className="max-w-[720px] text-[43px] font-bold leading-[70px] tracking-[-0.045em] text-[#0B1020] sm:text-[56px] lg:text-[70px]">
              See What Your Website
              <br />
              Is Really
              <span className="relative ml-[3px] inline-block text-[#2B6AFF]">
                Doing.
                <span className="absolute bottom-[-7px] left-0 h-[2px] w-[82px] bg-[#2B6AFF]" />
              </span>
            </h1>

            <p className="max-w-[590px] text-[14px] leading-[28px] tracking-[-0.01em] text-[#687386] sm:text-[15px] lg:text-[17px]">
              SitePulse crawls your website, evaluates performance, SEO,
              accessibility, and best-practice signals, then turns the findings
              into clear page-level insights you can act on immediately.
            </p>
          </div>

          <div className="mt-5">
            <div className="overflow-hidden rounded-[9px] border border-[#d9dee7] bg-white shadow-[0_5px_22px_rgba(15,23,42,0.06)]">
              <div className="flex min-h-[63px] items-center justify-between border-b border-[#e2e6ec] px-[16px] sm:px-[19px]">
                <div className="flex items-center gap-[7px]">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#2f6df6]" />

                  <span className="text-[9px] font-bold uppercase leading-[13px] tracking-[-0.01em] text-[#2f6df6] sm:text-[11px]">
                    Start a new audit
                  </span>
                </div>

                <span className="hidden text-xs text-[#96A4B5] sm:block">
                  Free for public websites
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[10px] px-[16px] py-[10px] sm:flex-row sm:px-[19px]"
              >
                <div className="relative min-w-0 flex-1">
                  <Globe className="absolute left-[13px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#aab6c7]" />

                  <input
                    value={url}
                    onChange={(event) => {
                      setUrl(event.target.value);
                      if (error) setError("");
                    }}
                    type="text"
                    inputMode="url"
                    placeholder="https://yourwebsite.com"
                    aria-label="Website URL"
                    aria-invalid={Boolean(error)}
                    className="h-[52px] w-full rounded-[8px] border border-[#DDE2EA] bg-[#F7F8FA] pl-[36px] pr-[14px] text-[15px] text-[#4B5563] outline-none transition-all placeholder:text-[#a7b3c3] focus:border-[#2f6df6] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="group flex h-[52px] shrink-0 items-center justify-center gap-[9px] rounded-[7px] bg-[#0B1020] px-[24px] text-[15px] font-bold text-white transition-all hover:bg-[#151b2c] active:scale-[0.99] sm:min-w-[190px]"
                >
                  Analyze Website
                  <ChevronRight className="h-[14px] w-[14px] transition-transform group-hover:translate-x-[2px]" />
                </button>
              </form>

              {error && (
                <p className="px-[19px] pb-3 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <div className="flex flex-col justify-between gap-[8px] px-[16px] pb-[14px] pt-[7px] text-[9px] text-[#96A4B5] sm:flex-row sm:px-[19px] sm:text-xs">
                <span>
                  Public website · Page discovery · Performance · SEO ·
                  Accessibility
                </span>

                <span className="flex items-center gap-[4px]">
                  <Zap className="h-[10px] w-[10px]" />
                  Powered by PageSpeed Insights
                </span>
              </div>

              {error && (
                <div className="px-[19px] pb-[12px] text-xs  text-red-500">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-[#0B1020]">
        <div className="mx-auto max-w-[1220px] px-5 pb-[55px] pt-[27px] sm:px-8 lg:px-0">
          <div className="mb-[20px] flex items-center justify-center gap-[10px]">
            <span className="h-px w-[34px] bg-[#202a43]" />

            <span className="text-[8px] font-medium uppercase leading-[13px] tracking-[0.02em] text-[#5d6b88] sm:text-[11px]">
              Illustrative product preview — sample values only
            </span>

            <span className="h-px w-[34px] bg-[#202a43]" />
          </div>

          <div className="overflow-hidden rounded-[9px] border border-[#1E2A40]  shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
            <div className="flex h-[41px] items-center justify-between border-b border-[#1d2942] px-[14px]">
              <div className="flex min-w-0 items-center gap-[7px]">
                <span className="h-[9px] w-[9px] rounded-full bg-[#c23e47]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#ba8618]" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#257b50]" />

                <div className="ml-[5px] flex px-[12px] py-1 min-w-0 items-center gap-[7px] rounded-[4px] border border-[#202d47] ">
                  <Lock className="h-[11px] w-[11px] text-[#3A4E68]" />

                  <span className="truncate text-[11px] text-[#3A4E68]">
                    app.sitepulse.io/audit/example.com
                  </span>
                </div>
              </div>

              <div className="hidden items-center gap-[13px] text-[#445370] sm:flex">
                <RefreshCw className="h-[12px] w-[12px]" />
                <Grid2X2 className="h-[12px] w-[12px]" />
                <MoreHorizontal className="h-[13px] w-[13px]" />
              </div>
            </div>

            <div className="grid min-h-[610px] grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)]">
              <aside className="hidden border-r border-[#1d2942] bg-[#080d1a] lg:block">
                <div className="px-[15px] pt-[19px]">
                  <div className="text-[13px] font-bold tracking-[-0.02em] text-white">
                    SITEPULSE
                  </div>

                  <div className="mt-[2px] text-[11px] text-[#3A4E68]">
                    Audit Platform
                  </div>
                </div>

                <nav className="mt-[19px] space-y-[4px] px-[14px]">
                  <div className="flex h-[36px] items-center gap-[9px] rounded-[5px] bg-[#172958] px-[10px] text-[13px] font-bold text-white">
                    <Activity className="h-[11px] w-[11px]" />

                    <span>Audit</span>

                    <span className="ml-auto h-[4px] w-[4px] rounded-full bg-[#2f6df6]" />
                  </div>

                  <div className="flex h-[36px] items-center gap-[9px] rounded-[5px] px-[10px] text-[13px] font-medium text-[#3A4E68] transition-colors hover:bg-[#101a2d] hover:text-[#7182a0]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-[11px] w-[11px]"
                    >
                      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
                      <path d="m4 12 8 4 8-4" />
                      <path d="m4 17 8 4 8-4" />
                    </svg>

                    <span>Pages</span>
                  </div>

                  <div className="flex h-[36px] items-center gap-[9px] rounded-[5px] px-[10px] text-[13px] font-medium text-[#3A4E68] transition-colors hover:bg-[#101a2d] hover:text-[#7182a0]">
                    <AlertTriangle className="h-[11px] w-[11px]" />
                    <span>Issues</span>
                  </div>

                  <div className="flex h-[36px] items-center gap-[9px] rounded-[5px] px-[10px] text-[13px] font-medium text-[#3A4E68] transition-colors hover:bg-[#101a2d] hover:text-[#7182a0]">
                    <FileText className="h-[11px] w-[11px]" />
                    <span>Reports</span>
                  </div>

                  <div className="flex h-[36px] items-center gap-[9px] rounded-[5px] px-[10px] text-[13px] font-medium text-[#3A4E68] transition-colors hover:bg-[#101a2d] hover:text-[#7182a0]">
                    <Settings className="h-[11px] w-[11px]" />
                    <span>Settings</span>
                  </div>
                </nav>

                <div className="mx-[14px] mt-[19px] border-t border-[#1d2942] pt-[16px] flex flex-col gap-[6px]">
                  <div className="text-[10px] uppercase text-[#2A3D58] font-bold">
                    Current Audit
                  </div>

                  <div className=" text-[12px] font-medium text-[#5B7EA6]">
                    example.com
                  </div>

                  <div className=" text-[11px] text-[#2A3D58]">
                    Started 2 min ago
                  </div>

                  <div className=" inline-flex items-center gap-[5px] rounded-full w-fit bg-[#0C2A4A] px-[10px] py-[4px] text-[10px] font-bold text-[#10B981]">
                    <span className="h-[4px] w-[4px] rounded-full bg-[#10B981]" />
                    COMPLETED
                  </div>
                </div>
              </aside>

              <main className="min-w-0 bg-[#0c1221] px-[13px] py-[18px] sm:px-[20px] sm:py-[22px] lg:px-[25px] lg:py-[28px]">
                <div className="flex flex-col justify-between gap-[15px] sm:flex-row sm:items-end">
                  <div>
                    <div className="text-[11px] uppercase font-bold text-[#3A4E68]">
                      Website Audit
                    </div>

                    <div className="mt-[5px] flex flex-wrap items-center gap-[9px]">
                      <h2 className="text-[24px] font-bold leading-[28px] tracking-[-0.03em] text-white">
                        example.com
                      </h2>

                      <span className="inline-flex items-center gap-[5px] rounded-full border border-[#134D2E] bg-[#0A2A1A] px-[12px] py-[4px] text-[10px] font-bold text-[#10B981]">
                        <span className="h-[4px] w-[4px] rounded-full bg-[#10B981]" />
                        COMPLETED
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-[7px]">
                    <button
                      type="button"
                      className="flex h-[32px] items-center gap-[6px] rounded-[6px] border border-[#1E2A40] bg-[#0F1523] px-[14px] text-[12px] font-medium text-[#3A4E68] transition-colors hover:border-[#344461] hover:text-[#7890b6]"
                    >
                      <Download className="h-[11px] w-[11px]" />
                      Export
                    </button>

                    <button
                      type="button"
                      className="flex h-[32px] items-center gap-[6px] rounded-[6px] border border-[#1E2A40] bg-[#0F1523] px-[14px] text-[12px] font-medium text-[#3A4E68] transition-colors hover:border-[#344461] hover:text-[#7890b6]"
                    >
                      <Share2 className="h-[11px] w-[11px]" />
                      Share
                    </button>
                  </div>
                </div>

                <div className="mt-[26px] overflow-hidden rounded-[7px] border border-[#24304a] bg-[#080d19]">
                  <div className="grid grid-cols-1 border-l-[2px] border-[#2f6df6] sm:grid-cols-[158px_minmax(0,1fr)]">
                    <div className="flex flex-col items-center justify-center border-b border-[#202c44] px-[15px] py-[20px] sm:border-b-0 sm:border-r">
                      <span className="text-[10px] uppercase font-bold text-[#3A4E68]">
                        Overall Score
                      </span>

                      <div className="relative mt-[11px] flex h-[77px] w-[77px] items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[6px] border-[#17243d]" />

                        <div className="absolute inset-0 -rotate-[22deg] rounded-full border-[6px] border-transparent border-r-[#2f6df6] border-t-[#2f6df6]" />

                        <div className="relative text-center">
                          <div className="text-[24px] font-bold leading-none text-white">
                            86
                          </div>

                          <div className="mt-[2px] text-[10px] text-[#3A4E68]">
                            /100
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-[15px] py-[17px] sm:px-[20px]">
                      <div className="mb-[14px] text-[10px] font-bold uppercase text-[#3A4E68]">
                        Category Breakdown
                      </div>

                      <div className="flex flex-col gap-[14px]">
                        {metrics.map((metric) => {
                          const Icon = metric.icon;

                          return (
                            <div
                              key={metric.name}
                              className="flex flex-col gap-[6px]"
                            >
                              <div className=" flex items-center justify-between">
                                <div className="flex min-w-0 items-center gap-[6px]">
                                  <Icon
                                    className={`h-[11px] w-[11px] shrink-0 `}
                                    style={{ color: metric.iconClass }}
                                  />

                                  <span className="truncate text-[13px] font-medium text-[#8FA6BF]">
                                    {metric.name}
                                  </span>
                                </div>
                                <span className="text-right text-[9px] font-semibold text-white">
                                  {metric.score}
                                </span>
                              </div>

                              <div className="h-[3px] overflow-hidden rounded-full bg-[#1E2A40]">
                                <div
                                  className={`h-full rounded-full`}
                                  style={{
                                    width: `${metric.score}%`,
                                    backgroundColor: metric.iconClass,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-[22px] grid gap-[13px] xl:grid-cols-[minmax(0,1.45fr)_minmax(290px,1fr)]">
                  <div className="rounded-[7px] border border-[#24304a] bg-[#080d19] p-[15px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[6px]">
                        <Layers className="h-[12px] w-[12px] text-[#2B6AFF]" />

                        <span className="text-[11px] font-bold uppercase text-[#8FA6BF]">
                          Page Discovery
                        </span>
                      </div>

                      <span className="rounded-full border border-[#1A3A6E] bg-[#0D1D36] px-[10px] py-[3px] text-[10px] font-bold text-[#2B6AFF]">
                        24 PAGES
                      </span>
                    </div>

                    <div className="mt-[13px] flex items-center justify-between text-[11px] text-[#3A4E68]">
                      <span>88% crawled</span>
                      <span>21 / 24 pages</span>
                    </div>

                    <div className="mt-[8px] h-[6px] overflow-hidden rounded-full bg-[#1E2A40]">
                      <div className="h-full w-[88%] rounded-full bg-[#2B6AFF]" />
                    </div>

                    <div className="mt-[13px] flex flex-col gap-1">
                      {pages.map((page) => (
                        <div
                          key={page.path}
                          className="grid grid-cols-[12px_minmax(0,1fr)_38px_30px] items-center gap-[6px] rounded-[5px] border border-[#1E2A40] bg-[#0b1220] px-[12px] py-[7px]"
                        >
                          <span
                            className={`h-[5px] w-[5px] rounded-full ${
                              page.status === "warning"
                                ? "bg-[#e6a900]"
                                : "bg-[#00bb78]"
                            }`}
                          />

                          <div className="min-w-0 truncate">
                            <span className="text-[12px] font-bold text-[#C8D8E8]">
                              {page.path}
                            </span>

                            <span className="ml-[7px] hidden text-[12px] text-[#3A4E68] sm:inline">
                              {page.name}
                            </span>
                          </div>

                          <span className="text-right text-[11px] text-[#3A4E68]">
                            {page.time}
                          </span>

                          <span
                            className={`rounded-[3px] px-[8px] py-[2px] text-center text-[11px] font-bold ${
                              page.status === "warning"
                                ? "bg-[#2A1A00] text-[#eeb000]"
                                : "bg-[#0A2A1A] text-[#F59E0B]"
                            }`}
                          >
                            {page.score}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-[9px] text-[11px] text-[#2A3D58]">
                      + 20 more pages
                    </div>
                  </div>

                  <div className="rounded-[7px] border border-[#24304a] bg-[#080d19] p-[15px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-[6px]">
                        <AlertTriangle className="h-[12px] w-[12px] text-[#F59E0B]" />

                        <span className="text-[11px] font-bold uppercase text-[#8FA6BF]">
                          Priority Findings
                        </span>
                      </div>

                      <span className="rounded-full border border-[#4A3000] bg-[#2A1A00] px-[10px] py-[3px] text-[10px] font-bold text-[#F59E0B]">
                        12 FINDINGS
                      </span>
                    </div>

                    <div className="mt-[13px] flex flex-col gap-[5px]">
                      {findings.map((finding, index) => (
                        <div
                          key={finding.title}
                          className="flex min-w-0 items-center gap-[7px] rounded-[5px] border border-[#1E2A40] bg-[#0b1220] px-[8px] py-[12px]"
                        >
                          <span className="w-[17px] shrink-0 text-[11px] font-bold text-[#2A3D58]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={`shrink-0 rounded-[3px] px-[8px] py-[2px] text-[10px] font-bold ${
                              finding.level === "MED"
                                ? "bg-[#2A1A00] text-[#F59E0B]"
                                : "bg-[#0D1D36] text-[#2B6AFF]"
                            }`}
                          >
                            {finding.level}
                          </span>

                          <span className="min-w-0 flex-1 truncate text-[12px] text-[#8FA6BF]">
                            {finding.title}
                          </span>

                          <ChevronRight className="h-[11px] w-[11px] shrink-0 text-[#2A3D58]" />
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="mt-[8px] flex h-[28px] w-full items-center justify-center gap-[5px] rounded-[5px] border border-[#1E2A40] text-[12px] font-medium text-[#3A4E68] transition-colors hover:bg-[#0d1627] hover:text-[#7184a3]"
                    >
                      View all 12 findings
                      <ChevronRight className="h-[9px] w-[9px]" />
                    </button>
                  </div>
                </div>
              </main>
            </div>

            <div className="grid grid-cols-2 border-t border-[#1d2942] bg-[#080d1a] sm:grid-cols-3 lg:grid-cols-6">
              <div className="flex h-[49px] items-center justify-center gap-[7px] border-b border-[#1d2942] px-[10px] text-[13px] font-medium text-[#3A4E68] sm:border-r">
                <Zap className="h-[10px] w-[10px]" />
                <span>Website Performance</span>
              </div>

              <div className="flex h-[49px] items-center justify-center gap-[7px] border-b border-[#1d2942] px-[10px] text-[13px] font-medium text-[#3A4E68] sm:border-r">
                <Search className="h-[10px] w-[10px]" />
                <span>SEO</span>
              </div>

              <div className="flex h-[49px] items-center justify-center gap-[7px] border-b border-[#1d2942] px-[10px] text-[13px] font-medium text-[#3A4E68] sm:border-r">
                <ShieldCheck className="h-[10px] w-[10px]" />
                <span>Accessibility</span>
              </div>

              <div className="flex h-[49px] items-center justify-center gap-[7px] border-b border-[#1d2942] px-[10px] text-[13px] font-medium text-[#3A4E68] sm:border-r">
                <ShieldCheck className="h-[10px] w-[10px]" />
                <span>Best Practices</span>
              </div>

              <div className="flex h-[49px] items-center justify-center gap-[7px] border-b border-[#1d2942] px-[10px] text-[13px] font-medium text-[#3A4E68] sm:border-r">
                <CircleHelp className="h-[10px] w-[10px]" />
                <span>Core Web Vitals</span>
              </div>

              <div className="flex h-[49px] items-center justify-center gap-[7px] border-b border-[#1d2942] px-[10px] text-[13px] font-medium text-[#3A4E68]">
                <Sparkles className="h-[10px] w-[10px]" />
                <span>AI Recommendations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
