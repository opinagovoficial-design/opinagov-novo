import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReferralTracker from "@/components/ReferralTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpinaGov | Painel de Lideranças e Demandas",
  description: "Plataforma de engajamento político e auditoria cidadã.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ReferralTracker />
        {children}
      </body>
    </html>
  );
}