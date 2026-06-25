import { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient"; // ✅ Supabase Imported
import {
  Building2,
  Trash2,
  Edit,
  PlusCircle,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Save
} from "lucide-react";

export default function CompaniesAdmin() {
  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [fetching, setFetching] = useState(true);

  /* ✨ PREMIUM FLOATING TOAST */
  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  /* 🚀 SUPABASE FETCH COMPANIES */
  const loadCompanies = async () => {
    try {
      setFetching(true);
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCompanies(data || []);
    } catch (err) {
      console.error("Failed to load companies:", err.message);
      showStatus("Failed to load companies", "error");
      setCompanies([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  /* 📤 SUPABASE IMAGE UPLOAD HELPER */
  const uploadLogo = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    // 'company-logos' என்ற Bucket-ல் அப்லோட் செய்கிறோம்
    const { error: uploadError } = await supabase.storage
      .from("company-logos")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Public URL-ஐ எடுக்கிறோம்
    const { data } = supabase.storage.from("company-logos").getPublicUrl(fileName);
    return data.publicUrl;
  };

  /* ➕ ADD COMPANY */
  const addCompany = async () => {
    if (!name.trim()) {
      showStatus("Company name is required!", "error");
      return;
    }

    try {
      setLoading(true);
      let logoUrl = "";

      if (logo) {
        logoUrl = await uploadLogo(logo);
      }

      const { error } = await supabase
        .from("companies")
        .insert([{ name, logo: logoUrl }]);

      if (error) throw error;

      setName("");
      setLogo(null);
      showStatus("Company Added Successfully!", "success");
      loadCompanies();
    } catch (err) {
      console.error(err);
      showStatus("Error adding company.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ✏️ UPDATE COMPANY */
  const updateCompany = async () => {
    if (!name.trim()) {
      showStatus("Company name is required!", "error");
      return;
    }

    try {
      setLoading(true);
      let updateData = { name };

      // புதிய லோகோ கொடுத்திருந்தால் அதையும் அப்டேட் செய்கிறோம்
      if (logo) {
        updateData.logo = await uploadLogo(logo);
      }

      const { error } = await supabase
        .from("companies")
        .update(updateData)
        .eq("id", editId);

      if (error) throw error;

      setEditId(null);
      setName("");
      setLogo(null);
      showStatus("Company Updated Successfully!", "success");
      loadCompanies();
    } catch (err) {
      console.error(err);
      showStatus("Error updating company.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* 🗑️ DELETE COMPANY */
  const deleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      const { error } = await supabase
        .from("companies")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showStatus("Company deleted!", "success");
      setCompanies((prev) => prev.filter((c) => (c.id || c._id) !== id));
    } catch (err) {
      console.error(err);
      showStatus("Error deleting company.", "error");
    }
  };

  const startEdit = (company) => {
    setEditId(company.id || company._id);
    setName(company.name);
    setLogo(null); // பழைய படத்தைக் காட்ட வேண்டாம், புதியது தேவைப்பட்டால் மட்டும் செலக்ட் செய்யட்டும்
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setLogo(null);
  };

  return (
    <div className="relative min-h-screen bg-[#F0F3FA] p-4 md:p-6 text-[#395886] font-sans pb-12">
      
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

      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

        {/* 📝 FORM SECTION */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/70 p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-[0_15px_40px_rgba(57,88,134,0.12)] transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#395886] flex items-center gap-3">
                {editId ? <Edit className="text-[#638ECB]" size={28} /> : <PlusCircle className="text-[#638ECB]" size={28} />}
                {editId ? "Edit Company" : "Add New Company"}
              </h2>
              <p className="text-[#395886]/60 font-medium text-sm md:text-base mt-1">
                {editId ? "Update the details of the selected company." : "Register a new employer to the platform."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            
            {/* Name Input */}
            <div className="group relative w-full md:col-span-2 lg:col-span-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#638ECB] group-focus-within:text-[#395886] transition-colors">
                <Building2 size={20} />
              </div>
              <input
                type="text"
                placeholder="Company Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] pl-12 pr-4 py-3.5 md:py-4 rounded-2xl outline-none text-[#395886] placeholder:text-[#395886]/50 font-bold transition-all duration-300 focus:border-[#638ECB] focus:ring-4 focus:ring-[#638ECB]/10"
              />
            </div>

            {/* File Input */}
            <div className="w-full md:col-span-2 lg:col-span-1 flex items-center gap-4">
              <label className="flex-1 flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3.5 md:py-4 rounded-2xl cursor-pointer hover:border-[#638ECB] transition-colors group">
                <ImageIcon className="text-[#638ECB] group-hover:text-[#395886] transition-colors" size={20} />
                <span className="text-[#395886]/70 font-bold truncate">
                  {logo ? logo.name : "Upload Logo (Optional)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="hidden"
                />
              </label>

              {/* Image Preview */}
              {logo && (
                <div className="h-14 w-14 shrink-0 rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
                  <img
                    src={URL.createObjectURL(logo)}
                    alt="preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-2">
              <button
                onClick={editId ? updateCompany : addCompany}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#395886] to-[#638ECB] hover:shadow-[0_10px_25px_rgba(99,142,203,0.35)] text-white px-6 py-4 rounded-2xl font-black transition-all hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : editId ? <Save size={20} /> : <PlusCircle size={20} />}
                {loading ? "Processing..." : editId ? "Update Company" : "Add Company"}
              </button>

              {editId && (
                <button
                  onClick={cancelEdit}
                  className="sm:w-1/3 flex items-center justify-center gap-2 bg-white border border-[#E2E8F0] text-[#395886] hover:bg-[#F0F3FA] px-6 py-4 rounded-2xl font-black transition-all hover:-translate-y-1"
                >
                  <X size={20} /> Cancel
                </button>
              )}
            </div>

          </div>
        </div>

        {/* 📋 COMPANIES LIST (GRID VIEW FOR RESPONSIVENESS) */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/70 rounded-[24px] md:rounded-[32px] shadow-[0_15px_40px_rgba(57,88,134,0.12)] p-6 md:p-8">
          <div className="flex justify-between items-end mb-6 md:mb-8 border-b border-[#395886]/10 pb-4">
            <div>
              <h2 className="text-2xl font-black text-[#395886]">Registered Companies</h2>
              <p className="text-sm font-medium text-[#395886]/60 mt-1">Manage and edit your partners</p>
            </div>
            <div className="bg-[#E2E8F0] text-[#395886] px-4 py-1.5 rounded-lg font-black text-sm">
              Total: {companies.length}
            </div>
          </div>

          {fetching ? (
             <div className="flex flex-col items-center justify-center py-16 text-[#638ECB]">
               <Loader2 size={40} className="animate-spin mb-4" />
               <p className="font-bold">Loading companies...</p>
             </div>
          ) : companies.length === 0 ? (
            <div className="text-center py-16 bg-white/50 border border-dashed border-[#638ECB]/40 rounded-2xl">
              <Building2 size={48} className="mx-auto text-[#638ECB]/50 mb-4" />
              <p className="text-[#395886] font-bold text-lg">No companies found.</p>
              <p className="text-[#395886]/60 text-sm mt-1">Add your first company using the form above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {companies.map((company) => {
                const id = company.id || company._id;
                
                // Fallback for old Railway images vs new Supabase public URLs
                const logoUrl = company.logo?.startsWith("http") 
                  ? company.logo 
                  : company.logo 
                  ? `https://jpbcenterback-production.up.railway.app/uploads/companies/${company.logo}` 
                  : null;

                return (
                  <div 
                    key={id}
                    className="group flex flex-col bg-white/80 border border-[#E2E8F0] rounded-[20px] p-5 hover:border-[#638ECB]/40 hover:shadow-[0_10px_30px_rgba(99,142,203,0.15)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 mb-5">
                      {logoUrl ? (
                        <div className="h-16 w-16 shrink-0 rounded-2xl bg-white border border-[#E2E8F0] p-1.5 shadow-sm">
                          <img
                            src={logoUrl}
                            alt={company.name}
                            className="h-full w-full object-contain rounded-xl"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=Logo"; }}
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 shrink-0 flex items-center justify-center bg-gradient-to-br from-[#395886] to-[#638ECB] text-white rounded-2xl shadow-sm">
                          <Building2 size={24} />
                        </div>
                      )}
                      <h3 className="font-black text-[#395886] text-lg truncate" title={company.name}>
                        {company.name}
                      </h3>
                    </div>

                    <div className="mt-auto flex gap-3 pt-4 border-t border-[#E2E8F0]">
                      <button
                        onClick={() => startEdit(company)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#F0F3FA] text-[#395886] hover:bg-[#395886] hover:text-white py-2.5 rounded-xl font-bold transition-colors text-sm"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => deleteCompany(id)}
                        className="flex items-center justify-center w-12 shrink-0 bg-[#FFF0F0] text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-xl transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}