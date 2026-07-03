// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { supabase } from "../../api/supabaseClient";
// import {
//   CalendarDays,
//   ArrowRight,
//   Sparkles,
//   BriefcaseBusiness,
//   Edit,
//   Save,
//   X,
// } from "lucide-react";

// const defaultNews = [
//   { title: "Pending", desc: "Pending", tag: "Pending", date: "Pending" },
//   { title: "Pending", desc: "Pending", tag: "Pending", date: "Pending" },
//   { title: "Pending", desc: "Pending", tag: "Pending", date: "Pending" },
// ];

// export default function LatestNews({ isAdmin = false }) {
//   const { t } = useTranslation();

//   const [news, setNews] = useState(defaultNews);
//   const [editIndex, setEditIndex] = useState(null);
//   const [selectedNews, setSelectedNews] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     desc: "",
//     tag: "",
//     date: "",
//   });

//   useEffect(() => {
//     const savedNews = localStorage.getItem("latestNews");

//     if (savedNews) {
//       try {
//         const parsedNews = JSON.parse(savedNews);

//         const cleanNews = parsedNews.map((item) => ({
//           title: item.title || "Pending",
//           desc: item.desc || "Pending",
//           tag: item.tag || "Pending",
//           date: item.date || "Pending",
//         }));

//         setNews(cleanNews);
//       } catch {
//         localStorage.removeItem("latestNews");
//         setNews(defaultNews);
//       }
//     }
//   }, []);

//   const handleEdit = (index) => {
//     setEditIndex(index);

//     setFormData({
//       title: news[index].title,
//       desc: news[index].desc,
//       tag: news[index].tag,
//       date: news[index].date,
//     });
//   };

//   const handleSave = () => {
//     const updatedNews = [...news];

//     updatedNews[editIndex] = {
//       title: formData.title || "Pending",
//       desc: formData.desc || "Pending",
//       tag: formData.tag || "Pending",
//       date: formData.date || "Pending",
//     };

//     setNews(updatedNews);
//     localStorage.setItem("latestNews", JSON.stringify(updatedNews));
//     setEditIndex(null);
//   };

