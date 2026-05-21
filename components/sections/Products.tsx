"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const ProductShelf = dynamic(() => import("@/components/3d/ProductShelf"), {
  ssr: false,
  loading: () => <Fallback3D label="Product Shelf" height="100%" />,
});

export default function Products() {
  return (
    <section
      className="section-pad relative"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionTransition className="text-center mb-12">
          <p className="font-mono-label mb-4" style={{ color: "var(--color-medical)" }}>
            — PRODUCT CATALOG
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-primary)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}>
            Over <span style={{ color: "var(--color-accent)" }}>1,500 Products</span> In Stock
          </h2>
          <p className="mt-4 text-sm" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
            Hover over a category to explore. Click to browse full catalog.
          </p>
        </SectionTransition>

        {/* 3D Shelf */}
        <div style={{ height: "420px", marginBottom: "3rem" }}>
          <Suspense fallback={<Fallback3D label="Product Shelf" height="420px" />}>
            <ProductShelf />
          </Suspense>
        </div>

        <div className="text-center">
          <Link href="/products" className="btn-pill btn-primary inline-flex items-center gap-2" data-cursor="hover">
            Full Product Catalog <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
