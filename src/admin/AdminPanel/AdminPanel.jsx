import { useState } from "react";

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
  Newspaper,
  ArrowRight,
  Building2,
} from "lucide-react";

import AddJob from "../AddJob/AddJob";
import ManageJobs from "../ManageJobs/ManageJobs";
import Applications from "../Applications/Applications";
import LatestNews from "../../components/LatestNews/LatestNews";
import AIJobs from "../../components/AIJobs/AIJobs";
import CompaniesAdmin from "../CompaniesAdmin/CompaniesAdmin";

export default function AdminPanel({ backHome }) {
  const [page, setPage] = useState("dashboard");
  const [open, setOpen] = useState(false);

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "add", label: "Add Job", icon: PlusCircle },
    { id: "manage", label: "Manage Jobs", icon: Briefcase },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "companies", label: "Companies", icon: Building2 }, // ✅ ADDED
    { id: "aijobs", label: "Featured Jobs", icon: Briefcase },
    { id: "news", label: "Latest News", icon: Newspaper },
  ];

  const stats = [
    {
      title: "Jobs",
      value: "Manage",
      desc: "Create and manage vacancies",
      icon: Briefcase,
      page: "manage",
    },
    {
      title: "Users",
      value: "Candidates",
      desc: "Registered job seekers",
      icon: Users,
      page: "dashboard",
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
    {
      title: "Featured Jobs",
      value: "Featured Jobs",
      desc: "Update homepage job cards",
      icon: Briefcase,
      page: "aijobs",
    },
    {
      title: "News",
      value: "Latest News",
      desc: "Update latest News section",
      icon: Newspaper,
      page: "news",
    },
  ];

  const renderPage = () => {
    if (page === "add") return <AddJob />;
    if (page === "manage") return <ManageJobs />;
    if (page === "applications") return <Applications />;
    if (page === "companies") return <CompaniesAdmin />; // ✅ ADDED
    if (page === "aijobs") return <AIJobs isAdmin />;
    if (page === "news") return <LatestNews isAdmin />;

    return (
      <div className="space-y-8">
        <section className="relative overflow-hidden rounded-[34px] border border-[#D5DEEF] bg-white/90 px-6 py-8 shadow-[0_25px_80px_rgba(57,88,134,0.16)] backdrop-blur-xl md:px-10 md:py-10">
          <div className="relative max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#8AAEE0] bg-[#F0F3FA] px-4 py-2 text-xs font-black uppercase text-[#395886]">
              <Sparkles size={16} />
              Admin Control Center
            </p>

            <h1 className="mt-6 text-4xl font-black text-[#395886]">
              Dashboard
            </h1>

            <p className="mt-4 text-[#395886]/70">
              Manage jobs, companies, applications, and more.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                onClick={() => setPage(item.page)}
                className="rounded-2xl border bg-white p-6 text-left shadow hover:-translate-y-1"
              >
                <Icon />
                <h2 className="mt-3 font-bold">{item.value}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </button>
            );
          })}
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F0F3FA]">
      <aside className="fixed left-0 top-0 h-full w-72 bg-white p-5">
        <h1 className="text-2xl font-black">JobCenter+</h1>

        <nav className="mt-10 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl p-3 ${
                  active ? "bg-blue-500 text-white" : ""
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          onClick={backHome}
          className="mt-10 flex w-full items-center gap-2 rounded-xl bg-gray-100 p-3"
        >
          <Home size={18} />
          Back Website
        </button>
      </aside>

      <main className="ml-72 p-6">{renderPage()}</main>
    </div>
  );
}