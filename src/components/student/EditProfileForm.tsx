"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Save, Loader2, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { User } from "@/src/service/auth/auth.service";
import { profileUpdateAction } from "@/src/service/user/user.action";
import { toast } from "sonner";
import { ProfileInput, ProfileSchema } from "./student.validation";

interface Props {
  initialData: Partial<User>;
}

export default function EditProfileForm({ initialData }: Props) {
  const [preview, setPreview] = useState(initialData.image);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: initialData.name,
      image: initialData.image || "",
    },
  });

  const onSubmit = async (data: ProfileInput) => {
    try {

        console.log(data)

      const response = await profileUpdateAction(data);

      if (response.success) {
        toast.success("User profile updated successfully");
      } else {
        toast.error("Failed to update user profile");
      }
    } catch (error) {
      console.log("profile update error", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden ring-4 ring-slate-50 shadow-xl bg-slate-100">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile Preview"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <UserIcon size={48} />
                </div>
              )}
            </div>
            <label
              htmlFor="image-upload"
              className="absolute bottom-1 right-1 p-2.5 bg-indigo-600 text-white rounded-2xl cursor-pointer hover:bg-indigo-700 transition-all border-4 border-white shadow-lg active:scale-90"
            >
              <Camera size={18} />
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900">Profile Picture</p>
            <p className="text-xs text-slate-400 font-medium">
              PNG, JPG up to 5MB
            </p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Display Name
            </label>
            <div className="relative">
              <UserIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                size={18}
              />
              <input
                {...register("name")}
                placeholder="Your name"
                className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-2 outline-none transition-all font-medium ${
                  errors.name
                    ? "border-rose-100 focus:border-rose-400"
                    : "border-transparent focus:border-indigo-500 focus:bg-white focus:shadow-sm"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-rose-500 text-xs font-bold mt-1 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          className="px-8 py-4 rounded-2xl font-black text-sm text-slate-500 hover:text-slate-900 transition-all"
        >
          Discard
        </button>
        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 disabled:bg-slate-100 disabled:text-slate-400 transition-all shadow-xl shadow-slate-200 active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          Update Profile
        </button>
      </div>
    </form>
  );
}
