import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../api/supabaseClient"; 
import {
  Building2,
  Briefcase,
  MapPin,
  Clock,
  Tags,
  DollarSign,
  FileText,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  PlusCircle
} from "lucide-react";

export default function AddJob() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    type: "",
    category: "",
    days_left: "",
    salary: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const parseDays = (value) => {
    const num = Number(value);
    return Number.isFinite(num) && num > 0 ? num : 30;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const company = formData.company.trim();
    const title = formData.title.trim();
    const location = formData.location.trim();
    const type = formData.type.trim();
    const description = formData.description.trim();

    if (!company || !title || !location || !type) {
      return showStatus("Company, title, location and type are required!", "error");
    }

    if (!description) {
      return showStatus("Job description cannot be empty!", "error");
    }

    try {
      setLoading(true);

      const payload = {
        company,
        title,
        location,
        type,
        category: formData.category.trim() || "General",
        salary: formData.salary.trim() || "Negotiable",
        days_left: parseDays(formData.days_left),
        description,
        created_at: new Date().toISOString()
      };

      // ✅ SUPABASE INSERT (Directly to 'jobs' table)
      const { error } = await supabase
        .from("jobs")
        .insert([payload]);

      if (error) throw error;

      showStatus("Job posted successfully!", "success");

      setFormData({
        company: "",
        title: "",
        location: "",
        type: "",
        category: "",
        days_left: "",
        salary: "",
        description: "",
      });

    } catch (err) {
      console.error("ADD JOB ERROR:", err);
      showStatus(err.message || "Failed to post job.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F3FA] px-4 py-8 md:p-8 text-[#395886] font-sans">
      <div className="mx-auto max-w-4xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(57,88,134,0.08)] rounded-[24px] md:rounded-[32px] p-6 md:p-10">
        
        <div className="mb-8 md:mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black text-[#395886] flex items-center justify-center md:justify-start gap-3">
              <PlusCircle className="text-[#638ECB]" size={32} />
              {t("postNewJob", "Post New Job")}
            </h2>
            <p className="text-sm md:text-base text-[#638ECB] mt-2 font-medium">
              Fill in the details below to add a new job listing to the portal.
            </p>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 flex items-center gap-3 rounded-2xl p-4 text-sm md:text-base font-medium transition-all ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-700"
            }`}>
            {message.type === "success" ? <CheckCircle2 className="shrink-0" size={20} /> : <AlertCircle className="shrink-0" size={20} />}
            <p>{message.text}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Input icon={<Building2 size={20} />} name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" />
          <Input icon={<Briefcase size={20} />} name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" />
          <Input icon={<MapPin size={20} />} name="location" value={formData.location} onChange={handleChange} placeholder="Location (e.g., Colombo)" />
          <Input icon={<Clock size={20} />} name="type" value={formData.type} onChange={handleChange} placeholder="Job Type (e.g., Full-time)" />
          <Input icon={<Tags size={20} />} name="category" value={formData.category} onChange={handleChange} placeholder="Category (e.g., IT, Finance)" />
          <Input icon={<DollarSign size={20} />} name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary (e.g., 150K LKR)" />
          
          <div className="md:col-span-2 lg:col-span-1">
             <Input icon={<Clock size={20} />} name="days_left" value={formData.days_left} onChange={handleChange} placeholder="Days Left (e.g., 30)" type="number" min="1" />
          </div>

          <div className="col-span-1 md:col-span-2 group">
            <div className="flex gap-3 items-start bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-2xl transition-all duration-300 focus-within:border-[#638ECB] focus-within:ring-4 focus-within:ring-[#638ECB]/10 hover:border-[#B1C9EF]">
              <FileText className="text-[#638ECB] mt-1 shrink-0" size={20} />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed Job Description..."
                className="w-full bg-transparent outline-none text-[#395886] placeholder:text-[#395886]/50 resize-none min-h-[120px] md:min-h-[150px] text-sm md:text-base leading-relaxed"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 mt-4 md:mt-2">
            <button
              disabled={loading}
              className={`w-full py-4 rounded-2xl flex justify-center items-center gap-3 text-base md:text-lg font-black tracking-wide text-white transition-all duration-300 shadow-lg ${
                loading
                  ? "bg-[#638ECB]/70 cursor-not-allowed shadow-none"
                  : "bg-gradient-to-r from-[#395886] to-[#638ECB] hover:shadow-[#638ECB]/30 hover:-translate-y-1"
              }`}
            >
              {loading ? <><Loader2 className="animate-spin" size={24} /> Posting...</> : <><Send size={22} /> Publish Job</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ icon, type = "text", ...props }) {
  return (
    <div className="group relative">
      <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3.5 md:py-4 rounded-2xl transition-all duration-300 focus-within:border-[#638ECB] focus-within:ring-4 focus-within:ring-[#638ECB]/10 hover:border-[#B1C9EF]">
        <div className="text-[#638ECB] shrink-0">{icon}</div>
        <input type={type} {...props} className="w-full bg-transparent outline-none text-[#395886] placeholder:text-[#395886]/50 text-sm md:text-base font-medium" />
      </div>
    </div>
  );
}