"use client"

import { Activity } from "lucide-react"

const items = [
  "Último apoio registrado há 8s",
  "42.180 participações auditadas",
  "Cobertura 100% nacional",
  "Liquidação Pix média em 2s",
  "1.250 cidadãos online agora",
  "Rede cívica sincronizada em tempo real",
]

export function LiveTicker() {
  const sequence = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-slate-950">
      <div className="flex w-max og-marquee">
        {sequence.map((text, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap px-5 py-2">
            <Activity className="size-3 text-emerald-400" aria-hidden="true" />
            <span className="text-xs font-medium text-slate-400">{text}</span>
            <span className="ml-3 text-slate-700" aria-hidden="true">
              •
            </span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
    </div>
  )
}
