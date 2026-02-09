"use client";

import { NavRoutes } from "@/src/lib/constants";
import { User } from "@/src/service/auth/auth.service";
import { GraduationCap, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar({ user }: { user: User | null }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 py-3 rounded-4xl transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-xl shadow-slate-200/50 border border-white/50"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">
            Tutor<span className="text-indigo-600">Bridge</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NavRoutes.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="text-sm font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Actions */}
        {/* ... inside Actions div */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex p-3 text-slate-400 hover:text-indigo-600 transition-colors">
            <Search size={20} />
          </button>

          {user ? (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* User Avatar  */}
              <Link href="/dashboard" className="relative group">
                <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white shadow-md ring-2 ring-slate-100 group-hover:ring-indigo-200 transition-all">
                  <Image
                    src={
                      user.image ||
                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
                    }
                    alt="User Profile"
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Simple "Online" Indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </Link>

              {/* Mobile Menu for logged in state */}
              <button className="md:hidden p-3 bg-slate-50 rounded-xl text-slate-900">
                <Menu size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log In
              </Link>

              <Link
                href="/sign-up"
                className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
              >
                Join Free
              </Link>

              <button className="md:hidden p-3 bg-slate-50 rounded-xl text-slate-900">
                <Menu size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
