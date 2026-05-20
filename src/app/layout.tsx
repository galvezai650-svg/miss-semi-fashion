import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AmazonNavbar from "@/components/amazon/AmazonNavbar";
import AmazonFooter from "@/components/amazon/AmazonFooter";
import WhatsAppFloat from "@/components/amazon/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://misssemifashion.com"),
  title: {
    default: "Miss Semi Fashion | Moda Premium Colombia",
    template: "%s | Miss Semi Fashion",
  },
  description:
    "Confeccionamos prendas de calidad premium para ti. Moda femenina, masculina, lencería, niños, adornos y hogar. Envíos a toda Colombia.",
  keywords: [
    "ropa femenina",
    "moda colombiana",
    "moda premium",
    "pijamas",
    "blusas",
    "vestidos deportivos",
    "licra colombiana",
    "mayorista",
    "hombre",
    "lencería",
    "niños",
    "adornos",
    "hogar",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} font-sans antialiased`}
        style={{ backgroundColor: "#FAFAF8", color: "#1A1A1A" }}
      >
        <AmazonNavbar />
        <main className="min-h-screen">{children}</main>
        <AmazonFooter />
        <WhatsAppFloat />
        <Toaster />
      </body>
    </html>
  );
}
