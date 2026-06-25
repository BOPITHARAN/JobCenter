import React, { useState } from "react";
import {
  RefreshCw,
  WifiOff,
  ShieldAlert,
} from "lucide-react";

export default function ErrorPage() {
  const [loading, setLoading] = useState(false);

  const retry = () => {
    setLoading(true);

    setTimeout(() => {
      window.location.reload(true);
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F0F3FA] p-4">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="absolute -left-20 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />

      <div className="relative z-10 w-full max-w-xl">

        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/65 p-8 text-center shadow-[0_25px_70px_rgba(57,88,134,0.18)] backdrop-blur-2xl">

          {/* Icon */}

          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">

            <div className="absolute inset-0 animate-pulse rounded-full bg-[#638ECB]/20 blur-xl" />

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] shadow-[0_0_35px_rgba(99,142,203,0.45)]">

              <ShieldAlert
                size={36}
                className="text-white"
              />

            </div>

          </div>

          {/* 404 */}

          <h1 className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-[88px] font-black leading-none text-transparent">
            404
          </h1>

          <h2 className="mt-2 text-3xl font-black text-[#395886]">
            Resource Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#395886]/70">
            The requested page is unavailable or has been moved.
            Please refresh the application and try again.
          </p>

          {/* Button */}

          <div className="mt-8 flex justify-center">

            <button
              type="button"
              onClick={retry}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] px-8 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(99,142,203,0.45)] transition-all duration-300 hover:scale-105 disabled:opacity-70"
            >

              <RefreshCw
                size={16}
                className={loading ? "animate-spin" : ""}
              />

              {loading
                ? "Refreshing..."
                : "Refresh Application"}

            </button>

          </div>

          {/* Status */}

          <div className="mt-8 border-t border-[#638ECB]/20 pt-5">

            <div className="mx-auto w-fit rounded-2xl bg-[#F0F3FA] px-4 py-3 shadow-sm">

              <p className="flex items-center gap-2 text-xs font-bold text-[#395886]">

                <WifiOff size={14} />

                Network Status : Ready

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}