import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ShieldCheck, Cookie, Globe, FileText, UserCheck, Mail } from "lucide-react";

export default function Privacy() {
  const { t } = useTranslation();

  const privacySections = [
    { icon: FileText, title: t("privacy.dataCollectionTitle", "1. Information We Collect"), desc: t("privacy.dataCollectionDesc", "We collect information to provide better services to our users. This includes basic details like log files, IP addresses, browser types, and timestamp data. This information is used for analyzing trends and administering the site.") },
    { icon: Cookie, title: t("privacy.cookiesTitle", "2. Cookies and Web Beacons"), desc: t("privacy.cookiesDesc", "Like any other website, JobCenter+ uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience.") },
    { icon: Globe, title: t("privacy.googleAdsenseTitle", "3. Google DoubleClick DART Cookie"), desc: t("privacy.googleAdsenseDesc", "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.") },
    { icon: ShieldCheck, title: t("privacy.thirdPartyTitle", "4. Third-Party Privacy Policies"), desc: t("privacy.thirdPartyDesc", "JobCenter+'s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.") },
    { icon: UserCheck, title: t("privacy.consentTitle", "5. User Consent & Rights"), desc: t("privacy.consentDesc", "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions. You have the right to request access to your personal data, request correction of any inaccurate data, and request the deletion of your personal data under certain conditions.") },
    { icon: Mail, title: t("privacy.contactTitle", "6. Contact Information"), desc: t("privacy.contactDesc", "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email or our contact page.") },
  ];

  return (
    <div className="relative min-h-screen bg-[#F0F3FA] text-[#395886] p-4 sm:p-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Background Blobs (Mobile-ல் சுருக்கப்பட்டுள்ளது) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#638ECB]/20 blur-[100px]" />
        <div className="absolute bottom-0 -right-20 h-72 w-72 rounded-full bg-[#395886]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl py-10 sm:py-20">
        
        {/* Header (Mobile-க்கு ஏற்ப மாற்றப்பட்டது) */}
        <motion.div 
          className="mb-8 flex flex-col gap-4 rounded-[24px] border border-white/70 bg-white/60 p-6 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#395886] tracking-tight">
              {t("privacy.title", "Privacy Policy")}
            </h1>
            <p className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#638ECB]">
              {t("privacy.lastUpdated", "Last Updated: July 2026")}
            </p>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col gap-4">
          {privacySections.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="flex flex-col sm:flex-row gap-4 rounded-[24px] border border-white/70 bg-white/60 p-6 shadow-md backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#395886] text-white">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#395886] mb-2">{item.title}</h3>
                  <p className="leading-relaxed text-[#395886]/80 text-[14px]">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Buttons */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto rounded-full bg-[#395886] px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            {t("privacy.backHome", "Return to Home")}
          </button>
        </div>
      </div>
    </div>
  );
}