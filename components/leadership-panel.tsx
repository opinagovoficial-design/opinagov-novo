"use client"

import { CandidateCard } from "@/components/candidate-card"
import { colorStyles, type Candidate } from "@/lib/poll-data"

const numberFmt = new Intl.NumberFormat("pt-BR")

export function LeadershipPanel({
  candidates,
  onVote,
}: {
  candidates: Candidate[]
  onVote: (candidate: Candidate) => void
}) {
  const total = candidates.reduce((sum, c) => sum + c.votes, 0)
  const percentOf = (votes: number) => (total === 0 ? 0 : Math.round((votes / total) * 100))

  const ranked = [...candidates].sort((a, b) => b.votes - a.votes)
  const rankById = new Map(ranked.map((c, i) => [c.id, i + 1]))

  return (
    <section aria-labelledby="panel-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Corrida em tempo real
        </span>
        <h2 id="panel-title" className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Quem lidera a disputa pela cidade?
        </h2>
        <p className="text-sm text-slate-400">
          {numberFmt.format(total)} votos declarados · atualizado ao vivo a cada participação.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Termômetro Geral</p>
          <p className="text-xs text-slate-500">Divisão proporcional dos votos</p>
        </div>
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-white/5">
          {ranked.map((c) => (
            <div
              key={c.id}
              className={`h-full ${colorStyles[c.color].bar} transition-all duration-500 first:rounded-l-full last:rounded-r-full`}
              style={{ width: `${percentOf(c.votes)}%` }}
              title={`${c.name}: ${percentOf(c.votes)}%`}
            />
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {ranked.map((c) => (
            <li key={c.id} className="flex items-center gap-2 text-xs text-slate-300">
              <span className={`size-2.5 rounded-full ${colorStyles[c.color].dot}`} aria-hidden="true" />
              <span className="font-medium text-white">{c.name.split(" ")[0]}</span>
              <span className="tabular-nums text-slate-400">{percentOf(c.votes)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {candidates.map((c) => (
          <CandidateCard
            key={c.id}
            candidate={c}
            percent={percentOf(c.votes)}
            rank={rankById.get(c.id) ?? 99}
            onVote={() => onVote(c)}
          />
        ))}
      </div>
    </section>
  )
}
