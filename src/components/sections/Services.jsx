// Services.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import ServiceModal from "../ui/ServiceModal"
import CanvasBg from "../ui/CanvasBg"

const SERVICE_META = [
  {
    tags: ["HTML", "CSS", "SCSS", "Tailwind CSS", "React", "Next.js", "Vue", "TypeScript", "Vite", "Three.js"],
    color: "#38BDF8",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    tags: ["Python", "Django", "FastAPI", "Node.js", "SQL", "NoSQL", "Telegram Bot", "Linux", "Windows Server"],
    color: "#4ade80",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    tags: ["Flutter", "Dart", "React Native", "iOS", "Android"],
    color: "#f472b6",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    tags: ["1С:Предприятие", "1С Разработка", "1С Веб-сервер"],
    color: "#fb923c",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

function ServiceCard({ service, meta, index, isVisible, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative group rounded-2xl overflow-hidden cursor-pointer"
      onClick={onClick}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${index * 100}ms, transform 0.7s ease-out ${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${meta.color}22, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full flex flex-col p-6"
        style={{
          background: hovered
            ? "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)"
            : "linear-gradient(155deg, #0A1828 0%, #070C14 60%)",
          border: `1px solid ${hovered ? meta.color + "33" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "1rem",
          transition: "background 0.4s ease, border-color 0.4s ease",
          boxShadow: hovered
            ? `0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
            : "0 0 0 1px rgba(255,255,255,0.02), 0 8px 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon box */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: hovered ? `${meta.color}18` : "rgba(255,255,255,0.04)",
              color: hovered ? meta.color : "rgba(255,255,255,0.4)",
              border: `1px solid ${hovered ? meta.color + "33" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {meta.icon}
          </div>

          {/* Index */}
          <span
            className="text-3xl font-black font-mono tabular-nums leading-none transition-colors duration-300"
            style={{ color: hovered ? `${meta.color}33` : "rgba(255,255,255,0.06)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold mb-2 transition-colors duration-300"
          style={{ color: hovered ? meta.color : "rgba(255,255,255,0.92)" }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgba(255,255,255,0.38)" }}>
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide transition-all duration-300"
              style={{
                background: hovered ? `${meta.color}12` : "rgba(255,255,255,0.04)",
                color: hovered ? `${meta.color}CC` : "rgba(255,255,255,0.3)",
                border: `1px solid ${hovered ? meta.color + "25" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom arrow */}
        <div
          className="absolute bottom-5 right-5 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(2px, -2px)" : "translate(0, 0)",
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: meta.color }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
        {/* "Details" hint */}
        <div
          className="absolute bottom-5 left-6 text-[10px] font-mono transition-all duration-300"
          style={{
            color: `${meta.color}66`,
            opacity: hovered ? 1 : 0,
          }}
        >
          click to expand →
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeModal, setActiveModal] = useState(null) // index | null

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const services = t.services.items || []

  return (
    <>
    <section
      id="services"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(180deg, transparent 0%, var(--color-surface) 30%, var(--color-surface) 70%, transparent 100%)" }}
    >
      <CanvasBg variant="code" opacity={0.7} />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="max-w-2xl mb-10 sm:mb-14"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          <span className="section-label">{t.services.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {t.services.title}
          </h2>
        </div>

        {/* Service cards — 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              meta={SERVICE_META[index]}
              index={index}
              isVisible={isVisible}
              onClick={() => setActiveModal(index)}
            />
          ))}
        </div>
      </div>
    </section>

    {activeModal !== null && (
      <ServiceModal
        service={services[activeModal]}
        meta={SERVICE_META[activeModal]}
        onClose={() => setActiveModal(null)}
      />
    )}
    </>
  )
}
