"use client"

import { useEffect, useState } from "react"
import { Landmark, ShieldCheck } from "lucide-react"

const statusLines = [
  "Estabelecendo canal seguro...",
  "Sincronizando registros da rede cívica em tempo real...",
  "Auditoria de participações concluída.",
]

export function SplashReveal() {
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    const rotate = setInterval(() => {
      setStatusIndex((i) => Math.min(i + 1, statusLines.length - 1))
    }, 520)
    const leave = setTimeout(() => setLeaving(true), 1500)
    const finish = setTimeout(() => setDone(true), 2300)
    return () => {
      clearInterval(rotate)
      clearTimeout(leave)
      clearTimeout(finish)
    }
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] ${
        leaving ? "og-splash-out" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 40%, rgba(16,185,129,0.12), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="relative">
          <span className="absolute -inset-4 rounded-3xl bg-emerald-500/20 blur-2xl" />
          <span className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950 shadow-lg shadow-emerald-500/30">
            <Landmark className="size-8" aria-hidden="true" />
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-bold tracking-tight text-white">
            Opina<span className="text-emerald-400">Gov</span>
          </p>
          <p className="flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            <ShieldCheck className="size-3.5 text-emerald-400" aria-hidden="true" />
            Painel Oficial de Lideranças
          </p>
        </div>

        <div className="mt-2 h-1 w-56 overflow-hidden rounded-full bg-white/5">
          <div className="og-scan h-full w-full rounded-full" />
        </div>

        <p className="flex h-5 items-center gap-2 text-sm text-slate-400">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {statusLines[statusIndex]}
        </p>
      </div>
    </div>
  )
}

