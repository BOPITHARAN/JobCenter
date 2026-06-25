import { useEffect, useState } from "react";
import companyLogo from "../assets/logo.png";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 3;
      });
    }, 40);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#2B0013]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2B0013] via-[#660F24] to-[#2B0013]" />

      <div className="absolute -left-24 top-10 h-[300px] w-[300px] rounded-full bg-[#FF94B2]/20 blur-[110px]" />

      <div className="absolute -right-24 bottom-10 h-[300px] w-[300px] rounded-full bg-[#F24455]/20 blur-[110px]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-5 text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-[#FFDDE8] via-[#FF94B2] to-[#F24455] opacity-70 blur-xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#FF94B2]/30 bg-[#FFDDE8] p-2 shadow-[0_0_40px_rgba(242,68,85,.4)]">
            <img
              src={companyLogo}
              alt="Job Center Plus"
              className="h-full w-full rounded-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <div className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#F24455]" />
          <div className="absolute -bottom-1 -left-1 h-3.5 w-3.5 rounded-full bg-[#FF94B2]" />
        </div>

        <h2 className="bg-gradient-to-r from-[#FFDDE8] via-[#FF94B2] to-[#F24455] bg-clip-text text-3xl font-black text-transparent">
          Job Center Plus
        </h2>

        <p className="mt-2 text-sm font-semibold tracking-wide text-[#FFDDE8]/75">
          Kilinochchi Office
        </p>

        <div className="mt-7 w-full rounded-full border border-[#FF94B2]/20 bg-white/10 p-1 shadow-inner backdrop-blur-xl">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#660F24] via-[#F24455] to-[#FF94B2] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#FFDDE8]/75">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#FF94B2]" />
          {progress}% Loading
        </div>
      </div>
    </div>
  );
}