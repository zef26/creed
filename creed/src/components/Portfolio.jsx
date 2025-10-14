"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "./context/LanguageContext"

export default function Portfolio() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => observer.disconnect(), 1000) // Отключаем после триггера
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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

  // Примеры проектов с фото (тут можно динамизировать из t.portfolio.items)
  const projects = [
    {
      title: "E-commerce Platform",
      description: "Modern online store with seamless UX and fast loading.",
      image: "https://htmlburger.com/blog/wp-content/uploads/2024/03/web-design-portfolio-examples.png",
      category: "Web Design"
    },
    {
      title: "Product Designer Portfolio",
      description: "Interactive showcase for front-end developer with clean aesthetics.",
      image: "https://www.hostinger.com/in/tutorials/wp-content/uploads/sites/2/2022/06/Portfolio-website-of-the-product-designer-and-front-end-developer-Adham-Dannaway.png",
      category: "UI/UX"
    },
    {
      title: "Design Studio Site",
      description: "Dynamic agency landing with bold visuals and smooth animations.",
      image: "https://htmlburger.com/blog/wp-content/uploads/2024/01/Web-Design-Portfolio-Examples-Discover-Design-Studio-The-SuitmanCo-Project-Website.png",
      category: "Branding"
    },
    {
      title: "Digital Marketing Hub",
      description: "Engaging dashboard for campaigns with real-time metrics.",
      image: "https://cdn.dribbble.com/userupload/26080793/file/original-7dca9230bd6fa7df0a476a8e7be5e2cb.jpg?format=webp&resize=400x300&vertical=center",
      category: "Marketing"
    },
    {
      title: "Interaction Designer Portfolio",
      description: "Flexible freelance site with adaptive layouts and storytelling.",
      image: "https://blog.uxfol.io/wp-content/uploads/2021/03/leslie-griffith-interaction-designer-portfolio.png",
      category: "Digital Nomad"
    },
    {
      title: "Web Template Showcase",
      description: "Breath-taking portfolio templates with Elementor integration.",
      image: "https://essential-addons.com/wp-content/uploads/2023/12/Untitled-1.jpg",
      category: "Templates"
    }
  ]

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-16 sm:py-24 lg:py-32 bg-surface dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-xs sm:text-sm font-medium text-accent uppercase tracking-wider">
            {t.portfolio?.subtitle || "Our Works"}
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance leading-tight">
            {t.portfolio?.title || "Portfolio"}
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-background dark:bg-surface border border-accent/10 transition-all duration-500 ease-out hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 focus-within:ring-2 focus-within:ring-accent/50 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.category} project`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-left w-full">
                    <span className="text-xs text-accent uppercase tracking-wider mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="text-sm font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content below image (visible always) */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA if needed */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-accent text-background font-medium rounded-lg hover:scale-105 transition-all">
            {t.portfolio?.cta || "View All Projects"}
          </button>
        </div>
      </div>
    </section>
  )
}