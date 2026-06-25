import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Building2, Sparkles, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function Companies() {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]); // ✅ must be array

  const API =
    "https://jpbcenterback-production.up.railway.app/api/companies";

  // =====================
  // LOAD COMPANIES (SAFE)
  // =====================
  const loadCompanies = async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();

      console.log("API Response:", result);

      const raw = result?.data ?? result ?? [];

      const safeData = Array.isArray(raw) ? raw : [];

      setCompanies(safeData);
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
        {/* HEADER */}
        <motion.p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886]">
          <Sparkles size={13} />
          {t("trustedCompanies", "Trusted Companies")}
        </motion.p>

        <motion.h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
          {t("topEmployers", "Top Employers")}{" "}
          <span className="text-[#638ECB]">
            {t("hiringNow", "Hiring Now")}
          </span>
        </motion.h2>

        {/* GRID */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {(companies || []).length === 0 ? (
            <p className="col-span-full text-gray-500">
              No companies yet
            </p>
          ) : (
            (companies || [])
              .filter((c) => c && c.id)
              .map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl bg-white/60 p-5 shadow backdrop-blur-xl"
                >
                  {/* LOGO */}
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name || "company"}
                      className="mx-auto mb-4 h-16 w-16 rounded-2xl border object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/80?text=Logo";
                      }}
                    />
                  ) : (
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white">
                      <Building2 size={24} />
                    </div>
                  )}

                  {/* NAME */}
                  <p className="text-sm font-black text-[#395886]">
                    {c.name || "Company"}
                  </p>

                  <div className="mt-3 flex justify-center">
                    <BadgeCheck size={15} className="text-[#638ECB]" />
                  </div>
                </motion.div>
              ))
          )}
        </div>
      </div>
    </section>
  );
}