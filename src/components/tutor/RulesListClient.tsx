"use client";

import { useState } from "react";
import {
  Trash2,
  Clock,
  CalendarDays,
  Loader2,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { AvailabilityRulesType } from "@/src/service/tutor/tutor.service";
import { deleteAvailabilityAction } from "@/src/service/tutor/tutor.action";
import { useRouter } from "next/navigation";

export function RulesListClient({
  initialRules,
}: {
  initialRules: AvailabilityRulesType[];
}) {
  const [rules, setRules] = useState(initialRules);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  // Helper for time display
  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h >= 12 ? "PM" : "AM";
    const hours = h % 12 || 12;
    return `${hours}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await deleteAvailabilityAction(id);
      if (response?.success) {
        setRules((prev) => prev.filter((r) => r.id !== id));
        toast.success("Rule removed successfully");
      } else {
        toast.error(response?.error || "Failed to delete rule");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setDeletingId(null);
    }
  };

  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
          <CalendarDays className="size-8 text-slate-300" />
        </div>
        <p className="font-bold text-slate-500 text-lg">
          No availability rules set yet.
        </p>
        <p className="text-slate-400 text-sm">
          Add your first session to start receiving bookings.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="group relative bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 hover:-translate-y-1 transition-all duration-500"
        >
          {/* Status Badge */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
              <CheckCircle2 size={12} className="fill-emerald-600 text-white" />
              <span className="text-[10px] font-black uppercase tracking-wider">
                Active
              </span>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => router.push(`/dashboard/schedule/${rule.id}`)}
                className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(rule.id)}
                disabled={deletingId === rule.id}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all disabled:opacity-50"
              >
                {deletingId === rule.id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">
                {rule.dayOfWeek}
              </p>
              <h3 className="font-black text-slate-900 text-xl tracking-tight leading-none">
                Recurring Slot
              </h3>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-[1.5rem] border border-slate-100/50">
              <div className="p-2.5 bg-white rounded-xl shadow-sm">
                <Clock size={20} className="text-indigo-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Duration
                </span>
                <span className="font-mono font-black text-slate-700 text-sm">
                  {formatTime(Number(rule.startMinute))} –{" "}
                  {formatTime(Number(rule.endMinute))}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
