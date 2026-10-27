// Header.jsx
import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import creedLogo from "../../assets/creed-logo.svg"

const NAV_ITEMS = ["about", "services", "portfolio", "team", "faq", "contact"]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    let rafId
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => setIsScrolled(window.scrollY > 40))
    }
    const updateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`)
    }
    updateHeaderHeight()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", updateHeaderHeight)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateHeaderHeight)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
    document.body.style.overflow = ""
  }

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen
    setIsMobileMenuOpen(next)
    document.body.style.overflow = next ? "hidden" : ""
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest("header")) {
        setIsMobileMenuOpen(false)
        document.body.style.overflow = ""
      }
    }
    if (isMobileMenuOpen) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? "rgba(7,12,20,0.88)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(14,165,233,0.1)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 1px 0 rgba(14,165,233,0.06), 0 8px 32px rgba(0,0,0,0.3)" : "none",
      }}
    >
      {/* Top glow line — visible when scrolled */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)",
          opacity: isScrolled ? 1 : 0,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">

          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center transition-opacity duration-200 hover:opacity-70"
            aria-label="Go to top"
          >
            <img src={creedLogo} alt="CREED" className="h-4 sm:h-5 w-auto" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-sm font-medium transition-colors duration-200 group"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.9)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
              >
                {t.nav?.[item] || item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: "linear-gradient(90deg, #0EA5E9, #38BDF8)" }} />
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div
              className="hidden sm:flex items-center gap-0.5 p-1 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {["en", "ru", "uz"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-md transition-all duration-200"
                  style={
                    language === lang
                      ? { background: "#0EA5E9", color: "#fff" }
                      : { color: "rgba(255,255,255,0.35)" }
                  }
                  onMouseEnter={e => { if (language !== lang) e.currentTarget.style.color = "rgba(255,255,255,0.8)" }}
                  onMouseLeave={e => { if (language !== lang) e.currentTarget.style.color = "rgba(255,255,255,0.35)" }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden md:inline-flex items-center px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200"
              style={{
                background: "rgba(14,165,233,0.1)",
                border: "1px solid rgba(14,165,233,0.25)",
                color: "#38BDF8",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(14,165,233,0.18)"
                e.currentTarget.style.borderColor = "rgba(14,165,233,0.5)"
                e.currentTarget.style.boxShadow = "0 0 16px rgba(14,165,233,0.15)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(14,165,233,0.1)"
                e.currentTarget.style.borderColor = "rgba(14,165,233,0.25)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              {t.hero?.cta || "Start a Project"}
            </button>

            {/* Mobile burger */}
            <button
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <span className={`block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0"}`}>
          <div
            className="pb-6 pt-3 space-y-1"
            style={{ borderTop: "1px solid rgba(14,165,233,0.08)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="flex items-center gap-3 w-full text-left px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200"
                style={{ color: "rgba(255,255,255,0.45)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.9)"
                  e.currentTarget.style.background = "rgba(14,165,233,0.06)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)"
                  e.currentTarget.style.background = "transparent"
                }}
              >
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "#0EA5E9", opacity: 0.5 }} />
                {t.nav?.[item] || item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}

            {/* Mobile lang */}
            <div className="flex gap-2 pt-3 px-3">
              {["en", "ru", "uz"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200"
                  style={
                    language === lang
                      ? { background: "#0EA5E9", color: "#fff" }
                      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.07)" }
                  }
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
