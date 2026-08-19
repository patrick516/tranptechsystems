// src/pages/Login/index.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, LockKeyhole, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { login } from "@/services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/40 px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-4 flex h-[84px] w-[84px] items-center justify-center rounded-[13px] bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 p-[2px] shadow-sm">
          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white">
            <img
              src="/images/SYstemsLogo.png"
              alt="TranpTech Systems"
              className="max-h-[48px] max-w-[62px] object-contain"
            />
          </div>
        </div>

        <h1 className="text-[30px] font-bold leading-tight tracking-tight text-[#233f8f]">
          Welcome back
        </h1>

        <p className="mt-2 text-[14px] text-slate-500">
          Sign in to manage your fleet and bookings.
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[448px] rounded-[17px] bg-white px-[30px] py-[30px] shadow-[0_12px_35px_rgba(38,57,120,0.10)]">
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-[14px] font-semibold text-[#233f8f]"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                strokeWidth={1.8}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@embrace.com"
                className="h-[46px] w-full rounded-[7px] border border-slate-300 bg-[#edf3fc] pl-10 pr-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#29479b] focus:bg-white focus:ring-1 focus:ring-[#29479b]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-[14px] font-semibold text-[#233f8f]"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                strokeWidth={1.8}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-[46px] w-full rounded-[7px] border border-slate-300 bg-[#edf3fc] pl-10 pr-11 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-[#29479b] focus:bg-white focus:ring-1 focus:ring-[#29479b]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.8} />
                ) : (
                  <Eye size={18} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="mb-5 flex items-center justify-between">
            <label
              htmlFor="remember"
              className="flex cursor-pointer items-center gap-2 text-[13px] text-slate-600"
            >
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer sr-only"
              />

              <span className="flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border border-slate-300 bg-white transition peer-checked:border-[#16c784] peer-checked:bg-[#16c784]">
                {rememberMe && (
                  <CheckCircle2
                    size={13}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                )}
              </span>

              <span>Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => {
                // Add your forgot-password flow here
              }}
              className="text-[13px] font-medium text-[#2451e6] transition hover:text-[#193db8]"
            >
              Forgot password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] text-red-600">
              {error}
            </div>
          )}

          {/* Sign In */}
          <button
            type="submit"
            disabled={loading}
            className="h-[44px] w-full rounded-[7px] bg-[#294394] text-[15px] font-semibold text-white transition hover:bg-[#20377d] focus:outline-none focus:ring-2 focus:ring-[#294394] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Create Account */}
        <div className="mt-[18px] text-center text-[13px] text-slate-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              // Add your registration route here
            }}
            className="font-medium text-[#2451e6] transition hover:text-[#193db8]"
          >
            Create one
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-[12px] text-slate-500">
        © 2026 TranpTech Systems. All rights reserved.
      </p>
    </div>
  );
}
