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

/* ✅ CLEAN API BASE */
const API_BASE_URL =
  import.meta.env.VITE_DB_HOST ||
  "https://jpbcenterback-production.up.railway.app/api";

export default function Applications() {
  const { t } = useTranslation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);
  const [search, setSearch] = useState("");

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 4000);
  };

  /* ✅ SAFE VALUE */
  const getValue = (app, keys, fallback = "Not Provided") => {
    if (!app) return fallback;

    for (const key of keys) {
      const value = app?.[key];
      if (value && value !== "Pending" && value !== "N/A") {
        return value;
      }
    }
    return fallback;
  };

  /* ✅ SAFE ID */
  const resolveAppId = (app) => {
    if (!app) return null;

    return (
      app.id ||
      app._id ||
      app.application_id ||
      null
    );
  };

  /* ✅ FETCH */
  const fetchApplications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_BASE_URL}/applications`);

      const backend = res.data?.data || [];

      setApplications(backend);
    } catch (err) {
      console.error("Fetch error:", err);
      setApplications([]);
      showPopup("error", "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ✅ DELETE */
  const deleteApplication = async (app) => {
    const id = resolveAppId(app);

    if (!id) {
      showPopup("error", "Invalid application ID");
      return;
    }

    if (!window.confirm("Delete this application?")) return;

    try {
      const res = await axios.delete(
        `${API_BASE_URL}/applications/${id}`
      );

      if (res.data?.success) {
        setApplications((prev) =>
          prev.filter((a) => resolveAppId(a) !== id)
        );
        showPopup("success", "Deleted successfully");
      } else {
        showPopup("error", "Delete failed");
      }
    } catch (err) {
      console.error(err);
      showPopup("error", "Server error while deleting");
    }
  };

  /* ✅ SEARCH */
  const filteredApplications = applications.filter((app) => {
    const text = `${app.name || ""} ${app.email || ""} ${app.phone || ""} ${app.company || ""} ${app.location || ""}`;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F0F3FA] p-4 text-[#395886]">

      {/* POPUP */}
      {popup && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow">
          <b>{popup.type}</b> - {popup.message}
          <button onClick={() => setPopup(null)}><X /></button>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto space-y-5">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-2xl">
          <h1 className="text-3xl font-black">Applications</h1>
          <p>Total: {applications.length}</p>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3">
          <input
            className="border p-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
          />

          <button onClick={fetchApplications}>
            <RefreshCcw />
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Loading...</p>
        ) : filteredApplications.length === 0 ? (
          <p>No applications found</p>
        ) : (
          filteredApplications.map((app, i) => {
            const id = resolveAppId(app);

            const resume =
              app.resume?.startsWith("http")
                ? app.resume
                : app.resume
                ? `${API_BASE_URL.replace("/api", "")}${app.resume}`
                : "";

            return (
              <div key={id || i} className="bg-white p-4 rounded-xl mb-4">

                <h2 className="font-black">{app.name}</h2>
                <p>{app.email}</p>

                {resume && (
                  <a href={resume} target="_blank">
                    <Eye /> View CV
                  </a>
                )}

                <button
                  onClick={() => deleteApplication(app)}
                  className="text-red-600"
                >
                  <Trash2 />
                </button>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}