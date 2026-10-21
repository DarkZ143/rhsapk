import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="Restore Health Services home"
    >
      <Image
        src="/logo.png"
        alt=""
        width={369}
        height={394}
        preload
        className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[17px] font-extrabold tracking-tight ${inverted ? "text-white" : "text-forest"}`}
        >
          Restore<span className="text-mint">Health</span>
        </span>
        <span
          className={`mt-1 text-[9.5px] font-bold uppercase tracking-[0.22em] ${inverted ? "text-teal-fixed-dim" : "text-muted"}`}
        >
          Services
        </span>
      </span>
    </Link>
  );
}
