import {
  MapPin,
  Search,
  Sparkles,
  BriefcaseBusiness,
  ArrowRight,
  ChevronDown,
  Building2,
  Users,
  Globe2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function Hero({ onSearch = () => {}, jobs = [] }) {
  const { t } = useTranslation();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Sri Lanka");
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const categories = useMemo(() => {
    const uniqueCategories = jobs
      .map((job) => job.category)
      .filter((cat) => cat && cat.trim() !== "");

    return ["All Categories", ...new Set(uniqueCategories)];
  }, [jobs]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    onSearch({
      keyword: keyword.trim(),
      location: location.trim(),
      category,
    });

    document.getElementById("jobs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F0F3FA]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute inset-0 opacity-[0.25] bg-[linear-gradient(to_right,#FFFFFF_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="absolute -left-28 top-20 h-[440px] w-[440px] rounded-full bg-[#8AAEE0]/35 blur-[140px]" />
      <div className="absolute right-0 top-10 h-[380px] w-[380px] rounded-full bg-[#628ECB]/25 blur-[140px]" />
      <div className="absolute -bottom-20 -right-24 h-[460px] w-[460px] rounded-full bg-[#395886]/20 blur-[150px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#B1C9EF] bg-white/70 px-5 py-2 text-xs font-black tracking-wider text-[#395886] shadow-[0_10px_30px_rgba(57,88,134,0.10)] backdrop-blur-xl"
        >
          <Sparkles size={14} className="text-[#628ECB]" />
          {t("heroBadge", "AI Powered Job Platform")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tight text-[#395886] sm:text-6xl md:text-7xl"
        >
          {t("heroTitle1", "Find Your Dream Job")}
          <br />
          <span className="bg-gradient-to-r from-[#395886] via-[#628ECB] to-[#8AAEE0] bg-clip-text text-transparent">
            {t("heroTitle2", "Faster Than Ever")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-sm font-semibold leading-7 text-[#395886]/75 sm:text-base"
        >
          {t(
            "heroSub",
            "Search verified jobs, connect with top companies, and start your career journey with JobCenter+."
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 w-full rounded-[34px] border border-white/80 bg-white/70 p-2.5 shadow-[0_30px_80px_rgba(57,88,134,0.18)] backdrop-blur-2xl"
        >
          <div className="grid gap-2 rounded-[26px] border border-[#D5DEEF] bg-gradient-to-r from-white via-[#F0F3FA] to-white p-2 md:grid-cols-[1.3fr_1fr_1fr_160px]">
            <SearchInput
              icon={<Search size={18} />}
              label="What"
              value={keyword}
              setValue={setKeyword}
              placeholder={t("heroInput", "Job title or company")}
            />

            <SearchInput
              icon={<MapPin size={18} />}
              label="Where"
              value={location}
              setValue={setLocation}
              placeholder={t("heroLocation", "Location")}
            />

            <div
              ref={dropdownRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="relative flex cursor-pointer select-none items-center gap-3 rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] px-4 py-3.5 transition hover:bg-[#D5DEEF]/60"
            >
              <IconBox>
                <BriefcaseBusiness size={18} />
              </IconBox>

              <div className="flex flex-1 flex-col items-start overflow-hidden text-left">
                <span className="mb-0.5 text-[10px] font-black uppercase tracking-wider text-[#628ECB]">
                  Category
                </span>

                <span className="w-full truncate text-sm font-black text-[#395886]">
                  {category || "All Categories"}
                </span>
              </div>

              <ChevronDown
                size={16}
                className={`text-[#395886] transition ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    className="absolute left-0 right-0 top-[108%] z-50 max-h-60 overflow-y-auto rounded-xl border border-[#D5DEEF] bg-white p-1.5 shadow-[0_20px_60px_rgba(57,88,134,0.20)] backdrop-blur-xl"
                  >
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategory(item === "All Categories" ? "" : item);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full rounded-lg px-3 py-2 text-left text-xs font-black transition ${
                          category === item ||
                          (item === "All Categories" && !category)
                            ? "bg-gradient-to-r from-[#628ECB] to-[#395886] text-white"
                            : "text-[#395886] hover:bg-[#F0F3FA]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              type="button"
              onClick={handleSearch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#628ECB] to-[#395886] px-5 py-3.5 text-sm font-black text-white shadow-[0_14px_35px_rgba(57,88,134,.30)] transition"
            >
              {t("heroBtn", "Search")}
              <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[#395886]/75">
          <InfoItem
            icon={<Building2 size={16} />}
            text={`${jobs.length}+ Open Vacancies`}
          />
          <InfoItem icon={<Users size={16} />} text="45+ Top Companies" />
          <InfoItem
            icon={<Globe2 size={16} />}
            text="Remote & Onsite Available"
          />
        </div>
      </div>
    </section>
  );
}

function SearchInput({ icon, label, value, setValue, placeholder }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] px-4 py-3.5 transition focus-within:border-[#628ECB] focus-within:bg-white hover:bg-[#D5DEEF]/60">
      <IconBox>{icon}</IconBox>

      <div className="flex flex-1 flex-col items-start overflow-hidden text-left">
        <span className="mb-0.5 text-[10px] font-black uppercase tracking-wider text-[#628ECB]">
          {label}
        </span>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-black text-[#395886] outline-none placeholder:text-[#8AAEE0]"
        />
      </div>
    </div>
  );
}

function IconBox({ children }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D5DEEF] text-[#395886] shadow-[0_8px_18px_rgba(57,88,134,0.10)]">
      {children}
    </div>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2.5 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-xs font-bold shadow-[0_10px_25px_rgba(57,88,134,0.08)] backdrop-blur-xl">
      <span className="text-[#628ECB]">{icon}</span>
      <span className="font-black text-[#395886]">{text}</span>
    </div>
  );
}