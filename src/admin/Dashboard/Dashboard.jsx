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

/* ✅ CLEAN BASE API */
const API_BASE_URL = "https://jpbcenterback-production.up.railway.app/api";

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    jobs: 0,
    applications: 0,
    companies: 0,
    candidates: 0,
  });

  const [loading, setLoading] = useState(false);

  /* ✅ FETCH DASHBOARD STATS */
  const fetchStats = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE_URL}/dashboard/stats`);

      if (res.data) {
        setDashboardStats({
          jobs: res.data.jobs || 0,
          applications: res.data.applications || 0,
          companies: res.data.companies || 0,
          candidates: res.data.candidates || 0,
        });
      } else {
        setDashboardStats({
          jobs: 0,
          applications: 0,
          companies: 0,
          candidates: 0,
        });
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);

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

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#638ECB]/25 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#395886]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] space-y-6">

        {/* HEADER */}
        <section className="relative overflow-hidden rounded-[36px] border bg-white/60 p-8 shadow-xl backdrop-blur-xl">
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-xs font-black uppercase">
                <Sparkles size={16} />
                Job Center Admin
              </p>

              <h1 className="mt-6 text-5xl font-black">
                Admin Dashboard
              </h1>

              <p className="mt-4 text-sm font-semibold text-[#395886]/60">
                Monitor jobs, applications, companies and users.
              </p>
            </div>

            <div className="rounded-3xl bg-white/70 px-6 py-5 shadow-md">
              <p className="text-xs font-black uppercase text-[#638ECB]">
                Status
              </p>
              <p className="mt-2 flex items-center gap-2 font-black text-green-600">
                <Activity size={18} />
                System Operational
              </p>
            </div>

          </div>
        </section>

        {/* STATS CARDS */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[30px] bg-white/60 p-6 shadow-lg backdrop-blur-xl"
              >
                <div className="flex justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white`}
                  >
                    <Icon size={24} />
                  </div>

                  <ArrowUpRight />
                </div>

                <h2 className="mt-6 text-4xl font-black">
                  {loading ? "..." : item.value}
                </h2>

                <p className="mt-2 font-bold">{item.title}</p>

                <p className="mt-2 flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp size={14} />
                  {item.note}
                </p>
              </article>
            );
          })}
        </section>

        {/* PERFORMANCE SECTION */}
        <section className="rounded-[30px] bg-white/60 p-6 backdrop-blur-xl">

          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-black">Performance</h3>
              <p className="text-sm text-[#395886]/60">
                System analytics overview
              </p>
            </div>

            <button
              onClick={fetchStats}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-[#395886] px-4 py-2 text-white"
            >
              <RefreshCcw className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <Progress label="Jobs" value="82%" />
            <Progress label="Applications" value="74%" />
            <Progress label="Companies" value="68%" />
          </div>

        </section>

      </div>
    </div>
  );
}

/* ✅ PROGRESS BAR */
function Progress({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="h-3 rounded-full bg-white/70">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-[#395886] to-[#8AAEE0]"
          style={{ width: value }}
        />
      </div>
    </div>
  );
}