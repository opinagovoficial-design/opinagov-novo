"use client"

import { useState, useEffect } from "react"
import { Copy, Check, ShieldCheck, Clock, Smartphone, ArrowRight, Lock } from "lucide-react"

interface PixCheckoutCardProps {
  amount: number
  qrCode?: string
  qrCodeBase64?: string
  description?: string
  onConfirm: () => void
  confirmButtonText?: string
}

export function PixCheckoutCard({
  amount,
  qrCode,
  qrCodeBase64,
  description,
  onConfirm,
  confirmButtonText = "Aguardando confirmação bancária...",
}: PixCheckoutCardProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutos

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

  const handleCopy = () => {
    if (!qrCode) return
    navigator.clipboard.writeText(qrCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Header do Checkout */}
      <div className="w-full bg-slate-950/80 rounded-xl p-3.5 border border-cyan-500/20 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-300">Auditoria Cívica Ativa</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          <Clock className="h-3 w-3" /> Expira em: {timeFormatted}
        </div>
      </div>

      {/* Caixa do QR Code estilizada */}
      <div className="relative flex flex-col items-center p-4 rounded-2xl bg-gradient-to-b from-white to-slate-100 shadow-2xl border-4 border-slate-800">
        {/* Cantos guias de scanner */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-600" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-600" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-600" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-600" />

        {qrCodeBase64 ? (
          <img
            src={`data:image/png;base64,${qrCodeBase64}`}
            alt="QR Code Pix"
            className="h-48 w-48 object-contain rounded-lg"
          />
        ) : (
          <div className="h-48 w-48 flex items-center justify-center text-slate-400 font-sans text-xs text-center p-4">
            Aponte o aplicativo do seu banco para o leitor
          </div>
        )}

        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-slate-800 tracking-wide">
          <Lock className="h-3 w-3 text-emerald-600" /> PIX • LIQUIDAÇÃO IMEDIATA
        </div>
      </div>

      {/* Valor e Descrição */}
      <div className="mt-4 text-center">
        <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Valor do Pagamento</span>
        <span className="text-2xl font-black text-emerald-400">
          R$ {amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </span>
        {description && (
          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 italic">{description}</p>
        )}
      </div>

      {/* Passo a Passo Rápido */}
      <div className="w-full grid grid-cols-3 gap-2 my-4 text-[10px] text-slate-400 text-center">
        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
          <Smartphone className="h-3.5 w-3.5 text-cyan-400 mx-auto mb-1" />
          <span>1. Abra o app do seu Banco</span>
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
          <Copy className="h-3.5 w-3.5 text-cyan-400 mx-auto mb-1" />
          <span>2. Copie e cole ou escaneie</span>
        </div>
        <div className="p-2 rounded-lg bg-white/5 border border-white/5">
          <Check className="h-3.5 w-3.5 text-emerald-400 mx-auto mb-1" />
          <span>3. Confirmação instantânea</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="w-full flex flex-col gap-2.5">
        {qrCode && (
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full py-3 rounded-xl text-xs font-bold transition border flex items-center justify-center gap-2 shadow ${
              copied
                ? "bg-emerald-600 border-emerald-500 text-white"
                : "bg-slate-800 hover:bg-slate-700 border-white/10 text-slate-200"
            }`}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Código Pix Copiado com Sucesso!" : "Copiar Código Pix (Copia e Cola)"}
          </button>
        )}

        <button
          type="button"
          onClick={onConfirm}
          className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
        >
          <span>{confirmButtonText}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
        <span>Ambiente criptografado com certificação de integridade</span>
      </div>
    </div>
  )
}

// Forcar deploy Vercel: 1789795556451