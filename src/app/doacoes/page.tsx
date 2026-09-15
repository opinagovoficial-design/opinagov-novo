"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  PlusCircle,
  Copy,
  Share2,
  QrCode,
  DollarSign,
  TrendingUp,
  Sparkles,
  Users,
  X,
} from "lucide-react"

interface Demand {
  id: string
  title: string
  category: string
  description: string
  supporters: number
  raised: number
  goal: number
}

const communityTickerTopics = [
  { text: "Preservação das Águas e Nascentes da Amazônia", count: "+1.280 apoiadores", tag: "Meio Ambiente" },
  { text: "UTI Neonatal no Hospital Regional do Norte", count: "+3.420 apoiadores", tag: "Saúde Pública" },
  { text: "Resgate e Castração Emergencial Animal", count: "+890 apoiadores", tag: "Causa Animal" },
  { text: "Auditoria Cívica Popular e Infraestrutura Antifraude", count: "+4.150 apoiadores", tag: "Transparência" },
  { text: "Distribuição de Cestas Básicas nas Periferias", count: "+2.110 apoiadores", tag: "Social" },
]

const initialDemands: Demand[] = [
  {
    id: "dem-1",
    title: "SOS Amazônia & Proteção de Bacias Hidrográficas",
    category: "Meio Ambiente",
    description: "Fiscalização comunitária, combate ao desmatamento e conservação de nascentes.",
    supporters: 1280,
    raised: 4850,
    goal: 10000,
  },
  {
    id: "dem-2",
    title: "Auditoria Cívica e Infraestrutura do OpinaGov",
    category: "Transparência",
    description: "Custos de proteção contra ataques DDoS, servidores dedicados e integridade dos votos.",
    supporters: 3410,
    raised: 8920,
    goal: 15000,
  },
  {
    id: "dem-3",
    title: "Equipamentos para Unidades de Saúde Comunitárias",
    category: "Saúde",
    description: "Aquisição direta de itens essenciais e apoio a centros de triagem regional.",
    supporters: 940,
    raised: 3100,
    goal: 8000,
  },
]

