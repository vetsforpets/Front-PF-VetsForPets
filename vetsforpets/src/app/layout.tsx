import type { Metadata } from "next";
import { Kiwi_Maru, Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// -

import { Toaster } from "sonner";
import StripeProvider from "./StripeProvider";

const kiwiMaru = Kiwi_Maru({
  variable: "--font-kiwi-maru",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const tenorSans = Tenor_Sans({
  variable: "--font-tenor-sans",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Vets for Pets",
  description: "git",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`flex flex-col min-h-scree ${kiwiMaru.variable} ${tenorSans.variable} antialiased`}
      >
        <Toaster position="top-center" />

       <StripeProvider>
        <Header />
        <div className="flex flex-col flex-grow">{children}</div>
        <Footer />
       </StripeProvider>
       
      </body>
    </html>
  );
}
