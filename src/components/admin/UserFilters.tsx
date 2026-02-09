import { Search, SlidersHorizontal } from "lucide-react";

export function UserFilters() {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1 group">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
          size={20}
        />
        <input
          type="text"
          placeholder="Search by name, email or role..."
          className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-4xl outline-none focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 transition-all font-medium text-slate-600 shadow-sm"
        />
      </div>
      <button className="px-8 py-4 bg-white border border-slate-100 rounded-4xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
        <SlidersHorizontal size={18} />
        Filters
      </button>
    </div>
  );
}
