import { ScheduleClient } from "@/src/components/tutor/ScheduleClient";
import { TutorService } from "@/src/service/tutor/tutor.service";

export default async function SchedulePage() {
  const result = await TutorService.getAvailabilities();

  const rules = result ? result?.data : [];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Schedule Manager
        </h1>
        <p className="text-slate-500 font-medium">
          Set your weekly recurring availability patterns.
        </p>
      </div>

      <ScheduleClient />
    </div>
  );
}
