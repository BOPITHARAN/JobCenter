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

  // ✅ popup handler
  const showPopup = (type, message) => {
    setPopup({ type, message });

    setTimeout(() => {
      setPopup(null);
    }, 3000);
  };

  // ✅ email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ subscribe function
  const subscribe = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    // validation
    if (!trimmedEmail) {
      showPopup("error", t("enterEmail", "Please enter your email"));
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      showPopup("error", t("invalidEmail", "Enter a valid email address"));
      return;
    }

    try {
      setLoading(true);

      // ✅ IMPORTANT: Corrected backend endpoint with proper headers
      await axios.post(
        "https://jpbcenterback-production.up.railway.app/subscribe", 
        { email: trimmedEmail },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      showPopup(
        "success",
        t("subscribedSuccess", "Subscribed successfully")
      );

      setEmail("");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err.message ||
        t("subscribeFailed", "Subscription failed");

      showPopup("error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed left-1/2 top-5 z-[9999] w-[90%] max-w-sm"
          >
            <div className="rounded-[22px] border border-[#B1C9EF] bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3">
                
                {/* ICON */}
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

                {/* MESSAGE */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-[#395886]">
                    {popup.message}
                  </h3>
                </div>

                {/* CLOSE */}
                <button onClick={() => setPopup(null)}>
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN SECTION */}
      <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16">

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[34px] border border-white/70 bg-white/60 p-6 backdrop-blur-xl md:p-8"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2">

              {/* LEFT SIDE */}
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
              </div>

              {/* FORM */}
              <form onSubmit={subscribe}>
                <div className="flex flex-col gap-3">

                  <div className="flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
                    <Mail size={18} />
                    <input
                      type="email" /* Added type="email" for proper browser parsing */
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailAddress", "Email address")}
                      className="w-full outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.trim()}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#395886] py-3 text-white disabled:opacity-60"
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