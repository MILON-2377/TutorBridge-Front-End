"use client";

import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-6">
      <div className="p-4 bg-rose-50 text-rose-600 rounded-full">
        <AlertCircle size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900">Authentication Error</h2>
        <p className="text-slate-500 max-w-sm">
          We had trouble verifying your session. This might be a temporary connection issue.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all"
      >
        <RefreshCcw size={16} />
        Retry Connection
      </button>
    </div>
  );
}