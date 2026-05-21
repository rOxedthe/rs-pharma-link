"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const StatsChart = dynamic(() => import("@/components/3d/StatsChart"), {
  ssr: false,
  loading: () => <Fallback3D label="Stats Chart" height="100%" />,
});

const stats = [
  { value: "5+",   label: "Years of Operation",    mono: "YRS" },
  { value: "200+", label: "Pharmacy Partners",      mono: "PTR" },
  { value: "1500+",label: "Products Distributed",   mono: "SKU" },
  { value: "7",    label: "Districts Served",        mono: "DST" },
  { value: "50K+", label: "Monthly Orders",          mono: "ORD" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTransition className="text-center mb-16">
          <p className="font-mono-label mb-4" style={{ color: "var(--color-medical)" }}>
            — BY THE NUMBERS
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}>
            Why Pharmacies Choose{" "}
            <span style={{ color: "var(--color-accent)" }}>R.S. Pharma Link</span>
          </h2>
        </SectionTransition>

        {/* 3D Chart */}
        <div style={{ height: "340px", marginBottom: "3rem" }}>
          <Suspense fallback={<Fallback3D label="Stats Visualization" height="340px" />}>
            <StatsChart triggered={triggered} />
          </Suspense>
        </div>

        {/* Stat labels */}
        <SectionTransition stagger className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map(({ value, label, mono }) => (
            <div key={mono} className="text-center">
              <p
                className="font-mono-label mb-1"
                style={{ color: "var(--color-medical)", fontSize: "0.6rem" }}
              >
                {mono}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-primary)",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                }}
              >
                {value}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}
              >
                {label}
              </p>
            </div>
          ))}
        </SectionTransition>
      </div>
    </section>
  );
}
