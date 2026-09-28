import type { Metadata } from "next";
import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Footer } from "@/components/Footer";
import { PedidoProvider } from "@/components/PedidoProvider";
import { siteConfig } from "@/lib/site-config";

const serif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${siteConfig.nombre} — ${siteConfig.lema}`,
  description:
    "Productos de cuidado personal e higiene con ingredientes naturales. Armá tu pedido y envialo por WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-background text-on-background font-sans min-h-screen pt-16 pb-20 md:pb-0 antialiased">
        <PedidoProvider>
          <Header />
          <main className="w-full">{children}</main>
          <Footer />
          <BottomNav />
        </PedidoProvider>
      </body>
    </html>
  );
}
