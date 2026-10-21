import { apk, site } from "@/lib/site";
import { Icon } from "./icon";
import { PhoneMockup } from "./phone-mockup";
import { QrCode } from "./qr-code";
import { ButtonLink, DownloadApkButton, StatusPill } from "./ui";

export function DownloadBand() {
  return (
    <section className="container-page py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 size-96 rounded-full bg-mint/25 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 size-96 rounded-full bg-herbal/50 blur-3xl" />
        </div>

        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6">
            <StatusPill tone="glass">Available now for Android</StatusPill>
            <h2 className="max-w-xl text-headline-xl text-balance text-white">
              Your healthcare journey, one tap away.
            </h2>
            <p className="max-w-lg text-body-lg text-teal-fixed-dim">
              Download the RestoreHealth app to discover care, arrange diagnostics and get
              support — all from your phone.
            </p>
            <div className="flex flex-wrap gap-3">
              <DownloadApkButton size="lg" />
              <ButtonLink href="/download" variant="outlineLight" className="h-14!">
                Installation guide
                <Icon name="arrowRight" className="size-4" />
              </ButtonLink>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-label-md text-teal-fixed-dim">
              <span>Version {apk.version}</span>
              <span>{apk.size}</span>
              <span>{apk.minAndroid}</span>
            </div>
          </div>

          <div className="relative hidden items-center gap-8 lg:flex">
            <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-l3">
              <QrCode
                value={`${site.url}${apk.href}`}
                className="size-32"
                label="QR code to download the RestoreHealth Android app"
              />
              <span className="flex items-center gap-1.5 text-label-md text-forest">
                <Icon name="qr" className="size-3.5" /> Scan to download
              </span>
            </div>
            <div className="-mb-40 rotate-3">
              <PhoneMockup screen="services" width="w-60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
