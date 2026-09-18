"use client"

import { useState } from "react"
import { ShieldCheck, X, QrCode, AlertCircle, Loader2 } from "lucide-react"
import { type Candidate } from "@/lib/poll-data"
import { PixCheckoutCard } from "./pix-checkout-card"

interface VoteModalProps {
  candidate: Candidate | null
  onClose: () => void
  onConfirm: (data: { name: string; message: string }) => void
}

export function VoteModal({ candidate, onClose, onConfirm }: VoteModalProps) {
  const [loading, setLoading] = useState(false)
  const [voterName, setVoterName] = useState("")
  const [voterMessage, setVoterMessage] = useState("")
  const [pixData, setPixData] = useState<{
    qrCode: string
    qrCodeBase64: string
    paymentId?: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!candidate) return null

  const handleGeneratePix = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1.0,
          description: `Taxa de Auditoria e Validação Cívica - ${candidate.ballotName || candidate.name} (${candidate.party} #${candidate.ballotNumber})`,
          candidateId: candidate.id,
        }),
      })

      if (!res.ok) {
        throw new Error("Não foi possível gerar a cobrança Pix.")
      }

      const data = await res.json()
      setPixData(data)
    } catch (err: any) {
      setError(err?.message || "Falha ao conectar com o gateway de liquidação.")
    } finally {
      setLoading(false)
    }
  }

  const handleFinish = () => {
    onConfirm({
      name: voterName.trim() || "Eleitor Auditado",
      message: voterMessage.trim() || "Voto validado via protocolo de auditoria cívica.",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold text-sm">
          <ShieldCheck className="h-5 w-5" />
          <span>Auditoria e Validação Cívica</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-1">
          Confirmar Voto em {candidate.ballotName || candidate.name}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {candidate.role} • {candidate.party} #{candidate.ballotNumber}
        </p>

        {!pixData ? (
          <form onSubmit={handleGeneratePix} className="space-y-3">
            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">Seu Nome / Apelido Cívico</label>
              <input
                type="text"
                placeholder="Ex: Cidadão Consciente"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-300 font-medium mb-1">Mensagem de Apoio (Opcional)</label>
              <input
                type="text"
                placeholder="Ex: Pela renovação e transparência!"
                value={voterMessage}
                onChange={(e) => setVoterMessage(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-xs text-cyan-200">
              <p className="font-semibold mb-0.5">Taxa de Auditoria e Validação Cívica: R$ 1,00</p>
              <p className="text-[10px] text-cyan-300/80">
                Protocolo estrito para mitigar robôs e certificar a autenticidade da manifestação popular.
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 py-3 text-xs font-bold text-white transition disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Gerando Protocolo Pix...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4" /> Emitir Chave Pix (R$ 1,00)
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <PixCheckoutCard
              qrCode={pixData.qrCode}
              qrCodeBase64={pixData.qrCodeBase64}
              amount={1.0}
              onConfirm={handleFinish}
            />
          </div>
        )}
      </div>
    </div>
  )
}