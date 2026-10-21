import Image from "next/image";
import Link from "next/link";
import { DownloadBand } from "@/components/download-band";
import { Faq } from "@/components/faq";
import { Icon, type IconName } from "@/components/icon";
import { PhoneMockup } from "@/components/phone-mockup";
import {
  ButtonLink,
  Card,
  DownloadApkButton,
  IconBadge,
  SectionHeading,
  StatusPill,
} from "@/components/ui";
import { apk, photos, unsplash } from "@/lib/site";

const services: { icon: IconName; title: string; body: string; photo: string; tag: string }[] = [
  {
    icon: "stethoscope",
    title: "Doctor Consultation",
    body: "Discover and connect with healthcare professionals for your consultation needs.",
    photo: photos.consultation,
    tag: "Consult",
  },
  {
    icon: "flask",
    title: "Diagnostics",
    body: "Access diagnostic services and manage your healthcare journey more conveniently.",
    photo: photos.labResearch,
    tag: "Tests & Reports",
  },
  {
    icon: "leaf",
    title: "Wellness & Preventive Care",
    body: "Take a proactive approach to your health with wellness and preventive healthcare services.",
    photo: photos.wellnessYoga,
    tag: "Prevent",
  },
  {
    icon: "lifebuoy",
    title: "Health Support",
    body: "Get support throughout your healthcare journey instead of navigating everything alone.",
    photo: photos.bloodPressure,
    tag: "Guidance",
  },
];

const steps: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "download",
    title: "Download the app",
    body: "Tap Download APK and install RestoreHealth on your Android phone in under a minute.",
  },
  {
    icon: "user",
    title: "Set up your profile",
    body: "Create your account and tell us what kind of care you or your family are looking for.",
  },
  {
    icon: "heart",
    title: "Connect with care",
    body: "Find professionals, arrange diagnostics and get support — all in one connected journey.",
  },
];

const specialists = [
  { specialty: "General Physician", badge: "Primary Care", focus: "Everyday health concerns", photo: photos.doctorTeal },
  { specialty: "Internal Medicine", badge: "Specialist", focus: "Chronic & long-term conditions", photo: photos.doctorGlasses },
  { specialty: "Gynecology", badge: "Women's Health", focus: "Care through every life stage", photo: photos.doctorOutdoor },
  { specialty: "Family Medicine", badge: "All Ages", focus: "Care for the whole family", photo: photos.doctorScrubs },
];

const appFeatures: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "trendUp",
    title: "Health at a glance",
    body: "Track your Health Score, steps, sleep and heart rate every day.",
  },
  {
    icon: "shield",
    title: "Your plan & benefits",
    body: "See your plan, family members and every benefit available to you.",
  },
  {
    icon: "file",
    title: "Smart report summaries",
    body: "Upload checkup reports and get an easy-to-read summary of key results.",
  },
  {
    icon: "stethoscope",
    title: "Your family doctor",
    body: "One doctor who knows you and your health — always.",
  },
  {
    icon: "calendar",
    title: "Book care in a tap",
    body: "Tele consultation, doctor & specialist visits, lab tests, scans and pharmacy.",
  },
  {
    icon: "users",
    title: "Care beyond yourself",
    body: "Extend your plan's benefits to your loved ones.",
  },
];

const values: { icon: IconName; title: string; body: string; tone: "mint" | "forest" | "herbal" | "gold" }[] = [
  { icon: "heart", title: "Patient First", body: "Every experience starts with understanding the person behind the healthcare need.", tone: "mint" },
  { icon: "shield", title: "Trust & Security", body: "Healthcare information deserves transparency, privacy and responsible handling.", tone: "forest" },
  { icon: "network", title: "Connected Care", body: "People, healthcare providers and services, brought together on one connected platform.", tone: "herbal" },
  { icon: "sparkles", title: "Better Experience", body: "Technology should make healthcare simpler, clearer and easier to access.", tone: "gold" },
];

