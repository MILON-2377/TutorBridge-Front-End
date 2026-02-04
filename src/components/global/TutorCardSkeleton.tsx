export function TutorCardSkeleton() {
  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 animate-pulse flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-100" />
        <div className="space-y-2">
          <div className="h-3 w-16 bg-slate-100 rounded ml-auto" />
          <div className="h-6 w-12 bg-slate-50 rounded ml-auto" />
        </div>
      </div>
      <div className="space-y-3 grow">
        <div className="h-4 w-24 bg-slate-100 rounded" />
        <div className="h-6 w-48 bg-slate-100 rounded" />
        <div className="h-4 w-full bg-slate-50 rounded" />
        <div className="flex gap-2 pt-3">
          <div className="h-6 w-16 bg-slate-50 rounded-full" />
          <div className="h-6 w-16 bg-slate-50 rounded-full" />
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-50">
        <div className="h-14 w-full bg-slate-100 rounded-2xl" />
      </div>
    </div>
  );
}