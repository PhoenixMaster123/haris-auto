/** Compact "Х." monogram used in the nav and footer. */
export function Logo({ size = 42 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: "var(--ink)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--f-disp)",
        fontWeight: 800,
        fontSize: size * 0.55,
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}
    >
      Х<span style={{ color: "var(--acc)" }}>.</span>
    </span>
  );
}
