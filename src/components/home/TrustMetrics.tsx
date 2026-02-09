import { Star, ShieldCheck, Globe } from "lucide-react";

export function TrustMetrics() {
  const metrics = [
    { label: "Active Tutors", value: "2,400+", icon: Globe, color: "text-indigo-600" },
    { label: "Average Rating", value: "4.9/5", icon: Star, color: "text-amber-500" },
    { label: "Verified Experts", value: "100%", icon: ShieldCheck, color: "text-emerald-600" },
  ];

  return (
    <section className="px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`p-4 rounded-3xl bg-slate-50 ${m.color}`}>
              <m.icon size={28} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900">{m.value}</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{m.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}