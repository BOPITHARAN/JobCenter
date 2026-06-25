import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: t("faq.q1", "How can I apply for jobs?"),
      a: t(
        "faq.a1",
        "Create an account, choose a job, upload your CV and submit your application instantly."
      ),
    },
    {
      q: t("faq.q2", "Is registration free?"),
      a: t(
        "faq.a2",
        "Yes, registration is completely free for job seekers."
      ),
    },
    {
      q: t("faq.q3", "Can I upload my CV?"),
      a: t(
        "faq.a3",
        "Yes, you can upload your CV while applying for a job."
      ),
    },
    {
      q: t("faq.q4", "How do I get job alerts?"),
      a: t(
        "faq.a4",
        "Subscribe to our newsletter and receive latest job updates by email."
      ),
    },
  ];

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#F0F3FA] px-4 py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute -left-24 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#395886] shadow-lg backdrop-blur-md"
          >
            <Sparkles size={14} />
            {t("faq.badge", "FAQ")}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 text-3xl font-black text-[#395886] md:text-5xl"
          >
            {t("faq.title1", "Frequently Asked")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {t("faq.title2", "Questions")}
            </span>
          </motion.h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#395886]/80 md:text-base">
            {t(
              "faq.description",
              "Find clear answers about applying, CV uploads, registration and job alerts."
            )}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="mt-12 space-y-5">
          {faqs.map((item, index) => {
            const active = open === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
                  active
                    ? "border-[#638ECB]/50 bg-white/90 shadow-[0_20px_50px_rgba(57,88,134,0.20)]"
                    : "border-white/70 bg-white/50 hover:bg-white/70 shadow-[0_10px_30px_rgba(57,88,134,0.10)]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 ${
                        active
                          ? "bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-lg"
                          : "bg-[#F0F3FA] text-[#395886]"
                      }`}
                    >
                      <HelpCircle size={18} />
                    </div>

                    <h3 className="text-sm font-bold text-[#395886] md:text-base">
                      {item.q}
                    </h3>
                  </div>

                  <ChevronDown
                    size={20}
                    className={`text-[#395886] transition-transform duration-300 ${
                      active ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-[72px] text-sm leading-7 text-[#395886]/75">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}