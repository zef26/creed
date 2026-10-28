// Portfolio.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import CanvasBg from "../ui/CanvasBg"

// image = screenshot in public/portfolio; mockup = index into MOCKUPS (used when there is no image)
const PROJECT_META = [
  { color: "#4ade80", image: "/portfolio/siyobferma.jpg", url: "https://siyobferma.uz" },
  { color: "#38BDF8", image: "/portfolio/qanchachiqadi.jpg", url: "https://qanchachiqadi.uz" },
  { color: "#a78bfa", image: "/portfolio/qoshni.jpg", url: "https://qoshni.uz", inDevelopment: true },
  { color: "#fb923c", image: "/portfolio/parcha-track.jpg" }, // Parcha Track — internal system, no public site
  { color: "#fbbf24", image: "/portfolio/parcha-sklad.jpg" }, // Parcha Sklad — 1C, internal
]

// 3 cards in the first row, 2 wide cards in the second
const SPAN = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"]

// CSS-only mockup visuals
const MOCKUPS = [
  // 1C ERP — data table
  ({ color }) => (
    <div className="absolute inset-0 p-4 flex flex-col gap-2 pt-8">
      <div className="flex gap-1.5 mb-1.5">
        {[38, 22, 18, 14].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: color, opacity: 0.3 + i * 0.05 }} />
        ))}
      </div>
      {[100, 85, 92, 78, 95, 68].map((_, i) => (
        <div key={i} className="flex gap-1.5 items-center">
          <div className="h-2 rounded-sm bg-white/10" style={{ width: "38%" }} />
          <div className="h-2 rounded-sm bg-white/[0.06]" style={{ width: "22%" }} />
          <div className="h-2 rounded-sm bg-white/[0.06]" style={{ width: "18%" }} />
          <div className="h-2 rounded-sm" style={{ width: "14%", background: color, opacity: i % 2 === 0 ? 0.45 : 0.2 }} />
        </div>
      ))}
    </div>
  ),
  // Web — card grid
  ({ color }) => (
    <div className="absolute inset-0 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-14 h-2 rounded-full" style={{ background: color, opacity: 0.7 }} />
        <div className="flex-1" />
        {[28, 20, 16].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-white/15" style={{ width: w }} />)}
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border border-white/[0.07] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="h-1/2 rounded-t-sm" style={{ background: `${color}22` }} />
            <div className="p-1.5 space-y-1">
              <div className="h-1.5 rounded-full bg-white/25 w-3/4" />
              <div className="h-1 rounded-full bg-white/12 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  // Flutter — mobile frame
  ({ color }) => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-24 h-44 rounded-2xl border relative overflow-hidden" style={{ borderColor: `${color}55`, background: "rgba(255,255,255,0.02)" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-b-full" style={{ background: color, opacity: 0.5 }} />
        <div className="absolute inset-x-2.5 top-5 space-y-2">
          <div className="h-12 rounded-xl" style={{ background: `${color}30` }} />
          {[100, 78, 60].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/20" style={{ width: `${w}%` }} />
          ))}
          <div className="grid grid-cols-2 gap-1 pt-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 rounded-lg border border-white/[0.08]" style={{ background: "rgba(255,255,255,0.03)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  // Backend — API terminal
  ({ color }) => (
    <div className="absolute inset-0 p-4 font-mono text-[9px] leading-relaxed overflow-hidden pt-8">
      {[
        { c: color, t: "vehicle.detected" },
        { c: "rgba(255,255,255,0.2)", t: "lpr: plate recognised" },
        { c: "rgba(255,255,255,0.2)", t: "access: check" },
        { c: "rgba(255,255,255,0.2)", t: "blacklist: check" },
        { c: "#4ade80", t: "✓ gate.open" },
        { c: "rgba(255,255,255,0.08)", t: "──────────────────" },
        { c: color, t: "vehicle.detected" },
        { c: "rgba(255,255,255,0.2)", t: "lpr: plate recognised" },
        { c: "#fbbf24", t: "→ manual.review" },
      ].map((line, i) => <div key={i} style={{ color: line.c }}>{line.t}</div>)}
    </div>
  ),
  // React Native — dual phones
  ({ color }) => (
    <div className="absolute inset-0 flex items-center justify-center gap-4">
      {[0, 1].map((p) => (
        <div
          key={p}
          className="w-20 h-36 rounded-xl border relative overflow-hidden"
          style={{
            borderColor: `${color}44`,
            background: "rgba(255,255,255,0.02)",
            transform: p === 0 ? "translateY(-10px)" : "translateY(10px)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 rounded-b-full" style={{ background: color, opacity: 0.6 }} />
          <div className="absolute inset-x-2 top-4 space-y-1.5">
            <div className="h-7 rounded-md" style={{ background: `${color}30` }} />
            {[100, 75, 85, 55].map((w, i) => (
              <div key={i} className="h-1 rounded-full bg-white/15" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  // Dashboard — charts
  ({ color }) => (
    <div className="absolute inset-0 p-4 flex flex-col gap-2 pt-8">
      <div className="flex gap-2">
        {[["CRM", 0.5], ["Leads", 0.3], ["Deals", 0.4]].map(([val, op], i) => (
          <div key={i} className="flex-1 rounded-lg p-2" style={{ background: `${color}${Math.round(op * 80).toString(16).padStart(2, "0")}` }}>
            <div className="h-1 rounded-full bg-white/30 w-2/3 mb-1" />
            <div className="text-[10px] font-bold" style={{ color, opacity: 0.9 }}>{val}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-white/[0.06] overflow-hidden relative">
        <div className="absolute inset-0 flex items-end px-2 pb-2 gap-1">
          {[40, 65, 55, 80, 70, 90, 75, 85, 60, 95, 72, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: color, opacity: 0.15 + (h / 100) * 0.35 }} />
          ))}
        </div>
      </div>
    </div>
  ),
]

function ProjectCard({ project, meta, index, isVisible, labels }) {
  const [hovered, setHovered] = useState(false)
  const MockupComponent = MOCKUPS[meta.mockup]
  const Tag = meta.url ? "a" : "div"
  const host = meta.url?.replace(/^https?:\/\//, "")

  return (
    <Tag
      {...(meta.url ? { href: meta.url, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`relative block rounded-2xl overflow-hidden ${SPAN[index] || ""} ${meta.url ? "cursor-pointer" : "cursor-default"}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease-out ${index * 80}ms, transform 0.7s ease-out ${index * 80}ms`,
        background: "linear-gradient(155deg, #0A1828 0%, #070C14 60%)",
        border: `1px solid ${hovered ? meta.color + "33" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered
          ? `0 0 0 1px rgba(255,255,255,0.03), 0 24px 48px rgba(0,0,0,0.5)`
          : "0 0 0 1px rgba(255,255,255,0.02)",
        transition2: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${meta.color}77, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Mini title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{
          borderColor: hovered ? `${meta.color}22` : "rgba(255,255,255,0.05)",
          background: hovered ? `${meta.color}08` : "rgba(255,255,255,0.02)",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <span
          className="ml-1 text-[10px] font-mono transition-colors duration-300"
          style={{ color: hovered ? `${meta.color}99` : "rgba(255,255,255,0.2)" }}
        >
          {host || `${project.category.toLowerCase().replace(/\s+/g, "-")}.ts`}
        </span>
        <div className="ml-auto">
          <span
            className="text-[10px] font-mono font-bold tabular-nums"
            style={{ color: hovered ? `${meta.color}55` : "rgba(255,255,255,0.08)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Mockup visual */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: "16/9",
          background: "linear-gradient(135deg, #080F1C, #070C14)",
        }}
      >
        {meta.image ? (
          <img
            src={meta.image}
            alt={project.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />
        ) : (
          <>
            {/* Dot grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(${meta.color}18 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
            {MockupComponent && <MockupComponent color={meta.color} />}
          </>
        )}

        {meta.inDevelopment && (
          <span
            className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{ background: "rgba(7,12,20,0.8)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.35)", backdropFilter: "blur(6px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24] animate-pulse" />
            {labels.inDevelopment}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3
            className="text-sm font-bold leading-snug transition-colors duration-300"
            style={{ color: hovered ? meta.color : "rgba(255,255,255,0.9)" }}
          >
            {project.title}
          </h3>
          <span
            className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap"
            style={{
              background: hovered ? `${meta.color}18` : "rgba(255,255,255,0.04)",
              color: hovered ? meta.color : "rgba(255,255,255,0.3)",
              border: `1px solid ${hovered ? meta.color + "30" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.3s ease",
            }}
          >
            {project.category}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
          {project.description}
        </p>
        {meta.url && (
          <span
            className="inline-flex items-center gap-1 mt-3 text-xs font-semibold transition-colors duration-300"
            style={{ color: hovered ? meta.color : "rgba(255,255,255,0.45)" }}
          >
            {labels.visit} — {host} ↗
          </span>
        )}
      </div>
    </Tag>
  )
}

export default function Portfolio() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const projects = t.portfolio?.projects || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <CanvasBg variant="scan" opacity={0.8} />
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="mb-8 sm:mb-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          <span className="section-label">{t.portfolio?.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {t.portfolio?.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              meta={PROJECT_META[index]}
              index={index}
              isVisible={isVisible}
              labels={t.portfolio}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
