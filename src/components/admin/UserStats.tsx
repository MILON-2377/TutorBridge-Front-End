import { Users, UserCheck, ShieldAlert } from "lucide-react";

interface UserStatsProps {
  total: number;
}

export function UserStats({ total }: UserStatsProps) {
  // Mock data for demonstration - in a real app, these would come from your API
  const activeUsers = total > 0 ? Math.floor(total * 0.85) : 0;
  const pendingVerification = total - activeUsers;

  const stats = [
    {
      label: "Total Users",
      value: total,
      icon: Users,
      bg: "bg-indigo-50",
      color: "text-indigo-600",
    },
    {
      label: "Active Now",
      value: activeUsers,
      icon: UserCheck,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      label: "Pending",
      value: pendingVerification,
      icon: ShieldAlert,
      bg: "bg-rose-50",
      color: "text-rose-600",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 min-w-45"
        >
          <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
            <stat.icon size={20} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
              {stat.label}
            </p>
            <p className="text-xl font-black text-slate-900 leading-none">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}