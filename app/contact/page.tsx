"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import SectionTransition from "@/components/ui/SectionTransition";
import Fallback3D from "@/components/3d/Fallback3D";

const MapPinScene = dynamic(() => import("@/components/3d/MapPin"), { ssr: false });

const contactInfo = [
  { icon: MapPin, label: "Address", value: "Golfutar, Kathmandu, Bagmati Province, Nepal" },
  { icon: Phone, label: "Phone", value: "+977 1 XXXXXXX", href: "tel:+97714000000" },
  { icon: Mail, label: "Email", value: "info@rspharmalink.com", href: "mailto:info@rspharmalink.com" },
  { icon: Clock, label: "Hours", value: "Sun–Fri: 9:00AM – 6:00PM" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", org: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="section-pad" style={{ background: "var(--color-dark)", paddingTop: "10rem" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionTransition stagger className="content-measure mx-auto text-center lg:text-left">
              <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>— GET IN TOUCH</p>
              <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-bg)", fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", lineHeight: 1.08, marginBottom: "1.5rem" }}>
                Let&apos;s Build Nepal&apos;s{" "}
                <span style={{ color: "var(--color-accent)" }}>Healthcare Future</span>{" "}
                Together
              </h1>
              <p className="text-base leading-relaxed mx-auto lg:mx-0" style={{ color: "rgba(244,241,235,0.6)", fontFamily: "var(--font-body)" }}>
                Whether you&apos;re a pharmacy looking for a reliable distributor, a hospital managing procurement, or a manufacturer seeking a partner — we&apos;d love to connect.
              </p>
            </SectionTransition>
            {/* 3D Map */}
            <div className="scene-frame">
              <Suspense fallback={<Fallback3D label="Kathmandu Map" height="420px" />}>
                <MapPinScene />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="section-pad" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <SectionTransition stagger className="content-measure mx-auto text-center lg:text-left">
              <p className="font-mono-label section-kicker" style={{ color: "var(--color-medical)" }}>— FIND US</p>
              <h2 style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginBottom: "2rem" }}>
                Visit Our Office in{" "}
                <span style={{ color: "var(--color-accent)" }}>Golfutar</span>
              </h2>
              <div className="space-y-5 text-left">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(13,61,58,0.08)" }}>
                      <Icon size={18} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <div>
                      <p className="font-mono-label mb-0.5" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium hover:underline" style={{ color: "var(--color-primary)", fontFamily: "var(--font-body)" }}>{value}</a>
                      ) : (
                        <p className="text-sm" style={{ color: "var(--color-text)", fontFamily: "var(--font-body)" }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SectionTransition>

            {/* Form */}
            <SectionTransition>
              {sent ? (
                <div className="glass-card p-10 text-center h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(46,196,182,0.12)" }}>
                    <Send size={24} style={{ color: "var(--color-medical)" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-primary)", fontSize: "1.4rem" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "var(--color-muted)", fontFamily: "var(--font-body)" }}>
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                  <p className="font-mono-label mb-2" style={{ color: "var(--color-medical)", fontSize: "0.65rem" }}>— SEND A MESSAGE</p>
                  {[
                    { key: "name",    label: "Your Name",         type: "text",  required: true },
                    { key: "org",     label: "Organisation",      type: "text",  required: false },
                    { key: "email",   label: "Email Address",     type: "email", required: true },
                    { key: "phone",   label: "Phone Number",      type: "tel",   required: false },
                  ].map(({ key, label, type, required }) => (
                    <div key={key}>
                      <label className="block font-mono-label mb-1.5" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>
                        {label}{required && " *"}
                      </label>
                      <input
                        type={type}
                        required={required}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          background: "rgba(13,61,58,0.05)",
                          border: "1px solid rgba(13,61,58,0.15)",
                          color: "var(--color-text)",
                          fontFamily: "var(--font-body)",
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-mono-label mb-1.5" style={{ color: "var(--color-muted)", fontSize: "0.6rem" }}>MESSAGE *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{
                        background: "rgba(13,61,58,0.05)",
                        border: "1px solid rgba(13,61,58,0.15)",
                        color: "var(--color-text)",
                        fontFamily: "var(--font-body)",
                      }}
                    />
                  </div>
                  <button type="submit" className="btn-pill btn-primary w-full justify-center flex items-center gap-2" data-cursor="hover">
                    Send Message <Send size={15} />
                  </button>
                </form>
              )}
            </SectionTransition>
          </div>
        </div>
      </section>
    </>
  );
}
