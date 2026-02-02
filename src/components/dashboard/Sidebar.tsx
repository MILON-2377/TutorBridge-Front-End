"use client";

import { UserRoleType } from "@/src/lib/constants";
import menuItems from "@/src/routes";
import { signOutAction } from "@/src/service/auth/auth.action";
import { GraduationCap, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function Sidebar({ role }: { role: UserRoleType }) {
  const pathname = usePathname();
  const router = useRouter();

  const currentMenu = menuItems[role as keyof typeof menuItems] || [];

  const handleLogout = async () => {
    const response = await signOutAction();

    if (!response.success) {
      return toast.error("Logout Error. try again!");
    }

    toast.success("Logout successfull");

    router.push("/sign-in");
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col border-r border-slate-800 h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="p-6 flex items-center gap-3 text-white">
        <GraduationCap className="h-8 w-8 text-indigo-400" />
        <span className="font-bold text-xl tracking-tight">TutorBridge</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          {role} Panel
        </p>

        {currentMenu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={
                  isActive ? "text-white" : "group-hover:text-indigo-400"
                }
              />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-1">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-slate-800 hover:text-white ${
            pathname === "/dashboard/settings" ? "text-white bg-slate-800" : ""
          }`}
        >
          <Settings size={20} />
          <span className="text-sm font-medium">Settings</span>
        </Link>

        {/* Logout Button  */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-slate-400 hover:bg-red-500/10 hover:text-red-400 group"
        >
          <LogOut
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
