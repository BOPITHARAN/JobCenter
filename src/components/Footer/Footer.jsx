import { Mail, Code2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import whatsappQR from "../../assets/whatsappQR.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F0F3FA]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -left-24 top-0 h-[220px] w-[220px] rounded-full bg-[#638ECB]/20 blur-[100px]"
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-0 h-[220px] w-[220px] rounded-full bg-[#395886]/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-black text-[#395886]">
            Job Center
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {" "}Plus
            </span>
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-[#395886]/70">
            Smart career platform connecting talented people with trusted
            employers.
          </p>

          <Link
            to="/privacy"
            className="mt-4 inline-flex items-center rounded-full border border-[#638ECB]/30 bg-white/60 px-5 py-2 text-xs font-bold text-[#395886] shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#638ECB]/60 hover:bg-white hover:shadow-[0_10px_25px_rgba(57,88,134,0.15)]"
          >
            Privacy Policy
          </Link>
        </div>

        <motion.div
          whileHover={{ y: -4 }}
          className="mx-auto mt-8 max-w-md rounded-[28px] border border-white/60 bg-white/60 p-5 shadow-[0_20px_50px_rgba(57,88,134,0.15)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-[#395886] to-[#638ECB] p-3 text-white">
              <Code2 size={18} />
            </div>

            <div>
              <h3 className="font-black text-[#395886]">
                OMS {"<Developers/>"}
              </h3>

              <p className="text-[11px] text-[#395886]/70">
                Designed & Developed By OMS
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <div className="rounded-2xl bg-white p-2 shadow-md">
              <img
                src={whatsappQR}
                alt="WhatsApp QR"
                className="h-24 w-24 rounded-xl object-cover"
              />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#395886]/80">
              <Mail size={14} />
              <span>omsdevelopers@gmail.com</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 border-t border-[#638ECB]/20 pt-5">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[11px] text-[#395886]/60">
              © 2026 Job Center Plus. All Rights Reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-[#395886]/70">
              <span>Designed & Developed with</span>

              <Heart size={12} className="fill-red-500 text-red-500" />

              <span>by OMS {"<Developers/>"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}