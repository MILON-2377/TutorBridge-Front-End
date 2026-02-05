"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignInInput, SignInOutput, signInSchema } from "./sign-in.validation";
import { signIn } from "./service/signin";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput, any, SignInOutput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: SignInOutput) => {
    try {
      console.log("Attempting Login:", data);

      await signIn(data);

      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(`Invalid credentials. Please try again. errors: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Email Address
        </label>
        <div className="relative group">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            className={`w-full pl-11 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
              errors.email
                ? "border-red-500 focus:ring-red-50"
                : "border-slate-200 focus:ring-indigo-50 focus:border-indigo-500"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <button
            type="button"
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative group">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className={`w-full pl-11 pr-12 py-3 bg-slate-50 border rounded-xl outline-none transition-all focus:ring-4 ${
              errors.password
                ? "border-red-500 focus:ring-red-50"
                : "border-slate-200 focus:ring-indigo-50 focus:border-indigo-500"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2">
        <input
          {...register("rememberMe")}
          type="checkbox"
          id="rememberMe"
          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor="rememberMe"
          className="text-sm text-slate-600 select-none"
        >
          Keep me logged in
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 active:scale-[0.98]"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            Sign In <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
