const categories = [
  { name: "Mathematics", count: "140 Tutors", icon: "∑", color: "bg-blue-50 text-blue-600" },
  { name: "Computer Science", count: "320 Tutors", icon: "</>", color: "bg-indigo-50 text-indigo-600" },
  { name: "Business", count: "95 Tutors", icon: "₦", color: "bg-emerald-50 text-emerald-600" },
  { name: "Design", count: "110 Tutors", icon: "✎", color: "bg-rose-50 text-rose-600" },
];

export function CategoryGrid() {
  return (
    <section className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Browse by <span className="text-indigo-600">Category</span></h2>
            <p className="text-slate-500 font-medium">Find specialized mentors in any field of study.</p>
          </div>
          <button className="text-sm font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 transition-colors">View All Subjects &rarr;</button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="group bg-white p-8 rounded-[3.5rem] border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer">
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">{cat.name}</h3>
              <p className="text-xs font-bold text-slate-400">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}