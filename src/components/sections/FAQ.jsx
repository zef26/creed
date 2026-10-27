// FAQ.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import CanvasBg from "../ui/CanvasBg"

function FAQItem({ item, index, isOpen, onToggle, isVisible }) {
  const contentRef = useRef(null)

  return (
    <div
      className={`border-b border-white/[0.06] transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-4">
          <span
            className="text-xs font-bold font-mono tabular-nums shrink-0"
            style={{ color: isOpen ? "#0EA5E9" : "rgba(14,165,233,0.3)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`text-base sm:text-lg font-semibold transition-colors duration-200 ${isOpen ? "text-[var(--color-accent)]" : "text-[var(--color-foreground)] group-hover:text-[var(--color-accent)]"}`}>
            {item.question}
          </span>
        </span>

        {/* Plus / Minus icon */}
        <span
          className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: isOpen ? "rgba(14,165,233,0.4)" : "rgba(255,255,255,0.08)",
            background: isOpen ? "rgba(14,165,233,0.1)" : "transparent",
            color: isOpen ? "#0EA5E9" : "rgba(255,255,255,0.3)",
          }}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      {/* Answer — animated collapse */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-400 ease-out"
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 400) + "px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="pb-6 pl-10 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  const items = t.faq?.items || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section id="faq" ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <CanvasBg variant="matrix" opacity={0.55} />
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="section-label">{t.faq?.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {t.faq?.title}
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-white/[0.06]">
          {items.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
