"use client"

import { Info, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { VoteSide } from "@/lib/poll-data"

export function FeaturedPoll({
  simVotes,
  naoVotes,
  onVote,
}: {
  simVotes: number
  naoVotes: number
  onVote: (side: VoteSide) => void
}) {
  const total = simVotes + naoVotes
  const simPercent = total === 0 ? 50 : Math.round((simVotes / total) * 100)
  const naoPercent = 100 - simPercent

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
            <TrendingUp className="size-3" aria-hidden="true" />
            Tópico da Semana
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            Economia e Trabalho
          </span>
        </div>

        <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
          Flexibilização da jornada de trabalho no comércio local: você é a favor?
        </h1>

        <div className="mt-1 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <span className="text-emerald-600">SIM · {simPercent}%</span>
            <span className="text-red-500">{naoPercent}% · NÃO</span>
          </div>
          <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${simPercent}%` }}
            />
            <div
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${naoPercent}%` }}
            />
          </div>
          <p className="text-center text-xs text-slate-500">
            {total.toLocaleString("pt-BR")} participações registradas
          </p>
        </div>

        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <Button
            onClick={() => onVote("sim")}
            className="h-auto flex-col gap-0.5 rounded-xl bg-emerald-500 py-3.5 text-white hover:bg-emerald-600"
          >
            <span className="text-base font-semibold">Apoiar SIM</span>
            <span className="text-xs font-normal text-emerald-50">Contribuição de R$ 1,00</span>
          </Button>
          <Button
            onClick={() => onVote("nao")}
            className="h-auto flex-col gap-0.5 rounded-xl bg-red-500 py-3.5 text-white hover:bg-red-600"
          >
            <span className="text-base font-semibold">Apoiar NÃO</span>
            <span className="text-xs font-normal text-red-50">Contribuição de R$ 1,00</span>
          </Button>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <p>
            Contribuição simbólica para moderação e validação de participação única. Esta é uma
            demonstração — nenhum pagamento real é processado.
          </p>
        </div>
      </div>
    </section>
  )
}
