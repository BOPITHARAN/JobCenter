import { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Mail,
  BellRing,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://jpbcenterback-production-1b03.up.railway.app";

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

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const subscribe = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      showPopup(
        "error",
        t("invalidEmail", "Enter a valid email address")
      );
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_BASE_URL}/api/newsletter/subscribe`,
        {
          email: trimmedEmail,
        }
      );

      showPopup(
        "success",
        data.message ||
          t("subscribedSuccess", "Subscribed successfully")
      );

      setEmail("");
    } catch (err) {
      console.error("Newsletter Error:", err);

      showPopup(
        "error",
        err.response?.data?.message ||
          err.message ||
          t("subscriptionFailed", "Subscription failed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed left-1/2 top-5 z-[9999] w-[90%] max-w-sm"
          >
            <div className="rounded-[22px] border border-[#B1C9EF] bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    popup.type === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {popup.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                </div>

                <h3 className="flex-1 text-sm font-bold text-[#395886]">
                  {popup.message}
                </h3>

                <button onClick={() => setPopup(null)}>
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16">
        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[34px] border border-white/70 bg-white/60 p-6 backdrop-blur-xl md:p-8"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] to-[#8AAEE0] text-white">
                  <BellRing size={24} />
                </div>

                <h2 className="mt-5 text-3xl font-black text-[#395886]">
                  {t("getPremium", "Get Premium")}{" "}
                  <span className="text-[#638ECB]">
                    {t("jobAlerts", "Job Alerts")}
                  </span>
                </h2>

                <p className="mt-3 text-sm text-[#395886]/70">
                  {t(
                    "newsletterDescription",
                    "Get latest job updates directly to your email."
                  )}
                </p>
              </div>              <form onSubmit={subscribe}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition-all focus-within:border-[#638ECB]">
                    <Mail size={18} className="text-[#638ECB]" />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailAddress", "Email address")}
                      className="w-full bg-transparent font-medium text-[#395886] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#395886] to-[#638ECB] py-3.5 font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? t("loading", "Loading...")
                      : t("subscribe", "Subscribe")}

                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}