import Image from "next/image";

// Grid cells in clockwise order around the centre (cell 4 holds the logo).
const ring = [0, 1, 2, 5, 8, 7, 6, 3];
const corners = new Set([0, 2, 6, 8]);

/** Blinking tile loader with the RestoreHealth logo in the centre. */
export function BrandLoader({ caption = true }: { caption?: boolean }) {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col items-center gap-6">
      <div className="brand-loader">
        {Array.from({ length: 9 }, (_, i) =>
          i === 4 ? (
            <span key={i} className="brand-loader__logo">
              <Image src="/logo.png" alt="" width={369} height={394} preload />
            </span>
          ) : (
            <span
              key={i}
              className={corners.has(i) ? "is-gold" : undefined}
              style={{ animationDelay: `${ring.indexOf(i) * 100}ms` }}
            />
          ),
        )}
      </div>
      {caption && (
        <p className="text-label-caps text-forest/70">Restore Health Services</p>
      )}
    </div>
  );
}
