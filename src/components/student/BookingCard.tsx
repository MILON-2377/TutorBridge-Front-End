import { StudentBooking } from "@/src/service/booking/booking.service";
import { Video, MoreHorizontal, Calendar, Clock } from "lucide-react";
import Image from "next/image";

export const BookingCard = ({ booking }: { booking: StudentBooking }) => {
  const formattedDate = new Date(booking.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  const statusColors = {
    BOOKED: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    PENDING: "bg-amber-50 text-amber-700 ring-amber-100",
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
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ring-1 ${statusColors[booking.status]}`}
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
                {formattedDate}
              </p>
            </div>
          </div>
          <div className="w-1 h-8 bg-slate-200" />
          <div className="flex items-center gap-3">
            <Clock className="text-slate-400" size={18} />
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase leading-none">
                Time
              </p>
              <p className="font-bold text-slate-700 text-sm">
                {booking.availabilitySlot.startMinute}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
            <Video size={18} />
            Join Meeting
          </button>
          <button className="p-4 rounded-2xl border border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
