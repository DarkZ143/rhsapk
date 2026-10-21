import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { apk } from "@/lib/site";
import { Icon, type IconName } from "./icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-label-lg transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

export const buttonStyles = {
  vital: `${base} h-12 px-6 bg-mint text-forest font-bold shadow-[0_6px_20px_-6px_rgba(13,206,145,0.7)] hover:bg-[#12dd9d] hover:shadow-[0_10px_28px_-6px_rgba(13,206,145,0.8)]`,
  primary: `${base} h-12 px-6 bg-forest text-white hover:bg-herbal`,
  outline: `${base} h-12 px-6 border-[1.5px] border-forest text-forest hover:bg-forest/4`,
  outlineLight: `${base} h-12 px-6 border-[1.5px] border-white/40 text-white hover:bg-white/10 hover:border-white/70`,
  ghost: `${base} px-4 py-2 text-forest underline-offset-4 hover:underline`,
} as const;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return <Link className={`${buttonStyles[variant]} ${className}`} {...props} />;
}

/** Plain anchor (not <Link>) so the browser follows the redirect to the APK file. */
export function DownloadApkButton({
  variant = "vital",
  className = "",
  label = "Download APK",
  size = "md",
}: {
  variant?: keyof typeof buttonStyles;
  className?: string;
  label?: string;
  size?: "md" | "lg";
}) {
  return (
    <a
      href={apk.href}
      className={`${buttonStyles[variant]} ${size === "lg" ? "h-14 px-7 text-[15px]" : ""} ${className}`}
    >
      <Icon name="download" className="size-[18px]" />
      {label}
    </a>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-label-caps ${tone === "dark" ? "text-mint" : "text-mint-strong"}`}
    >
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={`flex max-w-2xl flex-col gap-4 ${align === "center" ? "mx-auto items-center text-center" : ""}`}
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`text-headline-xl text-balance ${tone === "dark" ? "text-white" : "text-forest"}`}>
        {title}
      </h2>
      {intro && (
        <p className={`text-body-lg ${tone === "dark" ? "text-teal-fixed-dim" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function StatusPill({
  children,
  tone = "mint",
}: {
  children: ReactNode;
  tone?: "mint" | "gold" | "glass";
}) {
  const tones = {
    mint: "bg-mint/15 text-forest",
    gold: "bg-gold/12 text-gold-ink",
    glass: "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur",
  };
  return (
    <span
      className={`inline-flex h-7 items-center gap-2 rounded-full px-3 text-label-md ${tones[tone]}`}
    >
      {tone !== "gold" && <span className="size-1.5 rounded-full bg-mint animate-pulse-dot" />}
      {children}
    </span>
  );
}

export function IconBadge({
  name,
  tone = "mint",
  className = "",
}: {
  name: IconName;
  tone?: "mint" | "forest" | "herbal" | "gold";
  className?: string;
}) {
  const tones = {
    mint: "bg-mint/15 text-mint-strong",
    forest: "bg-forest text-mint",
    herbal: "bg-herbal-fixed/60 text-herbal",
    gold: "bg-gold/12 text-gold-ink",
  };
  return (
    <span
      className={`inline-flex size-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]} ${className}`}
    >
      <Icon name={name} className="size-6" />
    </span>
  );
}

export function Card({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-forest/6 bg-white p-4 shadow-l1 sm:p-6 ${interactive ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:shadow-l2" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-label-md text-teal-fixed-dim">
      <Link href="/" className="hover:text-white">
        Home
      </Link>
      <Icon name="chevronRight" className="size-3.5" />
      <span className="text-white" aria-current="page">
        {current}
      </span>
    </nav>
  );
}
