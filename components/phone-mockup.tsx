import Image from "next/image";
import { appScreens, type AppScreen } from "@/lib/site";

/** Phone frame showing a real screenshot of the RestoreHealth app. */
export function PhoneMockup({
  screen,
  className = "",
  width = "w-68",
  preload = false,
}: {
  screen: AppScreen;
  className?: string;
  /** Tailwind width classes, e.g. "w-48 sm:w-64". */
  width?: string;
  preload?: boolean;
}) {
  const s = appScreens[screen];
  return (
    <div
      className={`relative shrink-0 rounded-[2.6rem] bg-forest-deep p-2.5 shadow-l3 ring-1 ring-white/10 ${width} ${className}`}
    >
      <div className="relative aspect-9/20 overflow-hidden rounded-[2.1rem] bg-white">
        <Image
          src={s.src}
          alt={s.alt}
          fill
          preload={preload}
          sizes="272px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
