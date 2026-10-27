// Advantages.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import CanvasBg from "../ui/CanvasBg"

const ITEM_META = [
  {
    color: "#38BDF8",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    color: "#4ade80",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    color: "#a78bfa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    color: "#fb923c",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

function AdvantageCard({ adv, meta, index, isVisible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease-out ${index * 100}ms, transform 0.7s ease-out ${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.color}88, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card */}
      <div
        className="relative h-full p-6"
        style={{
          background: hovered
            ? "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)"
            : "linear-gradient(155deg, #0A1828 0%, #070C14 60%)",
          border: `1px solid ${hovered ? meta.color + "33" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "1rem",
          transition: "background 0.4s ease, border-color 0.4s ease",
          boxShadow: hovered
            ? `0 0 0 1px rgba(255,255,255,0.03), 0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`
            : "0 0 0 1px rgba(255,255,255,0.02), 0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        {/* Icon + number */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: hovered ? `${meta.color}18` : "rgba(255,255,255,0.04)",
              color: hovered ? meta.color : "rgba(255,255,255,0.35)",
              border: `1px solid ${hovered ? meta.color + "30" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {meta.icon}
          </div>
          <span
            className="text-2xl font-black font-mono tabular-nums transition-colors duration-300"
            style={{ color: hovered ? `${meta.color}33` : "rgba(255,255,255,0.07)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold mb-2 leading-snug transition-colors duration-300"
          style={{ color: hovered ? meta.color : "rgba(255,255,255,0.92)" }}
        >
          {adv.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
          {adv.description}
        </p>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-6 right-6 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${meta.color}44, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  )
}

export default function Advantages() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const advantages = (t.advantages.items || []).slice(0, 4)

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <CanvasBg variant="radar" opacity={0.75} />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          <span className="section-label">{t.advantages.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {t.advantages.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {advantages.map((adv, index) => (
            <AdvantageCard
              key={index}
              adv={adv}
              meta={ITEM_META[index]}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
