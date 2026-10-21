import QRCode from "qrcode";

/** Renders a QR code as inline SVG at build time (no client JS). */
export function QrCode({
  value,
  className = "size-40",
  label,
}: {
  value: string;
  className?: string;
  label: string;
}) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const size = modules.size;
  let d = "";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (modules.get(r, c)) d += `M${c} ${r}h1v1h-1z`;
    }
  }
  return (
    <svg
      viewBox={`-2 -2 ${size + 4} ${size + 4}`}
      role="img"
      aria-label={label}
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x={-2} y={-2} width={size + 4} height={size + 4} fill="#fff" />
      <path d={d} fill="#092d28" />
    </svg>
  );
}
