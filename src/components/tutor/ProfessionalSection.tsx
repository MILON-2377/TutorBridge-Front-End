import { Edit3 } from "lucide-react";

export default function ProfessionalSection({ register, errors }: any) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
          <Edit3 size={20} />
        </div>
        <h3 className="text-xl font-black text-slate-900">Professional Identity</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Professional Title
          </label>
          <input
            {...register("title")}
            placeholder="e.g. Senior Full Stack Engineer & Mentor"
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-2xl outline-none transition-all font-bold text-slate-700"
          />
          {errors.title && <p className="text-rose-500 text-xs font-bold ml-4">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
            Biography
          </label>
          <textarea
            {...register("bio")}
            rows={5}
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-4xl outline-none transition-all font-medium text-slate-600 resize-none"
          />
          {errors.bio && <p className="text-rose-500 text-xs font-bold ml-4">{errors.bio.message}</p>}
        </div>
      </div>
    </div>
  );
}