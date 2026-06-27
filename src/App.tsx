import { useEffect, useState } from "react";
import type { PageId } from "./types";
import { ThemeProvider } from "./hooks/useTheme";
import { I18nProvider } from "./hooks/useI18n";
import { Seo } from "./components/Seo";
import { PromoBanner } from "./components/PromoBanner";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Gallery } from "./pages/Gallery";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

export default function App() {
  const [page, setPage] = useState<PageId>("home");

  const navigate = (p: PageId) => {
    setPage(p);
  };

  // scroll to top whenever the page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  return (
    <ThemeProvider>
      <I18nProvider>
        <Seo page={page} />
        <PromoBanner onNavigate={navigate} />
        <Navbar page={page} onNavigate={navigate} />
        <main>
          {page === "home" && <Home onNavigate={navigate} />}
          {page === "services" && <Services onNavigate={navigate} />}
          {page === "gallery" && <Gallery onNavigate={navigate} />}
          {page === "pricing" && <Pricing onNavigate={navigate} />}
          {page === "about" && <About onNavigate={navigate} />}
          {page === "contact" && <Contact />}
        </main>
        <Footer onNavigate={navigate} />
      </I18nProvider>
    </ThemeProvider>
  );
}
