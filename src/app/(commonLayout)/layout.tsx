import { Footer } from "@/src/components/shared/Footer";
import { ReactNode, Suspense } from "react";

import { NavbarClient } from "@/src/components/dashboard/NavbarClient";


export default function CommonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Suspense fallback={<div className="h-20 bg-slate-50 animate-pulse" />}>
        <NavbarClient />
      </Suspense>

      {/* Main content
       */}
      <main className="flex-1 pt-32 pb-20 animate-in fade-in duration-700">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
