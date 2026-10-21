import type { ReactNode } from "react";
import { Icon } from "./icon";

export type FaqItem = { q: string; a: ReactNode };

/** Native <details> accordion: accessible and zero client JS. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-forest/8 border-y border-forest/8">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-title-md text-forest transition-colors hover:text-mint-strong [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-forest/5 transition-transform duration-300 group-open:rotate-180 group-open:bg-mint/20">
              <Icon name="chevronDown" className="size-4" />
            </span>
          </summary>
          <div className="mb-5 border-l-[3px] border-mint pl-5 text-body-md text-muted">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}
