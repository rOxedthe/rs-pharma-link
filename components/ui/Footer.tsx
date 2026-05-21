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

      {/* Gold → teal gradient top line — clear visual break from CTA */}
      <div style={{
        height: "2px",
        background: "linear-gradient(90deg, transparent 0%, var(--color-accent) 35%, var(--color-medical) 65%, transparent 100%)",
      }} />

      {/* Faint watermark brand text */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-20px", right: "-20px",
        fontFamily: "var(--font-dm-serif)",
        fontSize: "clamp(80px, 12vw, 160px)",
        color: "rgba(255,255,255,0.018)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
        letterSpacing: "-0.04em",
      }}>
        Pharma Link
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8 relative z-10">

        {/* ── Top brand bar ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="var(--color-primary)" />
                <path d="M13 27V13h6a5 5 0 0 1 0 10H13" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 23l6 4" stroke="var(--color-medical)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-dm-serif)", color: "var(--color-accent)", fontSize: "1.4rem", lineHeight: 1 }}>
                R.S. Pharma Link
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.38)", fontSize: "0.85rem", maxWidth: 340, lineHeight: 1.6 }}>
              Nepal's trusted bridge between pharmaceutical manufacturers and healthcare providers — Golfutar, Kathmandu.
            </p>
          </div>

          {/* Newsletter — right side of top bar */}
          <div style={{ flexShrink: 0, minWidth: 280 }}>
            <p style={{ fontFamily: "var(--font-space-mono)", color: "var(--color-accent)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Stay Updated
            </p>
            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0.6rem 1rem", borderRadius: 10, background: "rgba(46,196,182,0.08)", border: "1px solid rgba(46,196,182,0.2)" }}>
                <span style={{ color: "var(--color-medical)" }}>✓</span>
                <span style={{ fontFamily: "var(--font-jakarta)", color: "var(--color-medical)", fontSize: "0.825rem" }}>You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} style={{ display: "flex", gap: 8 }}>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" required aria-label="Newsletter email"
                  style={{
                    flex: 1, padding: "0.6rem 0.875rem", borderRadius: 10,
                    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(244,241,235,0.75)", fontFamily: "var(--font-jakarta)", fontSize: "0.825rem", outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(46,196,182,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
                <button type="submit" data-cursor="hover" style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0.6rem 1rem", borderRadius: 10,
                  background: "var(--color-accent)", color: "var(--color-primary)",
                  fontFamily: "var(--font-jakarta)", fontWeight: 600, fontSize: "0.8rem",
                  border: "none", cursor: "pointer", whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                }}>
                  Subscribe <ArrowUpRight size={13} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Middle links + contact ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

          {/* Quick links */}
          <div className="col-span-2 md:col-span-1">
            <p style={{ fontFamily: "var(--font-space-mono)", color: "rgba(244,241,235,0.3)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Navigate
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} data-cursor="hover"
                  className="text-sm transition-colors duration-150 hover:text-white"
                  style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.42)", textDecoration: "none" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", color: "rgba(244,241,235,0.3)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Phone
            </p>
            <a href="tel:+97714000000" data-cursor="hover" style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.55)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <Phone size={13} style={{ color: "var(--color-medical)", flexShrink: 0 }} />
              +977 1 XXXXXXX
            </a>
          </div>

          {/* Email */}
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", color: "rgba(244,241,235,0.3)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Email
            </p>
            <a href="mailto:info@rspharmalink.com" data-cursor="hover" style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.55)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <Mail size={13} style={{ color: "var(--color-medical)", flexShrink: 0 }} />
              info@rspharmalink.com
            </a>
          </div>

          {/* Address */}
          <div>
            <p style={{ fontFamily: "var(--font-space-mono)", color: "rgba(244,241,235,0.3)", fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Office
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <MapPin size={13} style={{ color: "var(--color-medical)", flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.55)", fontSize: "0.875rem", lineHeight: 1.55 }}>
                Golfutar, Kathmandu<br />Bagmati Province, Nepal
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p style={{ fontFamily: "var(--font-jakarta)", color: "rgba(244,241,235,0.2)", fontSize: "0.775rem" }}>
            © {new Date().getFullYear()} R.S. Pharma Link Pvt. Ltd. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-space-mono)", color: "rgba(244,241,235,0.15)", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Pharmaceutical Distributor · Kathmandu, Nepal
          </p>
        </div>

      </div>
    </footer>
  );
}
