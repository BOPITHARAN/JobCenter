// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import {
//   Users,
//   ShoppingBag,
//   Truck,
//   Package,
//   Hammer,
//   Factory,
//   ChefHat,
//   Hotel,
//   BrushCleaning,
//   ShieldCheck,
//   Wheat,
//   Wallet,
// } from "lucide-react";

// const skills = [
//   {
//     key: "salesAssistant",
//     icon: ShoppingBag,
//   },
//   {
//     key: "customerService",
//     icon: Users,
//   },
//   {
//     key: "driver",
//     icon: Truck,
//   },
//   {
//     key: "storeKeeper",
//     icon: Package,
//   },
//   {
//     key: "constructionWorker",
//     icon: Hammer,
//   },
//   {
//     key: "factoryWorker",
//     icon: Factory,
//   },
//   {
//     key: "cookKitchenHelper",
//     icon: ChefHat,
//   },
//   {
//     key: "hotelStaff",
//     icon: Hotel,
//   },
//   {
//     key: "cleanerHousekeeping",
//     icon: BrushCleaning,
//   },
//   {
//     key: "securityOfficer",
//     icon: ShieldCheck,
//   },
//   {
//     key: "agricultureWorker",
//     icon: Wheat,
//   },
//   {
//     key: "cashier",
//     icon: Wallet,
//   },
// ];

// export default function TrendingSkills() {
//   const { t } = useTranslation();

//   return (
//     <section
//       id="skills"
//       className="relative overflow-hidden bg-[#F0F3FA] px-4 py-20"
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

//       <div className="absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
//       <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />
//       <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AAEE0]/20 blur-[120px]" />

//       <div className="relative z-10 mx-auto max-w-7xl">
//         <motion.div
//           initial={{ opacity: 0, y: 25 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-14 text-center"
//         >
//           <span className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#395886] shadow-sm backdrop-blur-md">
//             🔥 {t("skills.badge")}
//           </span>

//           <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
//             {t("skills.title")}
//             <span className="block bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
//               {t("skills.highlight")}
//             </span>
//           </h2>

//           <p className="mx-auto mt-4 max-w-2xl text-[#395886]/70">
//             {t("skills.description")}
//           </p>
//         </motion.div>

//         <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {skills.map((skill, index) => {
//             const Icon = skill.icon;

//             return (
//               <motion.div
//                 key={skill.key}
//                 initial={{ opacity: 0, y: 25 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   delay: index * 0.05,
//                 }}
//                 whileHover={{
//                   y: -8,
//                   scale: 1.03,
//                 }}
//                 className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/55 p-6 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition duration-500 hover:bg-white/75"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-500 group-hover:opacity-35" />

//                 <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] shadow-[0_0_28px_rgba(99,142,203,0.45)]">
//                   <Icon size={28} className="text-white" />
//                 </div>

//                 <h3 className="relative mt-5 text-center text-lg font-black text-[#395886]">
//                   {t(`skills.items.${skill.key}`)}
//                 </h3>

//                 <p className="relative mt-2 text-center text-sm text-[#395886]/65">
//                   {t("skills.cardDescription")}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }