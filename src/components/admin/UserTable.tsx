"use client";

import { User } from "@/src/service/auth/auth.service";
import {
  MoreHorizontal,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface UserTableProps {
  users: User[];
  page?: number;
  totalPages?: number;
}

export function UserTable({ users, page = 1, totalPages = 1 }: UserTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                User Details
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Role & Permissions
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Joined Date
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Account Status
              </th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr
                key={user.id}
                className="group hover:bg-slate-50/40 transition-all duration-200"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                      <Image
                        src={
                          user.image ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                        }
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-900 text-sm leading-tight">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                        <Mail size={12} className="text-slate-300" />{" "}
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-tighter border ${
                        user.role === "ADMIN"
                          ? "bg-rose-50 text-rose-600 border-rose-100"
                          : user.role === "TUTOR"
                            ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                            : "bg-slate-50 text-slate-600 border-slate-100"
                      }`}
                    >
                      {user.role}
                    </span>
                    {user.role === "TUTOR" && (
                      <UserCog size={14} className="text-indigo-300" />
                    )}
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-slate-600 text-xs font-bold">
                      <Calendar size={13} className="text-slate-300" />
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50/50 border border-emerald-100 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                      Active
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="p-2.5 rounded-2xl hover:bg-white hover:shadow-lg transition-all text-slate-400 hover:text-indigo-600 active:scale-90 border border-transparent hover:border-slate-100">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-8 py-6 bg-slate-50/30 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Page <span className="text-slate-900">{page}</span> of{" "}
          <span className="text-slate-900">{totalPages}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all active:scale-90"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${
                      page === pageNum
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-110"
                        : "bg-white text-slate-400 border border-slate-100 hover:border-indigo-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all active:scale-90"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
