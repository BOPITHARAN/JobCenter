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

// Local testing endpoint. Switch to Railway URL when deploying to production
const API_URL = "http://localhost:5000"; 
// const API_URL = "https://jpbcenterback-production.up.railway.app";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const getValue = (value, fallback = "N/A") => {
    if (value === undefined || value === null || value === "" || value === "Pending") {
      return fallback;
    }
    return value;
  };

  // 🧠 SMART AUTO-ID DETECTOR ENGINE
  // Automatically finds the primary key column even if it is named 'jobid', 'ID', 'id_job', etc.
  const resolveJobId = (job) => {
    if (!job) return null;
    
    // 1. Check for standard common variants
    if (job.id !== undefined && job.id !== null) return job.id;
    if (job._id !== undefined && job._id !== null) return job._id;
    if (job.job_id !== undefined && job.job_id !== null) return job.job_id;
    if (job.jobid !== undefined && job.jobid !== null) return job.jobid;
    if (job.ID !== undefined && job.ID !== null) return job.ID;

    // 2. Dynamic Deep Scan: Find any column key that contains the phrase 'id' (Case-Insensitive)
    const dynamicKey = Object.keys(job).find(
      (key) => key.toLowerCase() === "id" || key.toLowerCase().includes("id")
    );
    
    return dynamicKey ? job[dynamicKey] : null;
  };

  // 1. FETCH JOB POSTS FROM DATABASE
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/jobs`, {
        headers: { "Cache-Control": "no-cache" },
      });

      if (res.data && res.data.success) {
        setJobs(res.data.data || []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error loading jobs:", err);
      showStatus("Failed to load job listings from the server!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  // 2. DELETE JOB POST HANDLER
  const deleteJob = async (id) => {
    if (!id || id === "null" || id === "undefined") {
      showStatus("Critical Error: Database ID token parameter reference is completely missing!", "error");
      return;
    }

    if (!window.confirm("Are you sure you want to permanently delete this job vacancy?")) return;

    try {
      const res = await axios.delete(`${API_URL}/api/jobs/${id}`);
      
      if (res.data && res.data.success) {
        showStatus("Job post deleted successfully from systems! 🗑️", "success");
        await fetchJobs(); 
      } else {
        showStatus(res.data.message || "Failed to remove the job post from database.", "error");
      }
    } catch (err) {
      console.error("Delete job error:", err);
      showStatus("Server error occurred while trying to remove the job post!", "error");
    }
  };

  // 3. SEARCH FILTER FILTERING LOGIC
  const filteredJobs = jobs.filter((job) => {
    if (!job) return false;
    const q = search.toLowerCase();

    const company = getValue(job.company, "").toLowerCase();
    const title = getValue(job.title, "").toLowerCase();
    const location = getValue(job.location, "").toLowerCase();
    const type = getValue(job.type, "").toLowerCase();
    const category = getValue(job.category, "").toLowerCase();

    return (
      company.includes(q) ||
      title.includes(q) ||
      location.includes(q) ||
      type.includes(q) ||
      category.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F0F3FA] p-4 text-[#395886] md:p-6 font-sans">
      <div className="mx-auto max-w-[1400px] space-y-5">
        
        {/* Statistics Header Section */}
        <section className="rounded-3xl border border-[#D5DEEF] bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D5DEEF] bg-[#F0F3FA] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#638ECB]">
                <Briefcase size={16} /> Admin Workspace
              </p>
              <h1 className="mt-4 text-3xl font-black text-[#395886] md:text-4xl">Manage Jobs</h1>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-[#395886]/60">View, search and manage all active corporate job vacancies in one interface.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] px-5 py-4 min-w-[100px]">
                <p className="text-xs font-black uppercase tracking-widest text-[#638ECB]">Total</p>
                <h2 className="text-2xl font-black text-[#395886]">{jobs.length}</h2>
              </div>
              <div className="rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] px-5 py-4 min-w-[100px]">
                <p className="text-xs font-black uppercase tracking-widest text-[#638ECB]">Showing</p>
                <h2 className="text-2xl font-black text-[#395886]">{filteredJobs.length}</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic English Status Alert Notification Bar */}
        {message.text && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 border transition-all duration-300 ${
            message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-bold">{message.text}</span>
          </div>
        )}

        {/* Filter Input Control Search Panel */}
        <section className="rounded-3xl border border-[#D5DEEF] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex min-h-[52px] flex-1 items-center gap-3 rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] px-4">
              <Search size={19} className="shrink-0 text-[#638ECB]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search company, title, category or location..." className="w-full bg-transparent text-sm font-bold text-[#395886] outline-none placeholder:text-[#395886]/40" />
            </div>
            <button type="button" onClick={fetchJobs} disabled={loading} className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-2xl bg-[#395886] px-6 text-sm font-black text-white shadow-md transition hover:bg-[#638ECB]">
              <RefreshCcw size={17} className={loading ? "animate-spin" : ""} /> {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </section>

        {/* Desktop View Table Grid Layout */}
        <section className="hidden overflow-hidden rounded-3xl border border-[#D5DEEF] bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="bg-[#F0F3FA]">
                <tr className="text-xs font-black uppercase tracking-widest text-[#638ECB]">
                  <th className="px-5 py-4">Company</th><th className="px-5 py-4">Job Title</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Category</th><th className="px-5 py-4">Salary</th><th className="px-5 py-4">Days Left</th><th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5DEEF]">
                {loading ? (
                  <tr><td colSpan="8" className="px-5 py-10 text-center font-black text-[#395886]/60">Loading vacancies dataset...</td></tr>
                ) : filteredJobs.length === 0 ? (
                  <tr><td colSpan="8" className="px-5 py-10 text-center font-black text-[#395886]/60">No vacancies found matching query.</td></tr>
                ) : (
                  filteredJobs.map((job, index) => {
                    // Utilizing the smart engine to guarantee active extraction of primary tokens
                    const jobId = resolveJobId(job);
                    
                    return (
                      <tr key={jobId ? `desktop-job-${jobId}` : `desktop-idx-${index}`} className="transition hover:bg-[#F0F3FA]/70">
                        <td className="px-5 py-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D5DEEF] text-[#395886]"><Building2 size={20} /></div>
                            <div className="min-w-0">
                              <p className="max-w-[220px] break-words font-black text-[#395886]">{getValue(job.company)}</p>
                              {/* Display exact ID or informative fallback directly on the screen */}
                              <p className="text-xs font-bold text-[#638ECB]">
                                ID: {jobId ? getValue(jobId) : `Key Error! Available columns: ${Object.keys(job || {}).join(", ")}`}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4"><p className="max-w-[220px] break-words font-bold text-[#395886]">{getValue(job.title)}</p></td>
                        <td className="px-5 py-4"><p className="flex max-w-[180px] items-start gap-2 text-sm font-bold text-[#395886]/70"><MapPin size={16} className="mt-0.5 shrink-0" />{getValue(job.location)}</p></td>
                        <td className="px-5 py-4"><span className="inline-flex rounded-full bg-[#D5DEEF] px-4 py-2 text-xs font-black text-[#395886]">{getValue(job.type)}</span></td>
                        <td className="px-5 py-4"><p className="max-w-[150px] break-words text-sm font-bold text-[#395886]/70">{getValue(job.category)}</p></td>
                        <td className="px-5 py-4"><p className="max-w-[150px] break-words font-black text-[#395886]">{getValue(job.salary)}</p></td>
                        <td className="px-5 py-4"><p className="max-w-[130px] break-words text-sm font-bold text-[#395886]/70">{getValue(job.days_left)}</p></td>
                        <td className="px-5 py-4 text-center">
                          <button type="button" onClick={() => deleteJob(jobId)} className="inline-flex items-center justify-center rounded-xl bg-red-50 p-3 text-red-600 transition hover:bg-red-600 hover:text-white"><Trash2 size={17} /></button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mobile View Responsive Grid Card Layout */}
        <section className="grid grid-cols-1 gap-4 lg:hidden">
          {!loading && filteredJobs.map((job, index) => {
            const jobId = resolveJobId(job);
            return (
              <article key={jobId ? `mobile-job-${jobId}` : `mobile-idx-${index}`} className="rounded-3xl border border-[#D5DEEF] bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#395886] text-white"><Building2 size={22} /></div>
                    <div className="min-w-0">
                      <h2 className="break-words text-xl font-black leading-tight text-[#395886]">{getValue(job.company)}</h2>
                      <p className="mt-1 break-words text-sm font-bold text-[#638ECB]">{getValue(job.title)}</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-widest text-[#395886]/45">Job ID: {getValue(jobId)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => deleteJob(jobId)} className="inline-flex shrink-0 items-center justify-center rounded-xl bg-red-50 p-3 text-red-600"><Trash2 size={17} /></button>
                </div>
                <div className="mt-5 grid gap-3 rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] p-4 text-sm font-bold">
                  <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {getValue(job.location)}</p>
                  <p className="flex items-start gap-2"><Briefcase size={16} className="mt-0.5 shrink-0" /> {getValue(job.type)}</p>
                  <p className="flex items-start gap-2"><Tag size={16} className="mt-0.5 shrink-0" /> {getValue(job.category)}</p>
                  <p className="flex items-start gap-2"><Wallet size={16} className="mt-0.5 shrink-0" /> Salary: {getValue(job.salary)}</p>
                  <p className="flex items-start gap-2"><Clock3 size={16} className="mt-0.5 shrink-0" /> Days Left: {getValue(job.days_left)}</p>
                </div>
              </article>
            );
          })}
        </section>

      </div>
    </div>
  );
}