//   const handleCancel = () => {
//     setEditIndex(null);
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16 text-[#395886]">
//       <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

//       <div className="absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
//       <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />

//       <div className="relative mx-auto max-w-6xl">
//         <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//           <div>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/55 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886] shadow-sm backdrop-blur-md"
//             >
//               <Sparkles size={13} />
//               {t("news.badge", "Career Updates")}
//             </motion.p>

//             <motion.h2
//               initial={{ opacity: 0, y: 25 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="mt-5 text-3xl font-black text-[#395886] md:text-5xl"
//             >
//               {t("news.title1", "Latest")}{" "}
//               <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
//                 {t("news.title2", "Insights")}
//               </span>
//             </motion.h2>

//             <p className="mt-4 max-w-xl text-sm leading-6 text-[#395886]/75">
//               {t(
//                 "news.description",
//                 "News and career updates will be updated soon."
//               )}
//             </p>
//           </div>

//           <div className="hidden rounded-2xl border border-white/70 bg-white/50 p-4 shadow-[0_18px_45px_rgba(57,88,134,0.15)] backdrop-blur-xl md:block">
//             <p className="flex items-center gap-2 text-sm font-black text-[#395886]">
//               <BriefcaseBusiness size={16} />
//               {t("news.trustedNews", "Trusted Career News")}
//             </p>
//           </div>
//         </div>

//         <div className="grid gap-5 md:grid-cols-3">
//           {news.map((item, index) => {
//             const isEditing = editIndex === index;

//             return (
//               <motion.article
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="group overflow-hidden rounded-[26px] border border-white/70 bg-white/55 shadow-[0_18px_45px_rgba(57,88,134,0.18)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/75"
//               >
//                 <div className="h-1.5 bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0]" />

//                 <div className="p-5">
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
//                       <CalendarDays size={20} />
//                     </div>

//                     {isEditing ? (
//                       <input
//                         value={formData.tag}
//                         onChange={(e) =>
//                           setFormData({ ...formData, tag: e.target.value })
//                         }
//                         className="w-24 rounded-full border border-[#638ECB]/30 bg-white/70 px-3 py-1 text-[10px] font-black uppercase text-[#395886] outline-none placeholder:text-[#395886]/40"
//                         placeholder={t("news.tag", "Tag")}
//                       />
//                     ) : (
//                       <span className="max-w-[140px] truncate rounded-full border border-[#638ECB]/25 bg-[#D5DEEF]/70 px-3 py-1 text-[10px] font-black uppercase text-[#395886]">
//                         {item.tag}
//                       </span>
//                     )}
//                   </div>

//                   {isEditing ? (
//                     <div className="mt-5 space-y-3">
//                       <input
//                         value={formData.date}
//                         onChange={(e) =>
//                           setFormData({ ...formData, date: e.target.value })
//                         }
//                         className="w-full rounded-xl border border-[#638ECB]/25 bg-white/70 p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40"
//                         placeholder={t("news.date", "Date")}
//                       />

//                       <input
//                         value={formData.title}
//                         onChange={(e) =>
//                           setFormData({ ...formData, title: e.target.value })
//                         }
//                         className="w-full rounded-xl border border-[#638ECB]/25 bg-white/70 p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40"
//                         placeholder={t("news.title", "Title")}
//                       />

//                       <textarea
//                         value={formData.desc}
//                         onChange={(e) =>
//                           setFormData({ ...formData, desc: e.target.value })
//                         }
//                         rows="4"
//                         className="w-full resize-none rounded-xl border border-[#638ECB]/25 bg-white/70 p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40"
//                         placeholder={t(
//                           "news.descriptionField",
//                           "Description"
//                         )}
//                       />
//                     </div>
//                   ) : (
//                     <>
//                       <p className="mt-5 truncate text-[10px] font-black uppercase tracking-[0.15em] text-[#638ECB]">
//                         {item.date}
//                       </p>

//                       <h3 className="mt-2 line-clamp-2 break-words text-lg font-black text-[#395886]">
//                         {item.title}
//                       </h3>

//                       <p className="mt-3 min-h-[65px] break-words text-sm leading-6 text-[#395886]/70 line-clamp-3">
//                         {item.desc}
//                       </p>
//                     </>
//                   )}

//                   <div className="mt-5 flex items-center justify-between gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setSelectedNews(item)}
//                       className="flex items-center gap-2 text-sm font-black text-[#638ECB] transition group-hover:text-[#395886]"
//                     >
//                       {t("news.readMore", "Read More")}
//                       <ArrowRight
//                         size={15}
//                         className="transition group-hover:translate-x-1"
//                       />
//                     </button>

//                     {isAdmin &&
//                       (isEditing ? (
//                         <div className="flex gap-2">
//                           <button
//                             type="button"
//                             onClick={handleSave}
//                             className="rounded-xl bg-green-500/15 p-2 text-green-700 transition hover:bg-green-500/25"
//                           >
//                             <Save size={16} />
//                           </button>

//                           <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="rounded-xl bg-red-500/15 p-2 text-red-600 transition hover:bg-red-500/25"
//                           >
//                             <X size={16} />
//                           </button>
//                         </div>
//                       ) : (
//                         <button
//                           type="button"
//                           onClick={() => handleEdit(index)}
//                           className="rounded-xl bg-[#638ECB]/15 p-2 text-[#395886] transition hover:bg-[#638ECB]/25"
//                         >
//                           <Edit size={16} />
//                         </button>
//                       ))}
//                   </div>
//                 </div>
//               </motion.article>
//             );
//           })}
//         </div>
//       </div>

//       {selectedNews && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#395886]/45 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/70 bg-[#F0F3FA] p-6 shadow-[0_0_50px_rgba(57,88,134,0.35)]">
//             <div className="flex items-start justify-between gap-4">
//               <div className="min-w-0">
//                 <p className="inline-flex max-w-full rounded-full border border-[#638ECB]/25 bg-[#D5DEEF]/70 px-3 py-1 text-[10px] font-black uppercase text-[#395886]">
//                   <span className="truncate">{selectedNews.tag}</span>
//                 </p>

//                 <h2 className="mt-4 break-words text-2xl font-black text-[#395886]">
//                   {selectedNews.title}
//                 </h2>

//                 <p className="mt-2 break-words text-xs font-black uppercase tracking-[0.18em] text-[#638ECB]">
//                   {selectedNews.date}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setSelectedNews(null)}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D5DEEF]/70 text-[#395886] transition hover:bg-[#B1C9EF]"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <p className="mt-5 max-h-[260px] overflow-y-auto break-words text-sm leading-7 text-[#395886]/80">
//               {selectedNews.desc}
//             </p>

//             <button
//               type="button"
//               onClick={() => setSelectedNews(null)}
//               className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] py-3 text-sm font-black text-white shadow-[0_0_25px_rgba(99,142,203,0.45)] transition hover:scale-[1.01]"
//             >
//               {t("news.close", "Close")}
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }