"use client"

import { useState } from "react"
import { X, CheckCircle2, Copy } from "lucide-react"
import { type Candidate } from "@/lib/poll-data"

interface VoteModalProps {
  candidate: Candidate | null
  onClose: () => void
  onConfirm: (data: { name: string; message: string }) => void
}

export function VoteModal({ candidate, onClose, onConfirm }: VoteModalProps) {
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [voterName, setVoterName] = useState("")
  const [message, setMessage] = useState("")

  if (!candidate) return null

  const pixPayload = "00020126580014br.gov.bcb.pix0136apoio-opinagov-202652040000530398654041.005802BR5913OPINAGOV6009SAO PAULO62070503***6304E2CA"

  const handleCopy = () => {
    navigator.clipboard.writeText(pixPayload)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm({ name: voterName || "Eleitor Anônimo", message })
    setConfirmed(true)
    setTimeout(() => {
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {confirmed ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-3" />
            <h3 className="text-xl font-bold text-white">Apoio Registrado!</h3>
            <p className="text-xs text-slate-400 mt-1">Seu voto e comprovante foram validados no painel.</p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">Declarar Apoio Oficial</h3>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                Candidato(a): {candidate.name} ({candidate.party})
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 bg-slate-950/60 p-4 rounded-xl border border-white/5">
              <div className="bg-white p-2.5 rounded-lg shadow">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014br.gov.bcb.pix0136apoio-opinagov-202652040000530398654041.005802BR5913OPINAGOV6009SAO%20PAULO62070503***6304E2CA"
                  alt="QR Code Pix"
                  className="w-32 h-32"
                />
              </div>
              <div className="text-center">
                <span className="text-xs font-semibold text-emerald-400">Taxa cívica de R$ 1,00</span>
                <p className="text-[11px] text-slate-400">Escaneie o QR Code acima ou use o Copia e Cola:</p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Código Pix Copiado!" : "Copiar Código Pix"}
              </button>
            </div>

            <form onSubmit={handleFinalize} className="mt-4 flex flex-col gap-2.5">
              <input
                type="text"
                placeholder="Seu nome ou apelido (opcional)"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
              <input
                type="text"
                placeholder="Deixe um recado público de apoio..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="w-full mt-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition"
              >
                Já realizei o Pix — Confirmar Voto
              </button>
            </form>

            <p className="text-[10px] text-slate-500 text-center mt-3">
              Processamento seguro e auditado via Mercado Pago.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
