"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;

      if (dotRef.current && lineRef.current) {
        const lineHeight = lineRef.current.offsetHeight;
        dotRef.current.style.top = `${pct * (lineHeight - 8)}px`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center"
      aria-hidden="true"
    >
      <div
        ref={lineRef}
        className="relative"
        style={{
          width: "1px",
          height: "120px",
          background: "rgba(232,201,122,0.2)",
        }}
      >
        <div
          ref={dotRef}
          className="absolute left-1/2 -translate-x-1/2 rounded-full transition-none"
          style={{
            width: "7px",
            height: "7px",
            background: "var(--color-accent)",
            boxShadow: "0 0 8px var(--color-accent)",
            top: 0,
          }}
        />
      </div>
    </div>
  );
}
