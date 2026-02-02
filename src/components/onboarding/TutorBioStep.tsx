"use client";

import { useState, KeyboardEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ChevronRight,
  DollarSign,
  Briefcase,
  AlignLeft,
  Languages as LangIcon,
  X,
} from "lucide-react";
import { TutorBioInput, tutorBioSchema } from "./onboarding.validation";

export function TutorBioStep({
  onComplete,
  onBack,
}: {
  onComplete: (d: TutorBioInput) => void;
  onBack: () => void;
}) {
  const [langInput, setLangInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TutorBioInput>({
    resolver: zodResolver(tutorBioSchema),
    defaultValues: {
      hourlyRate: 20,
      experienceYears: 1,
      languages: [],
    },
  });

  // Explicitly register the languages field since it's not a standard input
  useEffect(() => {
    register("languages");
  }, [register]);

  const selectedLanguages = watch("languages") || [];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = langInput.trim().replace(/,/g, "");

      if (val && !selectedLanguages.includes(val)) {
        const newLangs = [...selectedLanguages, val];
        setValue("languages", newLangs, {
          shouldValidate: true,
          shouldDirty: true,
        });
        setLangInput("");
      }
    }
  };

  const removeLanguage = (lang: string) => {
    const newLangs = selectedLanguages.filter((l) => l !== lang);
    setValue("languages", newLangs, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onComplete)}
      className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 px-5"
    >
      {/* Navigation Header */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Professional Details
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Finalize your profile to start teaching.
        </p>
      </div>

      {/* Row 1: Rate & Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Hourly Rate ($)
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-3 p-1 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-indigo-100 group-focus-within:text-indigo-600 transition-colors">
              <DollarSign size={14} />
            </div>
            <input
              type="number"
              {...register("hourlyRate", { valueAsNumber: true })}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all"
            />
          </div>
          {errors.hourlyRate && (
            <p className="text-red-500 text-[11px] font-medium mt-1">
              {errors.hourlyRate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Experience (Years)
          </label>
          <div className="relative group">
            <div className="absolute left-3 top-3 p-1 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-indigo-100 group-focus-within:text-indigo-600 transition-colors">
              <Briefcase size={14} />
            </div>
            <input
              type="number"
              {...register("experienceYears", { valueAsNumber: true })}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all"
            />
          </div>
          {errors.experienceYears && (
            <p className="text-red-500 text-[11px] font-medium mt-1">
              {errors.experienceYears.message}
            </p>
          )}
        </div>
      </div>

      {/* Languages Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Languages (Press Enter or use Comma)
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-3 p-1 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-indigo-100 group-focus-within:text-indigo-600 transition-colors">
            <LangIcon size={14} />
          </div>
          <input
            type="text"
            value={langInput}
            onChange={(e) => setLangInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. English, Bangla"
            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
              errors.languages
                ? "border-red-200 focus:ring-red-50"
                : "border-slate-200 focus:ring-indigo-50 focus:border-indigo-500"
            }`}
          />
        </div>

        {/* Chips display */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedLanguages.map((lang) => (
            <div
              key={lang}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg animate-in zoom-in-90"
            >
              {lang}
              <button
                type="button"
                onClick={() => removeLanguage(lang)}
                className="hover:bg-indigo-500 rounded-full p-0.5 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        {errors.languages && (
          <p className="text-red-500 text-[11px] font-medium mt-1">
            {errors.languages.message}
          </p>
        )}
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Tutor Bio
        </label>
        <div className="relative group">
          <div className="absolute left-3 top-3 p-1 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-indigo-100 group-focus-within:text-indigo-600 transition-colors">
            <AlignLeft size={14} />
          </div>
          <textarea
            {...register("bio")}
            rows={4}
            placeholder="Share your teaching experience..."
            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 min-h-[100px] ${
              errors.bio
                ? "border-red-200 focus:ring-red-50"
                : "border-slate-200 focus:ring-indigo-50 focus:border-indigo-500"
            }`}
          />
        </div>
        {errors.bio && (
          <p className="text-red-500 text-[11px] font-medium mt-1">
            {errors.bio.message}
          </p>
        )}
      </div>

      {/* Action Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-slate-200"
      >
        Continue to Summary <ChevronRight size={18} />
      </button>
    </form>
  );
}
