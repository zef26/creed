// Hero.jsx
import { useCallback, useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"

// ─── Particles ────────────────────────────────────────────────────
const PARTICLES = [
  { x:  4, delay:  0.0, dur: 11, size: 1.5 },
  { x: 11, delay:  3.5, dur:  9, size: 2.0 },
  { x: 19, delay:  7.0, dur: 13, size: 1.0 },
  { x: 27, delay:  1.5, dur: 10, size: 2.5 },
  { x: 34, delay:  5.5, dur: 12, size: 1.5 },
  { x: 42, delay:  9.0, dur:  8, size: 2.0 },
  { x: 51, delay:  2.0, dur: 14, size: 1.0 },
  { x: 59, delay:  6.5, dur: 11, size: 1.5 },
  { x: 67, delay:  4.0, dur:  9, size: 2.5 },
  { x: 75, delay:  8.5, dur: 12, size: 2.0 },
  { x: 82, delay:  1.0, dur: 10, size: 1.0 },
  { x: 90, delay:  4.5, dur: 13, size: 1.5 },
  { x: 96, delay:  7.5, dur:  8, size: 2.0 },
]

// ─── Terminal build lines ──────────────────────────────────────────
const TERMINAL_LINES = [
  { text: "$ creed deploy --production", type: "cmd",   meta: null },
  { text: "  ✓  Web app compiled",        type: "ok",    meta: "1.8s" },
  { text: "  ✓  API deployed",             type: "ok",    meta: "0.6s" },
  { text: "  ✓  Mobile build ready",       type: "ok",    meta: "2.4s" },
  { text: "  ✓  1C sync complete",         type: "ok",    meta: "0.9s" },
  { text: "  Ready in 5.7s",               type: "ready", meta: null },
]
const LINE_DELAYS = [200, 900, 1400, 1900, 2400, 3100]

// ─── Typewriter hook ───────────────────────────────────────────────
function useTypewriter(words, { typeSpeed = 65, deleteSpeed = 38, pauseMs = 2100 } = {}) {
  const [display, setDisplay] = useState("")
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState("typing")
  const wordsRef = useRef(words)
  wordsRef.current = words

  useEffect(() => {
    const w = wordsRef.current
    if (!w?.length) return
    const word = w[wordIdx % w.length]
    let t

    if (phase === "typing") {
      if (display.length < word.length) {
        t = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed)
      } else {
        t = setTimeout(() => setPhase("deleting"), pauseMs)
      }
    } else {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(d => d.slice(0, -1)), deleteSpeed)
      } else {
        t = setTimeout(() => { setWordIdx(i => i + 1); setPhase("typing") }, 320)
      }
    }
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, phase, wordIdx, typeSpeed, deleteSpeed, pauseMs])

  return display
}

// ─── Terminal card ─────────────────────────────────────────────────
function TerminalCard() {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown >= TERMINAL_LINES.length) return
    const t = setTimeout(() => setShown(n => n + 1), LINE_DELAYS[shown])
    return () => clearTimeout(t)
  }, [shown])

  const done = shown >= TERMINAL_LINES.length

  return (
    <div className="relative select-none">

      {/* Outer glow */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.35), transparent 70%)" }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)",
          border: "1px solid rgba(14,165,233,0.14)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
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
          <span className="ml-2 text-xs font-mono text-[var(--color-muted)]">creed.build</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 4px #4ade80" }} />
            <span className="text-[10px] font-mono" style={{ color: "rgba(74,222,128,0.7)" }}>live</span>
          </div>
        </div>

        {/* Output */}
        <div className="p-5 font-mono text-[13px] leading-relaxed" style={{ minHeight: 220 }}>
          {TERMINAL_LINES.slice(0, shown).map((line, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-6 mb-1.5"
              style={{ animation: "termLine 0.25s ease-out forwards" }}
            >
              <span style={{
                color: line.type === "cmd"   ? "#7DD3F8"
                     : line.type === "ok"    ? "rgba(240,244,248,0.75)"
                     : line.type === "ready" ? "#4ade80"
                     : "rgba(255,255,255,0.35)",
              }}>
                {line.text}
                {/* Blinking cursor on last line while still appearing */}
                {i === shown - 1 && !done && (
                  <span
                    className="inline-block w-[7px] h-[13px] ml-1 rounded-sm align-middle"
                    style={{ background: "#0EA5E9", animation: "cursorBlink 1s step-end infinite" }}
                  />
                )}
              </span>
              {line.meta && (
                <span className="shrink-0 text-[11px]" style={{ color: "rgba(74,165,133,0.6)" }}>
                  {line.meta}
                </span>
              )}
            </div>
          ))}

          {/* Idle cursor when all lines shown */}
          {done && (
            <div className="mt-2 flex items-center gap-1.5" style={{ animation: "fadeIn 0.4s ease-out forwards" }}>
              <span style={{ color: "#7DD3F8" }}>$</span>
              <span
                className="inline-block w-[7px] h-[13px] rounded-sm"
                style={{ background: "#0EA5E9", animation: "cursorBlink 1s step-end infinite" }}
              />
            </div>
          )}
        </div>

        {/* Status bar */}
        {done && (
          <div
            className="px-5 py-2.5 border-t flex items-center gap-2"
            style={{
              borderColor: "rgba(74,222,128,0.12)",
              background: "rgba(74,222,128,0.04)",
              animation: "fadeIn 0.5s ease-out forwards",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ boxShadow: "0 0 5px #4ade80" }} />
            <span className="text-[11px] font-mono" style={{ color: "rgba(74,222,128,0.8)" }}>
              Production ready · 0 errors · 0 warnings
            </span>
          </div>
        )}
      </div>

      {/* Floating accent chips */}
      <div
        className="absolute -top-3.5 -right-5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{
          background: "rgba(14,165,233,0.1)",
          border: "1px solid rgba(14,165,233,0.2)",
          color: "#7DD3F8",
          backdropFilter: "blur(8px)",
          opacity: 0,
          animation: "fadeIn 0.5s ease-out 1.2s forwards, floatY 4s ease-in-out 1.7s infinite",
        }}
      >
        ⚡ Full-stack delivery
      </div>

      <div
        className="absolute -bottom-4 -left-5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
        style={{
          background: "rgba(14,165,233,0.08)",
          border: "1px solid rgba(14,165,233,0.15)",
          color: "#7DD3F8",
          backdropFilter: "blur(8px)",
          opacity: 0,
          animation: "fadeIn 0.5s ease-out 2s forwards, floatY 5s ease-in-out 2.5s infinite",
        }}
      >
        iOS · Android · Web · 1C
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────
export default function Hero() {
  const { t } = useLanguage()
  const scanRef = useRef(null)

  const scrollTo = useCallback((id) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  // Scan line RAF
  useEffect(() => {
    const el = scanRef.current
    if (!el) return
    let pos = -20, dir = 1, id
    const tick = () => {
      pos += 0.025 * dir
      if (pos > 110) dir = -1
      if (pos < -20) dir = 1
      el.style.top = `${pos}%`
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  const words  = t.hero?.titleWords || []
  const typed  = useTypewriter(words)

  const stats = [
    { value: "2+",  label: t.about?.stats?.experience || "Лет" },
    { value: "20+", label: t.about?.stats?.projects   || "Проектов" },
    { value: "15+", label: t.about?.stats?.clients    || "Клиентов" },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-var(--header-height,72px))] flex items-center justify-center overflow-hidden"
    >
      {/* ── Ambient blobs ──────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* ── Grid ───────────────────────────────── */}
      <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden="true" />

      {/* ── Scan line ──────────────────────────── */}
      <div
        ref={scanRef}
        className="absolute inset-x-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(14,165,233,0.04) 40%, rgba(14,165,233,0.06) 50%, rgba(14,165,233,0.04) 60%, transparent)",
          top: "-20%",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── Particles ──────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              background: "#0EA5E9",
              animation: `particleFloat ${p.dur}s linear infinite`,
              animationDelay: `${p.delay}s`,
              boxShadow: `0 0 ${p.size * 3}px rgba(14,165,233,0.8)`,
            }}
          />
        ))}
      </div>

      {/* ── Radial vignette ────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, #070C14 100%)" }}
        aria-hidden="true"
      />

      {/* ── Bottom fade ────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to top, #070C14, transparent)", zIndex: 2 }}
        aria-hidden="true"
      />

      {/* ── Content ────────────────────────────── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        style={{ zIndex: 3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">

          {/* ─── Left: Text ─────────────────────── */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
              style={{ opacity: 0, animation: "badgeGlow 4s ease-in-out infinite, fadeIn 0.7s ease-out 0.1s forwards" }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="pulse-dot relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-[var(--color-muted)] tracking-wide">
                CREED — {t.hero?.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-black tracking-tight mb-6" style={{ lineHeight: 1.08 }}>

              {/* Line 1 — static, white */}
              <div className="overflow-hidden">
                <span
                  className="block line-reveal text-[var(--color-foreground)]"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", animationDelay: "0.2s", fontWeight: 700 }}
                >
                  {t.hero?.titleLine1}
                </span>
              </div>

              {/* Line 2 — typewriter, gradient */}
              <div
                className="relative my-1"
                style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)", minHeight: "1.15em" }}
              >
                {/* Glow behind typed text */}
                <div
                  className="absolute inset-0 pointer-events-none blur-3xl opacity-20"
                  style={{ background: "linear-gradient(135deg, #0EA5E9, #38BDF8)" }}
                  aria-hidden="true"
                />
                <span className="relative gradient-text">
                  {typed}
                </span>
                <span
                  className="relative inline-block align-middle ml-1 rounded-sm"
                  style={{
                    width: "clamp(3px, 0.45vw, 5px)",
                    height: "0.72em",
                    background: "#0EA5E9",
                    verticalAlign: "middle",
                    animation: "cursorBlink 1s step-end infinite",
                    boxShadow: "0 0 8px rgba(14,165,233,0.8)",
                  }}
                />
              </div>

              {/* Line 3 — static, muted */}
              <div className="overflow-hidden">
                <span
                  className="block line-reveal"
                  style={{
                    fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
                    animationDelay: "0.4s",
                    fontWeight: 600,
                    color: "var(--color-muted)",
                    opacity: 0,
                  }}
                >
                  {t.hero?.titleLine3}
                </span>
              </div>
            </h1>

            {/* Description */}
            <p
              className="animate-fade-in text-sm sm:text-base text-[var(--color-muted)] max-w-lg mx-auto lg:mx-0 mb-9 leading-relaxed"
              style={{ animationDelay: "0.6s", opacity: 0 }}
            >
              {t.hero?.description}
            </p>

            {/* CTAs */}
            <div
              className="animate-fade-in flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-12"
              style={{ animationDelay: "0.75s", opacity: 0 }}
            >
              <button
                onClick={scrollTo("contact")}
                className="btn-shimmer group relative w-full sm:w-auto px-7 py-3.5 font-semibold text-sm text-white rounded-xl transition-all duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50"
                style={{
                  background: "linear-gradient(135deg, #0EA5E9, #0369A1)",
                  boxShadow: "0 0 24px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero?.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>

              <button
                onClick={scrollTo("portfolio")}
                className="w-full sm:w-auto px-7 py-3.5 font-semibold text-sm text-[var(--color-foreground)] rounded-xl border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-[var(--color-accent)]/30 transition-all duration-300 hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              >
                {t.hero?.ctaSecondary} →
              </button>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-in inline-flex items-center divide-x divide-white/[0.07] rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: "0.95s", opacity: 0 }}
            >
              {stats.map((s, i) => (
                <div key={i} className="px-5 sm:px-7 py-3 text-center">
                  <div
                    className="text-xl sm:text-2xl font-black tabular-nums"
                    style={{
                      background: "linear-gradient(135deg, #7DD3F8, #0EA5E9)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[var(--color-muted)] mt-0.5 uppercase tracking-widest font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ─── Right: Terminal (desktop only) ─── */}
          <div
            className="hidden lg:block"
            style={{ opacity: 0, animation: "fadeIn 0.8s ease-out 0.5s forwards" }}
          >
            <TerminalCard />
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ───────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-20 hover:opacity-50 transition-opacity duration-300"
        style={{ zIndex: 3 }}
      >
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, var(--color-accent))" }} />
        <div className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ boxShadow: "0 0 6px rgba(14,165,233,1)" }} />
      </div>
    </section>
  )
}
