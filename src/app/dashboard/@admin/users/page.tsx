import { UserStats } from "@/src/components/admin/UserStats";
import { UserTable } from "@/src/components/admin/UserTable";
import { UserFilters } from "@/src/components/admin/UserFilters";
import { GetUsersQuery, UserService } from "@/src/service/user/user.service";
import { EmptyState } from "@/src/components/shared/EmptyState";

export default async function UsersPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<GetUsersQuery>;
}) {
  const searchParams = await searchParamsPromise;

  const result = await UserService.getAllUsers({
    search: searchParams?.search,
    role: searchParams?.role,
    status: searchParams?.status,
    page: searchParams?.page ? Number(searchParams.page) : 1,
    limit: searchParams?.limit ? Number(searchParams.limit) : 10,
  });

  if (!result.success || !result.data) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-6">
        <EmptyState
          title={!result.success ? "Connection Error" : "No users found"}
          description={
            !result.success
              ? "We couldn't reach the user database. Please check your connection and try again."
              : "The platform currently has no registered users."
          }
          actionLabel="Refresh Page"
          actionHref="/dashboard/users"
        />
      </div>
    );
  }

  const users = result.data.users;
  const meta = result.data.pagination;

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Platform <span className="text-indigo-600">Users</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            Manage, verify, and monitor all registered accounts.
          </p>
        </div>

        <UserStats total={meta?.total ?? users.length} />
      </header>

      <section className="space-y-6">
        <UserFilters />

        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
          <UserTable
            users={users}
            page={meta?.page}
            totalPages={meta?.totalPages}
          />
        </div>
      </section>
    </div>
  );
}
