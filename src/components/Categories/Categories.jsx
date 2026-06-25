import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Stethoscope,
  GraduationCap,
  Building2,
  Headphones,
  Truck,
  Banknote,
  Paintbrush,
} from "lucide-react";

const categories = [
  { icon: Code2, key: "itSoftware" },
  { icon: Stethoscope, key: "healthcare" },
  { icon: GraduationCap, key: "education" },
  { icon: Building2, key: "officeAdmin" },
  { icon: Headphones, key: "customerSupport" },
  { icon: Truck, key: "logistics" },
  { icon: Banknote, key: "accounting" },
  { icon: Paintbrush, key: "design" },
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
    <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16 text-[#395886]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="pointer-events-none absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AAEE0]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886] shadow-sm backdrop-blur-md"
          >
            <Sparkles size={13} />
            {t("categories.badge", "Categories")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight text-[#395886] md:text-5xl"
          >
            {t("categories.title1", "Explore Job")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {t("categories.title2", "Categories")}
            </span>
          </motion.h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#395886]/70">
            {t(
              "categories.description",
              "Browse jobs by category and find the best opportunities that match your skills."
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition duration-500 hover:bg-white/75"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-700 group-hover:opacity-35" />

                <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
                  <Icon size={22} />
                </div>

                <h3 className="relative text-lg font-black text-[#395886]">
                  {t(`categories.items.${item.key}`)}
                </h3>

                <p className="relative mt-2 text-sm font-bold text-[#395886]/65">
                  {t("categories.pending", "Pending")}
                </p>

                <button
                  type="button"
                  onClick={goToJobs}
                  className="relative mt-5 flex items-center gap-2 text-xs font-black text-[#638ECB] transition group-hover:text-[#395886]"
                >
                  {t("categories.viewJobs", "View Jobs")}
                  <ArrowRight
                    size={14}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <div className="relative mt-4 h-[3px] w-0 rounded-full bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] transition-all duration-700 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}