import type { Metadata } from "next";
import Image from "next/image";
import { DownloadBand } from "@/components/download-band";
import { Icon, type IconName } from "@/components/icon";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Card, Eyebrow, IconBadge, SectionHeading } from "@/components/ui";
import { photos, unsplash } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RestoreHealth is built to make healthcare simpler, more connected and easier to navigate — bringing essential healthcare experiences together in one place.",
};

const missionPoints = [
  "Simplify healthcare discovery",
  "Connect people with trusted care",
  "Create a more convenient healthcare experience",
];

const values: { icon: IconName; title: string; body: string; tone: "mint" | "forest" | "herbal" | "gold" }[] = [
  { icon: "heart", title: "Patient First", body: "Every experience starts with understanding the person behind the healthcare need.", tone: "mint" },
  { icon: "shield", title: "Trust & Security", body: "We believe healthcare information deserves transparency, privacy and responsible handling.", tone: "forest" },
  { icon: "network", title: "Connected Care", body: "We bring people, healthcare providers and services together through one connected platform.", tone: "herbal" },
  { icon: "sparkles", title: "Better Experience", body: "Technology should make healthcare simpler, clearer and easier to access.", tone: "gold" },
];

const journey: { icon: IconName; title: string; body: string }[] = [
  { icon: "stethoscope", title: "Doctor Consultation", body: "Discover and connect with healthcare professionals for your consultation needs." },
  { icon: "flask", title: "Diagnostics", body: "Access diagnostic services and manage your healthcare journey more conveniently." },
  { icon: "leaf", title: "Wellness & Preventive Care", body: "Take a proactive approach to your health with wellness and preventive healthcare services." },
  { icon: "lifebuoy", title: "Health Support", body: "Get support throughout your healthcare journey instead of navigating everything alone." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About RestoreHealth"
        title={
          <>
            Healthcare that puts <span className="text-mint">people first.</span>
          </>
        }
        intro="RestoreHealth is built to make healthcare simpler, more connected and easier to navigate — bringing essential healthcare experiences together in one place."
      />

      {/* ---------- Who we are ---------- */}
      <section className="container-page grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div className="relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-l3">
            <Image
              src={unsplash(photos.teamAtScreens, 1000)}
              alt="Healthcare team reviewing information on screens"
              fill
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-4 rounded-2xl bg-forest p-5 text-white shadow-l3 sm:left-auto sm:-right-6 sm:w-72">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mint text-forest">
              <Icon name="smartphone" className="size-6" />
            </span>
            <div>
              <p className="text-label-caps text-mint">Healthcare</p>
              <p className="text-title-md">Connected. Simplified.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Who we are"
            title={
              <>
                We are RestoreHealth, <span className="text-mint-strong">your healthcare companion.</span>
              </>
            }
          />
          <p className="text-body-lg text-muted">
            Healthcare can often feel fragmented. Finding the right doctor, understanding available
            services, arranging diagnostics and keeping track of your health journey can become
            overwhelming.
          </p>
          <p className="text-body-lg text-muted">
            RestoreHealth brings these experiences closer together. Our goal is to create a digital
            healthcare ecosystem where people can discover, access and manage healthcare services
            with greater confidence and convenience.
          </p>
          <ButtonLink href="/contact" variant="primary" className="mt-2 w-fit">
            Connect with us <Icon name="arrowRight" className="size-4" />
          </ButtonLink>
        </div>
      </section>

      {/* ---------- Mission ---------- */}
      <section className="bg-surface-low py-20 lg:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <IconBadge name="target" tone="forest" />
            <SectionHeading eyebrow="Our mission" title="Making healthcare easier to access." />
            <p className="text-body-lg text-muted">
              Our mission is to simplify the healthcare journey by connecting people with the
              services, professionals and information they need — through a technology-first
              experience designed around real human needs.
            </p>
            <ul className="flex flex-col gap-3">
              {missionPoints.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-xl border border-forest/6 bg-white px-4 py-3.5 text-label-lg text-forest shadow-l1"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
                    <Icon name="check" className="size-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-5/4 overflow-hidden rounded-3xl shadow-l3">
              <Image
                src={unsplash(photos.consultation, 1000)}
                alt="Doctor in conversation with a patient"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-5 right-6 rounded-2xl bg-white px-5 py-4 shadow-l2">
              <p className="text-label-caps text-mint-strong">Our focus</p>
              <p className="mt-1 text-title-md text-forest">People. Care. Connection.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Vision ---------- */}
      <section className="container-page py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-3xl bg-forest">
          <div className="grid lg:grid-cols-2">
            <div className="relative z-10 flex flex-col gap-6 p-8 sm:p-12 lg:p-16">
              <span className="flex size-12 items-center justify-center rounded-xl bg-white/10 text-mint">
                <Icon name="eye" className="size-6" />
              </span>
              <Eyebrow tone="dark">Our vision</Eyebrow>
              <h2 className="text-headline-xl text-balance text-white">
                A healthier future, connected by technology.
              </h2>
              <p className="text-body-lg text-teal-fixed-dim">
                We envision a healthcare experience where technology does not make people feel
                further away from care — it brings them closer to it.
              </p>
              <p className="text-body-lg text-teal-fixed-dim">
                RestoreHealth aims to build a connected ecosystem that makes healthcare more
                understandable, accessible and convenient for individuals and families.
              </p>
            </div>
            <div className="relative min-h-72 lg:min-h-full">
              <Image
                src={unsplash(photos.scanReview, 1000)}
                alt="Doctor reviewing medical scans"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-forest via-forest/30 to-transparent max-lg:bg-linear-to-b" />
              <div className="absolute bottom-6 right-6 rounded-2xl bg-mint px-5 py-4 text-forest shadow-l3">
                <p className="text-label-caps">Restore</p>
                <p className="text-headline-sm">Better Health</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Values ---------- */}
      <section className="container-page pb-20 lg:pb-28">
        <SectionHeading
          align="center"
          eyebrow="What guides us"
          title="Our values."
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

      {/* ---------- Journey ---------- */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="What we connect"
              title="Healthcare, all in one journey."
              intro="RestoreHealth is designed around the complete healthcare journey rather than isolated services."
            />
            <div className="relative hidden aspect-16/10 overflow-hidden rounded-3xl lg:block">
              <Image
                src={unsplash(photos.labResearch, 900)}
                alt="Healthcare professional working in a diagnostics lab"
                fill
                sizes="40vw"
                className="object-cover"
              />
            </div>
          </div>
          <ol className="flex flex-col gap-4">
            {journey.map((j, i) => (
              <li
                key={j.title}
                className="group flex gap-5 rounded-2xl border border-forest/6 bg-porcelain p-5 transition-all duration-300 hover:border-mint/50 hover:bg-white hover:shadow-l2 sm:p-6"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-forest text-mint transition-colors group-hover:bg-mint group-hover:text-forest">
                  <Icon name={j.icon} className="size-6" />
                </span>
                <div>
                  <span className="text-label-caps text-outline">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-1 text-headline-sm text-forest">{j.title}</h3>
                  <p className="mt-1.5 text-body-md text-muted">{j.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section className="container-page pt-20 text-center lg:pt-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <Eyebrow>Your health journey</Eyebrow>
          <h2 className="text-headline-xl text-balance text-forest">
            Let&apos;s build a better healthcare experience together.
          </h2>
          <p className="text-body-lg text-muted">
            Discover a simpler way to connect with healthcare through RestoreHealth.
          </p>
          <ButtonLink href="/contact" variant="primary">
            Get in touch <Icon name="arrowRight" className="size-4" />
          </ButtonLink>
        </div>
      </section>

      <DownloadBand />
    </>
  );
}
