import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Pharmaceutical Distributor Kathmandu | R.S. Pharma Link Pvt. Ltd.",
  description:
    "R.S. Pharma Link — Nepal's most trusted pharmaceutical distributor in Kathmandu. 1,500+ products, same-day dispatch, GMP-certified supply chain across the Kathmandu Valley.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Products />
      <Stats />
      <Testimonials />
      <CTA />
    </>
  );
}
