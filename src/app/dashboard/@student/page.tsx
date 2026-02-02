// app/dashboard/@student/page.tsx
import BookingCard from "@/src/components/student/BookingCard";
import StatCard from "@/src/components/student/StatCard";
import { BookOpen, Clock, Star, Search } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Learning Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Track your progress and upcoming sessions.
          </p>
        </div>
        <Link
          href="/tutors"
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm shadow-indigo-100"
        >
          <Search size={18} />
          Find a New Tutor
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Upcoming Sessions"
          value="3"
          icon={Clock}
          color="text-indigo-600"
          bg="bg-indigo-50"
        />
        <StatCard
          title="Total Lessons"
          value="12"
          icon={BookOpen}
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          title="Reviews Given"
          value="8"
          icon={Star}
          color="text-amber-600"
          bg="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Upcoming Bookings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Next Sessions</h3>
            <Link
              href="/dashboard/bookings"
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {/* We will map through real bookings here later */}
            <BookingCard
              tutorName="Dr. Sarah Johnson"
              subject="Advanced Mathematics"
              time="Today, 4:00 PM"
              status="CONFIRMED"
            />
            <BookingCard
              tutorName="Marc Rivera"
              subject="Physics 101"
              time="Tomorrow, 10:30 AM"
              status="CONFIRMED"
            />
          </div>
        </div>

        {/* Sidebar: Profile Summary / Quick Stats */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
            <h4 className="font-bold mb-2">Learning Streak</h4>
            <p className="text-slate-400 text-sm mb-4">
              You ve attended sessions 3 weeks in a row!
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((day) => (
                <div
                  key={day}
                  className={`h-2 flex-1 rounded-full ${day < 4 ? "bg-indigo-500" : "bg-slate-700"}`}
                />
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 bg-white">
            <h4 className="font-bold text-slate-800 mb-4">Top Categories</h4>
            <div className="flex flex-wrap gap-2">
              {["Math", "Physics", "Coding"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
