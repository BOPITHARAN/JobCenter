import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  Home,
  Info,
  BriefcaseBusiness,
  Building2,
  Phone,
  ShieldCheck,
} from "lucide-react";

import logo from "../../assets/logo.png";

export default function Navbar({
  openAuth = () => {},
  openAdmin = () => {},
  user,
  setUser = () => {},
}) {
  const { t, i18n } = useTranslation();

  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  const navItems = [
    { label: t("home", "Home"), id: "home", icon: Home },
    { label: t("about", "About"), id: "about", icon: Info },
    { label: t("jobs", "Jobs"), id: "jobs", icon: BriefcaseBusiness },
    { label: t("companies", "Companies"), id: "companies", icon: Building2 },
    { label: t("contact", "Contact"), id: "contact", icon: Phone },
  ];

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "en";
    setSelectedLang(lang);
    i18n?.changeLanguage?.(lang);
  }, [i18n]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    localStorage.setItem("lang", lang);
    i18n?.changeLanguage?.(lang);
  };

  const goTo = (item) => {
    setActive(item.id);

    document.getElementById(item.id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileMenu(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setMobileMenu(false);
  };

  const openLogin = () => {
    openAuth("login");
    setMobileMenu(false);
  };

  const openAdminPanel = () => {
    openAdmin();
    setMobileMenu(false);
  };

  return (
    <>
      <nav
        className={`fixed left-0 z-[999] flex w-full justify-center px-3 transition-all duration-300 ${
          isScrolled ? "top-2" : "top-4"
        }`}
      >
        <div className="relative w-full max-w-7xl overflow-hidden rounded-[30px] border border-white/70 bg-gradient-to-r from-[#F0F3FA]/95 via-[#D5DEEF]/95 to-[#B1C9EF]/95 shadow-[0_20px_70px_rgba(57,88,134,0.24)] backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-transparent to-[#638ECB]/20" />

          <div className="pointer-events-none absolute -left-20 top-0 h-44 w-44 rounded-full bg-[#F0F3FA]/90 blur-[100px]" />
          <div className="pointer-events-none absolute left-1/3 top-0 h-40 w-40 rounded-full bg-[#8AAEE0]/35 blur-[90px]" />
          <div className="pointer-events-none absolute right-20 top-0 h-44 w-44 rounded-full bg-[#638ECB]/25 blur-[100px]" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-[#395886]/20 blur-[90px]" />

          <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />

          <div className="relative flex h-[72px] items-center justify-between gap-3 px-4 lg:px-6">

            {/* LOGO */}
            <button
              type="button"
              onClick={() => goTo(navItems[0])}
              className="group flex w-[250px] shrink-0 items-center gap-3"
            >
              <img
                src={logo}
                alt="JobCenter+ Logo"
                className="h-18 w-18 rounded-full bg-transparent object-cover shadow-[0_10px_25px_rgba(57,88,134,0.18)]"
              />

              <div className="min-w-0 text-left">
                <h1 className="truncate text-lg font-black tracking-wide text-[#395886]">
                  JobCenter+
                </h1>

                <p className="hidden truncate text-[10px] font-extrabold uppercase tracking-[2px] text-[#395886]/80 sm:block">
                  KILI PEOPLE
                </p>
              </div>
            </button>

            {/* DESKTOP MENU */}
            <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden lg:flex">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    onClick={() => goTo(item)}
                    className={`flex h-11 w-[118px] items-center justify-center gap-2 rounded-2xl px-3 text-sm font-extrabold transition-all duration-300 ${
                      active === item.id
                        ? "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white shadow-[0_0_30px_rgba(99,142,203,0.55)]"
                        : "text-[#395886] hover:bg-white/65 hover:shadow-[0_10px_25px_rgba(57,88,134,0.12)]"
                    }`}
                  >
                    <Icon size={16} />
                    <span className="max-w-[74px] truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ACTIONS */}
            <div className="hidden w-[330px] shrink-0 items-center justify-end gap-2 lg:flex">
              <LanguageSelect
                value={selectedLang}
                changeLanguage={changeLanguage}
              />

              {!user ? (
                <NavButton
                  text={t("login", "Login")}
                  icon={<LogIn size={16} />}
                  onClick={openLogin}
                  dark
                />
              ) : (
                <NavButton
                  text={t("logout", "Logout")}
                  icon={<LogOut size={16} />}
                  onClick={logout}
                  dark
                />
              )}

              <NavButton
                text="Admin"
                icon={<ShieldCheck size={16} />}
                onClick={openAdminPanel}
              />
            </div>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenu((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/55 text-[#395886] shadow-[0_10px_25px_rgba(57,88,134,0.14)] backdrop-blur-xl lg:hidden"
            >
              {mobileMenu ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>

          {/* MOBILE MENU */}
          {mobileMenu && (
            <div className="relative max-h-[80vh] overflow-y-auto border-t border-white/60 bg-gradient-to-b from-[#F0F3FA]/98 via-[#D5DEEF]/98 to-[#B1C9EF]/98 p-4 backdrop-blur-2xl lg:hidden">
              <LanguageSelect
                full
                value={selectedLang}
                changeLanguage={changeLanguage}
              />

              <div className="mt-4 grid gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(item)}
                      className={`flex h-12 w-full items-center gap-3 rounded-2xl px-4 text-left text-sm font-extrabold ${
                        active === item.id
                          ? "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white"
                          : "bg-white/55 text-[#395886] hover:bg-white/80"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-2 border-t border-white/60 pt-4">
                {!user ? (
                  <NavButton
                    text={t("login", "Login")}
                    icon={<LogIn size={16} />}
                    onClick={openLogin}
                    dark
                    full
                  />
                ) : (
                  <NavButton
                    text={t("logout", "Logout")}
                    icon={<LogOut size={16} />}
                    onClick={logout}
                    dark
                    full
                  />
                )}

                <NavButton
                  text="Admin"
                  icon={<ShieldCheck size={16} />}
                  onClick={openAdminPanel}
                  full
                />
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="h-[96px]" />
    </>
  );
}

function LanguageSelect({ full = false, value = "en", changeLanguage }) {
  const languages = [
    { code: "en", label: "English" },
    { code: "ta", label: "தமிழ்" },
    { code: "si", label: "සිංහල" },
  ];

  return (
    <select
      value={value}
      onChange={(e) => changeLanguage(e.target.value)}
      className={`h-11 rounded-2xl border border-white/80 bg-white/55 px-3 text-sm font-extrabold text-[#395886] ${
        full ? "w-full" : "w-[132px]"
      }`}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

function NavButton({ text, icon, onClick, dark = false, full = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-11 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-black ${
        dark
          ? "bg-gradient-to-r from-[#395886] via-[#638ECB] to-[#8AAEE0] text-white"
          : "border border-white/80 bg-white/55 text-[#395886]"
      } ${full ? "w-full" : "w-[92px]"}`}
    >
      {icon}
      <span className="truncate">{text}</span>
    </button>
  );
}