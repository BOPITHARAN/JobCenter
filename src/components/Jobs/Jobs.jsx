import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../api/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Clock, MapPin, Heart, Building2, ArrowRight, Share2, ChevronDown, ChevronUp } from "lucide-react";
import ApplyModal from "../ApplyModal/ApplyModal";

// Keep the existing logo fields, but display their image as a full flyer.
// If your job already has flyer_url, it takes priority. No schema change required.
const JobCard = ({ job, isSaved, onSave, onApply, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [failedImage, setFailedImage] = useState(null);
  const flyer = job.flyer_url || job.logo || job.logo_url;
  const skillsArray = job.skills
    ? (typeof job.skills === "string" ? job.skills.split(",") : job.skills).slice(0, 3)
    : [];

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

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#DFE7F2] bg-white shadow-[0_8px_30px_rgba(36,62,102,0.05)] transition duration-300 hover:border-[#AAC1E2] hover:shadow-[0_18px_45px_rgba(36,62,102,0.12)]">
      {/* Flyer: contain preserves all text, including portrait and landscape posters. */}
      <div className="relative border-b border-[#E7EDF5] bg-[#EDF2F8] p-3">
        <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[16px] border border-[#E0E7F0] bg-white">
          {flyer && failedImage !== flyer ? (
            <img
              src={flyer}
              alt={`${job.title || t("jobTitle", "Job Title")} — ${job.company || t("company", "Company")}`}
              className="h-full w-full object-contain"
              loading="lazy"
              decoding="async"
              onError={() => setFailedImage(flyer)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#F4F7FC] to-[#DDE8F7] p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white text-[#5279AF] shadow-sm"><Building2 size={34} /></div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6383AF]">{job.company || t("company", "Company")}</p>
              <p className="text-2xl font-bold leading-snug text-[#243E66]">{job.title || t("jobTitle", "Job Title")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-lg bg-[#EAF1FC] px-3 py-1.5 text-xs font-bold text-[#395E94]">{job.type || t("fullTime", "Full Time")}</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#687B95]"><Clock size={13} />{job.days_left || t("new", "New")}</span>
        </div>

        <p className="break-words text-xs font-bold uppercase tracking-[0.12em] text-[#6783A9]">{job.company || t("company", "Company")}</p>
        <h3 className={`mt-2 break-words text-xl font-bold leading-7 text-[#233D63] ${isExpanded ? "" : "line-clamp-2 min-h-[56px]"}`}>{job.title || t("jobTitle", "Job Title")}</h3>
        <p className="mt-3 flex items-start gap-2 text-sm text-[#64758D]"><MapPin size={16} className="mt-0.5 shrink-0 text-[#7291BC]" /><span className="break-words">{job.location || "Sri Lanka"}</span></p>

        {skillsArray.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {skillsArray.map((skill, index) => <span key={index} className="max-w-full break-words rounded-md border border-[#E5EBF3] bg-[#F8FAFD] px-2.5 py-1 text-[11px] font-medium text-[#60728C]">{skill.trim()}</span>)}
          </div>
        )}

        <p className={`mt-4 break-words text-sm leading-6 text-[#6B7B91] ${isExpanded ? "whitespace-pre-line" : "line-clamp-2"}`}>{job.description}</p>
        <button type="button" onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded} className="mt-2 inline-flex min-h-[36px] items-center gap-1.5 self-start rounded-md text-xs font-bold text-[#42689F] hover:text-[#233D63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#638ECB]">
          {isExpanded ? t("showLess", "Show Less") : t("readMore", "Read More")}
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-center justify-between gap-3 border-t border-[#E8EDF4] pt-4">
            <p className="break-words text-base font-bold text-[#2C4C79]">{job.salary || t("negotiable", "Negotiable")}</p>
            <button type="button" onClick={handleShare} aria-label={t("shareJob", "Share job")} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E4EAF3] text-[#6A84A8] transition hover:bg-[#F0F4FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#638ECB]"><Share2 size={17} /></button>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => onSave(job.id)} aria-label={isSaved ? t("jobSaved", "Job saved") : t("saveJob", "Save job")} aria-pressed={isSaved} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#638ECB] ${isSaved ? "border-[#B5C9E5] bg-[#EAF1FC] text-[#395886]" : "border-[#DDE5F0] bg-white text-[#7B91AF] hover:bg-[#F3F6FB]"}`}><Heart size={20} fill={isSaved ? "currentColor" : "none"} /></button>
            <button type="button" onClick={() => onApply(job)} className="flex min-h-[48px] min-w-0 flex-1 items-center justify-center gap-3 rounded-xl bg-[#395886] px-4 py-3 text-sm font-bold text-white shadow-[0_6px_16px_rgba(57,88,134,0.18)] transition hover:bg-[#29456F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#638ECB] focus-visible:ring-offset-2"><span>{t("applyNow", "Apply Now")}</span><ArrowRight size={17} className="shrink-0" /></button>
          </div>
        </div>
      </div>
    </article>
  );
};

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
      <section id="jobs" className="relative bg-[#F5F7FB] px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-b border-[#DDE5F0] pb-7 md:mb-10">
            <div>
              <div aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-[#638ECB]" />
              <h2 className="text-3xl font-bold tracking-tight text-[#243E66] md:text-5xl">{t("recent", "Recent")} <span className="text-[#638ECB]">{t("jobs", "Jobs")}</span></h2>
            </div>
            {!loading && <span className="rounded-full border border-[#DCE5F2] bg-white px-4 py-2 text-sm font-semibold text-[#6380A6]">{filteredJobs.length} {t("jobs", "Jobs")}</span>}
          </div>

          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? [...Array(4)].map((_, i) => (
              <div key={i} aria-hidden="true" className="overflow-hidden rounded-[24px] border border-[#DFE7F2] bg-white p-3 motion-safe:animate-pulse">
                <div className="aspect-[4/5] rounded-2xl bg-[#E7EDF5]" />
                <div className="space-y-4 p-3 pt-6"><div className="h-3 w-1/3 rounded bg-[#E7EDF5]" /><div className="h-6 w-4/5 rounded bg-[#E7EDF5]" /><div className="h-4 w-2/3 rounded bg-[#E7EDF5]" /><div className="h-12 rounded-xl bg-[#E7EDF5]" /></div>
              </div>
            )) : filteredJobs.slice(0, visibleCount).map((job) => (
              <JobCard key={job.id} job={job} isSaved={savedJobs.includes(job.id)} onSave={saveJob} onApply={handleApplyClick} t={t} />
            ))}
          </div>

          {!loading && filteredJobs.length === 0 && <div className="rounded-[24px] border border-dashed border-[#C9D6E8] bg-white px-6 py-16 text-center text-[#6380A6]"><Building2 size={32} className="mx-auto mb-4" /><p className="font-semibold">{t("noJobsFound", "No jobs found.")}</p></div>}
          {visibleCount < filteredJobs.length && (
            <div className="mt-10 flex justify-center">
              <button type="button" onClick={() => setVisibleCount(prev => prev + 8)} className="inline-flex items-center gap-3 rounded-xl border border-[#C8D6E9] bg-white px-7 py-3.5 text-sm font-bold text-[#395886] transition hover:border-[#395886] hover:bg-[#395886] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#638ECB]">{t("loadMore", "Load More Jobs")}<ChevronDown size={17} /></button>
            </div>
          )}
        </div>
        {selectedJob && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </section>
    </>
  );
}