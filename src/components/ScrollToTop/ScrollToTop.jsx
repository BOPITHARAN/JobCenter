import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 30,
          }}
          transition={{
            duration: 0.3,
          }}
          onClick={scrollToTop}
          aria-label="Scroll To Top"
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-[#395886]
            via-[#638ECB]
            to-[#8AAEE0]
            text-white
            shadow-[0_15px_40px_rgba(57,88,134,0.35)]
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-1
            hover:scale-110
            hover:shadow-[0_20px_50px_rgba(99,142,203,0.55)]
            active:scale-95
          "
        >
          {/* Glow */}
          <div
            className="
              absolute
              inset-0
              rounded-2xl
              bg-gradient-to-br
              from-[#638ECB]/40
              to-[#8AAEE0]/40
              blur-xl
            "
          />

          {/* Icon */}
          <div className="relative z-10">
            <ChevronUp
              size={24}
              strokeWidth={3}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}