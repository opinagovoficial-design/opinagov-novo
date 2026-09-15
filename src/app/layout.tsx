import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://opinagov.vercel.app"),
  title: "OpinaGov — Painel Cívico & Consulta Popular 2026",
  description: "Plataforma oficial independente de apuração, consulta pública e participação popular com auditoria cívica.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "🇧🇷 OpinaGov — Consulta Cívica & Apuração Popular 2026",
    description: "Portal auditado de participação cívica independente. Registre sua manifestação e acompanhe os dados em tempo real.",
    url: "https://opinagov.vercel.app",
    siteName: "OpinaGov Brasil Oficial",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpinaGov — Painel Cívico 2026",
    description: "Consulta popular independente e auditada em tempo real.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
