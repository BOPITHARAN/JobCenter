import React from "react";
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const { t } = useTranslation();

  const cards = [
    {
      title: t("privacy.card1Title"),
      desc: t("privacy.card1Desc"),
    },
    {
      title: t("privacy.card2Title"),
      desc: t("privacy.card2Desc"),
    },
    {
      title: t("privacy.card3Title"),
      desc: t("privacy.card3Desc"),
    },
    {
      title: t("privacy.card4Title"),
      desc: t("privacy.card4Desc"),
    },
    {
      title: t("privacy.card5Title"),
      desc: t("privacy.card5Desc"),
    },
    {
      title: t("privacy.card6Title"),
      desc: t("privacy.card6Desc"),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F0F3FA] text-[#395886]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-[#638ECB]/25 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#395886]/20 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AAEE0]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <div className="mb-14 flex flex-col gap-6 rounded-[30px] border border-white/70 bg-white/60 p-6 shadow-[0_20px_60px_rgba(57,88,134,0.15)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#395886] md:text-4xl">
              {t("privacy.title")}
            </h1>

            <p className="mt-2 text-xs font-black uppercase tracking-[0.25em] text-[#638ECB]">
              {t("privacy.policy")}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-full border border-[#638ECB]/20 bg-[#F0F3FA] px-5 py-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]" />

            <span className="text-xs font-black tracking-wider text-[#395886]">
              {t("privacy.secure")}
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((item, i) => (
            <div
              key={i}
              className="group rounded-[30px] border border-white/70 bg-white/55 p-8 shadow-[0_15px_40px_rgba(57,88,134,0.12)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/75 hover:shadow-[0_25px_60px_rgba(57,88,134,0.2)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#638ECB] shadow-[0_0_15px_rgba(99,142,203,0.8)]" />

                <h3 className="text-lg font-black text-[#395886]">
                  {item.title}
                </h3>
              </div>

              <p className="leading-7 text-[#395886]/75">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[30px] border border-white/70 bg-white/60 p-8 shadow-[0_20px_60px_rgba(57,88,134,0.12)] backdrop-blur-xl">
          <h2 className="mb-4 text-2xl font-black text-[#395886]">
            {t("privacy.agreement")}
          </h2>

          <p className="leading-8 text-[#395886]/75">
            {t("privacy.agreementText")}
          </p>
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] px-10 py-4 font-black text-white shadow-[0_0_35px_rgba(99,142,203,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(99,142,203,0.7)]"
          >
            {t("privacy.backHome")}

            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}