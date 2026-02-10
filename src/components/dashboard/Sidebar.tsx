"use client";

import { UserRoleType } from "@/src/lib/constants";
import menuItems from "@/src/routes";
import {
  GraduationCap,
  LogOut,
  Settings,
  Home as HomeIcon,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function Sidebar({ role }: { role: UserRoleType }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* --- MOBILE TRIGGER --- */}
      <div className="md:hidden fixed top-4 left-4 z-60">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl border border-slate-800 active:scale-90 transition-transform"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-70 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-80 w-72 bg-slate-900 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col border-r border-slate-800 h-screen
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <SidebarContent role={role} pathname={pathname} />
      </aside>
    </>
  );
}

function SidebarContent({
  role,
  pathname,
}: {
  role: UserRoleType;
  pathname: string;
}) {
  const router = useRouter();
  const currentMenu = menuItems[role as keyof typeof menuItems] || [];

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/api/v1/auth/sign-out`,
        { method: "POST", credentials: "include" },
      );
      if (!res.ok) throw new Error("Logout failed");
      toast.success("Logout successful");
      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Logout error. Try again!");
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter">
            TutorBridge
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all group"
        >
          <ChevronLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <HomeIcon size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-3 mb-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
          <span className="bg-slate-800/30 px-2 py-1 rounded-md">
            {role} System
          </span>
        </div>

        {currentMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "hover:bg-slate-800/50 hover:text-white text-slate-400"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive
                    ? "text-white"
                    : "group-hover:text-indigo-400 transition-colors"
                }
              />
              <span className="font-bold text-sm tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 space-y-2">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-slate-800 hover:text-white ${
            pathname === "/dashboard/settings"
              ? "text-white bg-slate-800"
              : "text-slate-400"
          }`}
        >
          <Settings size={20} />
          <span className="text-sm font-bold tracking-tight">Settings</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 group"
        >
          <LogOut
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="text-sm font-bold tracking-tight">Logout</span>
        </button>
      </div>
    </>
  );
}
