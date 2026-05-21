"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Search } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const ProductShelf = dynamic(() => import("@/components/3d/ProductShelf"), { ssr: false });

const categories = ["All", "Antibiotics", "Cardiovascular", "Vitamins", "Analgesics", "Dermatology", "Respiratory", "Diabetes"];

const products = [
  { name: "Amoxicillin 500mg", cat: "Antibiotics",     form: "Capsules", pack: "10×10",  brand: "Sun Pharma" },
  { name: "Atorvastatin 10mg", cat: "Cardiovascular",  form: "Tablets",  pack: "3×10",   brand: "Cipla" },
  { name: "Vitamin D3 1000IU", cat: "Vitamins",        form: "Softgels", pack: "1×30",   brand: "Nimbus" },
  { name: "Ibuprofen 400mg",   cat: "Analgesics",      form: "Tablets",  pack: "10×10",  brand: "AlphaRx" },
  { name: "Clotrimazole Cream",cat: "Dermatology",     form: "Cream",    pack: "30g",    brand: "ZenMed" },
  { name: "Salbutamol Inhaler",cat: "Respiratory",     form: "Inhaler",  pack: "200mcg", brand: "PharmaCo" },
  { name: "Metformin 500mg",   cat: "Diabetes",        form: "Tablets",  pack: "10×10",  brand: "Sun Pharma" },
  { name: "Ciprofloxacin 250", cat: "Antibiotics",     form: "Tablets",  pack: "10×10",  brand: "Cipla" },
  { name: "Amlodipine 5mg",    cat: "Cardiovascular",  form: "Tablets",  pack: "3×10",   brand: "Nimbus" },
  { name: "Vitamin B Complex", cat: "Vitamins",        form: "Tablets",  pack: "1×30",   brand: "AlphaRx" },
  { name: "Paracetamol 500mg", cat: "Analgesics",      form: "Tablets",  pack: "10×10",  brand: "ZenMed" },
  { name: "Betamethasone Cr.", cat: "Dermatology",     form: "Cream",    pack: "15g",    brand: "PharmaCo" },
];

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchCat = active === "All" || p.cat === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="section-pad" style={{ background: "var(--color-dark)", paddingTop: "10rem" }}>
        <div className="section-container">
          <SectionTransition stagger className="content-measure mx-auto lg:mx-0 text-center lg:text-left mb-16">
            <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>— PRODUCT CATALOG</p>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
              <span style={{ color: "var(--color-accent)" }}>1,500+ Products</span>{" "}
              Ready to Ship
            </h1>
            <p className="text-base mx-auto lg:mx-0" style={{ color: "rgba(244,241,235,0.6)", fontFamily: "var(--font-body)" }}>
              Browse our complete catalog of GMP-certified medicines. All products sourced directly from licensed manufacturers.
            </p>
          </SectionTransition>

          {/* 3D shelf */}
          <div className="scene-frame" style={{ marginBottom: "2rem", maxHeight: "380px" }}>
            <Suspense fallback={<Fallback3D label="Product Shelf" height="380px" />}>
              <ProductShelf />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          {/* Filters + search */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  data-cursor="hover"
                  className="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: active === cat ? "var(--color-primary)" : "transparent",
                    color: active === cat ? "var(--color-accent)" : "var(--color-muted)",
                    border: `1px solid ${active === cat ? "var(--color-primary)" : "rgba(107,122,114,0.3)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--color-muted)" }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-[220px] pl-9 pr-4 py-2 rounded-full text-sm outline-none"
                style={{
                  background: "rgba(13,61,58,0.07)",
                  border: "1px solid rgba(13,61,58,0.15)",
                  color: "var(--color-text)",
                  fontFamily: "var(--font-body)",
                }}
                aria-label="Search products"
              />
            </div>
          </div>

          {/* Product grid */}
          <div className="card-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <div
                key={p.name}
                className="glass-card p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ cursor: "default" }}
                data-cursor="hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-label" style={{ color: "var(--color-medical)", fontSize: "0.55rem" }}>{p.cat}</span>
                  <span className="font-mono-label" style={{ color: "var(--color-muted)", fontSize: "0.55rem" }}>{p.pack}</span>
                </div>
                <h3 className="font-semibold mb-1 text-sm" style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}>{p.name}</h3>
                <p className="text-xs mb-3" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>{p.form} · {p.brand}</p>
                <div className="ruled-line" style={{ opacity: 0.3, marginBottom: "0.75rem" }} />
                <button className="text-xs font-medium" style={{ color: "var(--color-accent)", fontFamily: "var(--font-body)" }} data-cursor="hover">
                  Enquire →
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center py-16 text-sm" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
              No products found. Try a different search or category.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
