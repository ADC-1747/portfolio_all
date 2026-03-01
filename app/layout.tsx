import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-portfolio-domain.com"),
  title: "Ayush Chavne | AI/ML Engineer & Quant Researcher",
  description:
    "Portfolio of Ayush Chavne, an AI/ML Engineer and Quant Research Consultant specializing in LLMs, sales forecasting, and quantitative finance.",
  keywords: [
    "Ayush Chavne",
    "AI/ML Engineer",
    "Quant Researcher",
    "Full Stack Developer",
    "IIT Madras",
    "WorldQuant",
    "Machine Learning",
    "Quantitative Finance",
    "Backtesting",
    "LLMs",
  ],
  authors: [{ name: "Ayush Chavne" }],
  openGraph: {
    title: "Ayush Chavne | AI/ML Engineer & Quant Researcher",
    description:
      "Data-driven systems spanning applied machine learning, quantitative finance, and scalable software.",
    url: "https://your-portfolio-domain.com",
    siteName: "Ayush Chavne Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ayush Chavne | AI/ML & Quant Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Chavne | AI/ML Engineer & Quant Researcher",
    description:
      "AI/ML Engineer & Quant Research Consultant specializing in LLMs and Quantitative Finance.",
    images: ["/opengraph-image.png"],
  },
};

import Navbar from "./components/Navbar";
import { Providers } from "./components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
