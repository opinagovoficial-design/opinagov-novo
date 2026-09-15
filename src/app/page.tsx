"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
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

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [debates, setDebates] = useState<Debate[]>(initialDebates)
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)

  const handleConfirm = (data: { name: string; message: string }) => {
    if (!activeCandidate) return
    const candidateId = activeCandidate.id

    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, votes: c.votes + 1 } : c)),
    )

    if (data.message) {
      setComments((prev) => [
        {
          id: `c-${Date.now()}`,
          author: data.name,
          city: "Sua cidade",
          candidateId,
          message: data.message,
        },
        ...prev,
      ])
    }
  }

  const handleDebateVote = (debateId: string, side: "yes" | "no") => {
    setDebates((prev) =>
      prev.map((d) =>
        d.id === debateId
          ? {
              ...d,
              yesVotes: side === "yes" ? d.yesVotes + 1 : d.yesVotes,
              noVotes: side === "no" ? d.noVotes + 1 : d.noVotes,
            }
          : d,
      ),
    )
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-white">
      <SplashReveal />

      <div
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(50% 40% at 15% 0%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(50% 40% at 85% 5%, rgba(56,189,248,0.10), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="og-app-in relative">
        <LiveTicker />
        <SiteHeader onCreate={() => setActiveCandidate(candidates[0] || null)} />

        <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12">
<div id="banner-anuncio" className="max-w-5xl mx-auto px-4 my-4"><div className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-4 text-center text-xs text-slate-300 shadow-lg"><span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold mr-2 uppercase tracking-wide">Espaço Oficial</span>Participe do debate democrático transparente. Análise em tempo real de votos e propostas auditadas.</div></div>
          <LeadershipPanel candidates={candidates} onVote={setActiveCandidate} />
          <DebatesSection
            debates={debates}
            onCreate={() => setActiveCandidate(candidates[0] || null)}
            onVote={handleDebateVote}
          />
          <CommunityWall comments={comments} candidates={candidates} />
        </main>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500 sm:px-6">
            OpinaGov — Painel Oficial de Lideran├ºas. Demonstra├º├úo sem processamento de pagamento
            real.
          </div>
        </footer>
      </div>

      <button
        type="button"
        onClick={() => setActiveCandidate(candidates[0] || null)}
        className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-slate-950/80 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/10 backdrop-blur-xl transition-all hover:border-emerald-400/40 hover:bg-slate-900/90"
      >
        <span className="flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950">
          <Plus className="size-4" aria-hidden="true" />
        </span>
        Iniciar Nova Consulta Cívica
      </button>

      {activeCandidate && (
        <VoteModal
          candidate={activeCandidate}
          onClose={() => setActiveCandidate(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}


