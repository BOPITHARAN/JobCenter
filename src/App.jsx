import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// 1. Axios-ஐ நீக்கிவிட்டு, நாம் உருவாக்கிய Supabase-ஐ import செய்கிறோம்
import { supabase } from "./api/supabaseClient";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Stats from "./components/Stats/Stats";
import Jobs from "./components/Jobs/Jobs";
import AIJobs from "./components/AIJobs/AIJobs";
import Features from "./components/Features/Features";
import TrendingSkills from "./components/TrendingSkills/TrendingSkills";
import Companies from "./components/Companies/Companies";
import DashboardPreview from "./components/DashboardPreview/DashboardPreview";
import Categories from "./components/Categories/Categories";
import FAQ from "./components/FAQ/FAQ";
import Newsletter from "./components/Newsletter/Newsletter";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AuthModal from "./components/AuthModal/AuthModal";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Error from "./components/Error/Error";
import Privacy from "./components/Privacy/Privacy";

import AdminPanel from "./admin/AdminPanel/AdminPanel";

function HomePage({
  user,
  setUser,
  setAuthModal,
  openAdminPanel,
  authModal,
  allJobs,
  searchParams,
  handleHeroSearch
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F0F3FA] text-[#395886]">
      <Navbar
        openAuth={setAuthModal}
        user={user}
        setUser={setUser}
        openAdmin={openAdminPanel}
      />

      {/* 🌟 1. PREMIUM HERO SECTION */}
      <section id="home">
        <Hero onSearch={handleHeroSearch} jobs={allJobs} />
      </section>

      {/* 🌟 2. JOBS GRID LAYER */}
      <section id="jobs" className="relative z-20 -mt-8 md:-mt-12">
        <Jobs search={searchParams} />
        <AIJobs isAdmin={user?.role === "admin"} />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="categories">
        <Categories />
      </section>

      <section id="companies">
        <Companies />
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="skills">
        <TrendingSkills />
      </section>

      <section id="dashboard">
        <DashboardPreview />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="newsletter">
        <Newsletter />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
      <ScrollToTop />

      {authModal && (
        <AuthModal
          type={authModal}
          onClose={() => setAuthModal(null)}
          setUser={setUser}
        />
      )}
    </main>
  );
}

export default function App() {
  const [authModal, setAuthModal] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // 🧠 CENTRAL SEARCH STATE MANAGERS
  const [allJobs, setAllJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    location: "Sri Lanka",
    category: "",
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // 2. Supabase மூலம் Jobs தரவுகளைப் பெறுகிறோம்
  useEffect(() => {
    const loadProductionJobsLogs = async () => {
      try {
        // உங்கள் டேட்டாபேஸில் உள்ள 'jobs' டேபிளில் இருந்து தரவுகளை எடுக்கிறோம்
        const { data, error } = await supabase
          .from('jobs')
          .select('*');

        if (error) {
          console.error("Supabase Fetch Error:", error.message);
        } else {
          setAllJobs(data || []);
        }
      } catch (error) {
        console.error("Unexpected Error:", error.message);
      }
    };
    loadProductionJobsLogs();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleHeroSearch = (searchData) => {
    setSearchParams(searchData);
  };

  const openAdminPanel = () => {
    if (!user) {
      alert("Please login first");
      setAuthModal("login");
      return;
    }

    if (user?.role !== "admin") {
      alert("Only admin can access this page");
      return;
    }

    setShowAdmin(true);
  };

  if (!isOnline) {
    return <Error />;
  }

  if (showAdmin && user?.role === "admin") {
    return <AdminPanel backHome={() => setShowAdmin(false)} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            user={user}
            setUser={setUser}
            setAuthModal={setAuthModal}
            openAdminPanel={openAdminPanel}
            authModal={authModal}
            allJobs={allJobs}
            searchParams={searchParams}
            handleHeroSearch={handleHeroSearch}
          />
        }
      />

      <Route path="/privacy" element={<Privacy />} />

      <Route
        path="*"
        element={
          <HomePage
            user={user}
            setUser={setUser}
            setAuthModal={setAuthModal}
            openAdminPanel={openAdminPanel}
            authModal={authModal}
            allJobs={allJobs}
            searchParams={searchParams}
            handleHeroSearch={handleHeroSearch}
          />
        }
      />
    </Routes>
  );
}