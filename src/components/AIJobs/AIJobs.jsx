// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   Sparkles,
//   MapPin,
//   Briefcase,
//   Building2,
//   ArrowRight,
//   Plus,
//   Edit,
//   Save,
//   X,
//   Trash2,
//   User,
//   Mail,
//   Phone,
// } from "lucide-react";

// const defaultJobs = [
//   { title: "Pending", company: "Pending", location: "Pending", type: "Pending" },
//   { title: "Pending", company: "Pending", location: "Pending", type: "Pending" },
//   { title: "Pending", company: "Pending", location: "Pending", type: "Pending" },
// ];

// export default function AIJobs({ isAdmin = false }) {
//   const { t } = useTranslation();

//   const [jobs, setJobs] = useState(defaultJobs);
//   const [editIndex, setEditIndex] = useState(null);
//   const [selectedJob, setSelectedJob] = useState(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     location: "",
//     type: "",
//   });

//   const [applyData, setApplyData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   useEffect(() => {
//     try {
//       const savedJobs = JSON.parse(localStorage.getItem("aiJobs")) || null;

//       if (Array.isArray(savedJobs) && savedJobs.length > 0) {
//         const cleanJobs = savedJobs.map((job) => ({
//           title: job.title || "Pending",
//           company: job.company || "Pending",
//           location: job.location || "Pending",
//           type: job.type || "Pending",
//         }));

//         setJobs(cleanJobs);
//       }
//     } catch {
//       localStorage.removeItem("aiJobs");
//       setJobs(defaultJobs);
//     }
//   }, []);

//   const saveJobs = (updatedJobs) => {
//     setJobs(updatedJobs);
//     localStorage.setItem("aiJobs", JSON.stringify(updatedJobs));
//   };

//   const isPendingJob = (job) => {
//     const title = String(job.title || "").trim().toLowerCase();
//     const company = String(job.company || "").trim().toLowerCase();
//     const location = String(job.location || "").trim().toLowerCase();

//     return (
//       !title ||
//       !company ||
//       !location ||
//       title === "pending" ||
//       company === "pending" ||
//       location === "pending"
//     );
//   };

//   const getType = (type) => {
//     if (!type || String(type).trim().toLowerCase() === "pending") {
//       return t("aiJobs.available");
//     }
//     return type;
//   };

//   const handleAddJob = () => {
//     const newJob = {
//       title: "Pending",
//       company: "Pending",
//       location: "Pending",
//       type: "Pending",
//     };

//     const updatedJobs = [...jobs, newJob];

