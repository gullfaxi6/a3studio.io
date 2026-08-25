import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChromeGate from "@/components/layout/ChromeGate";
import { site } from "@/content/site";
import { professionalServiceJsonLd } from "@/lib/seo";

// next/font télécharge et auto-héberge les polices au build (satisfait l'exigence
// d'auto-hébergement, décision 12). Graisses limitées, font-display: swap.
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.defaultTitle,
    template: `%s — ${site.name}`,
  },
  description: site.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.defaultTitle,
    description: site.defaultDescription,
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.defaultTitle,
    description: site.defaultDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{document.documentElement.classList.add('js');" +
              "setTimeout(function(){if(!window.__a3RevealReady){document.documentElement.classList.add('reveal-failsafe')}},2600)}catch(e){}",
          }}
        />
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        {/* ChromeGate masque l'habillage sur les routes nues (carte de visite). */}
        <ChromeGate>
          <Header />
        </ChromeGate>
        <main id="main">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd()) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
