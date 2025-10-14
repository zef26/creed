// Header.jsx
"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./context/LanguageContext"
import creedLogo from "../assets/creed-logo.svg" // Default import для SVG

// Константа для nav items
const NAV_ITEMS = {
  about: "about",
  services: "services",
  portfolio: "portfolio",
  advantages: "advantages",
  contact: "contact"
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  // Throttled handleScroll для производительности
  useEffect(() => {
    let timeoutId
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const threshold = window.innerWidth < 768 ? 30 : 50
        setIsScrolled(window.scrollY > threshold)
      }, 100)
    }

    const updateHeaderHeight = () => {
      const header = document.querySelector('header')
      if (header) {
        document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`)
      }
    }
    updateHeaderHeight()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateHeaderHeight)
      clearTimeout(timeoutId)
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('nav')) {
        setIsMobileMenuOpen(false)
        document.body.style.overflow = ""
      }
    }
    if (isMobileMenuOpen) document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  const navItems = Object.keys(NAV_ITEMS)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-surface"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-20 sm:h-24 gap-4 md:gap-0 justify-items-stretch min-w-0">
          
          {/* ====== ЛОГОТИП (слева, ещё меньше) ====== */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center justify-start p-0 text-foreground hover:text-accent transition-colors"
          >
            <img 
              src={creedLogo} 
              alt="Creed Logo" 
              className="h-3 sm:h-4 md:h-5 lg:h-6 w-auto object-fit-contain" // Ещё меньше: 12px → 16px → 20px → 24px
            />
          </button>

          {/* ====== ДЕСКТОП НАВИГАЦИЯ (центр) ====== */}
          <nav className="hidden md:flex items-center justify-center gap-10 min-w-[300px]">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-base font-medium text-muted hover:text-foreground transition-colors"
              >
                {t.nav?.[item] || item.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* ====== ПРАВАЯ ЧАСТЬ (бургер + язык, справа) ====== */}
          <div className="flex items-center justify-self-end gap-2 sm:gap-3">
            <button
              className="md:hidden text-foreground hover:text-accent transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {["en", "ru", "uz"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-sm font-medium rounded-md transition-all ${
                    language === lang
                      ? "bg-accent text-background shadow-sm"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ====== МОБИЛЬНОЕ ДРОПДАУН МЕНЮ ====== */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-background/95 backdrop-blur-md border-t border-surface py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-base font-medium text-muted hover:text-foreground transition-colors py-2"
                >
                  {t.nav?.[item] || item.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}