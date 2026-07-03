import { Mail, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer 
      className="relative overflow-hidden border-t border-[#D5DEEF] bg-gradient-to-b from-white to-[#F0F3FA] py-12 sm:py-16"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Premium Font Import (Outfit) */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap');`}
      </style>

      {/* Subtle Background Glow for Premium Feel */}
      <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#8AAEE0]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-40 w-40 rounded-full bg-[#638ECB]/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-5 text-center sm:gap-10">
        
        {/* Buttons Section with Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6"
        >
          {/* Direct Web Gmail Button */}
          <motion.a 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=omsdevelopers05@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-[300px] items-center justify-center gap-3 rounded-2xl border border-[#B1C9EF] bg-white/70 px-6 py-3.5 text-sm font-bold tracking-wide text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.10)] backdrop-blur-xl transition-all duration-300 hover:border-[#638ECB] hover:bg-white sm:w-auto sm:px-8 sm:text-[15px]"
          >
            <Mail size={18} className="shrink-0 text-[#638ECB] transition-colors duration-300 group-hover:text-[#395886]" />
            <span className="truncate">omsdevelopers05@gmail.com</span>
          </motion.a>

          {/* WhatsApp Button */}
          <motion.a 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/94755345154" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-[300px] items-center justify-center gap-3 rounded-2xl border border-[#B1C9EF] bg-white/70 px-6 py-3.5 text-sm font-bold tracking-wide text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.10)] backdrop-blur-xl transition-all duration-300 hover:border-[#638ECB] hover:bg-white sm:w-auto sm:px-8 sm:text-[15px]"
          >
            <MessageCircle size={18} className="shrink-0 text-[#638ECB] transition-colors duration-300 group-hover:text-[#395886]" />
            WhatsApp
          </motion.a>
        </motion.div>

        {/* Copyright & Credit Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex w-full flex-col items-center gap-3"
        >
          <p className="text-xs font-semibold tracking-wide text-[#395886]/70 sm:text-sm">
            © 2026 Job Center Plus.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs tracking-wide text-[#395886]/80 sm:gap-2 sm:text-sm">
            <span className="font-semibold">Designed & Developed with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Heart size={14} className="mx-0.5 shrink-0 fill-red-500 text-red-500 drop-shadow-sm" />
            </motion.div>
            <span className="font-semibold">by</span>
            <span className="font-black text-[#395886]">OMS {"<Developers/>"}</span>
          </div>
        </motion.div>
        
      </div>
    </footer>
  );
}