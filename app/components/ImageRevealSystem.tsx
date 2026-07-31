"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll-into-view reveal for content photography sitewide.
 * Rise + scale only — never fully clip/hide images (that left cards blank).
 */
const IMAGE_FRAMES = [
  ".home-project-image",
  ".home-studio-image",
  ".home-service-visual",
  ".project-index-image",
  ".project-gallery-item",
  ".source-gallery-item",
  ".service-archive-card figure",
  ".service-related figure",
  ".service-detail-gallery figure",
  ".studio-profile-origin-media",
  ".studio-profile-method-composition > figure",
  ".studio-profile-disciplines-intro figure",
  ".studio-profile-team-portrait",
  ".studio-project-feature-image",
  ".next-project-image",
].join(",");

const SKIP_WITHIN = ".team-person, .home-header, .archive-header, header, .home-brand, .archive-brand";

function isInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > 40 && rect.top < vh - 40;
}

export default function ImageRevealSystem() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frames = [...document.querySelectorAll<HTMLElement>(IMAGE_FRAMES)].filter(
      (element) => !element.closest(SKIP_WITHIN),
    );

    frames.forEach((element, index) => {
      element.classList.add("image-reveal");
      element.style.setProperty("--image-reveal-delay", `${(index % 3) * 70}ms`);
    });

    document.documentElement.classList.add("image-reveal-ready");

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-image-revealed");
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      frames.forEach(reveal);
      return () => {
        document.documentElement.classList.remove("image-reveal-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.05, rootMargin: "80px 0px 80px 0px" },
    );

    frames.forEach((element) => {
      if (isInView(element)) {
        // Defer one frame so the "from" transform can paint, then open.
        requestAnimationFrame(() => reveal(element));
        return;
      }
      observer.observe(element);
    });

    // Safety net: never leave images stuck hidden.
    const safety = window.setTimeout(() => {
      frames.forEach((element) => {
        if (!element.classList.contains("is-image-revealed") && isInView(element)) {
          reveal(element);
        }
      });
    }, 1200);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
      document.documentElement.classList.remove("image-reveal-ready");
      frames.forEach((element) => {
        element.classList.remove("image-reveal", "is-image-revealed");
        element.style.removeProperty("--image-reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
