import type { Metadata } from "next";
import Link from "next/link";
import { AppScreensGallery } from "@/components/app-screens-gallery";
import { Faq } from "@/components/faq";
import { Icon, type IconName } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { PhoneMockup } from "@/components/phone-mockup";
import { QrCode } from "@/components/qr-code";
import { Card, DownloadApkButton, IconBadge, SectionHeading, StatusPill } from "@/components/ui";
import { apk, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download the App",
  description:
    "Download the RestoreHealth Android app (APK) and follow our simple installation guide.",
};

const details: { icon: IconName; label: string; value: string }[] = [
  { icon: "sparkles", label: "Version", value: apk.version },
  { icon: "file", label: "File size", value: apk.size },
  { icon: "smartphone", label: "Requires", value: apk.minAndroid },
  { icon: "clock", label: "Updated", value: apk.updated },
];

const installSteps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "download",
    title: "Download the APK",
    body: "Tap the Download APK button on this page. The file will save to your phone's Downloads folder.",
  },
  {
    icon: "settings",
    title: "Allow the installation",
    body: "Open the file. If Android asks, tap Settings and turn on “Allow from this source” for your browser, then go back.",
  },
  {
    icon: "smartphone",
    title: "Install the app",
    body: "Tap Install and wait a few seconds. RestoreHealth will appear on your home screen.",
  },
  {
    icon: "user",
    title: "Open & sign up",
    body: "Launch RestoreHealth, create your account and start connecting with care.",
  },
];

const troubleshooting = [
  {
    q: "The download didn't start.",
    a: "Make sure you have a stable internet connection and enough storage space, then tap Download APK again. Some browsers show a confirmation bar at the bottom of the screen — tap “Download” there.",
  },
  {
    q: "I see “App not installed”.",
    a: "This usually happens if an older version is installed with a different signature, or the download was incomplete. Uninstall any older RestoreHealth app, download the APK again and retry.",
  },
  {
    q: "Android says the file might be harmful.",
    a: "Android shows this warning for every app installed outside the Play Store. Only install the APK downloaded from this official website. You can turn off “Allow from this source” again after installing.",
  },
  {
    q: "How do I update the app?",
    a: "Download the latest APK from this page and install it over the existing app. Your account stays the same.",
  },
  {
    q: "Is there an iPhone version?",
    a: "Not yet — the RestoreHealth app is currently available for Android only.",
  },
];

export default function DownloadPage() {
  const downloadUrl = `${site.url}${apk.href}`;

  return (
    <>
      <PageHero
        crumb="Download"
        eyebrow="RestoreHealth for Android"
        title={
          <>
            Get the app. <span className="text-mint">Restore better health.</span>
          </>
        }
        intro="Download the RestoreHealth Android app and bring consultations, diagnostics, wellness and support together in your pocket."
      >
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
          <DownloadApkButton size="lg" label={`Download APK · v${apk.version}`} />
          <StatusPill tone="glass">Free · {apk.size}</StatusPill>
        </div>
      </PageHero>

      {/* ---------- App details + QR ---------- */}
      <section className="container-page grid gap-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <Card className="grid grid-cols-2 gap-6 p-6! sm:grid-cols-4 sm:p-8!">
          {details.map((d) => (
            <div key={d.label} className="flex flex-col gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-mint/15 text-mint-strong">
                <Icon name={d.icon} className="size-5" />
              </span>
              <div>
                <p className="text-label-caps text-outline">{d.label}</p>
                <p className="mt-1 text-headline-sm text-forest">{d.value}</p>
              </div>
            </div>
          ))}
        </Card>
        <Card className="flex items-center gap-6 p-6! sm:p-8!">
          <QrCode
            value={downloadUrl}
            className="size-28 shrink-0 rounded-lg ring-1 ring-forest/10"
            label="QR code to download the RestoreHealth Android app"
          />
          <div>
            <p className="text-label-caps text-mint-strong">On a computer?</p>
            <p className="mt-1 text-title-md text-forest">Scan with your phone camera</p>
            <p className="mt-1 text-body-sm text-muted">
              The download starts directly on your Android phone.
            </p>
          </div>
        </Card>
      </section>

      {/* ---------- Screenshots ---------- */}
      <section className="container-page pb-20 lg:pb-28">
        <SectionHeading
          align="center"
          eyebrow="Inside the app"
          title="Take a look before you download."
          intro="Your health, your plan, your reports and every service — all in one app."
        />
        <div className="mt-12">
          <AppScreensGallery />
        </div>
      </section>

      {/* ---------- Install steps ---------- */}
      <section className="bg-surface-low py-20 lg:py-28">
        <div className="container-page grid items-start gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Installation guide"
              title="Install in four easy steps."
              intro="Because the app is installed directly from our website, Android asks for a one-time permission. Here's how it works."
            />
            <ol className="relative flex flex-col gap-4">
              <div aria-hidden className="absolute bottom-10 left-9.75 top-10 hidden w-px bg-mint/40 sm:block" />
              {installSteps.map((s, i) => (
                <li key={s.title} className="relative">
                  <Card className="flex gap-5">
                    <span className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-forest text-mint">
                      <Icon name={s.icon} className="size-6" />
                      <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-mint text-[10px] font-extrabold text-forest ring-2 ring-white">
                        {i + 1}
                      </span>
                    </span>
                    <div>
                      <h3 className="text-title-md text-forest">{s.title}</h3>
                      <p className="mt-1 text-body-md text-muted">{s.body}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ol>
            <DownloadApkButton className="w-fit" />
          </div>
          <div className="sticky top-28 hidden justify-center lg:flex">
            <div className="relative">
              <div aria-hidden className="absolute inset-0 -m-8 rounded-[3rem] bg-teal-fixed/70 blur-2xl" />
              <PhoneMockup screen="home" className="animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Safety ---------- */}
      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <IconBadge name="shield" tone="forest" />
            <h3 className="mt-5 text-title-md text-forest">Official source</h3>
            <p className="mt-2 text-body-sm text-muted">
              Always download the RestoreHealth APK from this website only. We never send APK files
              over unknown links.
            </p>
          </Card>
          <Card>
            <IconBadge name="lock" tone="mint" />
            <h3 className="mt-5 text-title-md text-forest">Private by design</h3>
            <p className="mt-2 text-body-sm text-muted">
              Your healthcare information deserves transparency, privacy and responsible handling.
            </p>
          </Card>
          <Card>
            <IconBadge name="headset" tone="gold" />
            <h3 className="mt-5 text-title-md text-forest">Help installing?</h3>
            <p className="mt-2 text-body-sm text-muted">
              Our team can walk you through it. Call{" "}
              <a href={`tel:${site.contacts[0].tel}`} className="font-semibold text-mint-strong">
                {site.contacts[0].phone}
              </a>{" "}
              or{" "}
              <Link href="/contact" className="font-semibold text-mint-strong underline underline-offset-4">
                contact us
              </Link>
              .
            </p>
          </Card>
        </div>
      </section>

      {/* ---------- Troubleshooting ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Troubleshooting"
            title="Having trouble installing?"
            intro="Quick fixes for the most common installation questions."
          />
          <Faq items={troubleshooting} />
        </div>
      </section>
    </>
  );
}