export default function DoacoesPage() {
  const [demands, setDemands] = useState<Demand[]>(initialDemands)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null)

  // Formulário de Criação
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Meio Ambiente")
  const [newDesc, setNewDesc] = useState("")

  // Doação Pix
  const [donationAmount, setDonationAmount] = useState("10")
  const [copied, setCopied] = useState(false)

  // Chave Pix Centralizada da Plataforma
  const centralPixKey = "contato@opinagov.com.br"

  useEffect(() => {
    try {
      const saved = localStorage.getItem("opinagov_custom_demands")
      if (saved) {
        setDemands([...initialDemands, ...JSON.parse(saved)])
      }
    } catch {}
  }, [])

  const handleCreateDemand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const item: Demand = {
      id: `dem-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim() || "Causa cívica cadastrada por cidadão participativo.",
      supporters: 1,
      raised: 0,
      goal: 5000,
    }

    const updated = [item, ...demands]
    setDemands(updated)

    try {
      const customs = updated.filter((d) => !initialDemands.some((init) => init.id === d.id))
      localStorage.setItem("opinagov_custom_demands", JSON.stringify(customs))
    } catch {}

    setNewTitle("")
    setNewDesc("")
    setShowCreateModal(false)
  }

  const handleCopyPix = () => {
    navigator.clipboard.writeText(centralPixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleShareDemand = (demand: Demand) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://opinagov.vercel.app"
    const text = `🤝 *Demanda Cívica em Alta no OpinaGov*\n\n"${demand.title}"\n\nParticipe e apoie esta causa no canal oficial de auditoria popular:\n👉 ${origin}/doacoes`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank")
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20 selection:bg-cyan-500 selection:text-white">
      {/* BARRA DESLIZANTE DE INTERESSES EM TEMPO REAL */}
      <div className="w-full bg-cyan-950/40 border-b border-cyan-500/20 py-2.5 overflow-hidden backdrop-blur-md">
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase px-4 shrink-0">
            <Sparkles className="h-3.5 w-3.5" /> Pautas & Demandas da População:
          </div>
          {communityTickerTopics.concat(communityTickerTopics).map((t, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs shrink-0"
            >
              <span className="text-[10px] font-bold uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {t.tag}
              </span>
              <span className="text-white font-medium">{t.text}</span>
              <span className="text-[10px] text-slate-400 font-mono">({t.count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao Painel Cívico
          </Link>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <PlusCircle className="h-4 w-4" />
            Criar Nova Demanda / Causa
          </button>
        </div>

        {/* CABEÇALHO */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-md mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Central Cívica de Causas & Interesses Coletivos</h1>
              <p className="text-xs text-slate-400">OpinaGov — Gestão Financeira e Arrecadação Auditada</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            Toda arrecadação gerada passa pela conta institucional do OpinaGov para garantir auditoria, combate a fraudes e prestação de contas transparente antes da execução.
          </p>
        </div>

        {/* GRID DE CAUSAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demands.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md transition hover:border-white/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/5 text-cyan-300">
                    {d.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Users className="h-3 w-3" /> {d.supporters}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleShareDemand(d)}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <Share2 className="h-3 w-3" /> WhatsApp
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">{d.title}</h3>
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{d.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span>Arrecadado: <strong>R$ {d.raised.toLocaleString("pt-BR")}</strong></span>
                  <span className="text-slate-500 text-[10px]">Meta: R$ {d.goal.toLocaleString("pt-BR")}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800 mb-4">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((d.raised / d.goal) * 100))}%` }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDemand(d)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow flex items-center justify-center gap-1.5"
                >
                  <DollarSign className="h-3.5 w-3.5" />
                  Apoiar Demanda via Pix Oficial
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL NOVA CAUSA */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-lg font-bold text-white mb-1">Cadastrar Nova Causa de Interesse</h3>
              <p className="text-xs text-slate-400 mb-4">
                Proponha uma demanda coletiva, ambiental ou social para receber apoio público.
              </p>

              <form onSubmit={handleCreateDemand} className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">Título da Pauta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Doação de Alimentos e Apoio a Desabrigados"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">Área Temática</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Meio Ambiente">Meio Ambiente</option>
                    <option value="Saúde Pública">Saúde Pública</option>
                    <option value="Causa Animal">Causa Animal</option>
                    <option value="Transparência">Transparência</option>
                    <option value="Social">Social</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">Justificativa e Impacto</label>
                  <textarea
                    rows={3}
                    placeholder="Explique como esse apoio fará a diferença..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                  O controle financeiro e a prestação de contas são centralizados pela equipe OpinaGov.
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-lg mt-1"
                >
                  Publicar Demanda no Mural
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL PIX OFICIAL */}
        {selectedDemand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
            <div className="relative w-full max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl text-center">
              <button
                type="button"
                onClick={() => setSelectedDemand(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-block mb-2">
                Chave Oficial do OpinaGov
              </span>
              <h3 className="text-lg font-bold text-white mb-1">Apoio Financeiro à Causa</h3>
              <p className="text-xs text-slate-300 mb-4 font-medium">"{selectedDemand.title}"</p>

              <div className="grid grid-cols-4 gap-2 mb-4">
                {["5", "10", "25", "50"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDonationAmount(v)}
                    className={`py-2 rounded-lg text-xs font-bold border transition ${
                      donationAmount === v
                        ? "bg-emerald-600 border-emerald-400 text-white shadow"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    R$ {v}
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center bg-slate-950 p-4 rounded-xl border border-white/10 mb-4">
                <QrCode className="h-16 w-16 text-emerald-400 mb-2" />
                <span className="text-[11px] text-slate-400 mb-1">Chave Pix Centralizadora:</span>
                <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded select-all">
                  {centralPixKey}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyPix}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-white/10 mb-3 transition flex items-center justify-center gap-2"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Chave Pix Copiada com Sucesso!" : "Copiar Chave Pix Oficial"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedDemand(null)
                  alert("Contribuição registrada! O OpinaGov agradece pelo seu apoio à causa.")
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg transition"
              >
                Já Fiz a Doação — Registrar Apoio
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
