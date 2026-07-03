import {
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

import heroDesktop from "../../assets/hero.png";
import heroMobile from "../../assets/hero-mobile.png";

export default function Hero({ onSearch = () => {}, jobs = [] }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Sri Lanka");

  const handleSearch = () => {
    onSearch({
      keyword: keyword.trim(),
      location: location.trim(),
    });

    document.getElementById("jobs")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex items-center pt-28 pb-10 sm:min-h-[85vh] sm:py-0">
      {/* 📱 MOBILE BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${heroMobile})` }}
      />

      {/* 💻 DESKTOP BACKGROUND */}
      <div
        className="absolute inset-0 hidden bg-cover bg-[center_right] bg-no-repeat md:block"
        style={{ backgroundImage: `url(${heroDesktop})` }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/60 md:bg-gradient-to-r md:from-white/95 md:via-white/70 md:to-transparent/20"></div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B1C9EF] bg-white/80 px-4 py-2 text-xs font-black tracking-wider text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.10)] backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#638ECB]" />
            KILI PEOPLE KILINOCHCHI
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-4xl font-black leading-tight text-[#395886] sm:text-5xl md:text-[64px]"
          >
            Find Your Next <br />
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent drop-shadow-sm">
              Dream Job
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <p className="mt-5 max-w-xl text-sm font-semibold leading-relaxed text-[#395886]/80 sm:text-lg">
            Discover premium local and global jobs with one powerful career platform.
          </p>

          {/* SEARCH BOX */}
          <div className="mt-8 max-w-3xl rounded-[28px] border border-[#D5DEEF] bg-white/70 p-3 shadow-[0_20px_50px_rgba(57,88,134,0.15)] backdrop-blur-2xl sm:rounded-[32px] sm:p-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_160px] sm:gap-3">
              <SearchInput
                icon={<Search size={18} className="text-[#638ECB]" />}
                label="What"
                value={keyword}
                setValue={setKeyword}
                placeholder="Job title, keywords..."
              />

              <SearchInput
                icon={<MapPin size={18} className="text-[#638ECB]" />}
                label="Where"
                value={location}
                setValue={setLocation}
                placeholder="Sri Lanka"
              />

              <button
                onClick={handleSearch}
                className="flex h-full min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] px-4 font-black text-white shadow-[0_10px_25px_rgba(57,88,134,0.25)] transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Search Jobs</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* INPUT */
function SearchInput({ icon, label, value, setValue, placeholder }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA]/50 px-4 py-3 transition-colors focus-within:border-[#638ECB] focus-within:bg-white hover:border-[#B1C9EF]">
      <div className="rounded-xl bg-white p-2.5 shadow-sm">{icon}</div>

      <div className="flex w-full flex-col">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#395886]/60">
          {label}
        </span>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-bold text-[#395886] outline-none placeholder:text-[#395886]/40"
        />
      </div>
    </div>
  );
}