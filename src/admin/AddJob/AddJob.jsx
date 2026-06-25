import { useState } from "react";
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
  CheckCircle2,
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

  /* ✅ SAFE NUMBER PARSER */
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

    /* VALIDATION */
    if (!company || !title || !location || !type) {
      return showStatus(
        "Company, title, location and type are required!",
        "error"
      );
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
      };

      /* ✅ IMPORTANT FIX: REMOVE /api IF AXIOS ALREADY HAS BASEURL */
      const res = await api.post("/jobs", payload);

      const msg =
        res.data?.message ||
        res.data?.msg ||
        "Job posted successfully!";

      showStatus(msg, "success");

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

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to post job";

      showStatus(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F3FA] p-6 text-[#395886]">
      <div className="mx-auto max-w-5xl">

        {/* STATUS */}
        {message.text && (
          <div
            className={`mb-5 flex items-center gap-3 rounded-xl p-4 ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 />
            ) : (
              <AlertCircle />
            )}
            <b>{message.text}</b>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl">

          <Input icon={<Building2 />} name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
          <Input icon={<Briefcase />} name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" />
          <Input icon={<MapPin />} name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <Input icon={<Clock />} name="type" value={formData.type} onChange={handleChange} placeholder="Job Type" />
          <Input icon={<Tags />} name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
          <Input icon={<DollarSign />} name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" />
          <Input icon={<Clock />} name="days_left" value={formData.days_left} onChange={handleChange} placeholder="Days Left" />

          <div className="flex gap-3 items-start border p-3 rounded-xl">
            <FileText />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job description..."
              className="w-full outline-none"
              rows="5"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Send />}
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 border p-3 rounded-xl">
      {icon}
      <input {...props} className="w-full outline-none" />
    </div>
  );
}