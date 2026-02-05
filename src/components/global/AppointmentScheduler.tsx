"use client";

import { useState, useMemo } from "react";
import { Calendar as CalendarIcon, Clock, AlertCircle } from "lucide-react";
import { AvailabilitySlot } from "@/src/service/tutor/tutor.service";


interface Props {
  availability: AvailabilitySlot[];
  onSlotSelect: (id: string) => void;
  selectedSlotId: string | null;
}

export function AppointmentScheduler({
  availability,
  onSlotSelect,
  selectedSlotId,
}: Props) {
  const [selectedDate] = useState<string>("2026-02-02");

  const formatTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  const slots = useMemo(() => {
    const filtered = availability.filter((slot) => {
      const slotDate = slot.date.split("T")[0];
      return slotDate === selectedDate && slot.status === "AVAILABLE";
    });

    return filtered.map((slot) => ({
      id: slot.id,
      displayTime: formatTime(slot.startMinute),
    }));
  }, [availability, selectedDate]);

  return (
    <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
          <CalendarIcon size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Select Date & Time
          </h2>
          <p className="text-slate-500 font-medium text-sm">
            Available slots for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-50 rounded-4xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 aspect-square text-center">
          <CalendarIcon className="text-slate-300 mb-2" size={48} />
          <p className="text-slate-400 font-bold max-w-37.5">
            Interactive Calendar UI would go here
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-black text-slate-800 flex items-center gap-2">
            <Clock size={18} className="text-indigo-500" />
            Available Times
          </h3>

          {slots.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {slots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;

                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => onSlotSelect(slot.id)}
                    className={`py-3 rounded-xl border-2 font-bold transition-all active:scale-95 text-sm ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-md ring-2 ring-indigo-100"
                        : "border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-slate-50"
                    }`}
                  >
                    {slot.displayTime}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
              <AlertCircle size={32} className="text-slate-300 mb-2" />
              <p className="text-slate-500 font-bold text-sm">
                No slots available.
              </p>
              <p className="text-slate-400 text-xs">Try selecting a different date.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}