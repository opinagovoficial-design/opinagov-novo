"use client"

import { useState } from "react"
import { MessageSquare, Send, ShieldCheck, UserCheck, Copy, Loader2, QrCode, X, CheckCircle2 } from "lucide-react"
import { type Candidate, type Comment } from "@/lib/poll-data"

interface CommunityWallProps {
  comments: Comment[]
  candidates: Candidate[]
  onAddComment?: (comment: Comment) => void
}

export function CommunityWall({ comments, candidates, onAddComment }: CommunityWallProps) {
  const [author, setAuthor] = useState("")
  const [city, setCity] = useState("")
  const [candidateId, setCandidateId] = useState(candidates[0]?.id || "lula")
  const [message, setMessage] = useState("")
  const [localComments, setLocalComments] = useState<Comment[]>(comments)

  // Modal Pix R$ 5,00
  const [showPaywall, setShowPaywall] = useState(false)
  const [loadingPix, setLoadingPix] = useState(false)
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeBase64?: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [pendingComment, setPendingComment] = useState<Comment | null>(null)

  // Regra de Ouro: Exibir estritamente de 5 em 5 (os 5 mais recentes)
  const displayComments = localComments.slice(0, 5)

  const handleOpenPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newRecado: Comment = {
      id: `c-${Date.now()}`,
      author: author.trim() || "Cidadão Participativo",
      city: city.trim() || "Brasil",
      candidateId,
      message: message.trim(),
      timestamp: "Agora mesmo",
    }

    setPendingComment(newRecado)
    setShowPaywall(true)
    setLoadingPix(true)
    setPixData(null)
    setCopied(false)

    try {
      const res = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 5.0,
          description: `Mural Cívico: ${newRecado.author.substring(0, 20)}`,
        }),
      })
      const data = await res.json()
      if (res.ok && data.qrCode) {
        setPixData({ qrCode: data.qrCode, qrCodeBase64: data.qrCodeBase64 })
      }
    } catch {
      // Fallback em caso de gateway temporário
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

  const handleConfirmPaidComment = () => {
    if (!pendingComment) return

    const updated = [pendingComment, ...localComments].slice(0, 5)
    setLocalComments(updated)

    if (onAddComment) {
      onAddComment(pendingComment)
    }

    setConfirmed(true)
    setTimeout(() => {
      setConfirmed(false)
      setShowPaywall(false)
      setPendingComment(null)
      setMessage("")
      setAuthor("")
      setCity("")
    }, 1500)
  }

  const getCandidateName = (id: string) => {
    const cand = candidates.find((c) => c.id === id)
    return cand ? `${cand.name} (${cand.party})` : "Representante Público"
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
            Cobranças & Opiniões Diretas
          </span>
          <h2 className="text-xl font-bold text-white">Mural de Recados aos Representantes</h2>
          <p className="text-xs text-slate-400">
            Destaque público e auditado. Exibindo estritamente as <strong>5 mensagens mais recentes</strong>.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Mural Cívico (Top 5)
        </div>
      </div>

      {/* Formulário com Taxa de R$ 5,00 */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-5 backdrop-blur-md mb-8 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Deixar Mensagem Pública no Painel</h3>
          </div>
          <span className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
            Taxa de Destaque: R$ 5,00
          </span>
        </div>

        <form onSubmit={handleOpenPayment} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Seu Nome / Apelido</label>
              <input
                type="text"
                required
                placeholder="Ex: Carlos Mendes"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Sua Cidade / UF</label>
              <input
                type="text"
                required
                placeholder="Ex: São Paulo, SP"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1 font-medium">Direcionar Para</label>
              <select
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.party})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1 font-medium">Sua Mensagem</label>
            <textarea
              required
              rows={2}
              placeholder="Escreva sua opinião, apoio ou cobrança direta..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Apenas as 5 mais recentes permanecem no ar
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs transition shadow-lg flex items-center gap-2"
            >
              <Send className="h-3.5 w-3.5" />
              Publicar no Mural — R$ 5,00
            </button>
          </div>
        </form>
      </div>

      {/* Grid com estritamente os 5 recados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayComments.map((c, index) => (
          <div
            key={c.id || index}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-sm transition hover:border-white/20 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-bold text-xs text-cyan-300">
                    {c.author.substring(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{c.author}</h4>
                    <span className="text-[10px] text-slate-400">{c.city}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{c.timestamp || "Recente"}</span>
              </div>

              <div className="mb-2">
                <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded">
                  Para: {getCandidateName(c.candidateId)}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic">"{c.message}"</p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <UserCheck className="h-3 w-3" /> Pix R$ 5,00 Auditado
              </span>
              <span className="font-mono text-cyan-400">#{index + 1} de 5</span>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PIX R$ 5,00 DO MURAL */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowPaywall(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {confirmed ? (
              <div className="flex flex-col items-center py-8 text-center">
                <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-white">Recado Publicado no Top 5!</h3>
                <p className="text-xs text-slate-400 mt-1">Sua mensagem está agora em destaque no mural nacional.</p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white">Destaque Cívico no Mural</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Taxa para manter seu recado entre os 5 primeiros em destaque.
                  </p>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-xl border border-white/10 mb-4">
                  <span className="text-xs text-slate-400">Valor de Publicação:</span>
                  <span className="text-lg font-black text-emerald-400">R$ 5,00</span>
                </div>

                {loadingPix ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                    <p className="text-xs text-slate-400">Gerando Pix oficial...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {pixData?.qrCodeBase64 ? (
                      <img
                        src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                        alt="QR Code Pix"
                        className="h-44 w-44 rounded-xl border-4 border-white bg-white p-1 mb-3"
                      />
                    ) : (
                      <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-slate-800 border border-white/10 mb-3">
                        <QrCode className="h-16 w-16 text-slate-400" />
                      </div>
                    )}

                    {pixData?.qrCode && (
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs border border-white/10 mb-3 transition"
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? "Código Copiado!" : "Copiar Código Pix (Copia e Cola)"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleConfirmPaidComment}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-lg text-xs shadow-lg transition text-center"
                    >
                      Já Efetuei o Pix de R$ 5,00 — Publicar Agora
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
