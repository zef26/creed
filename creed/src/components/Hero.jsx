"use client"

import { useEffect, useRef, useCallback } from "react"
import { useLanguage } from "./context/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const resizeTimeoutRef = useRef(null)

  // Класс Particle вынесен наружу для чистоты
  class Particle {
    constructor(canvas) {
      this.canvas = canvas
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 1
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.opacity = Math.random() * 0.5 + 0.2
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x > this.canvas.width) this.x = 0
      if (this.x < 0) this.x = this.canvas.width
      if (this.y > this.canvas.height) this.y = 0
      if (this.y < 0) this.y = this.canvas.height
    }

    draw(ctx) {
      ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const initCanvas = useCallback((canvas) => {
    if (!canvas || typeof window === 'undefined') return null

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      console.warn("Canvas 2D context not supported")
      return null
    }

    const particles = []
    const particleCount = window.innerWidth < 768 ? 50 : 100 // Меньше на мобиле для perf

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas))
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()
    return { ctx, particles, animate }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const canvasData = initCanvas(canvas)
    if (!canvasData) return

    // Debounced resize
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Пересоздаём particles для новой размерности
        canvasData.particles.forEach(p => {
          p.canvas = canvas
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
        })
      }, 150)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", handleResize)
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current)
    }
  }, [initCanvas])

  const scrollToContact = useCallback(() => {
    if (typeof window === 'undefined') return
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Gradient overlay — легче на тёмном */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 dark:via-background/50 to-background z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-surface/50 backdrop-blur-sm border border-accent/20 rounded-full">
            <span className="text-xs sm:text-sm text-accent font-medium">{t.hero.subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
              {t.hero.title}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto text-pretty leading-relaxed">
            {t.hero.description}
          </p>

          <div className="pt-2 sm:pt-4">
            <button
              onClick={scrollToContact}
              className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-accent text-background font-medium rounded-lg overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 hover:scale-105 hover:shadow-lg hover:shadow-accent/50 active:scale-95"
              aria-label={t.hero.cta}
            >
              <span className="relative z-10">{t.hero.cta}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity" />
              {/* Ripple эффект */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator — скрыт на touch */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none [touch-action:none] hidden sm:block">
        <div className="w-5 h-8 border-2 border-accent/50 rounded-full flex items-start justify-center p-1.5">
          <div className="w-0.5 h-2.5 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}