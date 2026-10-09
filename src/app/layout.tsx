import { Bubblegum_Sans, Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import ToastProvider from "../components/ToastProvider";
import TrafficTracker from "../components/TrafficTracker";

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
  title: "Public Finance Database",
  description: "created by NGF",
  authors: [{ name: "Opemipo Alomaja" }],
  creator: "Opemipo Alomaja",
  keywords: ["NGF", "PFM", "Data", "Database", "Public Finance", "Opemipo Alomaja"],
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
        <TrafficTracker />
        <main className="font-geistMono min-h-screen">
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
