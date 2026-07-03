import {
  Sparkles,
  BriefcaseBusiness,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useTranslation();

  // Animation Variants for staggering effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } // Premium smooth easing
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F0F3FA] px-4 py-20 sm:py-28"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Outfit Font Import */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&display=swap');`}
      </style>

      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      {/* Animated Background Blobs */}
      <motion.div 
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" 
      />
      <motion.div 
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/20 blur-[120px]" 
      />

      <div className="relative mx-auto max-w-6xl">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center"
        >
          <motion.p 
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/70 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#395886] shadow-sm backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#638ECB]" />
            {t("aboutUs", "About Us")}
          </motion.p>

          <motion.h2 
            variants={itemVariants}
            className="mt-6 text-4xl font-black tracking-tight text-[#395886] sm:text-5xl lg:text-6xl"
          >
            {t("about", "About")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent drop-shadow-sm">
              JobCenter+
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#395886]/80"
          >
            {t(
              "aboutDescription",
              "JobCenter+ is a modern job platform designed to connect job seekers with trusted employers across Sri Lanka."
            )}
          </motion.p>
        </motion.div>

        {/* Cards Grid Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          <AboutCard
            variants={itemVariants}
            icon={BriefcaseBusiness}
            title={t("jobOpportunities", "Job Opportunities")}
            text={t("jobOpportunitiesDesc", "Find active jobs from different industries and locations.")}
          />

          <AboutCard
            variants={itemVariants}
            icon={Users}
            title={t("forJobSeekers", "For Job Seekers")}
            text={t("forJobSeekersDesc", "Apply for jobs quickly and build your career path.")}
          />

          <AboutCard
            variants={itemVariants}
            icon={ShieldCheck}
            title={t("trustedPlatform", "Trusted Platform")}
            text={t("trustedPlatformDesc", "Simple, safe and reliable job application experience.")}
            className="sm:col-span-2 md:col-span-1" // Centering the 3rd card on tablets
          />
        </motion.div>
      </div>
    </section>
  );
}

// Animated Card Component
const AboutCard = motion.create(function AboutCard({ icon: Icon, title, text, className = "" }) {
  return (
    <div className={`group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/50 p-8 shadow-[0_8px_30px_rgba(57,88,134,0.08)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/80 hover:shadow-[0_20px_40px_rgba(57,88,134,0.12)] ${className}`}>
      
      {/* Icon Container */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_8px_20px_rgba(99,142,203,0.3)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={24} strokeWidth={2.5} />
      </div>

      <h3 className="text-xl font-bold tracking-wide text-[#395886]">
        {title}
      </h3>

      <p className="mt-3 text-[14px] leading-relaxed text-[#395886]/70">
        {text}
      </p>
      
      {/* Subtle Hover Gradient Effect inside card */}
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br from-[#638ECB]/0 to-[#8AAEE0]/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
});