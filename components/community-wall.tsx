"use client"

import { BadgeCheck } from "lucide-react"
import type { Comment } from "@/lib/poll-data"

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function CommunityWall({ comments }: { comments: Comment[] }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">Mural comunitário</h2>
        <span className="text-sm text-slate-500">{comments.length} opiniões</span>
      </div>

      <ul className="flex flex-col gap-3">
        {comments.map((c) => {
          const isSim = c.side === "sim"
          return (
            <li
              key={c.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                  {initials(c.author)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-semibold text-slate-900">{c.author}</p>
                    <span className="text-xs text-slate-400">·</span>
                    <p className="text-xs text-slate-500">{c.city}</p>
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${
                        isSim ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                      }`}
                    >
                      Opinião: {isSim ? "A favor" : "Contra"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{c.message}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    Participação verificada
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
