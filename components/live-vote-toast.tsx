"use client"

import { useState, useEffect } from "react"
import { ShieldCheck, CheckCircle2 } from "lucide-react"

const recentActivities = [
  { name: "Lucas M.", city: "São Paulo, SP", target: "Luiz Inácio Lula da Silva" },
  { name: "Mariana R.", city: "Curitiba, PR", target: "Flávio Bolsonaro" },
  { name: "Eduardo F.", city: "Goiânia, GO", target: "Ronaldo Caiado" },
  { name: "Ana Beatriz", city: "Belo Horizonte, MG", target: "Romeu Zema" },
  { name: "Carlos T.", city: "Campinas, SP", target: "Reforma Tributária" },
  { name: "Fernanda S.", city: "Rio de Janeiro, RJ", target: "Renan Santos" },
  { name: "Gabriel O.", city: "Brasília, DF", target: "Segurança Pública Integrada" },
  { name: "Priscila K.", city: "Porto Alegre, RS", target: "Escritor Augusto Cury" },
]

export function LiveVoteToast() {
  const [current, setCurrent] = useState<(typeof recentActivities)[0] | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem = recentActivities[Math.floor(Math.random() * recentActivities.length)]
      setCurrent(randomItem)
      setVisible(true)

      const hideTimeout = setTimeout(() => {
        setVisible(false)
      }, 4500)

      return () => clearTimeout(hideTimeout)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  if (!visible || !current) return null

  return (
    <aside
      aria-label="Atividade de voto em tempo real"
      className="fixed bottom-5 left-5 z-40 flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md transition-all duration-500 max-w-xs"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
        <CheckCircle2 className="h-5 w-5" />
      </div>
      <div className="text-xs">
        <div className="flex items-center gap-1.5 font-bold text-white">
          <span>{current.name}</span>
          <span className="text-[10px] text-slate-400 font-normal">({current.city})</span>
        </div>
        <p className="text-slate-300 text-[11px] mt-0.5 leading-snug">
          Acabou de confirmar voto auditado em{" "}
          <strong className="text-cyan-400 font-semibold">{current.target}</strong>
        </p>
        <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase mt-1">
          <ShieldCheck className="h-3 w-3" /> Pix Auditado R$ 1,00
        </span>
      </div>
    </aside>
  )
}
