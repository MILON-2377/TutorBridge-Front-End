
export const dynamic = "force-dynamic";

import { SignInForm } from "@/src/components/sign-in/SignInForm";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand/Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-indigo-200 shadow-xl mb-4">
            <GraduationCap className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            TutorBridge
          </h1>
          <p className="text-slate-500 mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <SignInForm />

          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-center text-sm text-slate-600">
              New to TutorBridge?{" "}
              <Link
                href="/sign-up"
                className="text-indigo-600 font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-400 font-medium uppercase tracking-widest">
          <a href="#" className="hover:text-slate-600">
            Privacy
          </a>
          <a href="#" className="hover:text-slate-600">
            Terms
          </a>
          <a href="#" className="hover:text-slate-600">
            Support
          </a>
        </div>
      </div>
    </div>
  );
}
