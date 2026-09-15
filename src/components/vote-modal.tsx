"use client"

import { useState } from "react"
import { X, ShieldCheck, Share2, CheckCircle2 } from "lucide-react"
import { type Candidate } from "@/lib/poll-data"

interface VoteModalProps {
  candidate: Candidate | null
  onClose: () => void
  onConfirm: (data: { name: string; message: string }) => void
}

export function VoteModal({ candidate, onClose, onConfirm }: VoteModalProps) {
  const [voterName, setVoterName] = useState("")
  const [message, setMessage] = useState("")
  const [step, setStep] = useState<"form" | "share">("form")

  if (!candidate) return null

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm({ name: voterName || "Eleitor Verificado", message })
    setStep("share")
  }

  const handleWhatsAppShare = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://opinagov.vercel.app"
    const text = `🚨 *URGENTE: CONSULTA POPULAR 2026*\n\nAcabei de registrar meu apoio auditado a *${candidate.name} (${candidate.party} #${candidate.ballotNumber})* no painel oficial do OpinaGov.\n\nA apuração está acontecendo em tempo real e a disputa está acirrada! Não deixe de manifestar a sua voz:\n\n👉 *Participe e vote agora:* ${origin}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "form" ? (
          <div>
            <div className="text-center mb-4">
              <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase mb-2">
                Auditoria Cívica Oficial
              </span>
              <h3 className="text-lg font-bold text-white">Declarar Apoio ao Candidato</h3>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                {candidate.name} ({candidate.party} #{candidate.ballotNumber})
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/70 p-3 rounded-xl border border-white/10 mb-4">
              <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-bold text-white block">Taxa de Validação: R$ 1,00</span>
                Mecanismo de proteção e integridade contra robôs e duplicação.
              </div>
            </div>

            <form onSubmit={handleNext} className="flex flex-col gap-2.5">
              <input
                type="text"
                placeholder="Seu nome ou apelido público"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
              />
              <textarea
                placeholder="Deixe uma cobrança ou mensagem ao candidato..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 resize-none"
              />
              <button
                type="submit"
                className="w-full mt-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs transition shadow-lg"
              >
                Confirmar e Validar Apoio Cívico
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-3">
            <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-white">Apoio Registrado com Sucesso!</h3>
            <p className="text-xs text-slate-300 mt-2 mb-5 leading-relaxed">
              Para autenticar sua manifestação no painel de transparência, <strong>compartilhe sua posição no WhatsApp</strong> e convoque mais eleitores.
            </p>

            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm transition shadow-xl flex items-center justify-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar no WhatsApp para Validar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
