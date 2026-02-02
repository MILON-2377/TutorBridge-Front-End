import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({
  label = "Loading dashboard...",
  fullPage = false,
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullPage ? "h-[80vh] w-full" : "h-64 w-full"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="h-12 w-12 rounded-full border-4 border-slate-100" />
        {/* Animated Inner Spinner */}
        <Loader2
          className="absolute h-12 w-12 animate-spin text-indigo-600"
          strokeWidth={2.5}
        />
      </div>

      {label && (
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}
