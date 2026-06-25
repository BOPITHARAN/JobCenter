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

      console.log("RAW RESPONSE:", res.data);

      // ✅ SAFE PARSING (FIXED FOR ALL BACKENDS)
      const data =
        res.data?.data ||
        res.data?.stats ||
        res.data ||
        {};

      setDashboardStats({
        jobs: Number(data.jobs || 0),
        applications: Number(data.applications || 0),
        companies: Number(data.companies || 0),
        candidates: Number(data.candidates || 0),
      });
    } catch (error) {
      console.log("API ERROR:", error.message);

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

      {/* background */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#638ECB]/25 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#395886]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] space-y-6">

        {/* HEADER */}
        <section className="rounded-[36px] border border-white/70 bg-white/50 p-8 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2 text-xs font-black">
                <Sparkles size={16} />
                Job Center Admin
              </p>

              <h1 className="mt-6 text-5xl font-black">
                Admin Dashboard
              </h1>

              <p className="mt-4 text-sm text-[#395886]/70">
                Monitor jobs, applications, companies & candidates.
              </p>
            </div>

            <div className="rounded-3xl bg-white/70 px-6 py-5 shadow-md">
              <p className="text-xs font-black">Status</p>
              <p className="mt-2 flex items-center gap-2 font-black text-green-600">
                <Activity size={18} />
                System OK
              </p>
            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[30px] bg-white/60 p-6 shadow-md backdrop-blur-xl"
              >
                <div className="flex justify-between">
                  <div className={`rounded-2xl bg-gradient-to-br ${item.color} p-3 text-white`}>
                    <Icon />
                  </div>
                  <ArrowUpRight />
                </div>

                <h2 className="mt-6 text-4xl font-black">
                  {loading ? "..." : item.value}
                </h2>

                <p className="mt-2 font-bold">{item.title}</p>

                <p className="mt-3 text-sm text-green-600 flex items-center gap-1">
                  <TrendingUp size={14} />
                  {item.note}
                </p>
              </div>
            );
          })}
        </section>

        {/* REFRESH BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={fetchStats}
            className="flex items-center gap-2 rounded-xl bg-[#395886] px-5 py-2 text-white"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>

      </div>
    </div>
  );
}