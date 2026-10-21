import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Icon, type IconName } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Card, Eyebrow, IconBadge, SectionHeading } from "@/components/ui";
import { photos, site, unsplash, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the RestoreHealth team by phone, email or WhatsApp for any queries or complaints.",
};

const features: { icon: IconName; title: string; body: string; tone: "mint" | "forest" | "gold" }[] = [
  { icon: "headset", title: "Talk To Our Team", body: "Connect with our healthcare support team for quick assistance and guidance.", tone: "mint" },
  { icon: "zap", title: "Quick Response", body: "Our team will help you with your healthcare queries as quickly as possible.", tone: "gold" },
  { icon: "lock", title: "Secure & Private", body: "Your contact information and healthcare queries are handled securely.", tone: "forest" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="We're here to help"
        title={
          <>
            How can we assist your <span className="text-mint">health today?</span>
          </>
        }
        intro="For any queries or complaints, reach our team by phone, email or WhatsApp — or send us a direct message below."
      />

      {/* ---------- Contact cards ---------- */}
      <section className="container-page relative z-10 -mt-10 grid gap-5 md:grid-cols-2">
        {site.contacts.map((c) => (
          <Card key={c.email} className="flex flex-col gap-5 p-6! shadow-l2!">
            <div className="flex items-center justify-between">
              <span className="text-label-caps text-mint-strong">{c.label}</span>
              <span className="inline-flex h-7 items-center gap-2 rounded-full bg-mint/15 px-3 text-label-md text-forest">
                <span className="size-1.5 rounded-full bg-mint" /> Call or email
              </span>
            </div>
            <a
              href={`mailto:${c.email}`}
              className="group flex items-center gap-4 rounded-xl p-2 -m-2 transition-colors hover:bg-porcelain"
            >
              <IconBadge name="mail" />
              <span className="min-w-0">
                <span className="block text-label-md text-muted">Email</span>
                <span className="block break-all text-title-md text-forest group-hover:text-mint-strong">
                  {c.email}
                </span>
              </span>
            </a>
            <a
              href={`tel:${c.tel}`}
              className="group flex items-center gap-4 rounded-xl p-2 -m-2 transition-colors hover:bg-porcelain"
            >
              <IconBadge name="phone" tone="forest" />
              <span>
                <span className="block text-label-md text-muted">Phone</span>
                <span className="block text-title-md text-forest group-hover:text-mint-strong">
                  {c.phone}
                </span>
              </span>
            </a>
          </Card>
        ))}
      </section>

      {/* ---------- Form ---------- */}
      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1fr_1.15fr] lg:py-28">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Send us a direct message"
            title="How can we assist your health today?"
            intro="Fill in your query below. Clicking submit connects you directly to our healthcare team via email."
          />
          <div className="relative mt-2 hidden aspect-4/3 overflow-hidden rounded-3xl shadow-l2 lg:block">
            <Image
              src={unsplash(photos.doctorGlasses, 900)}
              alt="Healthcare professional ready to help"
              fill
              sizes="45vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-l2 backdrop-blur">
              <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-forest">
                <Icon name="headset" className="size-5" />
              </span>
              <div>
                <p className="text-label-lg text-forest">Real people, real support</p>
                <p className="text-label-md font-medium text-muted">Our team reads every message</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="p-6! sm:p-8! shadow-l2!">
          <ContactForm />
        </Card>
      </section>

      {/* ---------- Features ---------- */}
      <section className="bg-surface-low py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Key service features"
            title="Why choose Restore Health support?"
            intro="Engineered for absolute accuracy, maximum safety, and compassionate care."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} interactive className="text-center">
                <IconBadge name={f.icon} tone={f.tone} className="mx-auto size-14!" />
                <h3 className="mt-5 text-headline-sm text-forest">{f.title}</h3>
                <p className="mt-2 text-body-md text-muted">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WhatsApp CTA ---------- */}
      <section className="container-page py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-forest">
          <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-mint/25 blur-3xl" />
          <div className="relative grid items-center lg:grid-cols-[1.3fr_1fr]">
            <div className="flex flex-col gap-6 p-8 sm:p-12 lg:p-16">
              <Eyebrow tone="dark">Your trusted health ally</Eyebrow>
              <h2 className="text-headline-xl text-balance text-white">
                Need guidance on your health plan?
              </h2>
              <p className="max-w-lg text-body-lg text-teal-fixed-dim">
                Reach out to our specialist advisors and let us customize the ideal healthcare plan
                for you.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink("Hi RestoreHealth, I need guidance on my health plan.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-mint px-6 text-label-lg font-bold text-forest transition-all hover:bg-[#12dd9d] active:scale-[0.98]"
                >
                  <Icon name="message" className="size-[18px]" />
                  Chat With Us On WhatsApp
                </a>
                <ButtonLink href="/#services" variant="outlineLight">
                  Explore All Services
                </ButtonLink>
              </div>
            </div>
            <div className="relative hidden h-full min-h-80 lg:block">
              <Image
                src={unsplash(photos.doctorTeal, 800)}
                alt="Smiling healthcare advisor"
                fill
                sizes="35vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-r from-forest to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
