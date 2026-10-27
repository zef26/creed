// Technologies.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"

const CATEGORY_META = [
  {
    color: "#38BDF8",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    color: "#4ade80",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    color: "#f472b6",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    color: "#fb923c",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

function CategoryCard({ cat, meta, index, isVisible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
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
        className="relative h-full p-5"
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
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: hovered ? `${meta.color}18` : "rgba(255,255,255,0.04)",
              color: hovered ? meta.color : "rgba(255,255,255,0.35)",
              border: `1px solid ${hovered ? meta.color + "30" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {meta.icon}
          </div>
          <span
            className="font-bold text-sm tracking-wide transition-colors duration-300"
            style={{ color: hovered ? meta.color : "rgba(255,255,255,0.85)" }}
          >
            {cat.name}
          </span>
          <span
            className="ml-auto text-xs font-mono transition-colors duration-300"
            style={{ color: hovered ? `${meta.color}66` : "rgba(255,255,255,0.12)" }}
          >
            {cat.items.length}
          </span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-1.5">
          {cat.items.map((tech, i) => (
            <span
              key={tech}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg transition-all duration-300"
              style={{
                background: hovered ? `${meta.color}10` : "rgba(255,255,255,0.03)",
                color: hovered ? `${meta.color}CC` : "rgba(255,255,255,0.38)",
                border: `1px solid ${hovered ? meta.color + "22" : "rgba(255,255,255,0.06)"}`,
                transitionDelay: hovered ? `${i * 18}ms` : "0ms",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Technologies() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const categories = t.technologies?.categories || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="technologies"
      ref={sectionRef}
      className="relative py-16 sm:py-20"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="text-center max-w-xl mx-auto mb-10 sm:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          <span className="section-label">{t.technologies?.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {t.technologies?.title}
          </h2>
        </div>

        {/* Cards — 2×2 on md, 4 cols on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              cat={cat}
              meta={CATEGORY_META[index]}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
