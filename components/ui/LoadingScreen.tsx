"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const start = Date.now();
    const min = 1500;

    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(intervalRef.current!);
          const elapsed = Date.now() - start;
          const remaining = Math.max(0, min - elapsed);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, remaining);
          return 100;
        }
        return next;
      });
    }, 120);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "var(--color-dark)" }}
        >
          {/* Capsule pill */}
          <div className="relative mb-10">
            <svg width="80" height="160" viewBox="0 0 80 160">
              {/* Capsule outline */}
              <rect
                x="4" y="4" width="72" height="152"
                rx="36" ry="36"
                fill="none"
                stroke="rgba(232,201,122,0.25)"
                strokeWidth="2"
              />
              {/* Fill — progress driven */}
              <clipPath id="pill-clip">
                <rect x="4" y="4" width="72" height="152" rx="36" ry="36" />
              </clipPath>
              <rect
                x="4"
                y={4 + 152 * (1 - progress / 100)}
                width="72"
                height={152 * (progress / 100)}
                fill="var(--color-medical)"
                clipPath="url(#pill-clip)"
                style={{ transition: "y 0.12s ease, height 0.12s ease" }}
              />
              {/* Shine */}
              <rect
                x="16" y="20" width="12" height="40"
                rx="6"
                fill="rgba(255,255,255,0.15)"
                clipPath="url(#pill-clip)"
              />
            </svg>
          </div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: progress > 20 ? 1 : 0, y: progress > 20 ? 0 : 16 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p
              className="font-mono-label text-xs mb-3"
              style={{ color: "var(--color-medical)" }}
            >
              PHARMACEUTICAL SOLUTIONS
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-accent)",
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                letterSpacing: "-0.02em",
              }}
            >
              R.S. Pharma Link
            </h1>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--color-muted)" }}
            >
              Pvt. Ltd. — Kathmandu, Nepal
            </p>
          </motion.div>

          {/* Progress bar */}
          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            style={{ width: "200px" }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{ height: "2px", background: "rgba(255,255,255,0.1)" }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "var(--color-accent)",
                  transition: "width 0.12s ease",
                  borderRadius: "9999px",
                }}
              />
            </div>
            <p
              className="text-center mt-2 font-mono-label"
              style={{ color: "var(--color-muted)", fontSize: "0.65rem" }}
            >
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
