// App.jsx
import React, { Suspense } from 'react';
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import Footer from "./components/Footer";
import { LanguageProvider } from "./components/context/LanguageContext";

// Lazy-loaded components для оптимизации
const Portfolio = React.lazy(() => import("./components/Portfolio"));
const Contact = React.lazy(() => import("./components/Contact"));

// Простой Error Boundary (расширь по необходимости)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-center py-8 text-red-500">Что-то пошло не так. Перезагрузи страницу.</div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <LanguageProvider>
      <div className="w-full min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] overflow-x-hidden scroll-smooth">
        
        {/* ===== ХЕДЕР ===== */}
        <Header />

        {/* ===== ОСНОВНОЙ КОНТЕНТ ===== */}
        <ErrorBoundary>
          <main className="flex-1 w-full flex justify-center pt-[var(--header-height, 6rem)]"> {/* Динамическая высота через CSS var */}
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 lg:space-y-32">
              <Hero />
              <About />
              <Services />
              
              {/* Lazy-loaded секции с fallback */}
              <Suspense fallback={<div className="text-center py-8">Загрузка...</div>}>
                <Portfolio />
                <Advantages />
                <Contact />
              </Suspense>
            </div>
          </main>
        </ErrorBoundary>

        {/* ===== ФУТЕР ===== */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;