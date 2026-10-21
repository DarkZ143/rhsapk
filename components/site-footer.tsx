import Link from "next/link";
import { apk, site } from "@/lib/site";
import { Icon } from "./icon";
import { Logo } from "./logo";
import { DownloadApkButton } from "./ui";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-teal-fixed-dim">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 size-120 rounded-full bg-mint/10 blur-3xl"
      />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo inverted />
          <p className="max-w-sm text-body-sm leading-6">
            RestoreHealth makes healthcare simpler, more connected and easier to navigate —
            bringing essential healthcare experiences together in one place.
          </p>
          <DownloadApkButton className="w-fit" />
          <p className="text-label-md text-teal-fixed-dim/70">
            v{apk.version} · {apk.minAndroid}
          </p>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-label-caps text-white">Explore</h3>
          <ul className="mt-5 flex flex-col gap-3 text-body-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-mint">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-label-caps text-white">Services</h3>
          <ul className="mt-5 flex flex-col gap-3 text-body-sm">
            {["Doctor Consultation", "Diagnostics", "Wellness & Preventive Care", "Health Support"].map(
              (s) => (
                <li key={s}>
                  <Link href="/#services" className="transition-colors hover:text-mint">
                    {s}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-label-caps text-white">Get in touch</h3>
          <ul className="mt-5 flex flex-col gap-5 text-body-sm">
            {site.contacts.map((c) => (
              <li key={c.email} className="flex flex-col gap-2">
                <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2.5 break-all hover:text-mint">
                  <Icon name="mail" className="size-4 shrink-0 text-mint" />
                  {c.email}
                </a>
                <a href={`tel:${c.tel}`} className="inline-flex items-center gap-2.5 hover:text-mint">
                  <Icon name="phone" className="size-4 shrink-0 text-mint" />
                  {c.phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-label-md text-teal-fixed-dim/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. All rights reserved.</p>
          <p>Healthcare. Connected. Simplified.</p>
        </div>
      </div>
    </footer>
  );
}
