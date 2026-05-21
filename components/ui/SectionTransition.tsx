"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
}

export default function SectionTransition({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = stagger
      ? ref.current.querySelectorAll(":scope > *")
      : [ref.current];

    gsap.fromTo(
      targets,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: stagger ? 0.12 : 0,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [delay, stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
