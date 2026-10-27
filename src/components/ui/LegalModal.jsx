// LegalModal.jsx
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useLanguage } from "../../context/LanguageContext"

export default function LegalModal({ type, onClose }) {
  const { language } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleKey = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  const docs = CONTENT[language] || CONTENT.en
  const content = type === "privacy" ? docs.privacy : docs.terms

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ background: "rgba(4,8,16,0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, #0E1F35 0%, #070C14 60%)",
          border: "1px solid rgba(14,165,233,0.14)",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid rgba(14,165,233,0.1)", background: "rgba(14,165,233,0.04)" }}
        >
          <div className="flex gap-1.5">
            <button onClick={onClose} className="w-2.5 h-2.5 rounded-full bg-[#FF5F57] transition-opacity hover:opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="ml-2 text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>
            {type === "privacy" ? "privacy-policy.md" : "terms-of-service.md"}
          </span>
          <button
            onClick={onClose}
            className="ml-auto w-6 h-6 flex items-center justify-center rounded-md transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.3)" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed">
          <h1 className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
            {content.title}
          </h1>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            {content.date}
          </p>

          {content.sections.map((section, i) => (
            <div key={i} className="space-y-2">
              <h2 className="text-sm font-bold" style={{ color: "#38BDF8" }}>
                {section.heading}
              </h2>
              {section.body.map((para, j) => (
                <p key={j} style={{ color: "rgba(255,255,255,0.45)" }}>{para}</p>
              ))}
            </div>
          ))}

          <p className="text-xs pt-4" style={{ color: "rgba(255,255,255,0.2)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            © {new Date().getFullYear()} CREED Engineering Studio. Samarkand, Uzbekistan.
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── Content ────────────────────────────────────────────────────────────────

const CONTENT = {
  en: {
    privacy: {
      title: "Privacy Policy",
      date: "Last updated: January 1, 2025",
      sections: [
        {
          heading: "1. Information We Collect",
          body: [
            "When you fill out our contact form, we collect your name, email address, and the content of your message. We do not collect any other personal data automatically.",
            "We do not use cookies, analytics trackers, or third-party tracking scripts on this website.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          body: [
            "The information you provide is used solely to respond to your inquiry and to communicate with you about potential or ongoing projects.",
            "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
          ],
        },
        {
          heading: "3. Data Storage",
          body: [
            "Messages submitted through the contact form are delivered via Telegram Bot API to our internal team channel. We retain message content only as long as necessary to process your request.",
            "We do not maintain a separate database of user submissions.",
          ],
        },
        {
          heading: "4. Third-Party Services",
          body: [
            "We use the Telegram Bot API solely for receiving contact form submissions. Telegram's own Privacy Policy applies to data processed through their platform.",
            "No other third-party services with access to your personal data are used on this site.",
          ],
        },
        {
          heading: "5. Your Rights",
          body: [
            "You may request deletion of any personal data you have submitted to us by contacting us at creed@gmail.com. We will process your request within 5 business days.",
          ],
        },
        {
          heading: "6. Contact",
          body: [
            "If you have questions about this Privacy Policy, contact us at creed@gmail.com or call +998 91 541 97 34.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      date: "Last updated: January 1, 2025",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body: [
            "By accessing this website, you agree to these Terms of Service. If you do not agree, please do not use this site.",
            "These terms apply to all visitors and anyone who submits a request through our contact form.",
          ],
        },
        {
          heading: "2. Services",
          body: [
            "CREED is a software engineering studio based in Samarkand, Uzbekistan. We provide web, mobile, backend, and 1C development services.",
            "Submitting a contact form does not constitute a binding contract. Engagements are formalised through a separate written agreement signed by both parties.",
          ],
        },
        {
          heading: "3. Intellectual Property",
          body: [
            "All content on this website — including design, code, text, and graphics — is the property of CREED and may not be reproduced without written permission.",
            "Work created for clients is governed by the terms of the individual project contract, which typically grants the client full ownership of deliverables upon final payment.",
          ],
        },
        {
          heading: "4. Limitation of Liability",
          body: [
            "CREED makes no warranties regarding the accuracy or completeness of information on this website.",
            "We are not liable for any indirect, incidental, or consequential damages arising from the use of this website or from reliance on information presented here.",
          ],
        },
        {
          heading: "5. Changes to Terms",
          body: [
            "We reserve the right to update these Terms at any time. The date at the top of this page indicates when the terms were last revised.",
          ],
        },
        {
          heading: "6. Governing Law",
          body: [
            "These Terms are governed by the laws of the Republic of Uzbekistan. Disputes will be resolved in the courts of Samarkand, Uzbekistan.",
          ],
        },
        {
          heading: "7. Contact",
          body: [
            "Questions about these Terms? Reach us at creed@gmail.com.",
          ],
        },
      ],
    },
  },

  ru: {
    privacy: {
      title: "Политика конфиденциальности",
      date: "Последнее обновление: 1 января 2025 г.",
      sections: [
        {
          heading: "1. Какие данные мы собираем",
          body: [
            "При заполнении контактной формы мы получаем ваше имя, адрес электронной почты и текст сообщения. Никакие другие персональные данные автоматически не собираются.",
            "На этом сайте не используются файлы cookie, счётчики аналитики или сторонние трекеры.",
          ],
        },
        {
          heading: "2. Как мы используем ваши данные",
          body: [
            "Предоставленная информация используется исключительно для ответа на ваш запрос и общения по поводу потенциальных или текущих проектов.",
            "Мы не продаём, не сдаём в аренду и не передаём ваши персональные данные третьим лицам в маркетинговых целях.",
          ],
        },
        {
          heading: "3. Хранение данных",
          body: [
            "Сообщения, отправленные через контактную форму, доставляются через Telegram Bot API во внутренний канал нашей команды. Мы храним содержимое сообщений только до обработки запроса.",
            "Отдельная база данных с пользовательскими обращениями не ведётся.",
          ],
        },
        {
          heading: "4. Сторонние сервисы",
          body: [
            "Telegram Bot API используется исключительно для получения заявок с контактной формы. К данным, обрабатываемым через платформу Telegram, применяется политика конфиденциальности Telegram.",
            "Других сторонних сервисов с доступом к вашим персональным данным на сайте не используется.",
          ],
        },
        {
          heading: "5. Ваши права",
          body: [
            "Вы можете запросить удаление любых переданных нам персональных данных, написав на creed@gmail.com. Мы обработаем запрос в течение 5 рабочих дней.",
          ],
        },
        {
          heading: "6. Контакты",
          body: [
            "По вопросам, касающимся данной политики, обращайтесь по адресу creed@gmail.com или по телефону +998 91 541 97 34.",
          ],
        },
      ],
    },
    terms: {
      title: "Условия использования",
      date: "Последнее обновление: 1 января 2025 г.",
      sections: [
        {
          heading: "1. Принятие условий",
          body: [
            "Используя данный сайт, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны, пожалуйста, покиньте сайт.",
            "Условия распространяются на всех посетителей и пользователей, отправивших запрос через контактную форму.",
          ],
        },
        {
          heading: "2. Услуги",
          body: [
            "CREED — студия разработки программного обеспечения, расположенная в Самарканде, Узбекистан. Мы предоставляем услуги по разработке веб-, мобильных приложений, бэкенда и систем на платформе 1С.",
            "Отправка контактной формы не является заключением договора. Сотрудничество оформляется отдельным письменным соглашением, подписанным обеими сторонами.",
          ],
        },
        {
          heading: "3. Интеллектуальная собственность",
          body: [
            "Всё содержимое сайта — дизайн, код, тексты и графика — является собственностью CREED и не может быть воспроизведено без письменного разрешения.",
            "Права на результаты работы, созданной для клиентов, определяются условиями индивидуального договора. Как правило, после окончательной оплаты клиент получает полные права на все результаты.",
          ],
        },
        {
          heading: "4. Ограничение ответственности",
          body: [
            "CREED не даёт гарантий относительно точности или полноты информации на сайте.",
            "Мы не несём ответственности за косвенный, случайный или последующий ущерб, возникший в результате использования сайта или доверия к размещённым на нём материалам.",
          ],
        },
        {
          heading: "5. Изменение условий",
          body: [
            "Мы оставляем за собой право обновлять настоящие Условия в любое время. Дата вверху страницы указывает на время последней редакции.",
          ],
        },
        {
          heading: "6. Применимое право",
          body: [
            "Настоящие Условия регулируются законодательством Республики Узбекистан. Споры рассматриваются в судах Самарканда.",
          ],
        },
        {
          heading: "7. Контакты",
          body: [
            "Вопросы по Условиям использования направляйте на creed@gmail.com.",
          ],
        },
      ],
    },
  },

  uz: {
    privacy: {
      title: "Maxfiylik siyosati",
      date: "Oxirgi yangilanish: 1 yanvar 2025 yil",
      sections: [
        {
          heading: "1. Qanday ma'lumotlar to'planadi",
          body: [
            "Aloqa formasini to'ldirganingizda biz ismingizni, elektron pochta manzilingizni va xabar matnini olamiz. Boshqa shaxsiy ma'lumotlar avtomatik ravishda to'planmaydi.",
            "Ushbu saytda cookie-fayllar, analitika hisoblagichlari yoki uchinchi tomon kuzatuv skriptlari ishlatilmaydi.",
          ],
        },
        {
          heading: "2. Ma'lumotlaringizdan qanday foydalanamiz",
          body: [
            "Siz taqdim etgan ma'lumotlar faqat so'rovingizga javob berish va loyihalar bo'yicha muloqot qilish uchun ishlatiladi.",
            "Biz shaxsiy ma'lumotlaringizni marketing maqsadlarida uchinchi shaxslarga sotmaymiz, ijaraga bermaymiz yoki ulashmaymiz.",
          ],
        },
        {
          heading: "3. Ma'lumotlarni saqlash",
          body: [
            "Aloqa formasi orqali yuborilgan xabarlar Telegram Bot API orqali jamoamizning ichki kanaliga yetkaziladi. Xabar mazmuni faqat so'rov qayta ishlanguncha saqlanadi.",
            "Foydalanuvchi murojaatlari uchun alohida ma'lumotlar bazasi yuritilmaydi.",
          ],
        },
        {
          heading: "4. Uchinchi tomon xizmatlari",
          body: [
            "Telegram Bot API faqat aloqa formasidan arizalar qabul qilish uchun ishlatiladi. Telegram platformasi orqali qayta ishlangan ma'lumotlarga Telegram maxfiylik siyosati qo'llaniladi.",
            "Shaxsiy ma'lumotlaringizga kirish imkoniga ega boshqa uchinchi tomon xizmatlari saytda ishlatilmaydi.",
          ],
        },
        {
          heading: "5. Sizning huquqlaringiz",
          body: [
            "Bizga taqdim etgan shaxsiy ma'lumotlaringizni o'chirishni creed@gmail.com manziliga yozib so'rashingiz mumkin. So'rovni 5 ish kuni ichida ko'rib chiqamiz.",
          ],
        },
        {
          heading: "6. Aloqa",
          body: [
            "Ushbu siyosat bo'yicha savollar uchun creed@gmail.com manziliga yozing yoki +998 91 541 97 34 raqamiga qo'ng'iroq qiling.",
          ],
        },
      ],
    },
    terms: {
      title: "Foydalanish shartlari",
      date: "Oxirgi yangilanish: 1 yanvar 2025 yil",
      sections: [
        {
          heading: "1. Shartlarni qabul qilish",
          body: [
            "Ushbu saytdan foydalanib, siz Foydalanish shartlarini qabul qilasiz. Rozi bo'lmasangiz, saytdan foydalanmang.",
            "Shartlar barcha tashrif buyuruvchilarga va aloqa formasi orqali murojaat qilganlarga tatbiq etiladi.",
          ],
        },
        {
          heading: "2. Xizmatlar",
          body: [
            "CREED — O'zbekiston, Samarqandda joylashgan dasturiy ta'minot ishlab chiqarish studiyasi. Biz veb, mobil, backend va 1C tizimlarini ishlab chiqish xizmatlarini taqdim etamiz.",
            "Aloqa formasini yuborish shartnoma tuzishni anglatmaydi. Hamkorlik ikki tomon imzolagan alohida yozma shartnoma bilan rasmiylashtiriladi.",
          ],
        },
        {
          heading: "3. Intellektual mulk",
          body: [
            "Saytdagi barcha kontent — dizayn, kod, matnlar va grafikalar — CREED mulki hisoblanadi va yozma ruxsatsiz ko'paytirish mumkin emas.",
            "Mijozlar uchun yaratilgan ishlar huquqlari alohida loyiha shartnomasi shartlari bilan belgilanadi. Odatda, to'liq to'lovdan so'ng mijoz barcha natijalar ustidan to'liq huquqqa ega bo'ladi.",
          ],
        },
        {
          heading: "4. Javobgarlikni cheklash",
          body: [
            "CREED saytdagi ma'lumotlarning to'liqligi yoki aniqligi to'g'risida kafolat bermaydi.",
            "Biz saytdan foydalanish yoki saytdagi ma'lumotlarga tayanish natijasida yuzaga kelgan bilvosita yoki oqibatli zararlar uchun javobgar emasmiz.",
          ],
        },
        {
          heading: "5. Shartlarni o'zgartirish",
          body: [
            "Biz ushbu Shartlarni istalgan vaqtda yangilash huquqini saqlab qolamiz. Sahifa tepasidagi sana oxirgi tahrir vaqtini ko'rsatadi.",
          ],
        },
        {
          heading: "6. Qo'llaniladigan qonunchilik",
          body: [
            "Ushbu Shartlar O'zbekiston Respublikasi qonunchiligiga muvofiq tartibga solinadi. Nizolar Samarqand sudlarida ko'rib chiqiladi.",
          ],
        },
        {
          heading: "7. Aloqa",
          body: [
            "Foydalanish shartlari bo'yicha savollaringizni creed@gmail.com manziliga yuboring.",
          ],
        },
      ],
    },
  },
}
