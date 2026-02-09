import { Mail, Calendar } from "lucide-react";

export default function ProfileContact({ email, createdAt }: { email: string; createdAt: string }) {
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
      <h3 className="text-lg font-black text-slate-900">Quick Contact</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <Mail className="text-indigo-600" size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">
              Email Address
            </p>
            <p className="text-sm font-bold text-slate-700 truncate">
              {email}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <div className="p-2 bg-white rounded-xl shadow-sm">
            <Calendar className="text-emerald-600" size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">
              Member Since
            </p>
            <p className="text-sm font-bold text-slate-700">
              {new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}