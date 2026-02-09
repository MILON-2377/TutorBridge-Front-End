import { Search, Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-100/40 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm animate-bounce">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-600">Top 1% Mentors only</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
          Master any skill <br />
          <span className="text-indigo-600">1-on-1.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
          Connect with world-class tutors and industry experts. Flexible scheduling, 
          personalized roadmaps, and a platform built for deep learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <div className="relative w-full sm:w-[450px] group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for 'Quantum Physics' or 'UI Design'..." 
              className="w-full pl-16 pr-6 py-6 bg-white border-2 border-transparent shadow-2xl shadow-slate-200/50 rounded-[2.5rem] outline-none focus:border-indigo-500 transition-all font-bold text-slate-700"
            />
          </div>
          <button className="w-full sm:w-auto px-10 py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2">
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}