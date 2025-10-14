"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./context/LanguageContext"

export default function Advantages() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Отключаем observer после триггера для perf
          setTimeout(() => observer.disconnect(), 1000)
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
    <svg key="icon1" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>,
    <svg key="icon2" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>,
    <svg key="icon3" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>,
    <svg key="icon4" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    </svg>,
  ]

  // Fallback если items меньше 4
  const advantages = t.advantages.items || []
  const displayAdvantages = advantages.slice(0, 4) // Ограничиваем 4 для иконок

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-surface to-background dark:from-surface-dark dark:to-background antialiased"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
            {t.advantages.subtitle}
          </span>
          <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            {t.advantages.title}
          </h2>
        </div>

        {/* Advantages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayAdvantages.map((advantage, index) => (
            <div
              key={index}
              className={`group relative bg-background dark:bg-surface-dark border border-accent/10 rounded-xl p-4 sm:p-6 text-center transition-all duration-500 ease-out hover:border-accent/50 hover:scale-105 hover:shadow-xl hover:shadow-accent/10 focus-within:ring-2 focus-within:ring-accent/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }} // Stagger эффект
            >
              {/* Icon */}
              <div className="mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-all duration-300">
                {icons[index] || icons[0]} {/* Fallback к первой иконке */}
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-bold mb-2 group-hover:text-accent transition-colors leading-tight">
                {advantage.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                {advantage.description}
              </p>

              {/* Decorative element — subtle */}
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-accent/5 rounded-bl-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}