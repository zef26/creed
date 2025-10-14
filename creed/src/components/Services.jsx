"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./context/LanguageContext"

export default function Services() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } // Консистентно с другими секциями
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const icons = [
    <svg key="icon1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>,
    <svg key="icon2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>,
    <svg key="icon3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>,
    <svg key="icon4" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>,
  ]

  // Fallback если items меньше 4
  const services = t.services.items || []
  const displayServices = services.slice(0, 4) // Ограничиваем 4 для иконок

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background to-surface dark:from-background dark:to-surface-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
            {t.services.subtitle}
          </span>
          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            {t.services.title}
          </h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayServices.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-surface dark:bg-surface-dark border border-accent/10 rounded-xl p-4 sm:p-6 transition-all duration-500 ease-out hover:border-accent/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10 focus-within:ring-2 focus-within:ring-accent/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }} // Stagger эффект
            >
              {/* Icon */}
              <div className="mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-all duration-300">
                {icons[index] || icons[0]} {/* Fallback к первой иконке */}
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-accent transition-colors leading-tight">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {service.description}
              </p>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}