"use client"

import { useId, useState } from "react"
import {
  Banknote,
  Bike,
  Briefcase,
  ChevronDown,
  GraduationCap,
  HeartPulse,
  Home,
  Leaf,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { colorStyles, type Candidate } from "@/lib/poll-data"

const demandIcons: Record<string, any> = {
  health: HeartPulse,
  heart: HeartPulse,
  transport: Bike,
  money: Banknote,
  education: GraduationCap,
  "graduation-cap": GraduationCap,
  security: ShieldCheck,
  shield: ShieldCheck,
  housing: Home,
  environment: Leaf,
  leaf: Leaf,
  tree: Leaf,
  work: Briefcase,
  briefcase: Briefcase,
  zap: TrendingUp,
  landmark: Banknote,
}

const numberFmt = new Intl.NumberFormat("pt-BR")

export function CandidateCard({
  candidate,
  percent,
  rank,
  onVote,
}: {
  candidate: Candidate
  percent?: number
  rank: number
  totalVotes?: number
  onVote: (cand: Candidate) => void
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const displayPercent = typeof percent === "number" ? percent : 0
  const colors = (colorStyles && candidate?.color && colorStyles[candidate.color]) || {
    bg: "bg-cyan-600",
    bar: "bg-cyan-500",
    text: "text-cyan-400",
  }

  const initials = candidate?.name
    ? candidate.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "BR"

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-sm text-white shadow-md ${colors.bg} border-2 border-white/20`}>
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-white">{candidate?.name || "Candidato"}</h3>
            </div>
            <p className="text-xs text-slate-400">{candidate?.role || "Presidência da República"}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${colors.bg} text-white`}>
                {candidate?.party || "IND"}
              </span>
              {candidate?.ballotNumber && (
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                  #{candidate.ballotNumber}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-black text-white">{displayPercent}%</div>
          <div className="text-[11px] text-slate-400">{numberFmt.format(candidate?.votes || 0)} votos</div>
        </div>
      </div>

      <div className="mt-3.5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full transition-all duration-500 ${colors.bar}`}
            style={{ width: `${displayPercent}%` }}
          />
        </div>
      </div>

      {candidate?.demands && candidate.demands.length > 0 && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/10"
          >
            <span>Demandas & Compromissos</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>

          {open && (
            <ul id={panelId} className="mt-2 flex flex-col gap-1.5">
              {candidate.demands.map((d: any, idx: number) => {
                const Icon = demandIcons[d.icon] || TrendingUp
                return (
                  <li key={idx} className="flex items-center justify-between rounded-md bg-white/5 px-2.5 py-1.5 text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-slate-400" />
                      {d.label || d.title}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      <div className="mt-4">
        <Button
          onClick={() => onVote(candidate)}
          className={`w-full font-bold py-2.5 text-sm shadow-lg ${colors.bg} hover:brightness-110 text-white border-0`}
        >
          Declarar Apoio Oficial — R$ 1,00
        </Button>
      </div>
    </div>
  )
}
