"use client";

import { useState } from "react";
import { StudentBooking } from "@/src/service/booking/booking.service";
import {
  Video,
  MoreHorizontal,
  Calendar,
  Clock,
  CheckCircle2,
  Loader2,
  XCircle,
  Star,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/src/service/booking/booking.action";
import { BookingStatus, BookingStatusType } from "@/src/lib/constants";
import { ReviewModal } from "./ReviewModal";

export const BookingCard = ({ booking }: { booking: StudentBooking }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const sessionDate = new Date(booking.createdAt);
  const isPastSession = sessionDate < new Date();
  const isConfirmed = booking.status === "CONFIRMED";
  const isCompleted = booking.status === "COMPLETED";

  const formateTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const minuteFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour12}:${minuteFormatted} ${ampm}`;
  };

  const handleStatusUpdate = async (newStatus: BookingStatusType) => {
    setLoading(true);
    try {
      const res = await updateBookingStatus(booking.id, { status: newStatus });
      if (res.success) {
        toast.success(`Session ${newStatus.toLowerCase()} successfully`);
        router.refresh();
      } else {
        toast.error(res.errors || `Failed to update session`);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const statusStyles = {
    BOOKED: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    PENDING: "bg-amber-50 text-amber-700 ring-amber-100",
    COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    CANCELLED: "bg-rose-50 text-rose-700 ring-rose-100",
  };

  return (
    <div className="group bg-white p-6 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-indigo-200 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Tutor Section */}
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 ring-4 ring-slate-50">
            <Image
              src={
                booking.tutor.user?.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.tutor.id}`
              }
              alt="Tutor"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-black text-slate-900 text-lg leading-tight">
                {booking.tutor.user?.name}
              </h4>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ring-1 ${statusStyles[booking.status as keyof typeof statusStyles]}`}
              >
                {booking.status}
              </span>
            </div>
            <p className="text-indigo-600 text-sm font-bold">
              {booking.tutor.subjects?.[0] || "Mentorship"}
            </p>
          </div>
        </div>

        {/* Schedule Section */}
        <div className="flex items-center gap-8 px-6 py-4 bg-slate-50 rounded-3xl">
          <div className="flex items-center gap-3">
            <Calendar className="text-slate-400" size={18} />
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase leading-none">
                Date
              </p>
              <p className="font-bold text-slate-700 text-sm">
                {new Date(booking.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="flex items-center gap-3">
            <Clock className="text-slate-400" size={18} />
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase leading-none">
                Time
              </p>
              <p className="font-bold text-slate-700 text-sm">
                {formateTime(booking.availabilitySlot.startMinute)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions Logic */}
        <div className="flex items-center gap-3">
          {/* 1. PENDING State */}
          {booking.status === "PENDING" && (
            <button
              onClick={() => handleStatusUpdate(BookingStatus.CANCELLED)}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <XCircle size={18} />
              )}
              Cancel
            </button>
          )}

          {/* 2. CONFIRMED */}
          {isConfirmed && (
            <>
              <button
                onClick={() => handleStatusUpdate(BookingStatus.COMPLETED)}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-4 rounded-2xl font-black text-sm text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}
                Complete
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
                <Video size={18} />
                Join
              </button>
            </>
          )}

          {(isCompleted || (isConfirmed && isPastSession)) && (
            <button
              className="flex items-center gap-2 bg-amber-500 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-amber-600 transition-all shadow-lg active:scale-95"
              onClick={() => setShowReviewModal(true)}
            >
              <Star size={18} fill="currentColor" />
              Give Review
            </button>
          )}

          <button className="p-4 rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-900 transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>

        {showReviewModal && (
          <ReviewModal
            bookingId={booking.id}
            tutorName={booking.tutor.name}
            onClose={() => setShowReviewModal(false)}
          />
        )}
      </div>
    </div>
  );
};
