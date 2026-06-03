"use client";

import { useEffect, useState } from "react";

import {
  CheckCircle2,
  ChevronRight,
  Globe,
  Loader2,
  Monitor,
  SearchCheck,
  Smartphone,
  Sparkles,
  ShieldCheck,
  Activity,
  Clock3,
  XCircle,
} from "lucide-react";

import Link from "next/link";
import axios from "axios";
import { useRef } from "react";

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
  const logPollingRef = useRef(null);
  const statusPollingRef = useRef(null);
  const analysisSteps = [
    "Initializing crawler...",
    "Connecting to website...",
    "Extracting internal links...",
    "Found 14 internal pages",
    "Starting Lighthouse analysis...",
    "Analyzing performance...",
    "Checking SEO issues...",
    "Running accessibility audit...",
    "Analyzing best practices...",
    "Generating final report...",
  ];

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
  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!url || isAnalyzing) return;

    try {
      setLogs([]);
      setLiveLogs([]);

      setCompleted(false);
      setProgress(0);

      setIsAnalyzing(true);
      setLogsOpen(true);

      setLogs([
        "Initializing crawler...",
        "Connecting to website...",
        "Extracting internal links...",
        "Starting Lighthouse analysis...",
      ]);

      const response = await axios.post("/api/scan", {
        url,
      });

      if (!response.data.success) {
        throw new Error("Failed to start scan");
      }

      const currentScanId = response.data.scanId;

      setScanId(currentScanId);

      startLogPolling(currentScanId);
      startStatusPolling(currentScanId);

      setProgress(40);
    } catch (error) {
      console.log(error);

      setLogs((prev) => [
        ...prev,
        "Something went wrong while analyzing website",
      ]);

      setIsAnalyzing(false);
    }
  };

  const startLogPolling = (scanId) => {
    logPollingRef.current = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/scan-logs/${scanId}`);

        if (data.success) {
          setLiveLogs(data.logs);
        }
      } catch (err) {
        console.log(err);
      }
    }, 1000);
  };

  const startStatusPolling = (scanId) => {
    statusPollingRef.current = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/scan-status/${scanId}`);

        if (!data.success) return;

        const scan = data.scan;

        if (scan.status === "running") {
          setProgress((prev) => {
            if (prev >= 90) return 90;
            return prev + 5;
          });
        }

        if (scan.status === "completed" || scan.status === "failed") {
          const logsRes = await axios.get(`/api/scan-logs/${scanId}`);

          if (logsRes.data.success) {
            setLiveLogs(logsRes.data.logs);
          }
          setCompleted(scan.status === "completed");

          setScanDuration(scan.scanDuration);

          setTotalPages(scan.totalPages);

          setProgress(100);

          setIsAnalyzing(false);

          clearInterval(statusPollingRef.current);
          clearInterval(logPollingRef.current);
        }
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };

  console.log(liveLogs);

  const mainLogs = liveLogs.filter((log) => log.type !== "sub");

  const lighthouseLogs = liveLogs.filter(
    (log) => log.type === "sub" && log.parent === "lighthouse",
  );
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fafafa] pt-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/[0.08] blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-full bg-cyan-400/[0.06] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold tracking-wide text-indigo-700">
            <Sparkles className="h-3.5 w-3.5" />
            AI Powered Website Scanner
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Analyze Your Website
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Scan your website for performance, SEO, accessibility and best
            practice issues with a modern page-level audit system.
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="mt-14 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          {/* HEADER */}
          <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Website Analyzer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter your website URL and start a complete audit instantly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Secure Scan
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-600">
                  <Activity className="h-4 w-4 text-indigo-500" />
                  Real-time Analysis
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 sm:p-8">
            {/* INPUT SECTION */}
            <form
              onSubmit={handleAnalyze}
              className="rounded-[26px] border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 p-5 sm:p-6"
            >
              {/* INPUT */}
              <div className="relative">
                <Globe className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-sm font-medium text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isAnalyzing}
                className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing Website...
                  </>
                ) : (
                  <>
                    <SearchCheck className="h-4 w-4" />
                    Analyze Website
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* ANALYSIS PROGRESS */}
            {(isAnalyzing || completed) && (
              <div className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white">
                {/* TOP */}
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* LEFT */}
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />

                        <p className="text-sm font-semibold text-slate-900">
                          Analysis Progress
                        </p>
                      </div>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        Running automated audits across all discovered website
                        pages.
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-2">
                        <span className="text-sm font-semibold text-indigo-600">
                          {Math.round(progress)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BAR */}
                  <div className="mt-5">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        style={{ width: `${progress}%` }}
                        className="relative h-full rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 transition-all duration-700"
                      >
                        <div className="absolute inset-0 animate-pulse bg-white/20" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* LOGS */}
                <div className="p-5 sm:p-6">
                  {/* HEADER */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        {isAnalyzing ? (
                          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          Live Analysis Logs
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Real-time diagnostics and crawling updates
                        </p>
                      </div>
                    </div>

                    {/* TOGGLE */}
                    {completed && (
                      <button
                        onClick={() => setLogsOpen(!logsOpen)}
                        className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                      >
                        {logsOpen ? "Hide Logs" : "View Logs"}

                        <ChevronRight
                          className={`h-4 w-4 transition-transform duration-300 ${
                            logsOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* LOGS BODY */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isAnalyzing || logsOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-6 space-y-3">
                      {mainLogs.map((log, index) => (
                        <div key={index}>
                          {/* MAIN LOG */}

                          <div
                            className="
          flex items-center gap-3
          rounded-2xl border border-slate-200
          bg-slate-50/70
          px-4 py-3
        "
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white">
                              {log.status === "running" ? (
                                <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                              ) : log.status === "error" ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              )}
                            </div>

                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-800">
                                {log.message}
                              </p>
                            </div>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase
          ${
            log.status === "running"
              ? "bg-indigo-50 text-indigo-600"
              : log.status === "error"
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
          }`}
                            >
                              {log.status}
                            </span>
                          </div>

                          {/* SUB LOGS */}

                          {log.message === "Starting Lighthouse analysis" &&
                            lighthouseLogs.length > 0 && (
                              <div className="relative ml-10 mt-4 space-y-2 border-l-2 border-indigo-100 pl-6">
                                {lighthouseLogs.map((subLog) => (
                                  <div
                                    key={subLog._id}
                                    className="flex items-center gap-3 rounded-xl bg-indigo-50/40 px-3 py-2"
                                  >
                                    <div className="absolute -left-[7px] h-3 w-3 rounded-full bg-indigo-500" />

                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200">
                                      {subLog.status === "running" ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-600" />
                                      ) : subLog.status === "error" ? (
                                        <XCircle className="h-3.5 w-3.5 text-red-500" />
                                      ) : (
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                      )}
                                    </div>

                                    <div className="flex-1">
                                      <p className="truncate text-sm text-slate-700">
                                        {subLog.message}
                                      </p>
                                    </div>

                                    <span
                                      className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase
            ${
              subLog.status === "running"
                ? "bg-indigo-100 text-indigo-700"
                : subLog.status === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
            }`}
                                    >
                                      {subLog.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* COMPLETED */}
                  {completed && (
                    <div className="mt-6 overflow-hidden rounded-[26px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
                      <div className="flex flex-col gap-6 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        {/* LEFT */}
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          </div>

                          <div>
                            <h4 className="text-base font-semibold text-slate-900">
                              Analysis Completed
                            </h4>

                            <p className="mt-2 max-w-md text-sm leading-7 text-slate-600">
                              Your website audit has been completed
                              successfully. Open the full report to review page
                              scores, detected issues and optimization
                              recommendations.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">
                              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                                <Clock3 className="h-3.5 w-3.5" />
                                Scan Time: {scanDuration}
                              </div>

                              <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
                                <Activity className="h-3.5 w-3.5" />
                                {totalPages} Pages Analyzed
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BUTTON */}
                        <Link
                          href={`/report/${scanId}`}
                          className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
                        >
                          View Full Report
                          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
