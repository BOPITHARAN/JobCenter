import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../api/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

import {
  Clock,
  MapPin,
  Heart,
  Building2,
  ArrowRight,
  Share2,
} from "lucide-react";

import ApplyModal from "../ApplyModal/ApplyModal";

// ---------------------------------------------
// 📝 JOB CARD COMPONENT
// ---------------------------------------------
const JobCard = ({ job, isSaved, onSave, onApply, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: job.title,
      text: `Check out this ${job.title} job at ${job.company}!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.error(err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(t("linkCopied", "Link copied!"));
    }
  };

  const skillsArray = job.skills ? (typeof job.skills === "string" ? job.skills.split(",").slice(0, 3) : job.skills.slice(0, 3)) : [];

  return (
    <article className="group relative flex min-h-[370px] flex-col overflow-hidden rounded-[28px] border border-[#D5DEEF] bg-white/80 p-5 shadow-[0_15px_40px_rgba(57,88,134,.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#638ECB] hover:bg-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-700 group-hover:opacity-25" />
      
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-2">
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F3FA] px-3 py-1.5 text-[11px] font-bold text-[#395886]/75">
            <Clock size={12} /> <span>{job.days_left || t("new", "New")}</span>
          </span>
          <span className="rounded-full bg-[#D5DEEF] px-3 py-1.5 text-[11px] font-black text-[#395886] whitespace-nowrap">
            {job.type || t("fullTime", "Full Time")}
          </span>
        </div>
        <button onClick={handleShare} className="rounded-full bg-white p-1.5 text-[#395886] shadow-sm transition hover:bg-[#F0F3FA] hover:text-[#638ECB]">
          <Share2 size={16} />
        </button>
      </div>

      <div className="relative z-10 mt-5 flex h-14 w-14 overflow-hidden items-center justify-center rounded-2xl bg-gradient-to-r from-[#8AAEE0] via-[#638ECB] to-[#395886] text-white shadow-[0_14px_30px_rgba(57,88,134,.25)]">
        {job.logo || job.logo_url ? <img src={job.logo || job.logo_url} alt={job.company} className="h-full w-full object-cover" /> : <Building2 size={22} />}
      </div>

      <p className="relative z-10 mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#638ECB]">{job.company || t("company", "Company")}</p>
      <h3 className={`relative z-10 mt-2 text-lg font-black leading-7 text-[#395886] ${isExpanded ? "" : "line-clamp-2 min-h-[56px]"}`}>
        {job.title || t("jobTitle", "Job Title")}
      </h3>

      {skillsArray.length > 0 && (
        <div className="relative z-10 mt-2 flex flex-wrap gap-1.5">
          {skillsArray.map((skill, index) => (
            <span key={index} className="rounded-md bg-[#F0F3FA] px-2 py-1 text-[10px] font-bold text-[#395886]/70 uppercase tracking-wider">{skill.trim()}</span>
          ))}
        </div>
      )}

      <p className={`relative z-10 mt-2 text-sm font-medium text-[#395886]/80 ${isExpanded ? "h-auto whitespace-pre-line" : "line-clamp-3"}`}>
        {job.description}
      </p>

      <p className="relative z-10 mt-2 flex items-start gap-2 text-sm font-semibold text-[#395886]/70">
        <MapPin size={16} className="mt-0.5 shrink-0 text-[#638ECB]" />
        <span>{job.location || "Sri Lanka"}</span>
      </p>

      <p className="relative z-10 mt-3 text-sm font-black text-[#638ECB]">{job.salary || t("negotiable", "Negotiable")}</p>

      <button onClick={() => setIsExpanded(!isExpanded)} className="relative z-10 mt-3 self-start text-xs font-black uppercase tracking-wider text-[#395886] hover:text-[#638ECB]">
        {isExpanded ? t("showLess", "Show Less ▲") : t("readMore", "Read More ▼")}
      </button>

      <div className="relative z-10 mt-auto pt-5 flex gap-2">
        <button type="button" onClick={() => onSave(job.id)} className={`flex w-1/3 items-center justify-center rounded-2xl border px-2 py-3 text-sm font-black transition ${isSaved ? "border-[#638ECB] bg-[#D5DEEF] text-[#395886]" : "border-[#B1C9EF] bg-white/70 text-[#395886] hover:bg-[#F0F3FA]"}`}>
          <Heart size={18} fill={isSaved ? "#395886" : "none"} />
        </button>
        <button type="button" onClick={() => onApply(job)} className="flex w-2/3 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#638ECB] to-[#395886] px-4 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(57,88,134,.25)] transition hover:scale-[1.02]">
          <span className="truncate">{t("applyNow", "Apply Now")}</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
};

// ---------------------------------------------
// MAIN JOBS COMPONENT
// ---------------------------------------------
export default function Jobs({ search }) {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); 

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchJobs();
    if (user) fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const { data } = await supabase.from("saved_jobs").select("job_id").eq("user_id", user.id);
      if (data) setSavedJobs(data.map(item => item.job_id));
    } catch (err) { console.error(err); }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
      setJobs(data || []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const saveJob = async (jobId) => {
    if (!user) { toast.error(t("loginFirst", "Please login first!")); return; }
    try {
      const { error } = await supabase.from("saved_jobs").insert([{ user_id: user.id, job_id: jobId }]);
      if (error && error.code !== '23505') throw error;
      setSavedJobs((prev) => [...prev, jobId]);
      toast.success(t("jobSaved", "Job saved successfully!"));
    } catch (error) { toast.error(t("saveFailed", "Failed to save.")); }
  };

  // 🛡️ Apply logic with Login Check
  const handleApplyClick = (job) => {
    if (!user) {
      toast.error(t("loginFirst", "Please login first!"));
      return;
    }
    setSelectedJob(job);
  };

  const filteredJobs = (jobs || []).filter((job) => {
    if (!job) return false;
    const keyword = search?.keyword?.trim().toLowerCase() || "";
    const location = search?.location?.trim().toLowerCase() || "";
    return (keyword === "" || job.title?.toLowerCase().includes(keyword)) && 
           (location === "" || location === "sri lanka" || job.location?.toLowerCase().includes(location));
  });

  return (
    <>
      <Toaster position="top-center" toastOptions={{ style: { zIndex: 9999, marginTop: '80px', fontWeight: 'bold' } }} />
      <section id="jobs" className="relative bg-[#F0F3FA] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-black text-center text-[#395886] md:text-5xl">{t("recent", "Recent")} <span className="text-[#638ECB]">{t("jobs", "Jobs")}</span></h2>
          <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? [...Array(4)].map((_, i) => <div key={i} className="h-[370px] bg-white/50 animate-pulse rounded-[28px]" />) : 
            filteredJobs.slice(0, visibleCount).map((job) => (
              <JobCard key={job.id} job={job} isSaved={savedJobs.includes(job.id)} onSave={saveJob} onApply={handleApplyClick} t={t} />
            ))}
          </div>
          {visibleCount < filteredJobs.length && (
            <div className="mt-10 flex justify-center">
              <button onClick={() => setVisibleCount(prev => prev + 8)} className="rounded-2xl border-2 border-[#638ECB] px-8 py-3 font-black text-[#395886] hover:bg-[#638ECB] hover:text-white transition">
                {t("loadMore", "Load More Jobs")}
              </button>
            </div>
          )}
        </div>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </section>
    </>
  );
}