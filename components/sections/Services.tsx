"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Package, Truck, ClipboardList, HeartPulse } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const SupplyChain = dynamic(() => import("@/components/3d/SupplyChain"), {
  ssr: false,
  loading: () => <Fallback3D label="Supply Chain" height="100%" />,
});

const services = [
  {
    icon: Package,
    title: "Pharmaceutical Distribution",
    desc: "End-to-end medicine distribution from licensed manufacturers to certified pharmacies and hospitals across Nepal.",
  },
  {
    icon: Truck,
    title: "Cold-Chain Logistics",
    desc: "Temperature-controlled delivery for biologicals, vaccines, and sensitive pharmaceutical products.",
  },
  {
    icon: ClipboardList,
    title: "Inventory Management",
    desc: "Automated stock tracking, expiry monitoring, and demand forecasting for your pharmacy.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Linkage",
    desc: "Connecting healthcare institutions directly with manufacturers for bulk procurement and tender supply.",
  },
];

export default function Services() {
  return (
    <section
      className="section-pad relative"
      style={{ background: "var(--color-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <SectionTransition className="text-center mb-16">
          <p className="font-mono-label mb-4" style={{ color: "var(--color-medical)" }}>
            — OUR SERVICES
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-bg)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
            }}
          >
            The Complete{" "}
            <span style={{ color: "var(--color-accent)" }}>Supply Chain</span>{" "}
            Solution
          </h2>
        </SectionTransition>

        {/* 3D scene + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Supply chain */}
          <div style={{ height: "420px" }}>
            <Suspense fallback={<Fallback3D label="Supply Chain Network" height="420px" />}>
              <SupplyChain />
            </Suspense>
          </div>

          {/* Service cards */}
          <SectionTransition stagger className="grid grid-cols-1 gap-5">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-card-dark flex items-start gap-4 p-5 transition-all duration-300 hover:-translate-y-1"
                style={{ cursor: "default" }}
                data-cursor="hover"
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(46,196,182,0.12)" }}
                >
                  <Icon size={18} style={{ color: "var(--color-medical)" }} />
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold mb-1"
                    style={{ color: "var(--color-bg)", fontFamily: "var(--font-body)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(244,241,235,0.5)", fontFamily: "var(--font-body)" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </SectionTransition>
        </div>
      </div>
    </section>
  );
}
