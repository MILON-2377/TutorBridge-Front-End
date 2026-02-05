"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, Info, Loader2 } from "lucide-react";
import { Tutor } from "@/src/service/tutor/tutor.service";
import { createBookingAction } from "@/src/service/booking/booking.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BookingSummaryProps {
  tutor: Tutor;
  availabilitySlotId: string | null;
}

export function BookingSummary({
  tutor,
  availabilitySlotId,
}: BookingSummaryProps) {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();
  const serviceFee = 2.5;
  const totalPrice = tutor.hourlyRate + serviceFee;

  const handleConfirmBooking = async () => {
    if (!availabilitySlotId) {
      toast.error("Please select an available day and time slot.");
      return;
    }

    setIsPending(true);

    try {
      const payload = {
        tutorId: tutor.id,
        availabilitySlotId: availabilitySlotId,
        price: totalPrice,
      };

      console.log({ payload });

      const response = await createBookingAction(payload);

      if (response.success) {
        toast.success("Booking request sent successfully!");
        router.push('/dashboard/bookings');
      } else {
        toast.error(response.message || "Booking failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during booking.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="sticky top-10 space-y-6">
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 space-y-6">
        {/* Tutor Header */}
        <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100">
            <Image
              src={
                tutor.user?.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.user?.name}`
              }
              alt="Tutor"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">
              {tutor.user?.name}
            </h4>
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-tighter">
              {tutor.subjects?.[0] || "Tutor"}
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4">
          <div className="flex justify-between text-slate-500 font-bold">
            <span>Session Rate</span>
            <span>${tutor.hourlyRate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500 font-bold">
            <span>Platform Fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <div className="h-1 bg-slate-100 w-full" />
          <div className="flex justify-between text-slate-900 font-black text-xl">
            <span>Total Price</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          disabled={isPending || !availabilitySlotId}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <CreditCard size={18} />
          )}
          {isPending ? "Processing..." : "Confirm Booking"}
        </button>

        <div className="flex items-start gap-2 p-4 bg-slate-50 rounded-2xl">
          <Info size={16} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            Your payment is held securely and only released to the tutor after
            the session is completed.
          </p>
        </div>
      </div>
    </div>
  );
}
