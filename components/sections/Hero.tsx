"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft } from "@/lib/motion";
import Fallback3D from "@/components/3d/Fallback3D";

const HeroDNA = dynamic(() => import("@/components/3d/HeroDNA"), {
  ssr: false,
  loading: () => <Fallback3D label="Loading DNA Scene" height="100%" />,
});

const badges = [
  { icon: Shield, label: "GMP Certified" },
  { icon: Truck, label: "Same-Day Dispatch" },
  { icon: Award, label: "ISO Standards" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Background grain texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3D Scene — right side */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] opacity-100 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
        <Suspense fallback={<Fallback3D label="DNA Helix" />}>
          <HeroDNA />
        </Suspense>
      </div>

      {/* Mobile overlay so text is readable */}
      <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to right, var(--color-dark) 50%, transparent)" }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Tag */}
            <motion.p variants={fadeUp} className="font-mono-label mb-6" style={{ color: "var(--color-medical)" }}>
              — PHARMACEUTICAL DISTRIBUTION · KATHMANDU, NEPAL
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bg)",
                fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)",
                lineHeight: 1.08,
                marginBottom: "1.5rem",
              }}
            >
              Nepal&apos;s Most{" "}
              <span style={{ color: "var(--color-accent)" }}>Trusted</span>{" "}
              Pharma Partner
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-lg leading-relaxed mb-10"
              style={{ color: "rgba(244,241,235,0.65)", fontFamily: "var(--font-body)", maxWidth: 460 }}
            >
              Connecting manufacturers, pharmacies, and healthcare institutions across the Kathmandu Valley with precision, speed, and care.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
              <Link href="/products" className="btn-pill btn-primary flex items-center gap-2" data-cursor="hover">
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-pill btn-outline" data-cursor="hover">
                Our Story
              </Link>
            </motion.div>

            {/* Badges */}
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-4">
              {badges.map(({ icon: Icon, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(244,241,235,0.05)",
                    border: "1px solid rgba(232,201,122,0.18)",
                  }}
                >
                  <Icon size={14} style={{ color: "var(--color-accent)" }} />
                  <span className="text-xs font-medium" style={{ color: "rgba(244,241,235,0.75)", fontFamily: "var(--font-body)" }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
        <span className="font-mono-label" style={{ color: "rgba(244,241,235,0.3)", fontSize: "0.6rem" }}>SCROLL</span>
        <div className="w-px h-10 rounded-full overflow-hidden" style={{ background: "rgba(244,241,235,0.1)" }}>
          <motion.div
            className="w-full rounded-full"
            style={{ height: "40%", background: "var(--color-accent)" }}
            animate={{ y: ["-100%", "250%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
