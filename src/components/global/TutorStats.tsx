import { ShieldCheck, Clock, Award } from "lucide-react";

export function TutorStats() {
  const stats = [
    {
      label: "Verified Tutors",
      value: "42",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Approval",
      value: "07",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Avg Performance",
      value: "98%",
      icon: Award,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-5"
        >
          <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="text-2xl font-black text-slate-900 font-mono">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
