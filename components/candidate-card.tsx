"use client"

import Image from "next/image"
import {
  Banknote,
  Bike,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Home,
  Leaf,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { colorStyles, type Candidate, type DemandIcon } from "@/lib/poll-data"

const demandIcons: Record<DemandIcon, typeof HeartPulse> = {
  health: HeartPulse,
  transport: Bike,
  money: Banknote,
  education: GraduationCap,
  security: ShieldCheck,
  housing: Home,
  environment: Leaf,
  work: Briefcase,
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

  return (
    <article className="relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-colors hover:border-white/20">
      {isLeader && (
        <span className="absolute -top-2.5 left-5 flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 px-2.5 py-0.5 text-[11px] font-semibold text-slate-950">
          <TrendingUp className="size-3" aria-hidden="true" />
          Liderando
        </span>
      )}

      <div className="flex items-center gap-4">
        <div className={`relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ${c.ring}`}>
          <Image
            src={candidate.photo || "/placeholder.svg"}
            alt={`Foto de ${candidate.name}`}
            fill
            sizes="64px"
            className="object-cover"
          />
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

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {candidate.demands.map((d) => {
          const Icon = demandIcons[d.icon]
          return (
            <li
              key={d.label}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
            >
              <Icon className={`size-3.5 ${c.text}`} aria-hidden="true" />
              {d.label}
            </li>
          )
        })}
      </ul>

      <Button
        onClick={onVote}
        className={`h-11 w-full rounded-xl font-semibold ${c.button}`}
      >
        Declarar Voto — R$ 1,00
      </Button>
    </article>
  )
}
