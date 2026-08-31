import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { PageTransition } from "@/components/providers/PageTransition";
import { SITE_URL, siteConfig } from "@/data/site";
import "./globals.css";

/* Display face carries a width axis, echoing the wide COACHLAB wordmark. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "CoachLab | Fitness Education & Personal Trainer Courses Chennai",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "fitness courses Chennai",
    "personal trainer course Chennai",
    "certified personal trainer course Chennai",
    "fitness education Chennai",
    "nutrition coach course Chennai",
    "group fitness instructor course Chennai",
    "fitness workshops Chennai",
    "ACE personal trainer exam preparation Chennai",
  ],
  authors: [{ name: siteConfig.fullName }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: siteConfig.fullName,
    title: "CoachLab | Fitness Education & Personal Trainer Courses Chennai",
    description: siteConfig.description,
    images: [
      {
        url: "/images/brand/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachLab | Fitness Education & Personal Trainer Courses Chennai",
    description: siteConfig.description,
    images: ["/images/brand/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Only verified facts belong in this graph. No ratings, no founding year. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/coachlab-logo.png`,
  image: `${SITE_URL}/images/brand/og-default.jpg`,
  email: siteConfig.email,
  telephone: siteConfig.phoneIntl,
  slogan: siteConfig.motto,
  founder: {
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.roles.join(", "),
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: `${siteConfig.location.area}, ${siteConfig.location.locality}`,
    addressRegion: siteConfig.location.region,
    addressCountry: siteConfig.location.country,
  },
  areaServed: { "@type": "City", name: siteConfig.location.city },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.phoneIntl,
    email: siteConfig.email,
    contactType: "admissions",
    areaServed: "IN",
    availableLanguage: ["en", "ta"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Without JS the reveal animations never run, so show their content. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.reveal-wipe{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-ink antialiased">
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <MotionProvider>
          <Navbar />
          <main id="main">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <MobileCTA />
        </MotionProvider>
      </body>
    </html>
  );
}
