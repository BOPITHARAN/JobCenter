import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Home,
  Users,
  FileText,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

import AddJob from "../AddJob/AddJob";
import ManageJobs from "../ManageJobs/ManageJobs";
import Applications from "../Applications/Applications";

export default function AdminPanel({ backHome }) {
  const { t } = useTranslation();

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

  const menu = [
    {
      id: "dashboard",
      label: t("menuDashboard", "Dashboard"),
      icon: LayoutDashboard,
    },
    {
      id: "add",
      label: t("menuAddJob", "Add Job"),
      icon: PlusCircle,
    },
    {
      id: "manage",
      label: t("menuManageJobs", "Manage Jobs"),
      icon: Briefcase,
    },
    {
      id: "applications",
      label: t("menuApplications", "Applications"),
      icon: FileText,
    },
  ];

  const stats = [
    {
      title: t("jobs", "Jobs"),
      value: t("manage", "Manage"),
      desc: t("createManageVacancies", "Create and manage vacancies"),
      icon: Briefcase,
    },
    {
      title: t("users", "Users"),
      value: t("candidates", "Candidates"),
      desc: t("registeredJobSeekers", "Registered job seekers"),
      icon: Users,
    },
    {
      title: t("applications", "Applications"),
      value: t("review", "Review"),
      desc: t("viewCVs", "View CVs and submissions"),
      icon: FileText,
    },
  ];

  const renderPage = () => {
    if (page === "add") return <AddJob />;
    if (page === "manage") return <ManageJobs />;
    if (page === "applications") return <Applications />;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* 🌟 Welcome Card */}
        <div className="rounded-[24px] md:rounded-[2rem] border border-white/70 bg-white/60 p-6 md:p-8 text-[#395886] shadow-[0_25px_70px_rgba(57,88,134,0.18)] backdrop-blur-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#395886]">
            <Sparkles size={16} className="text-[#638ECB]" />
            {t("adminControlCenter", "Admin Control Center")}
          </p>

          <h1 className="mt-5 text-3xl font-black md:text-5xl leading-tight">
            {t("welcomeDashboard", "Welcome to")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {t("dashboardText", "Dashboard")}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm md:text-base text-[#395886]/70 leading-relaxed font-medium">
            {t(
              "adminDescription",
              "Manage vacancies, review applications and control your Job Center Plus platform from one professional dashboard."
            )}
          </p>
        </div>

        {/* 📊 Stats Grid */}
        <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[20px] md:rounded-[2rem] border border-white/70 bg-white/60 p-6 md:p-8 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(57,88,134,0.22)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-500 group-hover:opacity-10" />

                <div className="relative mb-5 md:mb-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)] group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="md:w-7 md:h-7" />
                </div>

                <h2 className="relative text-2xl md:text-3xl font-black text-[#395886]">
                  {item.value}
                </h2>

                <p className="relative mt-1 md:mt-2 font-bold text-[#395886]/80 text-sm md:text-base">
                  {item.title}
                </p>

                <p className="relative mt-1 md:mt-2 text-xs md:text-sm font-medium text-[#395886]/60">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F0F3FA] text-[#395886] font-sans font-medium">
      {/* 🎨 Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF] pointer-events-none" />
      <div className="fixed -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px] pointer-events-none" />

      {/* 📱 Mobile Menu Toggle */}
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

        {/* Brand/Logo */}
        <div className="mb-10 mt-2 lg:mt-0">
          <h1 className="text-3xl font-black text-[#395886] flex items-center">
            JobCenter
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent ml-1">
              +
            </span>
          </h1>
          <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#638ECB]">
            {t("adminManagementPanel", "Admin Management Panel")}
          </p>
        </div>

        {/* Nav Links */}
        <nav className="space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-hide">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPage(item.id);
                  setOpen(false); // Close menu on mobile after selection
                }}
                className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left font-bold transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_10px_20px_rgba(99,142,203,0.3)] scale-[1.02]"
                    : "text-[#395886]/70 hover:bg-white hover:text-[#395886] hover:shadow-sm"
                }`}
              >
                <Icon size={22} className={active ? "text-white" : "text-[#638ECB]"} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Back to Home Button - Sticks to bottom */}
        <div className="pt-6 border-t border-[#395886]/10 mt-auto">
          <button
            type="button"
            onClick={backHome}
            className="flex w-full justify-center items-center gap-3 rounded-2xl border border-white/80 bg-white/55 px-4 py-4 font-black text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.12)] transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-lg"
          >
            <Home size={20} className="text-[#638ECB]" />
            {t("backWebsite", "Back to Website")}
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