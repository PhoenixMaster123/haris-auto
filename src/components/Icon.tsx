interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  /** filled variant */
  fill?: boolean;
}

/** Thin wrapper over Material Symbols ligature icons. */
export function Icon({ name, size = 24, className, style, fill }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined${className ? " " + className : ""}`}
      aria-hidden="true"
      style={{
        fontSize: typeof size === "number" ? `${size}px` : size,
        fontVariationSettings: fill
          ? '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24'
          : undefined,
        ...style,
      }}
    >
      {name}
    </span>
  );
}
