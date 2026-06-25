import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient"; // ✅ Supabase Imported (Axios Removed)
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
  CheckCircle2,
  Sparkles,
  Loader2,
  BriefcaseBusiness
} from "lucide-react";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  /* ✅ PREMIUM FLOATING TOAST */
  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  /* ✅ SAFE VALUE HANDLER */
  const getValue = (value, fallback = "N/A") => {
    if (value === undefined || value === null || value === "" || value === "Pending") {
      return fallback;
    }
    return value;
  };

  /* ✅ SAFE ID DETECTOR */
  const resolveJobId = (job) => {
    if (!job) return null;
    return job.id || job._id || job.job_id || null;
  };

  /* 🚀 SUPABASE FETCH JOBS */
  const fetchJobs = async () => {
    try {
      setLoading(true);

      // 'jobs' டேபிளில் இருந்து லேட்டஸ்ட் வேலைகளை முதலில் எடுக்கிறோம்
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setJobs(data || []);
    } catch (err) {
      console.error("Supabase Fetch error:", err.message);
      showStatus("Failed to load jobs from database", "error");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* 🗑️ SUPABASE DELETE JOB */
  const deleteJob = async (id) => {
    if (!id) {
      showStatus("Invalid Job ID", "error");
      return;
    }

    if (!window.confirm("Are you sure you want to completely delete this job?")) return;

    try {
      const { error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showStatus("Job deleted successfully!", "success");
      
      // UI-ல் இருந்து உடனடியாக நீக்குகிறோம் (No need to refetch all data)
      setJobs((prev) => prev.filter((job) => resolveJobId(job) !== id));
      
    } catch (err) {
      console.error("Supabase Delete error:", err.message);
      showStatus("Server error while deleting job", "error");
    }
  };

  /* 🔍 SEARCH FILTER */
  const filteredJobs = jobs.filter((job) => {
    const q = search.toLowerCase();
    return (
      getValue(job.company, "").toLowerCase().includes(q) ||
      getValue(job.title, "").toLowerCase().includes(q) ||
      getValue(job.location, "").toLowerCase().includes(q) ||
      getValue(job.type, "").toLowerCase().includes(q) ||
      getValue(job.category, "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen bg-[#F0F3FA] p-4 md:p-6 text-[#395886] font-sans pb-12">
      
      {/* 🎨 BACKGROUND AMBIENT GLOW */}
      <div className="pointer-events-none fixed -left-20 top-0 h-96 w-96 rounded-full bg-[#638ECB]/20 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-[#395886]/15 blur-[120px]" />

      {/* ✨ FLOATING NOTIFICATION */}
      {message.text && (
        <div className="fixed top-20 md:top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md border ${
            message.type === "success" 
              ? "bg-green-50/90 border-green-200 text-green-700" 
              : "bg-red-50/90 border-red-200 text-red-700"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <span className="font-bold tracking-wide">{message.text}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1400px] space-y-6 md:space-y-8">

        {/* 🌟 PREMIUM HEADER & SEARCH */}
        <section className="bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_15px_40px_rgba(57,88,134,0.12)] rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#638ECB]/30 bg-white/60 px-4 py-2 text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#395886] mb-3">
              <Sparkles size={16} className="text-[#638ECB]" /> Admin Tools
            </p>
            <h1 className="text-3xl md:text-4xl font-black text-[#395886] flex items-center gap-3">
              Manage <span className="bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] bg-clip-text text-transparent">Jobs</span>
            </h1>
            <div className="mt-3 flex gap-4 text-sm md:text-base font-bold text-[#395886]/70">
              <p>Total Jobs: <span className="text-[#638ECB]">{jobs.length}</span></p>
              <p>Showing: <span className="text-[#638ECB]">{filteredJobs.length}</span></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative group w-full sm:w-80">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#638ECB] group-focus-within:text-[#395886] transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs, company, location..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-11 pr-4 py-3 md:py-3.5 rounded-2xl outline-none text-[#395886] placeholder:text-[#395886]/50 font-medium transition-all duration-300 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/10 shadow-inner"
              />
            </div>
            
            {/* Refresh Button */}
            <button 
              onClick={fetchJobs}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#395886] to-[#638ECB] text-white px-5 py-3 md:py-3.5 rounded-2xl font-bold transition-all hover:shadow-[0_10px_25px_rgba(99,142,203,0.35)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
              <span className="sm:hidden lg:inline">Refresh</span>
            </button>
          </div>
        </section>

        {/* 📋 JOBS LIST / GRID VIEW */}
        <section className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#638ECB]">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="font-bold text-lg">Loading database...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white/50 border border-dashed border-[#638ECB]/40 rounded-[32px] py-20 flex flex-col items-center justify-center text-center px-4 backdrop-blur-sm">
              <div className="bg-[#E2E8F0]/50 p-6 rounded-full mb-4 text-[#638ECB]">
                <BriefcaseBusiness size={40} />
              </div>
              <h3 className="text-2xl font-black text-[#395886] mb-2">No Jobs Found</h3>
              <p className="text-[#395886]/60 font-medium">No job postings match your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job, i) => {
                const id = resolveJobId(job);

                return (
                  <div 
                    key={id || i}
                    className="group relative flex flex-col md:flex-row md:items-center justify-between gap-5 bg-white/70 border border-white/80 p-5 md:p-6 rounded-[24px] shadow-[0_10px_30px_rgba(57,88,134,0.06)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(57,88,134,0.12)] hover:border-[#638ECB]/30"
                  >
                    
                    {/* Left: Company Logo & Basic Details */}
                    <div className="flex items-start md:items-center gap-4 md:w-1/3">
                      <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#395886] to-[#638ECB] flex items-center justify-center text-white font-black text-xl shadow-md">
                        {getValue(job.company, "C").charAt(0).toUpperCase()}
                      </div>
                      <div className="overflow-hidden">
                        <h2 className="font-black text-lg md:text-xl text-[#395886] truncate">
                          {getValue(job.title)}
                        </h2>
                        <p className="text-sm font-bold text-[#638ECB] flex items-center gap-1.5 mt-0.5 truncate">
                          <Building2 size={14} /> {getValue(job.company)}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Job Meta Tags (Location, Type, Category) */}
                    <div className="flex flex-wrap gap-2 md:gap-4 md:w-1/2">
                      <div className="flex items-center gap-1.5 bg-[#F0F3FA] text-[#395886] px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold border border-[#E2E8F0]">
                        <MapPin size={14} className="text-[#638ECB]" />
                        <span className="truncate max-w-[120px]">{getValue(job.location)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#F0F3FA] text-[#395886] px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold border border-[#E2E8F0]">
                        <Clock3 size={14} className="text-[#638ECB]" />
                        <span className="truncate max-w-[100px]">{getValue(job.type)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#F0F3FA] text-[#395886] px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold border border-[#E2E8F0]">
                        <Tag size={14} className="text-[#638ECB]" />
                        <span className="truncate max-w-[100px]">{getValue(job.category)}</span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end md:w-auto pt-4 md:pt-0 border-t md:border-none border-[#E2E8F0]">
                      <button
                        onClick={() => deleteJob(id)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF0F0] text-red-600 font-bold hover:bg-red-500 hover:text-white transition-colors duration-300 w-full md:w-auto justify-center"
                        title="Delete Job"
                      >
                        <Trash2 size={18} />
                        <span className="md:hidden">Delete Job</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}