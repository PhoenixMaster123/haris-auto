const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

/** Circle-and-waves mark from the Haris logo, used in the nav. */
export function Logo({ size = 42 }: { size?: number }) {
  return (
    <img
      src={asset("/logo/haris-mark.png")}
      width={size}
      height={size}
      alt=""
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}
