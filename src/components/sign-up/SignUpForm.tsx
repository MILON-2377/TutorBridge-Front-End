"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SignUpInput, signUpSchema } from "./signUpSchema";
import SignUpService from "./service/sign-up.service";
import { toast } from "sonner";

export function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      const response = await SignUpService.signUp(data);

      if (!response.success) {
        return toast.error("User SignUp error");
      }

      router.push("/onboarding");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            {...register("name")}
            placeholder="John Doe"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className="w-full pl-10 pr-4 py-2.5 text-gray-800 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 text-black border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          "Create Account"
        )}
        {!isSubmitting && <ArrowRight size={18} />}
      </button>
    </form>
  );
}
