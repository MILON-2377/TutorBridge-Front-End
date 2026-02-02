"use client";
import { UserRoleType } from "@/src/lib/constants";
import { BookOpen, GraduationCap } from "lucide-react";

export function RoleSelection({
  onSelect,
}: {
  onSelect: (role: Partial<UserRoleType>) => void;
}) {
  return (
    <div className=" px-5 space-y-6 animate-in fade-in zoom-in-95">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Choose your path
        </h1>
        <p className="text-slate-500 mt-2">
          Are you here to learn or to teach?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onSelect("STUDENT")}
          className="p-8 bg-white border-2 border-slate-100 hover:border-indigo-500 rounded-3xl transition-all text-left group"
        >
          <div className="bg-slate-50 text-slate-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <BookOpen size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Student</h3>
          <p className="text-sm text-slate-500">I want to book lessons.</p>
        </button>
        <button
          onClick={() => onSelect("TUTOR")}
          className="p-8 bg-white border-2 border-slate-100 hover:border-indigo-500 rounded-3xl transition-all text-left group"
        >
          <div className="bg-slate-50 text-slate-400 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <GraduationCap size={24} />
          </div>
          <h3 className="font-bold text-lg text-slate-900">Tutor</h3>
          <p className="text-sm text-slate-500">I want to teach students.</p>
        </button>
      </div>
    </div>
  );
}
