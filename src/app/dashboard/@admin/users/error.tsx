"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Error Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-rose-100 rounded-[2.5rem] blur-2xl opacity-50" />
          <div className="relative w-full h-full bg-white rounded-[2.5rem] border-2 border-rose-50 flex items-center justify-center text-rose-500 shadow-sm">
            <AlertCircle size={48} strokeWidth={1.5} />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Something went <span className="text-rose-600">wrong</span>
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            We encountered an unexpected error while fetching the user data. Our
            team has been notified.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-600 border border-slate-100 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>

        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] pt-10">
          Error Digest: {error.digest || "Internal Server Error"}
        </p>
      </div>
    </div>
  );
}
