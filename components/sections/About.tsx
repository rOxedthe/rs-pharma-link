"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const DoorReveal = dynamic(() => import("@/components/3d/DoorReveal"), {
  ssr: false,
  loading: () => <Fallback3D label="Door Scene" height="100%" />,
});

const values = [
  { label: "Trust",      desc: "Built on decades of pharmaceutical relationships across Nepal." },
  { label: "Precision",  desc: "Every order handled with GMP-compliant care and accuracy." },
  { label: "Speed",      desc: "Same-day and next-day dispatch to Kathmandu Valley pharmacies." },
  { label: "Integrity",  desc: "Transparent pricing and authentic medicines — always." },
];

export default function About() {
  const [triggered, setTriggered] = useState(false);

  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Thin ruled line top */}
      <div className="ruled-line absolute top-0 left-0 right-0" style={{ opacity: 0.3 }} />

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* 3D Door — left */}
          <div
            className="order-2 lg:order-1 scene-frame"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setTriggered(true)}
            onMouseLeave={() => setTriggered(false)}
          >
            <Suspense fallback={<Fallback3D label="Door Reveal" height="480px" />}>
              <DoorReveal triggered={triggered} />
            </Suspense>
          </div>

          {/* Content — right */}
          <div className="order-1 lg:order-2 content-measure mx-auto text-center lg:text-left">
            <SectionTransition stagger>
              <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>
                — WHO WE ARE
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                Opening Doors to Better{" "}
                <span style={{ color: "var(--color-accent)" }}>Healthcare</span>
              </h2>
              <p className="text-base leading-relaxed mb-8 mx-auto lg:mx-0" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
                R.S. Pharma Link Pvt. Ltd. was founded with a singular mission: to make quality medicines accessible to every pharmacy, clinic, and hospital across Nepal. Based in Golfutar, Kathmandu, we are the trusted bridge between global pharmaceutical manufacturers and local healthcare providers.
              </p>

              {/* Values grid */}
              <div className="card-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                {values.map(({ label, desc }) => (
                  <div key={label} className="glass-card p-4">
                    <p className="font-mono-label mb-1" style={{ color: "var(--color-accent)", fontSize: "0.65rem" }}>{label}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>{desc}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
                Our Full Story <ArrowRight size={15} />
              </Link>
            </SectionTransition>
          </div>
        </div>
      </div>
    </section>
  );
}
