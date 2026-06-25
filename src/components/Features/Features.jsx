import {
  ShieldCheck,
  BriefcaseBusiness,
  TrendingUp,
  Users,
  Clock3,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: BriefcaseBusiness,
      title: t("featureJobOpportunities", "Thousands of Job Opportunities"),
      description: t(
        "featureJobOpportunitiesDesc",
        "Explore a wide range of vacancies from trusted employers across Sri Lanka."
      ),
    },
    {
      icon: Users,
      title: t("featureTrustedEmployers", "Trusted Employers"),
      description: t(
        "featureTrustedEmployersDesc",
        "Connect directly with verified companies and recruitment agencies."
      ),
    },
    {
      icon: TrendingUp,
      title: t("featureCareerGrowth", "Career Growth"),
      description: t(
        "featureCareerGrowthDesc",
        "Find jobs that help you build experience and grow your career path."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("featureSecureApplications", "Safe & Secure Applications"),
      description: t(
        "featureSecureApplicationsDesc",
        "Apply for jobs confidently through a secure and reliable platform."
      ),
    },
    {
      icon: Clock3,
      title: t("featureQuickApplications", "Quick Job Applications"),
      description: t(
        "featureQuickApplicationsDesc",
        "Apply to jobs in minutes using a simple and user-friendly process."
      ),
    },
    {
      icon: Sparkles,
      title: t("featureDailyVacancies", "Daily New Vacancies"),
      description: t(
        "featureDailyVacanciesDesc",
        "Stay updated with the latest job openings added every day."
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute -left-28 top-0 h-[300px] w-[300px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#395886]/25 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/50 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886] shadow-sm backdrop-blur-md">
            <Sparkles size={13} />
            {t("features", "FEATURES")}
          </div>

          <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
            {t("featuresTitle1", "Find Your Next")}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {" "}
              {t("featuresTitle2", "Dream Job")}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#395886]/75">
            {t(
              "featuresMainDesc",
              "Discover trusted employers, apply quickly, and grow your career with Sri Lanka's modern job platform."
            )}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-[26px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_45px_rgba(57,88,134,0.18)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#638ECB]/60 hover:bg-white/75"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
                  <Icon size={22} />
                </div>

                <h3 className="mb-3 text-lg font-black text-[#395886]">
                  {item.title}
                </h3>

                <p className="text-xs leading-6 text-[#395886]/70">
                  {item.description}
                </p>

                <div className="mt-4 h-[3px] w-0 rounded-full bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}