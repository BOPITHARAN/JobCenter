import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Mail,
  BellRing,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (type, message) => {
    setPopup({ type, message });

    setTimeout(() => {
      setPopup(null);
    }, 3000);
  };

  const subscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      showPopup("error", t("enterEmail", "Please enter your email address"));
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/newsletter/subscribe", {
        email,
      });

      showPopup("success", t("subscribedSuccess", "Subscribed successfully"));
      setEmail("");
    } catch (err) {
      showPopup(
        "error",
        err?.response?.data?.message ||
          t("subscribeFailed", "Subscription failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed left-1/2 top-5 z-[9999] w-[90%] max-w-sm"
          >
            <div className="rounded-[22px] border border-[#B1C9EF] bg-white p-4 shadow-[0_15px_40px_rgba(57,88,134,0.18)]">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    popup.type === "success"
                      ? "bg-green-100 text-green-600"
                      : popup.type === "info"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {popup.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : popup.type === "info" ? (
                    <Info size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-black text-[#395886]">
                    {popup.message}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setPopup(null)}
                  className="text-[#395886]"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

        <div className="absolute -left-28 top-0 h-[300px] w-[300px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#395886]/25 blur-[120px]" />

        <motion.div
          animate={{ x: [0, 35, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute left-1/3 top-8 h-[180px] w-[180px] rounded-full bg-[#8AAEE0]/25 blur-[90px]"
        />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white/55 p-6 shadow-[0_25px_70px_rgba(57,88,134,0.20)] backdrop-blur-2xl md:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-[#638ECB]/20" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#638ECB]/25 blur-[80px]" />

            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_28px_rgba(99,142,203,0.55)]">
                  <BellRing size={24} />
                </div>

                <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-4xl">
                  {t("getPremium", "Get Premium")}

                  <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
                    {" "}
                    {t("jobAlerts", "Job Alerts")}
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#395886]/75">
                  {t(
                    "newsletterDescription",
                    "Subscribe to receive the latest job updates, career news and new vacancies directly to your email."
                  )}
                </p>
              </div>

              <div>
                <form
                  onSubmit={subscribe}
                  className="rounded-[26px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_45px_rgba(57,88,134,0.14)] backdrop-blur-xl"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-[#B1C9EF] bg-[#F0F3FA] px-4 py-3 shadow-inner">
                      <Mail size={18} className="text-[#395886]" />

                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("emailAddress", "Email address")}
                        className="w-full bg-transparent text-sm font-medium text-[#395886] placeholder:text-[#395886]/40 outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] py-3 text-sm font-black text-white shadow-[0_0_28px_rgba(99,142,203,0.50)] transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading
                        ? t("loading", "Loading...")
                        : t("subscribe", "Subscribe")}

                      <ArrowRight size={15} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}