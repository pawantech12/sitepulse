"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Filter,
  Globe,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ScanSearch,
  UserRound,
  X,
  XCircle,
  Zap,
  CalendarDays,
  Gauge,
  RotateCcw,
} from "lucide-react";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analyze Website", href: "/analyze", icon: ScanSearch },
  { label: "Scan History", href: "/scans", icon: BarChart3 },
  { label: "My Profile", href: "/profile", icon: UserRound },
];

const PAGE_SIZE = 10;

const getHostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url || "Unknown website";
  }
};

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const getStatus = (status) => {
  const value = String(status || "pending").toLowerCase();

  if (["completed", "complete", "success"].includes(value)) {
    return {
      label: "Completed",
      icon: CheckCircle2,
      className: "border-emerald-100 bg-emerald-50 text-emerald-700",
    };
  }

  if (["failed", "error"].includes(value)) {
    return {
      label: "Failed",
      icon: XCircle,
      className: "border-red-100 bg-red-50 text-red-600",
    };
  }

  if (["running", "processing", "in_progress", "in progress"].includes(value)) {
    return {
      label: "In progress",
      icon: Loader2,
      className: "border-blue-100 bg-blue-50 text-blue-700",
    };
  }

  return {
    label: "Pending",
    icon: Clock3,
    className: "border-amber-100 bg-amber-50 text-amber-700",
  };
};

const isActiveScan = (status) =>
  [
    "pending",
    "queued",
    "running",
    "processing",
    "in_progress",
    "in progress",
  ].includes(String(status || "").toLowerCase());

const isCompletedScan = (status) =>
  ["completed", "complete", "success"].includes(
    String(status || "").toLowerCase(),
  );

