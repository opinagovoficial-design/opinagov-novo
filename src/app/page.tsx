"use client"

import { useState } from "react"
import { SplashReveal } from "../components/splash-reveal"
import { LiveTicker } from "../components/live-ticker"
import { SiteHeader } from "../components/site-header"
import { LeadershipPanel } from "../components/leadership-panel"
import { VoteModal } from "../components/vote-modal"
import { CommunityWall } from "../components/community-wall"
import { DebatesSection } from "../components/debates-section"
import {
  initialCandidates,
  initialComments,
  initialDebates,
  type Candidate,
  type Comment,
  type Debate,
} from "../lib/poll-data"
import { PlusCircle, X, ShieldCheck, Megaphone, Share2, CheckCircle2 } from "lucide-react"

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [debates, setDebates] = useState<Debate[]>(initialDebates)
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)

  // Modais de Criação e Monetização
  const [showCreateDebate, setShowCreateDebate] = useState(false)
  const [showAdModal, setShowAdModal] = useState(false)
  const [debateCreatedSuccess, setDebateCreatedSuccess] = useState<Debate | null>(null)

  // Formulário de Duelo
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Economia")

  const handleConfirmVote = (data: { name: string; message: string }) => {
    if (!activeCandidate) return
    const candidateId = activeCandidate.id

    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, votes: c.votes + 1 } : c)),
    )

    if (data.message) {
      const newComment: Comment = {
        id: `c-${Date.now()}`,
        author: data.name || "Eleitor Verificado",
        city: "Brasil",
        candidateId,
        message: data.message,
        timestamp: "Agora",
      }
      setComments((prev) => [newComment, ...prev])
    }

    setActiveCandidate(null)
  }

  const handleCreateDebateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newDebate: Debate = {
      id: `deb-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      replies: 0,
      trending: true,
      yesVotes: 1,
      noVotes: 0,
    }

    setDebates((prev) => [newDebate, ...prev])
    setDebateCreatedSuccess(newDebate)
  }

  const handleFinishDebateCreation = () => {
    setNewTitle("")
    setDebateCreatedSuccess(null)
    setShowCreateDebate(false)
    const el = document.getElementById("debates")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const handleShareNewDebate = (debate: Debate) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://opinagov.vercel.app"
    const text = `🔥 *Criei uma Nova Consulta no OpinaGov!*\n\n"${debate.title}"\n\nParticipe e dê seu voto auditado agora:\n👉 ${origin}#debates`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank")
  }

  const handleDebateVote = (debateId: string, side: "yes" | "no") => {
    setDebates((prev) =>
      prev.map((d) => {
        if (d.id !== debateId) return d
        return {
          ...d,
          yesVotes: side === "yes" ? d.yesVotes + 1 : d.yesVotes,
          noVotes: side === "no" ? d.noVotes + 1 : d.noVotes,
        }
      }),
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      <SplashReveal />
      <LiveTicker />
      <SiteHeader onCreate={() => setShowCreateDebate(true)} />

      <main className="relative pb-24">
        {/* Banner de Anúncio / Espaço Patrocinado R$ 1.000,00 */}
        <div className="max-w-5xl mx-auto px-4 my-6">
          <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider">
                Espaço Patrocinado
              </span>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Divulgue sua marca, candidatura ou instituição para milhares de eleitores ativos em todo o Brasil.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAdModal(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition ml-auto flex items-center gap-1.5"
            >
              <Megaphone className="h-3.5 w-3.5" />
              Anunciar Aqui — R$ 1.000
            </button>
          </div>
        </div>

        <LeadershipPanel candidates={candidates} onVote={(cand) => setActiveCandidate(cand)} />

        <div id="debates" className="mt-8">
          <DebatesSection
            debates={debates}
            onCreate={() => setShowCreateDebate(true)}
            onVote={handleDebateVote}
          />
        </div>

        <CommunityWall comments={comments} candidates={candidates} />
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>OpinaGov — Painel Cívico Independente e Auditado.</p>
      </footer>

      {/* Modal de Apoio / Candidato */}
      {activeCandidate && (
        <VoteModal
          candidate={activeCandidate}
          onClose={() => setActiveCandidate(null)}
          onConfirm={handleConfirmVote}
        />
      )}

      {/* Modal Criar Duelo (R$ 10,00) */}
      {showCreateDebate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setShowCreateDebate(false)
                setDebateCreatedSuccess(null)
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {debateCreatedSuccess ? (
              <div className="text-center py-4">
                <CheckCircle2 className="h-14 w-14 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">Duelo Publicado com Sucesso!</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Taxa de moderação de R$ 10,00 validada. Convide seus amigos para votarem Sim ou Não:
                </p>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-white/10 mb-4 text-left">
                  <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                    {debateCreatedSuccess.category}
                  </span>
                  <p className="text-xs text-white font-medium">"{debateCreatedSuccess.title}"</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => handleShareNewDebate(debateCreatedSuccess)}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartilhar no WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleFinishDebateCreation}
                    className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold rounded-lg text-xs transition"
                  >
                    Ver no Painel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <PlusCircle className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Criar Novo Duelo Cívico</h3>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Abra uma votação pública de Sim/Não para debate nacional.
                </p>

                <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-emerald-500/20 mb-4">
                  <ShieldCheck className="h-8 w-8 text-emerald-400 shrink-0" />
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white block">Taxa de Moderação: R$ 10,00</span>
                    Mecanismo anti-spam para validação imediata da pauta no ar.
                  </div>
                </div>

                <form onSubmit={handleCreateDebateSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Pergunta ou Tema do Duelo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Privatização de rodovias federais deve ser acelerada?"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Categoria Temática</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                    >
                      <option value="Economia">Economia</option>
                      <option value="Segurança">Segurança</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Educação">Educação</option>
                      <option value="Meio Ambiente">Meio Ambiente</option>
                      <option value="Reforma Política">Reforma Política</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow-lg flex items-center justify-center gap-1.5"
                  >
                    Publicar Duelo — R$ 10,00
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Anúncio Corporativo (R$ 1.000,00) */}
      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-amber-500/30 bg-slate-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowAdModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Megaphone className="h-5 w-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Espaço Publicitário Master</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Destaque sua marca no topo da plataforma de auditoria eleitoral mais engajada do país.
            </p>

            <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">Veiculação:</span>
                <span className="text-xs font-bold text-white">30 Dias em Destaque Fixo</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">Alcance Estimado:</span>
                <span className="text-xs font-bold text-emerald-400">+500.000 visualizações</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-slate-300">Valor do Anúncio:</span>
                <span className="text-base font-black text-amber-400">R$ 1.000,00</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const msg = encodeURIComponent("Olá! Gostaria de reservar o espaço publicitário de R$ 1.000,00 no OpinaGov.")
                  window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank")
                }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-lg text-xs transition shadow-lg text-center"
              >
                Contratar Espaço Via WhatsApp
              </button>
              <p className="text-[10px] text-slate-500 text-center">
                Atendimento direto com o departamento comercial do OpinaGov.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
