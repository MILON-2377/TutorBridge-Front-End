import StudentBookingSkeleton from "./StudentBookingSkeleton";

export function StudentBookingsLoading() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <StudentBookingSkeleton className="h-10 w-48" />
        <StudentBookingSkeleton className="h-4 w-64" />
      </div>

      {/* Stats Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-4xl border border-slate-100 flex items-center gap-5"
          >
            <StudentBookingSkeleton className="h-14 w-14 rounded-2xl" />
            <div className="space-y-2">
              <StudentBookingSkeleton className="h-3 w-20" />
              <StudentBookingSkeleton className="h-6 w-12" />
            </div>
          </div>
        ))}
      </div>

      {/* List Section StudentBookingSkeleton */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <StudentBookingSkeleton className="h-6 w-32" />
          <StudentBookingSkeleton className="h-12 w-48 rounded-2xl" />
        </div>

        {/* Card StudentBookingSkeletons */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[3rem] border border-slate-100 flex flex-col lg:flex-row justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <StudentBookingSkeleton className="h-16 w-16 rounded-2xl" />
              <div className="space-y-2">
                <StudentBookingSkeleton className="h-5 w-32" />
                <StudentBookingSkeleton className="h-4 w-48" />
              </div>
            </div>
            <StudentBookingSkeleton className="h-16 w-full lg:w-64 rounded-3xl" />
            <div className="flex gap-3">
              <StudentBookingSkeleton className="h-14 w-full lg:w-40 rounded-2xl" />
              <StudentBookingSkeleton className="h-14 w-14 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
