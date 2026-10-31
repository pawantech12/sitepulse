"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Eye,
  EyeOff,
  Gauge,
  Globe,
  ShieldCheck,
} from "lucide-react";

import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError("");

      const response = await axios.post("/api/auth/register", {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      if (response.data.success) {
        router.replace("/login");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-[44px] w-full rounded-[7px] border border-[#DDE2EA] bg-white px-[13px] text-[13px] text-[#0B1020] outline-none transition-colors placeholder:text-[#A8B0BE] focus:border-[#2B6AFF] focus:ring-[3px] focus:ring-[#2B6AFF]/10";

  const labelClass = "mb-[7px] block text-[12px] font-semibold text-[#293444]";

  return (
    <main className="min-h-screen bg-[#f7f8fa] font-sans text-[#0b1020]">
      {/* Header */}
      <header className="h-[72px] border-b border-[#DDE2EA] bg-[#f7f8fa]">
        <div className="mx-auto flex h-full max-w-[1220px] items-center justify-between px-5 sm:px-8 lg:px-0">
          <Link
            href="/"
            className="group flex items-center gap-[10px]"
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

          <div className="flex items-center gap-2 sm:gap-5">
            <span className="hidden text-[13px] text-[#596273] sm:block">
              Already have an account?
            </span>

            <Link
              href="/login"
              className="flex h-[36px] items-center justify-center rounded-[7px] border border-[#DDE2EA] bg-white px-4 text-[12px] font-semibold text-[#0b1020] transition-colors hover:bg-[#f0f2f5]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-5 py-10 sm:px-8">
        <div className="grid w-full max-w-[940px] overflow-hidden rounded-[9px] border border-[#DDE2EA] bg-white shadow-[0_4px_20px_rgba(11,16,32,0.035)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left information panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0b1020] p-9 text-white lg:flex xl:p-11">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#2B6AFF]/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#18b987]/10 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-[8px] rounded-[5px] border border-white/10 bg-white/[0.06] px-[10px] py-[6px]">
                <span className="h-[6px] w-[6px] rounded-full bg-[#18b987]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.06em] text-[#b7c1d1]">
                  Website Intelligence
                </span>
              </div>

              <h1 className="max-w-[350px] text-[32px] font-bold leading-[1.18] tracking-[-0.045em] xl:text-[37px]">
                Better insights.
                <br />
                <span className="text-[#8baeff]">Better websites.</span>
              </h1>

              <p className="mt-5 max-w-[340px] text-[13px] leading-[23px] text-[#9ba6b8]">
                Create your SitePulse account and bring your website audits,
                technical findings, and AI recommendations together in one
                workspace.
              </p>
            </div>

            <div className="relative z-10 mt-12 space-y-5">
              {[
                {
                  icon: Gauge,
                  title: "Performance analysis",
                  description: "Monitor speed and Core Web Vitals.",
                },
                {
                  icon: ShieldCheck,
                  title: "Technical website audits",
                  description: "Identify SEO and accessibility issues.",
                },
                {
                  icon: BarChart3,
                  title: "Centralized scan history",
                  description: "Keep all your website reports organized.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-3">
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[7px] border border-white/10 bg-white/[0.06]">
                      <Icon className="h-[16px] w-[16px] text-[#8baeff]" />
                    </div>

                    <div>
                      <h3 className="text-[12px] font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-[4px] text-[10px] leading-[17px] text-[#929eb1]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="relative z-10 mt-10 text-[10px] text-[#758196]">
              © {new Date().getFullYear()} SitePulse. All rights reserved.
            </p>
          </div>

          {/* Registration form */}
          <div className="px-6 py-9 sm:px-10 sm:py-11 lg:px-10 xl:px-12">
            <div className="mb-7">
              <div className="mb-4 flex h-[38px] w-[38px] items-center justify-center rounded-[8px] border border-[#DDE2EA] bg-[#f7f8fa]">
                <Globe className="h-[17px] w-[17px] text-[#596273]" />
              </div>

              <div className="mb-[9px] flex items-center gap-[8px]">
                <span className="h-px w-[18px] bg-[#DDE2EA]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.05em] text-[#96A4B5]">
                  Get Started
                </span>
              </div>

              <h2 className="text-[27px] font-bold leading-[34px] tracking-[-0.04em] text-[#0b1020]">
                Create your account
              </h2>

              <p className="mt-[7px] text-[12px] leading-[20px] text-[#69758a]">
                Set up your workspace to start tracking website performance.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-[17px]">
              {/* Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={inputClass}
                  {...register("name", {
                    required: "Name is required.",
                    maxLength: {
                      value: 60,
                      message: "Name cannot exceed 60 characters.",
                    },
                  })}
                />

                {errors.name && (
                  <p className="mt-[5px] text-[11px] text-[#dc4444]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-[5px] text-[11px] text-[#dc4444]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className={`${inputClass} pr-11`}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 8,
                        message: "Password must contain at least 8 characters.",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-[5px] text-[#96A4B5] transition-colors hover:bg-[#f0f2f5] hover:text-[#293444]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-[15px] w-[15px]" />
                    ) : (
                      <Eye className="h-[15px] w-[15px]" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-[5px] text-[11px] text-[#dc4444]">
                    {errors.password.message}
                  </p>
                )}

                <p className="mt-[6px] text-[10px] text-[#96A4B5]">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm password */}
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className={inputClass}
                  {...register("confirmPassword", {
                    required: "Please confirm your password.",
                    validate: (value) =>
                      value === password || "Passwords do not match.",
                  })}
                />

                {errors.confirmPassword && (
                  <p className="mt-[5px] text-[11px] text-[#dc4444]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* API error */}
              {apiError && (
                <div
                  role="alert"
                  className="rounded-[7px] border border-[#efcaca] bg-[#fff8f8] px-3 py-[10px] text-[11px] leading-[18px] text-[#c53b3b]"
                >
                  {apiError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-[44px] w-full items-center justify-center gap-[8px] rounded-[7px] bg-[#0b1020] text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#151c2e] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-[15px] w-[15px] transition-transform duration-200 group-hover:translate-x-[3px]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-[5px] pt-[2px] text-[11px] text-[#69758a]">
                Already have an account?
                <Link
                  href="/login"
                  className="font-semibold text-[#2B6AFF] transition-colors hover:text-[#1859df]"
                >
                  Sign in
                </Link>
              </div>
            </form>

            <div className="mt-7 flex items-center justify-center gap-[7px] border-t border-[#E8ECF1] pt-5 text-[10px] text-[#96A4B5]">
              <CheckCircle2 className="h-[13px] w-[13px] text-[#18b987]" />
              Your account credentials are securely protected.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
