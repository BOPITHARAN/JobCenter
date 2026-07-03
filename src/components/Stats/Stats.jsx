// import { Briefcase, Building2, Users, Sparkles } from "lucide-react";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";

// function CountUp({ value }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     if (!end) return;

//     const duration = 1200;
//     const stepTime = Math.max(Math.floor(duration / end), 20);

//     const timer = setInterval(() => {
//       start += 1;
//       setCount(start);
//       if (start === end) clearInterval(timer);
//     }, stepTime);

//     return () => clearInterval(timer);
//   }, [value]);

//   return <span className="tabular-nums">{count}+</span>;
// }

// export default function Stats() {
//   const { t } = useTranslation();

//   const stats = [
//     {
//       icon: Briefcase,
//       value: "58",
//       label: t("stats.activeJobs"),
//     },
//     {
//       icon: Building2,
//       value: "9",
//       label: t("stats.companies"),
//     },
//     {
//       icon: Users,
//       value: "23",
//       label: t("stats.candidates"),
//     },
//   ];

//   return (
//     <section className="relative py-24 bg-[#F0F3FA] overflow-hidden">

//       {/* Background */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,88,134,0.10),transparent_60%)]" />

//       <div className="relative mx-auto max-w-6xl px-6">

//         {/* Header */}
//         <div className="text-center mb-14">
//           <div className="inline-flex items-center gap-2 rounded-full border border-[#B1C9EF] bg-white px-4 py-1 text-xs font-semibold text-[#395886] shadow-sm">
//             <Sparkles size={14} />
//             {t("stats.statistics")}
//           </div>

//           <h2 className="mt-6 text-4xl font-black text-[#395886]">
//             Platform <span className="text-[#638ECB]">Overview</span>
//           </h2>

//           <p className="mt-3 text-sm text-[#395886]/70">
//             {t("stats.description")}
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

//           {stats.map((item, index) => {
//             const Icon = item.icon;

//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -6 }}
//                 className="group relative rounded-2xl border border-[#B1C9EF]/60 bg-white/80 p-7 backdrop-blur-xl shadow-sm hover:shadow-md transition"
//               >

//                 {/* Icon */}
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D5DEEF] text-[#395886]">
//                     <Icon size={20} />
//                   </div>

//                   <span className="text-[11px] text-[#395886]/50 uppercase">
//                     Live
//                   </span>
//                 </div>

//                 {/* Value */}
//                 <h3 className="text-4xl font-black text-[#395886]">
//                   <CountUp value={item.value} />
//                 </h3>

//                 {/* Label */}
//                 <p className="mt-2 text-sm font-medium text-[#395886]/70">
//                   {item.label}
//                 </p>

//                 {/* bottom line */}
//                 <div className="mt-6 h-px bg-[#B1C9EF]/40" />

//                 <p className="mt-3 text-[11px] text-[#395886]/50">
//                   Updated in real time
//                 </p>

//               </motion.div>
//             );
//           })}

//         </div>
//       </div>
//     </section>
//   );
// }