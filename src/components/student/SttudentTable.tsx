"use client";

import Image from "next/image";
import { MoreVertical, MessageCircle } from "lucide-react";

export default function StudentTable({ bookings }: { bookings: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Student
            </th>
            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Subject
            </th>
            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Last Session
            </th>
            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Status
            </th>
            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {bookings.map((booking) => (
            <tr
              key={booking.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden relative bg-slate-100 ring-2 ring-white shadow-sm">
                    <Image
                      src={
                        booking.student.user.image ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.student.id}`
                      }
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-sm">
                      {booking.student.user.name}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {booking.student.user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                  {booking.tutor.subjects?.[0] || "General"}
                </span>
              </td>
              <td className="px-8 py-6">
                <p className="text-sm font-bold text-slate-600">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </td>
              <td className="px-8 py-6">
                <StatusBadge status={booking.status} />
              </td>
              <td className="px-8 py-6">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                    <MessageCircle size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    BOOKED: "bg-indigo-50 text-indigo-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
    PENDING: "bg-amber-50 text-amber-700",
    CANCELLED: "bg-rose-50 text-rose-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${styles[status] || "bg-slate-100"}`}
    >
      {status}
    </span>
  );
}
