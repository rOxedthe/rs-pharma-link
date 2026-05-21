"use client";

import { useRef, useState, ReactNode, CSSProperties } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Tilt intensity in degrees (default 14) */
  intensity?: number;
  /** Spotlight colour (default gold) */
  spotColor?: string;
}

export default function TiltCard({
  children,
  className = "",
  style,
  intensity = 14,
  spotColor = "rgba(232,201,122,0.22)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0, scale: 1 });
  const [spot, setSpot] = useState({ x: 50, y: 50, visible: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rx = ((y / height) - 0.5) * -intensity * 2;
      const ry = ((x / width)  - 0.5) *  intensity * 2;
      setTilt({ rx, ry, scale: 1.04 });
      setSpot({ x: (x / width) * 100, y: (y / height) * 100, visible: true });
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    setTilt({ rx: 0, ry: 0, scale: 1 });
    setSpot(s => ({ ...s, visible: false }));
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
        transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.scale})`,
        transition: tilt.scale === 1
          ? "transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)"
          : "transform 0.12s ease",
        willChange: "transform",
        cursor: "default",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
    >
      {/* Cursor-tracking spotlight */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle 90px at ${spot.x}% ${spot.y}%, ${spotColor}, transparent 70%)`,
          opacity: spot.visible ? 1 : 0,
          transition: spot.visible ? "opacity 0.15s ease" : "opacity 0.45s ease",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "inherit",
        }}
      />
      {/* Content sits above spotlight */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
