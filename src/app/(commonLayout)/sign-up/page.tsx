import { SignUpForm } from "@/src/components/sign-up/SignUpForm";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Visual Side (Left) */}
      <div className="hidden lg:flex flex-col justify-between bg-indigo-700 p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <GraduationCap className="h-8 w-8" />
            <span className="text-2xl font-bold italic">TutorBridge</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Connect with the <br />
            <span className="text-indigo-300">perfect mentor.</span>
          </h1>
          <p className="mt-6 text-lg text-indigo-100 max-w-md">
            Join thousands of students and professional tutors in a seamless
            learning experience.
          </p>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Form Side (Right) */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Get Started</h2>
            <p className="text-slate-500 mt-2">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>

          <SignUpForm />

          <p className="text-xs text-center text-slate-400 mt-8">
            By clicking Create Account, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
