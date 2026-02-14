export const dynamic = "force-dynamic";

import { Booking, BookingService } from "@/src/service/booking/booking.service";
import { Users, Clock, GraduationCap } from "lucide-react";
import StudentTable from "@/src/components/student/SttudentTable";
import StatCard from "@/src/components/student/StatCard";


export default async function StudentsPage() {
  const result = await BookingService.getSessionsByTutorId();
  const bookings = result?.data || [];

  // Derived stats
  const totalStudents = new Set(bookings.map((b: Booking) => b.studentId)).size;
  const totalHours = bookings.filter(
    (b: Booking) => b.status === "COMPLETED",
  ).length;
  const activeSessions = bookings.filter(
    (b: Booking) => b.status === "CONFIRMED",
  ).length;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My <span className="text-indigo-600">Students</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            Manage your mentees and track their learning progress.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <StatCard
            title="Total Students"
            value={totalStudents.toString()}
            icon={Users}
            color="text-indigo-600"
            bg="bg-indigo-50"
          />
          <StatCard
            title="Hours Taught"
            value={totalHours.toString()}
            icon={GraduationCap}
            color="text-emerald-600"
            bg="bg-emerald-50"
          />
          <StatCard
            title="Active Bookings"
            value={activeSessions.toString()}
            icon={Clock}
            color="text-amber-600"
            bg="bg-amber-50"
          />
        </div>
      </header>

      {/* Main Content: Student List */}
      <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Enrolled Mentees
            </h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Overview of all bookings
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-xs font-black text-slate-600 transition-colors border border-slate-100">
              Filter by Status
            </button>
          </div>
        </div>

        <StudentTable bookings={bookings} />
      </section>
    </div>
  );
}
