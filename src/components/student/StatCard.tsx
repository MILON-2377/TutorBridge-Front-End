export default function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`${bg} ${color} p-3 rounded-xl`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

