import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Scale, ShieldAlert } from "lucide-react";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F0F3FA] text-[#395886] p-4 sm:p-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />
      
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          // இங்கே p-6 (மொபைலுக்கு) மற்றும் sm:p-10 (பெரிய திரைக்கு) என மாற்றியுள்ளேன்
          className="rounded-[30px] border border-white/70 bg-white/60 p-6 sm:p-10 shadow-xl backdrop-blur-xl"
        >
          <h1 className="text-2xl sm:text-4xl font-black mb-6 flex items-center gap-4">
            <Scale className="text-[#638ECB] shrink-0" size={32} />
            {t("terms.title", "Terms of Service")}
          </h1>
          
          <div className="space-y-6 text-[#395886]/80 leading-relaxed text-sm sm:text-base">
            <p>{t("terms.intro", "Welcome to JobCenter+. By using our services, you agree to these terms.")}</p>
            
            <h3 className="font-bold text-lg sm:text-xl text-[#395886]">1. Acceptance of Terms</h3>
            <p>By accessing this website, you agree to be bound by these Terms of Service and all applicable laws.</p>
            
            <h3 className="font-bold text-lg sm:text-xl text-[#395886]">2. User Accounts</h3>
            <p>You are responsible for maintaining the confidentiality of your account information.</p>
            
            <h3 className="font-bold text-lg sm:text-xl text-[#395886]">3. Prohibited Conduct</h3>
            <p>You agree not to use the site for any unlawful purpose or to interfere with the operation of the site.</p>
            
            <div className="mt-8 p-4 bg-[#F0F3FA] rounded-2xl border border-[#D5DEEF] flex items-center gap-3">
              <ShieldAlert className="text-[#638ECB] shrink-0" />
              <p className="text-xs sm:text-sm font-bold">Updated: July 2026</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}