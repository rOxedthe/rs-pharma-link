interface Fallback3DProps {
  label?: string;
  height?: string;
}

export default function Fallback3D({ label = "Interactive 3D", height = "100%" }: Fallback3DProps) {
  return (
    <div
      style={{
        width: "100%",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at center, rgba(13,61,58,0.25) 0%, transparent 70%)",
        borderRadius: "inherit",
      }}
      aria-label={label}
    >
      <div style={{ textAlign: "center", opacity: 0.5 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 12px" }}>
          <circle cx="24" cy="24" r="22" stroke="var(--color-medical)" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="8" fill="var(--color-medical)" opacity="0.4" />
          <line x1="24" y1="2" x2="24" y2="14" stroke="var(--color-medical)" strokeWidth="1.5" />
          <line x1="24" y1="34" x2="24" y2="46" stroke="var(--color-medical)" strokeWidth="1.5" />
          <line x1="2" y1="24" x2="14" y2="24" stroke="var(--color-medical)" strokeWidth="1.5" />
          <line x1="34" y1="24" x2="46" y2="24" stroke="var(--color-medical)" strokeWidth="1.5" />
        </svg>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {label}
        </p>
      </div>
    </div>
  );
}
