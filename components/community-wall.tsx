"use client"

import Image from "next/image"
import { BadgeCheck } from "lucide-react"
import { colorStyles, type Candidate, type Comment } from "@/lib/poll-data"

export function CommunityWall({
  comments,
  candidates,
}: {
  comments: Comment[]
  candidates: Candidate[]
}) {
  const byId = new Map(candidates.map((c) => [c.id, c]))

  return (
    <section aria-labelledby="wall-title" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
          Cobranças diretas
        </span>
        <h2 id="wall-title" className="text-2xl font-bold tracking-tight text-white">
          Mural de recados aos representantes
        </h2>
        <p className="text-sm text-slate-400">
          Mensagens públicas de quem já declarou apoio a um candidato.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {comments.map((comment) => {
          const candidate = byId.get(comment.candidateId)
          const c = candidate ? colorStyles[candidate.color] : colorStyles.emerald
          return (
            <li
              key={comment.id}
              className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4"
            >
              <div className="flex flex-col items-center gap-1.5 pt-0.5">
                <div className={`relative size-11 overflow-hidden rounded-full ring-2 ${c.ring}`}>
                  <Image
                    src={candidate?.photo || "/placeholder.svg"}
                    alt={candidate ? `Apoia ${candidate.name}` : "Candidato"}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-500">Apoia</span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="font-semibold text-white">{comment.author}</span>
                  <span className="text-xs text-slate-500">{comment.city}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                    <BadgeCheck className="size-3" aria-hidden="true" />
                    Participação Confirmada
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{comment.message}</p>
                {candidate && (
                  <p className={`mt-2 text-xs font-medium ${c.text}`}>{candidate.name}</p>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