function StatusBadge({ status }) {
  const config = getStatus(status);
  const Icon = config.icon;
  const active = isActiveScan(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${config.className}`}
    >
      <Icon
        size={12}
        className={
          active &&
          ["running", "processing", "in_progress", "in progress"].includes(
            String(status || "").toLowerCase(),
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
  const parsed =
    value === null || value === undefined || value === ""
      ? null
      : Number(value);
  if (parsed === null || !Number.isFinite(parsed)) {
    return <span className="text-sm text-[#96A4B5]">—</span>;
  }

  const score = Math.round(parsed);
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
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
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

export default function ScansPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchScans = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) setLoading(true);

        const [userResponse, scansResponse] = await Promise.all([
          api.get("/auth/me"),
          api.get("/scan"),
        ]);

        if (!userResponse.data?.success || !userResponse.data?.user) {
          router.replace("/login");
          return;
        }

        setUser(userResponse.data.user);
        setScans(
          Array.isArray(scansResponse.data?.scans)
            ? scansResponse.data.scans
            : [],
        );
        setError("");
      } catch (err) {
        if (err.response?.status === 401) {
          router.replace("/login");
          return;
        }
        setError(
          err.response?.data?.message ||
            "Unable to load your scan history. Please try again.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router],
  );

  useEffect(() => {
    fetchScans(true);
  }, [fetchScans]);

  useEffect(() => {
    if (!scans.some((scan) => isActiveScan(scan.status))) return;
    const interval = setInterval(() => fetchScans(false), 8000);
    return () => clearInterval(interval);
  }, [scans, fetchScans]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchScans(false);
  };

  const stats = useMemo(
    () => ({
      total: scans.length,
      completed: scans.filter((scan) => isCompletedScan(scan.status)).length,
      active: scans.filter((scan) => isActiveScan(scan.status)).length,
      failed: scans.filter((scan) =>
        ["failed", "error"].includes(String(scan.status || "").toLowerCase()),
      ).length,
    }),
    [scans],
  );

  const filteredScans = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = scans.filter((scan) => {
      const matchesSearch =
        !query ||
        getHostname(scan.url).toLowerCase().includes(query) ||
        String(scan.url || "")
          .toLowerCase()
          .includes(query);
      const status = String(scan.status || "pending").toLowerCase();
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && isCompletedScan(status)) ||
        (statusFilter === "active" && isActiveScan(status)) ||
        (statusFilter === "failed" && ["failed", "error"].includes(status));
      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [scans, search, statusFilter, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredScans.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedScans = filteredScans.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );
  const firstName = user?.name?.trim()?.split(/\s+/)[0] || "there";

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, sortOrder]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b1020]">
            <Activity size={22} className="text-white" />
          </div>
          <Loader2 size={20} className="animate-spin text-[#2B6AFF]" />
          <p className="text-sm text-[#596273]">Loading your scan history...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#0b1020]">
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

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[245px] border-r border-[#DDE2EA] bg-white lg:block">
        <Sidebar
          pathname={pathname}
          onNavigate={() => {}}
          onLogout={handleLogout}
        />
      </aside>

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

      <div className="min-h-screen lg:pl-[245px]">
        <header className="sticky top-0 z-20 hidden h-[68px] items-center justify-between border-b border-[#DDE2EA] bg-white/95 px-8 backdrop-blur lg:flex xl:px-10">
          <p className="text-xs font-medium text-[#96A4B5]">
            Workspace /{" "}
            <span className="font-semibold text-[#596273]">Scan History</span>
          </p>
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
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B6AFF]">
                Workspace
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0b1020] sm:text-[28px]">
                Scan history
              </h1>
              <p className="mt-1.5 text-sm text-[#596273]">
                Review, search, and manage every website scan in your account,{" "}
                {firstName}.
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
                />{" "}
                Refresh
              </button>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0b1020] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#202b45]"
              >
                <Plus size={15} /> New analysis
              </Link>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={() => fetchScans(true)}
                className="shrink-0 font-semibold underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total scans"
              value={stats.total}
              description="All website analyses"
              icon={Globe}
              iconClass="bg-blue-50 text-[#2B6AFF]"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              description="Successfully finished"
              icon={CheckCircle2}
              iconClass="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              title="In progress"
              value={stats.active}
              description="Pending or currently running"
              icon={Clock3}
              iconClass="bg-violet-50 text-violet-600"
            />
            <StatCard
              title="Failed scans"
              value={stats.failed}
              description="Scans that need attention"
              icon={XCircle}
              iconClass="bg-red-50 text-red-600"
            />
          </div>

          {stats.active > 0 && (
            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#2B6AFF]">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#174FD1]">
                    {stats.active} scan{stats.active === 1 ? "" : "s"} currently
                    active
                  </p>
                  <p className="mt-0.5 text-[11px] text-blue-700/70">
                    This page checks for scan updates automatically.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#174FD1]">
                Auto-refresh · 8 seconds
              </span>
            </div>
          )}

          <div className="mt-7 overflow-hidden rounded-xl border border-[#DDE2EA] bg-white">
            <div className="border-b border-[#E9EDF2] px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[#0b1020]">
                    All scans
                  </h2>
                  <p className="mt-1 text-xs text-[#96A4B5]">
                    Your latest website analysis activity.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(220px,1fr)_170px_160px] xl:w-auto">
                  <div className="relative min-w-0">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#96A4B5]"
                    />
                    <input
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search websites..."
                      aria-label="Search scans by website"
                      className="w-full rounded-lg border border-[#DDE2EA] bg-white py-2.5 pl-9 pr-3 text-xs text-[#0b1020] outline-none transition placeholder:text-[#96A4B5] focus:border-[#2B6AFF] focus:ring-4 focus:ring-[#2B6AFF]/10"
                    />
                  </div>
                  <div className="relative">
                    <Filter
                      size={14}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#96A4B5]"
                    />
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      aria-label="Filter scans by status"
                      className="w-full appearance-none rounded-lg border border-[#DDE2EA] bg-white py-2.5 pl-9 pr-8 text-xs font-medium text-[#596273] outline-none focus:border-[#2B6AFF] focus:ring-4 focus:ring-[#2B6AFF]/10"
                    >
                      <option value="all">All statuses</option>
                      <option value="completed">Completed</option>
                      <option value="active">In progress</option>
                      <option value="failed">Failed</option>
                    </select>
                    <ChevronRight
                      size={14}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[#96A4B5]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSortOrder((current) =>
                        current === "newest" ? "oldest" : "newest",
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DDE2EA] px-3 py-2.5 text-xs font-semibold text-[#596273] transition hover:border-[#2B6AFF] hover:text-[#2B6AFF]"
                  >
                    {sortOrder === "newest" ? (
                      <ArrowDown size={14} />
                    ) : (
                      <ArrowUp size={14} />
                    )}
                    {sortOrder === "newest" ? "Newest first" : "Oldest first"}
                    <ArrowUpDown size={13} className="text-[#96A4B5]" />
                  </button>
                </div>
              </div>
            </div>

            {filteredScans.length === 0 ? (
              <div className="flex flex-col items-center px-5 py-14 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3FF] text-[#2B6AFF]">
                  {search || statusFilter !== "all" ? (
                    <Search size={21} />
                  ) : (
                    <Globe size={21} />
                  )}
                </div>
                <h3 className="mt-4 text-sm font-bold text-[#0b1020]">
                  {search || statusFilter !== "all"
                    ? "No matching scans"
                    : "No scans yet"}
                </h3>
                <p className="mt-1.5 max-w-xs text-xs leading-5 text-[#96A4B5]">
                  {search || statusFilter !== "all"
                    ? "Try changing your search or status filter."
                    : "Start your first website scan and your reports will appear here."}
                </p>
                {search || statusFilter !== "all" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("all");
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#2B6AFF] hover:text-[#174FD1]"
                  >
                    <RotateCcw size={13} /> Clear filters
                  </button>
                ) : (
                  <Link
                    href="/analyze"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0b1020] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#202b45]"
                  >
                    <Plus size={14} /> Analyze website
                  </Link>
                )}
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[850px] text-left">
                    <thead>
                      <tr className="border-b border-[#E9EDF2] bg-[#FAFBFC]">
                        {[
                          "Website",
                          "Date created",
                          "Pages",
                          "Overall score",
                          "Duration",
                          "Status",
                          "Report",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#96A4B5] first:pl-6 last:pr-6 ${heading === "Report" ? "text-right" : ""}`}
                          >
                            {heading}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedScans.map((scan) => (
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
                                <p className="max-w-[220px] truncate text-xs font-semibold text-[#0b1020]">
                                  {getHostname(scan.url)}
                                </p>
                                <p className="mt-1 max-w-[220px] truncate text-[10px] text-[#96A4B5]">
                                  {scan.url}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-xs text-[#596273]">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays
                                size={13}
                                className="text-[#96A4B5]"
                              />
                              {formatDate(scan.createdAt)}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-[#596273]">
                            {Number(scan.completedPages) || 0}
                            {Number(scan.totalPages) > 0
                              ? ` / ${scan.totalPages}`
                              : ""}
                          </td>
                          <td className="px-4 py-4">
                            <Score value={scan.overallScore} />
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-xs text-[#596273]">
                            {scan.scanDuration || "—"}
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={scan.status} />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/report/${scan._id}`}
                              className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[#2B6AFF] transition hover:text-[#174FD1]"
                            >
                              View report <ExternalLink size={13} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-[#F0F2F5] md:hidden">
                  {paginatedScans.map((scan) => (
                    <article key={scan._id} className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#2B6AFF]">
                            <Globe size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#0b1020]">
                              {getHostname(scan.url)}
                            </p>
                            <p className="mt-1 truncate text-[10px] text-[#96A4B5]">
                              {scan.url}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={scan.status} />
                      </div>
                      <p className="mt-3 flex items-center gap-1.5 text-[10px] text-[#96A4B5]">
                        <CalendarDays size={12} />
                        {formatDate(scan.createdAt)}
                      </p>
                      <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-[#FAFBFC] p-3">
                        <div>
                          <p className="text-[10px] text-[#96A4B5]">Pages</p>
                          <p className="mt-1 text-sm font-semibold text-[#0b1020]">
                            {Number(scan.completedPages) || 0}
                            {Number(scan.totalPages) > 0
                              ? `/${scan.totalPages}`
                              : ""}
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
                    </article>
                  ))}
                </div>
              </>
            )}

            {filteredScans.length > 0 && (
              <div className="flex flex-col gap-3 border-t border-[#E9EDF2] bg-[#FAFBFC] px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-[11px] text-[#96A4B5]">
                  Showing{" "}
                  {Math.min(
                    (safePage - 1) * PAGE_SIZE + 1,
                    filteredScans.length,
                  )}
                  –{Math.min(safePage * PAGE_SIZE, filteredScans.length)} of{" "}
                  {filteredScans.length} scans
                </p>
                <div className="flex items-center justify-between gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    disabled={safePage === 1}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#DDE2EA] bg-white px-3 py-2 text-xs font-semibold text-[#596273] transition hover:border-[#2B6AFF] hover:text-[#2B6AFF] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <span className="px-2 text-[11px] font-medium tabular-nums text-[#596273]">
                    Page {safePage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={safePage === totalPages}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#DDE2EA] bg-white px-3 py-2 text-xs font-semibold text-[#596273] transition hover:border-[#2B6AFF] hover:text-[#2B6AFF] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <footer className="mt-7 flex flex-col gap-2 pb-5 text-[11px] text-[#96A4B5] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SitePulse. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={13} /> Your scan history is private to your
              account.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
