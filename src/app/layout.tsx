import type { Metadata } from "next";
import { Inter, Instrument_Serif, Archivo_Black } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-loaded",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atika Fatima | Health Informatics & Healthcare Data",
  description:
    "Health informatics professional experienced in EHR systems, health information management, regulatory compliance, healthcare operations, clinical research, Excel, and SQL.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Atika Fatima | Health Informatics & Healthcare Data",
    description:
      "Health informatics professional focused on healthcare data, EHR workflows, healthcare operations, compliance, and applied AI.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Atika Fatima - Health Informatics & Healthcare Data" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atika Fatima | Health Informatics & Healthcare Data",
    description: "Health informatics professional focused on healthcare data, EHR workflows, healthcare operations, compliance, and applied AI.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable} ${archivoBlack.variable}`}
    >
      <body className="bg-cream font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
