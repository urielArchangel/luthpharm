import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./Navbar";
import { CartProvider } from "./CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuthPharm",
  description: "UNILAG BIOMEDICAL ENGINEERING STUDENTS PROJECT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full max-w-[1000px] mx-auto`}
      >
        <CartProvider>
        <NavBar />
        {children}
        </CartProvider>
          <footer className="h-[10vh] bg-black mt-10">

      </footer>
      </body>
    
    </html>
  );
}
