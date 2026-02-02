"use client";

import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { RoleSelection } from "./RoleSelection";
import { CategorySelection } from "./CategorySelection";
import { FinalConfirmation } from "./FinalConfirmation";
import { UserRole, UserRoleType } from "@/src/lib/constants";
import { Categories } from "@/src/service/category/category.service";
import { TutorBioInput } from "./onboarding.validation";
import { TutorBioStep } from "./TutorBioStep";
import { useRouter } from "next/navigation";

// Define strict data structure
export type OnboardingData = {
  role: UserRoleType | "";
  category: Categories | null;
  tutorDetails?: TutorBioInput;
};

export function OnboardingManager({
  categories,
}: {
  categories: Categories[];
}) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    role: "",
    category: null,
  });
  const router = useRouter();

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="w-full p-5 ">
      <StepIndicator currentStep={step} />

      {step === 1 && (
        <RoleSelection
          onSelect={(role) => {
            setData({ ...data, role });
            if (role === UserRole.TUTOR) {
              setStep(2);
            } else {
              router.push("/dashboard")
            }
          }}
        />
      )}

      {step === 2 && (
        <CategorySelection
          categories={categories}
          selected={data.category}
          onBack={prevStep}
          onSelect={(cat: Categories) => {
            setData({ ...data, category: cat });
            nextStep();
          }}
        />
      )}

      {step === 3 && (
        <TutorBioStep
          onBack={prevStep}
          onComplete={(details) => {
            setData({ ...data, tutorDetails: details });
            nextStep();
          }}
        />
      )}

      {step === 4 && (
        <FinalConfirmation
          data={data}
          onBack={() => {
            if (data.role === UserRole.STUDENT) setStep(1);
            else setStep(3);
          }}
        />
      )}
    </div>
  );
}
