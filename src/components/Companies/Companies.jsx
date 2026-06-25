import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Building2, Sparkles, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Companies() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState([]);

  // ✅ Updated to include the full API endpoint
  const API_URL = "https://jpbcenterback-production.up.railway.app/api/companies";

  const loadCompanies = async () => {
    try {
      const res = await axios.get(API_URL);
      
      console.log("API Response:", res.data);

      // ✅ Safe parsing check: { success: true, data: [...] }
      if (res.data && res.data.success && Array.isArray(res.data.data)) {
        setCompanies(res.data.data);
      } else if (Array.isArray(res.data)) {
        setCompanies(res.data);
      } else {
        setCompanies([]);
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
    <section
      id="companies"
      className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886]">
          <Sparkles size={13} />
          {t("trustedCompanies", "Trusted Companies")}
        </motion.p>

        <motion.h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
          {t("topEmployers", "Top Employers")}{" "}
          <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
            {t("hiringNow", "Hiring Now")}
          </span>
        </motion.h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {companies.length === 0 ? (
            <p className="col-span-full text-gray-500">
              No companies yet
            </p>
          ) : (
            companies
              .filter((c) => c && (c.id || c._id)) // ID checking
              .map((c) => (
                <motion.div
                  key={c.id || c._id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-[24px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl"
                >
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="mx-auto mb-4 h-16 w-16 rounded-2xl object-cover border"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80?text=Logo";
                      }}
                    />
                  ) : (
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white">
                      <Building2 size={24} />
                    </div>
                  )}

                  <p className="text-sm font-black text-[#395886]">
                    {c.name || "Company"}
                  </p>

                  <div className="mt-3 flex justify-center">
                    <BadgeCheck
                      size={15}
                      className="text-[#638ECB]"
                    />
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </section>
  );
}