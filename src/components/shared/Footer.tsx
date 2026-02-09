import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const sections = [
    {
      title: "Learning",
      links: ["Find a Tutor", "Online Classes", "Subjects", "How it Works"],
    },
    {
      title: "For Tutors",
      links: ["Apply to Teach", "Tutor Resources", "Community", "Safety"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
  ];

  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <GraduationCap size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900">
                Tutor<span className="text-indigo-600">Bridge</span>
              </span>
            </Link>
            <p className="text-slate-500 font-medium max-w-xs leading-relaxed">
              Empowering learners worldwide through personalized 1-on-1 mentorship and expert-led education.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link key={i} href="#" className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400">
            © 2026 TutorBridge Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900">Privacy Policy</Link>
            <Link href="#" className="text-xs font-bold text-slate-400 hover:text-slate-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}