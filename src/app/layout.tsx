import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://misssemifashion.com"),
  title: "Miss Semi Fashion | Ropa Femenina Mayorista y Detal Colombia",
  description:
    "Confeccionamos prendas de calidad para ti. Pijamas, blusas con perlitas, vestidos deportivos en licra colombiana, pantalones. Ventas al por mayor y detal. Envios nacionales e internacionales. Chinchina, Colombia.",
  keywords: [
    "ropa femenina",
    "moda colombiana",
    "pijamas dama",
    "blusas perlitas",
    "vestidos deportivos",
    "licra colombiana",
    "ropa al por mayor",
    "mayorista ropa",
    "Miss Semi Fashion",
    "confeccion ropa",
    "Chinchina",
    "Cali",
    "Colombia",
  ],
  authors: [{ name: "Miss Semi Fashion" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Miss Semi Fashion | Ropa Femenina Mayorista y Detal Colombia",
    description:
      "Confeccionamos prendas de calidad para ti. Pijamas, blusas, vestidos deportivos y mas. Emprende con nosotros.",
    url: "https://misssemifashion.com",
    siteName: "Miss Semi Fashion",
    type: "website",
    images: [
      {
        url: "/images/hero.png",
        width: 1344,
        height: 768,
        alt: "Miss Semi Fashion - Ropa Femenina Colombiana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miss Semi Fashion | Ropa Femenina Colombia",
    description:
      "Confeccionamos prendas de calidad. Pijamas, blusas, vestidos deportivos. Mayorista y detal.",
    images: ["/images/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
