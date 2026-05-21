"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { initGSAP, ScrollTrigger } from "@/lib/gsap";

export default function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    initGSAP();

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const gsapTick = (time: number) => lenis.raf(time * 1000);
    // Use GSAP ticker
    const { gsap } = require("gsap");
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
