import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { ThemeProvider, themeScript } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SpaceBackground } from "@/components/providers/SpaceBackground";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { LanguageProvider } from "@/lib/i18n";
import { Preloader } from "@/components/ui/Preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = "https://abderkay.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} — ${profile.role.en}`,
  description: profile.tagline.en,
  keywords: [
    "Abderrahman Kayouh",
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Engineer",
    "MLOps",
    "ENSA Agadir",
    "Data Science",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role.en}`,
    description: profile.tagline.en,
    url: siteUrl,
    siteName: profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role.en}`,
    description: profile.tagline.en,
  },
  robots: { index: true, follow: true },
  // Favicon assets live in /public/favicon.co (served at /favicon.co/*).
  // A scalable SVG is primary; ICO + PNG cover older browsers and iOS.
  icons: {
    icon: [
      { url: "/favicon.co/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.co/favicon.ico", sizes: "32x32" },
      { url: "/favicon.co/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.co/favicon.ico",
    apple: "/favicon.co/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090c" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Sets theme before first paint — prevents any flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Preloader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-ink"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <SpaceBackground />
            <LightboxProvider>
              <SmoothScroll>{children}</SmoothScroll>
            </LightboxProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
