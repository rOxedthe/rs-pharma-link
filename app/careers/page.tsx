"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";

const CareersMolecule = dynamic(() => import("@/components/3d/CareersMolecule"), { ssr: false });

const openings = [
  {
    title: "Pharmaceutical Sales Executive",
    dept: "Sales",
    location: "Kathmandu",
    type: "Full-time",
    desc: "Drive pharmacy partnerships and expand our distribution network across the Kathmandu Valley.",
  },
  {
    title: "Logistics & Delivery Coordinator",
    dept: "Operations",
    location: "Kathmandu",
    type: "Full-time",
    desc: "Manage daily dispatch schedules, route optimization, and cold-chain compliance for all deliveries.",
  },
  {
    title: "Inventory & Procurement Officer",
    dept: "Supply Chain",
    location: "Kathmandu",
    type: "Full-time",
    desc: "Oversee stock levels, liaise with manufacturers, and ensure uninterrupted supply of all SKUs.",
  },
  {
    title: "Digital Marketing Specialist",
    dept: "Marketing",
    location: "Remote / Kathmandu",
    type: "Full-time",
    desc: "Lead our digital presence — SEO, social media, content strategy, and online partnership outreach.",
  },
];

const perks = [
  "Competitive salary + performance incentives",
  "Health insurance coverage",
  "Professional development budget",
  "Flexible working arrangements",
  "Modern Golfutar office environment",
  "Be part of Nepal's pharma growth story",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero with molecule background */}
      <section className="relative section-pad overflow-hidden" style={{ background: "var(--color-dark)", paddingTop: "10rem" }}>
        {/* 3D molecule background */}
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <Suspense fallback={null}>
            <CareersMolecule />
          </Suspense>
        </div>
        <div className="relative z-10 section-container">
          <SectionTransition stagger className="content-measure mx-auto lg:mx-0 text-center lg:text-left">
            <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>— CAREERS</p>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
              Build Nepal&apos;s{" "}
              <span style={{ color: "var(--color-accent)" }}>Healthcare Future</span>{" "}
              With Us
            </h1>
            <p className="text-base leading-relaxed mb-8 mx-auto lg:mx-0" style={{ color: "rgba(244,241,235,0.6)", fontFamily: "var(--font-body)" }}>
              We&apos;re a team of passionate professionals dedicated to making quality medicines accessible across Nepal. Join us and make a real difference in people&apos;s lives every day.
            </p>
            <a href="#openings" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
              See Open Roles <ArrowRight size={15} />
            </a>
          </SectionTransition>
        </div>
      </section>

      {/* Perks */}
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <SectionTransition className="section-header mb-14">
            <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>— WHY JOIN US</p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              A Place Where{" "}
              <span style={{ color: "var(--color-accent)" }}>Good Work</span>{" "}
              Matters
            </h2>
          </SectionTransition>
          <SectionTransition stagger className="card-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {perks.map((perk) => (
              <div key={perk} className="glass-card p-5 flex items-start gap-3">
                <span style={{ color: "var(--color-medical)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>✦</span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}>{perk}</p>
              </div>
            ))}
          </SectionTransition>
        </div>
      </section>

      {/* Openings */}
      <section id="openings" className="section-pad" style={{ background: "var(--color-dark)" }}>
        <div className="section-container" style={{ maxWidth: "64rem" }}>
          <SectionTransition className="section-header mb-14">
            <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>— OPEN POSITIONS</p>
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              Current Openings
            </h2>
          </SectionTransition>
          <SectionTransition stagger className="card-grid space-y-5">
            {openings.map(({ title, dept, location, type, desc }) => (
              <div
                key={title}
                className="glass-card-dark p-6 flex flex-col md:flex-row md:items-center gap-5 group hover:-translate-y-1 transition-all duration-300"
                data-cursor="hover"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="font-mono-label px-2 py-0.5 rounded" style={{ color: "var(--color-medical)", background: "rgba(46,196,182,0.1)", fontSize: "0.55rem" }}>{dept}</span>
                    <span className="font-mono-label px-2 py-0.5 rounded" style={{ color: "var(--color-accent)", background: "rgba(232,201,122,0.1)", fontSize: "0.55rem" }}>{type}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-1" style={{ color: "var(--color-bg)", fontFamily: "var(--font-body)" }}>{title}</h3>
                  <p className="text-xs leading-relaxed mb-2" style={{ color: "rgba(244,241,235,0.5)", fontFamily: "var(--font-body)" }}>{desc}</p>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} style={{ color: "var(--color-muted)" }} />
                    <span className="text-xs" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>{location}</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="btn-pill btn-outline text-xs px-5 py-2 flex-shrink-0"
                  data-cursor="hover"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </SectionTransition>
          <SectionTransition className="section-header mt-12">
            <p className="text-sm mb-4" style={{ color: "rgba(244,241,235,0.5)", fontFamily: "var(--font-body)" }}>
              Don&apos;t see a role that fits? Send us your CV anyway.
            </p>
            <Link href="/contact" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
              Open Application <ArrowRight size={15} />
            </Link>
          </SectionTransition>
        </div>
      </section>
    </>
  );
}
