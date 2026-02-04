import { TutorService } from "@/src/service/tutor/tutor.service";
import { TutorCard } from "@/src/components/global/TutorCard";
import { Tutor } from "@/src/service/tutor/tutor.service";

interface TutorGridProps {
  params: {
    search?: string;
    subject?: string;
    page?: string | number;
  };
}

export default async function TutorGrid({ params }: TutorGridProps) {
  const result = await TutorService.getTutors({
    search: params.search,
    subject: params.subject,
    page: params.page ? parseInt(String(params.page)) : 1,
    limit: 12,
  });

  const tutors: Tutor[] = result?.tutors?.data || [];

  if (tutors.length === 0) {
    return (
      <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 animate-in fade-in zoom-in duration-500">
        <div className="inline-flex p-5 bg-white rounded-full shadow-sm mb-4">
          <svg
            className="w-8 h-8 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          No tutors match your search
        </h3>
        <p className="text-slate-500 mt-1 font-medium">
          Try adjusting your filters or checking your spelling.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tutors.map((tutor: Tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
