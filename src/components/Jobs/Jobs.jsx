// Drop-in Jobs component. Pass user={user} for immediate login/logout updates.
// Set showToaster={false} when your app already has a global Toaster.
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../api/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  Loader2,
  MapPin,
  RefreshCw,
  Search,
  Share2
} from "lucide-react";
import ApplyModal from "../ApplyModal/ApplyModal";
const PAGE_SIZE = 8;
const text = (value) => typeof value === "string" || typeof value === "number" ? String(value) : "";
const skillsOf = (value) => (Array.isArray(value) ? value : typeof value === "string" ? value.split(",") : []).map(text).map((s) => s.trim()).filter(Boolean);
const keyOf = (id) => String(id);
function readStoredUser() {
  try {
    if (typeof window === "undefined") return null;
    const value = JSON.parse(window.localStorage.getItem("user") || "null");
    return value && typeof value === "object" && value.id != null ? value : null;
  } catch {
    return null;
  }
}
function JobCard({ job, saved, saving, onSave, onApply, t }) {
  const [expanded, setExpanded] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [sharing, setSharing] = useState(false);
  const title = text(job.title) || t("jobTitle", "Job opportunity");
  const company = text(job.company) || t("company", "Company");
  const description = text(job.description);
  const skills = skillsOf(job.skills);
  const logo = text(job.logo || job.logo_url);
  useEffect(() => setLogoFailed(false), [logo]);
  const shareJob = async () => {
    if (sharing) return;
    setSharing(true);
    const url = new URL(window.location.href);
    url.hash = "jobs";
    const message = `${title} \u2014 ${company}${job.location ? `
${text(job.location)}` : ""}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text: message, url: url.href });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${message}
${url.href}`);
        toast.success(t("jobDetailsCopied", "Job details and link copied!"));
      } else {
        toast.error(t("shareUnavailable", "Sharing is unavailable in this browser. Please copy the page link."));
      }
    } catch (error) {
      if (error?.name !== "AbortError") toast.error(t("shareFailed", "Unable to share. Please try again."));
    } finally {
      setSharing(false);
    }
  };
  return <article className="group flex h-full min-w-0 flex-col rounded-3xl border border-[#E0E8F3] bg-white p-5 shadow-sm transition-shadow hover:shadow-lg motion-reduce:transition-none">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#E5ECF6] bg-[#F3F7FD] text-[#537BB0]">
          {logo && !logoFailed ? <img src={logo} alt={`${company} logo`} loading="lazy" onError={() => setLogoFailed(true)} className="h-full w-full object-contain p-1.5" /> : <Building2 size={24} aria-hidden="true" />}
        </div>
        <button type="button" onClick={shareJob} disabled={sharing} aria-label={`${t("share", "Share")}: ${title}`} className="flex h-11 w-11 items-center justify-center rounded-xl text-[#6C83A0] hover:bg-[#F0F5FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#638ECB] disabled:opacity-50">
          {sharing ? <Loader2 size={18} className="animate-spin motion-reduce:animate-none" /> : <Share2 size={18} />}
        </button>
      </div>
      <p className="mt-5 break-words text-xs font-bold tracking-wide text-[#6A84A5]">{company}</p>
      <h3 className="mt-1.5 break-words text-xl font-extrabold leading-snug text-[#28476F]">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {text(job.type) && <span className="rounded-lg bg-[#EDF3FC] px-2.5 py-1 text-xs font-semibold text-[#456A9B]">{text(job.type)}</span>}
        {job.days_left != null && text(job.days_left) !== "" && <span className="rounded-lg bg-[#F5F7FA] px-2.5 py-1 text-xs text-[#63758C]">{typeof job.days_left === "number" ? job.days_left > 0 ? `${job.days_left} ${t("daysLeft", "days left")}` : job.days_left === 0 ? t("closesToday", "Closes today") : t("deadlinePassed", "Deadline passed") : text(job.days_left)}</span>}
      </div>
      <p className="mt-4 flex items-start gap-2 text-sm text-[#687F9C]"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span className="break-words">{text(job.location) || t("locationNotSpecified", "Location not specified")}</span></p>
      <p className="mt-3 break-words text-sm font-bold text-[#365F92]">{text(job.salary) || t("salaryNotSpecified", "Salary not specified")}</p>
      {skills.length > 0 && <div className="mt-4 flex flex-wrap gap-1.5">{(expanded ? skills : skills.slice(0, 3)).map((skill, index) => <span key={`${skill}-${index}`} className="max-w-full break-words rounded-md border border-[#E5ECF5] px-2 py-1 text-[11px] text-[#7286A0]">{skill}</span>)}{!expanded && skills.length > 3 && <span className="px-1 py-1 text-[11px] text-[#7286A0]">+{skills.length - 3}</span>}</div>}
      {description && <p className={`mt-4 break-words text-sm leading-6 text-[#71839B] ${expanded ? "whitespace-pre-line" : "line-clamp-3"}`}>{description}</p>}
      {(description || skills.length > 3) && <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="mt-2 flex min-h-[44px] items-center gap-1 self-start rounded-lg text-xs font-bold text-[#456D9F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#638ECB]">{expanded ? t("showLess", "Show less") : t("readMore", "Read more")}{expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button>}
      <div className="mt-auto flex gap-2 border-t border-[#EDF1F7] pt-4">
        <button type="button" onClick={() => onSave(job)} disabled={saving} aria-pressed={saved} aria-label={`${saved ? t("unsaveJob", "Unsave job") : t("saveJob", "Save job")}: ${title}`} className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors disabled:cursor-wait disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#638ECB] ${saved ? "border-[#B7CDE8] bg-[#EAF1FB] text-[#395F91]" : "border-[#DFE7F2] text-[#748BA7] hover:bg-[#F3F7FD]"}`}>
          {saving ? <Loader2 size={18} className="animate-spin motion-reduce:animate-none" /> : <Heart size={19} fill={saved ? "currentColor" : "none"} />}
        </button>
        <button type="button" onClick={() => onApply(job)} className="flex min-h-[48px] min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-[#355E93] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#284B78] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#638ECB]">{t("applyNow", "Apply now")}<ArrowRight size={16} className="shrink-0" aria-hidden="true" /></button>
      </div>
    </article>;
}
function Jobs({ search, user: suppliedUser, showToaster = true }) {
  const { t } = useTranslation();
  const [storedUser, setStoredUser] = useState(readStoredUser);
  const user = suppliedUser !== void 0 ? suppliedUser : storedUser;
  const userId = user?.id;
  const userRef = useRef(user);
  userRef.current = user;
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reload, setReload] = useState(0);
  const [savedJobs, setSavedJobs] = useState(/* @__PURE__ */ new Set());
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedReady, setSavedReady] = useState(false);
  const [savedError, setSavedError] = useState(false);
  const [savedReload, setSavedReload] = useState(0);
  const [savingIds, setSavingIds] = useState(/* @__PURE__ */ new Set());
  const pendingSaves = useRef(/* @__PURE__ */ new Set());
  const [savedOnly, setSavedOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  useEffect(() => {
    const syncUser = () => setStoredUser(readStoredUser());
    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);
    window.addEventListener("auth-changed", syncUser);
    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
      window.removeEventListener("auth-changed", syncUser);
    };
  }, []);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    (async () => {
      try {
        const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        if (!cancelled) setJobs((data || []).filter((job) => job?.id != null));
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reload]);
  useEffect(() => {
    let cancelled = false;
    setSavedJobs(/* @__PURE__ */ new Set());
    setSavedReady(false);
    setSavedError(false);
    setSelectedJob(null);
    setSavedLoading(userId != null);
    if (userId == null) {
      setSavedOnly(false);
      return;
    }
    (async () => {
      try {
        const { data, error } = await supabase.from("saved_jobs").select("job_id").eq("user_id", userId);
        if (error) throw error;
        if (!cancelled) {
          setSavedJobs(new Set((data || []).map((item) => keyOf(item.job_id))));
          setSavedReady(true);
        }
      } catch {
        if (!cancelled) setSavedError(true);
      } finally {
        if (!cancelled) setSavedLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, savedReload]);
  const keyword = text(search?.keyword).trim().toLowerCase();
  const place = text(search?.location).trim().toLowerCase();
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const haystack = [job.title, job.company, job.description, ...skillsOf(job.skills)].map(text).join(" ").toLowerCase();
    const matchesKeyword = keyword.split(/\s+/).filter(Boolean).every((term) => haystack.includes(term));
    const matchesLocation = !place || place === "sri lanka" || text(job.location).toLowerCase().includes(place);
    return matchesKeyword && matchesLocation && (!savedOnly || savedJobs.has(keyOf(job.id)));
  }), [jobs, keyword, place, savedOnly, savedJobs]);
  useEffect(() => setVisibleCount(PAGE_SIZE), [keyword, place, savedOnly]);
  const currentUser = () => suppliedUser !== void 0 ? userRef.current : readStoredUser();
  const requireUser = () => {
    const account = currentUser();
    if (suppliedUser === void 0) setStoredUser(account);
    if (account?.id == null) {
      toast.error(t("loginFirst", "Please login first!"));
      return null;
    }
    return account;
  };
  const toggleSave = async (job) => {
    const account = requireUser();
    if (!account) return;
    if (keyOf(account.id) !== keyOf(userId) || !savedReady) {
      toast.error(t("savedNotReady", "Please wait for saved jobs to load, or use Retry."));
      return;
    }
    const key = keyOf(job.id);
    if (pendingSaves.current.has(key)) return;
    const wasSaved = savedJobs.has(key);
    pendingSaves.current.add(key);
    setSavingIds(new Set(pendingSaves.current));
    try {
      const { error } = wasSaved ? await supabase.from("saved_jobs").delete().eq("user_id", account.id).eq("job_id", job.id) : await supabase.from("saved_jobs").insert([{ user_id: account.id, job_id: job.id }]);
      if (error && (wasSaved || error.code !== "23505")) throw error;
      if (keyOf(currentUser()?.id) !== keyOf(account.id)) return;
      setSavedJobs((previous) => {
        const next = new Set(previous);
        if (wasSaved) next.delete(key);
        else next.add(key);
        return next;
      });
      toast.success(wasSaved ? t("jobRemoved", "Job removed from saved jobs.") : t("jobSaved", "Job saved successfully!"));
    } catch {
      toast.error(t("saveFailed", "Unable to update saved jobs. Please try again."));
    } finally {
      pendingSaves.current.delete(key);
      setSavingIds(new Set(pendingSaves.current));
    }
  };
  const apply = (job) => {
    if (requireUser()) setSelectedJob(job);
  };
  const buttonStyle = "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#DAE5F3] bg-white px-4 py-2 text-sm font-bold text-[#426894] hover:bg-[#EDF3FC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#638ECB]";
  return <>
      {showToaster && <Toaster position="top-center" containerStyle={{ top: 90, zIndex: 1e4 }} />}
      <section id="jobs" aria-labelledby="jobs-heading" className="scroll-mt-28 bg-[#F5F8FD] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C96B7]">{t("nextOpportunity", "YOUR NEXT OPPORTUNITY")}</p><h2 id="jobs-heading" className="mt-3 text-3xl font-extrabold tracking-tight text-[#28476F] sm:text-4xl">{t("recent", "Recent")} <span className="text-[#638ECB]">{t("jobs", "Jobs")}</span></h2><p className="mt-3 text-sm text-[#7488A3]">{t("jobsIntro", "Explore opportunities that match your skills and ambitions.")}</p></div>
            <div className="flex flex-wrap gap-2"><button type="button" aria-pressed={!savedOnly} onClick={() => setSavedOnly(false)} className={buttonStyle}>{!savedOnly && <Check size={15} />}{t("allJobs", "All jobs")}</button><button type="button" aria-pressed={savedOnly} onClick={() => {
    if (requireUser()) setSavedOnly((value) => !value);
  }} className={buttonStyle}><Heart size={15} fill={savedOnly ? "currentColor" : "none"} />{t("savedJobs", "Saved jobs")}{userId != null && savedReady ? ` (${savedJobs.size})` : ""}</button></div>
          </div>
          {!loading && !loadError && <p role="status" className="mt-7 text-xs text-[#7C8FA8]">{filteredJobs.length} {t("matchingJobs", "matching jobs")}{keyword ? ` \xB7 \u201C${text(search?.keyword).trim()}\u201D` : ""}</p>}
          {savedError && <div role="alert" className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{t("savedLoadFailed", "Saved jobs could not be loaded.")}<button type="button" className={buttonStyle} onClick={() => setSavedReload((n) => n + 1)}>{t("retry", "Retry")}</button></div>}
          {loading || savedOnly && savedLoading ? <div role="status" aria-label={t("loadingJobs", "Loading jobs")} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 4 }, (_, i) => <div key={i} aria-hidden="true" className="h-[420px] animate-pulse rounded-3xl border border-[#E1E9F4] bg-white p-5 motion-reduce:animate-none"><div className="h-14 w-14 rounded-2xl bg-[#EAF0F8]" /><div className="mt-6 h-4 w-2/3 rounded bg-[#EAF0F8]" /><div className="mt-4 h-6 rounded bg-[#EAF0F8]" /><div className="mt-6 h-24 rounded bg-[#F3F6FB]" /><div className="mt-10 h-12 rounded-xl bg-[#EAF0F8]" /></div>)}</div> : loadError ? <div role="alert" className="mt-8 rounded-3xl border border-[#E1E9F4] bg-white p-10 text-center"><p className="mb-4 text-[#526E91]">{t("jobsLoadFailed", "Unable to load jobs. Please try again.")}</p><button type="button" onClick={() => setReload((n) => n + 1)} className={buttonStyle}><RefreshCw size={16} />{t("retry", "Retry")}</button></div> : savedOnly && savedError ? null : filteredJobs.length === 0 ? <div className="mt-8 rounded-3xl border border-dashed border-[#CDDCEF] bg-white p-10 text-center"><Search size={30} className="mx-auto text-[#90A9C9]" aria-hidden="true" /><h3 className="mt-4 text-lg font-bold text-[#35567F]">{savedOnly ? t("noSavedMatches", "No saved jobs match this search") : t("noJobsFound", "No jobs found")}</h3><p className="mx-auto mt-2 max-w-md text-sm text-[#7A8FA9]">{savedOnly ? t("saveHint", "Save a job using its heart button, or change your search.") : t("searchHint", "Try a different keyword or location, or check back for new opportunities.")}</p>{savedOnly && <button type="button" onClick={() => setSavedOnly(false)} className={`${buttonStyle} mt-5`}>{t("allJobs", "All jobs")}</button>}</div> : <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filteredJobs.slice(0, visibleCount).map((job) => <JobCard key={job.id} job={job} saved={savedJobs.has(keyOf(job.id))} saving={savingIds.has(keyOf(job.id)) || savedLoading} onSave={toggleSave} onApply={apply} t={t} />)}</div>}
          {!loading && !loadError && !(savedOnly && (savedLoading || savedError)) && visibleCount < filteredJobs.length && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className={`${buttonStyle} px-7`}><BriefcaseBusiness size={17} />{t("loadMore", "Load more jobs")}<ChevronDown size={16} /></button></div>}
        </div>
      </section>
      {selectedJob && userId != null && <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </>;
}
export {
  Jobs as default
};