"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./context/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    alert("Message sent! (Demo only)")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">{t.contact.subtitle}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-balance">{t.contact.title}</h2>
        </div>

        {/* Contact form */}
        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Name input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-muted"
                placeholder={t.contact.form.name}
              />
            </div>

            {/* Email input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-muted"
                placeholder={t.contact.form.email}
              />
            </div>

            {/* Message textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t.contact.form.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-surface border border-accent/20 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground placeholder:text-muted resize-none"
                placeholder={t.contact.form.message}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-accent text-background font-medium rounded-lg transition-all hover:bg-accent-hover hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
            >
              {t.contact.form.submit}
            </button>
          </form>

          {/* Contact info */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-surface border border-accent/10 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-sm text-muted">creed@gmail.com</div>
            </div>
            <div className="p-4 bg-surface border border-accent/10 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="text-sm text-muted">+998 91 541 97 34</div>
            </div>
            <div className="p-4 bg-surface border border-accent/10 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="text-sm text-muted">Samarkand, Uzbekistan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
