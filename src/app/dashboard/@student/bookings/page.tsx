export const dynamic = "force-dynamic";

import { BookingService } from "@/src/service/booking/booking.service";
import { BookingList } from "@/src/components/student/BookingList";
import StatCard from "@/src/components/student/StatCard";
import { Timer, Calendar, CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import StudentBookingSkeleton from "@/src/components/student/StudentBookingSkeleton";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType = (type as "upcoming" | "past" | "all") || "all";

  const result = await BookingService.getBookingsStudentId({
    type: activeType,
  });
  const studentBookings = result.data ?? [];

  const stats = [
    {
      title: "Total Sessions",
      value: studentBookings.length.toString(),
      icon: Timer,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Confirmed",
      value: studentBookings
        .filter((b) => b.status === "CONFIRMED")
        .length.toString(),
      icon: Calendar,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Investment",
      value: `$${studentBookings.reduce((acc, b) => acc + b.price, 0)}`,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          My <span className="text-indigo-600">Sessions</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Manage your learning schedule.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <StudentBookingSkeleton className="h-40 w-full" />
          </div>
        }
      >
        <BookingList bookings={studentBookings} currentType={activeType} />
      </Suspense>
    </div>
  );
}
