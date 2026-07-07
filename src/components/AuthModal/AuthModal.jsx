import { useState } from "react";
import api from "../../api/api";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { 
  X, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ onClose = () => {}, setUser = () => {} }) {
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  // 🔔 POPUP MESSAGE FUNCTION
  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 2600);
  };

  // 💾 SAVE LOGIN TO LOCALSTORAGE
  const saveLogin = (data) => {
    if (!data?.token || !data?.user) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  // 🔁 REDIRECT BY ROLE
  const redirectByRole = (user) => {
    if (user?.role === "admin") {
      window.location.href = "/admin-dashboard";
    } else {
      window.location.href = "/";
    }
  };

  // 📱 PHONE LOGIN HANDLER
  const handlePhoneLogin = async () => {
    const cleanPhone = phone.trim();

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      showPopup("error", t("auth.phoneError"));
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/phone", {
        phone: cleanPhone,
      });

      saveLogin(res.data);
      showPopup("success", t("auth.loginSuccess"));

      setTimeout(() => {
        onClose();
        redirectByRole(res.data.user);
      }, 700);
    } catch (err) {
      showPopup(
        "error",
        err.response?.data?.message || t("auth.phoneFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  // 🌐 GOOGLE LOGIN HANDLER
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        showPopup("error", t("auth.missingCredential"));
        return;
      }

      setLoading(true);
      const res = await api.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      saveLogin(res.data);
      showPopup("success", t("auth.googleSuccess"));

      setTimeout(() => {
        onClose();
        redirectByRole(res.data.user);
      }, 700);
    } catch (err) {
      showPopup(
        "error",
        err.response?.data?.message || t("auth.googleFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#395886]/50 p-4 backdrop-blur-xl">
      {/* POPUP NOTIFICATION */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            className="fixed top-5 z-[10000] w-[92%] max-w-sm"
          >
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
              {popup.type === "success" ? (
                <CheckCircle2 className="text-green-600" size={22} />
              ) : (
                <AlertCircle className="text-red-600" size={22} />
              )}
              <p className="text-sm font-black text-[#395886]">
                {popup.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 35 }}
        className="relative w-full max-w-sm rounded-[34px] bg-white/90 p-6 shadow-xl backdrop-blur-2xl"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow transition hover:scale-105"
        >
          <X size={18} />
        </button>

        {/* MODAL HEADER */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#395886] to-[#8AAEE0] text-white">
            <Sparkles />
          </div>
          <h1 className="text-2xl font-black text-[#395886]">
            {t("auth.continue")}
          </h1>
        </div>

        {/* PHONE INPUT SECTION */}
        <div className="mt-6">
          <label className="text-xs font-bold">{t("auth.phoneNumber")}</label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border p-3 bg-white/50">
            <Phone size={18} />
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="w-full bg-transparent outline-none"
              placeholder={t("auth.phonePlaceholder")}
            />
          </div>

          <button
            onClick={handlePhoneLogin}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-[#395886] py-3 font-bold text-white transition hover:bg-[#2d466b]"
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : (
              t("auth.continue")
            )}
          </button>
        </div>

        {/* GOOGLE LOGIN SECTION */}
        <div className="mt-5 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() =>
              showPopup("error", t("auth.googleFailed"))
            }
          />
        </div>
      </motion.div>
    </div>
  );
}