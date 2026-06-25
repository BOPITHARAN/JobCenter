import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  X,
} from "lucide-react";

// டைனமிக் API URL (Production-ல் Railway URL-ஐயும், Localhost-ல் லோக்கல் URL-ஐயும் எடுக்கும்)
const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://jpbcenterback-production.up.railway.app"
  : "http://localhost:5000";

export default function Contact() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 3000);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const cleanEmail = form.email.trim().toLowerCase();

    if (!form.name || !cleanEmail || !form.subject || !form.message) {
      showPopup("error", t("fillAllFields", "Please fill all fields"));
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      showPopup("error", t("validEmail", "Please enter a valid email"));
      return;
    }

    try {
      setLoading(true);
      // Backend-ஐ அழைத்தல்
      const res = await axios.post(`${API_BASE_URL}/api/contact/send-email`, {
        ...form,
        email: cleanEmail,
      }, { withCredentials: true });

      showPopup("success", res.data.message || t("messageSent", "Message sent"));
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact Error:", err);
      showPopup("error", err?.response?.data?.message || t("messageFailed", "Message sending failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#F0F3FA] px-6 py-28">
      {/* Popups */}
      <AnimatePresence>
        {popup && (
          <motion.div initial={{ opacity: 0, y: -35 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -35 }} className="fixed left-1/2 top-6 z-[9999] w-[92%] max-w-md -translate-x-1/2">
            <div className="rounded-[28px] border border-[#B1C9EF] bg-white p-5 shadow-[0_20px_50px_rgba(57,88,134,0.18)]">
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${popup.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                  {popup.type === "success" ? <CheckCircle2 size={28} /> : <AlertTriangle size={28} />}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-[#395886]">{popup.type === "success" ? t("success", "Success") : t("notice", "Notice")}</h3>
                  <p className="mt-1 text-sm text-[#395886]/65">{popup.message}</p>
                </div>
                <button onClick={() => setPopup(null)} className="rounded-full p-2 text-[#395886]/60 hover:bg-[#F0F3FA]"><X size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-5 py-2 text-sm font-black uppercase tracking-[0.3em] text-[#395886]">{t("contactUs", "Contact Us")}</p>
          <h2 className="mt-5 text-5xl font-black text-[#395886]">{t("contact", "Contact")} <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">{t("office", "Office")}</span></h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div className="rounded-[2rem] border border-white/70 bg-white/55 p-8 shadow-sm backdrop-blur-xl lg:col-span-2">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white">
              <Building2 size={30} />
            </div>
            <h3 className="text-3xl font-black text-[#395886]">JobCenter+</h3>
            <div className="mt-8 space-y-5">
              <InfoItem icon={MapPin} title={t("location", "Location")} text="தாயகம்.இல,203,A9 வீதி,கிளிநொச்சி,இலங்கை" />
              <InfoItem icon={Mail} title={t("email", "Email")} text="jobcenterpluskilinochchi@gmail.com" />
              <InfoItem icon={Phone} title={t("phone", "Phone")} text="+94760602121" />
              <InfoItem icon={Clock} title={t("workingHours", "Working Hours")} text="Mon-Sat / 9AM-5PM" />
            </div>
          </motion.div>

          <motion.form onSubmit={sendMessage} className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-sm backdrop-blur-xl lg:col-span-3">
            <h3 className="mb-6 text-3xl font-black text-[#395886]">{t("sendMessage", "Send Message")}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <InputField name="name" value={form.name} onChange={handleChange} placeholder={t("yourName", "Your Name")} />
              <InputField name="email" value={form.email} onChange={handleChange} placeholder={t("emailAddress", "Email Address")} />
              <InputField name="subject" value={form.subject} onChange={handleChange} placeholder={t("subject", "Subject")} span />
              <textarea rows="5" name="message" value={form.message} onChange={handleChange} placeholder={t("writeMessage", "Write Message")} className="md:col-span-2 resize-none rounded-2xl border border-[#B1C9EF] bg-[#F0F3FA] px-5 py-4 text-[#395886] outline-none focus:ring-4 focus:ring-[#638ECB]/25" />
              <button type="submit" disabled={loading} className="md:col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] py-4 font-black text-white transition hover:scale-[1.02] disabled:opacity-60">
                {loading ? t("sending", "Sending...") : t("sendMessage", "Send Message")}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function InputField({ span, ...props }) {
  return <input {...props} className={`${span ? "md:col-span-2" : ""} rounded-2xl border border-[#B1C9EF] bg-[#F0F3FA] px-5 py-4 text-[#395886] outline-none focus:ring-4 focus:ring-[#638ECB]/25`} />;
}

function InfoItem({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/70 bg-white/50 p-4 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white">
        <Icon size={20} />
      </div>
      <div>
        <p className="font-bold text-[#395886]">{title}</p>
        <p className="text-sm text-[#395886]/70">{text}</p>
      </div>
    </div>
  );
}