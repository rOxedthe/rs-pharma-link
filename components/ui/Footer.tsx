"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Accent ruled line */}
      <div className="ruled-line" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="18" fill="var(--color-primary)" />
                <path d="M12 24V12h5a4 4 0 0 1 0 8H12" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 20l5 4" stroke="var(--color-medical)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div>
                <span style={{ fontFamily: "var(--font-display)", color: "var(--color-accent)", fontSize: "1rem", display: "block", lineHeight: 1.1 }}>
                  R.S. Pharma Link
                </span>
                <span className="font-mono-label" style={{ color: "var(--color-muted)", fontSize: "0.5rem" }}>
                  PVT. LTD.
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(244,241,235,0.55)", fontFamily: "var(--font-body)" }}>
              Nepal&apos;s trusted pharmaceutical distribution partner. Bridging manufacturers, pharmacies, and patients across Kathmandu Valley and beyond.
            </p>
            <p className="font-mono-label" style={{ color: "var(--color-medical)", fontSize: "0.6rem" }}>
              EST. KATHMANDU, NEPAL
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3 className="font-mono-label mb-6" style={{ color: "var(--color-accent)", fontSize: "0.65rem" }}>
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-200 hover:opacity-100"
                    style={{ color: "rgba(244,241,235,0.55)", fontFamily: "var(--font-body)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="font-mono-label mb-6" style={{ color: "var(--color-accent)", fontSize: "0.65rem" }}>
              CONTACT
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} style={{ color: "var(--color-medical)", marginTop: 2, flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(244,241,235,0.55)", fontFamily: "var(--font-body)" }}>
                  Golfutar, Kathmandu<br />Bagmati Province, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: "var(--color-medical)", flexShrink: 0 }} />
                <a href="tel:+97714XXXXXX" className="text-sm transition-colors" style={{ color: "rgba(244,241,235,0.55)", fontFamily: "var(--font-body)" }}>
                  +977 1 XXXXXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: "var(--color-medical)", flexShrink: 0 }} />
                <a href="mailto:info@rspharmalink.com" className="text-sm transition-colors" style={{ color: "rgba(244,241,235,0.55)", fontFamily: "var(--font-body)" }}>
                  info@rspharmalink.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="font-mono-label mb-3" style={{ color: "var(--color-accent)", fontSize: "0.6rem" }}>
                UPDATES & NEWSLETTER
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full text-sm outline-none focus:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(232,201,122,0.2)",
                    color: "var(--color-bg)",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="btn-pill btn-primary text-xs px-4 py-2"
                  data-cursor="hover"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "rgba(244,241,235,0.3)", fontFamily: "var(--font-body)" }}>
            © {new Date().getFullYear()} R.S. Pharma Link Pvt. Ltd. All rights reserved.
          </p>
          <p className="font-mono-label" style={{ color: "rgba(244,241,235,0.2)", fontSize: "0.55rem" }}>
            PHARMACEUTICAL DISTRIBUTOR · KATHMANDU, NEPAL
          </p>
        </div>
      </div>
    </footer>
  );
}
