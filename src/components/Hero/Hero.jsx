import {
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
  Building2,
  Users,
  Globe2,
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
    <section className="relative min-h-screen flex items-center">

      {/* 📱 MOBILE BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-no-repeat bg-cover bg-center
          md:hidden
        "
        style={{ backgroundImage: `url(${heroMobile})` }}
      />

      {/* 💻 DESKTOP BACKGROUND */}
      <div
        className="
          absolute inset-0
          bg-no-repeat bg-cover bg-[center_right]
          hidden md:block
        "
        style={{ backgroundImage: `url(${heroDesktop})` }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-bold rounded-full bg-white/80 shadow"
        >
          <Sparkles size={14} className="text-blue-500" />
          AI Powered Job Platform
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-6xl font-black text-[#1E3A5F] leading-tight max-w-3xl"
        >
          Find Your Next <br />
          <span className="text-blue-500">Dream Job</span>
        </motion.h1>

        {/* SUBTITLE */}
        <p className="mt-4 sm:mt-5 text-[#1E3A5F]/70 max-w-xl font-semibold text-sm sm:text-base">
          Discover premium local and global jobs with one powerful career platform.
        </p>

        {/* SEARCH BOX */}
        <div className="mt-8 sm:mt-10 bg-white/80 backdrop-blur-xl p-3 rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_160px] gap-2">

            <SearchInput
              icon={<Search size={18} />}
              label="What"
              value={keyword}
              setValue={setKeyword}
              placeholder="Job title, keywords or company"
            />

            <SearchInput
              icon={<MapPin size={18} />}
              label="Where"
              value={location}
              setValue={setLocation}
              placeholder="Sri Lanka"
            />

            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold py-3"
            >
              Search Jobs
              <ArrowRight size={16} />
            </button>

          </div>
        </div>

        {/* STATS */}
        <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#1E3A5F]/80">
          <InfoItem
            icon={<Building2 size={16} />}
            text={`${jobs?.length || 3}+ Open Vacancies`}
          />
          <InfoItem icon={<Users size={16} />} text="45+ Top Companies" />
          <InfoItem icon={<Globe2 size={16} />} text="Remote & Onsite Available" />
        </div>

      </div>
    </section>
  );
}

/* INPUT */
function SearchInput({ icon, label, value, setValue, placeholder }) {
  return (
    <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl">
      <div className="bg-white p-2 rounded-lg shadow">{icon}</div>

      <div className="flex flex-col w-full">
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {label}
        </span>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="bg-transparent outline-none text-sm font-bold"
        />
      </div>
    </div>
  );
}

/* INFO */
function InfoItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full shadow">
      <span className="text-blue-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}