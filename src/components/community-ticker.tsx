"use client"

import Link from "next/link"
import { Sparkles, Heart, ArrowRight } from "lucide-react"

const causeTopics = [
  { tag: "Meio Ambiente", title: "SOS Amazônia & Proteção de Nascentes", meta: "R$ 4.850 arrecadados" },
  { tag: "Saúde Pública", title: "UTI Neonatal no Hospital Regional", meta: "3.420 apoiadores" },
  { tag: "Causa Animal", title: "Castração e Resgate Emergencial de Cães e Gatos", meta: "R$ 2.100 arrecadados" },
  { tag: "Transparência", title: "Fundo de Auditoria Independente OpinaGov", meta: "4.150 apoiadores" },
  { tag: "Social", title: "Alimentos e Suporte a Famílias Vulneráveis", meta: "R$ 3.890 arrecadados" },
  { tag: "Educação", title: "Reforma de Salas de Aula Comunitárias", meta: "1.920 apoiadores" },
]

export function CommunityTicker() {
  const items = [...causeTopics, ...causeTopics]

  return (
    <div className="w-full bg-gradient-to-r from-emerald-950/70 via-slate-900 to-cyan-950/70 border-y border-emerald-500/20 py-2 overflow-hidden shadow-inner backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Selo Fixo na Esquerda */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-300 font-bold text-[11px] uppercase tracking-wider shrink-0 z-10 ml-2 shadow-sm">
          <Heart className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
          <span>Causas em Alta:</span>
        </div>

        {/* Letreiro Deslizante Infinito */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
            {items.map((c, i) => (
              <Link
                key={i}
                href="/doacoes"
                className="inline-flex items-center gap-2 bg-slate-900/90 hover:bg-slate-850 border border-white/10 hover:border-emerald-400/50 px-3 py-1 rounded-full text-xs transition duration-200 shrink-0 group"
              >
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {c.tag}
                </span>
                <span className="text-white font-medium text-xs group-hover:text-emerald-300 transition">
                  {c.title}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  • {c.meta}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Botão Fixo à Direita */}
        <Link
          href="/doacoes"
          className="hidden md:flex items-center gap-1 px-3 py-1 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/30 text-cyan-300 text-xs font-bold rounded-lg shrink-0 z-10 mr-2 transition"
        >
          <span>Ver Todas</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
