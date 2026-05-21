"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

function ParticleField() {
  // Use stable positions — no Math.random() on render (causes hydration mismatch)
  const particles = [
    { w: 3, h: 3, l: 8,  t: 15, c: 0, d: 0    },
    { w: 2, h: 2, l: 18, t: 72, c: 1, d: 1.2  },
    { w: 4, h: 4, l: 27, t: 38, c: 0, d: 0.5  },
    { w: 2, h: 2, l: 35, t: 85, c: 1, d: 2.1  },
    { w: 3, h: 3, l: 45, t: 22, c: 0, d: 0.8  },
    { w: 2, h: 2, l: 52, t: 60, c: 1, d: 3.0  },
    { w: 4, h: 4, l: 62, t: 10, c: 0, d: 1.5  },
    { w: 2, h: 2, l: 71, t: 78, c: 1, d: 0.3  },
    { w: 3, h: 3, l: 80, t: 42, c: 0, d: 2.6  },
    { w: 2, h: 2, l: 90, t: 88, c: 1, d: 1.0  },
    { w: 3, h: 3, l: 15, t: 55, c: 1, d: 3.5  },
    { w: 2, h: 2, l: 93, t: 30, c: 0, d: 0.7  },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.w, height: p.h,
            left: `${p.l}%`, top: `${p.t}%`,
            background: p.c === 0 ? "var(--color-accent)" : "var(--color-medical)",
            opacity: 0.2,
            animation: `float-cta ${5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${p.d}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float-cta {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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

      {/* Central glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(46,196,182,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Content — explicitly centered with no stagger wrapper */}
      <motion.div
        className="relative z-10 mx-auto px-6"
        style={{ maxWidth: "720px", textAlign: "center" }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-space-mono)",
            color: "var(--color-medical)",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "1.25rem",
          }}
        >
          — Become a Partner
        </motion.p>

        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-dm-serif)",
            color: "var(--color-bg)",
            fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          Ready to Elevate Your{" "}
          <span style={{ color: "var(--color-accent)" }}>
            Pharmaceutical Supply?
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-jakarta)",
            color: "rgba(244,241,235,0.58)",
            fontSize: "1rem",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Join 200+ pharmacies and healthcare institutions across Nepal that trust
          R.S. Pharma Link for reliable, quality-assured pharmaceutical distribution.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}
        >
          <Link
            href="/contact"
            className="btn-pill btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            data-cursor="hover"
          >
            Get in Touch <ArrowRight size={15} />
          </Link>
          <Link
            href="/products"
            className="btn-pill btn-outline"
            data-cursor="hover"
          >
            View Products
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
