import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { TutorService } from "@/src/service/tutor/tutor.service";
import { BookingFlowManager } from "@/src/components/global/BookingFlowManager";

export default async function GlobalBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await TutorService.getTutorById(id);
  const rulesData = await TutorService.getAvailabilitySlots(id);

  console.log(rulesData);


  if (!result || !result.tutor || !rulesData.data) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Tutor not found</h2>
        <Link
          href="/tutors"
          className="text-indigo-600 font-bold hover:underline"
        >
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/tutors"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
      >
        <ChevronLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Directory</span>
      </Link>

      <BookingFlowManager rules={rulesData.data ?? []} tutor={result.tutor} />
    </div>
  );
}
