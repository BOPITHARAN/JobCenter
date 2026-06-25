import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  BriefcaseBusiness,
  Users,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

const API_URL = "https://jpbcenterback-production.up.railway.app";

export default function DashboardPreview() {
  const { t } = useTranslation();

  const [stats, setStats] = useState({
    jobs: 0,
    applications: 0,
    interviews: 0,
    hired: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/dashboard/stats`);

      setStats({
        jobs: res.data.data.jobs || 0,
        applications: res.data.data.applications || 0,
        interviews: res.data.data.interviews || 0,
        hired: res.data.data.hired || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      icon: BriefcaseBusiness,
      value: stats.jobs,
      title: t("dashboardPreview.activeJobs", "Active Jobs"),
    },
    {
      icon: Users,
      value: stats.interviews,
      title: t("dashboardPreview.interviews", "Interviews"),
    },
    {
      icon: BadgeCheck,
      value: stats.hired,
      title: t("dashboardPreview.hiredCandidates", "Hired Candidates"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16 text-[#395886]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />

      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AAEE0]/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[30px] border border-white/70 bg-white/55 p-6 shadow-[0_25px_70px_rgba(57,88,134,0.18)] backdrop-blur-2xl md:p-8"
        >
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886] shadow-sm backdrop-blur-md">
              <Sparkles size={13} />
              {t("dashboardPreview.badge", "Live Analytics")}
            </p>

            <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
              {t("dashboardPreview.title1", "Employer")}{" "}
              <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
                {t("dashboardPreview.title2", "Dashboard")}
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#395886]/70">
              {t(
                "dashboardPreview.description",
                "Real-time hiring analytics for jobs, interviews and successful candidates."
              )}
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {cards.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/60 p-5 shadow-[0_18px_45px_rgba(57,88,134,0.15)] backdrop-blur-xl transition duration-500 hover:bg-white/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-700 group-hover:opacity-35" />

                  <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
                    <Icon size={24} />
                  </div>

                  <h3 className="relative text-4xl font-black text-[#395886]">
                    {item.value}
                  </h3>

                  <p className="relative mt-2 text-sm font-bold text-[#395886]/70">
                    {item.title}
                  </p>

                  <div className="relative mt-4 h-[3px] w-0 rounded-full bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] transition-all duration-700 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
