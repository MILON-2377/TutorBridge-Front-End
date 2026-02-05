"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save } from "lucide-react";
import { useEffect } from "react";
import {
  AvailabilityFormInput,
  AvailabilityPayload,
  availabilitySchema,
} from "./tutor.validation";

interface AvailabilityFormProps {
  onSubmit: (data: AvailabilityPayload) => Promise<void>;
  defaultValues?: AvailabilityFormInput;
  isEdit?: boolean;
}

export function AvailabilityForm({
  onSubmit,
  defaultValues,
  isEdit = false,
}: AvailabilityFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<AvailabilityFormInput, any, AvailabilityPayload>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: defaultValues || {
      dayOfWeek: "MONDAY",
      startMinute: "09:00",
      endMinute: "17:00",
      isActive: true,
    },
  });
  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const handleOnSubmit = async (data: AvailabilityPayload) => {
    await onSubmit(data);
    if (!isEdit) reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
    >
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
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Day
          </label>
          <select
            {...register("dayOfWeek")}
            className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
          >
            {[
              "MONDAY",
              "TUESDAY",
              "WEDNESDAY",
              "THURSDAY",
              "FRIDAY",
              "SATURDAY",
              "SUNDAY",
            ].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            Start Time
          </label>
          <input
            type="time"
            {...register("startMinute")}
            className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
          />
          {errors.startMinute && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startMinute.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">
            End Time
          </label>
          <input
            type="time"
            {...register("endMinute")}
            className="w-full px-4 py-3 bg-slate-50 border rounded-xl"
          />
          {errors.endMinute && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endMinute.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors"
      >
        {isSubmitting
          ? isEdit
            ? "Updating..."
            : "Saving..."
          : isEdit
            ? "Update Availability Slot"
            : "Add Availability Slot"}
      </button>
    </form>
  );
}
