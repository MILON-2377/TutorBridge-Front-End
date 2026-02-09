export function TutorCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] -mr-40 -mt-40" />
        
        <div className="relative max-w-2xl space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            Become a <span className="text-indigo-400">Mentor</span> <br /> 
            and earn on your terms.
          </h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Join a community of elite educators. Set your own rates, manage your own 
            schedule, and share your expertise with students worldwide.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-95">
              Apply to Teach
            </button>
            <button className="px-10 py-5 bg-transparent text-white border-2 border-slate-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}