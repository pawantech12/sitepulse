"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  Gauge,
  Globe,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setApiError("");

      const response = await axios.post("/api/auth/login", data);

      if (response.data.success) {
        router.replace("/dashboard");
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#DDE2EA] bg-white px-3.5 py-3 text-sm text-[#0b1020] outline-none transition placeholder:text-[#96A4B5] focus:border-[#2B6AFF] focus:ring-4 focus:ring-[#2B6AFF]/10";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-5 py-10">
      <div className="w-full max-w-[960px] overflow-hidden rounded-xl border border-[#DDE2EA] bg-white shadow-[0_8px_35px_rgba(11,16,32,0.05)]">
        <div className="grid min-h-[570px] md:grid-cols-2">
          {/* Left panel */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0b1020] p-9 text-white md:flex lg:p-11">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#2B6AFF]/10 blur-2xl" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2B6AFF]">
                  <Activity size={19} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight">
                  SitePulse
                </span>
              </Link>

              <div className="mt-20 max-w-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  Website performance insights
                </span>

                <h1 className="mt-6 text-3xl font-semibold leading-[1.2] tracking-tight lg:text-[36px]">
                  Welcome back to better website performance.
                </h1>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Sign in to access your website scans, monitor performance, and
                  turn technical insights into meaningful improvements.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <Gauge size={19} className="text-blue-400" />
                  <p className="mt-3 text-sm font-semibold">Performance</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Track website speed
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <ShieldCheck size={19} className="text-blue-400" />
                  <p className="mt-3 text-sm font-semibold">Site health</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Identify key issues
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Understand your website. Improve every page.
              </p>
            </div>
          </div>

          {/* Login form */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="mx-auto w-full max-w-[370px]">
              <Link
                href="/"
                className="mb-10 inline-flex items-center gap-2.5 md:hidden"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2B6AFF]">
                  <Activity size={19} className="text-white" />
                </div>
                <span className="text-lg font-bold tracking-tight text-[#0b1020]">
                  SitePulse
                </span>
              </Link>

              <div className="mb-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#2B6AFF]">
                  Welcome back
                </p>

                <h2 className="text-[26px] font-bold tracking-tight text-[#0b1020]">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#596273]">
                  Access your website reports and continue improving your
                  website performance.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-[#30394A]"
                  >
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
                    })}
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold text-[#30394A]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      className={`${inputClass} pr-11`}
                      {...register("password", {
                        required: "Password is required.",
                      })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#96A4B5] transition hover:text-[#30394A]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {apiError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-600"
                  >
                    {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0b1020] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#202b45] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      Sign in
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              <div className="my-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#E9EDF2]" />
                <span className="text-[11px] text-[#96A4B5]">
                  NEW TO SITEPULSE?
                </span>
                <div className="h-px flex-1 bg-[#E9EDF2]" />
              </div>

              <p className="text-center text-sm text-[#596273]">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#2B6AFF] transition hover:text-[#174FD1]"
                >
                  Create account
                </Link>
              </p>

              <p className="mt-8 text-center text-[11px] leading-5 text-[#96A4B5]">
                By continuing, you agree to use SitePulse responsibly and
                securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
