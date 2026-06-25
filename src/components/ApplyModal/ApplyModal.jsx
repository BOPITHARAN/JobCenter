import { useState } from "react";
import axios from "axios";
import {
  X,
  User,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  Send,
  Briefcase,
  Building2,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function ApplyModal({ job, onClose }) {
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: "",
    message: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 3000);
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleResume = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = [".pdf", ".doc", ".docx"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();

    if (!allowed.includes(ext)) {
      showPopup("error", "Only PDF, DOC, DOCX files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showPopup("error", "CV file must be below 5MB");
      return;
    }

    setResume(file);
  };

  const handleApply = async (e) => {
    e.preventDefault();

    const cleanEmail = form.email.trim().toLowerCase();

    if (!form.name.trim() || !cleanEmail || !form.phone.trim()) {
      showPopup("error", "Please fill required fields");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      showPopup("error", "Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("job_id", job.id);
      data.append("job_title", job.title);
      data.append("company", job.company);
      data.append("name", form.name.trim());
      data.append("email", cleanEmail);
      data.append("phone", form.phone.trim());
      data.append("message", form.message.trim());

      if (resume) data.append("resume", resume);

      const res = await axios.post(
        "http://localhost:5000/api/applications",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      showPopup(
        "success",
        res.data.message || "Application submitted successfully"
      );

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      showPopup("error", err?.response?.data?.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {popup && (
        <div className="fixed left-1/2 top-5 z-[10000] w-[90%] max-w-sm -translate-x-1/2">
          <div className="rounded-2xl border border-[#D5DEEF] bg-white p-4 shadow-[0_20px_50px_rgba(57,88,134,0.18)]">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  popup.type === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {popup.type === "success" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
              </div>

              <div>
                <h3 className="text-sm font-black text-[#395886]">
                  {popup.type === "success" ? "Success" : "Notice"}
                </h3>
                <p className="text-xs text-slate-500">{popup.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#395886]/70 p-4 backdrop-blur-xl">
        <div className="relative h-[82vh] w-full max-w-4xl overflow-hidden rounded-[32px] border border-[#D5DEEF] bg-white shadow-[0_30px_90px_rgba(57,88,134,.30)]">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F3FA] text-[#395886] shadow-lg transition hover:bg-[#395886] hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="grid h-full lg:grid-cols-4">
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#395886] via-[#628ECB] to-[#8AAEE0] p-6 text-white lg:col-span-1 lg:flex lg:flex-col">
              <div className="absolute -left-20 -top-20 h-[220px] w-[220px] rounded-full bg-white/20 blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D5DEEF]/30 blur-[90px]" />

              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D5DEEF]">
                  Job Application
                </p>

                <h1 className="mt-4 text-3xl font-black text-white">
                  Apply Now
                </h1>

                <p className="mt-3 text-xs leading-5 text-white/80">
                  Submit your details and CV. Employer will review your
                  application.
                </p>
              </div>

              <div className="relative mt-6 rounded-[24px] border border-white/25 bg-white/15 p-4 backdrop-blur-xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-white">
                  <Briefcase size={22} />
                </div>

                <h2 className="text-lg font-black">{job?.title}</h2>

                <div className="mt-4 space-y-3 text-xs text-white/85">
                  <p className="flex items-center gap-2">
                    <Building2 size={14} />
                    {job?.company}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={14} />
                    {job?.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[82vh] overflow-y-auto bg-gradient-to-br from-white via-[#F0F3FA] to-white p-5 lg:col-span-3">
              <div className="mb-5 pr-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#628ECB]">
                  Candidate Details
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#395886]">
                  Submit Application
                </h2>

                <p className="mt-1 text-xs font-semibold text-[#395886]/60">
                  Fill the form and upload your CV.
                </p>
              </div>

              <form onSubmit={handleApply} className="space-y-4">
                <Input
                  icon={User}
                  label="Full Name *"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                <Input
                  icon={Mail}
                  label="Email *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />

                <Input
                  icon={Phone}
                  label="Phone *"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+94 77 1234567"
                />

                <div>
                  <label className="mb-1.5 block text-xs font-black text-[#395886]">
                    Upload CV / Resume
                  </label>

                  <label className="group mt-2 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-[#B1C9EF] bg-white/80 p-4 transition hover:border-[#628ECB] hover:bg-[#F0F3FA]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D5DEEF] text-[#395886] transition group-hover:bg-[#628ECB] group-hover:text-white">
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-[#395886]">
                        {resume ? resume.name : "Choose CV File"}
                      </p>

                      <p className="text-xs font-semibold text-[#395886]/60">
                        PDF, DOC, DOCX up to 5MB
                      </p>
                    </div>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResume}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-black text-[#395886]">
                    Message
                  </label>

                  <div className="rounded-2xl border border-[#D5DEEF] bg-white/80 p-3 transition focus-within:border-[#628ECB] focus-within:bg-white">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#395886]">
                      <MessageSquare size={15} />
                      Short Message
                    </div>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Write message..."
                      className="w-full resize-none bg-transparent text-sm font-semibold text-[#395886] outline-none placeholder:text-[#8AAEE0]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#628ECB] to-[#395886] py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(57,88,134,.30)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Submit Application
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Input({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black text-[#395886]">
        {label}
      </label>

      <div className="flex items-center gap-2 rounded-2xl border border-[#D5DEEF] bg-white/80 px-3 py-3 transition hover:bg-[#F0F3FA] focus-within:border-[#628ECB] focus-within:ring-2 focus-within:ring-[#B1C9EF]/70">
        <Icon size={16} className="text-[#628ECB]" />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-semibold text-[#395886] outline-none placeholder:text-[#8AAEE0]"
        />
      </div>
    </div>
  );
}