"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle2, Clock3, PackageCheck, Shield, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
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

const metrics = [
  { value: "1,500+", label: "Products ready to supply" },
  { value: "200+", label: "Pharmacy partners" },
  { value: "7", label: "Districts served" },
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

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,26,25,0.98) 0%, rgba(10,26,25,0.92) 38%, rgba(10,26,25,0.52) 68%, rgba(10,26,25,0.24) 100%)",
        }}
      />

      {/* 3D Scene - right side */}
      <div className="absolute right-0 top-16 bottom-0 w-full lg:w-[58%] opacity-35 lg:opacity-75 pointer-events-none lg:pointer-events-auto">
        <Suspense fallback={<Fallback3D label="DNA Helix" />}>
          <HeroDNA />
        </Suspense>
      </div>

      {/* Mobile overlay so text is readable */}
      <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(180deg, rgba(10,26,25,0.95) 0%, rgba(10,26,25,0.86) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 section-container pt-32 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_23rem] gap-12 items-end">
          <motion.div
            variants={staggerContainer}
            initial={false}
            animate="visible"
            className="content-measure mx-auto lg:mx-0 text-center lg:text-left"
          >
            {/* Tag */}
            <motion.p variants={fadeUp} className="font-mono-label mb-6" style={{ color: "var(--color-medical)" }}>
              PHARMACEUTICAL DISTRIBUTION · KATHMANDU, NEPAL
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-bg)",
                fontSize: "clamp(2.7rem, 6vw, 5.2rem)",
                lineHeight: 1.02,
                marginBottom: "1.5rem",
              }}
            >
              Reliable Medicine Supply for{" "}
              <span style={{ color: "var(--color-accent)" }}>Nepal&apos;s Pharmacies</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              style={{
                color: "rgba(244,241,235,0.62)",
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.8,
                maxWidth: 560,
                marginInline: "auto",
                marginBottom: "2.5rem",
              }}
            >
              R.S. Pharma Link helps pharmacies, clinics, and hospitals source
              quality-assured medicines with dependable dispatch, cold-chain
              handling, and direct manufacturer relationships.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-14">
              <Link href="/products" className="btn-pill btn-primary flex items-center gap-2" data-cursor="hover">
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-pill btn-outline" data-cursor="hover">
                Our Story
              </Link>
            </motion.div>

            {/* Badges */}
            <motion.div variants={staggerContainer} className="flex flex-wrap justify-center lg:justify-start gap-4">
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

            <motion.div
              variants={staggerContainer}
              className="card-grid grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8"
            >
              {metrics.map(({ value, label }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="glass-card-dark px-4 py-3 text-center lg:text-left"
                >
                  <p
                    style={{
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      fontSize: "clamp(1.2rem, 2vw, 1.55rem)",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-2 text-xs leading-snug"
                    style={{ color: "rgba(244,241,235,0.58)", fontFamily: "var(--font-body)" }}
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            initial={false}
            animate="visible"
            variants={staggerContainer}
            className="glass-card-dark hidden lg:block p-6"
            style={{ borderColor: "rgba(232,201,122,0.16)" }}
          >
            <motion.p variants={fadeUp} className="font-mono-label mb-5" style={{ color: "var(--color-accent)", fontSize: "0.62rem" }}>
              LIVE OPERATIONS SNAPSHOT
            </motion.p>
            {[
              { icon: PackageCheck, label: "Inventory", value: "Critical SKUs tracked daily" },
              { icon: Clock3, label: "Dispatch", value: "Kathmandu Valley priority routing" },
              { icon: CheckCircle2, label: "Quality", value: "Batch and expiry checks before handoff" },
            ].map(({ icon: Icon, label, value }) => (
              <motion.div key={label} variants={fadeUp} className="flex gap-3 py-4" style={{ borderTop: "1px solid rgba(244,241,235,0.08)" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(46,196,182,0.12)" }}>
                  <Icon size={18} style={{ color: "var(--color-medical)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-bg)", fontFamily: "var(--font-body)" }}>{label}</p>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: "rgba(244,241,235,0.55)", fontFamily: "var(--font-body)" }}>{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.aside>
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
