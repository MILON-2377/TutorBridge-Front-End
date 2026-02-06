"use client";

import { useState } from "react";
import { Star, X, Loader2, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { createReviewAction } from "@/src/service/booking/booking.action";

interface ReviewModalProps {
  bookingId: string;
  tutorName: string;
  onClose: () => void;
}

export const ReviewModal = ({
  bookingId,
  tutorName,
  onClose,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return toast.error("Please select a rating");
    setIsSubmitting(true);

    const payload = {
      rating,
      comment,
    };

    try {
      await createReviewAction(bookingId, payload);
      toast.success("Review submitted! Thank you for your feedback.");
      onClose();
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Rate your session
            </h2>
            <p className="text-slate-500 font-medium italic">
              How was your mentorship with {tutorName}?
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Star Rating */}
        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
              className="transition-transform active:scale-90"
            >
              <Star
                size={42}
                className={`${
                  (hover || rating) >= star
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                } transition-colors`}
                strokeWidth={2.5}
              />
            </button>
          ))}
        </div>

        {/* Comment Area */}
        <div className="space-y-2 mb-8">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-2">
            <MessageSquare size={12} /> Your Experience (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you learn? Was the tutor helpful?"
            className="w-full p-6 rounded-4xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 outline-none transition-all h-32 resize-none text-sm font-medium"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-5 bg-slate-900 text-white rounded-4xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-200"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin mx-auto" />
          ) : (
            "Submit Review"
          )}
        </button>
      </div>
    </div>
  );
};
