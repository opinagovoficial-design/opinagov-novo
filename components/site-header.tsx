"use client"

import { Landmark, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950">
            <Landmark className="size-5" aria-hidden="true" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight text-white">
              Opina<span className="text-emerald-400">Gov</span>
            </p>
            <p className="hidden text-xs text-slate-400 sm:block">
              Painel de Lideranças e Demandas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-400 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            1.250 cidadãos online agora
          </span>
          <Button
            onClick={onCreate}
            size="lg"
            className="bg-white text-slate-950 hover:bg-slate-200"
          >
            <Plus className="size-4" aria-hidden="true" />
            Criar Duelo
          </Button>
        </div>
      </div>
    </header>
  )
}

