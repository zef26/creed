// ServiceModal.jsx
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "../../context/LanguageContext"

export default function ServiceModal({ service, meta, onClose }) {
  const { t } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  const scrollToContact = () => {
    onClose()
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }, 200)
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(4,8,16,0.88)", backdropFilter: "blur(16px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-lg flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)",
          border: `1px solid ${meta.color}22`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.7), 0 0 60px ${meta.color}0D, inset 0 1px 0 rgba(255,255,255,0.05)`,
        }}
      >
        {/* Top glow */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${meta.color}88, transparent)` }}
        />

        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 shrink-0"
          style={{ borderBottom: `1px solid ${meta.color}18`, background: `${meta.color}06` }}
        >
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] transition-opacity hover:opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="ml-2 text-xs font-mono" style={{ color: `${meta.color}77` }}>
            {service.title.toLowerCase().replace(/\s+/g, "-")}.ts
          </span>
          <button
            onClick={onClose}
            className="ml-auto w-6 h-6 flex items-center justify-center rounded-md transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-6">

          {/* Header */}
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}33` }}
            >
              {meta.icon}
            </div>
            <div>
              <h2 className="text-lg font-bold leading-snug" style={{ color: "rgba(255,255,255,0.95)" }}>
                {service.title}
              </h2>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>
                {service.description}
              </p>
            </div>
          </div>

          {/* Includes */}
          {service.includes?.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
                {t.services?.includesLabel || "What's included"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: meta.color, opacity: 0.7 }} />
                    <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process */}
          {service.process?.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
                {t.services?.processLabel || "How we work"}
              </h3>
              <div className="flex items-center gap-0 flex-wrap">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-0">
                    <div className="flex flex-col items-center gap-1 px-1">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                        style={{ background: `${meta.color}18`, color: meta.color, border: `1px solid ${meta.color}33` }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[10px] text-center leading-tight whitespace-nowrap" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {step}
                      </span>
                    </div>
                    {i < service.process.length - 1 && (
                      <div className="w-4 h-px mb-4 shrink-0" style={{ background: `${meta.color}25` }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide"
                style={{ background: `${meta.color}10`, color: `${meta.color}AA`, border: `1px solid ${meta.color}22` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={scrollToContact}
            className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${meta.color}CC, ${meta.color}99)` }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 24px ${meta.color}33`}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
          >
            {t.services?.ctaLabel || "Start a Project"} →
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
