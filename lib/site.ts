export const site = {
  name: "Restore Health Services",
  shortName: "RestoreHealth",
  tagline: "Healthcare That Puts People First.",
  description:
    "RestoreHealth brings doctor consultations, diagnostics, wellness and health support together in one connected app. Download the Android app today.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://restorehealthservices.in",
  contacts: [
    {
      label: "Contact 1",
      email: "helpline@restorehealthservices.in",
      phone: "+91 92054 56671",
      tel: "+919205456671",
    },
    {
      label: "Contact 2",
      email: "issuance@restorehealthservices.in",
      phone: "+91 84485 07406",
      tel: "+918448507406",
    },
  ],
  supportEmail: "helpline@restorehealthservices.in",
  whatsapp: "919205456671",
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/download", label: "Download" },
    { href: "/contact", label: "Contact Us" },
  ],
} as const;

/**
 * APK release details. Every download button on the site points at
 * `apk.href`, which redirects to `APK_DOWNLOAD_URL` (see .env.example).
 * Update these values each time you publish a new build.
 */
export const apk = {
  href: "/download/apk",
  fileUrl:
    process.env.APK_DOWNLOAD_URL ||
    "https://pub-8b7757f6961e4446bb1e0473b118ad34.r2.dev/restorehealth.apk",
  version: "2.0",
  size: "101 MB",
  minAndroid: "Android 8.0+",
  updated: "October 2026",
} as const;

/** Real app screenshots (personal details blurred) in /public/app-screens. */
export const appScreens = {
  home: {
    src: "/app-screens/home.jpg",
    alt: "RestoreHealth app home screen with Health Score and daily wellness stats",
    title: "Health at a glance",
    caption: "Health Score, steps, sleep and heart rate — updated live.",
  },
  plan: {
    src: "/app-screens/plan.jpg",
    alt: "RestoreHealth app My Plan screen showing plan benefits and family members",
    title: "Your plan & benefits",
    caption: "See your plan, family members and every benefit available.",
  },
  health: {
    src: "/app-screens/health.jpg",
    alt: "RestoreHealth app showing report summary, preventive checklist and family doctor",
    title: "Reports & family doctor",
    caption: "Easy report summaries and one doctor who knows you.",
  },
  services: {
    src: "/app-screens/services.jpg",
    alt: "RestoreHealth app healthcare services: tele consultation, pharmacy, doctor visit, lab tests and scans",
    title: "All services, one app",
    caption: "Tele consultation, pharmacy, doctor visits, lab tests and scans.",
  },
} as const;

export type AppScreen = keyof typeof appScreens;

export const whatsappLink =(text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;

export const photos = {
  doctorWithPhone: "1576091160399-112ba8d25d1d",
  doctorGlasses: "1612349317150-e413f6a5b16d",
  doctorTeal: "1594824476967-48c8b964273f",
  doctorOutdoor: "1559839734-2b71ea197ec2",
  doctorScrubs: "1622253692010-333f2da6031d",
  consultation: "1631217868264-e5b90bb7e133",
  labResearch: "1527613426441-4da17471b66d",
  scanReview: "1588776814546-1ffcf47267a5",
  wellnessYoga: "1544367567-0f2fcb009e0b",
  bloodPressure: "1631815588090-d4bfec5b1ccb",
  teamAtScreens: "1666214280391-8ff5bd3c0bf0",
  stethoscope: "1505751172876-fa1923c5c528",
} as const;
