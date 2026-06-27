import { useEffect, useRef } from "react";

/**
 * Adds the `.in` class to any descendant carrying `.reveal`
 * when it scrolls into view. Returns a ref to attach to a container.
 *
 * Safety: a fallback timer reveals anything still hidden, so a missed
 * observer callback (or an unsupported browser) can never leave content
 * permanently invisible.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const collect = () =>
      Array.from(root.querySelectorAll<HTMLElement>(".reveal:not(.in)"));

    const targets = collect();
    if (targets.length === 0) return;

    // No IO support -> show everything immediately.
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    targets.forEach((el) => io.observe(el));

    // Reveal anything already in/near the viewport on first paint.
    const revealVisible = () => {
      collect().forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add("in");
      });
    };
    requestAnimationFrame(revealVisible);

    // Fallback: never let content stay hidden.
    const fallback = window.setTimeout(() => {
      collect().forEach((el) => el.classList.add("in"));
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}
