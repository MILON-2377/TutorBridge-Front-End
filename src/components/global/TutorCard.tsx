import { Star, ShieldCheck, ArrowRight, Briefcase, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tutor } from "@/src/service/tutor/tutor.service";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  const {
    name,
    avgRating,
    totalReviews,
    hourlyRate,
    experienceYears,
    languages,
    bio,
    user,
    id,
  } = tutor;

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-6 hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="relative">
          <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-slate-100 ring-4 ring-slate-50 shadow-inner">
            <Image
              src={user?.image || "/placeholder-avatar.png"}
              alt={`${name}'s profile`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="absolute -top-2 -left-2 bg-emerald-500 text-white p-1 rounded-full shadow-lg z-10">
            <ShieldCheck size={14} />
          </div>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Hourly Rate
          </p>
          <p className="text-2xl font-black text-slate-900">
            ${hourlyRate}
            <span className="text-sm font-bold text-slate-400">/hr</span>
          </p>
        </div>
      </div>

      {/* Main Info */}
      <div className="space-y-3 grow">
        <div className="flex items-center gap-1.5 text-amber-500">
          <Star size={14} fill="currentColor" />
          <span className="text-sm font-black text-slate-700">
            {avgRating.toFixed(1)}
          </span>
          <span className="text-xs font-bold text-slate-400">
            ({totalReviews} reviews)
          </span>
        </div>

        <div>
          <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
            {name}
          </h4>
          <p className="text-slate-500 text-sm font-medium line-clamp-2 mt-1 italic">
            {bio}
          </p>
        </div>

        {/* Experience & Languages Meta */}
        <div className="flex flex-wrap gap-y-2 gap-x-4 pt-1">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Briefcase size={14} className="text-indigo-400" />
            <span className="text-[11px] font-bold">
              {experienceYears}y Experience
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Globe size={14} className="text-indigo-400" />
            <span className="text-[11px] font-bold">
              {languages.slice(0, 2).join(", ")}
            </span>
          </div>
        </div>

        {/* Subject Tags */}
        {/* <div className="flex flex-wrap gap-2 pt-2">
          {subjects?.map((subject) => (
            <span
              key={subject}
              className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-tighter hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default"
            >
              {subject}
            </span>
          ))}
        </div> */}
      </div>

      {/* Action CTA */}
      <div className="mt-8 pt-6 border-t border-slate-50">
        <Link
          href={`/tutors/${id}`}
          className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all group/btn shadow-lg shadow-slate-100"
        >
          <span>Book a Session</span>
          <ArrowRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
