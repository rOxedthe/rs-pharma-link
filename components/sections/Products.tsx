"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, HeartPulse, Pill, ShieldCheck, Thermometer } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";
import TiltCard from "@/components/ui/TiltCard";

const ProductShelf = dynamic(() => import("@/components/3d/ProductShelf"), {
  ssr: false,
  loading: () => <Fallback3D label="Product Shelf" height="100%" />,
});

const categories = [
  { icon: Pill, label: "Essential Medicines", detail: "Antibiotics, analgesics, vitamins" },
  { icon: HeartPulse, label: "Chronic Care", detail: "Cardio, diabetes, respiratory" },
  { icon: Thermometer, label: "Cold-Chain Products", detail: "Sensitive stock with controlled handling" },
  { icon: ShieldCheck, label: "Verified Batches", detail: "Authenticity and expiry checks" },
];

export default function Products() {
  return (
    <section
      className="section-pad relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="section-container">
        <SectionTransition className="section-header mb-12">
          <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>
            — PRODUCT CATALOG
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}>
            Over <span style={{ color: "var(--color-accent)" }}>1,500 Products</span> In Stock
          </h2>
          <p className="mt-4 text-sm mx-auto" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)", maxWidth: "32rem" }}>
            Hover over a category to explore. Click to browse full catalog.
          </p>
        </SectionTransition>

        {/* 3D Shelf */}
        <div className="scene-frame" style={{ marginBottom: "3rem" }}>
          <Suspense fallback={<Fallback3D label="Product Shelf" height="420px" />}>
            <ProductShelf />
          </Suspense>
        </div>

        <SectionTransition stagger className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {categories.map(({ icon: Icon, label, detail }) => (
            <TiltCard key={label} className="glass-card p-5 text-left">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(13,61,58,0.09)" }}>
                <Icon size={18} style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}>
                {label}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
                {detail}
              </p>
            </TiltCard>
          ))}
        </SectionTransition>

        <div className="text-center">
          <Link href="/products" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
            Full Product Catalog <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
