import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

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

// 🌐 API BASE URL
const API_BASE_URL = "https://jpbcenterback-production.up.railway.app";

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

  // 🔥 FETCH JOBS (FIXED + SAFE)
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE_URL}/api/jobs`);

      console.log("RAW RESPONSE:", res);
      console.log("DATA:", res.data);

      // ✅ SAFE parsing (MOST IMPORTANT FIX)
      const jobsData = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];

      setJobs(jobsData);
    } catch (error) {
      console.log("FETCH JOBS ERROR:", error.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // 💾 SAVE JOB
  const saveJob = async (jobId) => {
    if (!user) {
      alert(t("loginFirst", "Please login first"));
      return;
    }

    const userId = user.id || user._id || user.ID;

    try {
      await axios.post(`${API_BASE_URL}/api/saved-jobs`, {
        user_id: userId,
        job_id: jobId,
      });

      setSavedJobs((prev) => [...prev, jobId]);

      alert(t("jobSaved", "Job saved successfully"));
    } catch (error) {
      alert(error.response?.data?.message || t("saveFailed", "Save failed"));
    }
  };

  // 🔍 FILTER JOBS
  const filteredJobs = jobs.filter((job) => {
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
    <section
      id="jobs"
      className="relative overflow-hidden bg-[#F0F3FA] px-4 py-20"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[340px] w-[340px] rounded-full bg-[#8AAEE0]/35 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 h-[340px] w-[340px] rounded-full bg-[#638ECB]/25 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#395886]">
            <BriefcaseBusiness size={14} />
            {t("jobs", "Jobs")}
          </div>

          <h2 className="text-3xl font-black text-[#395886] md:text-5xl">
            {t("recent", "Recent")}{" "}
            <span className="text-[#638ECB]">{t("jobs", "Jobs")}</span>
          </h2>

          <p className="mt-4 text-sm font-semibold text-[#395886]/70">
            {t("findApply", "Find and apply for the best jobs easily.")}
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl bg-white/70 p-10">
            <RefreshCw className="animate-spin text-[#395886]" size={40} />
            <h2 className="mt-4 text-xl font-black text-[#395886]">
              {t("loading", "Loading...")}
            </h2>
          </div>
        ) : filteredJobs.length === 0 ? (
          /* EMPTY STATE */
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl bg-white/70 p-10 text-center">
            <SearchX size={50} className="text-[#395886]" />

            <h2 className="mt-4 text-2xl font-black text-[#395886]">
              {t("noJobs", "No Jobs Found")}
            </h2>

            <p className="mt-2 text-sm text-[#395886]/70">
              {t("tryKeyword", "Try another keyword or location.")}
            </p>

            <button
              onClick={fetchJobs}
              className="mt-5 rounded-xl bg-[#395886] px-5 py-2 text-white"
            >
              {t("refreshJobs", "Refresh Jobs")}
            </button>
          </div>
        ) : (
          /* JOB GRID */
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredJobs.map((job, index) => {
              const jobId = job?.id || job?._id || job?.job_id || index;
              const isSaved = savedJobs.includes(jobId);

              return (
                <div
                  key={jobId}
                  className="rounded-2xl bg-white/80 p-5 shadow"
                >
                  {/* Company */}
                  <div className="flex items-center gap-2 text-[#638ECB]">
                    <Building2 size={16} />
                    <span className="text-xs font-bold">
                      {job.company || "Company"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-black text-[#395886]">
                    {job.title || "Job Title"}
                  </h3>

                  {/* Location */}
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} />
                    {job.location || "Sri Lanka"}
                  </p>

                  {/* Salary */}
                  <p className="mt-2 text-sm font-bold text-[#638ECB]">
                    {job.salary || "Negotiable"}
                  </p>

                  {/* SAVE BUTTON */}
                  <button
                    onClick={() => saveJob(jobId)}
                    disabled={isSaved}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold ${
                      isSaved
                        ? "bg-gray-200 text-gray-600"
                        : "bg-[#D5DEEF] text-[#395886]"
                    }`}
                  >
                    <Heart size={14} />
                    {isSaved ? "Saved" : "Save Job"}
                  </button>

                  {/* APPLY */}
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#395886] px-4 py-2 text-sm font-bold text-white"
                  >
                    Apply Now
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* APPLY MODAL */}
      {selectedJob && (
        <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </section>
  );
}