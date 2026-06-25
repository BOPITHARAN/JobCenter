import { useState } from "react";
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
      <div>
        <div className="rounded-[2rem] border border-white/70 bg-white/60 p-8 text-[#395886] shadow-[0_25px_70px_rgba(57,88,134,0.18)] backdrop-blur-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-2 text-sm font-black uppercase tracking-[0.25em] text-[#395886]">
            <Sparkles size={16} />
            {t("adminControlCenter", "Admin Control Center")}
          </p>

          <h1 className="mt-5 text-4xl font-black md:text-5xl">
            {t("welcomeDashboard", "Welcome to")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {t("dashboardText", "Dashboard")}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-[#395886]/70">
            {t(
              "adminDescription",
              "Manage vacancies, review applications and control your Job Center Plus platform from one professional dashboard."
            )}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-8 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-500 group-hover:opacity-35" />

                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
                  <Icon size={28} />
                </div>

                <h2 className="relative text-3xl font-black text-[#395886]">
                  {item.value}
                </h2>

                <p className="relative mt-2 font-bold text-[#395886]/80">
                  {item.title}
                </p>

                <p className="relative mt-2 text-sm text-[#395886]/60">
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
    <div className="relative min-h-screen overflow-hidden bg-[#F0F3FA] text-[#395886]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />
      <div className="absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-2xl border border-white/70 bg-white/70 p-3 text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.16)] backdrop-blur-xl lg:hidden"
      >
        <Menu />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#395886]/45 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r border-white/70 bg-white/70 p-6 shadow-[0_25px_70px_rgba(57,88,134,0.22)] backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-xl bg-[#F0F3FA] p-2 text-[#395886] lg:hidden"
        >
          <X />
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-[#395886]">
            JobCenter
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              +
            </span>
          </h1>

          <p className="mt-2 text-sm font-semibold text-[#395886]/60">
            {t("adminManagementPanel", "Admin Management Panel")}
          </p>
        </div>

        <nav className="space-y-3">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setPage(item.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left font-black transition ${
                  active
                    ? "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_28px_rgba(99,142,203,0.45)]"
                    : "text-[#395886]/70 hover:bg-white/70 hover:text-[#395886]"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={backHome}
          className="mt-10 flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/55 px-4 py-4 font-black text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.12)] transition hover:bg-white"
        >
          <Home size={20} />
          {t("backWebsite", "Back Website")}
        </button>
      </aside>

      <main className="relative z-10 min-h-screen p-6 pt-20 lg:ml-72 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
}