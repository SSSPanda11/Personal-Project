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
  title: "ShopBD | Premium E-commerce in Bangladesh",
  description: "Experience the best online shopping in Bangladesh. Fast delivery, trusted quality, and secure payments with bKash, Nagad, and Cash on Delivery.",
  keywords: ["ecommerce", "bangladesh", "online shopping", "bkash", "nagad", "cod"],
  authors: [{ name: "ShopBD Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
