"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BottomStatementSection() {
  return (
    <section
      id="bottom-statement"
      className="w-full bg-white text-[#0b1020] py-20"
    >
      <div className="mx-auto max-w-[1220px] border-t border-[#d8dee8] border-b">
        <div className="flex min-h-[204px] items-center justify-between gap-10 px-5 py-12 sm:px-8 md:px-10 lg:px-0">
          <div className="flex min-w-0 items-center gap-[18px]">
            <span className="h-[48px] w-[3px] shrink-0 rounded-full bg-[#2f6df6]" />

            <h2 className="max-w-[830px] text-[28px] font-bold leading-[1.18] tracking-[-0.035em] text-[#0b1020] sm:text-[32px] md:text-[34px] lg:text-[36px]">
              Every scan becomes a structured trail of pages,
              <br className="hidden md:block" /> checks, findings, and
              recommendations.
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-[12px]">
            <Link
              href="#audit"
              className="group inline-flex h-[45px] items-center justify-center gap-[10px] rounded-[7px] bg-[#0b1020] px-[21px] text-sm font-bold text-white transition-colors duration-200 hover:bg-[#171d2d] focus:outline-none focus:ring-2 focus:ring-[#2f6df6] focus:ring-offset-2"
            >
              Start an Audit
              <ArrowRight className="h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]" />
            </Link>

            <Link
              href="#sample-report"
              className="inline-flex h-[45px] items-center justify-center rounded-[7px] border border-[#d7dee8] bg-white px-[18px] text-sm font-bold text-[#596579] transition-colors duration-200 hover:border-[#bfc9d8] hover:bg-[#f8f9fb] hover:text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2f6df6] focus:ring-offset-2"
            >
              See a sample report
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
