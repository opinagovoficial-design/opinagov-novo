"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { FeaturedPoll } from "@/components/featured-poll"
import { VoteModal } from "@/components/vote-modal"
import { CommunityWall } from "@/components/community-wall"
import { SecondaryTopics } from "@/components/secondary-topics"
import { initialComments, secondaryTopics, type Comment, type VoteSide } from "@/lib/poll-data"

export default function Page() {
  const [simVotes, setSimVotes] = useState(8420)
  const [naoVotes, setNaoVotes] = useState(6190)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [activeSide, setActiveSide] = useState<VoteSide | null>(null)

  const handleConfirm = (data: {
    name: string
    city: string
    message: string
    side: VoteSide
  }) => {
    if (data.side === "sim") setSimVotes((v) => v + 1)
    else setNaoVotes((v) => v + 1)

    if (data.message) {
      setComments((prev) => [
        {
          id: `c-${Date.now()}`,
          author: data.name,
          city: data.city,
          side: data.side,
          message: data.message,
        },
        ...prev,
      ])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader onCreatePoll={() => setActiveSide("sim")} />

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 sm:px-6 sm:py-10">
        <FeaturedPoll simVotes={simVotes} naoVotes={naoVotes} onVote={setActiveSide} />
        <CommunityWall comments={comments} />
        <SecondaryTopics topics={secondaryTopics} />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-slate-400 sm:px-6">
          Tribuna Debate — plataforma comunitária de enquetes. Demonstração sem processamento de
          pagamento real.
        </div>
      </footer>

      {activeSide && (
        <VoteModal
          side={activeSide}
          onClose={() => setActiveSide(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
