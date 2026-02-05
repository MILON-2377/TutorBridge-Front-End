"use client";

import { useState } from "react";
import { AvailabilitySlot, Tutor } from "@/src/service/tutor/tutor.service";
import { AppointmentScheduler } from "./AppointmentScheduler";
import { BookingSummary } from "./BookingSummary";

export function BookingFlowManager({
  tutor,
  rules,
}: {
  tutor: Tutor;
  rules: AvailabilitySlot[];
}) {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 space-y-8">
        <AppointmentScheduler
          availability={rules}
          onSlotSelect={(id: string) => setSelectedSlotId(id)}
          selectedSlotId={selectedSlotId}
        />

        <section className="bg-indigo-900 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h3 className="text-xl font-black flex items-center gap-2">
              <span className="text-emerald-400 font-serif">✓</span>{" "}
              Satisfaction Guaranteed
            </h3>
            <p className="text-indigo-200 text-sm max-w-md font-medium">
              If you are not satisfied with your first session, we will refund
              your payment or find you a different tutor for free.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-800 rounded-full blur-3xl opacity-50" />
        </section>
      </div>

      <div className="lg:col-span-1">
        <BookingSummary tutor={tutor} availabilitySlotId={selectedSlotId} />
      </div>
    </div>
  );
}
