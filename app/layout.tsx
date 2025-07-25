import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "ScioCare - Healthcare Education Excellence",
    template: "%s | ScioCare"
  },
  description: "Equipping healthcare professionals with essential communication and professional skills through specialized training programs including CareBridge English, CareSteps, and Pathways360°.",
  keywords: ["healthcare training", "medical education", "nursing training", "clinical communication", "healthcare English", "professional development"],
  authors: [{ name: "ScioCare" }],
  creator: "ScioCare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sciocare.com",
    title: "ScioCare - Healthcare Education Excellence",
    description: "Specialized training programs for healthcare professionals focusing on communication skills and professional development.",
    siteName: "ScioCare",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScioCare - Healthcare Education Excellence",
    description: "Specialized training programs for healthcare professionals focusing on communication skills and professional development.",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ScioCare"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased min-h-screen flex flex-col bg-white text-gray-900`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
