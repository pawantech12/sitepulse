"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import {
  Menu,
  X,
  ChevronRight,
  Activity,
  LayoutDashboard,
  UserRound,
  LogOut,
  ScanSearch,
} from "lucide-react";

const navLinks = [
  { name: "Product", href: "#product" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Reports", href: "#reports" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const isAuthenticated = Boolean(user);

  // Check the current session using your existing auth API.
  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        if (!mounted) return;

        if (response.data?.success && response.data?.user) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  // Navbar scroll effect.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // Logout using the existing backend endpoint.
  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      await axios.post("/api/auth/logout", {}, { withCredentials: true });

      setUser(null);
      setMobileMenu(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoggingOut(false);
    }
  };

  const closeMobileMenu = () => setMobileMenu(false);

  return (
    <>
      {/* MAIN NAVBAR */}
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-all duration-200 ${
          scrolled
            ? "border-[#dde2ea]/80 bg-[#f7f8fa]/95 backdrop-blur-md"
            : "border-[#dde2ea] bg-[#f7f8fa]"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1220px] items-center px-5 sm:px-6 lg:px-0">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-[10px]"
            aria-label="SitePulse home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#0b1020] transition-transform duration-200 group-hover:scale-[1.03]">
              <Activity
                className="h-[18px] w-[18px] text-white"
                strokeWidth={2.2}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[15px] font-bold leading-[16px] tracking-[-0.02em] text-[#0b1020]">
                SITEPULSE
              </span>

              <span className="mt-[2px] text-[9px] font-medium leading-[11px] tracking-[0.01em] text-[#a8b0be]">
                Web Audit Platform
              </span>
            </div>
          </Link>

          {/* DESKTOP PUBLIC NAVIGATION */}
          {!isAuthenticated && (
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-[17px] text-[14px] font-medium leading-none tracking-[-0.01em] text-[#596273] transition-colors duration-150 hover:text-[#0b1020]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* DESKTOP AUTHENTICATED NAVIGATION */}
          {isAuthenticated && (
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 rounded-[7px] px-4 py-2 text-[13px] font-medium transition-colors ${
                  pathname === "/dashboard"
                    ? "bg-[#e9efff] text-[#2b6aff]"
                    : "text-[#596273] hover:bg-[#eef0f4] hover:text-[#0b1020]"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <Link
                href="/analyze"
                className={`flex items-center gap-2 rounded-[7px] px-4 py-2 text-[13px] font-medium transition-colors ${
                  pathname === "/analyze"
                    ? "bg-[#e9efff] text-[#2b6aff]"
                    : "text-[#596273] hover:bg-[#eef0f4] hover:text-[#0b1020]"
                }`}
              >
                <ScanSearch className="h-4 w-4" />
                Analyze
              </Link>

              <Link
                href="/scans"
                className={`rounded-[7px] px-4 py-2 text-[13px] font-medium transition-colors ${
                  pathname === "/scans"
                    ? "bg-[#e9efff] text-[#2b6aff]"
                    : "text-[#596273] hover:bg-[#eef0f4] hover:text-[#0b1020]"
                }`}
              >
                Scans
              </Link>
            </nav>
          )}

          {/* DESKTOP ACTIONS */}
          <div className="ml-auto hidden items-center gap-[22px] lg:flex">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  className="text-[14px] font-medium leading-none tracking-[-0.01em] text-[#596273] transition-colors duration-150 hover:text-[#0b1020]"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  className="flex h-[42px] w-[150px] items-center justify-center gap-[9px] rounded-[8px] bg-[#0b1020] text-[14px] font-semibold leading-none tracking-[-0.015em] text-white transition-all duration-200 hover:bg-[#151c2e] active:scale-[0.99]"
                >
                  <span>Get Started</span>
                  <ChevronRight className="h-[15px] w-[15px]" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-[13px] font-medium text-[#596273] transition-colors hover:text-[#0b1020]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dde2ea] bg-white text-[#0b1020]">
                    <UserRound className="h-4 w-4" />
                  </span>

                  <span className="max-w-[125px] truncate">
                    {user.name || user.email || "My Profile"}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex h-[38px] items-center gap-2 rounded-[8px] border border-[#dde2ea] bg-white px-3 text-[13px] font-semibold text-[#596273] transition-colors hover:bg-[#f0f2f5] hover:text-[#0b1020] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Signing out..." : "Logout"}
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenu((prev) => !prev)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#dde2ea] bg-white text-[#0b1020] transition-colors hover:bg-[#f0f2f5] lg:hidden"
          >
            {mobileMenu ? (
              <X className="h-[19px] w-[19px]" strokeWidth={2} />
            ) : (
              <Menu className="h-[19px] w-[19px]" strokeWidth={2} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        aria-hidden="true"
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-40 bg-[#0b1020]/25 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${
          mobileMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* MOBILE MENU */}
      <aside
        className={`fixed right-0 top-0 z-[60] flex h-dvh w-[min(88vw,380px)] flex-col border-l border-[#dde2ea] bg-[#f7f8fa] transition-transform duration-300 ease-out lg:hidden ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileMenu}
      >
        {/* MOBILE HEADER */}
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[#dde2ea] px-5">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-[10px]"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#0b1020]">
              <Activity
                className="h-[18px] w-[18px] text-white"
                strokeWidth={2.2}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-[15px] font-bold leading-[16px] tracking-[-0.02em] text-[#0b1020]">
                SITEPULSE
              </span>
              <span className="mt-[2px] text-[9px] font-medium leading-[11px] text-[#a8b0be]">
                Web Audit Platform
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#dde2ea] bg-white text-[#0b1020]"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>

        {/* MOBILE LINKS */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-5 py-7">
          {!isAuthenticated ? (
            <div className="flex flex-col">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="group flex min-h-[52px] items-center justify-between border-b border-[#dde2ea] text-[15px] font-medium text-[#596273] transition-colors hover:text-[#0b1020]"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-4 w-4 text-[#a8b0be] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {[
                {
                  name: "Dashboard",
                  href: "/dashboard",
                  icon: LayoutDashboard,
                },
                { name: "Analyze Website", href: "/analyze", icon: ScanSearch },
                { name: "My Scans", href: "/scans", icon: Activity },
                { name: "My Profile", href: "/profile", icon: UserRound },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex min-h-[52px] items-center gap-3 border-b border-[#dde2ea] text-[15px] font-medium transition-colors ${
                      pathname === item.href
                        ? "text-[#2b6aff]"
                        : "text-[#596273] hover:text-[#0b1020]"
                    }`}
                  >
                    <Icon className="h-[17px] w-[17px]" />
                    {item.name}
                    <ChevronRight className="ml-auto h-4 w-4 text-[#a8b0be]" />
                  </Link>
                );
              })}
            </div>
          )}

          {/* MOBILE ACTIONS */}
          <div className="mt-auto flex flex-col gap-3 pt-8">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex h-[44px] items-center justify-center rounded-[8px] border border-[#dde2ea] bg-white text-[14px] font-semibold text-[#0b1020] transition-colors hover:bg-[#f0f2f5]"
                >
                  Sign In
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-[#0b1020] text-[14px] font-semibold text-white transition-colors hover:bg-[#151c2e]"
                >
                  Get Started
                  <ChevronRight className="h-[15px] w-[15px]" />
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex h-[44px] items-center justify-center gap-2 rounded-[8px] border border-[#dde2ea] bg-white text-[14px] font-semibold text-[#596273] transition-colors hover:bg-[#f0f2f5] disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" />
                {loggingOut ? "Signing out..." : "Logout"}
              </button>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
