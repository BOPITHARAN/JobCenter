import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Briefcase,
  MapPin,
  Building2,
  RefreshCcw,
  Search,
  Clock3,
  Wallet,
  Tag,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

/* ✅ BASE URL (ONLY ONCE - CLEAN) */
const API_BASE_URL = "https://jpbcenterback-production.up.railway.app/api";

/* ✅ AXIOS INSTANCE */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  /* ✅ SAFE VALUE HANDLER */
  const getValue = (value, fallback = "N/A") => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "Pending"
    ) {
      return fallback;
    }
    return value;
  };

  /* ✅ SAFE ID DETECTOR (FIXED) */
  const resolveJobId = (job) => {
    if (!job) return null;

    if (job.id) return job.id;
    if (job._id) return job._id;
    if (job.job_id) return job.job_id;
    if (job.jobid) return job.jobid;
    if (job.ID) return job.ID;

    const key = Object.keys(job).find((k) =>
      k.toLowerCase().includes("id")
    );

    return key ? job[key] : null;
  };

  /* ✅ STATUS MESSAGE */
  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  /* ✅ FETCH JOBS */
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await api.get("/jobs");

      if (res.data?.success) {
        setJobs(res.data.data || []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showStatus("Failed to load jobs from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ✅ DELETE JOB */
  const deleteJob = async (id) => {
    if (!id) {
      showStatus("Invalid Job ID", "error");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await api.delete(`/jobs/${id}`);

      if (res.data?.success) {
        showStatus("Job deleted successfully", "success");
        fetchJobs();
      } else {
        showStatus(res.data?.message || "Delete failed", "error");
      }
    } catch (err) {
      console.error(err);
      showStatus("Server error while deleting job", "error");
    }
  };

  /* ✅ SEARCH FILTER */
  const filteredJobs = jobs.filter((job) => {
    const q = search.toLowerCase();

    return (
      getValue(job.company).toLowerCase().includes(q) ||
      getValue(job.title).toLowerCase().includes(q) ||
      getValue(job.location).toLowerCase().includes(q) ||
      getValue(job.type).toLowerCase().includes(q) ||
      getValue(job.category).toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F0F3FA] p-4 md:p-6 text-[#395886]">

      <div className="mx-auto max-w-[1400px] space-y-5">

        {/* HEADER */}
        <section className="rounded-3xl bg-white p-6 border">
          <h1 className="text-3xl font-black">Manage Jobs</h1>
          <p className="text-sm opacity-60">Admin Dashboard</p>

          <div className="mt-4 flex gap-4">
            <div>Total: {jobs.length}</div>
            <div>Showing: {filteredJobs.length}</div>
          </div>
        </section>

        {/* STATUS */}
        {message.text && (
          <div
            className={`p-3 rounded-xl flex gap-2 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 />
            ) : (
              <AlertCircle />
            )}
            {message.text}
          </div>
        )}

        {/* SEARCH */}
        <div className="flex gap-3">
          <input
            className="border p-2 w-full rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs..."
          />

          <button
            onClick={fetchJobs}
            disabled={loading}
            className="px-4 border rounded"
          >
            <RefreshCcw className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl p-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th>Company</th>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="5">No jobs found</td>
                </tr>
              ) : (
                filteredJobs.map((job, i) => {
                  const id = resolveJobId(job);

                  return (
                    <tr key={id || i} className="border-b">
                      <td>{job.company}</td>
                      <td>{job.title}</td>
                      <td>{job.location}</td>
                      <td>{job.type}</td>
                      <td>
                        <button
                          onClick={() => deleteJob(id)}
                          className="text-red-600"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}