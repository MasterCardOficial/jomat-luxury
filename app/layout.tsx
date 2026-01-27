import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Inter, Poppins } from "next/font/google";
import Footer from "./components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "JoMat Luxury | Boutique Exclusiva de Relojes y Perfumes en Colombia",
  description: "Descubre la boutique líder en Colombia de relojes de lujo (Invicta, Technomarine, G-Shock) y perfumes premium. Envío gratis, productos 100% originales y garantía certificada.",
  keywords: ["relojes de lujo", "perfumes premium", "Invicta Colombia", "Technomarine", "G-Shock", "boutique online", "JoMat Luxury"],
  authors: [{ name: "JoMat Luxury" }],
  creator: "JoMat Luxury",
  publisher: "JoMat Luxury",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/jomat_logo.png",
    shortcut: "/jomat_logo.png",
    apple: "/jomat_logo.png",
  },
  openGraph: {
    title: "JoMat Luxury - Relojes y Perfumes de Lujo en Colombia",
    description: "La boutique exclusiva de relojes y perfumes de alta gama. Productos originales con garantía y envío gratis a toda Colombia.",
    url: "https://jomatluxury.com",
    siteName: "JoMat Luxury",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/jomat_logo.png",
        width: 1200,
        height: 630,
        alt: "JoMat Luxury - Boutique de Lujo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JoMat Luxury | Relojes y Perfumes de Lujo",
    description: "Descubre productos de lujo auténticos con envío gratis en Colombia",
    images: ["/jomat_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/jomat_logo.png" type="image/png" />
        <link rel="shortcut icon" href="/jomat_logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/jomat_logo.png" />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} ${inter.variable} ${poppins.variable} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
