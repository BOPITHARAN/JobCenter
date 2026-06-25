import { useState } from "react";
import api from "../../api/api"; // ✅ FIXED IMPORT (IMPORTANT)

import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";

import {
  X,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal({ onClose = () => {}, setUser = () => {} }) {
  const { t } = useTranslation();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  // 🔔 popup message
  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 2600);
  };

  // 💾 save login
  const saveLogin = (data) => {
    if (!data?.token || !data?.user) {
      throw new Error("Invalid login response");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  // 🔁 redirect
  const redirectByRole = (user) => {
    if (user?.role === "admin") {
      window.location.href = "/admin-dashboard";
    } else {
      window.location.href = "/";
    }
  };

  // 📱 PHONE LOGIN
  const handlePhoneLogin = async () => {
    const cleanPhone = phone.trim();

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      showPopup("error", t("auth.phoneError"));
      return;
    }

    try {
      setLoading(true);

      console.log("📡 PHONE LOGIN API CALL");

      const res = await api.post("/api/auth/phone", {
        phone: cleanPhone,
      });

      console.log("✅ RESPONSE:", res.data);

      saveLogin(res.data);
      showPopup("success", t("auth.loginSuccess"));

      setTimeout(() => {
        onClose();
        redirectByRole(res.data.user);
      }, 700);
    } catch (err) {
      console.error("❌ Login Error:", err);
      showPopup(
        "error",
        err.response?.data?.message || t("auth.phoneFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  // 🌐 GOOGLE LOGIN
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        showPopup("error", t("auth.missingCredential"));
        return;
      }

      setLoading(true);

      console.log("📡 GOOGLE LOGIN API CALL");

      const res = await api.post("/api/auth/google", {
        token: credentialResponse.credential,
      });

      console.log("✅ RESPONSE:", res.data);

      saveLogin(res.data);
      showPopup("success", t("auth.googleSuccess"));

      setTimeout(() => {
        onClose();
        redirectByRole(res.data.user);
      }, 700);
    } catch (err) {
      console.error("❌ Google Login Error:", err);
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

      {/* MODAL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 35 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 35 }}
        className="relative w-full max-w-sm rounded-[34px] bg-white/90 p-6 shadow-xl backdrop-blur-2xl"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white p-2 shadow"
        >
          <X size={18} />
        </button>

        {/* HEADER */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#395886] to-[#8AAEE0] text-white">
            <Sparkles />
          </div>

          <h1 className="text-2xl font-black text-[#395886]">
            {t("auth.continue")}
          </h1>
        </div>

        {/* PHONE INPUT */}
        <div className="mt-6">
          <label className="text-xs font-bold">{t("auth.phoneNumber")}</label>

          <div className="mt-2 flex items-center gap-2 rounded-xl border p-3">
            <Phone size={18} />
            <input
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              className="w-full outline-none"
              placeholder={t("auth.phonePlaceholder")}
            />
          </div>

          <button
            onClick={handlePhoneLogin}
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-[#395886] py-3 font-bold text-white"
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : (
              t("auth.continue")
            )}
          </button>
        </div>

        {/* GOOGLE LOGIN */}
        <div className="mt-5">
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