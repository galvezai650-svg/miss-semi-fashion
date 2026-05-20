import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AmazonNavbar from "@/components/amazon/AmazonNavbar";
import AmazonFooter from "@/components/amazon/AmazonFooter";
import WhatsAppFloat from "@/components/amazon/WhatsAppFloat";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://misssemifashion.com"),
  title: {
    default: "Miss Semi Fashion | Ropa Femenina Mayorista y Detal Colombia",
    template: "%s | Miss Semi Fashion",
  },
  description: "Confeccionamos prendas de calidad para ti. Pijamas, blusas, vestidos deportivos en licra colombiana. Ventas al por mayor y detal. Envios nacionales e internacionales.",
  keywords: ["ropa femenina", "moda colombiana", "pijamas", "blusas", "vestidos deportivos", "licra colombiana", "mayorista"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} font-sans antialiased bg-background text-foreground`}>
        <AmazonNavbar />
        <main className="min-h-screen">{children}</main>
        <AmazonFooter />
        <WhatsAppFloat />
        <Toaster />
      </body>
    </html>
  );
}
