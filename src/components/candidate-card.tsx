"use client"

import { useId, useState } from "react"
import Image from "next/image"
import {
  Banknote,
  BadgeCheck,
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
import { colorStyles, type Candidate, type DemandIcon } from "@/lib/poll-data"

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
  percent: number
  rank: number
  onVote: () => void
}) {
  const c = colorStyles[candidate.color]
  const isLeader = rank === 1
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-slate-900/70">
      <div
        className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full ${c.bar} opacity-10 blur-3xl transition-opacity duration-300 group-hover:opacity-20`}
        aria-hidden="true"
      />

      {isLeader && (
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-2.5 py-0.5 text-[11px] font-semibold text-slate-950 shadow-lg shadow-emerald-500/20">
          <TrendingUp className="size-3" aria-hidden="true" />
          Liderando
        </span>
      )}

      <div className="relative flex items-center gap-4">
        <div className={`relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ${c.ring}`}>
          <Image
            src={candidate.photo || "/placeholder.svg"}
            alt={`Foto de ${candidate.name}`}
            fill
            sizes="64px"
            className="object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-slate-950">
            <BadgeCheck className={`size-4 ${c.text}`} aria-hidden="true" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-white">{candidate.name}</h3>
          <p className="truncate text-sm text-slate-400">{candidate.role}</p>
          <span className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${c.soft}`}>
            {candidate.party}
          </span>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold tabular-nums ${c.text}`}>{percent}%</p>
          <p className="text-xs text-slate-500 tabular-nums">
            {numberFmt.format(candidate.votes)} votos
          </p>
        </div>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="relative rounded-xl border border-white/10 bg-slate-950/40">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left"
        >
          <span className="text-sm font-medium text-slate-200">Demandas &amp; Compromissos</span>
          <ChevronDown
            className={`size-4 text-slate-400 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
        <div
          id={panelId}
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-2 px-3.5 pb-3.5 pt-0.5">
              {candidate.demands.map((d) => {
                const Icon = demandIcons[d.icon] || TrendingUp
                return (
                  <li
                    key={d.label}
                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${c.soft}`}>
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    {d.label}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <Button
        onClick={onVote}
        className={`h-11 w-full rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl ${c.button}`}
      >
        Declarar Apoio Oficial — R$ 1,00
      </Button>
    </article>
  )
}

