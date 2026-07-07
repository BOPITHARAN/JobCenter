import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section 
      id="contact" 
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F0F3FA] px-4 py-10"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="relative z-10 w-full max-w-lg">
        {/* HEADER */}
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-3xl sm:text-4xl font-black tracking-tight text-[#395886]"
        >
          Contact Us
        </motion.h2>

        {/* CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 rounded-[28px] border border-white/60 bg-white/70 p-5 sm:p-8 shadow-xl backdrop-blur-xl"
        >
          {/* COMPANY */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#395886]/10 text-[#395886]">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#395886]">JobCenterPlus</h3>
              <p className="text-xs font-semibold text-[#638ECB]">Support Center</p>
            </div>
          </div>

          <div className="h-px w-full bg-[#395886]/10" />

          {/* LOCATION */}
          <div className="flex items-start gap-3 py-2">
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#638ECB]/10 text-[#638ECB]">
              <MapPin size={16} />
            </div>
            <p className="text-sm text-[#395886]/80 leading-relaxed">
              No.203, A9 Road, Kilinochchi, Sri Lanka
            </p>
          </div>

          {/* EMAIL & WHATSAPP (Tap-friendly) */}
          <div className="grid gap-3">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jobcenterpluskilinochchi0@gmail.com"
              target="_blank"
              className="flex items-center justify-between rounded-2xl border border-[#395886]/10 bg-white/50 p-4 transition-all hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-bold text-[#395886]">Email Support</span>
              </div>
            </a>

            <a
              href="https://wa.me/94760602121"
              target="_blank"
              className="flex items-center justify-between rounded-2xl border border-[#395886]/10 bg-white/50 p-4 transition-all hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-500">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-bold text-[#395886]">WhatsApp Chat</span>
              </div>
            </a>
          </div>

          {/* HOURS */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#638ECB]/10 text-[#638ECB]">
              <Clock size={16} />
            </div>
            <p className="text-xs font-bold text-[#395886]/80">
              Sat - Sun | 9:00 AM - 5:00 PM
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}