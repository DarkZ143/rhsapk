"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Icon } from "./icon";
import { Logo } from "./logo";
import { DownloadApkButton } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-porcelain/85 backdrop-blur-xl transition-all duration-300 ${
        scrolled || open ? "border-forest/6 shadow-l1" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-lg px-4 py-2 text-label-lg transition-colors ${
                isActive(item.href) ? "text-forest" : "text-muted hover:text-forest"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-mint" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <DownloadApkButton className="h-11! px-5!" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-lg text-forest hover:bg-forest/5 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-forest/6 bg-porcelain md:hidden"
        >
          <nav aria-label="Mobile" className="container-page flex flex-col gap-1 py-6">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-4 text-title-md ${
                  isActive(item.href)
                    ? "bg-white text-forest shadow-l1"
                    : "text-muted hover:bg-white/60"
                }`}
              >
                {item.label}
                <Icon name="chevronRight" className="size-5 text-outline" />
              </Link>
            ))}
            <DownloadApkButton size="lg" className="mt-6 w-full" label="Download the App" />
            <p className="mt-3 text-center text-body-sm text-muted">
              Free · Android APK
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
