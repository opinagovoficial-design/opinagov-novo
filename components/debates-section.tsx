"use client"

import { Plus, ThumbsDown, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Debate } from "@/lib/poll-data"

const numberFmt = new Intl.NumberFormat("pt-BR")

export function DebatesSection({
  debates,
  onCreate,
  onVote,
}: {
  debates: Debate[]
  onCreate: () => void
  onVote: (debateId: string, side: "yes" | "no") => void
}) {
  return (
    <section aria-labelledby="debates-title" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Arena da comunidade
          </span>
          <h2 id="debates-title" className="text-2xl font-bold tracking-tight text-white">
            Duelos e consultas rápidas
          </h2>
          <p className="text-sm text-slate-400">Vote em segundos nos temas do bairro.</p>
        </div>
        <Button
          onClick={onCreate}
          className="bg-gradient-to-r from-emerald-400 to-sky-500 font-semibold text-slate-950 hover:opacity-90"
        >
          <Plus className="size-4" aria-hidden="true" />
          Criar Novo Duelo / Consulta
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {debates.map((debate) => {
          const total = debate.yesVotes + debate.noVotes
          const yesPercent = total === 0 ? 50 : Math.round((debate.yesVotes / total) * 100)
          return (
            <article
              key={debate.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4"
            >
              <span className="w-fit rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                {debate.category}
              </span>
              <h3 className="text-sm font-semibold leading-snug text-white">{debate.title}</h3>

              <div className="mt-auto flex flex-col gap-2">
                <div className="flex h-2 overflow-hidden rounded-full bg-red-500/20">
                  <div
                    className="h-full rounded-l-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${yesPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-emerald-400">Sim {yesPercent}%</span>
                  <span className="text-slate-500 tabular-nums">
                    {numberFmt.format(total)} votos
                  </span>
                  <span className="font-medium text-red-400">Não {100 - yesPercent}%</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onVote(debate.id, "yes")}
                    size="sm"
                    className="flex-1 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25"
                  >
                    <ThumbsUp className="size-3.5" aria-hidden="true" />
                    Sim
                  </Button>
                  <Button
                    onClick={() => onVote(debate.id, "no")}
                    size="sm"
                    className="flex-1 bg-red-500/15 text-red-300 hover:bg-red-500/25"
                  >
                    <ThumbsDown className="size-3.5" aria-hidden="true" />
                    Não
                  </Button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

