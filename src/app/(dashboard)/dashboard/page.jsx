"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ExternalLink,
  Gauge,
  Globe,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
  XCircle,
  Zap,
  UserRound,
  ScanSearch,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Analyze Website",
    href: "/analyze",
    icon: ScanSearch,
  },
  {
    label: "Scan History",
    href: "/scans",
    icon: BarChart3,
  },
  {
    label: "My Profile",
    href: "/profile",
    icon: UserRound,
  },
];

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getHostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url || "Unknown website";
  }
};

const getStatus = (status) => {
  const value = (status || "pending").toLowerCase();

  if (["completed", "complete", "success"].includes(value)) {
    return {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
  }

  if (["failed", "error"].includes(value)) {
    return {
      label: "Failed",
      icon: XCircle,
      className: "bg-red-50 text-red-600 border-red-100",
    };
  }

  if (["running", "processing", "in_progress"].includes(value)) {
    return {
      label: "In progress",
      icon: Loader2,
      className: "bg-blue-50 text-blue-700 border-blue-100",
    };
  }

  return {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 border-amber-100",
  };
};

const isActiveScan = (status) =>
  ["pending", "running", "processing", "in_progress"].includes(
    (status || "").toLowerCase(),
  );

function StatusBadge({ status }) {
  const config = getStatus(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${config.className}`}
    >
      <Icon
        size={12}
        className={
          ["running", "processing", "in_progress"].includes(
            (status || "").toLowerCase(),
          )
            ? "animate-spin"
            : ""
        }
      />
      {config.label}
    </span>
  );
}

function Score({ value }) {
  if (value === null || value === undefined) {
    return <span className="text-sm text-[#96A4B5]">—</span>;
  }

  const score = Math.round(value);
  const color =
    score >= 90
      ? "text-emerald-600"
      : score >= 50
        ? "text-amber-600"
        : "text-red-600";

  return (
    <span className={`text-sm font-bold tabular-nums ${color}`}>
      {score}
      <span className="ml-0.5 text-[10px] font-medium text-[#96A4B5]">
        /100
      </span>
    </span>
  );
}

function StatCard({ title, value, description, icon: Icon, iconClass }) {
  return (
    <div className="rounded-xl border border-[#DDE2EA] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#596273]">{title}</p>
          <p className="mt-2 text-[26px] font-bold tracking-tight text-[#0b1020]">
            {value}
          </p>
          <p className="mt-1 text-[11px] text-[#96A4B5]">{description}</p>
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ pathname, onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#E9EDF2] px-5 py-5">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2B6AFF]">
            <Activity size={19} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0b1020]">
            SitePulse
          </span>
        </Link>
      </div>

      <div className="px-4 pt-7">
        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#96A4B5]">
          Workspace
        </p>

        <nav className="mt-3 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] transition ${
                  active
                    ? "bg-[#EEF3FF] font-semibold text-[#2B6AFF]"
                    : "font-medium text-[#596273] hover:bg-[#f7f8fa] hover:text-[#0b1020]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon
                    size={17}
                    className={
                      active
                        ? "text-[#2B6AFF]"
                        : "text-[#8995A7] group-hover:text-[#0b1020]"
                    }
                  />
                  {item.label}
                </span>

                {active && <ChevronRight size={15} />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto px-4 pb-5">
        <div className="rounded-xl bg-[#0b1020] p-4 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <Zap size={16} className="text-blue-400" />
          </div>

          <p className="mt-3 text-sm font-semibold">Improve your website</p>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Run regular scans to discover performance and SEO opportunities.
          </p>

          <Link
            href="/analyze"
            onClick={onNavigate}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 transition hover:text-white"
          >
            Analyze website <ArrowRight size={13} />
          </Link>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="mt-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-[#596273] transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startingScan, setStartingScan] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [scanError, setScanError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchDashboard = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);

        const [userResponse, scansResponse] = await Promise.all([
          axios.get("/api/auth/me"),
          axios.get("/api/scan"),
        ]);

        if (!userResponse.data?.success || !userResponse.data?.user) {
          router.replace("/login");
          return;
        }

        setUser(userResponse.data.user);
        setScans(scansResponse.data?.scans || []);
        setError("");
      } catch (err) {
        if (err.response?.status === 401) {
          router.replace("/login");
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load your dashboard. Please try again.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router],
  );

  useEffect(() => {
    fetchDashboard(true);
  }, [fetchDashboard]);

  useEffect(() => {
    const hasActiveScans = scans.some((scan) => isActiveScan(scan.status));

    if (!hasActiveScans) return;

    const interval = setInterval(() => {
      fetchDashboard(false);
    }, 8000);

    return () => clearInterval(interval);
  }, [scans, fetchDashboard]);

  const handleStartScan = async (event) => {
    event.preventDefault();

    const value = websiteUrl.trim();

    if (!value) {
      setScanError("Please enter a website URL.");
      return;
    }

    let normalizedUrl;

    try {
      normalizedUrl = new URL(
        /^https?:\/\//i.test(value) ? value : `https://${value}`,
      );

      if (!["http:", "https:"].includes(normalizedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      setScanError("Please enter a valid website URL.");
      return;
    }

    try {
      setStartingScan(true);
      setScanError("");

      const response = await axios.post("/api/scan", {
        url: normalizedUrl.toString(),
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Unable to start scan.");
      }

      setWebsiteUrl("");
      await fetchDashboard(false);
    } catch (err) {
      setScanError(
        err.response?.data?.message ||
          err.message ||
          "Unable to start scan. Please try again.",
      );
    } finally {
      setStartingScan(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboard(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  };

  const stats = useMemo(() => {
    const completedScans = scans.filter((scan) =>
      ["completed", "complete", "success"].includes(
        (scan.status || "").toLowerCase(),
      ),
    );

    const totalPages = scans.reduce(
      (total, scan) => total + (Number(scan.completedPages) || 0),
      0,
    );

    const scoredScans = completedScans.filter(
      (scan) =>
        typeof scan.overallScore === "number" &&
        Number.isFinite(scan.overallScore),
    );

    const averageScore = scoredScans.length
      ? Math.round(
          scoredScans.reduce((total, scan) => total + scan.overallScore, 0) /
            scoredScans.length,
        )
      : null;

    return {
      totalScans: scans.length,
      completedScans: completedScans.length,
      totalPages,
      averageScore,
      activeScans: scans.filter((scan) => isActiveScan(scan.status)).length,
    };
  }, [scans]);

  const filteredScans = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return scans;

    return scans.filter((scan) =>
      getHostname(scan.url).toLowerCase().includes(query),
    );
  }, [scans, search]);

  const firstName = user?.name?.trim()?.split(/\s+/)[0] || "there";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b1020]">
            <Activity size={22} className="text-white" />
          </div>
          <Loader2 size={20} className="animate-spin text-[#2B6AFF]" />
          <p className="text-sm text-[#596273]">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#0b1020]">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-[64px] items-center justify-between border-b border-[#DDE2EA] bg-white px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2B6AFF]">
            <Activity size={19} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">SitePulse</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#596273]"
        >
          <Menu size={19} />
        </button>
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[245px] border-r border-[#DDE2EA] bg-white lg:block">
        <Sidebar
          pathname={pathname}
          onNavigate={() => {}}
          onLogout={handleLogout}
        />
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-[#0b1020]/40"
          />

          <aside className="absolute inset-y-0 left-0 flex w-[285px] max-w-[85vw] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-end border-b border-[#E9EDF2] px-4 py-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#596273] hover:bg-[#f7f8fa]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="min-h-0 flex-1">
              <Sidebar
                pathname={pathname}
                onNavigate={() => setMobileMenuOpen(false)}
                onLogout={handleLogout}
              />
            </div>
          </aside>
        </div>
      )}

      {/* Main workspace */}
      <div className="min-h-screen lg:pl-[245px]">
        {/* Desktop top bar */}
        <header className="sticky top-0 z-20 hidden h-[68px] items-center justify-between border-b border-[#DDE2EA] bg-white/95 px-8 backdrop-blur lg:flex xl:px-10">
          <div>
            <p className="text-xs font-medium text-[#96A4B5]">
              Workspace /{" "}
              <span className="font-semibold text-[#596273]">Dashboard</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-semibold text-[#0b1020]">
                {user?.name || "Your account"}
              </p>
              <p className="mt-0.5 text-[11px] text-[#96A4B5]">
                {user?.email || ""}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF0FF] text-xs font-bold text-[#2B6AFF]">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 xl:px-10">
          {/* Page heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B6AFF]">
                Overview
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0b1020] sm:text-[28px]">
                Welcome back, {firstName}
              </h1>

              <p className="mt-1.5 text-sm text-[#596273]">
                Monitor your website health and manage your scans.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex items-center gap-2 rounded-lg border border-[#DDE2EA] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#596273] transition hover:border-[#2B6AFF] hover:text-[#2B6AFF] disabled:opacity-60"
              >
                <RefreshCw
                  size={14}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b1020] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#202b45]"
              >
                <Plus size={15} />
                New analysis
              </Link>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              <CircleAlert size={17} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total scans"
              value={stats.totalScans}
              description="Websites scanned"
              icon={Globe}
              iconClass="bg-blue-50 text-[#2B6AFF]"
            />

            <StatCard
              title="Pages analyzed"
              value={stats.totalPages}
              description="Successfully completed pages"
              icon={BarChart3}
              iconClass="bg-violet-50 text-violet-600"
            />

            <StatCard
              title="Completed scans"
              value={stats.completedScans}
              description="Successfully finished"
              icon={CheckCircle2}
              iconClass="bg-emerald-50 text-emerald-600"
            />

            <StatCard
              title="Average score"
              value={
                stats.averageScore === null ? "—" : `${stats.averageScore}/100`
              }
              description="Across completed scans"
              icon={Gauge}
              iconClass="bg-amber-50 text-amber-600"
            />
          </div>

          {/* Active scans notice */}
          {stats.activeScans > 0 && (
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#2B6AFF]">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#174FD1]">
                    {stats.activeScans} scan
                    {stats.activeScans > 1 ? "s" : ""} in progress
                  </p>
                  <p className="mt-0.5 text-[11px] text-blue-700/70">
                    Your dashboard automatically refreshes scan status.
                  </p>
                </div>
              </div>

              <Link
                href="/scans"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174FD1]"
              >
                View scans <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Start scan card */}
          <div className="mt-7 overflow-hidden rounded-xl border border-[#DDE2EA] bg-white">
            <div className="flex items-center justify-between border-b border-[#E9EDF2] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#2B6AFF]">
                  <ScanSearch size={19} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0b1020]">
                    Quick website analysis
                  </h2>
                  <p className="mt-0.5 text-xs text-[#96A4B5]">
                    Start a new scan without leaving your dashboard.
                  </p>
                </div>
              </div>

              <Link
                href="/analyze"
                className="hidden items-center gap-1 text-xs font-semibold text-[#2B6AFF] hover:text-[#174FD1] sm:inline-flex"
              >
                Advanced options <ArrowRight size={13} />
              </Link>
            </div>

            <form onSubmit={handleStartScan} className="p-5 sm:px-6 sm:py-5">
              <label
                htmlFor="websiteUrl"
                className="mb-2 block text-xs font-semibold text-[#30394A]"
              >
                Website URL
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Globe
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#96A4B5]"
                  />
                  <input
                    id="websiteUrl"
                    type="text"
                    value={websiteUrl}
                    onChange={(event) => {
                      setWebsiteUrl(event.target.value);
                      setScanError("");
                    }}
                    placeholder="https://example.com"
                    className="w-full rounded-lg border border-[#DDE2EA] bg-white py-3 pl-10 pr-4 text-sm text-[#0b1020] outline-none transition placeholder:text-[#96A4B5] focus:border-[#2B6AFF] focus:ring-4 focus:ring-[#2B6AFF]/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={startingScan}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0b1020] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#202b45] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {startingScan ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Start scan
                    </>
                  )}
                </button>
              </div>

              {scanError && (
                <p role="alert" className="mt-2 text-xs text-red-500">
                  {scanError}
                </p>
              )}

              <p className="mt-3 text-[11px] text-[#96A4B5]">
                Enter a domain such as example.com or a full HTTP/HTTPS URL.
              </p>
            </form>
          </div>

          {/* Recent scans */}
          <div className="mt-7 overflow-hidden rounded-xl border border-[#DDE2EA] bg-white">
            <div className="flex flex-col gap-3 border-b border-[#E9EDF2] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-sm font-bold text-[#0b1020]">
                  Recent scans
                </h2>
                <p className="mt-1 text-xs text-[#96A4B5]">
                  Keep track of your latest website reports.
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative w-full sm:w-[220px]">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#96A4B5]"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search websites..."
                    className="w-full rounded-lg border border-[#DDE2EA] py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-[#96A4B5] focus:border-[#2B6AFF] focus:ring-4 focus:ring-[#2B6AFF]/10"
                  />
                </div>

                <Link
                  href="/scans"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#DDE2EA] px-3 py-2.5 text-xs font-semibold text-[#596273] transition hover:border-[#2B6AFF] hover:text-[#2B6AFF]"
                >
                  All scans <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {filteredScans.length === 0 ? (
              <div className="flex flex-col items-center px-5 py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#2B6AFF]">
                  {search ? <Search size={21} /> : <Globe size={21} />}
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#0b1020]">
                  {search ? "No matching websites" : "No scans yet"}
                </h3>

                <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#96A4B5]">
                  {search
                    ? "Try searching with another website name."
                    : "Start your first website scan to see your performance reports here."}
                </p>

                {!search && (
                  <Link
                    href="/analyze"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0b1020] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#202b45]"
                  >
                    <Plus size={14} />
                    Analyze website
                  </Link>
                )}
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[720px] text-left">
                    <thead>
                      <tr className="border-b border-[#E9EDF2] bg-[#FAFBFC]">
                        {[
                          "Website",
                          "Date",
                          "Pages",
                          "Score",
                          "Status",
                          "Report",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#96A4B5] first:pl-6 last:pr-6 ${
                              heading === "Report" ? "text-right" : ""
                            }`}
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {filteredScans.slice(0, 5).map((scan) => (
                        <tr
                          key={scan._id}
                          className="border-b border-[#F0F2F5] last:border-0 transition hover:bg-[#FAFBFC]"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#2B6AFF]">
                                <Globe size={16} />
                              </div>
                              <div className="min-w-0">
                                <p className="max-w-[210px] truncate text-xs font-semibold text-[#0b1020]">
                                  {getHostname(scan.url)}
                                </p>
                                <p className="mt-1 max-w-[210px] truncate text-[10px] text-[#96A4B5]">
                                  {scan.url}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-4 text-xs text-[#596273]">
                            {formatDate(scan.createdAt)}
                          </td>

                          <td className="px-4 py-4 text-xs text-[#596273]">
                            {scan.completedPages || 0}
                            {scan.totalPages > 0 ? ` / ${scan.totalPages}` : ""}
                          </td>

                          <td className="px-4 py-4">
                            <Score value={scan.overallScore} />
                          </td>

                          <td className="px-4 py-4">
                            <StatusBadge status={scan.status} />
                          </td>

                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/report/${scan._id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B6AFF] transition hover:text-[#174FD1]"
                            >
                              View report <ExternalLink size={13} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="divide-y divide-[#F0F2F5] md:hidden">
                  {filteredScans.slice(0, 5).map((scan) => (
                    <div key={scan._id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#2B6AFF]">
                            <Globe size={16} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#0b1020]">
                              {getHostname(scan.url)}
                            </p>
                            <p className="mt-1 text-[10px] text-[#96A4B5]">
                              {formatDate(scan.createdAt)}
                            </p>
                          </div>
                        </div>

                        <StatusBadge status={scan.status} />
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-[#FAFBFC] p-3">
                        <div>
                          <p className="text-[10px] text-[#96A4B5]">Pages</p>
                          <p className="mt-1 text-sm font-semibold text-[#0b1020]">
                            {scan.completedPages || 0}
                            {scan.totalPages > 0 ? `/${scan.totalPages}` : ""}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-[#96A4B5]">Score</p>
                          <p className="mt-1">
                            <Score value={scan.overallScore} />
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-[#96A4B5]">Duration</p>
                          <p className="mt-1 text-sm font-semibold text-[#0b1020]">
                            {scan.scanDuration || "—"}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/report/${scan._id}`}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B6AFF]"
                      >
                        View report <ArrowRight size={14} />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="flex items-center justify-between border-t border-[#E9EDF2] bg-[#FAFBFC] px-5 py-3 sm:px-6">
              <p className="text-[11px] text-[#96A4B5]">
                Showing {Math.min(filteredScans.length, 5)} of{" "}
                {filteredScans.length} matching scans
              </p>

              <Link
                href="/scans"
                className="text-[11px] font-semibold text-[#2B6AFF] hover:text-[#174FD1]"
              >
                View all
              </Link>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-7 flex flex-col gap-2 pb-5 text-[11px] text-[#96A4B5] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SitePulse. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={13} />
              Your scan history is private to your account.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
