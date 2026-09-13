"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { BadgeCheck, Check, Copy, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FakeQrCode } from "@/components/fake-qr-code"
import { colorStyles, type Candidate } from "@/lib/poll-data"

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

function maskCpf(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
}

export function VoteModal({
  candidate,
  onClose,
  onConfirm,
}: {
  candidate: Candidate
  onClose: () => void
  onConfirm: (data: { name: string; message: string }) => void
}) {
  const [step, setStep] = useState<Step>("form")
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(600)

  const paymentKey = useMemo(() => generateKey(), [])
  const c = colorStyles[candidate.color]

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
    onConfirm({ name: name.trim() || "Anônimo", message: message.trim() })
    setStep("success")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Declarar voto em ${candidate.name}`}
        className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-t-2xl border border-white/10 bg-slate-900 shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 p-5">
          <div className={`relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ${c.ring}`}>
            <Image
              src={candidate.photo || "/placeholder.svg"}
              alt={`Foto de ${candidate.name}`}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">Declarando voto em</p>
            <h2 className="truncate text-lg font-semibold text-white">{candidate.name}</h2>
            <span className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-medium ${c.soft}`}>
              {candidate.party}
            </span>
          </div>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmitForm} className="flex flex-col gap-4 p-5">
            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-slate-300">Nome completo</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="h-10 rounded-lg border border-white/10 bg-slate-950/50 px-3 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-white/30 focus:ring-2 focus:ring-white/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-slate-300">CPF</span>
              <input
                required
                inputMode="numeric"
                value={cpf}
                onChange={(e) => setCpf(maskCpf(e.target.value))}
                placeholder="000.000.000-00"
                className="h-10 rounded-lg border border-white/10 bg-slate-950/50 px-3 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-white/30 focus:ring-2 focus:ring-white/10"
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium text-slate-300">
                Cobrança ou apoio público{" "}
                <span className="font-normal text-slate-500">(opcional)</span>
              </span>
              <textarea
                value={message}
                maxLength={280}
                rows={3}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Deixe um recado público para ${candidate.name.split(" ")[0]}`}
                className="resize-none rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white placeholder:text-slate-500 outline-none transition-colors focus:border-white/30 focus:ring-2 focus:ring-white/10"
              />
              <span className="text-right text-xs text-slate-500">{message.length}/280</span>
            </label>

            <Button type="submit" className={`h-11 w-full rounded-xl font-semibold ${c.button}`}>
              Ir para pagamento Pix — R$ 1,00
            </Button>
          </form>
        )}

        {step === "payment" && (
          <div className="flex flex-col items-center gap-4 p-5 text-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Pagamento Pix</h3>
              <p className="mt-1 text-sm text-slate-400">
                Escaneie o QR Code de simulação ou copie o código Pix.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-3">
              <FakeQrCode seed={paymentKey} />
            </div>

            <div className="w-full">
              <p className="mb-1.5 text-left text-xs font-medium text-slate-400">
                Pix copia e cola
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/50 p-2">
                <code className="flex-1 truncate px-1 text-left text-xs text-slate-300">
                  {paymentKey}
                </code>
                <Button
                  type="button"
                  onClick={handleCopy}
                  size="sm"
                  variant="outline"
                  className="shrink-0 border-white/15 bg-transparent text-white hover:bg-white/10"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" aria-hidden="true" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white">
              <span className="text-slate-400">Expira em</span>
              <span className="tabular-nums">{formatTime(secondsLeft)}</span>
            </div>

            <Button
              type="button"
              onClick={handleConfirmPayment}
              disabled={secondsLeft === 0}
              className={`h-11 w-full rounded-xl font-semibold ${c.button}`}
            >
              Já paguei — confirmar voto
            </Button>
            <p className="text-xs text-slate-500">
              Demonstração — nenhum valor é cobrado e o Pix não é real.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15">
              <BadgeCheck className="size-7 text-emerald-400" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-white">Voto confirmado!</h3>
              <p className="mt-1 text-sm text-slate-400">
                Seu voto em <strong className="text-white">{candidate.name}</strong> foi registrado
                {message.trim() ? " e seu recado publicado no mural." : "."}
              </p>
            </div>

            {message.trim() && (
              <blockquote className="w-full rounded-lg border border-white/10 bg-slate-950/50 p-3 text-left text-sm text-slate-300">
                {message.trim()}
              </blockquote>
            )}

            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="h-11 flex-1 rounded-xl border-white/15 bg-transparent text-white hover:bg-white/10"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    typeof window !== "undefined" ? window.location.href : "",
                  )
                }}
              >
                <Share2 className="size-4" aria-hidden="true" />
                Compartilhar
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="h-11 flex-1 rounded-xl bg-white text-slate-950 hover:bg-slate-200"
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
