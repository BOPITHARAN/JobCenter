import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient"; // ✅ Supabase Imported (Axios Removed)
import {
  Briefcase,
  FileText,
  Building2,
  Users,
  TrendingUp,
  Activity,
  Sparkles,
  ArrowUpRight,
  RefreshCcw,
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    jobs: 0,
    applications: 0,
    companies: 0,
    candidates: 0,
  });

  const [loading, setLoading] = useState(false);

  /* 🚀 SUPABASE PARALLEL FETCH (FAST & EXACT) */
  const fetchStats = async () => {
    try {
      setLoading(true);

      // Using Promise.all to fetch all counts simultaneously for max performance
      const [jobsRes, appsRes, compRes, usersRes] = await Promise.all([
        supabase.from("jobs").select("*", { count: "exact", head: true }),
        supabase.from("applications").select("*", { count: "exact", head: true }),
        supabase.from("companies").select("*", { count: "exact", head: true }),
        // Check your database: If you store candidates in 'users' table, use 'users'. 
        // If you store them in an auth table or specific candidate table, change this accordingly.
        supabase.from("users").select("*", { count: "exact", head: true }) 
      ]);

      setDashboardStats({
        jobs: jobsRes.count || 0,
        applications: appsRes.count || 0,
        companies: compRes.count || 0,
        candidates: usersRes.count || 0,
      });

    } catch (error) {
      console.error("Dashboard fetch error:", error.message);
      setDashboardStats({ jobs: 0, applications: 0, companies: 0, candidates: 0 });
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
      hoverShadow: "hover:shadow-[#638ECB]/30"
    },
    {
      title: "Applications",
      value: dashboardStats.applications,
      note: "Received applications",
      icon: FileText,
      color: "from-[#638ECB] to-[#8AAEE0]",
      hoverShadow: "hover:shadow-[#8AAEE0]/30"
    },
    {
      title: "Companies",
      value: dashboardStats.companies,
      note: "Registered employers",
      icon: Building2,
      color: "from-[#395886] to-[#8AAEE0]",
      hoverShadow: "hover:shadow-[#395886]/30"
    },
    {
      title: "Candidates",
      value: dashboardStats.candidates,
      note: "Registered users",
      icon: Users,
      color: "from-[#638ECB] to-[#395886]",
      hoverShadow: "hover:shadow-[#395886]/40"
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF] p-4 text-[#395886] md:p-6 pb-12 font-sans">

      {/* 🎨 BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 md:h-96 w-72 md:w-96 rounded-full bg-[#638ECB]/25 blur-[100px] md:blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 md:h-96 w-72 md:w-96 rounded-full bg-[#395886]/20 blur-[100px] md:blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* 🌟 PREMIUM HEADER */}
        <section className="relative overflow-hidden rounded-[24px] md:rounded-[36px] border border-white/70 bg-white/60 p-6 md:p-8 shadow-[0_20px_50px_rgba(57,88,134,0.12)] backdrop-blur-xl">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#638ECB]/5 to-transparent pointer-events-none" />
          
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end z-10">

            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/20 bg-white/70 px-4 md:px-5 py-2 text-xs md:text-sm font-black uppercase tracking-wider text-[#395886]">
                <Sparkles size={16} className="text-[#638ECB]" />
                Job Center Admin
              </p>

              <h1 className="mt-5 md:mt-6 text-4xl md:text-5xl font-black text-[#395886]">
                Admin <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">Dashboard</span>
              </h1>

              <p className="mt-3 md:mt-4 text-sm md:text-base font-bold text-[#395886]/70 max-w-lg leading-relaxed">
                Monitor jobs, applications, companies and users in real-time.
              </p>
            </div>

            {/* Status Indicator Widget */}
            <div className="rounded-[20px] md:rounded-3xl border border-white/80 bg-white/70 px-5 py-4 md:px-6 md:py-5 shadow-sm backdrop-blur-md w-full lg:w-auto shrink-0 flex items-center lg:block justify-between lg:justify-start">
              <p className="text-xs font-black uppercase tracking-wider text-[#638ECB]">
                System Status
              </p>
              <p className="lg:mt-2 flex items-center gap-2 text-sm md:text-base font-black text-green-600 bg-green-50 lg:bg-transparent px-3 py-1.5 lg:px-0 lg:py-0 rounded-lg">
                <Activity size={18} className="animate-pulse" />
                Operational
              </p>
            </div>

          </div>
        </section>

        {/* 📊 STATS CARDS */}
        <section className="grid gap-5 md:gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`group relative rounded-[24px] md:rounded-[30px] border border-white/70 bg-white/60 p-6 md:p-8 shadow-[0_15px_35px_rgba(57,88,134,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${item.hoverShadow}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className="md:w-8 md:h-8" />
                  </div>

                  <div className="bg-[#F0F3FA] text-[#638ECB] p-2 rounded-full opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <h2 className="mt-4 md:mt-6 text-4xl md:text-5xl font-black text-[#395886] tracking-tight">
                  {loading ? <Loader2 className="animate-spin text-[#638ECB] mt-2 mb-1" size={32} /> : item.value}
                </h2>

                <p className="mt-2 text-base md:text-lg font-bold text-[#395886]/90">{item.title}</p>

                <p className="mt-3 w-fit flex items-center gap-1.5 text-xs md:text-sm font-bold text-green-700 bg-green-50/80 px-2.5 py-1 rounded-lg border border-green-100">
                  <TrendingUp size={14} />
                  {item.note}
                </p>
              </article>
            );
          })}
        </section>

        {/* 📈 PERFORMANCE SECTION */}
        <section className="rounded-[24px] md:rounded-[30px] border border-white/70 bg-white/60 p-6 md:p-8 shadow-[0_15px_35px_rgba(57,88,134,0.08)] backdrop-blur-xl">

          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center border-b border-[#395886]/10 pb-6 mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-[#395886]">Performance</h3>
              <p className="text-sm md:text-base font-medium text-[#395886]/60 mt-1">
                System analytics overview
              </p>
            </div>

            <button
              onClick={fetchStats}
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#395886] to-[#638ECB] px-5 py-3 md:py-3.5 text-white font-bold shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
              {loading ? "Syncing..." : "Refresh Data"}
            </button>
          </div>

          <div className="space-y-5 md:space-y-6">
            <Progress label="Jobs Capacity" value="82%" color="from-[#395886] to-[#638ECB]" delay="0ms" />
            <Progress label="Applications Processing" value="74%" color="from-[#638ECB] to-[#8AAEE0]" delay="150ms" />
            <Progress label="Company Quotas" value="68%" color="from-[#395886] to-[#8AAEE0]" delay="300ms" />
          </div>

        </section>

      </div>
    </div>
  );
}

/* 🎨 PREMIUM ANIMATED PROGRESS BAR */
function Progress({ label, value, color, delay }) {
  return (
    <div className="group">
      <div className="flex justify-between text-sm md:text-base font-bold text-[#395886] mb-2">
        <span>{label}</span>
        <span className="text-[#638ECB]">{value}</span>
      </div>

      <div className="h-3 md:h-4 w-full rounded-full bg-white/80 overflow-hidden shadow-inner border border-white">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out group-hover:opacity-80`}
          style={{ width: value, transitionDelay: delay }}
        />
      </div>
    </div>
  );
}