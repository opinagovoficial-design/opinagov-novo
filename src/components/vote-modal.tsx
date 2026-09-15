"use client"

import { useState } from "react"
import { X, ShieldCheck, Share2, CheckCircle2, Copy, Loader2, QrCode } from "lucide-react"
import { type Candidate } from "@/lib/poll-data"

interface VoteModalProps {
  candidate: Candidate | null
  onClose: () => void
  onConfirm: (data: { name: string; message: string }) => void
}

export function VoteModal({ candidate, onClose, onConfirm }: VoteModalProps) {
  const [voterName, setVoterName] = useState("")
  const [message, setMessage] = useState("")
  const [step, setStep] = useState<"form" | "pix" | "share">("form")

  // Estados Pix
  const [loadingPix, setLoadingPix] = useState(false)
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeBase64?: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  if (!candidate) return null

  const handleGeneratePix = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep("pix")
    setLoadingPix(true)
    setPixData(null)
    setCopied(false)
    setErrorMessage("")

    try {
      const res = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1.0,
          description: `Voto Candidato: ${candidate.ballotName || candidate.name} - ${candidate.ballotNumber}`,
        }),
      })

      const data = await res.json()
      if (res.ok && data.qrCode) {
        setPixData({ qrCode: data.qrCode, qrCodeBase64: data.qrCodeBase64 })
      } else {
        setErrorMessage(data.error || "Erro ao conectar com o gateway Pix.")
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

  const handleConfirmPayment = () => {
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

        {/* ETAPA 1: FORMULÁRIO */}
        {step === "form" && (
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

            <form onSubmit={handleGeneratePix} className="flex flex-col gap-2.5">
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
                Gerar Pagamento Pix (R$ 1,00)
              </button>
            </form>
          </div>
        )}

        {/* ETAPA 2: QR CODE PIX REAL & COPIA E COLA */}
        {step === "pix" && (
          <div>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-white">Pagamento Pix — Apoio Oficial</h3>
              <p className="text-xs text-cyan-400 font-semibold mt-0.5">
                {candidate.name} ({candidate.party} #{candidate.ballotNumber})
              </p>
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-xl border border-white/10 mb-4">
              <span className="text-xs text-slate-400">Valor da Taxa Cívica:</span>
              <span className="text-base font-black text-emerald-400">R$ 1,00</span>
            </div>

            {loadingPix ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                <p className="text-xs text-slate-400">Gerando cobrança Pix oficial...</p>
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
                  Aponte a câmera do seu banco ou use o Copia e Cola abaixo:
                </p>

                <button
                  type="button"
                  onClick={handleCopyPix}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs border border-white/10 mb-3 transition"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Código Pix Copiado!" : "Copiar Código Pix (Copia e Cola)"}
                </button>

                <button
                  type="button"
                  onClick={handleConfirmPayment}
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
                  onClick={() => setStep("form")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded-lg font-bold"
                >
                  Voltar e Tentar Novamente
                </button>
              </div>
            )}
          </div>
        )}

        {/* ETAPA 3: COMPARTILHAMENTO OBRIGATÓRIO */}
        {step === "share" && (
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
