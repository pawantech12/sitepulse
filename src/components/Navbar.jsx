"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Menu, X, ChevronRight, Activity, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "Docs", href: "#docs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 shadow-lg shadow-indigo-500/20 transition-all duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <Activity className="relative h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                SitePulse
              </h2>

              <p className="-mt-0.5 text-xs font-medium text-slate-500">
                Website Analytics Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center rounded-2xl border border-slate-200/80 bg-white/70 p-1 backdrop-blur-xl lg:flex">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/analyze"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <Sparkles className="relative h-4 w-4" />

              <span className="relative">Start Analyzing</span>

              <ChevronRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100 lg:hidden"
          >
            {mobileMenu ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          mobileMenu ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setMobileMenu(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl transition-all duration-300 lg:hidden ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-500/20">
              <Activity className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">SitePulse</h2>

              <p className="text-xs text-slate-500">Analytics Platform</p>
            </div>
          </div>

          <button
            onClick={() => setMobileMenu(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 flex-col justify-between px-5 py-6">
          <nav className="space-y-2">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="group flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                <span>{item.name}</span>

                <ChevronRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="space-y-3 border-t border-slate-200 pt-6">
            <Link
              href="/login"
              onClick={() => setMobileMenu(false)}
              className="flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/analyze"
              onClick={() => setMobileMenu(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-300/30 transition-all duration-300 hover:bg-slate-800"
            >
              <Sparkles className="h-4 w-4" />
              Start Analyzing
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
