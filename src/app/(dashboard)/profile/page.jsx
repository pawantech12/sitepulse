"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Globe,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  UserRound,
  X,
  XCircle,
  Zap,
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

const formatDate = (date) => {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const isCompletedScan = (status) =>
  ["completed", "complete", "success"].includes(
    String(status || "").toLowerCase(),
  );

const isActiveScan = (status) =>
  [
    "pending",
    "queued",
    "running",
    "processing",
    "in_progress",
    "in progress",
  ].includes(String(status || "").toLowerCase());

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

function DetailRow({ label, value, icon: Icon }) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-[#F0F2F5] py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
      <div className="flex items-center gap-2 text-xs font-medium text-[#596273]">
        {Icon && <Icon size={14} className="text-[#96A4B5]" />}
        {label}
      </div>
      <p className="break-all text-xs font-semibold text-[#0b1020] sm:text-right">
        {value || "—"}
      </p>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchProfile = useCallback(
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
            "Unable to load your profile. Please try again.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [router],
  );

  useEffect(() => {
    fetchProfile(true);
  }, [fetchProfile]);

  useEffect(() => {
    if (!scans.some((scan) => isActiveScan(scan.status))) return;
    const interval = setInterval(() => fetchProfile(false), 8000);
    return () => clearInterval(interval);
  }, [scans, fetchProfile]);

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
    await fetchProfile(false);
  };

  const stats = useMemo(() => {
    const completed = scans.filter((scan) => isCompletedScan(scan.status));
    const scores = completed
      .map((scan) => Number(scan.overallScore))
      .filter((score) => Number.isFinite(score));
    return {
      total: scans.length,
      completed: completed.length,
      active: scans.filter((scan) => isActiveScan(scan.status)).length,
      averageScore: scores.length
        ? Math.round(
            scores.reduce((sum, score) => sum + score, 0) / scores.length,
          )
        : null,
    };
  }, [scans]);

  const firstLetter = user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0b1020]">
            <Activity size={22} className="text-white" />
          </div>
          <Loader2 size={20} className="animate-spin text-[#2B6AFF]" />
          <p className="text-sm text-[#596273]">Loading your profile...</p>
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
            <span className="font-semibold text-[#596273]">My Profile</span>
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
              {firstLetter}
            </div>
          </div>
        </header>

        <section className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 xl:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#2B6AFF]">
                Account
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#0b1020] sm:text-[28px]">
                My profile
              </h1>
              <p className="mt-1.5 text-sm text-[#596273]">
                Your account information and website analysis activity.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#DDE2EA] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#596273] transition hover:border-[#2B6AFF] hover:text-[#2B6AFF] disabled:opacity-60"
            >
              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />{" "}
              Refresh profile
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={() => fetchProfile(true)}
                className="shrink-0 font-semibold underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          )}

          <div className="mt-7 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
            <section className="overflow-hidden rounded-xl border border-[#DDE2EA] bg-white">
              <div className="border-b border-[#E9EDF2] px-5 py-4 sm:px-6">
                <h2 className="text-sm font-bold text-[#0b1020]">
                  Personal information
                </h2>
                <p className="mt-1 text-xs text-[#96A4B5]">
                  The account details associated with your SitePulse login.
                </p>
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 rounded-xl bg-[#FAFBFC] p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#EAF0FF] text-xl font-bold text-[#2B6AFF]">
                    {firstLetter}
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-[#0b1020]">
                      {user?.name || "SitePulse user"}
                    </h3>
                    <p className="mt-1 break-all text-xs text-[#596273]">
                      {user?.email || "No email available"}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      <ShieldCheck size={12} /> Authenticated account
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <DetailRow
                    label="Full name"
                    value={user?.name}
                    icon={UserRound}
                  />
                  <DetailRow
                    label="Email address"
                    value={user?.email}
                    icon={Globe}
                  />
                  <DetailRow
                    label="Account created"
                    value={formatDate(user?.createdAt)}
                    icon={CalendarDays}
                  />
                  <DetailRow
                    label="Account ID"
                    value={user?.id || user?._id}
                    icon={ShieldCheck}
                  />
                </div>
                <p className="mt-4 rounded-lg border border-[#E9EDF2] bg-[#FAFBFC] px-3.5 py-3 text-[11px] leading-5 text-[#7B8797]">
                  Profile details are currently displayed from your
                  authenticated account. Editing personal information and
                  changing your password require corresponding backend
                  endpoints, which are not part of the API routes shared so far.
                </p>
              </div>
            </section>

            <div className="space-y-5">
              <section className="rounded-xl border border-[#DDE2EA] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-[#0b1020]">
                      Account overview
                    </h2>
                    <p className="mt-1 text-xs text-[#96A4B5]">
                      Your scanning activity at a glance.
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF3FF] text-[#2B6AFF]">
                    <BarChart3 size={17} />
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <StatCard
                    title="Total scans"
                    value={stats.total}
                    description="All analyses"
                    icon={Globe}
                    iconClass="bg-blue-50 text-[#2B6AFF]"
                  />
                  <StatCard
                    title="Completed"
                    value={stats.completed}
                    description="Successful scans"
                    icon={CheckCircle2}
                    iconClass="bg-emerald-50 text-emerald-600"
                  />
                  <StatCard
                    title="In progress"
                    value={stats.active}
                    description="Active scans"
                    icon={Clock3}
                    iconClass="bg-violet-50 text-violet-600"
                  />
                  <StatCard
                    title="Average score"
                    value={
                      stats.averageScore === null
                        ? "—"
                        : `${stats.averageScore}`
                    }
                    description="Completed scans"
                    icon={Activity}
                    iconClass="bg-amber-50 text-amber-600"
                  />
                </div>
              </section>

              <section className="rounded-xl bg-[#0b1020] p-5 text-white sm:p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-blue-300">
                  <Zap size={18} />
                </div>
                <h2 className="mt-4 text-sm font-bold">
                  Keep your website healthy
                </h2>
                <p className="mt-1.5 text-xs leading-5 text-slate-400">
                  Run a fresh analysis to track performance, SEO, accessibility,
                  and best-practice improvements.
                </p>
                <Link
                  href="/analyze"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2B6AFF] px-3.5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
                >
                  Analyze a website <ArrowRight size={14} />
                </Link>
              </section>
            </div>
          </div>

          <footer className="mt-7 flex flex-col gap-2 pb-5 text-[11px] text-[#96A4B5] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} SitePulse. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={13} /> Your account information is private.
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
