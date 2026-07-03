import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Home,
  FileText,
  Sparkles,
  Menu,
  X,
  Building2,
} from "lucide-react";

import AddJob from "../AddJob/AddJob";
import ManageJobs from "../ManageJobs/ManageJobs";
import Applications from "../Applications/Applications";
import CompaniesAdmin from "../CompaniesAdmin/CompaniesAdmin";

export default function AdminPanel({ backHome }) {
  const [page, setPage] = useState("dashboard");
  const [open, setOpen] = useState(false);

  // 🌟 Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // ✅ UPDATED MENU ARRAY
  const menu = [
    { id: "add", label: "Add Job", icon: PlusCircle },
    { id: "manage", label: "Manage Jobs", icon: Briefcase },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "companies", label: "Companies", icon: Building2 },
  ];

  // ✅ UPDATED STATS ARRAY
  const stats = [
    {
      title: "Jobs",
      value: "Manage",
      desc: "Create and manage vacancies",
      icon: Briefcase,
      page: "manage",
    },
    {
      title: "Applications",
      value: "Review",
      desc: "View CVs and submissions",
      icon: FileText,
      page: "applications",
    },
    {
      title: "Companies",
      value: "Manage",
      desc: "Add and control companies",
      icon: Building2,
      page: "companies",
    },
  ];

  const renderPage = () => {
    // ✅ NEW COMPONENTS ROUTING
    if (page === "add") return <AddJob />;
    if (page === "manage") return <ManageJobs />;
    if (page === "applications") return <Applications />;
    if (page === "companies") return <CompaniesAdmin />;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 md:space-y-8">
        
        {/* 🌟 Premium Welcome Header */}
        <section className="relative overflow-hidden rounded-[24px] md:rounded-[34px] border border-white/70 bg-white/60 px-6 py-8 md:px-10 md:py-10 shadow-[0_25px_70px_rgba(57,88,134,0.18)] backdrop-blur-xl">
          <div className="relative z-10 max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#395886]">
              <Sparkles size={16} className="text-[#638ECB]" />
              Admin Control Center
            </p>

            
          </div>
          {/* Decorative Gradient overlay */}
          <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#638ECB]/10 to-transparent pointer-events-none" />
        </section>

        {/* 📊 Interactive Stats - Cardless Design */}
        <section className="mt-10 md:mt-12 flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-8 md:gap-12 px-2 md:px-6">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                onClick={() => setPage(item.page)}
                className="group flex flex-1 items-start text-left gap-4 md:gap-5 border-b-2 border-dashed border-[#395886]/15 pb-6 md:border-b-0 md:border-r-2 md:pb-0 md:pr-12 last:border-0 last:pb-0 last:pr-0 cursor-pointer"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#395886]/10 to-[#638ECB]/20 text-[#395886] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#395886] leading-none transition-colors duration-300 group-hover:text-[#638ECB]">
                    {item.value}
                  </h2>
                  <p className="mt-2 font-bold text-[#395886]/80 text-sm md:text-base uppercase tracking-wider">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#395886]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </section>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F0F3FA] text-[#395886] font-sans font-medium">
      
      {/* 🎨 Background Blur Blobs */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF] pointer-events-none" />
      <div className="fixed -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px] pointer-events-none" />

      {/* 📱 Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-2xl border border-white/70 bg-white/70 p-3 text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.16)] backdrop-blur-xl lg:hidden hover:bg-white transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* 🌑 Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#395886]/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* 🧭 Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 md:w-80 border-r border-white/70 bg-white/80 p-6 shadow-[0_25px_70px_rgba(57,88,134,0.22)] backdrop-blur-2xl transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-xl bg-[#F0F3FA] p-2 text-[#395886] lg:hidden hover:bg-[#E2E8F0] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Brand Logo */}
        <div className="mb-8 mt-2 lg:mt-0 shrink-0">
          <h1 className="text-3xl font-black text-[#395886] flex items-center">
            JobCenter
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent ml-1">
              +
            </span>
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#638ECB]">
            Admin Control Panel
          </p>
        </div>

        {/* 📜 Scrollable Menu Nav */}
        <nav className="space-y-2 flex-1 overflow-y-auto pr-2 pb-4 scrollbar-hide">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPage(item.id);
                  setOpen(false); // Close mobile menu on click
                }}
                className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left font-bold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_10px_20px_rgba(99,142,203,0.3)] scale-[1.02]"
                    : "text-[#395886]/70 hover:bg-white hover:text-[#395886] hover:shadow-sm"
                }`}
              >
                <Icon size={20} className={active ? "text-white" : "text-[#638ECB]"} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Back Home Button (Sticky Bottom) */}
        <div className="pt-4 border-t border-[#395886]/10 mt-auto shrink-0">
          <button
            type="button"
            onClick={backHome}
            className="flex w-full justify-center items-center gap-3 rounded-2xl border border-white/80 bg-white/55 px-4 py-4 font-black text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.12)] transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-lg"
          >
            <Home size={20} className="text-[#638ECB]" />
            Back Website
          </button>
        </div>
      </aside>

      {/* 🖥️ Main Content Area */}
      <main className="relative z-10 min-h-screen p-4 pt-24 pb-10 md:p-6 md:pt-20 lg:ml-[320px] lg:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
      
    </div>
  );
}