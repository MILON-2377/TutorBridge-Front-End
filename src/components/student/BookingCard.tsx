export default function BookingCard({ tutorName, subject, time, status }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between hover:border-indigo-200 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
        <div>
          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {tutorName}
          </h4>
          <p className="text-xs text-slate-500">
            {subject} • {time}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg tracking-wider uppercase">
          {status}
        </span>
      </div>
    </div>
  );
}
