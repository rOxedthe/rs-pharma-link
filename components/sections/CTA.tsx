"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--color-primary)" }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(46,196,182,0.09) 0%, transparent 70%)",
      }} />

      {/* Static particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          [8,15],[27,38],[45,22],[62,10],[80,42],[93,30],
          [18,72],[35,85],[52,60],[71,78],[90,88],[15,55],
        ].map(([l, t], i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: i % 3 === 0 ? 4 : 2,
            height: i % 3 === 0 ? 4 : 2,
            left: `${l}%`, top: `${t}%`,
            background: i % 2 === 0 ? "var(--color-accent)" : "var(--color-medical)",
            opacity: 0.18,
            animation: `ctaFloat ${5 + i * 0.35}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}
        <style>{`@keyframes ctaFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      </div>

      {/* Content — every element gets text-center explicitly */}
      <div className="relative z-10 section-container section-header">
        <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>
          — BECOME A PARTNER
        </p>

        <h2 className="text-center" style={{
          fontFamily: "var(--font-dm-serif)",
          color: "var(--color-bg)",
          fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
          lineHeight: 1.1,
          marginBottom: "1.25rem",
        }}>
          Ready to Elevate Your{" "}
          <span style={{ color: "var(--color-accent)" }}>
            Pharmaceutical Supply?
          </span>
        </h2>

        <p className="text-center" style={{
          fontFamily: "var(--font-jakarta)",
          color: "rgba(244,241,235,0.58)",
          fontSize: "1rem",
          lineHeight: 1.75,
          marginBottom: "2.5rem",
        }}>
          Join 200+ pharmacies and healthcare institutions across Nepal that trust
          R.S. Pharma Link for reliable, quality-assured pharmaceutical distribution.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
            Get in Touch <ArrowRight size={15} />
          </Link>
          <Link href="/products" className="btn-pill btn-outline" data-cursor="hover">
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}
