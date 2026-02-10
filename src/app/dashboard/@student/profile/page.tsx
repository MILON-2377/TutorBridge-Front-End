import InfoCard from "@/src/components/student/InfoCard";
import ProfileHeader from "@/src/components/student/ProfileHeader";
import { AuthService } from "@/src/service/auth/auth.service";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const result = await AuthService.getSession();

  if (!result.success || !result.data) {
    redirect("/sing-in");
  }

  const user = result.data;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ProfileHeader user={user} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <InfoCard title="About Me">
            <p className="text-sm leading-relaxed text-slate-600">
              Passionate about deep tech and AI. Currently taking physics
              lessons from Dr. Alex Rivers to improve my foundational knowledge
              for aerospace engineering.
            </p>
          </InfoCard>

          <InfoCard title="Account Security">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">
                    Two-Factor Authentication
                  </span>
                </div>
                <button className="text-indigo-600 text-xs font-bold uppercase tracking-widest">
                  Enable
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-sm font-bold text-slate-700">
                    Last Password Change
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  3 months ago
                </span>
              </div>
            </div>
          </InfoCard>
        </div>

        <div className="space-y-8">
          {/* Subscription Card */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <h4 className="text-lg font-black mb-1">Elite Learner</h4>
            <p className="text-slate-400 text-sm mb-6">
              Unlimited session recordings
            </p>
            <div className="h-2 w-full bg-slate-800 rounded-full mb-2 overflow-hidden">
              <div className="h-full w-2/3 bg-indigo-500 rounded-full" />
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase">
              12/20 Hours Used
            </p>
          </div>

          {/* Quick Help */}
          <div className="p-8 rounded-[2.5rem] border border-dashed border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-500 font-medium">
              Need to deactivate your account?
            </p>
            <button className="text-rose-600 text-xs font-black uppercase hover:underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
