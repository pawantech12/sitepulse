"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  CircleDot,
  Clock3,
  Code2,
  Globe2,
  Layers3,
  Radio,
  Search,
  Server,
} from "lucide-react";
import { Lock } from "lucide-react";

export default function ScanningSection() {
  const [progress, setProgress] = useState(68);
  const [elapsed, setElapsed] = useState(18);
  const [activePage, setActivePage] = useState(2);
  const [isScanning, setIsScanning] = useState(true);

  const pages = useMemo(
    () => [
      { path: "/", status: "complete" },
      { path: "/about", status: "complete" },
      { path: "/services", status: "analyzing" },
      { path: "/contact", status: "queued" },
      { path: "/blog", status: "queued" },
    ],
    [],
  );

  const logs = useMemo(
    () => [
      {
        time: "17:42:03",
        text: "URL validated",
        type: "normal",
      },
      {
        time: "17:42:05",
        text: "Crawl initialized",
        type: "normal",
      },
      {
        time: "17:42:09",
        text: "24 internal URLs discovered",
        type: "blue",
        badge: "24",
      },
      {
        time: "17:42:14",
        text: "Performance check completed",
        type: "green",
        badge: "done",
      },
      {
        time: "17:42:18",
        text: "SEO analysis started",
        type: "active",
      },
    ],
    [],
  );

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setElapsed((value) => value + 1);

      setProgress((value) => {
        if (value >= 100) {
          setIsScanning(false);
          return 100;
        }

        return Math.min(value + 1, 100);
      });

      setActivePage((value) => {
        if (value >= pages.length - 1) return value;
        return value + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isScanning, pages.length]);

  const completedPages = Math.min(
    Math.max(Math.round((progress / 100) * 24), 1),
    24,
  );

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(
      2,
      "0",
    )}`;
  };

  const handleToggleScan = () => {
    setIsScanning((value) => !value);
  };

  const getPageState = (index) => {
    if (index < activePage) return "complete";
    if (index === activePage && isScanning) return "analyzing";
    return "queued";
  };

  return (
    <section
      id="live-audit"
      className="w-full overflow-hidden bg-[#080d1d] font-sans text-white"
    >
      <div className="mx-auto max-w-[1220px] px-5 py-[72px] sm:px-8 sm:py-[80px] lg:px-0 ">
        <div className="grid items-center gap-[48px] lg:grid-cols-[0.82fr_1.28fr] lg:gap-[72px]">
          <div className="max-w-[455px] flex flex-col gap-9">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-[9px]">
                <span className="h-[5px] w-[5px] rounded-full bg-[#2f6df6]" />
                <span className="text-[9px] font-bold uppercase tracking-[-0.01em] text-[#3A4E68] sm:text-[11px]">
                  Live Audit Activity
                </span>
              </div>

              <h2 className="max-w-[420px] text-[38px] font-bold leading-[41px] tracking-[-0.045em] text-[#f7f9ff] ">
                Know What Is
                <br />
                Happening
                <br />
                While Your Site Is
                <br />
                <span className="text-[#2B6AFF]">Being Scanned.</span>
              </h2>

              <p className=" max-w-[430px] text-[14px] leading-[24px] tracking-[-0.005em] text-[#596273] sm:text-[15px]">
                SitePulse exposes crawl progress, page status, and scan activity
                instead of hiding the audit behind a loading screen.
              </p>
            </div>

            <div className="border-t border-[#1d2a40]">
              <div className="flex items-center gap-[12px] border-b border-[#1E2A40] py-5">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] bg-[#132040]">
                  <Radio className="h-[13px] w-[13px] text-[#2B6AFF]" />
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase text-[#8FA6BF]">
                    Live Progress
                  </div>
                  <p className="mt-[3px] text-[13px] text-[#3A4E68]">
                    Track overall crawl completion in real time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[12px] border-b border-[#1E2A40] py-5">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] bg-[#132040]">
                  <Layers3 className="h-[14px] w-[14px] text-[#2B6AFF]" />
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase text-[#8FA6BF]">
                    Page Status
                  </div>
                  <p className="mt-[3px] text-[13px] text-[#3A4E68]">
                    See which pages are queued, analyzing, or complete.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[12px] py-5">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[6px] bg-[#132040]">
                  <Code2 className="h-[13px] w-[13px] text-[#2B6AFF]" />
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase text-[#8FA6BF]">
                    Scan Logs
                  </div>
                  <p className="mt-[3px] text-[13px] text-[#3A4E68]">
                    Follow detailed audit events as they happen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-[13px] flex items-center justify-center gap-[10px]">
              <span className="h-px w-[31px] bg-[#2A3D58]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.01em] text-[#2A3D58]">
                Illustrative Scan State
              </span>
              <span className="h-px w-[31px] bg-[#2A3D58]" />
            </div>

            <div className="overflow-hidden rounded-[9px] border border-[#1E2A40] bg-[#080d18] shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
              <div className="flex h-[39px] items-center justify-between border-b border-[#1E2A40] px-[13px] bg-[#0B1020]">
                <div className="flex items-center gap-[6px]">
                  <span className="h-[8px] w-[8px] rounded-full bg-[#9e3037]" />
                  <span className="h-[8px] w-[8px] rounded-full bg-[#b37b1b]" />
                  <span className="h-[8px] w-[8px] rounded-full bg-[#16805d]" />

                  <div className="ml-[7px] flex h-[20px] w-[205px] items-center gap-[6px] rounded-[4px] border border-[#1E2A40] bg-[#0b1322] px-[10px] sm:w-[208px]">
                    <Lock className="h-[9px] w-[9px] text-[#2A3D58]" />
                    <span className="truncate text-[10px] text-[#2A3D58]">
                      app.sitepulse / audit / example.com
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleToggleScan}
                  className={`flex h-[20px] items-center gap-[6px] rounded-full border px-[10px] text-[8px] font-semibold uppercase transition-colors ${
                    isScanning
                      ? "border-[#1d4c9c] bg-[#0b2146] text-[#2870ff]"
                      : "border-[#31405a] bg-[#101827] text-[#687992]"
                  }`}
                >
                  <span
                    className={`h-[5px] w-[5px] rounded-full ${
                      isScanning ? "bg-[#2870ff]" : "bg-[#65748b]"
                    }`}
                  />
                  {isScanning ? "Scanning" : "Paused"}
                </button>
              </div>

              <div className="px-[19px] pb-[19px] pt-[17px] sm:px-[19px]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[8px] font-medium uppercase text-[#344761]">
                      SitePulse Audit
                    </div>

                    <div className="mt-[4px] text-[17px] font-bold tracking-[-0.02em] text-[#f2f5fb]">
                      example.com
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleScan}
                    className="flex h-[22px] items-center gap-[6px] rounded-full border border-[#1d4b93] bg-[#0b2147] px-[11px] text-[8px] font-semibold uppercase text-[#2870ff]"
                  >
                    <span className="h-[6px] w-[6px] rounded-full bg-[#2870ff]" />
                    {isScanning ? "Scanning" : "Paused"}
                  </button>
                </div>

                <div className="mt-[18px]">
                  <div className="h-[4px] overflow-hidden rounded-full bg-[#1E2A40]">
                    <div
                      className="h-full rounded-full bg-[#2B6AFF] transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-[5px] flex items-center justify-between text-[11px] text-[#3A4E68]">
                    <span>{progress}% complete</span>
                    <span>{formatTime(elapsed)} elapsed</span>
                  </div>
                </div>

                <div className="mt-[17px] grid grid-cols-2 gap-[1px] overflow-hidden rounded-[7px] border border-[#1c2b43] bg-[#1c2b43] sm:grid-cols-4">
                  <div className="flex px-3 py-[14px] flex-col gap-1 items-center justify-center bg-[#080d18]">
                    <span className="text-[10px] font-bold uppercase text-[#2A3D58]">
                      Progress
                    </span>
                    <span className="text-[22px] font-bold leading-none tracking-[-0.04em] text-[#2870ff]">
                      {progress}%
                    </span>
                  </div>

                  <div className="flex px-3 py-[14px] flex-col gap-1 items-center justify-center bg-[#080d18]">
                    <span className="text-[10px] font-bold uppercase text-[#2A3D58]">
                      Pages
                    </span>
                    <span className="text-[22px] font-bold leading-none tracking-[-0.04em] text-[#eef2f9]">
                      {completedPages} / 24
                    </span>
                  </div>

                  <div className="flex px-3 py-[14px] flex-col gap-1 items-center justify-center bg-[#080d18]">
                    <span className="text-[10px] font-bold uppercase text-[#2A3D58]">
                      Issues
                    </span>
                    <span className="text-[22px] font-bold leading-none tracking-[-0.04em] text-[#f2a900]">
                      12
                    </span>
                  </div>

                  <div className="flex px-3 py-[14px] flex-col gap-1 items-center justify-center bg-[#080d18]">
                    <span className="text-[10px] font-bold uppercase text-[#2A3D58]">
                      Time
                    </span>
                    <span className="text-[22px] font-bold leading-none tracking-[-0.04em] text-[#eef2f9]">
                      {formatTime(elapsed)}
                    </span>
                  </div>
                </div>

                <div className="mt-[17px]">
                  <div className="mb-[7px] flex items-center justify-between">
                    <div className="flex items-center gap-[6px]">
                      <Layers3 className="h-[10px] w-[10px] text-[#3A4E68]" />
                      <span className="text-[10px] font-bold uppercase text-[#3A4E68]">
                        Discovered Pages
                      </span>
                    </div>

                    <span className="text-[10px] text-[#3A4E68]">24 total</span>
                  </div>

                  <div className="overflow-hidden rounded-[6px] flex flex-col gap-[3px] ">
                    {pages.map((page, index) => {
                      const state = getPageState(index);

                      return (
                        <div
                          key={page.path}
                          className={`flex h-[34px] items-center justify-between border-b border-[#1E2A40] px-[10px] last:border-b-0 ${
                            state === "analyzing" ? "bg-[#0d1a31]" : ""
                          }`}
                        >
                          <div className="flex items-center gap-[9px]">
                            <span
                              className={`h-[5px] w-[5px] rounded-full ${
                                state === "complete"
                                  ? "bg-[#18b987]"
                                  : state === "analyzing"
                                    ? "bg-[#286cff]"
                                    : "bg-[#26364f]"
                              }`}
                            />

                            <span
                              className={`text-[12px] font-bold ${
                                state === "queued"
                                  ? "text-[#3A4E68]"
                                  : "text-[#C8D8E8]"
                              }`}
                            >
                              {page.path}
                            </span>
                          </div>

                          {state === "complete" && (
                            <span className="rounded-full bg-[#0A2A1A] px-[8px] py-[2px] text-[9px] font-bold uppercase text-[#10B981]">
                              Complete
                            </span>
                          )}

                          {state === "analyzing" && (
                            <span className="flex items-center gap-[5px] rounded-full border border-[#1A3A6E] bg-[#0D1D36] px-[8px] py-[2px] text-[9px] font-bold uppercase text-[#2B6AFF]">
                              <Search className="h-[8px] w-[8px]" />
                              Analyzing
                            </span>
                          )}

                          {state === "queued" && (
                            <span className="text-[9px] font-bold uppercase text-[#2A3D58]">
                              Queued
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-[17px]">
                  <div className="mb-[7px] flex items-center justify-between">
                    <div className="flex items-center gap-[6px]">
                      <Activity className="h-[10px] w-[10px] text-[#3A4E68]" />
                      <span className="text-[10px] font-bold uppercase text-[#3A4E68]">
                        Live Scan Log
                      </span>
                    </div>

                    <div className="flex items-center gap-[5px] text-[10px] font-bold uppercase text-[#EF4444]">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#EF4444]" />
                      Live
                    </div>
                  </div>

                  <div className="rounded-[6px] border border-[#1A2236] p-[12px] bg-[#090D18]">
                    {logs.map((log, index) => (
                      <div
                        key={`${log.time}-${log.text}`}
                        className={`flex items-center py-2  ${
                          index === logs.length - 1 ? "opacity-80" : ""
                        }`}
                      >
                        <span className="w-[57px] shrink-0 text-[8px] text-[#30435e]">
                          {log.time}
                        </span>

                        <span className="mr-[10px] h-[13px] w-px bg-[#24344d]" />

                        {log.type === "active" && (
                          <span className="mr-[7px] h-[11px] w-[5px] rounded-[1px] bg-[#286cff]" />
                        )}

                        <span
                          className={`min-w-0 text-[9px] ${
                            log.type === "green"
                              ? "text-[#16b985]"
                              : log.type === "blue"
                                ? "text-[#2870ff]"
                                : log.type === "active"
                                  ? "text-[#405474]"
                                  : "text-[#52647f]"
                          }`}
                        >
                          {log.text}
                        </span>

                        {log.badge && (
                          <span
                            className={`ml-[7px] rounded-[3px] px-[6px] py-[2px] text-[7px] font-semibold ${
                              log.type === "green"
                                ? "bg-[#073a27] text-[#18b987]"
                                : "bg-[#0b2149] text-[#2870ff]"
                            }`}
                          >
                            {log.badge}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
