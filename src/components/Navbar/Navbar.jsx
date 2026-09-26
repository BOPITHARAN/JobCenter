import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronDown,
  Home,
  Info,
  LogIn,
  LogOut,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import logo from "../../assets/logo.png";

const NAV_ITEMS = [
  { key: "navHome", label: "Home", id: "home", icon: Home },
  { key: "navJobs", label: "Jobs", id: "jobs", icon: BriefcaseBusiness },
  { key: "navAbout", label: "About", id: "about", icon: Info },
  {
    key: "navCompanies",
    label: "Companies",
    id: "companies",
    icon: Building2,
  },
  { key: "navContact", label: "Contact", id: "contact", icon: Phone },
];

function findSection(id) {
  if (id === "job-fair") {
    return (
      document.getElementById("job-fair") ||
      document.getElementById("jcp-event-title")?.closest("section")
    );
  }

  return document.getElementById(id);
}

export default function Navbar({
  openAuth = () => {},
  openAdmin = () => {},
  user,
  setUser = () => {},
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const headerRef = useRef(null);
  const accountRef = useRef(null);
  const accountButtonRef = useRef(null);

  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState(null);

  const displayName =
    user?.name || user?.fullName || user?.email || t("account", "Account");

  // Track the section currently visible below the fixed header.
  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);

      if (location.pathname !== "/") {
        setActive("");
        return;
      }

      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 80;

      const marker = headerBottom + 90;
      let current = "home";
      let closestTop = -Infinity;

      const ids = [...NAV_ITEMS.map((item) => item.id), "job-fair"];

      ids.forEach((id) => {
        const section = findSection(id);
        if (!section) return;

        const top = section.getBoundingClientRect().top;

        if (top <= marker && top > closestTop) {
          closestTop = top;
          current = id;
        }
      });

      setActive(current);
    };

    const requestUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateNavigation);
      }
    };

    updateNavigation();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [location.pathname]);

  // Support section links when arriving from another route.
  useEffect(() => {
    setAccountOpen(false);

    if (location.pathname !== "/" || !location.hash) return;

    const id = location.hash.slice(1);
    const validIds = [...NAV_ITEMS.map((item) => item.id), "job-fair"];

    if (validIds.includes(id)) {
      setPendingTarget({ id });
    }
  }, [location.pathname, location.hash]);

  // Wait for the target section to mount instead of using a fixed delay.
  useEffect(() => {
    if (location.pathname !== "/" || !pendingTarget) return;

    const { id } = pendingTarget;
    let observer;
    let timeout;

    const scrollToTarget = () => {
      const section = findSection(id);

      // Home always returns to the top, even without an element ID.
      if (id !== "home" && !section) return false;

      const headerBottom =
        headerRef.current?.getBoundingClientRect().bottom ?? 80;

      const top =
        id === "home"
          ? 0
          : Math.max(
              0,
              window.scrollY +
                section.getBoundingClientRect().top -
                headerBottom -
                16
            );

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top,
        behavior: reducedMotion ? "auto" : "smooth",
      });

      setActive(id);
      setPendingTarget(null);
      return true;
    };

    if (scrollToTarget()) return;

    observer = new MutationObserver(() => {
      if (scrollToTarget()) {
        observer.disconnect();
        window.clearTimeout(timeout);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    timeout = window.setTimeout(() => {
      observer.disconnect();
      setPendingTarget(null);
    }, 10000);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pendingTarget, location.pathname]);

  // Dismiss the account panel with Escape or an outside click.
  useEffect(() => {
    if (!accountOpen) return;

    const onPointerDown = (event) => {
      if (!accountRef.current?.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
        accountButtonRef.current?.focus();
      }
    };

    const onFocusIn = (event) => {
      if (!accountRef.current?.contains(event.target)) {
        setAccountOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [accountOpen]);

  const goTo = (id) => {
    setAccountOpen(false);
    setPendingTarget({ id });

    if (location.pathname !== "/") {
      navigate({
        pathname: "/",
        hash: id === "home" ? "" : `#${id}`,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);

    // Preserves your existing logout behaviour.
    window.location.reload();
  };

  const handleLogin = () => {
    setAccountOpen(false);
    openAuth();
  };

  const handleAdmin = () => {
    setAccountOpen(false);
    openAdmin();
  };

  return (
    <>
      <style>{navbarStyles}</style>

      {/* TOP NAVIGATION */}
      <header
        ref={headerRef}
        className={`jcp-nav-header ${
          isScrolled ? "jcp-nav-scrolled" : ""
        }`}
      >
        <div className="jcp-nav-bar">
          <button
            type="button"
            className="jcp-nav-brand"
            onClick={() => goTo("home")}
            aria-label={t("navGoHome", "Job Center Plus home")}
          >
            <img
              src={logo}
              alt=""
              className="jcp-nav-logo"
              width="44"
              height="44"
            />

            <span className="jcp-nav-brand-copy">
              <strong>
                JobCenter<span>+</span>
              </strong>
              <small>KILINOCHCHI</small>
            </span>
          </button>

          <nav
            className="jcp-nav-desktop"
            aria-label={t("mainNavigation", "Main navigation")}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  className={`jcp-nav-link ${
                    selected ? "jcp-nav-link-active" : ""
                  }`}
                  aria-current={selected ? "location" : undefined}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{t(item.key, item.label)}</span>
                </button>
              );
            })}
          </nav>

          <div className="jcp-nav-actions">
            <button
              type="button"
              className={`jcp-nav-event ${
                active === "job-fair" ? "jcp-nav-event-active" : ""
              }`}
              onClick={() => goTo("job-fair")}
              aria-label={t("viewJobFair", "View Job Fair 2026")}
              aria-current={
                active === "job-fair" ? "location" : undefined
              }
            >
              <CalendarDays size={16} aria-hidden="true" />
              <span className="jcp-nav-event-label">
                {t("jobFair", "Job Fair")}
                <span className="jcp-nav-event-year"> 2026</span>
              </span>
              <ArrowUpRight
                size={15}
                className="jcp-nav-event-arrow"
                aria-hidden="true"
              />
            </button>

            {/* ACCOUNT PANEL */}
            <div className="jcp-nav-account" ref={accountRef}>
              <button
                ref={accountButtonRef}
                type="button"
                className={`jcp-nav-account-trigger ${
                  accountOpen ? "jcp-nav-account-open" : ""
                }`}
                aria-expanded={accountOpen}
                aria-controls="jcp-navbar-account-panel"
                aria-label={
                  user
                    ? t("accountOptions", "Account options")
                    : t("loginOptions", "Login and account options")
                }
                onClick={() => setAccountOpen((open) => !open)}
              >
                {user ? (
                  <User size={18} aria-hidden="true" />
                ) : (
                  <LogIn size={18} aria-hidden="true" />
                )}

                <span className="jcp-nav-account-text">
                  {user ? t("account", "Account") : t("login", "Login")}
                </span>

                <ChevronDown
                  size={14}
                  className="jcp-nav-account-chevron"
                  aria-hidden="true"
                />
              </button>

              {accountOpen && (
                <div
                  id="jcp-navbar-account-panel"
                  className="jcp-nav-panel"
                  role="region"
                  aria-label={t("accountOptions", "Account options")}
                >
                  <div className="jcp-nav-panel-heading">
                    <div>
                      <small>
                        {user
                          ? t("signedInAs", "SIGNED IN AS")
                          : t("welcome", "WELCOME")}
                      </small>
                      <strong title={user ? displayName : undefined}>
                        {user ? displayName : "Job Center Plus"}
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="jcp-nav-panel-close"
                      aria-label={t("closeAccountMenu", "Close account menu")}
                      onClick={() => {
                        setAccountOpen(false);
                        accountButtonRef.current?.focus();
                      }}
                    >
                      <X size={17} aria-hidden="true" />
                    </button>
                  </div>

                  {!user && (
                    <button
                      type="button"
                      className="jcp-nav-panel-item"
                      onClick={handleLogin}
                    >
                      <LogIn size={18} aria-hidden="true" />
                      <span>{t("login", "Login")}</span>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </button>
                  )}

                  <button
                    type="button"
                    className="jcp-nav-panel-item"
                    onClick={handleAdmin}
                  >
                    <ShieldCheck size={18} aria-hidden="true" />
                    <span>{t("adminAccess", "Admin access")}</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>

                  {user && (
                    <button
                      type="button"
                      className="jcp-nav-panel-item jcp-nav-logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} aria-hidden="true" />
                      <span>{t("logout", "Logout")}</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav
        className="jcp-nav-bottom"
        aria-label={t("mobileNavigation", "Mobile navigation")}
      >
        <div className="jcp-nav-bottom-inner">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const selected = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(item.id)}
                className={`jcp-nav-mobile-link ${
                  selected ? "jcp-nav-mobile-active" : ""
                }`}
                aria-current={selected ? "location" : undefined}
              >
                <span className="jcp-nav-mobile-icon">
                  <Icon
                    size={20}
                    strokeWidth={selected ? 2.3 : 1.8}
                    aria-hidden="true"
                  />
                </span>

                <span className="jcp-nav-mobile-label">
                  {t(item.key, item.label)}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

const navbarStyles = `
.jcp-nav-header,
.jcp-nav-bottom {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #28476f;
}

.jcp-nav-header *,
.jcp-nav-bottom * {
  box-sizing: border-box;
}

.jcp-nav-header button,
.jcp-nav-bottom button {
  font: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.jcp-nav-header button:focus-visible,
.jcp-nav-bottom button:focus-visible {
  outline: 3px solid #7298cc;
  outline-offset: 3px;
}

.jcp-nav-header {
  position: fixed;
  top: 14px;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 0 20px;
  transition: top 180ms ease;
}

.jcp-nav-bar {
  max-width: 1240px;
  min-height: 72px;
  margin: 0 auto;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: rgba(255, 255, 255, 0.97);
  border: 1px solid #e0e8f3;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(41, 71, 110, 0.07);
  transition: box-shadow 180ms ease;
}

@supports (backdrop-filter: blur(16px)) {
  .jcp-nav-bar {
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(16px);
  }
}

.jcp-nav-scrolled {
  top: 8px;
}

.jcp-nav-scrolled .jcp-nav-bar {
  box-shadow: 0 12px 35px rgba(41, 71, 110, 0.13);
}

.jcp-nav-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 9px;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
}

.jcp-nav-logo {
  display: block;
  width: 44px;
  height: 44px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 50%;
  background: #fff;
}

.jcp-nav-brand-copy strong {
  display: block;
  color: #28476f;
  font-size: 17px;
  line-height: 1.2;
  font-weight: 850;
  letter-spacing: -0.6px;
}

.jcp-nav-brand-copy strong > span {
  color: #5d86bc;
}

.jcp-nav-brand-copy small {
  display: block;
  margin-top: 4px;
  color: #7990ac;
  font-size: 7px;
  font-weight: 750;
  letter-spacing: 2px;
}

.jcp-nav-desktop {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.jcp-nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 42px;
  padding: 0 11px;
  border: 0;
  border-radius: 11px;
  background: transparent;
  color: #647b98;
  font-size: 12px !important;
  font-weight: 700 !important;
  white-space: nowrap;
  transition: background 160ms ease, color 160ms ease;
}

.jcp-nav-link:hover {
  color: #315b8e;
  background: #f0f5fc;
}

.jcp-nav-link-active,
.jcp-nav-link-active:hover {
  background: #355e93;
  color: white;
  box-shadow: 0 4px 12px #355e9320;
}

.jcp-nav-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 9px;
}

.jcp-nav-event {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid #f0d4b4;
  border-radius: 11px;
  background: #fff4e6;
  color: #a54c0b;
  font-size: 11px !important;
  font-weight: 750 !important;
  white-space: nowrap;
  transition: background 160ms ease;
}

.jcp-nav-event:hover,
.jcp-nav-event-active {
  background: #ffe7c8;
}

.jcp-nav-account {
  position: relative;
}

.jcp-nav-account-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid #dce6f3;
  border-radius: 11px;
  background: #f3f7fd;
  color: #355b8b;
  font-size: 11px !important;
  font-weight: 750 !important;
}

.jcp-nav-account-trigger:hover,
.jcp-nav-account-open {
  background: #e8f0fb;
}

.jcp-nav-account-chevron {
  transition: transform 160ms ease;
}

.jcp-nav-account-open .jcp-nav-account-chevron {
  transform: rotate(180deg);
}

.jcp-nav-panel {
  position: absolute;
  top: calc(100% + 14px);
  right: 0;
  width: min(280px, calc(100vw - 32px));
  padding: 8px;
  border: 1px solid #e0e8f3;
  border-radius: 17px;
  background: white;
  box-shadow: 0 18px 55px rgba(30, 57, 94, 0.18);
}

.jcp-nav-panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 10px 14px;
  margin-bottom: 5px;
  border-bottom: 1px solid #edf1f7;
}

.jcp-nav-panel-heading > div {
  min-width: 0;
}

.jcp-nav-panel-heading small {
  display: block;
  color: #8294ac;
  font-size: 8px;
  font-weight: 750;
  letter-spacing: 1.5px;
}

.jcp-nav-panel-heading strong {
  display: block;
  max-width: 195px;
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #355274;
  font-size: 13px;
}

.jcp-nav-panel-close {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border: 0;
  border-radius: 9px;
  background: #f4f7fb;
  color: #6b809c;
}

.jcp-nav-panel-item {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  min-height: 46px;
  padding: 11px 12px;
  border: 0;
  border-radius: 10px;
  background: white;
  color: #466487;
  text-align: left;
  font-size: 12px !important;
  font-weight: 650 !important;
}

.jcp-nav-panel-item > span {
  flex: 1;
}

.jcp-nav-panel-item:hover {
  background: #f1f6fc;
}

.jcp-nav-logout {
  color: #ae4141;
}

.jcp-nav-logout:hover {
  background: #fff1f1;
}

.jcp-nav-bottom {
  display: none;
}

@media (max-width: 1099px) {
  .jcp-nav-desktop {
    display: none;
  }

  .jcp-nav-header {
    top: 10px;
    padding: 0 12px;
  }

  .jcp-nav-bar {
    min-height: 62px;
    padding: 9px 12px;
    border-radius: 17px;
  }

  .jcp-nav-logo {
    width: 38px;
    height: 38px;
  }

  .jcp-nav-brand-copy strong {
    font-size: 16px;
  }

  .jcp-nav-brand-copy small {
    font-size: 6px;
    letter-spacing: 1.7px;
  }

  .jcp-nav-account-trigger {
    width: 40px;
    min-height: 40px;
    padding: 0;
  }

  .jcp-nav-account-text,
  .jcp-nav-account-chevron,
  .jcp-nav-event-arrow {
    display: none;
  }

  .jcp-nav-event {
    min-height: 40px;
    padding: 0 10px;
  }

  .jcp-nav-bottom {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 998;
    padding: 7px 10px calc(8px + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid #e0e8f3;
    border-radius: 20px 20px 0 0;
    background: rgba(255, 255, 255, 0.97);
    box-shadow: 0 -7px 30px rgba(38, 66, 105, 0.08);
    backdrop-filter: blur(16px);
  }

  .jcp-nav-bottom-inner {
    max-width: 600px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 3px;
  }

  .jcp-nav-mobile-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    min-width: 0;
    min-height: 57px;
    padding: 3px 1px;
    border: 0;
    border-radius: 11px;
    background: transparent;
    color: #71849e;
  }

  .jcp-nav-mobile-icon {
    display: grid;
    place-items: center;
    width: 42px;
    height: 29px;
    border-radius: 10px;
    transition: background 160ms ease, color 160ms ease;
  }

  .jcp-nav-mobile-label {
    width: 100%;
    text-align: center;
    overflow-wrap: anywhere;
    font-size: 9px;
    line-height: 1.3;
    font-weight: 650;
  }

  .jcp-nav-mobile-active {
    color: #315b8e;
  }

  .jcp-nav-mobile-active .jcp-nav-mobile-icon {
    background: #e6effb;
    color: #315b8e;
  }

  .jcp-nav-mobile-active .jcp-nav-mobile-label {
    font-weight: 800;
  }

  /* Reserve space so the fixed bottom bar does not cover page content. */
  body {
    padding-bottom: calc(88px + env(safe-area-inset-bottom, 0px));
  }
}

@media (max-width: 420px) {
  .jcp-nav-header {
    padding: 0 9px;
  }

  .jcp-nav-bar {
    gap: 7px;
    padding: 8px 9px;
  }

  .jcp-nav-brand {
    gap: 6px;
  }

  .jcp-nav-logo {
    width: 34px;
    height: 34px;
  }

  .jcp-nav-brand-copy strong {
    font-size: 14px;
  }

  .jcp-nav-brand-copy small {
    font-size: 5px;
    letter-spacing: 1.5px;
  }

  .jcp-nav-actions {
    gap: 6px;
  }

  .jcp-nav-event {
    min-height: 38px;
    padding: 0 8px;
    gap: 5px;
    font-size: 10px !important;
  }

  .jcp-nav-event-year {
    display: none;
  }

  .jcp-nav-account-trigger {
    width: 37px;
    min-height: 38px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .jcp-nav-header,
  .jcp-nav-header *,
  .jcp-nav-bottom * {
    transition: none !important;
  }
}
`;