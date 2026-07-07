import {
  Sparkles,
  BriefcaseBusiness,
  Users,
  ShieldCheck,
  Target,
  Eye,
  CheckCircle2
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
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
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
            {t("aboutUs", "About JobCenter+")}
          </motion.p>

          <motion.h2 
            variants={itemVariants}
            className="mt-6 text-4xl font-black tracking-tight text-[#395886] sm:text-5xl lg:text-6xl"
          >
            {t("empoweringCareers", "Empowering Your")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent drop-shadow-sm">
              {t("careerJourney", "Career Journey")}
            </span>
          </motion.h2>

          {/* AdSense requires good descriptive text. Expanded description here. */}
          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-6 max-w-3xl text-[15px] sm:text-base leading-relaxed text-[#395886]/80 text-justify sm:text-center"
          >
            {t(
              "aboutDetailedDescription",
              "JobCenter+ is Sri Lanka's premier digital employment platform, dedicated to bridging the gap between exceptional talent and industry-leading enterprises. We believe that finding the right job or the perfect candidate should be a seamless, transparent, and empowering experience. Our platform leverages modern technology to provide a trusted ecosystem for career growth and organizational success."
            )}
          </motion.p>
        </motion.div>

        {/* Mission & Vision Section (Crucial for AdSense Trust) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          <div className="rounded-[28px] border border-white/60 bg-white/60 p-8 shadow-[0_8px_30px_rgba(57,88,134,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F3FA] text-[#395886]">
              <Target size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold text-[#395886] mb-3">{t("ourMission", "Our Mission")}</h3>
            <p className="text-[15px] leading-relaxed text-[#395886]/80">
              {t("missionText", "To democratize the job search process by providing a reliable, user-friendly platform where professionals can discover meaningful opportunities and companies can easily connect with the talent they need to thrive.")}
            </p>
          </div>

          <div className="rounded-[28px] border border-white/60 bg-white/60 p-8 shadow-[0_8px_30px_rgba(57,88,134,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F3FA] text-[#395886]">
              <Eye size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold text-[#395886] mb-3">{t("ourVision", "Our Vision")}</h3>
            <p className="text-[15px] leading-relaxed text-[#395886]/80">
              {t("visionText", "To become the most trusted and efficient career ecosystem in the region, empowering every individual to achieve their highest professional potential and supporting the growth of local industries.")}
            </p>
          </div>
        </motion.div>

        {/* Why Choose Us / Core Values Grid Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-[#395886] mb-10">{t("whyChooseUs", "Why Choose JobCenter+?")}</h3>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
        >
          <AboutCard
            variants={itemVariants}
            icon={BriefcaseBusiness}
            title={t("diverseOpportunities", "Diverse Opportunities")}
            text={t("diverseOpportunitiesDesc", "Access thousands of verified job listings across various industries, from entry-level positions to executive roles, updated daily to keep you ahead.")}
          />

          <AboutCard
            variants={itemVariants}
            icon={Users}
            title={t("communityFirst", "Community-Centric")}
            text={t("communityFirstDesc", "We are built for the job seekers. Enjoy intuitive tools, easy application processes, and resources designed to build your career path effectively.")}
          />

          <AboutCard
            variants={itemVariants}
            icon={ShieldCheck}
            title={t("trustedPlatform", "Safe & Transparent")}
            text={t("trustedPlatformDesc", "Your privacy and security are our top priority. We ensure strict verification of employers to provide a reliable and scam-free job hunting experience.")}
            className="sm:col-span-2 md:col-span-1"
          />
        </motion.div>

        {/* AdSense Trust Signal: Commitment Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-16 text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-sm font-semibold text-[#395886]/70">
            <CheckCircle2 size={16} className="text-[#638ECB]" />
            {t("commitmentText", "Committed to Excellence & Data Privacy")}
          </motion.div>
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

      <p className="mt-3 text-[14.5px] leading-relaxed text-[#395886]/75">
        {text}
      </p>
      
      {/* Subtle Hover Gradient Effect inside card */}
      <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br from-[#638ECB]/0 to-[#8AAEE0]/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
});