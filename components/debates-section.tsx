"use client"

import { useState, useEffect } from "react"
import { ThumbsUp, ThumbsDown, Flame, Check, X, ShieldCheck, Share2, Copy, Loader2, QrCode } from "lucide-react"
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

  // Estados do Pix
  const [loadingPix, setLoadingPix] = useState(false)
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeBase64?: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("opinagov_debates_voted")
      if (saved) setVotedMap(JSON.parse(saved))
    } catch {}
  }, [])

  const handleOpenPaywall = async (debate: Debate, side: "yes" | "no") => {
    if (votedMap[debate.id]) return
    setPendingVote({ debateId: debate.id, side, debateTitle: debate.title })
    setLoadingPix(true)
    setPixData(null)
    setErrorMessage("")
    setCopied(false)

    try {
      const res = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1.0,
          description: `Voto Duelo: ${debate.title.substring(0, 30)} - ${side.toUpperCase()}`,
        }),
      })
      const data = await res.json()
      if (res.ok && data.qrCode) {
        setPixData({ qrCode: data.qrCode, qrCodeBase64: data.qrCodeBase64 })
      } else {
        setErrorMessage(data.error || "Não foi possível carregar a chave Pix. Tente novamente.")
      }
    } catch {
      setErrorMessage("Erro de conexão ao gerar o Pix.")
    } finally {
      setLoadingPix(false)
    }
  }

  const handleCopyPix = () => {
    if (!pixData?.qrCode) return
    navigator.clipboard.writeText(pixData.qrCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleConfirmPaidVote = () => {
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
      setPixData(null)
    }, 1500)
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
            Vote com auditoria cívica (R$ 1,00 via Pix) nas principais pautas e compartilhe com sua rede.
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
                  >
                    <Share2 className="h-3 w-3" /> WhatsApp
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
                  {userChoice === "yes" ? "Voto Confirmado (Sim)" : "Votar Sim — R$ 1,00"}
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
                  {userChoice === "no" ? "Voto Confirmado (Não)" : "Votar Não — R$ 1,00"}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* MODAL PIX REAL DE R$ 1,00 */}
      {pendingVote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setPendingVote(null)
                setPixData(null)
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {confirmed ? (
              <div className="flex flex-col items-center py-8 text-center">
                <Check className="h-16 w-16 text-emerald-400 mb-3" />
                <h3 className="text-xl font-bold text-white">Voto Auditado com Sucesso!</h3>
                <p className="text-xs text-slate-400 mt-1">Seu voto foi computado na apuração oficial.</p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white">Taxa Cívica — Pagamento via Pix</h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">"{pendingVote.debateTitle}"</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                      pendingVote.side === "yes"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    Voto Selecionado: {pendingVote.side === "yes" ? "SIM" : "NÃO"}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-white/10 mb-4">
                  <span className="text-xs text-slate-400">Valor do Voto Auditado:</span>
                  <span className="text-base font-black text-emerald-400">R$ 1,00</span>
                </div>

                {loadingPix ? (
                  <div className="flex flex-col items-center justify-center py-10 gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                    <p className="text-xs text-slate-400">Gerando QR Code Pix oficial...</p>
                  </div>
                ) : pixData ? (
                  <div className="flex flex-col items-center">
                    {pixData.qrCodeBase64 ? (
                      <img
                        src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                        alt="QR Code Pix"
                        className="h-44 w-44 rounded-xl border-4 border-white bg-white p-1 mb-3"
                      />
                    ) : (
                      <div className="flex h-44 w-44 items-center justify-center rounded-xl bg-slate-800 border border-white/10 mb-3">
                        <QrCode className="h-16 w-16 text-slate-400" />
                      </div>
                    )}

                    <p className="text-[11px] text-slate-400 text-center mb-3">
                      Escaneie com seu banco ou copie o código Pix abaixo:
                    </p>

                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs border border-white/10 mb-3 transition"
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Código Pix Copiado com Sucesso!" : "Copiar Código Pix (Copia e Cola)"}
                    </button>

                    <button
                      type="button"
                      onClick={handleConfirmPaidVote}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs shadow-lg transition text-center"
                    >
                      Já Efetuei o Pix — Confirmar Meu Voto
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-rose-400 mb-3">{errorMessage}</p>
                    <button
                      type="button"
                      onClick={() => handleOpenPaywall({ id: pendingVote.debateId, title: pendingVote.debateTitle } as any, pendingVote.side)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg font-bold"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
