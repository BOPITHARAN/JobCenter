import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import {
  MapPin,
  Heart,
  SearchX,
  Building2,
  BriefcaseBusiness,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import ApplyModal from "../ApplyModal/ApplyModal";

const API_BASE_URL =
  "https://jpbcenterback-production.up.railway.app";

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

  // =====================
  // FETCH JOBS (ULTRA SAFE)
  // =====================
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE_URL}/api/jobs`
      );

      console.log("RAW RESPONSE:", res.data);

      // 🔥 MULTI-LAYER SAFE PARSING
      let data = res?.data;

      if (data?.data) data = data.data;
      if (data?.jobs) data = data.jobs;

      const safeJobs = Array.isArray(data) ? data : [];

      setJobs(safeJobs);
    } catch (error) {
      console.log("FETCH JOBS ERROR:", error.message);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // SAVE JOB
  // =====================
  const saveJob = async (jobId) => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      // ✅ Added headers to prevent CORS issues on POST request
      await axios.post(
        `${API_BASE_URL}/api/saved-jobs`,
        {
          user_id: user.id || user._id,
          job_id: jobId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSavedJobs((prev) => [...prev, jobId]);
      alert("Job saved successfully");
    } catch (error) {
      alert(
        error.response?.data?.message || "Save failed"
      );
    }
  };

  // =====================
  // FILTER (SAFE)
  // =====================
  const filteredJobs = (jobs || []).filter((job) => {
    if (!job) return false;

    const keyword =
      search?.keyword?.toLowerCase() || "";
    const location =
      search?.location?.toLowerCase() || "";

    const title =
      job?.title?.toLowerCase() || "";
    const company =
      job?.company?.toLowerCase() || "";
    const jobLocation =
      job?.location?.toLowerCase() || "";

    const matchKeyword =
      keyword === "" ||
      title.includes(keyword) ||
      company.includes(keyword);

    const matchLocation =
      location === "" ||
      jobLocation.includes(location);

    return matchKeyword && matchLocation;
  });

  return (
    <section className="bg-[#F0F3FA] px-4 py-20">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-black text-[#395886]">
            <BriefcaseBusiness size={14} />
            {t("jobs", "Jobs")}
          </div>

          <h2 className="mt-4 text-4xl font-black text-[#395886]">
            {t("recent", "Recent Jobs")}
          </h2>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="mt-12 flex flex-col items-center">
            <RefreshCw
              className="animate-spin text-[#395886]"
              size={40}
            />
            <p className="mt-3 font-bold text-[#395886]">
              Loading...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (
          // EMPTY STATE
          <div className="mt-12 text-center">
            <SearchX
              size={50}
              className="mx-auto text-[#395886]"
            />

            <h2 className="mt-4 text-2xl font-black text-[#395886]">
              No Jobs Found
            </h2>

            <button
              onClick={fetchJobs}
              className="mt-4 rounded-xl bg-[#395886] px-5 py-2 text-white"
            >
              Refresh Jobs
            </button>
          </div>
        ) : (
          // JOB GRID
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredJobs.map((job, index) => {
              const jobId =
                job?.id || job?._id || index;

              const isSaved =
                savedJobs.includes(jobId);

              return (
                <div
                  key={jobId}
                  className="rounded-2xl bg-white p-5 shadow"
                >

                  {/* COMPANY */}
                  <div className="flex items-center gap-2 text-[#638ECB]">
                    <Building2 size={16} />
                    <span className="text-xs font-bold">
                      {job?.company || "Company"}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-2 text-lg font-black text-[#395886]">
                    {job?.title || "Job Title"}
                  </h3>

                  {/* LOCATION */}
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                    <MapPin size={14} />
                    {job?.location || "Sri Lanka"}
                  </p>

                  {/* SALARY */}
                  <p className="mt-2 text-sm font-bold text-[#638ECB]">
                    {job?.salary || "Negotiable"}
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

                  {/* APPLY BUTTON */}
                  <button
                    onClick={() =>
                      setSelectedJob(job)
                    }
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#395886] px-4 py-2 text-sm font-bold text-white"
                  >
                    Apply
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
        <ApplyModal
          job={selectedJob}
          onClose={() =>
            setSelectedJob(null)
          }
        />
      )}
    </section>
  );
}