"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, MessageSquare, Flame, Check } from "lucide-react"
import { type Debate } from "@/lib/poll-data"

interface DebatesSectionProps {
  debates: Debate[]
  onCreate: () => void
  onVote: (debateId: string, side: "yes" | "no") => void
}

export function DebatesSection({ debates, onCreate, onVote }: DebatesSectionProps) {
  const [votedMap, setVotedMap] = useState<Record<string, "yes" | "no">>({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem("opinagov_debates_voted")
      if (saved) setVotedMap(JSON.parse(saved))
    } catch {}
  }, [])

  const handleCastVote = (debateId: string, side: "yes" | "no") => {
    if (votedMap[debateId]) return

    const next = { ...votedMap, [debateId]: side }
    setVotedMap(next)
    try {
      localStorage.setItem("opinagov_debates_voted", JSON.stringify(next))
    } catch {}

    onVote(debateId, side)
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Duelos Cívicos em Alta
          </span>
          <h2 className="text-xl font-bold text-white">Guerra de Sim & Não</h2>
          <p className="text-xs text-slate-400">Vote diretamente nas principais pautas e propostas nacionais.</p>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition"
        >
          + Criar Novo Duelo / Consulta
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {debates.map((d) => {
          const total = (d.yesVotes || 0) + (d.noVotes || 0)
          const yesPct = total > 0 ? Math.round((d.yesVotes / total) * 100) : 50
          const noPct = 100 - yesPct
          const userChoice = votedMap[d.id]

          return (
            <div
              key={d.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md transition hover:border-white/20 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-slate-300">
                  {d.category}
                </span>
                {d.trending && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400">
                    <Flame className="h-3 w-3" /> Em Alta
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-white mb-3">{d.title}</h3>

              {/* Barra Proporcional */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800 flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${yesPct}%` }}
                />
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${noPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-bold mt-2 text-slate-300">
                <span className="text-emerald-400">Sim {yesPct}%</span>
                <span className="text-[11px] font-normal text-slate-400">
                  {total.toLocaleString("pt-BR")} votos
                </span>
                <span className="text-rose-400">Não {noPct}%</span>
              </div>

              {/* Botões de Ação com Trava contra Duplo Clique */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  disabled={Boolean(userChoice)}
                  onClick={() => handleCastVote(d.id, "yes")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition ${
                    userChoice === "yes"
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-md cursor-not-allowed"
                      : userChoice
                      ? "bg-slate-800/40 border-white/5 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-500"
                  }`}
                >
                  {userChoice === "yes" ? <Check className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                  {userChoice === "yes" ? "Voto Computado (Sim)" : "Sim"}
                </button>

                <button
                  type="button"
                  disabled={Boolean(userChoice)}
                  onClick={() => handleCastVote(d.id, "no")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition ${
                    userChoice === "no"
                      ? "bg-rose-600 border-rose-400 text-white shadow-md cursor-not-allowed"
                      : userChoice
                      ? "bg-slate-800/40 border-white/5 text-slate-500 cursor-not-allowed"
                      : "bg-rose-950/40 border-rose-500/30 text-rose-400 hover:bg-rose-900/50 hover:border-rose-500"
                  }`}
                >
                  {userChoice === "no" ? <Check className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
                  {userChoice === "no" ? "Voto Computado (Não)" : "Não"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
