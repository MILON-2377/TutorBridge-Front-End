import { TutorProfile } from "@/src/service/tutor/tutor.service";
import {  Star, Edit3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProfileHero({ tutor }: { tutor: TutorProfile }) {
  return (
    <section className="relative bg-white rounded-[3.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-60" />

      <div className="relative flex flex-col md:flex-row items-center gap-8">
        <div className="relative group">
          <div className="w-40 h-40 rounded-[3rem] overflow-hidden ring-8 ring-slate-50 shadow-inner relative bg-slate-100">
            <Image
              src={
                tutor.user?.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.id}`
              }
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white w-8 h-8 rounded-full shadow-lg" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {tutor.user?.name}
            </h1>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-black text-amber-700">
                4.9 (120 Reviews)
              </span>
            </div>
            {/* <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
              <MapPin size={16} className="text-slate-400" />
              <span className="text-sm font-bold text-slate-600">
                {tutor.location || "Remote"}
              </span>
            </div> */}
          </div>
        </div>

        <Link
          href="/dashboard/profile/edit"
          className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          <Edit3 size={18} />
          Edit Profile
        </Link>
      </div>
    </section>
  );
}
