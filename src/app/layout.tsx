import type { Metadata, Viewport } from "next";
import { Archivo, Manrope, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { PageTransition } from "@/components/providers/PageTransition";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "@/lib/site-url";
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
    default: "CoachLab | Fitness Education Institute in Chennai",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
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
    title: "CoachLab | Fitness Education Institute in Chennai",
    description: siteConfig.seoDescription,
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
    title: "CoachLab | Fitness Education Institute in Chennai",
    description: siteConfig.seoDescription,
    images: ["/images/brand/og-default.jpg"],
  },
  /*
   * Icons are declared explicitly rather than via the app/icon.* file
   * convention. That convention emitted a single 180x180 PNG behind a
   * cache-busting query string and never produced /favicon.ico, so Google's
   * favicon crawler — which looks for /favicon.ico first and documents a
   * preference for squares that are a multiple of 48px — fell back to the
   * generic globe. `favicon.ico` itself lives in public/ and is served from
   * the domain root.
   */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
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
