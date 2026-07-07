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
  User,
  Settings
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
      {/* 1. DESKTOP NAVBAR */}
      <nav className={`hidden lg:flex fixed left-0 z-[999] w-full justify-center px-3 transition-all duration-300 ${isScrolled ? "top-2" : "top-4"}`}>
        <div className="relative w-full max-w-7xl overflow-hidden rounded-[30px] border border-white/70 bg-gradient-to-r from-[#F0F3FA]/95 via-[#D5DEEF]/95 to-[#B1C9EF]/95 shadow-[0_20px_70px_rgba(57,88,134,0.24)] backdrop-blur-3xl">
          <div className="relative flex h-[72px] items-center justify-between gap-4 px-6">
            <button onClick={() => goTo(navItems[0])} className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-full object-cover shadow-lg aspect-square" />
              <div className="text-left">
                <h1 className="text-lg font-black text-[#395886]">JobCenter+</h1>
              </div>
            </button>

            <div className="flex-1 flex items-center justify-center gap-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => goTo(item)} className={`flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-extrabold ${active === item.id ? "bg-gradient-to-r from-[#395886] to-[#638ECB] text-white" : "text-[#395886]"}`}>
                  <item.icon size={16} /> <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <NavButton text={user ? t("logout", "Logout") : t("login", "Login")} icon={user ? <LogOut size={16} /> : <LogIn size={16} />} onClick={user ? () => setUser(null) : openAuth} dark />
              <button onClick={openAdmin} className="h-11 w-11 flex items-center justify-center rounded-2xl border border-[#395886]/20 text-[#395886]"><ShieldCheck size={20} /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. MOBILE TOP HEADER */}
      <div className={`fixed z-[998] flex items-center justify-between lg:hidden transition-all duration-300 ${isScrolled ? "top-3 left-3 right-3 rounded-2xl bg-white/80 px-4 py-2 shadow-lg border border-white/50" : "top-2 left-2 right-2 rounded-2xl bg-[#F0F3FA]/40 px-3 py-1.5 border border-white/30"}`}>
        <button onClick={() => goTo(navItems[0])} className="flex items-center gap-2 outline-none">
          {/* Logo is now perfectly circular */}
          <img src={logo} alt="Logo" className="h-9 w-9 rounded-full object-cover shadow-sm aspect-square" />
          <h1 className="text-base font-black tracking-wide text-[#395886]">JobCenter+</h1>
        </button>
        <button onClick={user ? () => setUser(null) : openAuth} className="h-9 w-9 flex items-center justify-center rounded-full bg-[#395886] text-white">
          {user ? <LogOut size={15} /> : <User size={15} />}
        </button>
      </div>

      {/* 3. MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 z-[999] w-full rounded-t-[30px] bg-[#FAF9F4]/95 backdrop-blur-xl px-6 pt-4 pb-2 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] border-t border-white/60 lg:hidden">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => goTo(item)} className="relative flex flex-col items-center justify-center p-2">
              <item.icon size={22} className={active === item.id ? "text-[#1A1A1A]" : "text-[#8E8E93]"} />
              <span className={`absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#1A1A1A] transition-all ${active === item.id ? "scale-100" : "scale-0"}`} />
            </button>
          ))}
          <button onClick={openAdmin} className="p-2 text-[#8E8E93]"><Settings size={22} /></button>
        </div>
        <div className="mx-auto mt-4 h-[4px] w-12 rounded-full bg-[#D1D1D6]" />
      </div>

      <div className="hidden lg:block h-[96px] w-full" />
    </>
  );
}

function NavButton({ text, icon, onClick, dark = false }) {
  return (
    <button onClick={onClick} className={`flex h-11 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-black ${dark ? "bg-gradient-to-r from-[#395886] to-[#638ECB] text-white" : "border border-[#395886]/20 text-[#395886]"}`}>
      {icon} {text}
    </button>
  );
}