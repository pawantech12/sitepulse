"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Gauge,
  Database,
  Sparkles,
  Layers,
} from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Analyze", href: "/analyze" },
    { name: "Reports", href: "/reports" },
  ];

  const resourceLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Documentation", href: "/docs" },
  ];

  const legalLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  const techItems = [
    {
      label: "NEXT.JS",
      icon: Layers,
    },
    {
      label: "MONGODB",
      icon: Database,
    },
    {
      label: "PAGESPEED INSIGHTS",
      icon: Gauge,
    },
    {
      label: "GROQ AI",
      icon: Sparkles,
    },
  ];

  return (
    <footer className="w-full overflow-hidden bg-[#080d1d] text-white">
      <div className="mx-auto max-w-[1220px] px-5 sm:px-6 lg:px-0">
        <div className="grid gap-12 border-b border-[#1c263b] py-[58px] sm:py-[68px] lg:grid-cols-[1.8fr_1fr_1fr_0.7fr] lg:gap-[70px]">
          <div className="max-w-[430px]">
            <Link
              href="/"
              className="group inline-flex items-center gap-[10px]"
              aria-label="SitePulse home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#263451] bg-[#10182c] transition-colors duration-200 group-hover:border-[#34435e]">
                <Activity
                  className="h-[18px] w-[18px] text-[#3975ff]"
                  strokeWidth={2.2}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[15px] font-bold leading-[16px] tracking-[-0.02em] text-[#f7f9ff]">
                  SITEPULSE
                </span>

                <span className="mt-[2px] text-[9px] font-medium leading-[11px] tracking-[0.01em] text-[#75829a]">
                  Web Audit Platform
                </span>
              </div>
            </Link>

            <p className="mt-[13px] text-[14px] font-medium leading-[20px] text-[#8d9ab1]">
              Website Audit &amp; Performance Intelligence
            </p>

            <p className="mt-[19px] max-w-[410px] text-[14px] font-medium leading-[1.75] text-[#657189]">
              Analyze website quality, understand page-level findings, and turn
              technical audit data into actionable improvements.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a8b0be]">
              Product
            </h3>

            <ul className="mt-[19px] space-y-[13px]">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-medium leading-[20px] tracking-[-0.01em] text-[#64718a] transition-colors duration-150 hover:text-[#dce4f4]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a8b0be]">
              Resources
            </h3>

            <ul className="mt-[19px] space-y-[13px]">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-medium leading-[20px] tracking-[-0.01em] text-[#64718a] transition-colors duration-150 hover:text-[#dce4f4]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#a8b0be]">
              Legal
            </h3>

            <ul className="mt-[19px] space-y-[13px]">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-medium leading-[20px] tracking-[-0.01em] text-[#64718a] transition-colors duration-150 hover:text-[#dce4f4]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-b border-[#1c263b] py-[22px]">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {techItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`flex min-h-[24px] items-center gap-[8px] text-[10px] font-semibold tracking-[0.04em] text-[#64718a] ${
                    index < techItems.length - 1
                      ? "border-r border-[#1c263b]"
                      : ""
                  } ${
                    index === 0
                      ? "pr-[18px] sm:pl-0 sm:pr-[20px]"
                      : "px-[18px] sm:px-[20px]"
                  } ${
                    index === techItems.length - 1
                      ? "pl-[18px] sm:pl-[20px] sm:pr-0"
                      : ""
                  } ${index >= 2 ? "mt-[18px] sm:mt-0" : ""}`}
                >
                  <Icon
                    className="h-[13px] w-[13px] shrink-0 text-[#53627b]"
                    strokeWidth={1.8}
                  />

                  <span className="whitespace-nowrap">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-[15px] py-[21px] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] font-medium leading-[18px] text-[#536079]">
            © 2026 SitePulse
          </p>

          <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[10px]">
            <Link
              href="/privacy"
              className="text-[12px] font-medium leading-[18px] text-[#59667e] transition-colors duration-150 hover:text-[#cbd5e5]"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-[12px] font-medium leading-[18px] text-[#59667e] transition-colors duration-150 hover:text-[#cbd5e5]"
            >
              Terms
            </Link>

            <span className="text-[11px] font-medium leading-[18px] text-[#3f4b61]">
              AI-generated recommendations are advisory.
            </span>

            <Link
              href="#top"
              aria-label="Back to top"
              className="group ml-0 flex h-[28px] w-[28px] items-center justify-center rounded-[6px] border border-[#202b40] text-[#66738b] transition-all duration-200 hover:border-[#34435e] hover:bg-[#10182c] hover:text-white sm:ml-[2px]"
            >
              <ArrowUpRight
                className="h-[12px] w-[12px] transition-transform duration-200 group-hover:-translate-y-[1px] group-hover:translate-x-[1px]"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
