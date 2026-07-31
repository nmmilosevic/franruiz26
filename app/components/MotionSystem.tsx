"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

type MotionRole = "title" | "copy" | "media" | "content" | "ui";

const motionRoots = "main > section:not(:first-of-type), .home-footer-card";
const titleTargets = "h2, h3";
const structuralTargets = [
  "[data-reveal]",
  "article",
  "figure",
  "form",
  "dl",
  "blockquote",
  ".home-footer-contact",
  ".home-footer-details > section",
  ".home-footer-base",
  ".project-story-copy",
  ".project-story-details",
].join(",");

function splitTitleIntoWords(element: HTMLElement) {
  if (element.dataset.motionSplit === "true") return;

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  const words: HTMLElement[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.data.trim()) textNodes.push(node);
  }

  let wordIndex = 0;
  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();

    node.data.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }

      const word = document.createElement("span");
      word.className = "motion-word";
      word.style.setProperty("--word-index", `${wordIndex}`);
      word.textContent = part;
      fragment.append(word);
      words.push(word);
      wordIndex += 1;
    });

    node.replaceWith(fragment);
  });

  element.dataset.motionSplit = "true";
  element.style.setProperty("--word-count", `${wordIndex}`);

  const hasSlowPace = element.dataset.motionPace === "slow";
  const staggerCeiling = hasSlowPace ? 45 : 34;
  const staggerWindow = hasSlowPace ? 360 : 250;
  const stagger = Math.min(
    staggerCeiling,
    staggerWindow / Math.max(words.length - 1, 1),
  );
  words.forEach((word, index) => {
    word.style.setProperty("--word-delay", `${Math.round(index * stagger)}ms`);
  });
}

function roleFor(element: HTMLElement): MotionRole {
  if (
    element.matches("figure") ||
    /image|media|gallery|portrait|panorama/.test(element.className)
  ) {
    return "media";
  }
  if (element.matches("h2, h3")) return "title";
  if (element.matches("p")) return "copy";
  if (element.matches("form, .action-pill")) return "ui";
  return "content";
}

function hasTargetAncestor(element: HTMLElement, targets: Set<HTMLElement>, boundary: Element) {
  let parent = element.parentElement;
  while (parent && parent !== boundary) {
    if (targets.has(parent)) return true;
    parent = parent.parentElement;
  }
  return false;
}

export default function MotionSystem() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const roots = [...document.querySelectorAll<HTMLElement>(motionRoots)];
    const targets = new Set<HTMLElement>();

    roots.forEach((root) => {
      const structural = [
        ...root.querySelectorAll<HTMLElement>(structuralTargets),
      ];
      const structuralSet = new Set(structural);

      structural.forEach((element) => {
        if (element.matches(".team-person") || element.closest(".team-person")) return;
        if (element.querySelector(titleTargets)) return;
        if (!hasTargetAncestor(element, structuralSet, root)) targets.add(element);
      });

      const supporting = root.querySelectorAll<HTMLElement>(`${titleTargets}, p, .action-pill`);
      supporting.forEach((element) => {
        if (element.closest(".team-person")) return;
        if (!hasTargetAncestor(element, targets, root)) targets.add(element);
      });
    });

    const orderedTargets = [...targets];
    orderedTargets.forEach((element, index) => {
      element.dataset.motion = roleFor(element);
      element.style.setProperty("--motion-delay", `${(index % 4) * 40}ms`);
      if (element.dataset.motion === "title") splitTitleIntoWords(element);
    });

    document.documentElement.classList.add("motion-ready");

    if (reduceMotion || !("IntersectionObserver" in window)) {
      orderedTargets.forEach((element) => {
        element.dataset.visible = "true";
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.visible = "true";
          observer.unobserve(element);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -3% 0px" },
    );

    orderedTargets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
