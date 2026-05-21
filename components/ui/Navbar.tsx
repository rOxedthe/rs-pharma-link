"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { drawerVariants } from "@/lib/motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10,26,25,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(232,201,122,0.1)"
            : "1px solid transparent",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" data-cursor="hover">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="var(--color-primary)" />
              <path
                d="M12 24V12h5a4 4 0 0 1 0 8H12"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 20l5 4"
                stroke="var(--color-medical)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  color: scrolled ? "var(--color-accent)" : "var(--color-accent)",
                  fontSize: "1.1rem",
                  letterSpacing: 0,
                  display: "block",
                  lineHeight: 1.1,
                }}
              >
                R.S. Pharma Link
              </span>
              <span
                className="font-mono-label"
                style={{
                  color: "var(--color-muted)",
                  fontSize: "0.55rem",
                }}
              >
                PVT. LTD.
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    data-cursor="hover"
                    className="relative text-sm font-medium transition-colors duration-200 group"
                    style={{
                      color: active
                        ? "var(--color-accent)"
                        : "rgba(244,241,235,0.8)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {label}
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                      style={{
                        width: active ? "100%" : "0%",
                        background: "var(--color-accent)",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-pill btn-primary text-sm"
              data-cursor="hover"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg"
              style={{ color: "var(--color-accent)" }}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="hover"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.6)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 flex flex-col"
              style={{
                background: "var(--color-dark)",
                borderLeft: "1px solid rgba(232,201,122,0.15)",
              }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-accent)",
                    fontSize: "1rem",
                  }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  data-cursor="hover"
                  style={{ color: "var(--color-muted)" }}
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-1">
                {links.map(({ href, label }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={href}
                      className="block py-3 px-4 rounded-lg text-lg font-medium transition-colors"
                      style={{
                        fontFamily: "var(--font-display)",
                        color:
                          pathname === href
                            ? "var(--color-accent)"
                            : "rgba(244,241,235,0.75)",
                        background:
                          pathname === href
                            ? "rgba(232,201,122,0.08)"
                            : "transparent",
                      }}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-6">
                <Link
                  href="/contact"
                  className="btn-pill btn-primary w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
