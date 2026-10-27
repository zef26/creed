// Team.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import CanvasBg from "../ui/CanvasBg"

const TEAM_DATA = [
  {
    initials: "AK",
    color: "#38BDF8",
    stack: ["React", "Next.js", "Node.js", "Architecture"],
  },
  {
    initials: "DM",
    color: "#4ade80",
    stack: ["React", "Python", "Django", "PostgreSQL"],
  },
  {
    initials: "SR",
    color: "#f472b6",
    stack: ["Flutter", "Dart", "React Native"],
  },
  {
    initials: "OT",
    color: "#fb923c",
    stack: ["1С:Предприятие", "1С Разработка", "ERP"],
  },
  {
    initials: "NK",
    color: "#a78bfa",
    stack: ["Agile", "Scrum", "Delivery"],
  },
]

function TiltCard({ member, translation, isVisible, index, lgClass }) {
  const cardRef = useRef(null)
  const rafRef = useRef(null)
  const targetTilt = useRef({ x: 0, y: 0 })
  const currentTilt = useRef({ x: 0, y: 0 })
  const isHovered = useRef(false)
  const [hovered, setHovered] = useState(false)

  const lerp = (a, b, t) => a + (b - a) * t

  const animate = () => {
    if (!cardRef.current) return
    currentTilt.current.x = lerp(currentTilt.current.x, targetTilt.current.x, 0.1)
    currentTilt.current.y = lerp(currentTilt.current.y, targetTilt.current.y, 0.1)
    const { x, y } = currentTilt.current
    cardRef.current.style.transform = `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) translateZ(${isHovered.current ? 8 : 0}px) translateY(${isHovered.current ? -4 : 0}px)`
    const dist = Math.abs(x) + Math.abs(y)
    if (dist > 0.02 || isHovered.current) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      currentTilt.current = { x: 0, y: 0 }
      cardRef.current.style.transform = ""
    }
  }

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    targetTilt.current = {
      x: -((e.clientY - cy) / (rect.height / 2)) * 9,
      y: ((e.clientX - cx) / (rect.width / 2)) * 9,
    }
  }

  const onMouseEnter = () => {
    isHovered.current = true
    setHovered(true)
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(animate)
  }

  const onMouseLeave = () => {
    isHovered.current = false
    setHovered(false)
    targetTilt.current = { x: 0, y: 0 }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-2xl overflow-hidden cursor-default ${lgClass}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "" : "translateY(28px)",
        transition: `opacity 0.7s ease-out ${index * 80}ms, translate 0.7s ease-out ${index * 80}ms`,
        willChange: "transform",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${member.color}88, transparent)`,
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
          border: `1px solid ${hovered ? member.color + "33" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "1rem",
          transition: "background 0.4s ease, border-color 0.4s ease",
          boxShadow: hovered
            ? `0 0 0 1px rgba(255,255,255,0.03), 0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`
            : "0 0 0 1px rgba(255,255,255,0.02), 0 4px 16px rgba(0,0,0,0.25)",
        }}
      >
        {/* Avatar + status */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black shrink-0 transition-all duration-300"
            style={{
              background: hovered ? `${member.color}18` : "rgba(255,255,255,0.04)",
              border: `1px solid ${hovered ? member.color + "44" : "rgba(255,255,255,0.08)"}`,
              color: hovered ? member.color : "rgba(255,255,255,0.5)",
            }}
          >
            {member.initials}
          </div>
          <span
            className="w-2 h-2 rounded-full mt-1 shrink-0 transition-all duration-300"
            style={{
              background: member.color,
              opacity: hovered ? 0.8 : 0.3,
              boxShadow: hovered ? `0 0 6px ${member.color}` : "none",
            }}
          />
        </div>

        {/* Role */}
        <h3
          className="text-base font-bold mb-2 leading-snug transition-colors duration-300"
          style={{ color: hovered ? member.color : "rgba(255,255,255,0.92)" }}
        >
          {translation.role}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.38)" }}>
          {translation.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {member.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide transition-all duration-300"
              style={{
                background: hovered ? `${member.color}12` : "rgba(255,255,255,0.03)",
                color: hovered ? `${member.color}CC` : "rgba(255,255,255,0.3)",
                border: `1px solid ${hovered ? member.color + "25" : "rgba(255,255,255,0.06)"}`,
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

export default function Team() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const members = t.team?.members || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(180deg, transparent 0%, var(--color-surface) 30%, var(--color-surface) 70%, transparent 100%)" }}
    >
      <CanvasBg variant="orbit" opacity={0.8} />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.04] blur-3xl"
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
          <span className="section-label">{t.team?.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {t.team?.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.38)" }}>
            {t.team?.description}
          </p>
        </div>

        {/* Grid — 6-col for centred last row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {TEAM_DATA.map((member, index) => {
            const translation = members[index] || {}
            const lgClass =
              index < 3
                ? "lg:col-span-2"
                : index === 3
                ? "lg:col-start-2 lg:col-span-2"
                : "lg:col-span-2"

            return (
              <TiltCard
                key={index}
                member={member}
                translation={translation}
                isVisible={isVisible}
                index={index}
                lgClass={lgClass}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
