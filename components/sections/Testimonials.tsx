"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const PartnerOrbit = dynamic(() => import("@/components/3d/PartnerOrbit"), {
  ssr: false,
  loading: () => <Fallback3D label="Partner Orbit" height="100%" />,
});

const testimonials = [
  {
    quote: "R.S. Pharma Link has transformed our supply chain. Orders arrive on time, every time.",
    name: "Dr. Aarav Shrestha",
    role: "Pharmacist, Thamel",
    initial: "A",
  },
  {
    quote: "The quality of medicines and the professionalism of their team is unmatched in Kathmandu.",
    name: "Sita Rai",
    role: "Clinic Manager, Lalitpur",
    initial: "S",
  },
  {
    quote: "We switched from two other distributors. RS Pharma Link is simply in a different league.",
    name: "Binod Thapa",
    role: "Hospital Procurement, Bhaktapur",
    initial: "B",
  },
];

export default function Testimonials() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTransition className="text-center mb-16">
          <p className="font-mono-label mb-4" style={{ color: "var(--color-medical)" }}>
            — PARTNERS & TESTIMONIALS
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-bg)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}>
            Trusted by Healthcare{" "}
            <span style={{ color: "var(--color-accent)" }}>Across Nepal</span>
          </h2>
        </SectionTransition>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D orbit */}
          <div style={{ height: "400px" }}>
            <Suspense fallback={<Fallback3D label="Partner Orbit" height="400px" />}>
              <PartnerOrbit />
            </Suspense>
          </div>

          {/* Testimonial cards */}
          <SectionTransition stagger className="flex flex-col gap-5">
            {testimonials.map(({ quote, name, role, initial }) => (
              <div key={name} className="glass-card-dark p-6">
                <p
                  className="text-sm leading-relaxed mb-4 italic"
                  style={{ color: "rgba(244,241,235,0.75)", fontFamily: "var(--font-body)" }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--color-primary)" }}
                  >
                    <span
                      className="font-mono-label"
                      style={{ color: "var(--color-accent)", fontSize: "0.75rem" }}
                    >
                      {initial}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-accent)", fontFamily: "var(--font-body)" }}>
                      {name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </SectionTransition>
        </div>
      </div>
    </section>
  );
}
