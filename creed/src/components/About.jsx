"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./context/LanguageContext"

export default function About() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false) // Отдельный state для stats анимации

  // Stats данные — вынес для динамики/перевода
  const stats = [
    { value: "10+", label: t?.about?.stats?.experience || "Years Experience" },
    { value: "200+", label: t?.about?.stats?.projects || "Projects Done" },
    { value: "50+", label: t?.about?.stats?.clients || "Happy Clients" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Delay для stats
          const timer = setTimeout(() => setStatsVisible(true), 500)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" } // Раньше триггер, margin для предзагрузки
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

  return (
    <section id="about" ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div
            className={`space-y-4 sm:space-y-6 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
                {t.about.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
                {t.about.title}
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-muted leading-relaxed">
              <p className="text-sm sm:text-base lg:text-lg">{t.about.description}</p>
              <p className="text-sm sm:text-base lg:text-lg">{t.about.text}</p>
            </div>

            {/* Stats с анимацией */}
            <div className={`pt-2 sm:pt-4 flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 ease-out ${
              statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}>
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-surface dark:bg-surface-dark border border-accent/20 rounded-lg hover:scale-105 hover:shadow-md transition-all duration-300 flex-1 min-w-[100px] text-center"
                  style={{ transitionDelay: `${index * 100}ms` }} // Stagger эффект
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Visual element */}
          <div
            className={`relative transition-all duration-1000 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            } lg:order-first`} // На мобиле visual сверху для лучшего flow
          >
            <div className="relative aspect-square max-w-sm sm:max-w-md mx-auto w-full">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl blur-xl" />
              <div className="relative h-full bg-surface dark:bg-surface-dark border border-accent/20 rounded-2xl p-4 sm:p-6 sm:p-8 flex items-center justify-center shadow-lg">
                <div className="text-center space-y-3 sm:space-y-4 w-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-accent/10 rounded-full flex items-center justify-center border border-accent/30">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Innovation First</h3>
                    <p className="text-xs sm:text-sm text-muted">Pushing boundaries with cutting-edge technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}