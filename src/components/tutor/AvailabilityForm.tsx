"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Calendar, Plus, Loader2, Save } from "lucide-react";
import { AvailabilityInput, availabilitySchema } from "./tutor.validation";
import { useEffect } from "react";

interface AvailabilityFormProps {
  onSubmit: (data: AvailabilityInput) => Promise<void>;
  defaultValues?: AvailabilityInput;
  isEdit?: boolean;
}

// 1. Destructure the missing props here
export function AvailabilityForm({
  onSubmit,
  defaultValues,
  isEdit = false,
}: AvailabilityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AvailabilityInput>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: defaultValues || {
      dayOfWeek: "MONDAY",
      startTime: "09:00",
      endTime: "17:00",
      isActive: true,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: AvailabilityInput) => {
    try {
      await onSubmit(data);
      if (!isEdit) reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
    >
      {/* Header - Dynamic based on mode */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className={`p-2 rounded-lg ${isEdit ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"}`}
        >
          {isEdit ? <Save size={18} /> : <Plus size={18} />}
        </div>
        <h3 className="font-bold text-slate-800">
          {isEdit ? "Update Availability" : "Add New Rule"}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Day Field */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Day
          </label>
          <div className="relative group">
            <Calendar className="absolute left-3 top-3.5 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <select
              {...register("dayOfWeek")}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 appearance-none transition-all"
            >
              <option value="MONDAY">Monday</option>
              <option value="TUESDAY">Tuesday</option>
              <option value="WEDNESDAY">Wednesday</option>
              <option value="THURSDAY">Thursday</option>
              <option value="FRIDAY">Friday</option>
              <option value="SATURDAY">Saturday</option>
              <option value="SUNDAY">Sunday</option>
            </select>
          </div>
        </div>

        {/* Start Time Field */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Start Time
          </label>
          <div className="relative group">
            <Clock className="absolute left-3 top-3.5 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="time"
              {...register("startTime")}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* End Time Field */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            End Time
          </label>
          <div className="relative group">
            <Clock className="absolute left-3 top-3.5 size-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="time"
              {...register("endTime")}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Dynamic text */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4 shadow-lg shadow-slate-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>{isEdit ? "Updating..." : "Saving..."}</span>
          </>
        ) : isEdit ? (
          "Update Availability Slot"
        ) : (
          "Add Availability Slot"
        )}
      </button>
    </form>
  );
}
