import { TutorService } from "@/src/service/tutor/tutor.service";
import ProfileHero from "@/src/components/tutor/ProfileHero";
import ProfileBio from "@/src/components/tutor/ProfileBio";
import ProfileContact from "@/src/components/tutor/ProfileContact";

export default async function ProfilePage() {
  const result = await TutorService.getTutorOwnProfile();
  const tutor = result.data;

  if (!tutor) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ProfileHero tutor={tutor} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileBio bio={tutor.bio ?? ""} subjects={tutor.subjects} />
        </div>

        <aside className="space-y-8">
          <ProfileContact
            email={tutor.user.email}
            createdAt={tutor.createdAt}
          />
        </aside>
      </div>
    </div>
  );
}
