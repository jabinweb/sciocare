import type { Metadata, Viewport } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </>
  );
}
