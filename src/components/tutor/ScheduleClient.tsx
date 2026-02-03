"use client";

import { AvailabilityForm } from "@/src/components/tutor/AvailabilityForm";
import { toast } from "sonner";
import { AvailabilityInput } from "@/src/components/tutor/tutor.validation";
import { createAvailabilityAction } from "@/src/service/tutor/tutor.action";
import { useRouter } from "next/navigation";

export function ScheduleClient() {
  const router = useRouter();

  const addRule = async (data: AvailabilityInput) => {
    const response = await createAvailabilityAction(data);
    
    console.log("create availability rule response:", response);

    if (response?.success) {
      toast.success("Availability rule created!");
      // Option: redirect them to the rules list page after success
      // router.push("/dashboard/schedule/rules"); 
    } else {
      toast.error(response?.error || "Failed to create rule");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 py-10">
      <div className="px-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Create Availability
        </h1>
        <p className="text-slate-500 font-medium">
          Define a new recurring time slot for your tutoring sessions.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-slate-100">
        <AvailabilityForm onSubmit={addRule} />
      </div>
    </div>
  );
}