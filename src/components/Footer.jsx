"use client"

import { useLanguage } from "./context/LanguageContext"
import creedLogo from "../assets/creed-logo.svg" // Логотип (замени на свой)

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  // Социальные сети — вынес в массив для лёгкости
  const socials = [
    {
      name: "GitHub",
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      href: "https://github.com/digital-agency"
    },
    {
      name: "Twitter",
      icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
      href: "https://twitter.com/digital-agency"
    },
    {
      name: "LinkedIn",
      icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
      href: "https://linkedin.com/company/digital-agency"
    },
  ]

  // Smooth scroll функция (вынес для переиспользования)
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative bg-surface dark:bg-surface-dark border-t border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground"><img src={creedLogo} alt="" /></h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Creating exceptional digital experiences with cutting-edge technology and innovative design.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">
              {t.footer?.quickLinks || "Quick Links"}
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              {["about", "services", "portfolio", "contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link)}
                    className="text-xs sm:text-sm text-muted hover:text-accent transition-colors block w-full text-left hover:underline"
                  >
                    {t.nav[link] || link.charAt(0).toUpperCase() + link.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">
              {t.footer?.followUs || "Follow Us"}
            </h4>
            <div className="flex space-x-3 sm:space-x-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-background dark:bg-surface-dark border border-accent/20 rounded-lg flex items-center justify-center text-muted hover:text-accent hover:border-accent/50 hover:scale-110 transition-all duration-300"
                  aria-label={social.name}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-accent/10 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-xs sm:text-sm">
          <p className="text-muted text-center sm:text-left">
            © {currentYear} CREED. {t.footer?.rights || "All rights reserved."}
          </p>
          <div className="flex space-x-4 sm:space-x-6">
            <button 
              onClick={() => window.open('privacy', '_blank')} 
              className="text-muted hover:text-accent transition-colors"
            >
              {t.footer?.privacy || "Privacy Policy"}
            </button>
            <button 
              onClick={() => window.open('terms', '_blank')} 
              className="text-muted hover:text-accent transition-colors"
            >
              {t.footer?.terms || "Terms of Service"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}