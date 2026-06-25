import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  Eye,
  FileText,
  Mail,
  Phone,
  User,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  Building2,
  MapPin,
  RefreshCcw,
  Search,
  BriefcaseBusiness,
} from "lucide-react";

// Environment-friendly dynamic API endpoint assignment
const API_URL = import.meta.env.VITE_DB_HOST || "https://jpbcenterback-production.up.railway.app";
// Use localhost during active local development test runs:
// const API_URL = "http://localhost:5000";

export default function Applications() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const [search, setSearch] = useState("");

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 4500);
  };

  const getValue = (app, keys, fallback = "Not Provided") => {
    if (!app) return fallback;
    for (const key of keys) {
      const value = app?.[key];
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "Pending" &&
        value !== "N/A"
      ) {
        return value;
      }
    }
    return fallback;
  };

  // 🧠 SMART AUTO-ID DETECTOR
  // Extracts the primary key token safely even if database column names vary
  const resolveAppId = (app) => {
    if (!app) return null;
    if (app.id !== undefined && app.id !== null) return app.id;
    if (app._id !== undefined && app._id !== null) return app._id;
    if (app.application_id !== undefined && app.application_id !== null) return app.application_id;
    
    const fallbackKey = Object.keys(app).find(
      (k) => k.toLowerCase() === "id" || k.toLowerCase().includes("id")
    );
    return fallbackKey ? app[fallbackKey] : null;
  };

  // 1. FETCH CANDIDATE APPLICATIONS FROM PRODUCTION BACKEND
  const fetchApplications = async () => {
    try {
      setLoading(true);
      let backendApplications = [];

      try {
        const res = await axios.get(`${API_URL}/api/applications`, {
          headers: { "Cache-Control": "no-cache" }
        });
        if (res.data && res.data.success) {
          backendApplications = res.data.data || [];
        }
      } catch (err) {
        // FIXED: Replaced silent catch with informative log to catch missing server routes (404s) instantly
        console.error("⚠️ Backend API Sync Warning:", err.message);
        backendApplications = [];
      }

      const localApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
      setApplications([...localApplications, ...backendApplications]);
    } catch (error) {
      console.error(error);
      showPopup("error", "System handshake timeout. Unable to parse entries dataset!");
    } finally {
      setLoading(false);
    }
  };

  // 2. TERMINATE APPLICATION ENTRY
  const deleteApplication = async (app) => {
    const targetId = resolveAppId(app);

    if (!targetId || targetId === "null" || targetId === "undefined") {
      showPopup("error", "Critical: This application cannot be deleted because its primary key index token is missing!");
      return;
    }

    if (!window.confirm("Are you sure you want to permanently delete this candidate application record?")) {
      return;
    }

    try {
      const localApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
      const isLocal = localApplications.some((item) => resolveAppId(item) === targetId);

      // Handle Local Storage items deletion sequence
      if (isLocal) {
        const updatedLocal = localApplications.filter((item) => resolveAppId(item) !== targetId);
        localStorage.setItem("jobApplications", JSON.stringify(updatedLocal));
        setApplications((prev) => prev.filter((item) => resolveAppId(item) !== targetId));
        showPopup("success", "Local application entry removed successfully!");
        return;
      }

      // Handle Live Production Database items deletion sequence
      const res = await axios.delete(`${API_URL}/api/applications/${targetId}`);
      
      if (res.data && res.data.success) {
        setApplications((prev) => prev.filter((item) => resolveAppId(item) !== targetId));
        showPopup("success", "Candidate application log terminated successfully! 🗑️");
      } else {
        showPopup("error", res.data.message || "Operation rejected by backend server nodes.");
      }
    } catch (error) {
      console.error("Delete Error Logs:", error);
      showPopup(
        "error",
        error?.response?.data?.message || "Server error occurred while executing entry termination!"
      );
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // 3. SEARCH FILTER MATCH MATRIX
  const filteredApplications = applications.filter((app) => {
    if (!app) return false;
    const name = getValue(app, ["name", "full_name"], "");
    const email = getValue(app, ["email"], "");
    const phone = getValue(app, ["phone"], "");
    const jobTitle = getValue(app, ["job_title", "title", "jobTitle"], "");
    const company = getValue(app, ["company", "company_name"], "");
    const location = getValue(app, ["location"], "");
    const message = getValue(app, ["message"], "");

    return `${name} ${email} ${phone} ${jobTitle} ${company} ${location} ${message}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F3FA] via-[#F7F9FD] to-[#EEF3FB] p-4 text-[#395886] md:p-6 font-sans">
      
      {/* English Alerts Banner Panel */}
      {popup && (
        <div className="fixed left-1/2 top-5 z-[9999] -translate-x-1/2 px-4">
          <div className="flex w-[calc(100vw-32px)] max-w-[430px] items-center gap-3 rounded-3xl border border-[#D5DEEF] bg-white px-5 py-4 shadow-xl">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              popup.type === "success" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
            }`}>
              {popup.type === "success" ? <CheckCircle2 size={22} /> : <AlertTriangle size={22} />}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-black text-[#395886]">{popup.type === "success" ? "Success" : "Notice"}</h3>
              <p className="break-words text-sm font-semibold text-[#395886]/60">{popup.message}</p>
            </div>

            <button type="button" onClick={() => setPopup(null)} className="rounded-xl p-2 hover:bg-[#F0F3FA]"><X size={18} /></button>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] space-y-5">
        {/* Portal Header Section */}
        <section className="rounded-[30px] border border-[#D5DEEF] bg-white p-6 shadow-[0_10px_30px_rgba(57,88,134,0.08)] md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D5DEEF] bg-[#F0F3FA] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#638ECB]">
                <FileText size={16} /> Admin Panel
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#395886] md:text-5xl">Applications</h1>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#395886]/60 md:text-base">Manage and review candidate job placement applications fluidly.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-3xl border border-[#D5DEEF] bg-gradient-to-br from-white to-[#F7F9FD] px-6 py-5 shadow-sm min-w-[100px]">
                <p className="text-xs font-black uppercase tracking-widest text-[#638ECB]">Total</p>
                <h2 className="text-2xl font-black text-[#395886]">{applications.length}</h2>
              </div>
              <div className="rounded-3xl border border-[#D5DEEF] bg-gradient-to-br from-white to-[#F7F9FD] px-6 py-5 shadow-sm min-w-[100px]">
                <p className="text-xs font-black uppercase tracking-widest text-[#638ECB]">Showing</p>
                <h2 className="text-2xl font-black text-[#395886]">{filteredApplications.length}</h2>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Input Search Command Row */}
        <section className="rounded-[30px] border border-[#D5DEEF] bg-white p-4 shadow-[0_10px_30px_rgba(57,88,134,0.08)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex min-h-[56px] flex-1 items-center gap-3 rounded-3xl border border-[#D5DEEF] bg-white px-5 shadow-sm">
              <Search size={19} className="shrink-0 text-[#638ECB]" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, job, company, location..." className="w-full bg-transparent text-sm font-bold text-[#395886] outline-none placeholder:text-[#395886]/40" />
            </div>
            <button type="button" onClick={fetchApplications} className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-3xl bg-[#395886] px-7 text-sm font-black text-white shadow-lg transition hover:bg-[#4B6A99]">
              <RefreshCcw size={17} /> Refresh
            </button>
          </div>
        </section>

        {/* Data Loader Grid States */}
        {loading ? (
          <div className="rounded-[30px] border border-[#D5DEEF] bg-white p-10 text-center shadow-[0_10px_30px_rgba(57,88,134,0.08)]">
            <p className="font-black text-[#395886]">Loading applications logs roster...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="rounded-[30px] border border-[#D5DEEF] bg-white p-10 text-center shadow-[0_10px_30px_rgba(57,88,134,0.08)]">
            <p className="font-black text-[#395886]">No candidate profiles found matching parameters.</p>
            <p className="mt-2 text-sm font-semibold text-[#395886]/60">Try modifying search keyword variables.</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {filteredApplications.map((app, index) => {
              const targetId = resolveAppId(app);
              const cardKey = targetId ? `app-card-${targetId}` : `app-idx-${index}`;

              const name = getValue(app, ["name", "full_name"]);
              const email = getValue(app, ["email"]);
              const phone = getValue(app, ["phone"]);
              const jobTitle = getValue(app, ["job_title", "title", "jobTitle"]);
              const company = getValue(app, ["company", "company_name"]);
              const location = getValue(app, ["location"]);
              const message = getValue(app, ["message"], "No message statement enclosed.");
              const resume = getValue(app, ["resume", "resume_url", "cv"], "");

              const resumeLink = resume && resume.startsWith("http")
                ? resume
                : resume
                ? `${API_URL}${resume}`
                : "";

              return (
                <article key={cardKey} className="rounded-[30px] border border-[#D5DEEF] bg-white p-6 shadow-[0_10px_30px_rgba(57,88,134,0.08)] transition hover:border-[#8AAEE0]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 flex-1 gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#395886] to-[#638ECB] text-white">
                        <User size={22} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="break-words text-xl font-black leading-tight text-[#395886] md:text-2xl">{name}</h2>
                        <p className="mt-1 break-words text-xs font-black uppercase tracking-widest text-[#638ECB]">
                          ID: {targetId || "Unsaved Local Entry"}
                        </p>
                      </div>
                    </div>
                    <button type="button" onClick={() => deleteApplication(app)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 px-4 py-3 text-sm font-black text-red-600 transition hover:from-red-600 hover:to-red-600 hover:text-white">
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="min-w-0 rounded-2xl border border-[#D5DEEF] bg-gradient-to-br from-[#F8FAFD] to-[#EEF3FB] p-4">
                      <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#638ECB]">Contact</p>
                      <p className="flex min-w-0 items-start gap-2 text-sm font-bold text-[#395886]"><Mail size={16} className="mt-0.5 shrink-0" /><span className="min-w-0 break-all">{email}</span></p>
                      <p className="mt-2 flex min-w-0 items-start gap-2 text-sm font-bold text-[#395886]/70"><Phone size={16} className="mt-0.5 shrink-0" /><span className="min-w-0 break-words">{phone}</span></p>
                    </div>

                    <div className="min-w-0 rounded-2xl border border-[#D5DEEF] bg-gradient-to-br from-[#F8FAFD] to-[#EEF3FB] p-4">
                      <p className="mb-3 text-xs font-black uppercase tracking-widest text-[#638ECB]">Job Details</p>
                      <p className="flex min-w-0 items-start gap-2 text-sm font-bold text-[#395886]"><BriefcaseBusiness size={16} className="mt-0.5 shrink-0" /><span className="min-w-0 break-words">{jobTitle}</span></p>
                      <p className="mt-2 flex min-w-0 items-start gap-2 text-sm font-bold text-[#395886]/70"><Building2 size={16} className="mt-0.5 shrink-0" /><span className="min-w-0 break-words">{company}</span></p>
                      <p className="mt-2 flex min-w-0 items-start gap-2 text-sm font-bold text-[#395886]/70"><MapPin size={16} className="mt-0.5 shrink-0" /><span className="min-w-0 break-words">{location}</span></p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#D5DEEF] bg-white p-4">
                    <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#638ECB]">Message</p>
                    <p className="break-words text-sm font-semibold leading-7 text-[#395886]/70">{message}</p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    {resumeLink ? (
                      <a href={resumeLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#395886] to-[#638ECB] px-5 py-3 text-sm font-black text-white shadow-md hover:opacity-90">
                        <Eye size={16} /> View CV
                      </a>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#D5DEEF] bg-[#F0F3FA] px-5 py-3 text-sm font-black text-[#395886]/60">
                        <FileText size={16} /> No CV Uploaded
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}