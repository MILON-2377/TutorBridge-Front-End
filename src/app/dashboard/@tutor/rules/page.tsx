export const dynamic = "force-dynamic";

import { RulesListClient } from "@/src/components/tutor/RulesListClient";
import Link from "next/link";
import { AlertCircle, Plus } from "lucide-react";
import {
  AvailabilityRulesType,
  TutorService,
} from "@/src/service/tutor/tutor.service";
import { redirect } from "next/navigation";

export default async function RulesPage() {
  const result = await TutorService.getAvailabilities();

  if (!result.success && result.status === 401) {
    redirect("/sign-in");
  }

  console.log({ result });

  const rules: AvailabilityRulesType[] = result.data ? result.data : [];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Weekly Patterns
          </h1>
          <p className="text-slate-500 font-medium">
            Your recurring tutoring availability.
          </p>
        </div>
        <Link
          href="/dashboard/schedule"
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          <span>Add Rule</span>
        </Link>
      </div>

      {rules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
          <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <AlertCircle className="text-slate-300 size-10" />
          </div>
          <p className="text-slate-500 font-bold text-lg">
            No availability patterns found.
          </p>
          <p className="text-slate-400 text-sm">
            Create your first rule to start accepting bookings.
          </p>
        </div>
      ) : (
        <RulesListClient initialRules={rules} />
      )}
    </div>
  );
}
