import Link from "next/link"
import { ArrowLeft, ShieldCheck, Heart, Copy } from "lucide-react"

export default function DoacoesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao Painel Cívico
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Apoio Independente</h1>
            <p className="text-xs text-slate-400">OpinaGov — Plataforma Cívica</p>
          </div>
        </div>

        <div className="bg-slate-950/70 rounded-xl p-4 border border-white/5 text-xs text-slate-300 leading-relaxed mb-5">
          O OpinaGov é mantido de forma 100% autônoma, sem recursos partidários. Sua contribuição voluntária ajuda a custear servidores, segurança contra ataques DDoS e auditoria contínua dos dados.
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Doação Voluntária via Pix</span>
          </div>
          <p className="text-xs text-slate-300">
            Qualquer valor voluntário fortalece a transparência dos debates populares.
          </p>
        </div>

        <Link
          href="/"
          className="block w-full py-3 text-center bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition shadow-lg"
        >
          Retornar às Votações e Duelos
        </Link>
      </div>
    </main>
  )
}
