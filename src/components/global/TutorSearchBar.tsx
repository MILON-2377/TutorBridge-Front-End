"use client";

import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Categories } from "@/src/service/category/category.service";

export function TutorSearchBar({ categories }: { categories: Categories[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState(searchParams.get("search") || "");
  const [selectedSubject, setSelectedSubject] = useState(
    searchParams.get("subject") || "",
  );

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.push(`/tutors?${params.toString()}`, { scroll: false });
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    updateUrl("search", value);
  }, 400);

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    updateUrl("subject", subject);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center bg-white p-3 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 ring-4 ring-slate-50">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="What do you want to learn today?"
          className="w-full pl-14 pr-4 py-4 bg-transparent border-none outline-none font-bold text-slate-800 placeholder:text-slate-400 text-lg"
        />
      </div>

      <div className="flex gap-2 w-full lg:w-auto">
        {/* Subject Filter Dropdown */}
        <div className="relative group flex-1 lg:flex-none">
          <Filter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            size={18}
          />
          <select
            value={selectedSubject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            className="w-full lg:w-48 pl-12 pr-10 py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 appearance-none transition-all cursor-pointer"
          >
            <option value="">All Subjects</option>
            {categories?.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:rotate-180 transition-transform"
            size={16}
          />
        </div>

        <button
          onClick={() => updateUrl("search", term)}
          className="hidden lg:block bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
        >
          Search
        </button>
      </div>
    </div>
  );
}
