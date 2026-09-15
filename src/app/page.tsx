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
import { PlusCircle, X } from "lucide-react"

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [debates, setDebates] = useState<Debate[]>(initialDebates)
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)
  const [showCreateDebate, setShowCreateDebate] = useState(false)
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
    setNewTitle("")
    setShowCreateDebate(false)

    const el = document.getElementById("debates")
    if (el) el.scrollIntoView({ behavior: "smooth" })
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
        {/* Banner de Anúncio / Espaço Patrocinado */}
        <div className="max-w-5xl mx-auto px-4 my-6">
          <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider">
                Anúncio Cívico
              </span>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                Espaço para divulgação institucional e iniciativas de transparência pública. Análise auditada de dados.
              </p>
            </div>
            <a
              href="/doacoes"
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition ml-auto"
            >
              Apoiar Projeto Independente
            </a>
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

      {/* Modal de Apoio / Voto */}
      {activeCandidate && (
        <VoteModal
          candidate={activeCandidate}
          onClose={() => setActiveCandidate(null)}
          onConfirm={handleConfirmVote}
        />
      )}

      {/* Modal de Criar Duelo */}
      {showCreateDebate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowCreateDebate(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <PlusCircle className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Criar Nova Consulta Cívica</h3>
            </div>

            <form onSubmit={handleCreateDebateSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Qual é a pauta ou pergunta do duelo?</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Reforma tributária deve focar na redução sobre o consumo?"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Categoria Temática</label>
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
                className="mt-2 w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition"
              >
                Publicar Consulta Aberta
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
