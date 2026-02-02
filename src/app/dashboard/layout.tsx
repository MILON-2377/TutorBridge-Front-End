import { Sidebar } from "@/src/components/dashboard/Sidebar";
import { UserRole, UserRoleType } from "@/src/lib/constants";
import { getSessionAction } from "@/src/service/auth/auth.action";
import { Suspense } from "react";
import LoadingSpinner from "@/src/layout/loading/LoadingSpinner";

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
  const session = await getSessionAction();
  const role: UserRoleType = session?.userData?.role;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar stays fixed and doesn't reload */}
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Navbar Placeholder */}
        <header className="h-16 border-b bg-white flex items-center px-6 shrink-0">
          <h2 className="font-bold text-slate-800 uppercase tracking-wider text-sm">
            {role} Portal
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
