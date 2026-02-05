import { Settings } from "lucide-react";

const InfoCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
    <h3 className="text-lg font-black text-slate-900 tracking-tight flex justify-between items-center">
      {title}
      <button className="text-indigo-600 text-xs font-bold hover:underline">
        Manage
      </button>
    </h3>
    <div className="space-y-4 text-slate-600 font-medium">{children}</div>
  </div>
);

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2 space-y-8">
    <InfoCard title="Bio & Professional Summary">
      <p className="text-sm leading-relaxed">
        Passionate learner and software engineer specializing in React and
        Node.js. Currently pursuing advanced certifications in Cloud
        Architecture. Always looking for mentors to help bridge the gap between
        junior and senior roles.
      </p>
    </InfoCard>

    <InfoCard title="Account Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-black uppercase">
            Timezone
          </p>
          <p className="text-sm text-slate-900 font-bold">
            Eastern Standard Time (GMT-5)
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400 font-black uppercase">
            Language
          </p>
          <p className="text-sm text-slate-900 font-bold">
            English (Native), Spanish
          </p>
        </div>
      </div>
    </InfoCard>
  </div>

  <div className="space-y-8">
    <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden">
      <div className="relative z-10 space-y-4">
        <div className="bg-white/10 w-fit p-3 rounded-2xl">
          <Settings className="text-indigo-200" size={24} />
        </div>
        <h4 className="text-xl font-black">Student Plan</h4>
        <p className="text-indigo-200 text-sm">
          Your premium subscription expires in 12 days.
        </p>
        <button className="w-full bg-white text-indigo-900 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-indigo-50 transition-all">
          Renew Now
        </button>
      </div>
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20" />
    </div>
  </div>
</div>;

export default InfoCard;
