import type { Metadata } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Frame from "@/components/Frame";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import "./globals.css";

// Heron uses BT Grotesk (a paid font) + Geist Mono. Inter Tight is the closest free match.
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: "500", variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: { default: "Fourcrest Mansions | Luxury triplex villas in Hyderabad", template: "%s | Fourcrest Mansions" },
  description:
    "28 triplex mansions on 500 sq. yd. plots across 6.14 acres at Mankhal, Hyderabad. A Globus South project.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${interTight.variable} ${geistMono.variable}`}>
      <body className="paper" suppressHydrationWarning>
        <SmoothScroll>
          <Loader />
          <Header />
          <PageTransition>
            {children}
            <Footer />
          </PageTransition>
          <Frame />
        </SmoothScroll>
      </body>
    </html>
  );
}
