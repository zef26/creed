// App.jsx
import React, { Suspense } from 'react';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Technologies from "./components/sections/Technologies";
import Advantages from "./components/sections/Advantages";
import Team from "./components/sections/Team";
import FAQ from "./components/sections/FAQ";
import Cursor from "./components/ui/Cursor";
import ScrollProgress from "./components/ui/ScrollProgress";
import DataInterceptor from "./components/ui/DataInterceptor";
import { LanguageProvider } from "./context/LanguageContext";

const Portfolio = React.lazy(() => import("./components/sections/Portfolio"));
const Contact = React.lazy(() => import("./components/sections/Contact"));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Component error:', error, info); }
  render() {
    if (this.state.hasError) {
      return <div className="text-center py-8 text-red-400">Что-то пошло не так. Перезагрузи страницу.</div>;
    }
    return this.props.children;
  }
}

const Spinner = () => (
  <div className="flex items-center justify-center py-24">
    <div className="w-8 h-8 border-2 border-[var(--color-accent)]/30 border-t-[var(--color-accent)] rounded-full animate-spin" />
  </div>
)

function App() {
  return (
    <LanguageProvider>
      <Cursor />
      <ScrollProgress />
      <div className="w-full min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)] overflow-x-hidden">
        <Header />
        <ErrorBoundary>
          <main className="flex-1 w-full" style={{ paddingTop: 'var(--header-height, 5rem)' }}>
            <Hero />
            <About />
            <Services />
            <Technologies />
            <DataInterceptor />
            <Suspense fallback={<Spinner />}>
              <Portfolio />
            </Suspense>
            <Advantages />
            <Team />
            <FAQ />
            <Suspense fallback={<Spinner />}>
              <Contact />
            </Suspense>
          </main>
        </ErrorBoundary>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
