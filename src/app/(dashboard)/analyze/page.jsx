"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronRight,
  Globe,
  Loader2,
  SearchCheck,
  Sparkles,
  ShieldCheck,
  Activity,
  Clock3,
  XCircle,
  Circle,
} from "lucide-react";
import { List } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { Clock } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AnalyzePage() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanId, setScanId] = useState(null);
  const [scanDuration, setScanDuration] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [logsOpen, setLogsOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [liveLogs, setLiveLogs] = useState([]);
  const [isStartingScan, setIsStartingScan] = useState(false);

  const [scanData, setScanData] = useState(null);

  const searchParams = useSearchParams();
  const initialUrl = searchParams.get("url");
  const hasAutoStartedRef = useRef(false);

  useEffect(() => {
    if (!initialUrl || hasAutoStartedRef.current) return;

    let normalizedUrl;

    try {
      normalizedUrl = /^https?:\/\//i.test(initialUrl.trim())
        ? initialUrl.trim()
        : `https://${initialUrl.trim()}`;

      const parsedUrl = new URL(normalizedUrl);

      if (
        !["http:", "https:"].includes(parsedUrl.protocol) ||
        !parsedUrl.hostname.includes(".")
      ) {
        return;
      }
    } catch {
      return;
    }

    hasAutoStartedRef.current = true;
    setUrl(normalizedUrl);

    handleAnalyze(normalizedUrl);
  }, [initialUrl]);

  const logPollingRef = useRef(null);
  const statusPollingRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (logPollingRef.current) {
        clearInterval(logPollingRef.current);
      }

      if (statusPollingRef.current) {
        clearInterval(statusPollingRef.current);
      }
    };
  }, []);

  const handleAnalyze = async (eventOrUrl) => {
    if (typeof eventOrUrl !== "string") {
      eventOrUrl?.preventDefault();
    }

    const targetUrl = (
      typeof eventOrUrl === "string" ? eventOrUrl : url
    ).trim();

    if (!targetUrl || isAnalyzing || isStartingScan) return;
    try {
      if (logPollingRef.current) {
        clearInterval(logPollingRef.current);
        logPollingRef.current = null;
      }

      if (statusPollingRef.current) {
        clearInterval(statusPollingRef.current);
        statusPollingRef.current = null;
      }

      // Reset previous scan data.
      setLogs([]);
      setLiveLogs([]);
      setCompleted(false);
      setProgress(0);
      setScanId(null);
      setScanDuration(null);
      setTotalPages(null);
      setScanData(null);

      // Hide the analysis dashboard while initializing.
      setIsAnalyzing(false);
      setIsStartingScan(true);
      setUrl(targetUrl);

      // setLogs([
      //   "Initializing crawler...",
      //   "Connecting to website...",
      //   "Extracting internal links...",
      //   "Starting Lighthouse analysis...",
      // ]);

      const response = await axios.post("/api/scan", {
        url: targetUrl,
      });

      if (!response.data.success || !response.data.scanId) {
        throw new Error("Failed to start scan");
      }

      const currentScanId = response.data.scanId;

      setScanId(currentScanId);

      // The scan was accepted. Begin displaying the dashboard.
      setIsAnalyzing(true);
      setIsStartingScan(false);

      setLogs([
        "Initializing crawler...",
        "Connecting to website...",
        "Extracting internal links...",
      ]);

      startLogPolling(currentScanId);
      startStatusPolling(currentScanId);
    } catch (error) {
      console.error("Failed to start scan:", error);

      setIsAnalyzing(false);
      setIsStartingScan(false);
      setProgress(0);

      setLogs((prev) => [
        ...prev,
        "Something went wrong while analyzing website",
      ]);
    }
  };

  const startLogPolling = (currentScanId) => {
    if (logPollingRef.current) {
      clearInterval(logPollingRef.current);
    }

    logPollingRef.current = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/scan-logs/${currentScanId}`);

        if (data.success) {
          setLiveLogs(data.logs);
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };

  const startStatusPolling = (currentScanId) => {
    if (statusPollingRef.current) {
      clearInterval(statusPollingRef.current);
    }

    const pollStatus = async () => {
      try {
        const { data } = await axios.get(`/api/scan-status/${currentScanId}`);

        if (!data.success || !data.scan) return;

        const scan = data.scan;

        setScanData(scan);
        setUrl(scan.url || "");

        const discovered = scan.discoveredPages?.length || 0;
        const finished = (scan.completedPages || 0) + (scan.failedPages || 0);

        const actualProgress =
          discovered > 0 ? Math.min(100, (finished / discovered) * 100) : 0;

        setProgress(scan.status === "completed" ? 100 : actualProgress);

        setTotalPages(discovered || scan.totalPages || 0);

        if (scan.status === "completed" || scan.status === "failed") {
          const logsRes = await axios.get(`/api/scan-logs/${currentScanId}`);

          if (logsRes.data.success) {
            setLiveLogs(logsRes.data.logs);
          }

          setCompleted(scan.status === "completed");
          setScanDuration(scan.scanDuration);
          setTotalPages(scan.totalPages || discovered);
          setProgress(scan.status === "completed" ? 100 : actualProgress);
          setIsAnalyzing(false);

          clearInterval(statusPollingRef.current);
          clearInterval(logPollingRef.current);
        }
      } catch (error) {
        console.error("Status polling failed:", error);
      }
    };

    pollStatus();
    statusPollingRef.current = setInterval(pollStatus, 2000);
  };

  const handleAnalyzeAnother = () => {
    if (logPollingRef.current) {
      clearInterval(logPollingRef.current);
    }

    if (statusPollingRef.current) {
      clearInterval(statusPollingRef.current);
    }

    setUrl("");
    setIsAnalyzing(false);
    setScanId(null);
    setScanDuration(null);
    setTotalPages(null);
    setProgress(0);
    setLogs([]);
    setLiveLogs([]);
    setLogsOpen(false);
    setCompleted(false);
    setScanData(null);
  };

  function formatElapsed(startedAt, finishedDuration, currentTime) {
    if (finishedDuration) return finishedDuration;
    if (!startedAt) return "00:00";

    const startTime = new Date(startedAt).getTime();

    if (!Number.isFinite(startTime)) return "00:00";

    const seconds = Math.max(0, Math.floor((currentTime - startTime) / 1000));

    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${secs}`;
  }

  function formatStartedAt(date) {
    if (!date) return "—";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  const mainLogs = liveLogs.filter((log) => log.type !== "sub");

  const lighthouseLogs = liveLogs.filter(
    (log) => log.type === "sub" && log.parent === "lighthouse",
  );
  const scanStatus = scanData?.status ?? "running";
  const scanStage = scanData?.stage ?? "initializing";

  const completedPageCount = scanData?.completedPages ?? 0;
  const failedPageCount = scanData?.failedPages ?? 0;

  const discoveredPageCount = scanData?.discoveredPages?.length ?? 0;

  const processedPageCount = completedPageCount + failedPageCount;

  const isScanFinished = scanStatus === "completed" || scanStatus === "failed";

  const isLighthouseRunning = scanStage === "lighthouse_running";

  const hasPageFailures = failedPageCount > 0;

  const scanProgress = isScanFinished
    ? scanStatus === "completed"
      ? 100
      : progress
    : discoveredPageCount > 0
      ? Math.min(
          100,
          Math.round((processedPageCount / discoveredPageCount) * 100),
        )
      : progress;

  const stageDefinitions = [
    {
      label: "Initializing crawler",
      match: /initializing crawler/i,
      done: () => scanStage !== "initializing" || isScanFinished,
    },
    {
      label: "Connecting to website",
      match: /connecting to website|connected to website/i,
      done: () => false,
    },
    {
      label: "Extracting internal links",
      match: /extracting internal links|pages discovered|discovered.*pages/i,
      done: () =>
        [
          "discovery_completed",
          "lighthouse_running",
          "completed",
          "failed",
        ].includes(scanStage),
    },
    {
      label: "Starting Lighthouse analysis",
      match: /starting lighthouse analysis/i,
      done: () => isLighthouseRunning || isScanFinished,
    },
    {
      label: "Analyzing performance",
      match: /performance analysis complete|analyzing performance/i,
      done: () => scanStatus === "completed",
    },
    {
      label: "Checking SEO issues",
      match: /seo analysis complete|checking seo/i,
      done: () => scanStatus === "completed",
    },
    {
      label: "Running accessibility audit",
      match: /accessibility analysis complete|accessibility audit/i,
      done: () => scanStatus === "completed",
    },
    {
      label: "Analyzing best practices",
      match: /best practices analysis complete|analyzing best practices/i,
      done: () => scanStatus === "completed",
    },
    {
      label: "Generating final report",
      match: /generating final report|report generated/i,
      done: () => scanStatus === "completed",
    },
  ];

  const getStageStatus = (stage) => {
    const matchingLogs = liveLogs.filter((log) =>
      stage.match.test(log.message ?? ""),
    );

    const latestLog = matchingLogs[matchingLogs.length - 1];

    if (latestLog?.status === "error" || latestLog?.status === "failed") {
      return "FAILED";
    }

    if (latestLog?.status === "success" || latestLog?.status === "completed") {
      return "COMPLETED";
    }

    if (stage.done()) {
      return "COMPLETED";
    }

    if (
      latestLog?.status === "running" ||
      (stage.label === "Starting Lighthouse analysis" && isLighthouseRunning) ||
      (stage.label === "Analyzing performance" && isLighthouseRunning) ||
      (stage.label === "Checking SEO issues" && isLighthouseRunning) ||
      (stage.label === "Running accessibility audit" && isLighthouseRunning) ||
      (stage.label === "Analyzing best practices" && isLighthouseRunning)
    ) {
      return "ANALYZING";
    }

    return "QUEUED";
  };

  const lighthouseStages = [
    {
      label: "Performance analysis",
      score: scanData?.summary?.performance,
    },
    {
      label: "SEO analysis",
      score: scanData?.summary?.seo,
    },
    {
      label: "Accessibility analysis",
      score: scanData?.summary?.accessibility,
    },
    {
      label: "Best practices analysis",
      score: scanData?.summary?.bestPractices,
    },
  ].map((item) => ({
    ...item,
    status:
      scanStatus === "completed"
        ? "COMPLETED"
        : isLighthouseRunning
          ? "ANALYZING"
          : "QUEUED",
  }));

  const formatLogTimestamp = (createdAt) => {
    if (!createdAt) return "--:--:--";

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) return "--:--:--";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };
  const currentLogCount = mainLogs.length;

  const discoveredPages = scanData?.discoveredPages ?? [];

  const pageDiscoveryItems = discoveredPages.map((page) => {
    const pageLogs = liveLogs.filter(
      (log) => log.type === "sub" && log.pageUrl === page,
    );

    const latestLog = pageLogs[pageLogs.length - 1];

    let status = "QUEUED";

    if (latestLog?.status === "success") {
      status = "COMPLETED";
    } else if (latestLog?.status === "error") {
      status = "FAILED";
    } else if (
      latestLog?.status === "running" ||
      scanData?.currentPage === page
    ) {
      status = "ANALYZING";
    }

    return { page, status };
  });

  return (
    <section
      id="top"
      className="min-h-screen w-full overflow-hidden bg-[#f7f8fa] pt-[104px] text-[#0b1020]"
    >
      <div className="mx-auto w-full max-w-[1220px] px-5 pb-[90px] sm:px-6 lg:px-0">
        {!isAnalyzing && !completed && (
          <div className="w-full">
            <div className="max-w-[900px] flex flex-col gap-[18px]">
              <div className="flex items-center gap-[8px]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#4F6AF5]" />
                <span className="text-[11px] font-bold uppercase leading-none tracking-[0.04em] text-[#4F6AF5]">
                  Website Analysis
                </span>
              </div>

              <h1 className="text-[34px] font-bold leading-[57px] tracking-[-0.035em] text-[#0B1020] sm:text-[42px] lg:text-[48px]">
                Analyze Your Website
              </h1>

              <p className="max-w-[900px] text-[13px] font-medium leading-[25px] text-[#6B7280] sm:text-[17px]">
                Run a structured audit across performance, SEO, accessibility,
                best practices and page-level website health.
              </p>

              <div className="flex flex-wrap items-center gap-x-[18px] gap-y-[8px]">
                <span className="flex items-center gap-[6px] text-[11px] font-bold uppercase leading-none text-[#9CA3AF]">
                  <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#9CA3AF]" />
                  Public Website
                </span>

                <span className="flex items-center gap-[6px] text-[11px] font-bold uppercase leading-none text-[#9CA3AF]">
                  <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#9CA3AF]" />
                  No Installation Required
                </span>

                <span className="flex items-center gap-[6px] text-[11px] font-bold uppercase leading-none text-[#4F6AF5]">
                  <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#4F6AF5]" />
                  Real-Time Scan
                </span>
              </div>
            </div>

            <div className="mt-[35px] w-full overflow-hidden rounded-[6px] border border-[#DDE1EA] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.035)]">
              <div className="flex min-h-[52px] items-center justify-between border-b border-[#DDE1EA] px-5 sm:px-[24px]">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase leading-none tracking-[0.03em] text-[#9CA3AF]">
                    Analyze Website
                  </p>

                  <p className="mt-[4px] text-[13px] leading-none text-[#4B5563]">
                    Enter a public website URL to begin a full audit.
                  </p>
                </div>

                <div className="ml-4 hidden shrink-0 items-center gap-[7px] rounded-[3px] border border-[#D1FAE5] bg-[#F0FDF4] px-[12px] py-[5px] sm:flex">
                  <span className="h-[7px] w-[7px] rounded-full bg-[#16A34A]" />
                  <span className="text-[10px] font-bold uppercase leading-none text-[#16A34A]">
                    Ready to Scan
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleAnalyze}
                className="p-9 flex flex-col gap-8"
              >
                <div className="flex flex-col gap-[10px]">
                  <label
                    htmlFor="website-url"
                    className="block text-[10px] font-bold uppercase leading-none tracking-[0.04em] text-[#9CA3AF]"
                  >
                    Website URL
                  </label>

                  <div className="flex flex-col gap-[10px] lg:flex-row">
                    <div className="relative min-w-0 flex-1">
                      <Globe
                        className="absolute left-[15px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#aab3c0]"
                        strokeWidth={1.7}
                      />

                      <input
                        id="website-url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        autoComplete="url"
                        className="h-[52px] w-full rounded-[5px] border border-[#DDE1EA] bg-[#FAFBFC] pl-[40px] pr-[14px] text-[14px] text-[#4d596d] outline-none transition-colors duration-150 placeholder:text-[#C9CDD8] focus:border-[#3975ff] focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isAnalyzing || !url.trim()}
                      className="group flex h-[52px] w-fit shrink-0 items-center justify-center gap-[7px] rounded-[5px] bg-[#0b1020] px-[24px] text-[14px] font-bold leading-none text-white transition-all duration-200 hover:bg-[#151c2e] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 "
                    >
                      Analyze Website
                      <ChevronRight
                        className="h-[12px] w-[12px] transition-transform duration-200 group-hover:translate-x-[2px]"
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </div>

                <div className=" flex flex-col gap-[14px]">
                  <div className="flex flex-wrap gap-[8px]">
                    {[
                      "Full Website Crawl",
                      "Performance",
                      "SEO",
                      "Accessibility",
                      "Best Practices",
                    ].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-[3px] border border-[#DDE1EA] bg-white px-[12px] py-[5px] text-[11px] font-bold uppercase leading-none tracking-[0.02em] text-[#6B7280]"
                      >
                        <span className="mr-[5px] h-[5px] w-[5px] rounded-full bg-[#6B7280]" />
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-[10px] rounded-[4px] border border-[#E8EAF0] bg-[#F7F8FA] px-[14px] py-3">
                    <Globe
                      className="h-[14px] w-[14px] shrink-0 text-[#9CA3AF]"
                      strokeWidth={1.7}
                    />

                    <span className="text-[12px]  leading-[1.4] text-[#9CA3AF]">
                      SitePulse discovers internal pages and evaluates each page
                      before generating the final report.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {isAnalyzing && (
          <>
            <div className="w-full overflow-hidden rounded-[6px] border border-[#DDE1EA] bg-white shadow-[0_10px_35px_rgba(15,23,42,0.045)]">
              <div className="flex min-h-[58px] flex-col gap-4 border-b border-[#DDE1EA] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 lg:px-[24px]">
                <div className="flex min-w-0 items-center gap-6">
                  <div className="flex min-w-0 items-center gap-[9px]">
                    <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[4px] bg-[#0b1020]">
                      <Activity
                        className="h-[18px] w-[18px] text-white"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        SitePulse Audit
                      </p>

                      <div className="mt-[4px] flex items-center gap-[5px]">
                        <Globe
                          className="h-[12px] w-[12px] shrink-0 text-[#6B7280]"
                          strokeWidth={1.8}
                        />

                        <p className="truncate text-[14px] font-bold leading-none text-[#0B1020]">
                          {url || "example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden h-[30px] w-px bg-[#E5E7EB] sm:block" />

                  <div className="flex items-center gap-[7px] rounded-[4px] border border-[#DBEAFE] bg-[#EFF6FF] px-[12px] py-[5px]">
                    <span className="relative flex h-[8px] w-[8px] items-center justify-center">
                      <span className="absolute h-[8px] w-[8px] animate-ping rounded-full bg-[#3B82F6]/25" />
                      <span className="relative h-[6px] w-[6px] rounded-full bg-[#3B82F6]" />
                    </span>

                    <span className="text-[11px] font-bold uppercase leading-none text-[#2563EB]">
                      Scanning
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:min-w-[280px]">
                  <div className="text-left first:pl-0 sm:text-right border-r border-[#E5E7EB] pr-7">
                    <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Scan ID
                    </p>

                    <p className="mt-[2px] truncate text-[12px] font-mono font-bold leading-none text-[#374151]">
                      {scanData?._id
                        ? String(scanData._id).slice(-6).toUpperCase()
                        : scanId
                          ? String(scanId).slice(-6).toUpperCase()
                          : "—"}
                    </p>
                  </div>

                  <div className="text-left sm:text-right border-x border-[#E5E7EB] px-7">
                    <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Started
                    </p>

                    <p className="mt-[2px] font-mono text-[12px] font-bold leading-none text-[#374151]">
                      {formatStartedAt(scanData?.createdAt)}
                    </p>
                  </div>

                  <div className="text-left last:pr-0 pl-7">
                    <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Pages
                    </p>

                    <p className="mt-[2px] font-mono text-[12px] font-bold leading-none text-[#374151]">
                      {scanData?.completedPages ?? 0} /{" "}
                      {scanData?.discoveredPages?.length ??
                        scanData?.totalPages ??
                        0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-[#DDE1EA] bg-[#FAFBFD] px-5 py-[20px] sm:px-6 lg:px-[24px] flex flex-col gap-[14px]">
                <div className="flex flex-col gap-[14px] sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Audit Progress
                    </p>

                    <div className="mt-[6px] flex items-end gap-[10px]">
                      <span className="text-[30px] font-bold leading-none tracking-[-0.05em] text-[#0B1020] sm:text-[32px]">
                        {Math.round(progress)}%
                      </span>

                      <div className=" flex flex-col gap-[2px]">
                        <span className="text-[13px] font-medium leading-none text-[#6B7280]">
                          {Math.min(
                            scanData?.discoveredPages?.length ?? 0,
                            (scanData?.completedPages ?? 0) +
                              (scanData?.failedPages ?? 0),
                          )}{" "}
                          / {scanData?.discoveredPages?.length ?? 0} pages
                        </span>
                        <div className="flex items-center rounded-[3px] border border-[#DBEAFE] bg-[#EFF6FF] px-[8px] py-[3px]">
                          <span className="text-[10px] font-bold uppercase leading-none text-[#3B82F6]">
                            Discovery In Progress
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Elapsed
                    </p>

                    <p className="mt-[5px] font-mono text-[22px] font-bold leading-none tracking-[-0.03em] text-[#6B7280]">
                      {formatElapsed(
                        scanData?.createdAt,
                        !isAnalyzing ? scanDuration : null,
                        currentTime,
                      )}
                    </p>
                  </div>
                </div>

                <div className="h-[6px] overflow-hidden rounded-full bg-[#E5E7EB]">
                  <div
                    style={{ width: `${progress}%` }}
                    className="relative h-full rounded-full bg-[#3B82F6] transition-all duration-700"
                  >
                    <div className="absolute inset-0 animate-pulse bg-white/15" />
                  </div>
                </div>

                <p className=" text-[12px]  leading-[1.5] text-[#9CA3AF]">
                  SitePulse is discovering and analyzing pages across the
                  website.
                </p>
              </div>

              <div className="grid lg:grid-cols-[0.88fr_1fr_1.15fr]">
                <div className="flex flex-col gap-4 border-b border-[#dce2ea] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-[24px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <span className="h-[6px] w-[6px] rounded-full bg-[#3B82F6]" />

                      <span className="text-[11px] font-bold uppercase leading-none text-[#0B1020]">
                        Page Discovery
                      </span>
                    </div>

                    <span className="rounded-[3px] border border-[#E5E7EB] bg-[#F3F4F6] px-[8px] py-[3px] text-[11px] font-bold leading-none text-[#6B7280]">
                      {Math.max(
                        0,
                        Math.round((progress / 100) * (totalPages || 24)),
                      )}{" "}
                      of {totalPages || 24}
                    </span>
                  </div>

                  <div className="">
                    {pageDiscoveryItems.map(({ page, status }) => {
                      return (
                        <div
                          key={page}
                          className={`flex min-h-[42px] items-center justify-between border-b border-[#F3F4F6]  ${
                            status === "ANALYZING"
                              ? "border-[#DBEAFE] bg-[#EFF6FF]"
                              : ""
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-[10px]">
                            {status === "COMPLETED" ? (
                              <CheckCircle2 className="h-[14px] w-[14px] shrink-0 text-[#16A34A]" />
                            ) : status === "FAILED" ? (
                              <Circle className="h-[14px] w-[14px] shrink-0 text-red-500" />
                            ) : status === "ANALYZING" ? (
                              <span className="relative flex h-[14px] w-[14px] shrink-0 items-center justify-center">
                                <span className="absolute h-[14px] w-[14px] animate-ping rounded-full bg-[#DBEAFE]/20" />
                                <span className="relative h-[6px] w-[6px] rounded-full bg-[#3B82F6]" />
                              </span>
                            ) : (
                              <Circle
                                className="h-[14px] w-[14px] shrink-0 text-[#D1D5DB]"
                                strokeWidth={1.4}
                              />
                            )}

                            <span
                              className={`truncate text-[13px]  ${
                                status === "COMPLETED"
                                  ? "text-[#374151] font-bold"
                                  : status === "ANALYZING"
                                    ? "text-[#1D4ED8] font-bold"
                                    : "text-[#9CA3AF]"
                              }`}
                            >
                              {page}
                            </span>
                          </div>

                          <span
                            className={`ml-2 shrink-0 text-[10px] font-bold uppercase ${
                              status === "COMPLETED"
                                ? "text-[#16A34A]"
                                : status === "ANALYZING"
                                  ? "text-[#2563EB]"
                                  : "text-[#9CA3AF]"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-[6px] rounded-[3px] border border-[#E5E7EB] bg-[#F7F8FA] px-[12px] py-[10px]">
                    <span className="text-[12px]  text-[#9CA3AF]">···</span>

                    <span className="text-[12px] text-[#9CA3AF]">
                      +
                      {
                        pageDiscoveryItems.filter(
                          (item) => item.status === "QUEUED",
                        ).length
                      }
                      more pages queued
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-b border-[#dce2ea] p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-[24px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[6px]">
                      <span className="h-[6px] w-[6px] rounded-full bg-[#8B5CF6]" />

                      <span className="text-[11px] font-bold uppercase leading-none text-[#0B1020]">
                        Live Analysis
                      </span>
                    </div>

                    <span className="rounded-[3px] border border-[#E5E7EB] bg-[#F3F4F6] px-[8px] py-[3px] text-[11px] font-bold leading-none text-[#6B7280]">
                      {mainLogs.length} logs
                    </span>
                  </div>

                  <div className="">
                    {mainLogs.map((log, index) => {
                      const done = log.status === "success";
                      const failed = log.status === "error";
                      const running = log.status === "running";

                      return (
                        <div
                          key={index}
                          className={`flex min-h-[34px] items-center gap-[10px] ${
                            running
                              ? "border border-[#DBEAFE] bg-[#EFF6FF] px-[10px] rounded-[4px]"
                              : done
                                ? "border border-transparent"
                                : "border border-transparent"
                          }`}
                        >
                          {done ? (
                            <CheckCircle2 className="h-[14px] w-[14px] shrink-0 text-[#16A34A]" />
                          ) : failed ? (
                            <Circle className="h-[14px] w-[14px] shrink-0 text-red-500" />
                          ) : running ? (
                            <span className="relative flex h-[14px] w-[14px] shrink-0 items-center justify-center">
                              <span className="absolute h-[11px] w-[11px] animate-ping rounded-full bg-[#DBEAFE]" />
                              <span className="relative h-[6px] w-[6px] rounded-full bg-[#3B82F6]" />
                            </span>
                          ) : (
                            <Circle className="h-[12px] w-[12px] shrink-0 text-[#D1D5DB]" />
                          )}

                          <span
                            className={`truncate text-[13px] ${
                              running
                                ? "font-bold text-[#1D4ED8]"
                                : done
                                  ? " text-[#6B7280]"
                                  : " text-[#9CA3AF]"
                            }`}
                          >
                            {log.message}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#0F1629] p-5 sm:p-6 lg:p-[24px] flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <Sparkles
                        className="h-[14px] w-[14px] text-[#6378F5]"
                        strokeWidth={1.8}
                      />

                      <span className="text-[10px] font-bold uppercase leading-none text-[#6378F5]">
                        Lighthouse Analysis
                      </span>
                    </div>

                    <span className="flex items-center gap-[5px] rounded-[3px] bg-[#1E2A45] px-[8px] py-[3px] text-[10px] font-bold uppercase leading-none text-[#4F6AF5]">
                      <span className="h-[5px] w-[5px] rounded-full bg-[#4F6AF5]" />
                      {isAnalyzing
                        ? "Running"
                        : scanData?.status === "completed"
                          ? "Completed"
                          : scanData?.status === "failed"
                            ? "Failed"
                            : "Idle"}
                    </span>
                  </div>

                  <div className="relative pl-[32px]">
                    <div className="absolute bottom-[7px] left-[15px] top-[7px] w-px bg-[#1E2A45]" />

                    {lighthouseLogs.length > 0 ? (
                      lighthouseLogs.map((log) => {
                        const done = log.status === "success";
                        const failed = log.status === "error";
                        const running = log.status === "running";

                        return (
                          <div
                            key={log._id}
                            className={`relative flex min-h-[32px] items-center gap-[10px] rounded-[3px] ${
                              running ? "bg-[#1E2A45] px-2" : ""
                            }`}
                          >
                            {done ? (
                              <CheckCircle2 className="relative z-10 h-[12px] w-[12px] shrink-0 text-[#22C55E]" />
                            ) : failed ? (
                              <Circle className="relative z-10 h-[12px] w-[12px] shrink-0 text-red-400" />
                            ) : (
                              <span className="relative z-10 flex h-[12px] w-[12px] shrink-0 items-center justify-center">
                                <span className="h-[5px] w-[5px] rounded-full bg-[#3B82F6]" />
                              </span>
                            )}

                            <span
                              className={`truncate text-[12px] ${
                                running
                                  ? "text-[#93C5FD] font-bold"
                                  : done
                                    ? "text-[#6B7280]"
                                    : failed
                                      ? "text-red-400"
                                      : "text-[#374151]"
                              }`}
                            >
                              {log.pageUrl || log.message}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-[12px] text-[#6B7280]">
                        Waiting for Lighthouse analysis to begin...
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#DDE1EA] bg-[#0B1020] ">
                <div className="flex h-[42px] items-center justify-between border-b border-[#1E2A45] px-4 sm:px-[20px]">
                  <div className="flex items-center gap-[8px]">
                    <div className=" flex items-center gap-[5px]">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#374151]" />
                      <span className="h-[8px] w-[8px] rounded-full bg-[#374151]" />
                      <span className="h-[8px] w-[8px] rounded-full bg-[#374151]" />
                    </div>

                    <div className="w-px h-[18px] bg-[#1E2A45]" />
                    <span className=" text-[10px] font-bold uppercase leading-none text-[#4B5563]">
                      Live Log
                    </span>
                  </div>

                  <span className="flex items-center gap-[6px] rounded-[3px] bg-[#111827] px-[10px] py-[3px] text-[10px] font-bold uppercase leading-none text-[#4F6AF5]">
                    <span className="h-[5px] w-[5px] rounded-full bg-[#3B82F6]" />
                    Streaming
                  </span>
                </div>

                <div className="overflow-y-auto flex flex-col gap-[2px] px-4 py-[16px] font-mono sm:px-[20px]">
                  {liveLogs.length > 0 ? (
                    liveLogs.map((log, index) => (
                      <div
                        key={log._id || index}
                        className={`flex gap-[12px] text-[12px] leading-[1.4] ${
                          log.status === "running"
                            ? "px-2 py-1 bg-[#111827]"
                            : ""
                        }`}
                      >
                        <span className="shrink-0 text-[#374151]">
                          [
                          {log.createdAt
                            ? new Date(log.createdAt)
                                .toISOString()
                                .slice(11, 19)
                            : "--:--:--"}
                          ]
                        </span>

                        <div className="h-[14px] w-px bg-[#1E2A45]" />

                        <span
                          className={
                            log.status === "error"
                              ? "text-red-400"
                              : log.status === "running"
                                ? "text-[#4F6AF5]"
                                : "text-[#9CA3AF]"
                          }
                        >
                          {log.message}
                        </span>
                      </div>
                    ))
                  ) : logs.length > 0 ? (
                    logs.map((log, index) => (
                      <div
                        key={index}
                        className="flex gap-[12px] leading-[1.4] text-xs"
                      >
                        <span className="shrink-0 text-[#374151]">
                          [00:12:{String(index).padStart(2, "0")}]
                        </span>

                        <span className="text-[#9CA3AF]">{log}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-[12px] text-xs">
                      <span className="text-[#374151]">[00:12:04]</span>
                      <div className="h-[14px] w-px bg-[#1E2A45]" />
                      <span className="text-[#9CA3AF]">
                        crawler initialized
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="min-h-[44px] flex flex-col gap-[10px] border-t border-[#DDE1EA] bg-[#F7F8FA] px-5 sm:flex-row sm:items-center sm:justify-between sm:px-[24px]">
                <div className="flex flex-wrap items-center gap-[24px]">
                  <span className="flex items-center gap-[7px] text-[11px] font-bold uppercase leading-none text-[#6B7280]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
                    {isAnalyzing
                      ? scanData?.stage === "lighthouse_running"
                        ? "Crawler Completed"
                        : "Crawler Active"
                      : scanData?.status === "completed"
                        ? "Crawler Completed"
                        : scanData?.status === "failed"
                          ? "Crawler Failed"
                          : "Crawler Idle"}
                  </span>

                  <span className="hidden h-[12px] w-px bg-[#dce2ea] sm:block" />

                  <span className="flex items-center gap-[7px] text-[11px] font-bold uppercase leading-none text-[#6B7280]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#3B82F6]" />
                    {isAnalyzing
                      ? "Lighthouse Active"
                      : scanData?.status === "completed"
                        ? "Lighthouse Completed"
                        : scanData?.status === "failed"
                          ? "Lighthouse Failed"
                          : "Lighthouse Idle"}
                  </span>

                  <span className="hidden h-[12px] w-px bg-[#dce2ea] sm:block" />

                  <span className="flex items-center gap-[7px] text-[11px] font-bold uppercase leading-none text-[#6B7280]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#8B5CF6]" />
                    Real-Time Logging
                  </span>
                </div>

                <div className="flex items-center gap-[8px] text-[11px] leading-none text-[#9CA3AF]">
                  <Clock3 className="h-[12px] w-[12px]" strokeWidth={1.7} />
                  {isAnalyzing
                    ? "Auto-refreshing every 2s"
                    : "Auto-refresh paused"}
                </div>
              </div>
            </div>
          </>
        )}

        {completed && (
          <div className="w-full">
            <div className="overflow-hidden rounded-[6px] border border-[#DDE1EA] bg-white shadow-[0_10px_35px_rgba(15,23,42,0.045)]">
              <div className="flex min-h-[58px] flex-col gap-[12px] border-b border-[#dce2ea] px-[18px] py-[10px] sm:flex-row sm:items-center sm:justify-between sm:px-[22px]">
                <div className="flex items-center gap-6">
                  <div className="flex min-w-0 items-center gap-[9px]">
                    <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[4px] bg-[#0b1020]">
                      <Activity
                        className="h-[18px] w-[18px] text-white"
                        strokeWidth={2}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                        SitePulse Audit
                      </p>

                      <div className="mt-[4px] flex items-center gap-[5px]">
                        <Globe
                          className="h-[12px] w-[12px] shrink-0 text-[#6B7280]"
                          strokeWidth={1.8}
                        />

                        <p className="truncate text-[14px] font-bold leading-none text-[#0B1020]">
                          {url || "example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" hidden h-[30px] w-px bg-[#E5E7EB] sm:block" />

                  <div className="flex items-center gap-[7px] rounded-[3px] border border-[#BBF7D0] bg-[#F0FDF4] px-[10px] py-[5px]">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#22C55E]" />

                    <span className="text-[11px] font-bold uppercase text-[#16A34A]">
                      {scanStatus === "completed"
                        ? hasPageFailures
                          ? "Completed with warnings"
                          : "Completed"
                        : scanStatus === "failed"
                          ? "Failed"
                          : "Completed"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-start gap-[7px] sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase leading-none text-[#9CA3AF]">
                      Scan Complete
                    </p>

                    <div className="mt-[5px] flex items-center gap-[6px] sm:justify-end">
                      <CheckCircle2
                        className="h-[12px] w-[12px] text-[#16A34A]"
                        strokeWidth={2.5}
                      />

                      <span className="text-[13px] font-bold leading-none text-[#16A34A]">
                        {scanProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-[1.32fr_0.83fr]">
                <div className="p-9 border border-[#DDE1EA]">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex items-start gap-[10px]">
                        <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#F0FDF4]">
                          <CheckCircle2
                            className="h-[20px] w-[20px] text-[#16A34A]"
                            strokeWidth={2}
                          />
                        </div>
                        <h1 className="text-[22px] font-bold leading-[33px] tracking-[-0.035em] text-[#0B1020] sm:text-[28px]">
                          Audit Complete
                        </h1>
                      </div>

                      <p className="max-w-[600px] text-[10px] leading-[22px] text-[#6B7280] sm:text-[14px]">
                        Your website has been successfully crawled and analyzed.
                        Review the generated report for page-level findings and
                        recommendations.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-stretch">
                      <div className="border-r border-[#E5E7EB] pr-[20px] py-4 flex flex-col gap-[6px]">
                        <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                          Scan Time
                        </p>

                        <p className="font-mono text-[22px] font-bold leading-none tracking-[-0.03em] text-[#0B1020]">
                          {scanDuration || "-"}
                        </p>

                        <p className="text-[11px]  text-[#9CA3AF]">seconds</p>
                      </div>

                      <div className="border-r border-[#E5E7EB] px-[20px] py-4 flex flex-col gap-[6px]">
                        <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                          Pages Analyzed
                        </p>

                        <p className="font-mono text-[22px] font-bold leading-none tracking-[-0.03em] text-[#0B1020]">
                          {totalPages ?? discoveredPageCount}
                        </p>

                        <p className="text-[11px] text-[#9CA3AF]">
                          pages crawled
                        </p>
                      </div>

                      <div className="pl-[20px] flex flex-col gap-[6px]   py-4">
                        <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                          Status
                        </p>

                        <div className="flex items-center gap-[6px]">
                          <span className="h-[7px] w-[7px] rounded-full bg-[#16A34A]" />

                          <span className="text-[14px] font-bold uppercase leading-none text-[#16A34A]">
                            Complete
                          </span>
                        </div>

                        <p className="text-[11px] text-[#9CA3AF]">
                          {hasPageFailures
                            ? `${failedPageCount} page(s) failed`
                            : "All pages analyzed successfully"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" bg-[#FAFBFD] p-9  flex flex-col gap-5">
                  <div className=" flex flex-col gap-2">
                    <div className="flex items-center gap-[8px]">
                      <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" />

                      <span className="text-[10px] font-bold uppercase text-[#16A34A]">
                        Report Ready
                      </span>
                    </div>

                    <h2 className="text-[22px] font-bold leading-[26px] tracking-[-0.025em] text-[#0B1020]">
                      Your audit is ready.
                    </h2>

                    <p className="max-w-[390px] text-[14px] leading-[22px] text-[#6B7280]">
                      Review performance, SEO, accessibility and best-practice
                      findings with page-level recommendations.
                    </p>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <Link
                      href={`/report/${scanId}`}
                      className="group flex h-[50px] w-full items-center justify-center gap-[10px] rounded-[5px] bg-[#0B1020] text-[14px] font-bold text-white transition-colors hover:bg-[#151c2e]"
                    >
                      View Full Report
                      <ChevronRight
                        className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]"
                        strokeWidth={2}
                      />
                    </Link>

                    <div className="flex flex-wrap items-center justify-between gap-x-[14px] gap-y-[8px]">
                      <button
                        type="button"
                        onClick={() => setLogsOpen((prev) => !prev)}
                        className="group flex items-center gap-[7px] text-[13px] py-[10px]  border-b border-[#DDE1EA] font-medium text-[#6B7280] transition-colors hover:text-[#0b1020]"
                      >
                        <List className="h-[13px] w-[13px]" strokeWidth={1.8} />

                        <span>{logsOpen ? "Hide Logs" : "View Logs"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleAnalyzeAnother}
                        className="group flex items-center gap-[6px] text-[12px] text-[#9CA3AF] transition-colors hover:text-[#3975ff]"
                      >
                        <RefreshCw
                          className="h-[12px] w-[12px] transition-transform duration-300 group-hover:rotate-180"
                          strokeWidth={1.8}
                        />

                        <span>Analyze another website</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {logsOpen && (
                <div className="border-t border-[#dfe4eb]">
                  <div className="flex min-h-[48px] items-center justify-between gap-[8px] border-b border-[#DDE1EA] bg-[#F7F8FA] px-[18px] sm:px-[24px]">
                    <div className="flex items-center gap-[10px]">
                      <List
                        className="h-[14px] w-[14px] text-[#9CA3AF]"
                        strokeWidth={1.8}
                      />

                      <span className="text-[11px] font-bold uppercase text-[#6B7280]">
                        Analysis Logs
                      </span>

                      <span className="rounded-[3px] border border-[#BBF7D0] bg-[#ECFDF5] px-[8px] py-[3px] text-[11px] font-bold uppercase text-[#16A34A]">
                        {liveLogs.length} stages complete
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLogsOpen(false)}
                      className="flex items-center gap-[6px] rounded-[3px] border border-[#DDE1EA] bg-white px-[12px] py-[7px] text-[12px] font-medium text-[#6B7280] transition-colors hover:text-[#0b1020]"
                    >
                      <ChevronRight
                        className="h-[12px] w-[12px] -rotate-90"
                        strokeWidth={2}
                      />
                      Hide Logs
                    </button>
                  </div>

                  <div className="grid lg:grid-cols-[0.95fr_0.72fr_0.92fr]">
                    <div className="border-b border-[#DDE1EA] p-6 lg:border-b-0 lg:border-r flex flex-col gap-2">
                      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-[12px]">
                        <span className="text-[10px] font-bold uppercase text-[#9CA3AF]">
                          Audit Stages
                        </span>

                        <span className="rounded-[3px] border border-[#BBF7D0] bg-[#ECFDF5] px-[8px] py-[3px] text-[10px] font-bold uppercase text-[#16A34A]">
                          {stageDefinitions.every(
                            (stage) => getStageStatus(stage) === "COMPLETED",
                          )
                            ? "All Done"
                            : hasPageFailures
                              ? "Warnings"
                              : "In Progress"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-[2px] pt-3">
                        {stageDefinitions.map((stage) => {
                          const status = getStageStatus(stage);

                          return (
                            <div
                              key={stage.label}
                              className="flex items-center gap-[10px] h-9"
                            >
                              {status === "COMPLETED" ? (
                                <CheckCircle2
                                  className="h-[14px] w-[14px] shrink-0 text-[#16A34A]"
                                  strokeWidth={2}
                                />
                              ) : status === "FAILED" ? (
                                <XCircle
                                  className="h-[14px] w-[14px] shrink-0 text-red-500"
                                  strokeWidth={2}
                                />
                              ) : status === "ANALYZING" ? (
                                <LoaderCircle
                                  className="h-[14px] w-[14px] shrink-0 animate-spin text-blue-500"
                                  strokeWidth={2}
                                />
                              ) : (
                                <Circle
                                  className="h-[14px] w-[14px] shrink-0 text-[#9CA3AF]"
                                  strokeWidth={2}
                                />
                              )}

                              <span
                                className={`text-[13px] ${
                                  status === "COMPLETED"
                                    ? "text-[#374151]"
                                    : status === "FAILED"
                                      ? "text-red-500"
                                      : status === "ANALYZING"
                                        ? "font-semibold text-[#0B1020]"
                                        : "text-[#9CA3AF]"
                                }`}
                              >
                                {stage.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-b border-[#DDE1EA] p-6 lg:border-b-0 lg:border-r flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-[12px]">
                        <div className="flex items-center gap-[7px]">
                          <Sparkles
                            className="h-[14px] w-[14px] text-[#16A34A]"
                            strokeWidth={1.8}
                          />

                          <span className="text-[10px] font-bold uppercase text-[#6B7280]">
                            Lighthouse Analysis
                          </span>
                        </div>

                        <span className="rounded-[3px] border border-[#BBF7D0] bg-[#ECFDF5] px-[8px] py-[3px] text-[10px] font-bold uppercase text-[#16A34A]">
                          {scanStatus === "completed"
                            ? hasPageFailures
                              ? "Partial"
                              : "Complete"
                            : isLighthouseRunning
                              ? "Running"
                              : "Pending"}
                        </span>
                      </div>

                      <div className="relative pl-[34px]">
                        <div className="absolute left-[17px] top-[2px] bottom-[2px] w-px bg-[#D1FAE5]" />

                        <div className="">
                          {lighthouseStages.map((stage) => (
                            <div
                              key={stage.label}
                              className="relative flex items-center gap-[10px] h-8"
                            >
                              {stage.status === "COMPLETED" ? (
                                <CheckCircle2
                                  className="relative z-[1] h-[12px] w-[12px] shrink-0 bg-white text-[#16A34A]"
                                  strokeWidth={2}
                                />
                              ) : stage.status === "ANALYZING" ? (
                                <LoaderCircle
                                  className="relative z-[1] h-[12px] w-[12px] shrink-0 animate-spin bg-white text-blue-500"
                                  strokeWidth={2}
                                />
                              ) : (
                                <Circle
                                  className="relative z-[1] h-[12px] w-[12px] shrink-0 bg-white text-[#9CA3AF]"
                                  strokeWidth={2}
                                />
                              )}

                              <span className="text-[12px] text-[#4B5563]">
                                {stage.label}
                                {stage.score != null
                                  ? ` · ${stage.score}/100`
                                  : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0B1020] ">
                      <div className="flex items-center justify-between border-b border-[#1E2A45] h-[42px] px-5">
                        <div className="flex items-center gap-[8px]">
                          <span className="flex gap-[5px]">
                            <span className="h-[8px] w-[8px] rounded-full bg-[#374151]" />
                            <span className="h-[8px] w-[8px] rounded-full bg-[#374151]" />
                            <span className="h-[8px] w-[8px] rounded-full bg-[#374151]" />
                          </span>

                          <div className="w-px bg-[#1E2A45]" />

                          <span className="text-[10px] font-bold uppercase text-[#4B5563]">
                            Scan Log
                          </span>
                        </div>

                        <span className="rounded-[3px] bg-[#0F2D1F] px-[10px] py-[3px] text-[10px] font-bold uppercase text-[#22C55E]">
                          {scanStatus === "completed"
                            ? hasPageFailures
                              ? "Completed with warnings"
                              : "Scan Complete"
                            : scanStatus === "failed"
                              ? "Scan Failed"
                              : "Running"}
                        </span>
                      </div>

                      <div className="overflow-auto max-w-full min-w-0 py-[14px] px-5 font-mono flex flex-col gap-[2px]">
                        {liveLogs.length > 0 ? (
                          liveLogs.map((log, index) => (
                            <div
                              key={index}
                              className={`flex w-max min-w-full flex-nowrap gap-3 text-[12px] leading-[1.45] ${
                                log.status === "audit_done"
                                  ? "rounded-[3px] bg-[#0F2D1F] px-[8px] py-[4px]"
                                  : ""
                              }`}
                            >
                              <span
                                className={`shrink-0 ${
                                  log.status === "success" ||
                                  log.status === "completed" ||
                                  log.status === "audit_done"
                                    ? "text-[#22C55E]"
                                    : log.status === "error" ||
                                        log.status === "failed"
                                      ? "text-red-400"
                                      : "text-[#6B7280]"
                                }`}
                              >
                                [{formatLogTimestamp(log.createdAt)}]
                              </span>

                              <div
                                className={`w-px ${log.status === "audit_done" ? "bg-[#1A3D25]" : "bg-[#1E2A45]"}`}
                              />

                              <span
                                className={`whitespace-nowrap ${
                                  log.status === "audit_done"
                                    ? "font-medium text-[#22C55E]"
                                    : log.status === "error"
                                      ? "text-red-400"
                                      : log.status === "completed"
                                        ? "text-[#22C55E]"
                                        : "text-[#9CA3AF]"
                                }`}
                              >
                                {log.message}
                              </span>

                              {log.status === "completed" && (
                                <span className="text-[#20b889]">done</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-[12px] text-[#9CA3AF]">
                            Analysis logs are ready.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between px-6 h-[44px]  border-t border-[#DDE1EA] bg-[#FAFBFD] ">
                <div className="flex gap-6 items-center">
                  <span className="flex items-center gap-[7px] text-[11px] font-bold uppercase text-[#6B7280]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
                    Crawler Done
                  </span>

                  <span className="hidden h-[16px] w-px bg-[#DDE1EA] sm:block" />

                  <span className="flex items-center gap-[7px] text-[11px] font-bold uppercase text-[#6B7280]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
                    {isLighthouseRunning
                      ? "Lighthouse Running"
                      : scanStatus === "completed"
                        ? "Lighthouse Done"
                        : "Lighthouse Pending"}
                  </span>

                  <span className="hidden h-[16px] w-px bg-[#DDE1EA] sm:block" />

                  <span className="flex items-center gap-[7px] text-[11px] font-bold uppercase text-[#6B7280]">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#22C55E]" />
                    {scanStatus === "completed"
                      ? "Report Generated"
                      : "Report Pending"}
                  </span>
                </div>

                <span className="flex items-center gap-[8px] text-[11px] text-[#9CA3AF]">
                  <Clock className="h-[12px] w-[12px]" strokeWidth={1.8} />
                  Scan completed in {scanDuration || "00:24"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
