import React from 'react';
import { Inbox, Search, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EmptyState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-center px-6">
      {/* Icon with soft glow */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-indigo-200 blur-2xl opacity-20 rounded-full" />
        <div className="relative w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm border border-slate-100">
          <Inbox className="text-slate-300" size={40} />
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-sm space-y-2 mb-8">
        <h4 className="text-xl font-black text-slate-900">
          No bookings found
        </h4>
        <p className="text-slate-500 font-medium text-sm leading-relaxed">
          It looks like you haven&apos;t scheduled any sessions yet. 
          Find the perfect tutor to start your learning journey.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link 
          href="/tutors"
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-95"
        >
          <Search size={18} />
          Explore Tutors
        </Link>
        
        <Link 
          href="/how-it-works"
          className="px-8 py-4 rounded-2xl font-black text-sm text-slate-500 hover:text-slate-900 hover:bg-white transition-all flex items-center gap-2"
        >
          How it works
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}