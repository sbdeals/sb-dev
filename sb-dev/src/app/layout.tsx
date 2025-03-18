import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "SwiftBurst Food - Find the Best Deals on Food Delivery",
  description: "Compare prices across multiple food delivery platforms and save money with real-time discounts, promo codes, and payment optimization.",
  keywords: ["food delivery", "price comparison", "deals", "discounts", "promo codes", "doordash", "ubereats", "grubhub"],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  authors: [{ name: 'SwiftBurst Team' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://swiftburst.same-app.com/',
    siteName: 'SwiftBurst Food',
    title: 'SwiftBurst Food - Find the Best Deals on Food Delivery',
    description: 'Compare prices across multiple food delivery platforms and save money with real-time discounts, promo codes, and payment optimization.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SwiftBurst Food - Save on Delivery',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SwiftBurst Food - Find the Best Deals on Food Delivery',
    description: 'Compare prices across multiple food delivery platforms and save money with real-time discounts, promo codes, and payment optimization.',
    images: ['/twitter-image.svg'],
    creator: '@swiftburstapp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
