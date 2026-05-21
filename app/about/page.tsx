"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const DoorReveal = dynamic(() => import("@/components/3d/DoorReveal"), { ssr: false });

const milestones = [
  { year: "2018", event: "Founded in Golfutar, Kathmandu with a vision to modernize pharma distribution" },
  { year: "2019", event: "Secured GMP certification and onboarded first 50 pharmacy partners" },
  { year: "2020", event: "Expanded cold-chain logistics to serve hospitals and clinics" },
  { year: "2022", event: "Reached 1,000+ SKUs and 150 active partner pharmacies" },
  { year: "2024", event: "Expanded coverage to 7 districts across the Kathmandu Valley" },
  { year: "2025", event: "Launched digital ordering platform and real-time inventory tracking" },
];

const teamValues = [
  "Uncompromising quality standards on every product",
  "Direct relationships with licensed manufacturers",
  "Cold-chain compliant logistics network",
  "Dedicated account management for partners",
  "24-hour emergency medicine dispatch",
  "Full regulatory compliance and documentation",
];

export default function AboutPage() {
  const doorRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.25 }
    );
    if (doorRef.current) obs.observe(doorRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="section-pad relative overflow-hidden" style={{ background: "var(--color-dark)", paddingTop: "10rem" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionTransition stagger className="max-w-2xl">
            <p className="font-mono-label mb-5" style={{ color: "var(--color-medical)" }}>— ABOUT US</p>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(2.8rem, 5vw, 4rem)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
              Opening Doors to{" "}
              <span style={{ color: "var(--color-accent)" }}>Better Healthcare</span>{" "}
              in Nepal
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(244,241,235,0.6)", fontFamily: "var(--font-body)" }}>
              Founded in Golfutar, Kathmandu, R.S. Pharma Link is Nepal's bridge between global pharmaceutical manufacturers and local healthcare providers. We distribute quality-assured medicines with precision, speed, and care.
            </p>
          </SectionTransition>
        </div>
      </section>

      {/* Door + Mission */}
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={doorRef} style={{ height: "500px" }}>
              <Suspense fallback={<Fallback3D label="Door Reveal" height="500px" />}>
                <DoorReveal triggered={triggered} />
              </Suspense>
            </div>
            <SectionTransition stagger>
              <p className="font-mono-label mb-4" style={{ color: "var(--color-medical)" }}>— OUR MISSION</p>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: "1.5rem" }}>
                Making Quality Medicine{" "}
                <span style={{ color: "var(--color-accent)" }}>Accessible to All</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
                We believe every patient in Nepal deserves access to genuine, quality-assured medicines. Our distribution network ensures that pharmacies across the Kathmandu Valley — from Thamel to Bhaktapur — receive their orders on time, every time.
              </p>
              <ul className="space-y-3">
                {teamValues.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <CheckCircle size={16} style={{ color: "var(--color-medical)", marginTop: 2, flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}>{v}</span>
                  </li>
                ))}
              </ul>
            </SectionTransition>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad" style={{ background: "var(--color-dark)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <SectionTransition className="text-center mb-16">
            <p className="font-mono-label mb-4" style={{ color: "var(--color-medical)" }}>— OUR JOURNEY</p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Milestones That Define Us
            </h2>
          </SectionTransition>
          <SectionTransition stagger className="relative">
            {/* Vertical line */}
            <div className="absolute left-[71px] top-0 bottom-0 w-px hidden md:block" style={{ background: "rgba(232,201,122,0.15)" }} />
            <div className="space-y-8">
              {milestones.map(({ year, event }) => (
                <div key={year} className="flex items-start gap-6">
                  <div className="flex-shrink-0 text-right" style={{ width: "56px" }}>
                    <span className="font-mono-label" style={{ color: "var(--color-accent)", fontSize: "0.75rem" }}>{year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full mt-0.5 hidden md:block" style={{ background: "var(--color-medical)", boxShadow: "0 0 8px var(--color-medical)" }} />
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "rgba(244,241,235,0.65)", fontFamily: "var(--font-body)" }}>{event}</p>
                </div>
              ))}
            </div>
          </SectionTransition>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad text-center" style={{ background: "var(--color-bg)" }}>
        <SectionTransition>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", marginBottom: "1.5rem" }}>
            Ready to Partner With Us?
          </h2>
          <Link href="/contact" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
            Get in Touch <ArrowRight size={15} />
          </Link>
        </SectionTransition>
      </section>
    </>
  );
}
