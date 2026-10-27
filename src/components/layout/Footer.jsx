// Footer.jsx
import { useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import creedLogo from "../../assets/creed-logo.svg"
import LegalModal from "../ui/LegalModal"

const NAV_LINKS = ["about", "services", "portfolio", "team", "faq", "contact"]

const CONTACT_ITEMS = [
  {
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    value: "creed@gmail.com",
    href: "mailto:creed@gmail.com",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    value: "+998 91 541 97 34",
    href: "tel:+998915419734",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    value: "Samarkand, Uzbekistan",
    href: null,
  },
]

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [legalModal, setLegalModal] = useState(null) // "privacy" | "terms" | null

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
    <footer
      className="relative"
      style={{
        background: "linear-gradient(180deg, var(--color-surface) 0%, #060A12 100%)",
        borderTop: "1px solid rgba(14,165,233,0.1)",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(14,165,233,0.45), transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="space-y-4">
            <button onClick={() => scrollToSection("hero")} className="transition-opacity hover:opacity-70">
              <img src={creedLogo} alt="CREED" className="h-4 w-auto" style={{ opacity: 0.85 }} />
            </button>
            <p className="text-sm leading-relaxed max-w-[240px]" style={{ color: "rgba(255,255,255,0.32)" }}>
              {t.footer?.tagline}
            </p>
            {/* Status chip */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.18)",
                color: "rgba(74,222,128,0.85)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80", animation: "cursorBlink 2s ease-in-out infinite" }}
              />
              Open for Projects
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t.footer?.quickLinks || "Navigation"}
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#38BDF8"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0 transition-all duration-200 group-hover:scale-125"
                      style={{ background: "#0EA5E9", opacity: 0.4 }}
                    />
                    {t.nav?.[link] || link.charAt(0).toUpperCase() + link.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              Contacts
            </h4>
            <ul className="space-y-3">
              {CONTACT_ITEMS.map((item, i) => {
                const Tag = item.href ? "a" : "div"
                return (
                  <li key={i}>
                    <Tag
                      {...(item.href ? { href: item.href } : {})}
                      className="flex items-center gap-2.5 text-sm transition-colors duration-200 group"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      onMouseEnter={item.href ? e => e.currentTarget.style.color = "#38BDF8" : undefined}
                      onMouseLeave={item.href ? e => e.currentTarget.style.color = "rgba(255,255,255,0.35)" : undefined}
                    >
                      <span style={{ color: "rgba(14,165,233,0.5)" }}>{item.icon}</span>
                      {item.value}
                    </Tag>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © {currentYear} CREED. {t.footer?.rights}
          </p>
          <div className="flex items-center gap-1 font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>
            <span style={{ color: "rgba(14,165,233,0.4)" }}>▶</span>
            <span>Samarkand, UZ — EST. 2025</span>
          </div>
          <div className="flex gap-5">
            {[["privacy", t.footer?.privacy], ["terms", t.footer?.terms]].filter(([, label]) => label).map(([type, label]) => (
              <button
                key={type}
                onClick={() => setLegalModal(type)}
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.2)" }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(14,165,233,0.7)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.2)"}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>

    {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </>
  )
}
