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

  const handleGoToDebates = () => {
    const el = document.getElementById("debates")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
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
      <SiteHeader onCreate={handleGoToDebates} />

      <main className="relative pb-24">
        <div id="banner-anuncio" className="max-w-5xl mx-auto px-4 my-4">
          <div className="w-full bg-slate-900 border border-cyan-500/30 rounded-xl p-3.5 text-center text-xs text-slate-300 shadow-lg flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wide">
                Painel Cívico
              </span>
              <span>Auditoria e dados eleitorais atualizados em tempo real.</span>
            </div>
            <a href="/doacoes" className="text-cyan-400 hover:text-cyan-300 underline font-semibold text-xs ml-auto">
              Apoie este projeto independente →
            </a>
          </div>
        </div>

        <LeadershipPanel candidates={candidates} onVote={(cand) => setActiveCandidate(cand)} />

        <div id="debates">
          <DebatesSection
            debates={debates}
            onCreate={handleGoToDebates}
            onVote={handleDebateVote}
          />
        </div>

        <CommunityWall comments={comments} candidates={candidates} />
      </main>

      <footer className="border-t border-white/10 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>OpinaGov — Painel Cívico Independente e Auditado.</p>
      </footer>

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
