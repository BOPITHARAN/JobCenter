import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  Landmark,
  Building2,
} from "lucide-react";

const categories = [
  { icon: Landmark, key: "government" },
  { icon: Building2, key: "private" },
];

export default function Categories() {
  const { t } = useTranslation();

  const goToJobs = () => {
    document.getElementById("jobs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="bg-[#F0F3FA] px-4 py-16 text-[#395886]">
      
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles size={13} />
            {t("categories.badge", "Categories")}
          </p>

          <h2 className="mt-5 text-3xl md:text-4xl font-black">
            {t("categories.title1", "Browse")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {t("categories.title2", "Jobs")}
            </span>
          </h2>

          <p className="mt-3 text-sm text-[#395886]/70">
            {t(
              "categories.description",
              "Choose your preferred job type and explore opportunities."
            )}
          </p>
        </div>

        {/* 2 CARDS */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="group rounded-2xl border border-white/70 bg-white/80 p-6 shadow-lg backdrop-blur-lg transition hover:shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#395886] to-[#638ECB] text-white">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-bold capitalize">
                  {item.key === "government"
                    ? "Government Jobs"
                    : "Private Jobs"}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {item.key === "government"
                    ? "Explore public sector job opportunities"
                    : "Discover jobs in private companies"}
                </p>

                <button
                  onClick={goToJobs}
                  className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#638ECB] hover:text-[#395886]"
                >
                  View Jobs
                  <ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}