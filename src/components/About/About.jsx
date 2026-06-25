import {
  Sparkles,
  BriefcaseBusiness,
  Users,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886]">
            <Sparkles size={13} />
            {t("aboutUs", "About Us")}
          </p>

          <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
            {t("about", "About")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              JobCenter+
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#395886]/70">
            {t(
              "aboutDescription",
              "JobCenter+ is a modern job platform designed to connect job seekers with trusted employers across Sri Lanka."
            )}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <AboutCard
            icon={BriefcaseBusiness}
            title={t("jobOpportunities", "Job Opportunities")}
            text={t(
              "jobOpportunitiesDesc",
              "Find active jobs from different industries and locations."
            )}
          />

          <AboutCard
            icon={Users}
            title={t("forJobSeekers", "For Job Seekers")}
            text={t(
              "forJobSeekersDesc",
              "Apply for jobs quickly and build your career path."
            )}
          />

          <AboutCard
            icon={ShieldCheck}
            title={t("trustedPlatform", "Trusted Platform")}
            text={t(
              "trustedPlatformDesc",
              "Simple, safe and reliable job application experience."
            )}
          />
        </div>
      </div>
    </section>
  );
}

function AboutCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-[26px] border border-white/70 bg-white/55 p-6 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/75">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
        <Icon size={22} />
      </div>

      <h3 className="text-lg font-black text-[#395886]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-[#395886]/70">
        {text}
      </p>
    </div>
  );
}