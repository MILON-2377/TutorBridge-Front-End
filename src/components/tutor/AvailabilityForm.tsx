"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Calendar, Plus, Loader2 } from "lucide-react";
import { AvailabilityInput, availabilitySchema } from "./tutor.validation";

interface AvailabilityFormProps {
  onSubmit: (data: AvailabilityInput) => Promise<void>;
}

export function AvailabilityForm({ onSubmit }: AvailabilityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AvailabilityInput>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      dayOfWeek: "MONDAY",
      startTime: "09:00",
      endTime: "17:00",
      isActive: true,
    },
  });

  const handleFormSubmit = async (data: AvailabilityInput) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <Plus size={18} />
        </div>
        <h3 className="font-bold text-slate-800">Add New Rule</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Day of Week Field */}
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
          {errors.dayOfWeek && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">
              {errors.dayOfWeek.message}
            </p>
          )}
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
          {errors.startTime && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">
              {errors.startTime.message}
            </p>
          )}
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
              className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
                errors.endTime
                  ? "border-red-300 focus:ring-red-50 focus:border-red-500"
                  : "border-slate-200 focus:ring-indigo-50 focus:border-indigo-500"
              }`}
            />
          </div>
          {errors.endTime && (
            <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
              {errors.endTime.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-lg shadow-slate-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Saving Schedule...</span>
          </>
        ) : (
          "Add Availability Slot"
        )}
      </button>
    </form>
  );
}
