"use client";

import Link from "next/link";
import {
  Activity,
  Sparkles,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Solutions", href: "#solutions" },
      { name: "Pricing", href: "#pricing" },
      { name: "Docs", href: "#docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Status", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-white border-t border-slate-200">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 shadow-lg shadow-indigo-500/20">
                <Activity className="h-5 w-5 text-white" />
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

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              Analyze your website performance, SEO, accessibility and best
              practices with powerful automated insights.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-slate-900">
                  {section.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-[28px] border border-slate-200 bg-slate-50 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              Start analyzing your website today
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              Get instant insights into performance, SEO and accessibility.
            </p>
          </div>

          <Link
            href="/analyze"
            className="group inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
          >
            <Sparkles className="h-4 w-4" />
            Start Free Scan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SitePulse. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Terms
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
