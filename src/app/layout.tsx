import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uday's Portfolio",
  description: "Uday's professional portfolio. Explore projects, services, blogs, and testimonials.",
  openGraph: {
    title: "Uday's Portfolio",
    description: "Uday's professional portfolio. Explore projects, services, blogs, and testimonials.",
    type: "website",
    url: "https://yourdomain.com",
    images: ["/img53.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uday's Portfolio",
    description: "Uday's professional portfolio. Explore projects, services, blogs, and testimonials.",
    images: ["/img53.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="min-h-[80vh]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
