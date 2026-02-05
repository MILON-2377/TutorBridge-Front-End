import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow duration-300">
      <div className={`${bg} ${color} p-4 rounded-2xl flex items-center justify-center`}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div className="space-y-0.5">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-slate-900 leading-none">{value}</p>
      </div>
    </div>
  );
}