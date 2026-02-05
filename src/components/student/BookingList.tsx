"use client";

import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { StudentBooking } from "@/src/service/booking/booking.service";
import { BookingCard } from "./BookingCard";
import { EmptyState } from "./EmptyState";

export function BookingList({
  bookings,
  currentType,
}: {
  bookings: StudentBooking[];
  currentType: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (type: string) => {
    router.push(`${pathname}?type=${type.toLowerCase()}`);
  };

  const tabs = ["Upcoming", "Past", "All"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-black text-slate-800 px-2 capitalize">
          {currentType} Sessions
          <span className="ml-2 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg text-sm">
            {bookings.length}
          </span>
        </h3>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl relative">
          {tabs.map((tab) => {
            const isActive = currentType === tab.toLowerCase();
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`relative px-6 py-2.5 rounded-xl font-bold text-sm transition-colors duration-300 z-10 ${
                  isActive
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="space-y-4">
        <AnimatePresence mode="popLayout">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <BookingCard booking={booking} />
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
