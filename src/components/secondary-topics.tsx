"use client"

import { ArrowUpRight } from "lucide-react"
import type { SecondaryTopic } from "@/lib/poll-data"

export function SecondaryTopics({ topics }: { topics: SecondaryTopic[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">Outros tópicos em debate</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((t) => {
          const naoPercent = 100 - t.simPercent
          return (
            <article
              key={t.id}
              className="group flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-300"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {t.category}
                </span>
                <ArrowUpRight
                  className="size-4 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-balance font-semibold leading-snug text-slate-900">{t.title}</h3>
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full bg-emerald-500" style={{ width: `${t.simPercent}%` }} />
                  <div className="h-full bg-red-500" style={{ width: `${naoPercent}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-emerald-600">SIM {t.simPercent}%</span>
                  <span className="text-slate-400">
                   {t.totalVotes.toLocaleString("pt-BR")} votos
                  </span>
                  <span className="font-medium text-red-500">NÃO {naoPercent}%</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
