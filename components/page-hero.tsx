import type { ReactNode } from "react";
import { Breadcrumb } from "./ui";

/** Dark banner used at the top of inner pages. */
export function PageHero({
  crumb,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumb: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-forest">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 size-105 rounded-full bg-mint/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-10%] size-130 rounded-full bg-herbal/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>
      <div className="container-page relative flex flex-col gap-6 py-16 lg:py-24">
        <Breadcrumb current={crumb} />
        <span className="text-label-caps text-mint">{eyebrow}</span>
        <h1 className="max-w-3xl text-display text-balance text-white animate-rise">{title}</h1>
        <p className="max-w-2xl text-body-lg text-teal-fixed-dim animate-rise [animation-delay:120ms]">
          {intro}
        </p>
        {children}
      </div>
    </section>
  );
}
