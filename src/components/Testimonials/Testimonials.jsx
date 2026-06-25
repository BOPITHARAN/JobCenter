import { Quote, Star, Sparkles } from "lucide-react";

const reviews = [
  {
    name: "Pending",
    role: "Pending",
    text: "Testimonials coming soon...",
  },
  {
    name: "Pending",
    role: "Pending",
    text: "Testimonials coming soon...",
  },
  {
    name: "Pending",
    role: "Pending",
    text: "Testimonials coming soon...",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16 text-[#395886]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

      <div className="pointer-events-none absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AAEE0]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#395886] shadow-sm backdrop-blur-md">
            <Sparkles size={13} />
            Testimonials
          </div>

          <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
            Customer{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              Reviews
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#395886]/70 md:text-base">
            Reviews and success stories will be updated soon.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/75"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-700 group-hover:opacity-35" />

              <div className="relative mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
                  <Quote size={21} />
                </div>

                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={13}
                      className="fill-[#638ECB] text-[#638ECB]"
                    />
                  ))}
                </div>
              </div>

              <p className="relative text-sm leading-7 text-[#395886]/75">
                "{item.text}"
              </p>

              <div className="relative mt-5 border-t border-[#638ECB]/20 pt-4">
                <h3 className="text-sm font-black text-[#395886]">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs font-bold text-[#638ECB]">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}