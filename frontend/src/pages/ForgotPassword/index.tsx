// src/pages/ForgotPassword/index.tsx
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { forgotPassword } from "@/services/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
      setEmail("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-[84px] w-[84px] items-center justify-center rounded-[13px] bg-gradient-to-br from-blue-500 via-indigo-500 to-pink-500 p-[2px] shadow-sm">
          <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white">
            <img
              src="/images/SYstemsLogo.png"
              alt="TranpTech Systems"
              className="max-h-[48px] max-w-[62px] object-contain"
            />
          </div>
        </div>
        <h1 className="text-[30px] font-bold leading-tight tracking-tight text-indigo-900">
          Reset your password
        </h1>
        <p className="mt-2 text-[14px] text-slate-500">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-[448px] rounded-[17px] bg-white px-[30px] py-[30px] shadow-[0_12px_35px_rgba(38,57,120,0.10)]">
        {success ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-sm text-slate-700">
              If an account exists for <strong>{email}</strong>, you'll receive
              a reset link shortly.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-indigo-700"
            >
              <ArrowLeft size={16} /> Back to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="mb-1.5 block text-[14px] font-semibold text-indigo-800"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  strokeWidth={1.8}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tranptechsystems.com"
                  className="h-[46px] w-full rounded-[7px] border border-slate-300 bg-slate-50/80 pl-10 pr-3 text-[13px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-md border border-red-200 bg-red-50/80 px-3 py-2.5 text-[13px] text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-[44px] w-full rounded-[7px] bg-gradient-to-r from-blue-500 to-indigo-500 text-[15px] font-semibold text-white shadow-sm transition hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft size={16} /> Back to login
              </button>
            </div>
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-[12px] text-slate-500">
        © 2026 TranpTech Systems. All rights reserved.
      </p>
    </div>
  );
}
