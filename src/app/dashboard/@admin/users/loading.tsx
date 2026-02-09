export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="h-10 w-64 bg-slate-200 rounded-2xl" />
          <div className="h-4 w-96 bg-slate-100 rounded-xl" />
        </div>

        {/* Stats Skeleton */}
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 w-44 bg-slate-100 rounded-3xl border border-slate-50"
            />
          ))}
        </div>
      </header>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-14 flex-1 bg-slate-100 rounded-4xl" />
        <div className="h-14 w-32 bg-slate-100 rounded-4xl" />
      </div>

      {/* Table Skeleton */}
      <section className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm">
        <div className="h-16 bg-slate-50/50 border-b border-slate-50 flex items-center px-8 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-24 bg-slate-200 rounded-full" />
          ))}
        </div>

        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="h-24 border-b border-slate-50 flex items-center px-8 gap-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-100" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded-lg" />
                <div className="h-3 w-48 bg-slate-100 rounded-lg" />
              </div>
            </div>
            <div className="h-6 w-20 bg-slate-100 rounded-lg hidden md:block" />
            <div className="h-6 w-32 bg-slate-100 rounded-lg hidden md:block" />
          </div>
        ))}
      </section>
    </div>
  );
}
