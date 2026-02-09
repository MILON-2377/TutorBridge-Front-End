export default function ProfileBio({ bio, subjects }: { bio: string; subjects: string[] }) {
  return (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-slate-900">About Me</h3>
      <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
        {bio || "No bio provided yet. Update your profile to tell students about your expertise!"}
      </p>

      {subjects && subjects.length > 0 && (
        <div className="pt-6 border-t border-slate-50">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
            Core Subjects
          </h4>
          <div className="flex flex-wrap gap-2">
            {subjects.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-black"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}