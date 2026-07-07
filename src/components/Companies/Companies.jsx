import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Building2, Sparkles, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Companies() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);

  const API_URL = "https://jpbcenterback-production.up.railway.app/api/companies";

  const loadCompanies = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCompanies(res.data.data);
      } else if (Array.isArray(res.data)) {
        setCompanies(res.data);
      }
    } catch (err) {
      console.error("Error loading companies:", err);
      setCompanies([]);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  return (
    <section id="companies" className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16 sm:py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Title Section */}
        <motion.p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#395886]">
          <Sparkles size={13} />
          {t("trustedCompanies", "Trusted Companies")}
        </motion.p>

        <motion.h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
          {t("topEmployers", "Top Employers")}{" "}
          <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
            {t("hiringNow", "Hiring Now")}
          </span>
        </motion.h2>

        {/* Companies Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {companies.length === 0 ? (
            <p className="col-span-full py-10 text-gray-500 italic">No companies available at the moment.</p>
          ) : (
            companies
              .filter((c) => c && (c.id || c._id))
              .map((c) => (
                <motion.div
                  key={c.id || c._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="group flex h-full w-full flex-col items-center justify-between rounded-[24px] border border-white/70 bg-white/55 p-4 shadow-[0_10px_25px_rgba(57,88,134,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_20px_40px_rgba(57,88,134,0.15)]"
                >
                  {/* Logo Container */}
                  <div className="mb-3 flex shrink-0 items-center justify-center">
                    {c.logo ? (
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border bg-white object-contain p-1"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=Logo"; }}
                      />
                    ) : (
                      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] to-[#638ECB] text-white">
                        <Building2 size={24} />
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  <p className="line-clamp-2 px-1 text-[11px] sm:text-[13px] font-black text-[#395886]">
                    {c.name || "Company"}
                  </p>

                  {/* Badge */}
                  <div className="mt-3 flex justify-center">
                    <BadgeCheck size={14} className="text-[#638ECB]" />
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </section>
  );
}