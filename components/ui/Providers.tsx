"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { initGSAP, ScrollTrigger } from "@/lib/gsap";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Providers({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    initGSAP();

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const { gsap } = require("gsap");
    const gsapTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsapTick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Loading screen — covers the page on every hard load / refresh */}
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {children}
    </>
  );
}