//     saveJobs(updatedJobs);
//     setEditIndex(updatedJobs.length - 1);
//     setFormData(newJob);
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setFormData({
//       title: jobs[index].title,
//       company: jobs[index].company,
//       location: jobs[index].location,
//       type: jobs[index].type,
//     });
//   };

//   const handleSave = () => {
//     if (editIndex === null) return;

//     const updatedJobs = [...jobs];

//     updatedJobs[editIndex] = {
//       title: formData.title.trim() || "Pending",
//       company: formData.company.trim() || "Pending",
//       location: formData.location.trim() || "Pending",
//       type: formData.type.trim() || "Pending",
//     };

//     saveJobs(updatedJobs);
//     setEditIndex(null);
//   };

//   const handleDelete = (index) => {
//     const confirmDelete = window.confirm(t("aiJobs.deleteConfirm"));

//     if (!confirmDelete) return;

//     const updatedJobs = jobs.filter((_, i) => i !== index);
//     saveJobs(updatedJobs);

//     if (editIndex === index) {
//       setEditIndex(null);
//     }
//   };

//   const handleApply = (job) => {
//     if (isPendingJob(job)) {
//       alert(t("aiJobs.notAvailableAlert"));
//       return;
//     }

//     setSelectedJob(job);
//     setApplyData({
//       name: "",
//       email: "",
//       phone: "",
//       message: "",
//     });
//   };

//   const submitApplication = () => {
//     if (
//       !applyData.name.trim() ||
//       !applyData.email.trim() ||
//       !applyData.phone.trim()
//     ) {
//       alert(t("aiJobs.fillRequired"));
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applyData.email.trim())) {
//       alert(t("aiJobs.validEmail"));
//       return;
//     }

//     if (!/^[0-9]{10}$/.test(applyData.phone.trim())) {
//       alert(t("aiJobs.validPhone"));
//       return;
//     }

//     const application = {
//       id: Date.now(),
//       job_title: selectedJob.title,
//       company: selectedJob.company,
//       location: selectedJob.location,
//       type: getType(selectedJob.type),
//       name: applyData.name.trim(),
//       email: applyData.email.trim(),
//       phone: applyData.phone.trim(),
//       message: applyData.message.trim(),
//       status: "Pending",
//       created_at: new Date().toLocaleString(),
//     };

//     const oldApplications =
//       JSON.parse(localStorage.getItem("jobApplications")) || [];

//     localStorage.setItem(
//       "jobApplications",
//       JSON.stringify([application, ...oldApplications])
//     );

//     alert(t("aiJobs.applicationSuccess"));
//     setSelectedJob(null);
//   };

//   return (
//     <section className="relative overflow-hidden bg-[#F0F3FA] px-4 py-16 text-[#395886]">
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />

//       <div className="pointer-events-none absolute -left-28 top-0 h-[320px] w-[320px] rounded-full bg-[#638ECB]/30 blur-[120px]" />
//       <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-[#395886]/25 blur-[120px]" />
//       <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8AAEE0]/20 blur-[120px]" />

//       <div className="relative z-10 mx-auto max-w-6xl">
//         <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//           <div>
//             <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#395886] shadow-sm backdrop-blur-md">
//               <Sparkles size={13} />
//               {t("aiJobs.featuredJobs")}
//             </p>

//             <h2 className="mt-5 text-3xl font-black text-[#395886] md:text-5xl">
//               {t("aiJobs.latest")}{" "}
//               <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
//                 {t("aiJobs.jobOpportunities")}
//               </span>
//             </h2>

//             <p className="mt-3 max-w-xl text-sm leading-6 text-[#395886]/70">
//               {t("aiJobs.description")}
//             </p>
//           </div>

//           {isAdmin && (
//             <button
//               type="button"
//               onClick={handleAddJob}
//               className="flex w-fit items-center gap-2 rounded-xl border border-white/70 bg-white/60 px-5 py-3 text-sm font-black text-[#395886] shadow-[0_12px_30px_rgba(57,88,134,0.14)] backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/80"
//             >
//               <Plus size={16} />
//               {t("aiJobs.addJob")}
//             </button>
//           )}
//         </div>

//         <div className="grid gap-5 lg:grid-cols-3">
//           {jobs.map((job, index) => {
//             const isEditing = editIndex === index;
//             const pending = isPendingJob(job);

//             return (
//               <div
//                 key={index}
//                 className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_45px_rgba(57,88,134,0.16)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:bg-white/75"
//               >
//                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-700 group-hover:opacity-35" />

//                 <div className="relative flex items-start justify-between gap-3">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_25px_rgba(99,142,203,0.45)]">
//                     <Briefcase size={22} />
//                   </div>

//                   {isEditing ? (
//                     <input
//                       value={formData.type}
//                       onChange={(e) =>
//                         setFormData({ ...formData, type: e.target.value })
//                       }
//                       className="w-32 rounded-full border border-[#B1C9EF] bg-[#F0F3FA] px-3 py-1 text-xs font-black text-[#395886] outline-none placeholder:text-[#395886]/40 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/20"
//                       placeholder={t("aiJobs.typePlaceholder")}
//                     />
//                   ) : (
//                     <span className="max-w-[140px] truncate rounded-full border border-[#638ECB]/25 bg-[#D5DEEF]/70 px-3 py-1 text-xs font-black text-[#395886]">
//                       {getType(job.type)}
//                     </span>
//                   )}
//                 </div>

//                 {isEditing ? (
//                   <div className="relative mt-5 space-y-3">
//                     <input
//                       value={formData.title}
//                       onChange={(e) =>
//                         setFormData({ ...formData, title: e.target.value })
//                       }
//                       className="w-full rounded-xl border border-[#B1C9EF] bg-[#F0F3FA] p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/20"
//                       placeholder={t("aiJobs.jobTitlePlaceholder")}
//                     />

//                     <input
//                       value={formData.company}
//                       onChange={(e) =>
//                         setFormData({ ...formData, company: e.target.value })
//                       }
//                       className="w-full rounded-xl border border-[#B1C9EF] bg-[#F0F3FA] p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/20"
//                       placeholder={t("aiJobs.companyPlaceholder")}
//                     />

//                     <input
//                       value={formData.location}
//                       onChange={(e) =>
//                         setFormData({ ...formData, location: e.target.value })
//                       }
//                       className="w-full rounded-xl border border-[#B1C9EF] bg-[#F0F3FA] p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/20"
//                       placeholder={t("aiJobs.locationPlaceholder")}
//                     />
//                   </div>
//                 ) : (
//                   <>
//                     <h3 className="relative mt-5 line-clamp-2 min-h-[56px] break-words text-lg font-black leading-7 text-[#395886]">
//                       {job.title}
//                     </h3>

//                     <p className="relative mt-3 flex items-center gap-2 text-sm font-bold text-[#395886]/75">
//                       <Building2 size={14} className="shrink-0" />
//                       <span className="truncate">{job.company}</span>
//                     </p>

//                     <p className="relative mt-2 flex items-center gap-2 text-sm text-[#395886]/65">
//                       <MapPin size={14} className="shrink-0" />
//                       <span className="truncate">{job.location}</span>
//                     </p>
//                   </>
//                 )}

//                 <div className="relative mt-auto pt-5">
//                   {isEditing ? (
//                     <div className="grid grid-cols-2 gap-2">
//                       <button
//                         type="button"
//                         onClick={handleSave}
//                         className="flex items-center justify-center gap-2 rounded-xl bg-green-500/15 py-3 text-sm font-black text-green-700 transition hover:bg-green-500/25"
//                       >
//                         <Save size={15} />
//                         {t("common.save")}
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => setEditIndex(null)}
//                         className="flex items-center justify-center gap-2 rounded-xl bg-red-500/15 py-3 text-sm font-black text-red-600 transition hover:bg-red-500/25"
//                       >
//                         <X size={15} />
//                         {t("common.cancel")}
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="grid gap-2">
//                       <button
//                         type="button"
//                         disabled={pending}
//                         onClick={() => handleApply(job)}
//                         className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black shadow-lg transition ${
//                           pending
//                             ? "cursor-not-allowed bg-[#D5DEEF]/70 text-[#395886]/40"
//                             : "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white hover:scale-[1.02]"
//                         }`}
//                       >
//                         {pending
//                           ? t("aiJobs.notAvailable")
//                           : t("aiJobs.applyNow")}
//                         <ArrowRight size={14} />
//                       </button>

