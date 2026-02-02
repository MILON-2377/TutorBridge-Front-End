"use client";

import { Categories } from "@/src/service/category/category.service";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CategorySelectionProps {
  categories: Categories[];
  selected: Categories | null;
  onSelect: (cat: Categories) => void;
  onBack: () => void;
}

export function CategorySelection({
  categories,
  onSelect,
  onBack,
  selected,
}: CategorySelectionProps) {
  const [current, setCurrent] = useState<Categories | null>(selected);

  return (
    <div className="animate-in slide-in-from-right-4 duration-300 px-5">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-slate-500 mb-4 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        What&aposs your specialty?
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCurrent(cat)}
            className={`p-3 rounded-xl border-2 transition-all text-sm font-semibold text-left ${
              current?.id === cat.id 
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <button
        disabled={!current}
        onClick={() => onSelect(current!)}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
      >
        Continue <ChevronRight size={18} />
      </button>
    </div>
  );
}
