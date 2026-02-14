export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { TutorSearchBar } from "@/src/components/global/TutorSearchBar";
import { TutorStats } from "@/src/components/global/TutorStats";
import { TutorCardSkeleton } from "@/src/components/global/TutorCardSkeleton";
import TutorGrid from "@/src/components/global/TutorGrid";
import { CategoryService } from "@/src/service/category/category.service";

export type TutorsSearchParams = {
  search?: string;
  subject?: string;
  page?: string;
};

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<TutorsSearchParams>;
}) {
  
  const params = await searchParams;

  const result = await CategoryService.getCategories();
  const categories = result?.categories?.data ?? [];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10">
      <header className="space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
          Find your <span className="text-indigo-600">Mentor</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium">
          Expert 1-on-1 tutoring sessions.
        </p>
      </header>

      <TutorStats />

      {/* Interactive Search Bar */}
      <Suspense
        fallback={
          <div className="h-16 w-full bg-slate-100 animate-pulse rounded-3xl" />
        }
      >
        <TutorSearchBar categories={categories} />
      </Suspense>

      {/* Data Fetching  */}
      <Suspense
        key={JSON.stringify(params)}
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TutorCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <TutorGrid params={params} />
      </Suspense>
    </div>
  );
}
