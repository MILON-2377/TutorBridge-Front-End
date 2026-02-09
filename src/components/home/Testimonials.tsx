"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Alex Rivera",
    role: "UI/UX Student",
    text: "The 1-on-1 mentorship here is insane. My tutor helped me land a job at a top tech firm in just 3 months.",
    rating: 5,
    size: "large",
  },
  {
    name: "Sarah Chen",
    role: "Python Beginner",
    text: "I was struggling with coding until I found Mark. He simplified everything.",
    rating: 5,
    size: "small",
  },
  {
    name: "James Wilson",
    role: "Physics Major",
    text: "Perfect for exam prep. Highly recommended for complex subjects!",
    rating: 5,
    size: "small",
  },
  {
    name: "Maria Garcia",
    role: "Graphic Designer",
    text: "The platform is so smooth. Scheduling and payments are a breeze, letting me focus entirely on my portfolio.",
    rating: 5,
    size: "medium",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Loved by <span className="text-indigo-600">thousands</span> of
            learners
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Real stories from students who transformed their careers and skills
            through our platform.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`relative bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between overflow-hidden group transition-all hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 ${
                review.size === "large"
                  ? "md:row-span-2"
                  : review.size === "medium"
                    ? "md:col-span-2"
                    : ""
              }`}
            >
              <Quote className="absolute -right-4 -top-4 w-24 h-24 text-indigo-100/50 group-hover:text-indigo-200/50 transition-colors" />

              <div className="space-y-4 relative z-10">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-lg font-bold text-slate-800 leading-tight tracking-tight">
                  &quot;{review.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 overflow-hidden relative border-2 border-white shadow-sm">
                  <Image
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`}
                    alt={review.name}
                    fill
                  />
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
