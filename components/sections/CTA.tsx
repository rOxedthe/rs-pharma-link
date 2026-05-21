"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";

// Inline ambient particle canvas (no external 3D dep)
function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--color-accent)" : "var(--color-medical)",
            opacity: 0.15 + Math.random() * 0.25,
            animation: `float-particle ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(6px); }
          66% { transform: translateY(6px) translateX(-8px); }
        }
      `}</style>
    </div>
  );
}

export default function CTA() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      <ParticleField />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(46,196,182,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <SectionTransition stagger>
          <p className="font-mono-label mb-5" style={{ color: "var(--color-medical)" }}>
            — BECOME A PARTNER
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-bg)",
            fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
          }}>
            Ready to Elevate Your{" "}
            <span style={{ color: "var(--color-accent)" }}>Pharmaceutical Supply?</span>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(244,241,235,0.65)", fontFamily: "var(--font-body)" }}>
            Join 200+ pharmacies and healthcare institutions across Nepal that trust R.S. Pharma Link for reliable, quality-assured pharmaceutical distribution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-pill btn-primary flex items-center gap-2" data-cursor="hover">
              Get in Touch <ArrowRight size={15} />
            </Link>
            <Link href="/products" className="btn-pill btn-outline" data-cursor="hover">
              View Products
            </Link>
          </div>
        </SectionTransition>
      </div>
    </section>
  );
}
