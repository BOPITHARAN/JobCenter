import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../api/supabaseClient"; // ✅ Supabase Imported
import {
  Eye,
  Mail,
  Phone,
  User,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  Search,
  RefreshCcw,
  Loader2,
  BriefcaseBusiness,
  Building2,
  MapPin,
  CalendarDays
} from "lucide-react";

export default function Applications() {
  const { t } = useTranslation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const [search, setSearch] = useState("");

  // 🌟 Premium Floating Notification
  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 4000);
  };

  /* ✅ SAFE ID RESOLVER */
  const resolveAppId = (app) => {
    if (!app) return null;
    return app.id || app._id || app.application_id || null;
  };

  /* 🚀 SUPABASE FETCH */
  const fetchApplications = async () => {
    try {
      setLoading(true);

      // 'applications' டேபிளில் இருந்து தரவுகளை எடுக்கிறோம் (புதியது முதலில் வர order செய்துள்ளோம்)
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setApplications(data || []);
    } catch (err) {
      console.error("Supabase Fetch error:", err.message);
      setApplications([]);
      showPopup("error", "Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* 🗑️ SUPABASE DELETE */
  const deleteApplication = async (app) => {
    const id = resolveAppId(app);

    if (!id) {
      showPopup("error", "Invalid application ID.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      // Supabase-ல் இருந்து டெலீட் செய்கிறோம்
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // UI-ல் இருந்து உடனடியாக நீக்குகிறோம்
      setApplications((prev) => prev.filter((a) => resolveAppId(a) !== id));
      showPopup("success", "Application deleted successfully.");

    } catch (err) {
      console.error("Supabase Delete Error:", err.message);
      showPopup("error", "Server error while deleting.");
    }
  };

  /* 🔍 SEARCH LOGIC */
  const filteredApplications = applications.filter((app) => {
    const text = `${app.name || ""} ${app.email || ""} ${app.phone || ""} ${app.job_title || ""}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F0F3FA] text-[#395886] font-sans pb-12">
      
      {/* ✨ FLOATING POPUP NOTIFICATION */}
      {popup && (
        <div className="fixed top-20 md:top-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md border ${
            popup.type === "success" 
              ? "bg-green-50/90 border-green-200 text-green-700" 
              : "bg-red-50/90 border-red-200 text-red-700"
          }`}>
            {popup.type === "success" ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
            <span className="font-bold tracking-wide">{popup.message}</span>
            <button onClick={() => setPopup(null)} className="ml-4 hover:opacity-70 transition-opacity">
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
        
        {/* 🌟 HEADER & SEARCH SECTION */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/70 shadow-[0_15px_40px_rgba(57,88,134,0.12)] rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#395886] flex items-center gap-3">
              <BriefcaseBusiness className="text-[#638ECB]" size={32} />
              Applications
            </h1>
            <p className="mt-2 text-[#395886]/70 font-medium text-sm md:text-base flex items-center gap-2">
              <User size={16} /> Total Candidates: <span className="font-black text-[#638ECB]">{applications.length}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Premium Search Input */}
            <div className="relative group w-full sm:w-72">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#638ECB] group-focus-within:text-[#395886] transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search candidates..."
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-11 pr-4 py-3 md:py-3.5 rounded-2xl outline-none text-[#395886] placeholder:text-[#395886]/50 font-medium transition-all duration-300 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/10"
              />
            </div>
            
            {/* Refresh Button */}
            <button 
              onClick={fetchApplications}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#395886] px-5 py-3 md:py-3.5 rounded-2xl font-bold transition-all hover:bg-[#F0F3FA] hover:-translate-y-1 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
              <span className="sm:hidden">Refresh</span>
            </button>
          </div>
        </div>

        {/* 📋 APPLICATIONS GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#638ECB]">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="font-bold text-lg">Loading candidates...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white/50 border border-dashed border-[#638ECB]/40 rounded-[32px] py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="bg-[#E2E8F0]/50 p-6 rounded-full mb-4 text-[#638ECB]">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-black text-[#395886] mb-2">No Applications Found</h3>
            <p className="text-[#395886]/60 font-medium">Try adjusting your search or wait for new candidates to apply.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {filteredApplications.map((app, i) => {
              const id = resolveAppId(app);
              
              // Safe Resume URL Handling (Legacy + Supabase)
              const resume = app.resume?.startsWith("http")
                ? app.resume
                : app.resume
                ? `https://jpbcenterback-production.up.railway.app${app.resume}` // Fallback for old DB files if any
                : "";

              return (
                <div 
                  key={id || i} 
                  className="group relative flex flex-col bg-white/60 border border-white/70 shadow-[0_15px_35px_rgba(57,88,134,0.08)] rounded-[24px] p-6 backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(57,88,134,0.15)] transition-all duration-300"
                >
                  {/* Card Header (Avatar + Name) */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-br from-[#395886] to-[#638ECB] flex items-center justify-center text-white font-black text-xl shadow-inner">
                      {app.name ? app.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="overflow-hidden">
                      <h2 className="font-black text-lg md:text-xl text-[#395886] truncate">{app.name || "Unknown Applicant"}</h2>
                      {app.job_title && (
                        <p className="text-xs md:text-sm font-bold text-[#638ECB] flex items-center gap-1 truncate mt-0.5">
                          <BriefcaseBusiness size={14} /> {app.job_title}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Body (Contact Info) */}
                  <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-sm md:text-base font-medium text-[#395886]/80">
                      <div className="w-8 h-8 rounded-full bg-[#F0F3FA] flex items-center justify-center shrink-0 text-[#638ECB]">
                        <Mail size={16} />
                      </div>
                      <span className="truncate">{app.email || "No Email"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm md:text-base font-medium text-[#395886]/80">
                      <div className="w-8 h-8 rounded-full bg-[#F0F3FA] flex items-center justify-center shrink-0 text-[#638ECB]">
                        <Phone size={16} />
                      </div>
                      <span className="truncate">{app.phone || "No Phone"}</span>
                    </div>
                    
                    {/* Optional Application Date if exists */}
                    {app.created_at && (
                      <div className="flex items-center gap-3 text-sm md:text-base font-medium text-[#395886]/80">
                        <div className="w-8 h-8 rounded-full bg-[#F0F3FA] flex items-center justify-center shrink-0 text-[#638ECB]">
                          <CalendarDays size={16} />
                        </div>
                        <span className="truncate">{new Date(app.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Actions (View CV & Delete) */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                    {resume ? (
                      <a 
                        href={resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#F0F3FA] hover:bg-[#638ECB] text-[#638ECB] hover:text-white py-3 rounded-xl font-bold transition-colors duration-300"
                      >
                        <Eye size={18} /> View CV
                      </a>
                    ) : (
                      <div className="flex-1 text-center py-3 rounded-xl bg-gray-100 text-gray-400 font-bold text-sm cursor-not-allowed">
                        No CV Attached
                      </div>
                    )}
                    
                    <button
                      onClick={() => deleteApplication(app)}
                      className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-[#FFF0F0] text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300"
                      title="Delete Application"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}