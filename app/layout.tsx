import type { Metadata } from "next";
import {
  Syne,
  Instrument_Serif,
  JetBrains_Mono,
  Inter,
} from "next/font/google";
import "./globals.css";
import Ticker from "@/components/Ticker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/dal";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "No Fomo — Berlin events",
  description: "Queer and FLINTA* events in Berlin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body>
        <Ticker />
        <Header user={user} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
