import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ChatWidget from "@/components/ChatWidget";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "coding1010 - The Art of Perfume",
  description: "Luxury perfumes combining art and elegance. Discover our exclusive collection of oriental, floral, woody, and citrus fragrances.",
  keywords: ["perfume", "luxury", "fragrance", "coding1010", "oriental", "floral", "woody", "citrus"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${poppins.variable} antialiased`}>
        <ShopProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </ShopProvider>
      </body>
    </html>
  );
}
