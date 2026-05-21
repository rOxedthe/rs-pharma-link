"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer style={{ background: "#05100F", position: "relative", overflow: "hidden" }}>

      {/* Subtle background glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "300px",
        background: "radial-gradient(ellipse at bottom, rgba(13,61,58,0.5) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top separator — strong enough to clearly break from CTA */}
      <div style={{ height: "2px", background: "linear-gradient(to right, transparent 0%, var(--color-accent) 30%, var(--color-medical) 70%, transparent 100%)" }} />

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 relative z-10">

        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

          {/* Brand column — spans 4 */}
          <div className="md:col-span-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="var(--color-primary)" />
                <path d="M13 27V13h6a5 5 0 0 1 0 10H13" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 23l6 4" stroke="var(--color-medical)" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
              <div>
                <div style={{ fontFamily: "var(--font-dm-serif)", color: "var(--color-accent)", fontSize: "1.15rem", lineHeight: 1.1 }}>
                  R.S. Pharma Link
                </div>
                <div style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-muted)", fontSize: "0.52rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>
                  Pvt. Ltd.
                </div>
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.45)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: 280 }}>
              Nepal's bridge between pharmaceutical manufacturers and healthcare providers. Quality medicines, delivered with precision.
            </p>

            {/* Location chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(46,196,182,0.08)", border: "1px solid rgba(46,196,182,0.18)" }}>
              <MapPin size={11} style={{ color: "var(--color-medical)" }} />
              <span style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-medical)", fontSize: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Golfutar, Kathmandu
              </span>
            </div>
          </div>

          {/* Nav column — spans 2 */}
          <div className="md:col-span-2">
            <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-accent)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-1.5 transition-all duration-200"
                    style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.45)", fontSize: "0.875rem" }}
                    data-cursor="hover"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 group-hover:text-[var(--color-bg)]">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column — spans 3 */}
          <div className="md:col-span-3">
            <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-accent)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Contact
            </p>
            <ul className="space-y-4">
              <li>
                <a href="tel:+97714000000" className="flex items-start gap-3 group" data-cursor="hover">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(46,196,182,0.08)" }}>
                    <Phone size={12} style={{ color: "var(--color-medical)" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-muted)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Phone</p>
                    <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.6)", fontSize: "0.825rem" }}>+977 1 XXXXXXX</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@rspharmalink.com" className="flex items-start gap-3 group" data-cursor="hover">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(46,196,182,0.08)" }}>
                    <Mail size={12} style={{ color: "var(--color-medical)" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-muted)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Email</p>
                    <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.6)", fontSize: "0.825rem" }}>info@rspharmalink.com</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(46,196,182,0.08)" }}>
                  <MapPin size={12} style={{ color: "var(--color-medical)" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-muted)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>Office</p>
                  <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.6)", fontSize: "0.825rem", lineHeight: 1.5 }}>Golfutar, Kathmandu<br />Bagmati Province, Nepal</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter column — spans 3 */}
          <div className="md:col-span-3">
            <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-accent)", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              Stay Updated
            </p>
            <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.45)", fontSize: "0.825rem", lineHeight: 1.65, marginBottom: "1.25rem" }}>
              Receive product updates, regulatory news, and pharma insights directly to your inbox.
            </p>

            {subscribed ? (
              <div className="rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: "rgba(46,196,182,0.1)", border: "1px solid rgba(46,196,182,0.2)" }}>
                <span style={{ color: "var(--color-medical)", fontSize: "0.85rem" }}>✓</span>
                <span style={{ fontFamily: "var(--font-jakarta)", color: "var(--color-medical)", fontSize: "0.825rem" }}>You're subscribed!</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                className="space-y-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email for newsletter"
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem",
                    borderRadius: "0.625rem",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(232,201,122,0.15)",
                    color: "rgba(244,241,235,0.8)",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.825rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(46,196,182,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(232,201,122,0.15)")}
                />
                <button
                  type="submit"
                  data-cursor="hover"
                  className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: "var(--color-accent)",
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Subscribe <ArrowUpRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "1.5rem" }} />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.22)", fontSize: "0.775rem" }}>
            © {new Date().getFullYear()} R.S. Pharma Link Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--color-medical)", opacity: 0.6 }} />
            <p style={{ fontFamily: "var(--font-space-mono)", color: "rgba(244,241,235,0.18)", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Pharmaceutical Distributor · Kathmandu, Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
