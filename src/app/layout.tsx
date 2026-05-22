import { Bubblegum_Sans, Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bubblegumSans = Bubblegum_Sans({
  variable: "--font-bubblegum-sans",
  weight: "400",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "PFM Frontend Next.js",
  description: "A beautifully crafted Next.js frontend application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`
    ${geistSans.variable}
    ${geistMono.variable}
    ${bubblegumSans.variable}
    ${josefinSans.variable}
  `}>
      <body>
        <Topbar />
        <main className="font-josefin min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
