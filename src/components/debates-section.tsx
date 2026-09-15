"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, Flame, Check, X, ShieldCheck, Share2 } from "lucide-react"
import { type Debate } from "@/lib/poll-data"

interface DebatesSectionProps {
  debates: Debate[]
  onCreate: () => void
  onVote: (debateId: string, side: "yes" | "no") => void
}

interface PendingDebateVote {
  debateId: string
  side: "yes" | "no"
  debateTitle: string
}

export function DebatesSection({ debates, onCreate, onVote }: DebatesSectionProps) {
  const [votedMap, setVotedMap] = useState<Record<string, "yes" | "no">>({})
  const [pendingVote, setPendingVote] = useState<PendingDebateVote | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("opinagov_debates_voted")
      if (saved) setVotedMap(JSON.parse(saved))
    } catch {}
  }, [])

  const handleOpenPaywall = (debate: Debate, side: "yes" | "no") => {
    if (votedMap[debate.id]) return
    setPendingVote({ debateId: debate.id, side, debateTitle: debate.title })
  }

  const handleConfirmPixVote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pendingVote) return

    const { debateId, side } = pendingVote
    const next = { ...votedMap, [debateId]: side }
    setVotedMap(next)

    try {
      localStorage.setItem("opinagov_debates_voted", JSON.stringify(next))
    } catch {}

    onVote(debateId, side)
    setConfirmed(true)

    setTimeout(() => {
      setConfirmed(false)
      setPendingVote(null)
    }, 1200)
  }

  const handleShareWhatsApp = (debate: Debate) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://opinagov.vercel.app"
    const text = `🗳️ *Duelo Cívico no OpinaGov*\n\n"${debate.title}"\n\nQual é a sua opinião? Vote Sim ou Não no painel oficial auditado:\n👉 ${origin}#debates`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Duelos Cívicos em Alta
          </span>
          <h2 className="text-xl font-bold text-white">Guerra de Sim & Não</h2>
          <p className="text-xs text-slate-400">
            Vote com auditoria cívica (R$ 1,00) nas principais pautas e compartilhe com sua rede.
          </p>
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
                <div className="flex items-center gap-2">
                  {d.trending && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400">
                      <Flame className="h-3 w-3" /> Em Alta
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleShareWhatsApp(d)}
                    className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-lg transition"
                    title="Compartilhar duelo no WhatsApp"
                  >
                    <Share2 className="h-3 w-3" />
                    WhatsApp
                  </button>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white mb-3">{d.title}</h3>

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
                  {total.toLocaleString("pt-BR")} votos auditados
                </span>
                <span className="text-rose-400">Não {noPct}%</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  disabled={Boolean(userChoice)}
                  onClick={() => handleOpenPaywall(d, "yes")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition ${
                    userChoice === "yes"
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-md cursor-not-allowed"
                      : userChoice
                      ? "bg-slate-800/40 border-white/5 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 hover:border-emerald-500"
                  }`}
                >
                  {userChoice === "yes" ? <Check className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                  {userChoice === "yes" ? "Voto Confirmado (Sim)" : "Votar Sim (R$ 1,00)"}
                </button>

                <button
                  type="button"
                  disabled={Boolean(userChoice)}
                  onClick={() => handleOpenPaywall(d, "no")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition ${
                    userChoice === "no"
                      ? "bg-rose-600 border-rose-400 text-white shadow-md cursor-not-allowed"
                      : userChoice
                      ? "bg-slate-800/40 border-white/5 text-slate-500 cursor-not-allowed"
                      : "bg-rose-950/40 border-rose-500/30 text-rose-400 hover:bg-rose-900/50 hover:border-rose-500"
                  }`}
                >
                  {userChoice === "no" ? <Check className="h-4 w-4" /> : <ThumbsDown className="h-4 w-4" />}
                  {userChoice === "no" ? "Voto Confirmado (Não)" : "Votar Não (R$ 1,00)"}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {pendingVote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setPendingVote(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {confirmed ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Check className="h-16 w-16 text-emerald-400 mb-3" />
                <h3 className="text-xl font-bold text-white">Voto Registrado!</h3>
                <p className="text-xs text-slate-400 mt-1">Sua manifestação foi computada com sucesso.</p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white">Confirmar Voto no Duelo</h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">"{pendingVote.debateTitle}"</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      pendingVote.side === "yes"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    Opção selecionada: {pendingVote.side === "yes" ? "SIM" : "NÃO"}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-cyan-500/20 mb-4">
                  <ShieldCheck className="h-8 w-8 text-cyan-400 shrink-0" />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white block">Taxa Cívica de R$ 1,00</span>
                    Mecanismo anti-bot para garantir votos únicos e auditáveis.
                  </div>
                </div>

                <form onSubmit={handleConfirmPixVote} className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow-lg"
                  >
                    Confirmar Voto Auditado (R$ 1,00)
                  </button>
                </form>

                <p className="text-[10px] text-slate-500 text-center mt-3">
                  Auditoria de participação via OpinaGov.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
