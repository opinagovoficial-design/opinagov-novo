"use client"

import { useEffect, useMemo, useState } from "react"
import { Check, Copy, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FakeQrCode } from "@/components/fake-qr-code"
import type { VoteSide } from "@/lib/poll-data"

type Step = "form" | "payment" | "success"

function generateKey() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let out = ""
  for (let i = 0; i < 32; i++) {
    if (i > 0 && i % 8 === 0) out += "-"
    out += chars[Math.floor(Math.random() * chars.length)]
  }
  return out
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function VoteModal({
  side,
  onClose,
  onConfirm,
}: {
  side: VoteSide
  onClose: () => void
  onConfirm: (data: { name: string; city: string; message: string; side: VoteSide }) => void
}) {
  const [step, setStep] = useState<Step>("form")
  const [name, setName] = useState("")
  const [document, setDocument] = useState("")
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(600)

  const paymentKey = useMemo(() => generateKey(), [])
  const isSim = side === "sim"
  const accent = isSim ? "emerald" : "red"

  useEffect(() => {
    if (step !== "payment") return
    if (secondsLeft <= 0) return
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [step, secondsLeft])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleConfirmPayment = () => {
    onConfirm({ name: name.trim() || "Anônimo", city: "Sua cidade", message: message.trim(), side })
    setStep("success")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Confirmar participação no tópico"
        className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        {step === "form" && (
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 p-5 sm:p-6">
            <div className="pr-8">
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
                  isSim ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                }`}
              >
                Opinião: {isSim ? "A favor" : "Contra"}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">
                Confirmar participação no tópico
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Preencha seus dados para validar sua participação única.
              </p>
            </div>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-slate-700">Nome do participante</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-slate-700">Documento de identificação</span>
              <input
                required
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder="Ex.: RG ou CPF"
                className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-slate-700">
                Mensagem para o mural <span className="font-normal text-slate-400">(opcional)</span>
              </span>
              <textarea
                value={message}
                maxLength={280}
                rows={3}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Deixe sua opinião para a comunidade"
                className="resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none transition-colors focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
              <span className="text-right text-xs text-slate-400">{message.length}/280</span>
            </label>

            <Button
              type="submit"
              className={`h-11 w-full rounded-xl text-white ${
                isSim ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Prosseguir para validação digital
            </Button>
          </form>
        )}

        {step === "payment" && (
          <div className="flex flex-col items-center gap-4 p-5 text-center sm:p-6">
            <div className="pr-8">
              <h2 className="text-lg font-semibold text-slate-900">Validação digital</h2>
              <p className="mt-1 text-sm text-slate-500">
                Escaneie o QR Code de simulação ou copie a chave abaixo.
              </p>
            </div>

            <FakeQrCode seed={paymentKey} />

            <div className="w-full">
              <p className="mb-1.5 text-left text-xs font-medium text-slate-500">Chave de validação</p>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <code className="flex-1 truncate px-1 text-left text-xs text-slate-700">
                  {paymentKey}
                </code>
                <Button
                  type="button"
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="shrink-0 border-slate-200"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-600" aria-hidden="true" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden="true" />
                      Copiar código
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white">
              <span className="text-slate-300">Expira em</span>
              <span className="tabular-nums">{formatTime(secondsLeft)}</span>
            </div>

            <Button
              type="button"
              onClick={handleConfirmPayment}
              disabled={secondsLeft === 0}
              className={`h-11 w-full rounded-xl text-white ${
                isSim ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Já validei minha participação
            </Button>
            <p className="text-xs text-slate-400">
              Demonstração — nenhum valor é cobrado. Clique acima para simular a confirmação.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-50">
              <Check className="size-7 text-emerald-600" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Participação confirmada!</h2>
              <p className="mt-1 text-sm text-slate-500">
                Seu voto <strong>{isSim ? "SIM" : "NÃO"}</strong> foi registrado e sua mensagem
                publicada no mural comunitário.
              </p>
            </div>

            {message.trim() && (
              <blockquote className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 text-left text-sm text-slate-600">
                {message.trim()}
              </blockquote>
            )}

            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 rounded-xl border-slate-200"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    typeof window !== "undefined" ? window.location.href : "",
                  )
                }}
              >
                <Share2 className="size-4" aria-hidden="true" />
                Compartilhar link
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="h-11 flex-1 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
              >
                Concluir
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
