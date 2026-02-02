"use client";

import { useState } from "react";
import { PartyPopper, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OnboardingData } from "./OnboardingManager";
import { UserRole } from "@/src/lib/constants";
import { createTutorAction } from "@/src/service/tutor/tutor.action";

interface FinalProps {
  data: OnboardingData;
  onBack: () => void;
}

export function FinalConfirmation({ data, onBack }: FinalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Creating your profile...");

    try {
      if (!data.role) {
        throw new Error("Please select a role to continue.");
      }

      const result = await createTutorAction(
        data as Parameters<typeof createTutorAction>[0],
      );

      if (result?.success) {
        toast.success("Welcome aboard!", {
          id: toastId,
          description: `Your account is now set up as a ${data.role.toLowerCase()}.`,
        });

        router.push("/dashboard");
        router.refresh();
      } else {
        throw new Error(result?.message || "Failed to create profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          id: toastId,
          description: error.message || "Failed to save your preferences.",
        });
      }

      setIsLoading(false);
    }
  };

  return (
    <div className="text-center animate-in zoom-in-95 duration-500 bg-white p-10 rounded-3xl border border-slate-100 shadow-xl">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <PartyPopper size={40} />
      </div>

      <h1 className="text-2xl font-extrabold text-slate-900">Ready to go!</h1>

      <div className="text-slate-500 mt-2 mb-8 leading-relaxed">
        <p>
          You&apos;ve selected to join as a{" "}
          <span className="text-indigo-600 font-bold px-1">{data.role}</span>
        </p>

        {data.role === UserRole.TUTOR && data.category && (
          <div className="mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-100 inline-block text-sm">
            <p className="font-medium text-slate-700">
              Specializing in{" "}
              <span className="text-indigo-600">{data.category.name}</span>
            </p>
            {data.tutorDetails?.languages &&
              data.tutorDetails.languages.length > 0 && (
                <p className="text-xs mt-1">
                  Languages: {data.tutorDetails.languages.join(", ")}
                </p>
              )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          disabled={isLoading}
          onClick={onBack}
          className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Choices
        </button>

        <button
          disabled={isLoading}
          onClick={handleComplete}
          className="flex-2 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Explore Dashboard
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
