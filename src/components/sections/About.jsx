// About.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import CanvasBg from "../ui/CanvasBg"

const STATS_CONFIG = [
  { end: 2,  suffix: "+", key: "experience" },
  { end: 20, suffix: "+", key: "projects"   },
  { end: 15, suffix: "+", key: "clients"    },
]

function useCountUp(end, active, duration = 1600) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) return
    const startTime = performance.now()
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 4)
      setCount(Math.round(ease * end))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, end, duration])

  return count
}

function StatItem({ end, suffix, label, active, delay }) {
  const count = useCountUp(end, active, 1600)
  return (
    <div
      className="flex flex-col items-center justify-center py-5 px-4 transition-all duration-300 hover:bg-white/[0.02] group"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="text-3xl sm:text-4xl font-black tabular-nums leading-none mb-1.5 group-hover:scale-105 transition-transform duration-300"
        style={{
          background: "linear-gradient(135deg, #7DD3F8 0%, #0EA5E9 60%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {count}{suffix}
      </div>
      <div className="text-[10px] sm:text-xs text-[var(--color-muted)] uppercase tracking-widest font-medium text-center leading-tight">
        {label}
      </div>
    </div>
  )
}

// Same card style as Hero terminal
function ConfigCard() {
  const CODE_LINES = [
    { type: "comment", content: "// Engineering studio config" },
    { type: "gap" },
    { type: "decl" },
    { type: "field",  key: "name",      val: '"CREED"',             comma: true  },
    { type: "field",  key: "founded",   val: '"2025"',              comma: true  },
    { type: "field",  key: "location",  val: '"Samarkand, UZ"',     comma: true  },
    { type: "field",  key: "team",      val: "5",                   comma: true, num: true },
    { type: "field",  key: "services",  val: "4",                   comma: true, num: true },
    { type: "arr_open", key: "stack" },
    { type: "arr_item", val: '"React / Next.js"',   comma: true  },
    { type: "arr_item", val: '"Python / Django"',   comma: true  },
    { type: "arr_item", val: '"Flutter / RN"',       comma: true  },
    { type: "arr_item", val: '"1C:Enterprise"',      comma: false },
    { type: "arr_close" },
    { type: "field",  key: "approach",  val: '"Engineering‑first"',  comma: true  },
    { type: "status" },
    { type: "close" },
  ]

  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute -inset-3 rounded-3xl opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.4), transparent 70%)" }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)",
          border: "1px solid rgba(14,165,233,0.14)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "rgba(14,165,233,0.1)", background: "rgba(14,165,233,0.04)" }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="ml-2 text-xs font-mono text-[var(--color-muted)]">creed.config.ts</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" style={{ boxShadow: "0 0 4px #0EA5E9" }} />
            <span className="text-[10px] font-mono text-[#7DD3F8]/70">ready</span>
          </div>
        </div>

        {/* Code body */}
        <div className="p-5 font-mono text-[13px] leading-[1.7]">
          {CODE_LINES.map((line, i) => {
            if (line.type === "gap")       return <div key={i} className="h-2" />
            if (line.type === "comment")   return <div key={i} style={{ color: "rgba(255,255,255,0.25)" }}>{line.content}</div>
            if (line.type === "decl")      return (
              <div key={i}>
                <span style={{ color: "#38BDF8" }}>const </span>
                <span style={{ color: "#7DD3F8" }}>studio </span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>= {"{"}</span>
              </div>
            )
            if (line.type === "close")     return <div key={i} style={{ color: "rgba(255,255,255,0.4)" }}>{"}"}</div>
            if (line.type === "field")     return (
              <div key={i} className="pl-5">
                <span style={{ color: "#93C5FD" }}>{line.key}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>:  </span>
                <span style={{ color: line.num ? "#F97316" : "#4ade80" }}>{line.val}</span>
                {line.comma && <span style={{ color: "rgba(255,255,255,0.2)" }}>,</span>}
              </div>
            )
            if (line.type === "arr_open")  return (
              <div key={i} className="pl-5">
                <span style={{ color: "#93C5FD" }}>{line.key}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>: [</span>
              </div>
            )
            if (line.type === "arr_item")  return (
              <div key={i} className="pl-10">
                <span style={{ color: "#4ade80" }}>{line.val}</span>
                {line.comma && <span style={{ color: "rgba(255,255,255,0.2)" }}>,</span>}
              </div>
            )
            if (line.type === "arr_close") return (
              <div key={i} className="pl-5">
                <span style={{ color: "rgba(255,255,255,0.35)" }}>]</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>,</span>
              </div>
            )
            if (line.type === "status")    return (
              <div key={i} className="pl-5 flex items-center gap-2">
                <span style={{ color: "#93C5FD" }}>status</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>: </span>
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80", animation: "cursorBlink 2s ease-in-out infinite" }}
                />
                <span style={{ color: "#4ade80" }}>"OPEN FOR PROJECTS"</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>,</span>
              </div>
            )
            return null
          })}

          {/* Idle cursor */}
          <div className="mt-2 flex items-center gap-1.5">
            <span style={{ color: "#7DD3F8" }}>▶</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Ready</span>
            <span
              className="inline-block w-[7px] h-[13px] rounded-sm ml-0.5"
              style={{ background: "#0EA5E9", animation: "cursorBlink 1s step-end infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Floating chip */}
      <div
        className="absolute -top-3 -right-5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{
          background: "rgba(74,222,128,0.1)",
          border: "1px solid rgba(74,222,128,0.2)",
          color: "rgba(74,222,128,0.9)",
          backdropFilter: "blur(8px)",
          animation: "fadeIn 0.5s ease-out 0.6s forwards, floatY 5s ease-in-out 1.1s infinite",
          opacity: 0,
        }}
      >
        Founded 2025
      </div>
    </div>
  )
}

export default function About() {
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

  const statLabels = [
    t?.about?.stats?.experience || "Лет",
    t?.about?.stats?.projects   || "Проектов",
    t?.about?.stats?.clients    || "Клиентов",
  ]

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">

      <CanvasBg variant="neural" opacity={0.6} />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.05] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-20 items-center">

          {/* ─── Left: Text ───────────────────────── */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="section-label">{t.about.subtitle}</span>

            <h2 className="mt-3 font-bold leading-tight tracking-tight mb-6" style={{ fontSize: "clamp(1.9rem, 4vw, 3.2rem)" }}>
              {t.about.title}
            </h2>

            <div className="space-y-4 text-[var(--color-muted)] leading-relaxed mb-8">
              <p className="text-base sm:text-lg">{t.about.description}</p>
              <p className="text-base">{t.about.text}</p>
            </div>

            {/* Stats — unified block, same language as Hero stats */}
            <div
              className={`inline-grid grid-cols-3 divide-x divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-700 delay-300 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {STATS_CONFIG.map((stat, i) => (
                <StatItem
                  key={stat.key}
                  end={stat.end}
                  suffix={stat.suffix}
                  label={statLabels[i]}
                  active={isVisible}
                  delay={i * 100}
                />
              ))}
            </div>
          </div>

          {/* ─── Right: Config card ───────────────── */}
          <div
            className={`transition-all duration-1000 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <ConfigCard />
          </div>

        </div>
      </div>
    </section>
  )
}
