import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../api/supabaseClient";

import {
  Clock,
  MapPin,
  Heart,
  SearchX,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import ApplyModal from "../ApplyModal/ApplyModal";

// 📝 Sub-component for individual job cards to manage "Read More" state
const JobCard = ({ job, isSaved, onSave, onApply, t }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="group relative flex min-h-[370px] flex-col overflow-hidden rounded-[28px] border border-[#D5DEEF] bg-white/80 p-5 shadow-[0_15px_40px_rgba(57,88,134,.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#638ECB] hover:bg-white">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#B1C9EF] to-[#638ECB] opacity-0 transition duration-700 group-hover:opacity-25" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#8AAEE0]/35 blur-3xl" />

      {/* Badges (Fixed truncation issue) */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F3FA] px-3 py-1.5 text-[11px] font-bold text-[#395886]/75">
          <Clock size={12} className="shrink-0" />
          <span>{job.days_left || t("new", "New")}</span>
        </span>

        <span className="rounded-full bg-[#D5DEEF] px-3 py-1.5 text-[11px] font-black text-[#395886] whitespace-nowrap">
          {job.type || t("fullTime", "Full Time")}
        </span>
      </div>

      {/* Logo (Added Image Support) */}
      <div className="relative z-10 mt-5 flex h-14 w-14 shrink-0 overflow-hidden items-center justify-center rounded-2xl bg-gradient-to-r from-[#8AAEE0] via-[#638ECB] to-[#395886] text-white shadow-[0_14px_30px_rgba(57,88,134,.25)]">
        {job.logo || job.logo_url ? (
          <img
            src={job.logo || job.logo_url}
            alt={job.company}
            className="h-full w-full object-cover"
          />
        ) : (
          <Building2 size={22} />
        )}
      </div>

      {/* Company Name */}
      <p className="relative z-10 mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#638ECB] break-words">
        {job.company || t("company", "Company")}
      </p>

      {/* Job Title (Read More logic applied) */}
      <h3
        className={`relative z-10 mt-2 text-lg font-black leading-7 text-[#395886] break-words ${
          isExpanded ? "" : "line-clamp-2 min-h-[56px]"
        }`}
      >
        {job.title || t("jobTitle", "Job Title")}
      </h3>

      {/* Job Description (If you have this field in Supabase) */}
      {job.description && (
        <p
          className={`relative z-10 mt-2 text-sm font-medium text-[#395886]/80 break-words ${
            isExpanded ? "" : "line-clamp-2"
          }`}
        >
          {job.description}
        </p>
      )}

      {/* Location */}
      <p
        className={`relative z-10 mt-2 flex items-start gap-2 text-sm font-semibold text-[#395886]/70 ${
          isExpanded ? "" : "line-clamp-2 min-h-[24px]"
        }`}
      >
        <MapPin size={16} className="mt-0.5 shrink-0 text-[#638ECB]" />
        <span className="break-words">{job.location || "Sri Lanka"}</span>
      </p>

      {/* Salary */}
      <p className="relative z-10 mt-3 text-sm font-black text-[#638ECB] break-words">
        {job.salary || t("negotiable", "Negotiable")}
      </p>

      {/* Read More / Show Less Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative z-10 mt-3 self-start text-xs font-black uppercase tracking-wider text-[#395886] hover:text-[#638ECB] transition-colors"
      >
        {isExpanded ? t("showLess", "Show Less ▲") : t("readMore", "Read More ▼")}
      </button>

      {/* Action Buttons */}
      <div className="relative z-10 mt-auto pt-5">
        <button
          type="button"
          disabled={isSaved}
          onClick={() => onSave(job.id)}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition ${
            isSaved
              ? "border-[#638ECB] bg-[#D5DEEF] text-[#395886]"
              : "border-[#B1C9EF] bg-white/70 text-[#395886] hover:bg-[#F0F3FA]"
          }`}
        >
          <Heart size={15} fill={isSaved ? "#395886" : "none"} />
          <span className="truncate">
            {isSaved ? t("saved", "Saved") : t("saveJob", "Save Job")}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onApply(job)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#638ECB] to-[#395886] px-4 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(57,88,134,.25)] transition hover:scale-[1.02]"
        >
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

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchJobs();
  }, []);

  // 🚀 SUPABASE FETCH JOBS
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("SUPABASE FETCH ERROR:", error);
        throw error;
      }

      console.log("Supabase Data Received:", data);
      setJobs(data || []);
    } catch (error) {
      console.log("FETCH JOBS CATCH ERROR:", error.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // 💾 SUPABASE SAVE JOB
  const saveJob = async (jobId) => {
    if (!user) {
      alert(t("loginFirst", "Please login first"));
      return;
    }

    try {
      const { error } = await supabase
        .from("saved_jobs")
        .insert([{ user_id: user.id, job_id: jobId }]);

      if (error) throw error;

      setSavedJobs((prev) => [...prev, jobId]);
      alert(t("jobSaved", "Job saved successfully"));
    } catch (error) {
      console.error("SAVE JOB ERROR:", error);
      alert(
        t("saveFailed", "Save failed. Ensure 'saved_jobs' table exists in Supabase.")
      );
    }
  };

  // 🔍 FILTER LOGIC
  const filteredJobs = (jobs || []).filter((job) => {
    if (!job) return false;

    const keyword = search?.keyword?.trim().toLowerCase() || "";
    const location = search?.location?.trim().toLowerCase() || "";

    const title = job.title?.toLowerCase() || "";
    const company = job.company?.toLowerCase() || "";
    const jobLocation = job.location?.toLowerCase() || "";
    const category = job.category?.toLowerCase() || "";

    const matchKeyword =
      keyword === "" ||
      title.includes(keyword) ||
      company.includes(keyword) ||
      category.includes(keyword);

    const matchLocation =
      location === "" ||
      location === "sri lanka" ||
      jobLocation.includes(location);

    return matchKeyword && matchLocation;
  });

  return (
    <section id="jobs" className="relative overflow-hidden bg-[#F0F3FA] px-4 py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[340px] w-[340px] rounded-full bg-[#8AAEE0]/35 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[340px] w-[340px] rounded-full bg-[#638ECB]/25 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#B1C9EF] bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.10)] backdrop-blur-xl">
            <BriefcaseBusiness size={14} />
            {t("jobs", "Jobs")}
          </div>

          <h2 className="text-3xl font-black leading-tight text-[#395886] md:text-5xl">
            {t("recent", "Recent")}{" "}
            <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">
              {t("jobs", "Jobs")}
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-6 text-[#395886]/70">
            {t("findApply", "Find and apply for the best jobs easily.")}
          </p>
        </div>

        {loading ? (
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center rounded-[28px] border border-[#D5DEEF] bg-white/75 p-10 text-center shadow-[0_20px_50px_rgba(57,88,134,.12)] backdrop-blur-xl">
            <RefreshCw className="animate-spin text-[#395886]" size={42} />
            <h2 className="mt-5 text-2xl font-black text-[#395886]">
              {t("loading", "Loading...")}
            </h2>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center rounded-[28px] border border-[#D5DEEF] bg-white/75 p-10 text-center shadow-[0_20px_50px_rgba(57,88,134,.12)] backdrop-blur-xl">
            <div className="rounded-3xl bg-[#D5DEEF] p-5 text-[#395886]">
              <SearchX size={46} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#395886]">
              {t("noJobs", "No Jobs Found")}
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#395886]/70">
              {t("tryKeyword", "Try another keyword or location.")}
            </p>

            <button
              type="button"
              onClick={fetchJobs}
              className="mt-5 rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] px-6 py-3 text-sm font-black text-white shadow-[0_14px_30px_rgba(57,88,134,.25)] transition hover:scale-[1.03]"
            >
              {t("refreshJobs", "Refresh Jobs")}
            </button>
          </div>
        ) : (
          <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onSave={saveJob}
                onApply={setSelectedJob}
                t={t}
              />
            ))}
          </div>
        )}
      </div>

      {selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </section>
  );
}