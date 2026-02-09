"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";
import PersonalInfoSection from "./PersonalInfoSesion";
import ProfessionalSection from "./ProfessionalSection";
import {
  TutorProfile,
  UpdateTutorProfile,
} from "@/src/service/tutor/tutor.service";
import { UpdateTutorProfileSchema } from "./validation/tutor.validation";

export default function ProfileEditForm({
  initialData,
}: {
  initialData: TutorProfile;
}) {
  const form = useForm({
    resolver: zodResolver(UpdateTutorProfileSchema),
    defaultValues: {
      name: initialData?.user?.name || "",
      bio: initialData?.bio || "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = form;

  const onSubmit = async (data: UpdateTutorProfile) => {
    try {
      console.log(data);

      // await updateTutorProfileAction(data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <PersonalInfoSection
        register={form.register}
        errors={form.formState.errors}
        watch={form.watch}
      />

      <ProfessionalSection
        register={form.register}
        errors={form.formState.errors}
        setValue={form.setValue}
        watch={form.watch}
      />

      <div className="sticky bottom-8 flex justify-end">
        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-4xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 disabled:opacity-50 disabled:bg-slate-400 active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          Save Changes
        </button>
      </div>
    </form>
  );
}
