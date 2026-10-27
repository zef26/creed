// Contact.jsx
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "../../context/LanguageContext"
import CanvasBg from "../ui/CanvasBg"

const CONTACT_INFO = [
  {
    color: "#38BDF8",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "creed@gmail.com",
    href: "mailto:creed@gmail.com",
  },
  {
    color: "#4ade80",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+998 91 541 97 34",
    href: "tel:+998915419734",
  },
  {
    color: "#fb923c",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Samarkand, Uzbekistan",
    href: null,
  },
]

function ContactItem({ item }) {
  const [hovered, setHovered] = useState(false)
  const Tag = item.href ? "a" : "div"

  return (
    <Tag
      {...(item.href ? { href: item.href } : {})}
      className="relative flex items-center gap-4 p-4 rounded-xl overflow-hidden cursor-default transition-all duration-300"
      style={{
        background: hovered ? "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)" : "linear-gradient(155deg, #0A1828 0%, #070C14 60%)",
        border: `1px solid ${hovered ? item.color + "33" : "rgba(255,255,255,0.06)"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none transition-opacity duration-400"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.color}77, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered ? `${item.color}18` : "rgba(255,255,255,0.04)",
          color: hovered ? item.color : "rgba(255,255,255,0.35)",
          border: `1px solid ${hovered ? item.color + "30" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        {item.icon}
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
          {item.label}
        </div>
        <div
          className="text-sm font-medium transition-colors duration-300"
          style={{ color: hovered ? item.color : "rgba(255,255,255,0.85)" }}
        >
          {item.value}
        </div>
      </div>
    </Tag>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <CanvasBg variant="signal" opacity={0.7} />
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full pointer-events-none opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(ellipse, #0EA5E9, transparent 70%)" }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-2xl mb-10">
          <span className="section-label">{t.contact?.subtitle}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
            {t.contact?.title}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
            {t.contact?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {CONTACT_INFO.map((item) => (
            <ContactItem key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
