"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { LeadershipPanel } from "@/components/leadership-panel"
import { VoteModal } from "@/components/vote-modal"
import { CommunityWall } from "@/components/community-wall"
import { DebatesSection } from "@/components/debates-section"
import {
  initialCandidates,
  initialComments,
  initialDebates,
  type Candidate,
  type Comment,
  type Debate,
} from "@/lib/poll-data"

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
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader onCreate={() => setActiveCandidate(candidates[0])} />

      <main className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-8 sm:px-6 sm:py-12">
        <LeadershipPanel candidates={candidates} onVote={setActiveCandidate} />
        <DebatesSection
          debates={debates}
          onCreate={() => setActiveCandidate(candidates[0])}
          onVote={handleDebateVote}
        />
        <CommunityWall comments={comments} candidates={candidates} />
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500 sm:px-6">
          OpinaGov — Painel de Lideranças e Demandas. Demonstração sem processamento de pagamento
          real.
        </div>
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
