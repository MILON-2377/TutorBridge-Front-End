import { Sidebar } from "@/src/components/dashboard/Sidebar";
import { UserRole, UserRoleType } from "@/src/lib/constants";
import { Suspense } from "react";
import LoadingSpinner from "@/src/layout/loading/LoadingSpinner";
import { redirect } from "next/navigation";
import { AuthService } from "@/src/service/auth/auth.service";

interface DashboardLayoutProps {
  children: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
  admin: React.ReactNode;
}

export default async function DashboardLayout({
  children,
  student,
  tutor,
  admin,
}: DashboardLayoutProps) {
  const session = await AuthService.getSession();

  if (!session?.role) {
    redirect("/sign-in");
  }

  const role = session.role as UserRoleType;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar stays fixed and doesn't reload */}
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 border-b bg-white flex items-center px-6 shrink-0">
          <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
            {role.toLowerCase()} Portal
          </h2>
        </header>

        <main className="p-6">
          <Suspense fallback={<LoadingSpinner />}>
            {children}
            {role === UserRole.STUDENT && student}
            {role === UserRole.TUTOR && tutor}
            {role === UserRole.ADMIN && admin}
          </Suspense>
        </main>
      </div>
    </div>
  );
}
