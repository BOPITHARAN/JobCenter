import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  LogIn,
  Home,
  Info,
  BriefcaseBusiness,
  Building2,
  Phone,
  ShieldCheck,
  User
} from "lucide-react";

import logo from "../../assets/logo.png";

export default function Navbar({
  openAuth = () => {},
  openAdmin = () => {},
  user,
  setUser = () => {},
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Nav Items (Ordered as requested: Home, Jobs, About, Companies, Contact)
  const navItems = [
    { label: t("navHome", "Home"), id: "home", icon: Home },
    { label: t("navJobs", "Jobs"), id: "jobs", icon: BriefcaseBusiness },
    { label: t("navAbout", "About"), id: "about", icon: Info },
    { label: t("navCompanies", "Companies"), id: "companies", icon: Building2 },
    { label: t("navContact", "Contact"), id: "contact", icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = (item) => {
    setActive(item.id);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* ========================================= */}
      {/* 1. DESKTOP NAVBAR (Top Floating Glassmorphism) */}
      {/* ========================================= */}
      <nav className={`hidden lg:flex fixed left-0 z-[999] w-full justify-center px-3 transition-all duration-300 ${isScrolled ? "top-2" : "top-4"}`}>
        <div className="relative w-full max-w-7xl overflow-hidden rounded-[30px] border border-white/70 bg-gradient-to-r from-[#F0F3FA]/95 via-[#D5DEEF]/95 to-[#B1C9EF]/95 shadow-[0_20px_70px_rgba(57,88,134,0.24)] backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-transparent to-[#638ECB]/20" />

          {/* Glowing Orbs */}
          <div className="pointer-events-none absolute -left-20 top-0 h-44 w-44 rounded-full bg-[#F0F3FA]/90 blur-[100px]" />
          <div className="pointer-events-none absolute right-20 top-0 h-44 w-44 rounded-full bg-[#638ECB]/25 blur-[100px]" />

          <div className="relative flex h-[72px] items-center justify-between gap-4 px-6">
            
            {/* LOGO */}
            <button onClick={() => goTo(navItems[0])} className="group flex w-[220px] shrink-0 items-center gap-3 outline-none">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-full object-cover shadow-lg" />
              <div className="text-left">
                <h1 className="text-lg font-black tracking-wide text-[#395886]">JobCenter+</h1>
                <p className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#395886]/80">KILI PEOPLE</p>
              </div>
            </button>

            {/* DESKTOP MENU ITEMS */}
            <div className="flex-1 flex items-center justify-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => goTo(item)}
                    className={`flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition-all duration-300 ${
                      active === item.id 
                      ? "bg-gradient-to-r from-[#395886] to-[#638ECB] text-white shadow-lg" 
                      : "text-[#395886] hover:bg-white/60"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="flex items-center gap-2">
              <NavButton text={user ? t("logout", "Logout") : t("login", "Login")} icon={user ? <LogOut size={16} /> : <LogIn size={16} />} onClick={user ? () => setUser(null) : openAuth} dark />
              <NavButton text="Admin" icon={<ShieldCheck size={16} />} onClick={openAdmin} />
            </div>
          </div>
        </div>
      </nav>


      {/* ========================================= */}
      {/* 2. MOBILE TOP HEADER (Floating Glass Pill) */}
      {/* ========================================= */}
      <div className={`fixed z-[998] flex items-center justify-between transition-all duration-300 lg:hidden ${
          isScrolled 
            ? "top-3 left-3 right-3 rounded-2xl bg-white/80 px-4 py-2.5 shadow-lg backdrop-blur-xl border border-white/50" 
            : "top-2 left-2 right-2 rounded-2xl bg-[#F0F3FA]/40 px-3 py-2 shadow-sm backdrop-blur-md border border-white/30"
        }`}
      >
        <button onClick={() => goTo(navItems[0])} className="flex items-center gap-2 outline-none">
          {/* Logo made slightly smaller for mobile */}
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-full object-cover shadow-sm bg-transparent" />
          <h1 className="text-base font-black tracking-wide text-[#395886]">JobCenter+</h1>
        </button>
        
        <button 
          onClick={user ? () => setUser(null) : openAuth}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#395886] to-[#638ECB] text-white shadow-md transition-transform active:scale-95"
        >
          {user ? <LogOut size={14} /> : <User size={14} />}
        </button>
      </div>


      {/* ========================================= */}
      {/* 3. MOBILE BOTTOM NAVIGATION (Perfect iOS Style) */}
      {/* ========================================= */}
      <div className="fixed bottom-0 left-0 z-[999] w-full rounded-t-[30px] bg-[#FAF9F4]/95 backdrop-blur-xl px-6 pt-4 pb-2 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] border-t border-white/60 lg:hidden">
        <div className="flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => goTo(item)}
                className="relative flex flex-col items-center justify-center p-2 outline-none transition-transform active:scale-95"
              >
                <Icon 
                  size={24} 
                  strokeWidth={isActive ? 2.5 : 1.5} 
                  className={`transition-colors duration-300 ${isActive ? "text-[#1A1A1A]" : "text-[#8E8E93]"}`} 
                />
                <span 
                  className={`absolute -bottom-1 h-[5px] w-[5px] rounded-full bg-[#1A1A1A] transition-all duration-300 ${isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} 
                />
              </button>
            );
          })}
        </div>
        <div className="mx-auto mt-4 h-[4px] w-12 rounded-full bg-[#D1D1D6]" />
      </div>

      {/* Desktop spacer ONLY. Mobile spacer completely removed to fix padding issue! */}
      <div className="hidden lg:block h-[96px] w-full" />
    </>
  );
}

// Desktop Button Component
function NavButton({ text, icon, onClick, dark = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black transition-all ${
        dark 
        ? "bg-gradient-to-r from-[#395886] to-[#638ECB] text-white shadow-md hover:scale-[1.02]" 
        : "border border-[#395886]/20 text-[#395886] hover:bg-white/80"
      }`}
    >
      {icon} {text}
    </button>
  );
}