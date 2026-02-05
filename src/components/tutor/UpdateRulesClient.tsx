"use client";

import { AvailabilityForm } from "@/src/components/tutor/AvailabilityForm";
import { toast } from "sonner";
import { updateAvailabilityAction } from "@/src/service/tutor/tutor.action";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AvailabilityRulesType } from "@/src/service/tutor/tutor.service";
import { AvailabilityPayload } from "./tutor.validation";

export function UpdateRulesClient({
  initialData,
  ruleId,
}: {
  initialData: AvailabilityRulesType;
  ruleId: string;
}) {
  const router = useRouter();

  const minutesToTimeString = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const handleUpdate = async (data: AvailabilityPayload) => {
    const response = await updateAvailabilityAction(ruleId, data);

    if (response?.success) {
      toast.success("Schedule updated successfully");
      router.push("/dashboard/schedule/rules");
      router.refresh();
    } else {
      toast.error(response?.error || "Failed to update rule");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        href="/dashboard/schedule/rules"
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Weekly Patterns
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Edit Availability
        </h1>
        <p className="text-slate-500 font-medium">
          Modify your {initialData.dayOfWeek.toLowerCase()} time slot.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-slate-100">
        <AvailabilityForm
          onSubmit={handleUpdate}
          defaultValues={{
            dayOfWeek: initialData.dayOfWeek,
            startMinute: minutesToTimeString(Number(initialData.startMinute)),
            endMinute: minutesToTimeString(Number(initialData.endMinute)),
            isActive: initialData.isActive ?? true,
          }}
          isEdit={true}
        />
      </div>
    </div>
  );
}
