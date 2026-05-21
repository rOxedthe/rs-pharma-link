"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once at module load — safe in "use client" context
gsap.registerPlugin(ScrollTrigger);

/** @deprecated Call is no longer needed — plugin auto-registers on import */
export function initGSAP() {
  // no-op, kept for backwards compatibility
}

export function createScrollTrigger(
  trigger: string | Element,
  animation: gsap.core.Timeline | gsap.core.Tween,
  options: ScrollTrigger.Vars = {}
) {
  return ScrollTrigger.create({
    trigger,
    start: "top 80%",
    toggleActions: "play none none none",
    animation,
    ...options,
  });
}

export function fadeSlideIn(
  targets: string | Element | Element[],
  stagger = 0.1,
  delay = 0
) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger,
      delay,
    }
  );
}

export { gsap, ScrollTrigger };
