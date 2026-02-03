"use client";

import { useState } from "react";
import { Trash2, Clock, CalendarDays, Loader2, Pencil } from "lucide-react";
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

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const response = await deleteAvailabilityAction(id);

    if (response?.success) {
      setRules((prev) => prev.filter((r) => r.id !== id));
      toast.success("Rule removed successfully");
    } else {
      toast.error("Failed to delete rule");
    }
    setDeletingId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rules?.map((rule) => (
        <div
          key={rule.id}
          className="group bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 hover:border-indigo-100 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-indigo-500" />
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {rule.dayOfWeek}
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-lg">
                Weekly Session
              </h3>
            </div>

            {/* Action Group */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  router.push(`/dashboard/schedule/${rule.id}`);
                }}
                className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
              >
                <Pencil size={18} />
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleDelete(rule.id)}
                disabled={deletingId === rule.id}
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all disabled:opacity-50"
              >
                {deletingId === rule.id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Clock size={16} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Available Time
              </p>
              <p className="font-mono font-black text-slate-700">
                {rule.startTime} — {rule.endTime}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
