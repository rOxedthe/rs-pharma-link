import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Providers from "@/components/ui/Providers";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import JsonLd from "@/components/ui/JsonLd";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rspharmalink.com"),
  title: {
    default: "R.S. Pharma Link Pvt. Ltd. | Pharmaceutical Distributor Kathmandu, Nepal",
    template: "%s | R.S. Pharma Link Pvt. Ltd.",
  },
  description:
    "R.S. Pharma Link Pvt. Ltd. — Nepal's trusted pharmaceutical distributor in Kathmandu. Quality medicines, cold-chain logistics, and healthcare supply solutions across the Kathmandu Valley.",
  keywords: [
    "pharmaceutical distributor Kathmandu",
    "medicine supplier Nepal",
    "pharma wholesale Golfutar",
    "pharmaceutical company Nepal",
    "RS Pharma Link",
    "medicine distribution Kathmandu Valley",
    "healthcare supplier Nepal",
  ],
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://rspharmalink.com",
    siteName: "R.S. Pharma Link Pvt. Ltd.",
    title: "R.S. Pharma Link Pvt. Ltd. | Pharmaceutical Distributor Kathmandu",
    description: "Nepal's trusted pharmaceutical distributor. Quality medicines and healthcare supply across Kathmandu Valley.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "R.S. Pharma Link" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "R.S. Pharma Link Pvt. Ltd.",
    description: "Nepal's trusted pharmaceutical distributor in Kathmandu.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${plusJakarta.variable} ${spaceMono.variable}`}
    >
      <body>
        <JsonLd />
        <Providers>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
