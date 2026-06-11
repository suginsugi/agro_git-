import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AppInitializer from "@/components/providers/AppInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "AgroVision — AI-Powered Agricultural Intelligence Platform",
  description:
    "Enterprise-grade agricultural intelligence platform combining precision agriculture, soil science, climate intelligence, crop monitoring, and AI-powered decision support for sustainable farming operations.",
  keywords: [
    "agriculture",
    "precision farming",
    "soil analysis",
    "crop monitoring",
    "weather intelligence",
    "disease detection",
    "smart irrigation",
    "AI agriculture",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body>
        <SmoothScrollProvider>
          <AppInitializer />
          <LoadingScreen />
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
