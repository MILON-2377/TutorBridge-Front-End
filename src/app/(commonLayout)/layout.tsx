import { Footer } from "@/src/components/shared/Footer";
import { Navbar } from "@/src/components/shared/Navbar";
import { AuthService } from "@/src/service/auth/auth.service";
import { ReactNode } from "react";

export default async function CommonLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await AuthService.getSession();
  const user = session.success ? session.data : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar user={user} />

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
