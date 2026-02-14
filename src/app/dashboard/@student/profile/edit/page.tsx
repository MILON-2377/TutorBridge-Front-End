export const dynamic = "force-dynamic";

import { AuthService } from "@/src/service/auth/auth.service";
import EditProfileForm from "@/src/components/student/EditProfileForm";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
  const result = await AuthService.getSession();

  if (!result.success || !result.data) {
    redirect("/sign-in");
  }

  const user = result?.data ?? { name: "", image: "" };

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Personal <span className="text-indigo-600">Info</span>
        </h1>
        <p className="text-slate-500 font-medium italic">
          Update how you appear to mentors and other students.
        </p>
      </div>

      <EditProfileForm initialData={user} />
    </main>
  );
}
