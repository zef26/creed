"use client"

import { createContext, useContext, useState } from "react"

const LanguageContext = createContext()

export const translations = {
  en: {
    nav: {
      about: "About",
      services: "Services",
      portfolio: "Portfolio",
      team: "Team",
      advantages: "Why Us",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      badge: "Engineering Studio",
      titleLine1: "We build",
      titleWords: ["Web Applications", "Mobile Apps", "API & Backend", "1C Systems"],
      titleLine3: "for your business",
      description: "We turn business ideas into fast, reliable digital products. Web, mobile, backend, and 1C — full cycle, on time, without compromise.",
      cta: "Start a Project",
      ctaSecondary: "See Our Work",
    },
    about: {
      title: "About CREED",
      subtitle: "Who We Are",
      description:
        "CREED is a product engineering studio focused on building reliable, scalable digital systems. From frontend interfaces to enterprise integrations, we take full ownership of what we build.",
      text: "Our team combines deep technical expertise with a product mindset. We write clean code, ship on time, and stand behind our work long after deployment.",
      stats: {
        experience: "Years in Business",
        projects: "Projects Delivered",
        clients: "Satisfied Clients",
      },
    },
    services: {
      title: "Our Services",
      subtitle: "What We Build",
      includesLabel: "What's included",
      processLabel: "How we work",
      ctaLabel: "Start a Project",
      items: [
        {
          title: "Web Development",
          description: "From landing pages to complex platforms — fast, SEO-ready web products with pixel-perfect UI and full ownership of the result.",
          includes: ["Landing pages & marketing sites", "SPAs & web applications", "E-commerce platforms", "Admin dashboards & CRM", "SEO optimisation", "Performance tuning"],
          process: ["Discovery & brief", "Design & prototype", "Development", "QA & testing", "Launch", "Support"],
        },
        {
          title: "Backend Development",
          description: "Robust APIs, server systems, Telegram bots, and cloud deployments. Built to scale, monitored in production, delivered on time.",
          includes: ["REST API design & development", "Database architecture (SQL & NoSQL)", "Telegram bot development", "Linux / Windows Server deployment", "CI/CD setup", "System monitoring"],
          process: ["Architecture planning", "API design", "Development", "Load testing", "Deployment", "Monitoring"],
        },
        {
          title: "Mobile Development",
          description: "Cross-platform apps for iOS and Android — native performance, smooth UX, ready for App Store and Google Play.",
          includes: ["iOS & Android (single codebase)", "UI/UX design integration", "Offline-first architecture", "Push notifications", "App Store & Google Play publishing", "Post-launch updates"],
          process: ["UX wireframing", "UI design", "Development", "Device testing", "Store submission", "Support"],
        },
        {
          title: "1C Development",
          description: "Enterprise automation: custom modules, web services, ERP integrations. Deep platform expertise, on-site or remote.",
          includes: ["Custom module development", "1C:Enterprise configuration", "Web services & integrations", "ERP & accounting setup", "Data migration", "On-site training"],
          process: ["Business analysis", "Technical spec", "Development", "Testing", "Deployment", "Training"],
        },
      ],
    },
    technologies: {
      title: "Technologies",
      subtitle: "Our Stack",
      categories: [
        {
          name: "Web",
          items: ["HTML", "CSS", "SCSS", "Tailwind CSS", "JSX", "TypeScript", "Vue", "React", "Next.js", "Vite", "Three.js"],
        },
        {
          name: "Backend",
          items: ["Python", "Django", "FastAPI", "Node.js", "SQL", "NoSQL", "Telegram Bot", "Linux", "Windows Server"],
        },
        {
          name: "Mobile",
          items: ["Flutter", "Dart", "React Native"],
        },
        {
          name: "1C",
          items: ["1C:Enterprise", "1C Development", "1C Web Server"],
        },
      ],
    },
    portfolio: {
      title: "Our Work",
      subtitle: "Selected Projects",
      inDevelopment: "In development",
      visit: "Open site",
      projects: [
        {
          title: "Siyob Ferma",
          category: "Web Development",
          description: "Multilingual website for a halal broiler chicken producer in the Samarkand region.",
        },
        {
          title: "Qancha chiqadi?",
          category: "Web Service",
          description: "Free calculators for Uzbekistan: customs, salary, loans and mortgages — in Uzbek and Russian.",
        },
        {
          title: "Qo'shni",
          category: "Platform",
          description: "New-build real estate platform: buyer website, developer dashboard, sales CRM and support panel.",
        },
        {
          title: "Parcha Track",
          category: "Automation",
          description: "Automated checkpoint system: plate recognition, access control and blacklist checks, operator console and management dashboard.",
        },
        {
          title: "Parcha Sklad",
          category: "1C:ERP",
          description: "1C configuration for a manufacturer: warehouse and workshops, purchasing and goods receipt, PPE, access-control logs, payroll, financial results and stock by batch.",
        },
      ],
    },
    team: {
      title: "The Team",
      subtitle: "Who Builds It",
      description: "A focused group of engineers and strategists. Each one a specialist, all aligned on shipping quality software.",
      members: [
        { role: "CTO & Lead Engineer", description: "Designs system architecture and leads technical strategy across all projects." },
        { role: "Full-Stack Developer", description: "Builds end-to-end web applications with a focus on performance and clean code." },
        { role: "Mobile Developer", description: "Delivers native-quality experiences on iOS and Android using Flutter and React Native." },
        { role: "1C Developer", description: "Specializes in enterprise automation, ERP systems, and 1C integrations." },
        { role: "Project Manager", description: "Ensures every project ships on time, in scope, and aligned with business goals." },
      ],
    },
    advantages: {
      title: "Why Choose Us",
      subtitle: "Our Edge",
      items: [
        {
          title: "On-Time Delivery",
          description: "We scope projects carefully and hit our deadlines. No surprises.",
        },
        {
          title: "Full-Stack Expertise",
          description: "Web, mobile, backend, enterprise — one team covers the entire stack.",
        },
        {
          title: "Long-Term Support",
          description: "We maintain what we build. Patches, updates, and iterations after launch.",
        },
        {
          title: "Scalable by Design",
          description: "Architecture that grows with your business, not against it.",
        },
      ],
    },
    faq: {
      title: "FAQ",
      subtitle: "Common Questions",
      items: [
        {
          question: "How much does development cost?",
          answer: "Cost depends on the scope and complexity of the project. We always start with a brief to understand your requirements, then provide a detailed estimate. Contact us — the first consultation is free.",
        },
        {
          question: "How long does a project take?",
          answer: "An MVP typically takes 4–8 weeks. A full product with multiple modules takes 2–4 months. We agree on clear milestones before starting and keep you updated throughout.",
        },
        {
          question: "How is the work process organized?",
          answer: "Brief → Estimate → Contract → Development in sprints → Testing → Delivery → Support. We maintain close communication at every stage and provide access to a project tracker.",
        },
        {
          question: "Do you support projects after launch?",
          answer: "Yes. We offer SLA-based support: bug fixes, updates, and feature additions. The terms are agreed upon in the contract — typically 1–3 months included after delivery.",
        },
        {
          question: "Can we start with a small project?",
          answer: "Absolutely. We often start with an MVP or a single module to validate the idea and build trust. A small project is a great way to see how we work before committing to something larger.",
        },
      ],
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Start a Project",
      description: "Have a project in mind? Tell us about it. We'll respond within one business day.",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Tell us about your project",
        submit: "Send Message",
        sending: "Sending...",
        successTitle: "Message sent!",
        successText: "We'll get back to you within one business day.",
        errorTitle: "Something went wrong",
        errorText: "Please try again or contact us directly.",
      },
    },
    interceptor: {
      label: "Live Demo",
      title: "We intercept every request",
      description: "Our system catches and processes incoming tasks — nothing slips through.",
      badge: "system.active",
      terminal: "creed.interceptor — packet_stream.ts",
      score: "intercepted",
    },
    footer: {
      tagline: "Engineering software that scales.",
      quickLinks: "Navigation",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },
  ru: {
    nav: {
      about: "О нас",
      services: "Услуги",
      portfolio: "Портфолио",
      team: "Команда",
      advantages: "Почему мы",
      faq: "FAQ",
      contact: "Контакты",
    },
    hero: {
      badge: "Студия разработки",
      titleLine1: "Создаём",
      titleWords: ["Веб-приложения", "Мобильные приложения", "API и бэкенд", "Системы 1С"],
      titleLine3: "для вашего бизнеса",
      description: "Превращаем бизнес-идеи в быстрые, надёжные цифровые продукты. Веб, мобайл, бэкенд и 1С — полный цикл, в срок, без компромиссов.",
      cta: "Начать проект",
      ctaSecondary: "Наши работы",
    },
    about: {
      title: "О компании CREED",
      subtitle: "Кто мы",
      description:
        "CREED — студия продуктовой разработки, специализирующаяся на создании надёжных и масштабируемых цифровых систем. Мы берём полную ответственность за то, что создаём.",
      text: "Наша команда сочетает глубокую техническую экспертизу с продуктовым мышлением. Мы пишем чистый код, соблюдаем сроки и поддерживаем продукты после запуска.",
      stats: {
        experience: "Лет в индустрии",
        projects: "Проектов сдано",
        clients: "Довольных клиентов",
      },
    },
    services: {
      title: "Наши услуги",
      subtitle: "Что мы создаём",
      includesLabel: "Что входит",
      processLabel: "Как мы работаем",
      ctaLabel: "Начать проект",
      items: [
        {
          title: "Веб-разработка",
          description: "От лендинга до сложной платформы — быстрые, SEO-готовые продукты с чистым кодом и полной ответственностью за результат.",
          includes: ["Лендинги и маркетинговые сайты", "SPA и веб-приложения", "E-commerce платформы", "Админ-панели и CRM", "SEO-оптимизация", "Оптимизация производительности"],
          process: ["Бриф и аналитика", "Дизайн и прототип", "Разработка", "QA и тестирование", "Запуск", "Поддержка"],
        },
        {
          title: "Бэкенд-разработка",
          description: "Надёжные API, серверные системы, Telegram-боты и облачные деплои. Строим на масштаб, мониторим в продакшене.",
          includes: ["Проектирование и разработка REST API", "Архитектура баз данных (SQL и NoSQL)", "Разработка Telegram-ботов", "Деплой на Linux / Windows Server", "Настройка CI/CD", "Мониторинг систем"],
          process: ["Проектирование архитектуры", "Дизайн API", "Разработка", "Нагрузочное тестирование", "Деплой", "Мониторинг"],
        },
        {
          title: "Мобильная разработка",
          description: "Кроссплатформенные приложения для iOS и Android — нативная производительность, плавный UX, выход в App Store и Google Play.",
          includes: ["iOS и Android (единый код)", "Интеграция UI/UX дизайна", "Offline-first архитектура", "Push-уведомления", "Публикация в App Store и Google Play", "Обновления после запуска"],
          process: ["UX-прототипирование", "UI-дизайн", "Разработка", "Тестирование на устройствах", "Публикация в магазинах", "Поддержка"],
        },
        {
          title: "Разработка на 1С",
          description: "Автоматизация предприятий: кастомные модули, веб-сервисы, интеграции ERP. Глубокая экспертиза, удалённо или на месте.",
          includes: ["Разработка кастомных модулей", "Настройка 1С:Предприятие", "Веб-сервисы и интеграции", "Настройка ERP и систем учёта", "Миграция данных", "Обучение сотрудников"],
          process: ["Анализ бизнеса", "Техническое задание", "Разработка", "Тестирование", "Внедрение", "Обучение"],
        },
      ],
    },
    technologies: {
      title: "Технологии",
      subtitle: "Наш стек",
      categories: [
        {
          name: "Веб",
          items: ["HTML", "CSS", "SCSS", "Tailwind CSS", "JSX", "TypeScript", "Vue", "React", "Next.js", "Vite", "Three.js"],
        },
        {
          name: "Бэкенд",
          items: ["Python", "Django", "FastAPI", "Node.js", "SQL", "NoSQL", "Telegram Bot", "Linux", "Windows Server"],
        },
        {
          name: "Мобильная",
          items: ["Flutter", "Dart", "React Native"],
        },
        {
          name: "1C",
          items: ["1С:Предприятие", "1С Разработка", "1С Веб-сервер"],
        },
      ],
    },
    portfolio: {
      title: "Наши работы",
      subtitle: "Избранные проекты",
      inDevelopment: "В разработке",
      visit: "Открыть сайт",
      projects: [
        {
          title: "Siyob Ferma",
          category: "Веб-разработка",
          description: "Многоязычный сайт производителя халяльного бройлерного мяса в Самаркандской области.",
        },
        {
          title: "Qancha chiqadi?",
          category: "Веб-сервис",
          description: "Бесплатные калькуляторы для Узбекистана: таможня, зарплата, кредит, ипотека. На узбекском и русском.",
        },
        {
          title: "Qo'shni",
          category: "Платформа",
          description: "Платформа новостроек: сайт для покупателей, кабинет застройщика, CRM отдела продаж и панель поддержки.",
        },
        {
          title: "Parcha Track",
          category: "Автоматизация",
          description: "Система автоматизированного КПП: распознавание номеров, СКУД и стоп-лист, пульт оператора и дашборд руководителя.",
        },
        {
          title: "Parcha Sklad",
          category: "1С:ERP",
          description: "Конфигурация 1С для производства: склад и цеха, закупки и приёмка материалов, СИЗ, проходы СКУД, ФОТ, финансовый результат и остатки продукции по партиям.",
        },
      ],
    },
    team: {
      title: "Команда",
      subtitle: "Кто создаёт",
      description: "Сфокусированная группа инженеров и менеджеров. Каждый — специалист в своей области.",
      members: [
        { role: "CTO & Ведущий инженер", description: "Проектирует архитектуру систем и определяет техническую стратегию." },
        { role: "Full-Stack разработчик", description: "Разрабатывает полноценные веб-приложения с фокусом на производительность." },
        { role: "Мобильный разработчик", description: "Создаёт нативные приложения для iOS и Android на Flutter и React Native." },
        { role: "Разработчик 1С", description: "Специализируется на автоматизации предприятий и интеграциях 1С." },
        { role: "Менеджер проектов", description: "Обеспечивает соблюдение сроков, бюджета и соответствие бизнес-целям." },
      ],
    },
    advantages: {
      title: "Почему выбирают нас",
      subtitle: "Наши преимущества",
      items: [
        {
          title: "Соблюдение сроков",
          description: "Мы тщательно планируем проекты и выполняем обязательства. Без сюрпризов.",
        },
        {
          title: "Экспертиза полного стека",
          description: "Веб, мобайл, бэкенд, корпоративные системы — одна команда покрывает всё.",
        },
        {
          title: "Долгосрочная поддержка",
          description: "Мы обслуживаем то, что создаём. Обновления и доработки после запуска.",
        },
        {
          title: "Масштабируемая архитектура",
          description: "Системы, которые растут вместе с вашим бизнесом, а не вопреки ему.",
        },
      ],
    },
    faq: {
      title: "FAQ",
      subtitle: "Частые вопросы",
      items: [
        {
          question: "Сколько стоит разработка?",
          answer: "Стоимость зависит от объёма и сложности проекта. Мы всегда начинаем с брифа, чтобы понять задачу, и только после этого даём детальную оценку. Напишите нам — первая консультация бесплатно.",
        },
        {
          question: "Сколько времени занимает проект?",
          answer: "MVP — обычно 4–8 недель. Полноценный продукт с несколькими модулями — 2–4 месяца. Мы заранее согласуем чёткие этапы и регулярно отчитываемся о ходе работ.",
        },
        {
          question: "Как организован процесс работы?",
          answer: "Бриф → Оценка → Договор → Разработка спринтами → Тестирование → Сдача → Поддержка. На каждом этапе поддерживаем тесную связь и даём доступ к трекеру задач.",
        },
        {
          question: "Поддерживаете проекты после сдачи?",
          answer: "Да. Предлагаем поддержку по SLA: исправление ошибок, обновления, развитие функционала. Условия фиксируются в договоре — как правило, 1–3 месяца поддержки включены после сдачи.",
        },
        {
          question: "Можно начать с небольшого проекта?",
          answer: "Конечно. Мы часто начинаем с MVP или отдельного модуля, чтобы проверить идею и выстроить доверие. Небольшой проект — хороший способ увидеть, как мы работаем, прежде чем браться за что-то масштабное.",
        },
      ],
    },
    contact: {
      title: "Связаться с нами",
      subtitle: "Начать проект",
      description: "Есть проект? Расскажите нам о нём. Мы ответим в течение одного рабочего дня.",
      form: {
        name: "Ваше имя",
        email: "Ваш Email",
        message: "Расскажите о вашем проекте",
        submit: "Отправить",
        sending: "Отправка...",
        successTitle: "Сообщение отправлено!",
        successText: "Мы ответим в течение одного рабочего дня.",
        errorTitle: "Что-то пошло не так",
        errorText: "Попробуйте ещё раз или свяжитесь напрямую.",
      },
    },
    interceptor: {
      label: "Живая демо",
      title: "Мы перехватываем каждый запрос",
      description: "Наша система ловит и обрабатывает входящие задачи — ничто не проскальзывает мимо.",
      badge: "система.активна",
      terminal: "creed.перехватчик — поток_данных.ts",
      score: "перехвачено",
    },
    footer: {
      tagline: "Разрабатываем программное обеспечение, которое масштабируется.",
      quickLinks: "Навигация",
      rights: "Все права защищены.",
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
    },
  },
  uz: {
    nav: {
      about: "Biz haqida",
      services: "Xizmatlar",
      portfolio: "Portfolio",
      team: "Jamoa",
      advantages: "Nega biz",
      faq: "FAQ",
      contact: "Aloqa",
    },
    hero: {
      badge: "Dasturlash studiyasi",
      titleLine1: "Yaratamiz",
      titleWords: ["Veb-ilovalar", "Mobil ilovalar", "API va backend", "1C tizimlari"],
      titleLine3: "sizning biznesingiz uchun",
      description: "Biznes g'oyalarini tez, ishonchli raqamli mahsulotlarga aylantiramiz. Veb, mobil, backend va 1C — to'liq tsikl, o'z vaqtida, murosasiz.",
      cta: "Loyiha boshlash",
      ctaSecondary: "Ishlarimizni ko'rish",
    },
    about: {
      title: "CREED haqida",
      subtitle: "Biz kimmiz",
      description:
        "CREED — ishonchli va kengaytiriladigan raqamli tizimlar yaratishga ixtisoslashgan mahsulot muhandislik studiyasi.",
      text: "Jamoamiz chuqur texnik tajribani mahsulot tafakkuri bilan birlashtiradi. Biz toza kod yozamiz, muddatlarga rioya qilamiz va ishimiz uchun javobgarlik olamiz.",
      stats: {
        experience: "Yillik tajriba",
        projects: "Topshirilgan loyihalar",
        clients: "Mamnun mijozlar",
      },
    },
    services: {
      title: "Xizmatlarimiz",
      subtitle: "Nima quramiz",
      includesLabel: "Nima kiradi",
      processLabel: "Qanday ishlaymiz",
      ctaLabel: "Loyiha boshlash",
      items: [
        {
          title: "Veb-ishlab chiqish",
          description: "Landing sahifadan murakkab platformagacha — tez, SEO-tayyor mahsulotlar, mukammal UI va natijaga to'liq mas'uliyat.",
          includes: ["Landing va marketing saytlar", "SPA va veb-ilovalar", "E-commerce platformalar", "Admin panellar va CRM", "SEO optimallashtirish", "Ishlash tezligini oshirish"],
          process: ["Brifing va tahlil", "Dizayn va prototip", "Ishlab chiqish", "QA va sinov", "Ishga tushirish", "Qo'llab-quvvatlash"],
        },
        {
          title: "Backend ishlab chiqish",
          description: "Ishonchli API, server tizimlari, Telegram botlar va cloud joylashtirishlar. Kengayish uchun qurilgan, production'da kuzatiladi.",
          includes: ["REST API loyihalash va ishlab chiqish", "Ma'lumotlar bazasi arxitekturasi (SQL va NoSQL)", "Telegram bot ishlab chiqish", "Linux / Windows Server joylashtirilishi", "CI/CD sozlash", "Tizim monitoringi"],
          process: ["Arxitektura rejalashtirish", "API dizayni", "Ishlab chiqish", "Yuklama sinovi", "Joylashtirish", "Monitoring"],
        },
        {
          title: "Mobil ishlab chiqish",
          description: "iOS va Android uchun kross-platforma ilovalar — nativ ishlash, silliq UX, App Store va Google Play'ga tayyor.",
          includes: ["iOS va Android (bitta kod bazasi)", "UI/UX dizayn integratsiyasi", "Offline-first arxitektura", "Push xabarnomalar", "App Store va Google Play'da nashr", "Ishga tushirishdan keyingi yangilanishlar"],
          process: ["UX prototiplash", "UI dizayn", "Ishlab chiqish", "Qurilmada sinov", "Do'konda nashr", "Qo'llab-quvvatlash"],
        },
        {
          title: "1C ishlab chiqish",
          description: "Korxona avtomatlashtirish: maxsus modullar, veb-xizmatlar, ERP integratsiyalari. Chuqur ekspertiza, uzoqdan yoki joyida.",
          includes: ["Maxsus modul ishlab chiqish", "1C:Enterprise konfiguratsiyasi", "Veb-xizmatlar va integratsiyalar", "ERP va hisob tizimlarini sozlash", "Ma'lumotlarni ko'chirish", "Xodimlarni o'qitish"],
          process: ["Biznes tahlili", "Texnik topshiriq", "Ishlab chiqish", "Sinov", "Joriy etish", "O'qitish"],
        },
      ],
    },
    technologies: {
      title: "Texnologiyalar",
      subtitle: "Bizning stek",
      categories: [
        {
          name: "Veb",
          items: ["HTML", "CSS", "SCSS", "Tailwind CSS", "JSX", "TypeScript", "Vue", "React", "Next.js", "Vite", "Three.js"],
        },
        {
          name: "Backend",
          items: ["Python", "Django", "FastAPI", "Node.js", "SQL", "NoSQL", "Telegram Bot", "Linux", "Windows Server"],
        },
        {
          name: "Mobil",
          items: ["Flutter", "Dart", "React Native"],
        },
        {
          name: "1C",
          items: ["1C:Enterprise", "1C Ishlab chiqish", "1C Veb-server"],
        },
      ],
    },
    portfolio: {
      title: "Ishlarimiz",
      subtitle: "Tanlangan loyihalar",
      inDevelopment: "Ishlab chiqilmoqda",
      visit: "Saytni ochish",
      projects: [
        {
          title: "Siyob Ferma",
          category: "Veb-dasturlash",
          description: "Samarqand viloyatidagi halol broyler go'shti ishlab chiqaruvchisi uchun ko'p tilli sayt.",
        },
        {
          title: "Qancha chiqadi?",
          category: "Veb-xizmat",
          description: "O'zbekiston uchun bepul kalkulyatorlar: bojxona, maosh, kredit, ipoteka. O'zbek va rus tillarida.",
        },
        {
          title: "Qo'shni",
          category: "Platforma",
          description: "Yangi uylar platformasi: xaridorlar uchun sayt, quruvchi kabineti, savdo bo'limi CRM'i va qo'llab-quvvatlash paneli.",
        },
        {
          title: "Parcha Track",
          category: "Avtomatlashtirish",
          description: "Avtomatlashtirilgan KPP tizimi: raqamlarni aniqlash, kirish nazorati va qora ro'yxat, operator pulti va rahbar dashbordi.",
        },
        {
          title: "Parcha Sklad",
          category: "1C:ERP",
          description: "Ishlab chiqarish uchun 1C konfiguratsiyasi: ombor va sexlar, xarid va materiallarni qabul qilish, SHHV, SKUD o'tishlari, ish haqi fondi, moliyaviy natija va partiyalar bo'yicha qoldiqlar.",
        },
      ],
    },
    team: {
      title: "Jamoa",
      subtitle: "Kim quradi",
      description: "Muhandislar va menejerlarning maqsadli guruhi. Har biri o'z sohasida mutaxassis.",
      members: [
        { role: "CTO va Bosh muhandis", description: "Tizim arxitekturasini loyihalaydi va texnik strategiyani boshqaradi." },
        { role: "Full-Stack dasturchi", description: "Samaradorlikka e'tibor bilan to'liq veb-ilovalar yaratadi." },
        { role: "Mobil dasturchi", description: "Flutter va React Native yordamida iOS va Android uchun ilovalar yaratadi." },
        { role: "1C dasturchisi", description: "Korxona avtomatlashtirishiga va 1C integratsiyalariga ixtisoslashgan." },
        { role: "Loyiha menejeri", description: "Har bir loyiha muddatida, byudjetida va biznes maqsadlariga mos holda yetkazilishini ta'minlaydi." },
      ],
    },
    advantages: {
      title: "Nega bizni tanlashadi",
      subtitle: "Ustunliklarimiz",
      items: [
        {
          title: "Muddatlarga rioya",
          description: "Loyihalarni puxta rejalashtiramiz va majburiyatlarimizni bajaramiz.",
        },
        {
          title: "To'liq stek tajribasi",
          description: "Veb, mobil, backend, korporativ tizimlar — bitta jamoa hammasini qoplaydi.",
        },
        {
          title: "Uzoq muddatli qo'llab-quvvatlash",
          description: "Qurilgan narsani xizmat ko'rsatamiz. Ishga tushirgandan keyin yangilanishlar va takomillashtirishlar.",
        },
        {
          title: "Kengaytiriladigan arxitektura",
          description: "Biznesingiz bilan birga o'sadigan tizimlar.",
        },
      ],
    },
    faq: {
      title: "FAQ",
      subtitle: "Ko'p so'raladigan savollar",
      items: [
        {
          question: "Ishlab chiqish qancha turadi?",
          answer: "Narx loyihaning hajmi va murakkabligiga bog'liq. Biz har doim brifdan boshlaymiz, so'ng batafsil narx taqdim etamiz. Yozing — birinchi maslahat bepul.",
        },
        {
          question: "Loyiha qancha vaqt oladi?",
          answer: "MVP odatda 4–8 hafta. Bir nechta modulli to'liq mahsulot — 2–4 oy. Biz aniq bosqichlarni oldindan kelishib olamiz va doimo xabar berib boramiz.",
        },
        {
          question: "Ish jarayoni qanday tashkil etilgan?",
          answer: "Brif → Baholash → Shartnoma → Sprintlarda ishlab chiqish → Sinov → Topshirish → Qo'llab-quvvatlash. Har bir bosqichda yaqin aloqa saqlaymiz va vazifalar kuzatuviga kirish beramiz.",
        },
        {
          question: "Topshirishdan keyin loyihani qo'llaysizmi?",
          answer: "Ha. SLA asosida qo'llab-quvvatlash taklif etamiz: xatolarni tuzatish, yangilanishlar, yangi funksiyalar. Shartlar shartnomada belgilanadi — odatda topshirishdan keyin 1–3 oy qo'llab-quvvatlash kiritilgan.",
        },
        {
          question: "Kichik loyihadan boshlash mumkinmi?",
          answer: "Albatta. Biz ko'pincha g'oyani sinab ko'rish va ishonch o'rnatish uchun MVP yoki alohida moduldan boshlaymiz. Kichik loyiha — kattaroq narsani olishdan oldin qanday ishlaymizni ko'rish uchun ajoyib imkoniyat.",
        },
      ],
    },
    contact: {
      title: "Bog'laning",
      subtitle: "Loyiha boshlash",
      description: "Loyihangiz bormi? Bizga ayting. Bir ish kuni ichida javob beramiz.",
      form: {
        name: "Ismingiz",
        email: "Email manzilingiz",
        message: "Loyihangiz haqida gapirib bering",
        submit: "Yuborish",
        sending: "Yuborilmoqda...",
        successTitle: "Xabar yuborildi!",
        successText: "Bir ish kuni ichida javob beramiz.",
        errorTitle: "Xatolik yuz berdi",
        errorText: "Qayta urinib ko'ring yoki to'g'ridan-to'g'ri bog'laning.",
      },
    },
    interceptor: {
      label: "Jonli Demo",
      title: "Har bir so'rovni ushlaymiz",
      description: "Tizimimiz kiruvchi vazifalarni ushlab, qayta ishlaydi — hech narsa o'tmaydi.",
      badge: "tizim.faol",
      terminal: "creed.interceptor — ma'lumot_oqimi.ts",
      score: "ushlandi",
    },
    footer: {
      tagline: "Kengaytiriladigan dasturiy ta'minotni muhandislik qilamiz.",
      quickLinks: "Navigatsiya",
      rights: "Barcha huquqlar himoyalangan.",
      privacy: "Maxfiylik siyosati",
      terms: "Foydalanish shartlari",
    },
  },
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ru")

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
