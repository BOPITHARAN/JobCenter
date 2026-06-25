import { useState } from "react";
// 👇 Path is fixed here: added an extra '../' to reach the src folder
import api from "../../api/axios"; 
import { useTranslation } from "react-i18next";
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
  CheckCircle2
} from "lucide-react";

/**
 * AddJob Component
 * Job vacancy-ஐச் சேர்க்கும் முழுமையான ஃபார்ம்
 */
export default function AddJob() {
  const { t } = useTranslation();

  // ஃபார்ம் டேட்டா ஸ்டேட்
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

  // இன்புட் மாற்றங்களைக் கவனிக்கும் பங்க்ஷன்
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ஸ்டேட்டஸ் மெசேஜ்களைக் காட்டும் பங்க்ஷன்
  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  // ஃபார்ம் சப்மிஷன்
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.company.trim() ||
      !formData.title.trim() ||
      !formData.location.trim() ||
      !formData.type.trim()
    ) {
      showStatus("Company name, job title, location, and type are mandatory fields!", "error");
      return;
    }

    try {
      setLoading(true);

      // Integer conversion
      const numericDays = parseInt(formData.days_left, 10);
      
      const payload = {
        ...formData,
        company: formData.company.trim(),
        title: formData.title.trim(),
        location: formData.location.trim(),
        type: formData.type.trim(),
        category: formData.category.trim() || "General",
        salary: formData.salary.trim() || "Negotiable",
        days_left: isNaN(numericDays) ? 30 : numericDays,
      };

      // API அழைப்பு (CORS பிழை வராது)
      const res = await api.post('/api/jobs', payload);

      showStatus(res.data.message || "Job vacancy posted successfully! 🎉", "success");

      // ஃபார்மை ரீசெட் செய்தல்
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
      console.error(err);
      showStatus(err?.response?.data?.message || "Failed to publish job opening onto database logs!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F0F3FA] px-4 py-10 text-[#395886] font-sans">
      {/* Background Decorators */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F3FA] via-[#D5DEEF] to-[#B1C9EF]" />
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#638ECB]/25 blur-[120px]" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#395886]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#638ECB]">
            {t("careerManagement", "Career Management")}
          </p>

          <h1 className="mt-3 text-4xl font-black text-[#395886] md:text-5xl">
            {t("addJobVacancy", "Add Job Vacancy")}
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-[#395886]/70">
            {t(
              "addJobDescription",
              "Create and publish a new job opportunity with a premium dashboard form."
            )}
          </p>
        </div>

        {/* Status Alerts */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border transition-all duration-300 ${
            message.type === "success" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-bold">{message.text}</span>
          </div>
        )}

        <div className="rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-[0_25px_70px_rgba(57,88,134,0.18)] backdrop-blur-xl md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <Input icon={<Building2 size={20} />} name="company" placeholder={t("companyName", "Company Name")} value={formData.company} onChange={handleChange} />
              <Input icon={<Briefcase size={20} />} name="title" placeholder={t("jobTitle", "Job Title")} value={formData.title} onChange={handleChange} />
              <Input icon={<MapPin size={20} />} name="location" placeholder={t("location", "Location")} value={formData.location} onChange={handleChange} />
              <Input icon={<Clock size={20} />} name="type" placeholder={t("jobTypePlaceholder", "Full-time / Part-time / Hybrid")} value={formData.type} onChange={handleChange} />
              <Input icon={<Tags size={20} />} name="category" placeholder={t("category", "Category")} value={formData.category} onChange={handleChange} />
              <Input icon={<Clock size={20} />} name="days_left" type="number" placeholder={t("daysLeftPlaceholder", "Days Left (e.g. 15)")} value={formData.days_left} onChange={handleChange} />
              <Input icon={<DollarSign size={20} />} name="salary" placeholder={t("salary", "Salary")} value={formData.salary} onChange={handleChange} />
            </div>

            <div className="rounded-2xl border border-[#B1C9EF] bg-[#F0F3FA] p-4 transition focus-within:border-[#638ECB] focus-within:ring-4 focus-within:ring-[#638ECB]/20">
              <div className="mb-2 flex items-center gap-3 text-[#638ECB]">
                <FileText size={20} />
                <span className="text-sm font-bold">
                  {t("jobDescriptionLabel", "Job Description")}
                </span>
              </div>
              <textarea
                name="description"
                rows="6"
                placeholder={t("jobDescriptionPlaceholder", "Write job description, responsibilities, requirements...")}
                value={formData.description}
                onChange={handleChange}
                className="w-full resize-none bg-transparent text-[#395886] outline-none placeholder:text-[#395886]/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] py-4 font-black text-white shadow-[0_0_30px_rgba(99,142,203,0.45)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  {t("publishing", "Publishing...")}
                </>
              ) : (
                <>
                  <Send size={20} className="transition group-hover:translate-x-1" />
                  {t("publishJobVacancy", "Publish Job Vacancy")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/**
 * Custom Input Component
 */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#B1C9EF] bg-[#F0F3FA] px-4 py-3 transition focus-within:border-[#638ECB] focus-within:ring-4 focus-within:ring-[#638ECB]/20 hover:bg-white/70">
      <div className="text-[#638ECB]">{icon}</div>
      <input
        {...props}
        className="w-full bg-transparent text-[#395886] outline-none placeholder:text-[#395886]/40 font-medium"
      />
    </div>
  );
}