import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwiftBurst Food - Find the Best Deals on Food Delivery",
  description: "Compare prices across multiple food delivery platforms and save money with real-time discounts, promo codes, and payment optimization.",
  keywords: ["food delivery", "price comparison", "deals", "discounts", "promo codes", "doordash", "ubereats", "grubhub"],
  authors: [{ name: "SwiftBurst Team" }],
  creator: "SwiftBurst",
  publisher: "SwiftBurst",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://swiftburst-food.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SwiftBurst Food - Save Money on Food Delivery",
    description: "Compare prices across multiple food delivery platforms and save money with real-time discounts, promo codes, and payment optimization.",
    url: 'https://swiftburst-food.vercel.app',
    siteName: 'SwiftBurst Food',
    images: [
      {
        url: 'https://swiftburst-food.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SwiftBurst Food - Compare food delivery prices',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SwiftBurst Food - Save Money on Food Delivery",
    description: "Compare prices across multiple food delivery platforms and save money with real-time discounts, promo codes, and payment optimization.",
    images: ['https://swiftburst-food.vercel.app/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
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
