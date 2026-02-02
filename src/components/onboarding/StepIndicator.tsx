"use client";

import { CheckCircle2 } from "lucide-react";
import React from "react";

export function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center justify-center mb-12 gap-3">
      {steps.map((num) => (
        <React.Fragment key={num}>
          {/* Circle */}
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
              currentStep >= num
                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                : "bg-white border-slate-200 text-slate-400"
            }`}
          >
            {currentStep > num ? <CheckCircle2 size={20} /> : num}
          </div>

          {/* Line between circles */}
          {num < 3 && (
            <div className="h-[2px] w-12 bg-slate-200 overflow-hidden">
              <div
                className={`h-full bg-indigo-600 transition-all duration-500 ease-in-out ${
                  currentStep > num ? "w-full" : "w-0"
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}