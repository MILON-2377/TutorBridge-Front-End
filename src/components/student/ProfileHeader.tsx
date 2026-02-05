"use client"
import { User } from "@/src/service/auth/auth.service";
import { Camera, Mail, ShieldCheck, MapPin, Edit3 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileHeader = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <div className="relative mb-8">
      <div className="h-32 w-full bg-leaner-to-r from-indigo-600 to-indigo-400 rounded-t-[3rem]" />

      <div className="bg-white px-8 pb-8 rounded-b-[3rem] border-x border-b border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row items-end gap-6 -mt-12">
          <div className="relative group">
            <div className="h-32 w-32 rounded-[2.5rem] bg-white p-1.5 shadow-xl">
              <div className="h-full w-full rounded-4xl overflow-hidden relative">
                <Image
                  src={
                    user?.image ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  }
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-95 border-2 border-white">
              <Camera size={16} />
            </button>
          </div>

          {/* Name & Basic Info */}
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black text-slate-900 leading-none">
                {user.name}
              </h1>
              <ShieldCheck size={20} className="text-emerald-500" />
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-slate-500 font-medium text-sm">
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> New York, USA
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 pb-2">
            <button onClick={() => router.push("/dashboard/profile/edit")} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all">
              <Edit3 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
