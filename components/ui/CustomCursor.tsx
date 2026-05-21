"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const trailEl = trailRef.current;
    if (!cursor || !trailEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === "A" ||
        t.tagName === "BUTTON" ||
        t.dataset.cursor === "hover" ||
        t.closest("[data-cursor='hover']") ||
        t.closest("a") ||
        t.closest("button")
      ) {
        isHovering.current = true;
        cursor.classList.add("cursor-hover");
      }
    };

    const onLeave = () => {
      isHovering.current = false;
      cursor.classList.remove("cursor-hover");
    };

    let rafId: number;
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.12;
      trail.current.y += (pos.current.y - trail.current.y) * 0.12;
      trailEl.style.transform = `translate(${trail.current.x - 20}px, ${trail.current.y - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-pill {
          position: fixed;
          top: 0; left: 0;
          width: 16px; height: 24px;
          border-radius: 9999px;
          background: var(--color-accent);
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
        }
        .cursor-pill.cursor-hover {
          width: 36px;
          height: 36px;
          background: var(--color-medical);
        }
        .cursor-trail {
          position: fixed;
          top: 0; left: 0;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,196,182,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 99998;
          transition: opacity 0.3s ease;
        }
        @media (pointer: coarse) {
          .cursor-pill, .cursor-trail { display: none; }
        }
      `}</style>
      <div ref={trailRef} className="cursor-trail" />
      <div ref={cursorRef} className="cursor-pill" />
    </>
  );
}
