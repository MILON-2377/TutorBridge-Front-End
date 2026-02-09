import { TutorService } from "@/src/service/tutor/tutor.service";
import ProfileEditForm from "@/src/components/tutor/ProfileEditForm";
import { EmptyState } from "@/src/components/shared/EmptyState";

export default async function ProfileEditPage() {
  const result = await TutorService.getTutorOwnProfile();
  const tutor = result?.data;

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6">
        <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <EmptyState
            title="Profile Not Found"
            description="We couldn't retrieve your tutor information. Please ensure you are registered as a tutor or try again later."
          />
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 w-fit text-[10px] font-black uppercase tracking-widest border border-indigo-100 mb-2">
          Settings
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Edit <span className="text-indigo-600">Profile</span>
        </h1>
        <p className="text-slate-500 font-medium italic">
          Update your professional identity and mentorship details.
        </p>
      </header>

      {/* The Form Container */}
      <main>
        <ProfileEditForm initialData={tutor} />
      </main>
    </div>
  );
}
