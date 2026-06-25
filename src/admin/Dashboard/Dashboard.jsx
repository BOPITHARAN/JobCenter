import { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  FileText,
  Building2,
  Users,
  TrendingUp,
  Activity,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
  Newspaper,
  RefreshCcw,
} from "lucide-react";

const API_URL = "http://localhost:5000";

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    jobs: 0,
    applications: 0,
    companies: 0,
    candidates: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/api/dashboard/stats`);

      setDashboardStats({
        jobs: res.data?.jobs || 0,
        applications: res.data?.applications || 0,
        companies: res.data?.companies || 0,
        candidates: res.data?.candidates || 0,
      });
    } catch (error) {
      console.log(error);
      setDashboardStats({
        jobs: 0,
        applications: 0,
        companies: 0,
        candidates: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Jobs",
      value: dashboardStats.jobs,
      note: "Active vacancies",
      icon: Briefcase,
      color: "from-[#395886] to-[#638ECB]",
    },
    {
      title: "Applications",
      value: dashboardStats.applications,
      note: "Received applications",
      icon: FileText,
      color: "from-[#638ECB] to-[#8AAEE0]",
    },
    {
      title: "Companies",
      value: dashboardStats.companies,
      note: "Registered employers",
      icon: Building2,
      color: "from-[#395886] to-[#8AAEE0]",
    },
    {
      title: "Candidates",
      value: dashboardStats.candidates,
      note: "Registered users",
      icon: Users,
      color: "from-[#638ECB] to-[#395886]",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF] p-4 text-[#395886] md:p-6">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#638ECB]/25 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#395886]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] space-y-6">
        <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/50 p-8 shadow-[0_25px_70px_rgba(57,88,134,0.15)] backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D5DEEF]" />
          <div className="absolute bottom-0 right-24 h-28 w-28 rounded-t-full bg-[#B1C9EF]" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#395886] shadow-md">
                <Sparkles size={16} />
                Job Center Plus Admin
              </p>

              <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
                <span className="text-[#395886]">Admin </span>
                <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[#395886]/65 md:text-base">
                Monitor jobs, applications, employers and candidate activity in
                one premium admin workspace.
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/70 px-6 py-5 shadow-md backdrop-blur-xl">
              <p className="text-xs font-black uppercase tracking-widest text-[#638ECB]">
                Today Status
              </p>

              <p className="mt-2 flex items-center gap-2 font-black text-green-600">
                <Activity size={18} />
                All Services Operational
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-[30px] border border-white/70 bg-white/55 p-6 shadow-[0_20px_55px_rgba(57,88,134,0.12)] backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/75 hover:shadow-[0_28px_70px_rgba(57,88,134,0.18)]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-[0_10px_25px_rgba(99,142,203,0.35)]`}
                  >
                    <Icon size={25} />
                  </div>

                  <ArrowUpRight className="text-[#638ECB] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <h2 className="mt-6 text-4xl font-black text-[#395886]">
                  {loading ? "..." : item.value}
                </h2>

                <p className="mt-2 font-black text-[#395886]/75">
                  {item.title}
                </p>

                <p className="mt-3 flex items-center gap-2 text-sm font-bold text-green-600">
                  <TrendingUp size={15} />
                  {item.note}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[30px] border border-white/70 bg-white/60 p-6 shadow-[0_20px_55px_rgba(57,88,134,0.12)] backdrop-blur-xl lg:col-span-2 md:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#395886]">
                  Platform Performance
                </h3>

                <p className="mt-2 text-sm font-semibold text-[#395886]/60">
                  Overview of hiring and candidate engagement.
                </p>
              </div>

              <button
                type="button"
                onClick={fetchStats}
                disabled={loading}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#395886] px-5 text-sm font-black text-white shadow-md transition hover:bg-[#638ECB] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCcw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <Progress label="Vacancies Published" value="82%" width="82%" />
              <Progress label="Applications Received" value="74%" width="74%" />
              <Progress label="Employer Activity" value="68%" width="68%" />
            </div>
          </div>

          <div className="rounded-[30px] border border-white/70 bg-white/60 p-6 shadow-[0_20px_55px_rgba(57,88,134,0.12)] backdrop-blur-xl md:p-7">
            <h3 className="text-2xl font-black text-[#395886]">
              Quick Actions
            </h3>

            <p className="mt-2 text-sm font-semibold text-[#395886]/60">
              Common admin shortcuts.
            </p>

            <div className="mt-6 space-y-3">
              <Action text="Post Vacancy" icon={PlusCircle} />
              <Action text="Applications" icon={FileText} />
              <Action text="Featured Jobs" icon={Briefcase} />
              <Action text="Latest News" icon={Newspaper} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Progress({ label, value, width }) {
  return (
    <div>
      <div className="mb-2 flex justify-between gap-4 text-sm">
        <span className="font-black text-[#395886]">{label}</span>
        <span className="font-bold text-[#638ECB]">{value}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

function Action({ text, icon: Icon }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between gap-3 rounded-3xl border border-white/70 bg-white/60 px-4 py-4 text-left font-black text-[#395886] shadow-sm backdrop-blur-xl transition hover:bg-white/85 hover:shadow-md"
    >
      <span className="flex items-center gap-3">
        <Icon size={18} className="text-[#638ECB]" />
        {text}
      </span>

      <ArrowUpRight size={17} />
    </button>
  );
}










