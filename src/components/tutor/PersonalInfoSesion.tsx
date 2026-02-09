"use client";

import { UpdateTutorProfile } from "@/src/service/tutor/tutor.service";
import { User, Camera } from "lucide-react";
import Image from "next/image";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

interface PersonalInfoSectionProps {
  register: UseFormRegister<UpdateTutorProfile>;
  errors: FieldErrors<UpdateTutorProfile>;
  watch: UseFormWatch<UpdateTutorProfile>;
}

export default function PersonalInfoSection({ register, errors, watch }: PersonalInfoSectionProps) {
  const name = watch("name");

  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
          <User size={20} />
        </div>
        <h3 className="text-xl font-black text-slate-900">
          Personal Information
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Avatar Upload Preview */}
        <div className="relative group mx-auto md:mx-0">
          <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden bg-slate-100 ring-4 ring-slate-50 relative">
            <Image
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name || "tutor"}`}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-slate-100 text-indigo-600 hover:text-indigo-700 transition-all active:scale-90"
          >
            <Camera size={18} />
          </button>
        </div>

        {/* Name Field */}
        <div className="flex-1 w-full space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">
              Full Display Name
            </label>
            <div className="relative">
              <input
                {...register("name")}
                placeholder="How students will address you"
                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-bold text-slate-700 ${
                  errors.name
                    ? "border-rose-100 focus:border-rose-500"
                    : "border-transparent focus:border-indigo-500"
                }`}
              />
              {errors.name && (
                <p className="text-rose-500 text-[10px] font-black uppercase mt-2 ml-4">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-400 italic px-4 leading-relaxed">
            Note: Your email address is linked to your account security and
            cannot be changed here.
          </p>
        </div>
      </div>
    </div>
  );
}
