import { Mail, Heart, MessageCircle, ShieldCheck, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Link இம்போர்ட் செய்துள்ளேன்

export default function Footer() {
  return (
    <footer 
      className="relative overflow-hidden border-t border-[#D5DEEF] bg-gradient-to-b from-white to-[#F0F3FA] py-12 sm:py-16"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&display=swap');`}
      </style>

      <div className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-[#8AAEE0]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-0 h-40 w-40 rounded-full bg-[#638ECB]/15 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-5 text-center sm:gap-10">
        
        {/* AdSense Legal Links - இங்கிருந்துதான் Privacy/Terms பக்கம் செல்லும் */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-widest text-[#395886]/70">
          <Link to="/privacy" className="flex items-center gap-2 hover:text-[#638ECB] transition-colors">
            <ShieldCheck size={14} /> Privacy Policy
          </Link>
          <span className="text-[#638ECB]/30">|</span>
          <Link to="/terms" className="flex items-center gap-2 hover:text-[#638ECB] transition-colors">
            <FileText size={14} /> Terms of Service
          </Link>
        </div>

        {/* Buttons Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:gap-6"
        >
          <motion.a 
            whileHover={{ scale: 1.03, y: -2 }}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=omsdevelopers05@gmail.com" 
            target="_blank"
            className="group flex w-full max-w-[300px] items-center justify-center gap-3 rounded-2xl border border-[#B1C9EF] bg-white/70 px-6 py-3.5 text-sm font-bold tracking-wide text-[#395886] shadow-sm backdrop-blur-xl transition-all hover:border-[#638ECB] sm:w-auto"
          >
            <Mail size={18} className="text-[#638ECB]" />
            <span className="truncate">omsdevelopers05@gmail.com</span>
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.03, y: -2 }}
            href="https://wa.me/94755345154" 
            target="_blank"
            className="group flex w-full max-w-[300px] items-center justify-center gap-3 rounded-2xl border border-[#B1C9EF] bg-white/70 px-6 py-3.5 text-sm font-bold tracking-wide text-[#395886] shadow-sm backdrop-blur-xl transition-all hover:border-[#638ECB] sm:w-auto"
          >
            <MessageCircle size={18} className="text-[#638ECB]" />
            WhatsApp
          </motion.a>
        </motion.div>

        {/* Copyright Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex w-full flex-col items-center gap-3"
        >
          <p className="text-xs font-semibold tracking-wide text-[#395886]/70">
            © 2026 Job Center Plus. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-1.5 text-xs text-[#395886]/80">
            <span>Designed with</span>
            <Heart size={14} className="fill-red-500 text-red-500 animate-pulse" />
            <span>by </span>
            <span className="font-black text-[#395886]">OMS {"<Developers/>"}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}