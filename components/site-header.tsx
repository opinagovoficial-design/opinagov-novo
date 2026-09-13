"use client"

import { MessagesSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader({ onCreatePoll }: { onCreatePoll: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-slate-900 text-white">
            <MessagesSquare className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-slate-900">Tribuna Debate</p>
            <p className="hidden text-xs text-slate-500 sm:block">Enquetes e fórum da cidade</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-600 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            1.250 participantes ativos hoje
          </span>
          <Button
            onClick={onCreatePoll}
            size="lg"
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            <Plus className="size-4" aria-hidden="true" />
            Criar Enquete
          </Button>
        </div>
      </div>
    </header>
  )
}
