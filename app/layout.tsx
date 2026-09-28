import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { AnuncioBar } from "@/components/AnuncioBar";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { PedidoDrawer } from "@/components/PedidoDrawer";
import { PedidoProvider } from "@/components/PedidoProvider";
import { siteConfig } from "@/lib/site-config";

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${siteConfig.nombre} — ${siteConfig.lema}`,
  description:
    "Cosmética botánica de cuidado personal e higiene. Armá tu pedido y envialo por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-background text-on-surface font-sans min-h-screen pt-16 pb-20 md:pb-0 antialiased">
        <PedidoProvider>
          <Header />
          <AnuncioBar />
          <main className="w-full">{children}</main>
          <Footer />
          <BottomNav />
          <PedidoDrawer />
        </PedidoProvider>
      </body>
    </html>
  );
}
