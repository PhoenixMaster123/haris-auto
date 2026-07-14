import { useEffect, useState } from "react";
import type { PageId } from "./types";
import { ThemeProvider } from "./hooks/useTheme";
import { I18nProvider } from "./hooks/useI18n";
import { Seo } from "./components/Seo";
import { PromoBanner } from "./components/PromoBanner";
import { Navbar } from "./components/Navbar";
import { MobileActionBar } from "./components/MobileActionBar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Gallery } from "./pages/Gallery";
import { Pricing } from "./pages/Pricing";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

const PAGES: PageId[] = ["home", "services", "gallery", "pricing", "about", "contact"];

/** Current page from the URL hash (e.g. #pricing), defaulting to home. */
const fromHash = (): PageId => {
  const h = window.location.hash.replace(/^#\/?/, "") as PageId;
  return PAGES.includes(h) ? h : "home";
};

export default function App() {
  const [page, setPage] = useState<PageId>(fromHash);

  const navigate = (p: PageId) => {
    // Keep the hash in sync so every page is linkable; hashchange updates state.
    if (window.location.hash !== `#${p}`) window.location.hash = p;
    else setPage(p);
  };

  // back/forward buttons and hand-edited hashes
  useEffect(() => {
    const onHash = () => setPage(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

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
        <MobileActionBar page={page} onNavigate={navigate} />
      </I18nProvider>
    </ThemeProvider>
  );
}
