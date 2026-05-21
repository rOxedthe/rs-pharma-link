"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { Package, Truck, ClipboardList, HeartPulse, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const SupplyChain = dynamic(() => import("@/components/3d/SupplyChain"), { ssr: false });

const services = [
  {
    icon: Package,
    title: "Pharmaceutical Distribution",
    desc: "End-to-end medicine distribution from licensed manufacturers to certified pharmacies and hospitals across Nepal. We handle everything from procurement to last-mile delivery.",
    features: ["1,500+ SKUs in stock", "Same-day dispatch", "Nationwide network"],
  },
  {
    icon: Truck,
    title: "Cold-Chain Logistics",
    desc: "Temperature-controlled delivery for biologicals, vaccines, insulin, and other sensitive pharmaceutical products requiring unbroken cold chain.",
    features: ["2–8°C refrigerated vans", "Real-time temperature logs", "WHO-compliant packing"],
  },
  {
    icon: ClipboardList,
    title: "Inventory Management",
    desc: "Automated stock tracking, expiry date monitoring, and demand forecasting tools for pharmacies and hospitals to eliminate stockouts and wastage.",
    features: ["Cloud-based dashboard", "Expiry alerts", "Automated reorder"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare Linkage",
    desc: "Connecting healthcare institutions directly with manufacturers for bulk procurement, tender supply, and institutional healthcare programs.",
    features: ["Direct manufacturer access", "Tender documentation", "Volume pricing"],
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Every product we distribute is verified for authenticity, batch integrity, and regulatory compliance before reaching our partners.",
    features: ["GMP-certified sources", "Batch verification", "Regulatory docs"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Detailed ordering history, consumption analytics, and market insights to help pharmacies optimize their product mix and margins.",
    features: ["Monthly reports", "Market trends", "Sales analytics"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad" style={{ background: "var(--color-dark)", paddingTop: "10rem" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionTransition stagger>
              <p className="font-mono-label mb-5" style={{ color: "var(--color-medical)" }}>— OUR SERVICES</p>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                The Complete{" "}
                <span style={{ color: "var(--color-accent)" }}>Pharma Supply</span>{" "}
                Solution
              </h1>
              <p className="text-base leading-relaxed" style={{ color: "rgba(244,241,235,0.6)", fontFamily: "var(--font-body)" }}>
                From procurement to patient — we manage every link in the pharmaceutical supply chain so you can focus on healthcare.
              </p>
            </SectionTransition>
            <div style={{ height: "420px" }}>
              <Suspense fallback={<Fallback3D label="Supply Chain" height="420px" />}>
                <SupplyChain />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionTransition className="text-center mb-16">
            <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              Everything You Need,{" "}
              <span style={{ color: "var(--color-accent)" }}>Under One Roof</span>
            </h2>
          </SectionTransition>
          <SectionTransition stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, desc, features }) => (
              <div key={title} className="glass-card p-6 group hover:-translate-y-2 transition-all duration-300" data-cursor="hover">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(13,61,58,0.1)" }}>
                  <Icon size={20} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3 className="font-semibold mb-3 text-base" style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>{desc}</p>
                <div className="ruled-line mb-4" style={{ opacity: 0.2 }} />
                <ul className="space-y-1.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs" style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}>
                      <span style={{ color: "var(--color-medical)" }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SectionTransition>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad text-center" style={{ background: "var(--color-dark)" }}>
        <SectionTransition>
          <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", marginBottom: "1.5rem" }}>
            Start Your Partnership Today
          </h2>
          <Link href="/contact" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
            Contact Us <ArrowRight size={15} />
          </Link>
        </SectionTransition>
      </section>
    </>
  );
}
