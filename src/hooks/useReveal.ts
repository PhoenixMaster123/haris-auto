import { useEffect, useRef } from "react";

/**
 * Adds the `.in` class to any descendant carrying `.reveal`
 * when it scrolls into view. Returns a ref to attach to a container.
 *
 * Robustness:
 *  - A MutationObserver re-scans whenever nodes are added, so content
 *    that remounts (e.g. cards re-keyed on a language switch) is picked
 *    up and revealed instead of being left permanently hidden.
 *  - A fallback timer reveals anything still hidden, so a missed observer
 *    callback (or an unsupported browser) can never hide content.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const collect = () =>
      Array.from(root.querySelectorAll<HTMLElement>(".reveal:not(.in)"));

    const noIO = typeof IntersectionObserver === "undefined";

    const io = noIO
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                (e.target as HTMLElement).classList.add("in");
                io!.unobserve(e.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
        );

    // Reveal anything already in view, observe the rest. Safe to call
    // repeatedly — already-revealed nodes are skipped by the selector.
    const scan = () => {
      collect().forEach((el) => {
        if (noIO) {
          el.classList.add("in");
          return;
        }
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add("in");
        else io!.observe(el);
      });
    };

    scan();
    requestAnimationFrame(scan);

    // Re-scan when the subtree changes (e.g. a language switch remounts nodes).
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });

    // Fallback: never let content stay hidden.
    const fallback = window.setTimeout(() => {
      collect().forEach((el) => el.classList.add("in"));
    }, 2500);

    return () => {
      io?.disconnect();
      mo.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return ref;
}
