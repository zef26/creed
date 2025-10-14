"use client"

import { createContext, useContext, useState } from "react"

const LanguageContext = createContext()

export const translations = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      advantages: "Advantages",
      contact: "Contact",
    },
    hero: {
      title: "Digital Innovation",
      subtitle: "Crafting Future",
      description: "We create cutting-edge digital experiences that push the boundaries of technology and design.",
      cta: "Start Project",
    },
    about: {
      title: "About Us",
      subtitle: "Who We Are",
      description:
        "We are a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of expertise in web development, we transform ideas into reality.",
      text: "Our approach combines innovative technology with creative design to deliver solutions that not only meet but exceed expectations. We believe in the power of clean code, intuitive interfaces, and seamless user experiences.",
    },
    services: {
      title: "Services",
      subtitle: "What We Offer",
      items: [
        {
          title: "Web Development",
          description: "Custom websites and web applications built with modern technologies and best practices.",
        },
        {
          title: "UI/UX Design",
          description: "Beautiful, intuitive interfaces designed to provide exceptional user experiences.",
        },
        {
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications for iOS and Android.",
        },
        {
          title: "Consulting",
          description: "Strategic technology consulting to help your business grow and innovate.",
        },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Our Work",
      projects: [
        {
          title: "E-Commerce Platform",
          category: "Web Development",
          description: "Modern online shopping experience",
        },
        {
          title: "Finance Dashboard",
          category: "UI/UX Design",
          description: "Real-time analytics interface",
        },
        {
          title: "Mobile Banking App",
          category: "Mobile Development",
          description: "Secure banking on the go",
        },
        {
          title: "AI Chat Platform",
          category: "Web Development",
          description: "Intelligent conversation system",
        },
      ],
    },
    advantages: {
      title: "Advantages",
      subtitle: "Why Choose Us",
      items: [
        {
          title: "Fast Delivery",
          description: "Quick turnaround without compromising quality",
        },
        {
          title: "Modern Tech",
          description: "Latest technologies and frameworks",
        },
        {
          title: "24/7 Support",
          description: "Always here when you need us",
        },
        {
          title: "Scalable Solutions",
          description: "Built to grow with your business",
        },
      ],
    },
    contact: {
      title: "Contact",
      subtitle: "Get In Touch",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        submit: "Send Message",
      },
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      portfolio: "Портфолио",
      advantages: "Преимущества",
      contact: "Контакты",
    },
    hero: {
      title: "Цифровые Инновации",
      subtitle: "Создаем Будущее",
      description: "Мы создаем передовые цифровые решения, которые раздвигают границы технологий и дизайна.",
      cta: "Начать Проект",
    },
    about: {
      title: "О нас",
      subtitle: "Кто мы",
      description:
        "Мы команда увлеченных разработчиков и дизайнеров, создающих исключительные цифровые решения. С многолетним опытом в веб-разработке мы превращаем идеи в реальность.",
      text: "Наш подход сочетает инновационные технологии с креативным дизайном для создания решений, которые не только соответствуют, но и превосходят ожидания. Мы верим в силу чистого кода, интуитивных интерфейсов и безупречного пользовательского опыта.",
    },
    services: {
      title: "Услуги",
      subtitle: "Что мы предлагаем",
      items: [
        {
          title: "Веб-разработка",
          description: "Индивидуальные сайты и веб-приложения на современных технологиях.",
        },
        {
          title: "UI/UX Дизайн",
          description: "Красивые, интуитивные интерфейсы для исключительного пользовательского опыта.",
        },
        {
          title: "Мобильные приложения",
          description: "Нативные и кроссплатформенные приложения для iOS и Android.",
        },
        {
          title: "Консалтинг",
          description: "Стратегический технологический консалтинг для роста вашего бизнеса.",
        },
      ],
    },
    portfolio: {
      title: "Портфолио",
      subtitle: "Наши работы",
      projects: [
        {
          title: "E-Commerce Платформа",
          category: "Веб-разработка",
          description: "Современный онлайн-шопинг",
        },
        {
          title: "Финансовая Панель",
          category: "UI/UX Дизайн",
          description: "Интерфейс аналитики в реальном времени",
        },
        {
          title: "Мобильный Банкинг",
          category: "Мобильная разработка",
          description: "Безопасный банкинг в движении",
        },
        {
          title: "AI Чат Платформа",
          category: "Веб-разработка",
          description: "Интеллектуальная система общения",
        },
      ],
    },
    advantages: {
      title: "Преимущества",
      subtitle: "Почему мы",
      items: [
        {
          title: "Быстрая доставка",
          description: "Быстрое выполнение без потери качества",
        },
        {
          title: "Современные технологии",
          description: "Новейшие технологии и фреймворки",
        },
        {
          title: "Поддержка 24/7",
          description: "Всегда на связи когда нужно",
        },
        {
          title: "Масштабируемость",
          description: "Растем вместе с вашим бизнесом",
        },
      ],
    },
    contact: {
      title: "Контакты",
      subtitle: "Свяжитесь с нами",
      form: {
        name: "Ваше имя",
        email: "Ваш Email",
        message: "Ваше сообщение",
        submit: "Отправить",
      },
    },
    footer: {
      rights: "Все права защищены.",
    },
  },
  uz: {
    nav: {
      about: "Biz haqimizda",
      services: "Xizmatlar",
      portfolio: "Portfolio",
      advantages: "Afzalliklar",
      contact: "Aloqa",
    },
    hero: {
      title: "Raqamli Innovatsiya",
      subtitle: "Kelajakni Yaratamiz",
      description: "Biz texnologiya va dizayn chegaralarini kengaytiradigan ilg'or raqamli tajribalarni yaratamiz.",
      cta: "Loyihani Boshlash",
    },
    about: {
      title: "Biz haqimizda",
      subtitle: "Biz kimmiz",
      description:
        "Biz ajoyib raqamli tajribalarni yaratishga bag'ishlangan ishtiyoqli dasturchilar va dizaynerlar jamoasimiz. Veb-ishlab chiqarishda ko'p yillik tajriba bilan g'oyalarni haqiqatga aylantiramiz.",
      text: "Bizning yondashuvimiz innovatsion texnologiyani ijodiy dizayn bilan birlashtiradi va kutilganlarni qondirish va oshirib yuboradigan yechimlarni taqdim etadi. Biz toza kod, intuitiv interfeyslar va muammosiz foydalanuvchi tajribasining kuchiga ishonamiz.",
    },
    services: {
      title: "Xizmatlar",
      subtitle: "Nima taklif qilamiz",
      items: [
        {
          title: "Veb Ishlab Chiqish",
          description: "Zamonaviy texnologiyalar bilan qurilgan maxsus veb-saytlar va ilovalar.",
        },
        {
          title: "UI/UX Dizayn",
          description: "Ajoyib foydalanuvchi tajribasini ta'minlaydigan chiroyli interfeyslar.",
        },
        {
          title: "Mobil Ilovalar",
          description: "iOS va Android uchun mahalliy va ko'p platformali mobil ilovalar.",
        },
        {
          title: "Konsalting",
          description: "Biznesingizni o'stirish va innovatsiya qilish uchun strategik texnologiya maslahati.",
        },
      ],
    },
    portfolio: {
      title: "Portfolio",
      subtitle: "Bizning ishlarimiz",
      projects: [
        {
          title: "E-Commerce Platforma",
          category: "Veb Ishlab Chiqish",
          description: "Zamonaviy onlayn xarid tajribasi",
        },
        {
          title: "Moliyaviy Dashboard",
          category: "UI/UX Dizayn",
          description: "Real vaqt tahlil interfeysi",
        },
        {
          title: "Mobil Banking Ilova",
          category: "Mobil Ishlab Chiqish",
          description: "Xavfsiz mobil banking",
        },
        {
          title: "AI Chat Platforma",
          category: "Veb Ishlab Chiqish",
          description: "Aqlli suhbat tizimi",
        },
      ],
    },
    advantages: {
      title: "Afzalliklar",
      subtitle: "Nega bizni tanlash kerak",
      items: [
        {
          title: "Tez Yetkazish",
          description: "Sifatni yo'qotmasdan tez bajarish",
        },
        {
          title: "Zamonaviy Texnologiya",
          description: "Eng so'nggi texnologiyalar va freymvorklar",
        },
        {
          title: "24/7 Qo'llab-quvvatlash",
          description: "Har doim sizga yordam beramiz",
        },
        {
          title: "Kengaytirilishi Mumkin",
          description: "Biznesingiz bilan birga o'samiz",
        },
      ],
    },
    contact: {
      title: "Aloqa",
      subtitle: "Bog'laning",
      form: {
        name: "Ismingiz",
        email: "Email manzilingiz",
        message: "Xabaringiz",
        submit: "Yuborish",
      },
    },
    footer: {
      rights: "Barcha huquqlar himoyalangan.",
    },
  },
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en")

  const t = translations[language]

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