//                       {isAdmin && (
//                         <div className="grid grid-cols-2 gap-2">
//                           <button
//                             type="button"
//                             onClick={() => handleEdit(index)}
//                             className="flex items-center justify-center gap-2 rounded-xl bg-[#638ECB]/15 py-3 text-xs font-black text-[#395886] transition hover:bg-[#638ECB]/25"
//                           >
//                             <Edit size={14} />
//                             {t("common.edit")}
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => handleDelete(index)}
//                             className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 py-3 text-xs font-black text-red-600 transition hover:bg-red-500/20"
//                           >
//                             <Trash2 size={14} />
//                             {t("common.delete")}
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {selectedJob && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#395886]/45 p-4 backdrop-blur-sm">
//           <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/70 bg-[#F0F3FA] p-6 shadow-[0_0_50px_rgba(57,88,134,0.35)]">
//             <div className="flex items-start justify-between gap-4">
//               <div className="min-w-0">
//                 <p className="inline-flex max-w-full rounded-full border border-[#638ECB]/25 bg-[#D5DEEF]/70 px-3 py-1 text-[10px] font-black uppercase text-[#395886]">
//                   <span className="truncate">{getType(selectedJob.type)}</span>
//                 </p>

//                 <h2 className="mt-4 break-words text-2xl font-black text-[#395886]">
//                   {selectedJob.title}
//                 </h2>

//                 <p className="mt-2 break-words text-sm text-[#395886]/70">
//                   {selectedJob.company} • {selectedJob.location}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setSelectedJob(null)}
//                 className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D5DEEF]/70 text-[#395886] transition hover:bg-[#B1C9EF]"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="mt-5 space-y-3">
//               <ApplyInput
//                 icon={User}
//                 value={applyData.name}
//                 onChange={(e) =>
//                   setApplyData({ ...applyData, name: e.target.value })
//                 }
//                 placeholder={t("aiJobs.yourName")}
//               />

//               <ApplyInput
//                 icon={Mail}
//                 value={applyData.email}
//                 onChange={(e) =>
//                   setApplyData({ ...applyData, email: e.target.value })
//                 }
//                 placeholder={t("aiJobs.emailAddress")}
//               />

//               <ApplyInput
//                 icon={Phone}
//                 value={applyData.phone}
//                 onChange={(e) => {
//                   const onlyNumbers = e.target.value.replace(/\D/g, "");
//                   setApplyData({ ...applyData, phone: onlyNumbers.slice(0, 10) });
//                 }}
//                 placeholder={t("aiJobs.phoneNumber")}
//               />

//               <textarea
//                 value={applyData.message}
//                 onChange={(e) =>
//                   setApplyData({ ...applyData, message: e.target.value })
//                 }
//                 placeholder={t("aiJobs.message")}
//                 rows="3"
//                 className="w-full resize-none rounded-xl border border-[#B1C9EF] bg-white/70 p-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/20"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={submitApplication}
//               className="mt-5 w-full rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] py-3 text-sm font-black text-white shadow-[0_0_25px_rgba(99,142,203,0.45)] transition hover:scale-[1.01]"
//             >
//               {t("aiJobs.submitApplication")}
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// function ApplyInput({ icon: Icon, value, onChange, placeholder }) {
//   return (
//     <div className="flex items-center gap-2 rounded-xl border border-[#B1C9EF] bg-white/70 px-3">
//       <Icon size={16} className="text-[#638ECB]" />
//       <input
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full bg-transparent py-3 text-sm text-[#395886] outline-none placeholder:text-[#395886]/40"
//       />
//     </div>
//   );
// }