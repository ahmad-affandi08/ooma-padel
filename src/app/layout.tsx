import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Sans-serif for body text (Clean, modern)
const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

// Serif for headings (Elegant, premium)
const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

// Monospace for code (if needed)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OOMA Padel & Eatery",
    template: "%s | OOMA Padel & Eatery",
  },
  description:
    "Premium padel court and organic eatery. Experience the perfect blend of sport and lifestyle in a warm, earthy atmosphere.",
  keywords: [
    "padel",
    "padel court",
    "eatery",
    "cafe",
    "organic food",
    "sports",
    "lifestyle",
    "OOMA",
  ],
  authors: [{ name: "OOMA Padel & Eatery" }],
  creator: "OOMA Padel & Eatery",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://oomapadel.com",
    title: "OOMA Padel & Eatery",
    description:
      "Premium padel court and organic eatery. Experience the perfect blend of sport and lifestyle.",
    siteName: "OOMA Padel & Eatery",
  },
  twitter: {
    card: "summary_large_image",
    title: "OOMA Padel & Eatery",
    description:
      "Premium padel court and organic eatery. Experience the perfect blend of sport and lifestyle.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
