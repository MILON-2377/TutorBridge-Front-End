import { Search, CalendarCheck, Rocket } from "lucide-react";

export function HowItWorks() {
  const steps = [
    { title: "Find your Expert", desc: "Browse thousands of verified tutors.", icon: Search },
    { title: "Schedule a Session", desc: "Pick a time that fits your busy life.", icon: CalendarCheck },
    { title: "Start Learning", desc: "Jump into our immersive 1-on-1 classroom.", icon: Rocket },
  ];

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 text-center">
      <h2 className="text-4xl font-black text-slate-900 mb-16 tracking-tight">
        Learning in <span className="text-indigo-600">3 simple steps</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-12 relative">
        {steps.map((step, i) => (
          <div key={i} className="relative group">
            <div className="w-20 h-20 bg-slate-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-xl shadow-indigo-100/20">
              <step.icon size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{step.title}</h3>
            <p className="text-slate-500 font-medium">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}