const faqs = [
  {
    q: "How do I install the RestoreHealth APK?",
    a: (
      <>
        Tap <strong className="text-forest">Download APK</strong>, open the downloaded file and allow
        your browser to install apps when Android asks. Our{" "}
        <Link href="/download" className="font-semibold text-mint-strong underline underline-offset-4">
          step-by-step installation guide
        </Link>{" "}
        walks you through it.
      </>
    ),
  },
  {
    q: "Is the app free to download?",
    a: "Yes. Downloading and installing the RestoreHealth app is free.",
  },
  {
    q: "Which phones are supported?",
    a: `The app runs on Android phones (${apk.minAndroid}). An iOS version is not available yet.`,
  },
  {
    q: "Android shows a warning about unknown apps. Is it safe?",
    a: "Android shows this message for any app installed outside the Play Store. Only download the APK from this official website, and you can turn the permission off again after installing.",
  },
  {
    q: "How can I reach the RestoreHealth team?",
    a: (
      <>
        Call or email us any time from the{" "}
        <Link href="/contact" className="font-semibold text-mint-strong underline underline-offset-4">
          Contact page
        </Link>
        , or chat with us on WhatsApp.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 size-160 rounded-full bg-teal-fixed/60 blur-3xl" />
          <div className="absolute -left-40 top-1/2 size-105 rounded-full bg-mint/10 blur-3xl" />
        </div>

        <div className="container-page relative grid items-center gap-14 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-16">
          <div className="flex flex-col items-start gap-7">
            <StatusPill>Now available on Android</StatusPill>
            <h1 className="text-display text-balance text-forest animate-rise">
              Healthcare that puts <span className="relative whitespace-nowrap text-mint-strong">
                people first
                <svg aria-hidden viewBox="0 0 200 12" className="absolute -bottom-2 left-0 h-3 w-full text-mint" preserveAspectRatio="none">
                  <path d="M2 9c40-6 120-9 196-4" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>
            <p className="max-w-lg text-body-lg text-muted animate-rise [animation-delay:120ms]">
              RestoreHealth brings doctor consultations, diagnostics, wellness and health support
              together in one app — so you can discover, access and manage care with confidence.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row animate-rise [animation-delay:220ms]">
              <DownloadApkButton size="lg" label="Download APK — Free" />
              <ButtonLink href="#services" variant="outline" className="h-14! px-7!">
                Explore services
              </ButtonLink>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-label-md text-muted">
              {[`Version ${apk.version}`, apk.minAndroid, "Secure & private"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Icon name="check" className="size-4 text-mint-strong" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* visual */}
          <div className="relative mx-auto w-full max-w-140">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-l3 sm:aspect-5/5 lg:aspect-4/5">
              <Image
                src={unsplash(photos.doctorWithPhone, 1100)}
                alt="Doctor using a smartphone"
                fill
                preload
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-forest/60 via-forest/0 to-transparent" />
            </div>

            <div className="absolute -left-2 bottom-6 sm:-left-4 sm:bottom-8 lg:-left-14 xl:-left-20 animate-float">
              <PhoneMockup screen="home" preload className="origin-bottom-left scale-[0.6] sm:scale-[0.82]" />
            </div>

            <div className="absolute right-3 top-6 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-5 shadow-l2 backdrop-blur sm:-right-5 animate-float [animation-delay:1.5s]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-forest">
                <Icon name="stethoscope" className="size-5" />
              </span>
              <div>
                <p className="text-label-lg text-forest">Your Family Doctor</p>
                <p className="text-label-md font-medium text-muted">Knows you &amp; your health</p>
              </div>
            </div>

            <div className="absolute bottom-6 right-3 hidden items-center gap-3 rounded-2xl bg-forest/90 p-3 pr-5 text-white shadow-l2 backdrop-blur sm:-right-5 sm:flex animate-float [animation-delay:3s]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 text-mint">
                <Icon name="shield" className="size-5" />
              </span>
              <div>
                <p className="text-label-lg">Your data, protected</p>
                <p className="text-label-md font-medium text-teal-fixed-dim">Private by design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Service strip ---------- */}
      <section aria-label="What RestoreHealth connects" className="border-y border-forest/6 bg-white">
        <div className="container-page grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-mint/15 text-mint-strong">
                <Icon name={s.icon} className="size-5" />
              </span>
              <span className="text-label-lg text-forest">{s.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="container-page scroll-mt-24 py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we connect"
            title="Healthcare, all in one journey."
            intro="RestoreHealth is designed around your complete healthcare journey rather than isolated services."
          />
          <ButtonLink href="/about" variant="ghost" className="self-start px-0! lg:self-auto">
            Learn about us <Icon name="arrowRight" className="size-4" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-forest/6 bg-white shadow-l1 transition-all duration-300 hover:-translate-y-1 hover:border-mint/50 hover:shadow-l2"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={unsplash(s.photo, 700)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-label-md text-forest backdrop-blur">
                  {s.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                <IconBadge name={s.icon} className="relative z-10 -mt-12 size-14! border-4 border-white bg-mint! text-forest!" />
                <h3 className="text-headline-sm text-forest">{s.title}</h3>
                <p className="text-body-sm text-muted">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-surface-low py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From download to care in three simple steps."
          />
          <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
            <div aria-hidden className="absolute left-[16%] right-[16%] top-8 hidden h-px border-t-2 border-dashed border-mint/40 md:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex flex-col items-center text-center">
                <span className="relative flex size-16 items-center justify-center rounded-2xl bg-forest text-mint shadow-l2">
                  <Icon name={s.icon} className="size-7" />
                  <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-mint text-label-md font-extrabold text-forest ring-4 ring-surface-low">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-headline-sm text-forest">{s.title}</h3>
                <p className="mt-2 max-w-xs text-body-md text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex justify-center">
            <DownloadApkButton label="Get started — Download APK" />
          </div>
        </div>
      </section>

      {/* ---------- Specialists ---------- */}
      <section className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow="Care you can connect with"
          title="Healthcare professionals across specialties."
          intro="Use the app to discover and connect with professionals for your consultation needs."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialists.map((d) => (
            <Card key={d.specialty} interactive className="flex flex-col items-center text-center">
              <div className="relative">
                <Image
                  src={unsplash(d.photo, 320)}
                  alt=""
                  width={96}
                  height={96}
                  className="size-24 rounded-full object-cover ring-4 ring-teal-fixed"
                />
                <span className="absolute bottom-1 right-1 size-4 rounded-full bg-mint ring-[3px] ring-white" />
              </div>
              <span className="mt-5 rounded-full bg-gold/12 px-3 py-1 text-label-md text-gold-ink">
                {d.badge}
              </span>
              <h3 className="mt-3 text-headline-sm text-forest">{d.specialty}</h3>
              <p className="mt-1 text-body-sm text-muted">{d.focus}</p>
              <ButtonLink href="/download" variant="outline" className="mt-6 h-11! w-full">
                Consult via app
              </ButtonLink>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-label-md font-medium text-outline">
          Images are representative. Availability of specialties may vary.
        </p>
      </section>

      {/* ---------- App features ---------- */}
      <section className="relative overflow-hidden bg-forest py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint/15 blur-3xl" />
        </div>
        <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
          <div className="order-2 flex justify-center lg:order-1">
            <div className="relative flex items-center">
              <div aria-hidden className="absolute inset-0 -m-10 rounded-full border border-white/10" />
              <div aria-hidden className="absolute inset-0 -m-24 rounded-full border border-white/5" />
              <PhoneMockup screen="plan" width="w-44 sm:w-60" className="relative z-10 -rotate-3" />
              <PhoneMockup screen="health" width="w-44 sm:w-60" className="-ml-8 mt-20 rotate-3 sm:-ml-16" />
            </div>
          </div>
          <div className="order-1 flex flex-col gap-10 lg:order-2">
            <SectionHeading
              tone="dark"
              eyebrow="Inside the app"
              title="Healthcare, connected and simplified."
              intro="Finding the right doctor, arranging diagnostics and keeping track of your health shouldn't feel overwhelming. The RestoreHealth app brings it together."
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {appFeatures.map((f) => (
                <li
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white/4 p-5 transition-colors hover:border-mint/40 hover:bg-white/7"
                >
                  <Icon name={f.icon} className="size-6 text-mint" />
                  <h3 className="mt-4 text-title-md text-white">{f.title}</h3>
                  <p className="mt-1.5 text-body-sm text-teal-fixed-dim">{f.body}</p>
                </li>
              ))}
            </ul>
            <DownloadApkButton className="w-fit" />
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="container-page py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="What guides us"
          title="Built on values that put you first."
          intro="The principles behind how we think about healthcare, technology and the people we serve."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.title} interactive>
              <IconBadge name={v.icon} tone={v.tone} />
              <h3 className="mt-5 text-title-md text-forest">{v.title}</h3>
              <p className="mt-2 text-body-sm text-muted">{v.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Questions"
              title="Frequently asked questions."
              intro="Everything you need to know about getting the RestoreHealth app."
            />
            <ButtonLink href="/contact" variant="outline" className="w-fit">
              Still have questions? Contact us
            </ButtonLink>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <DownloadBand />
    </>
  );
}
