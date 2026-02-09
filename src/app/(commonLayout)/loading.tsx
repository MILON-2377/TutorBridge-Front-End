export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed top-0 left-0 right-0 p-6 z-50">
        <div className="max-w-7xl mx-auto h-16 bg-slate-50 border border-slate-100 rounded-4xl animate-pulse" />
      </div>

      <main className="flex-1 pt-40 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-12 w-1/3 bg-slate-100 rounded-2xl animate-pulse" />
          <div className="h-64 w-full bg-slate-50 rounded-[3rem] animate-pulse" />
        </div>
      </main>
    </div>
  );
}
