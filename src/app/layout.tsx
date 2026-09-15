import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "OpinaGov — Painel Cívico & Consulta Popular 2026",
  description: "Plataforma independente de apuração, consulta pública e participação cívica auditada.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "🇧🇷 OpinaGov — Consulta Cívica e Apuração Nacional 2026",
    description: "Participe da apuração popular independente. Registre sua posição auditada e acompanhe os dados ao vivo.",
    siteName: "OpinaGov Brasil",
    locale: "pt_BR",
    type: "website",
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
