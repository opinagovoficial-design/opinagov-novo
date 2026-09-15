"use client"

import { useState, useEffect } from "react"
import { SplashReveal } from "../components/splash-reveal"
import { LiveTicker } from "../components/live-ticker"
import { CommunityTicker } from "../components/community-ticker"
import { SiteHeader } from "../components/site-header"
import { LeadershipPanel } from "../components/leadership-panel"
import { VoteModal } from "../components/vote-modal"
import { CommunityWall } from "../components/community-wall"
import { DebatesSection } from "../components/debates-section"
import { LiveVoteToast } from "../components/live-vote-toast"
import {
  initialCandidates,
  initialComments,
  initialDebates,
  type Candidate,
  type Comment,
  type Debate,
} from "../lib/poll-data"
import {
  PlusCircle,
  X,
  ShieldCheck,
  Megaphone,
  Share2,
  CheckCircle2,
  Upload,
  ExternalLink,
  Copy,
  Loader2,
  QrCode,
  Calendar,
} from "lucide-react"

interface ActiveBanner {
  imageUrl: string
  targetUrl: string
  title: string
  expiresAt: number
}

export default function Page() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [debates, setDebates] = useState<Debate[]>(initialDebates)
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null)

  // Banner Ativo de 40 dias
  const [activeBanner, setActiveBanner] = useState<ActiveBanner | null>(null)

  // Modais
  const [showCreateDebate, setShowCreateDebate] = useState(false)
  const [showAdModal, setShowAdModal] = useState(false)
  const [debateCreatedSuccess, setDebateCreatedSuccess] = useState<Debate | null>(null)

  // Formulário Duelo
  const [newTitle, setNewTitle] = useState("")
  const [newCategory, setNewCategory] = useState("Economia")

  // Formulário Anúncio 40 Dias
  const [adStep, setAdStep] = useState<"form" | "pix" | "success">("form")
  const [adTitle, setAdTitle] = useState("")
  const [adTargetUrl, setAdTargetUrl] = useState("")
  const [adImagePreview, setAdImagePreview] = useState("")
  const [loadingPix, setLoadingPix] = useState(false)
  const [pixData, setPixData] = useState<{ qrCode: string; qrCodeBase64?: string } | null>(null)
  const [pixCopied, setPixCopied] = useState(false)

  useEffect(() => {
    try {
      const savedBanner = localStorage.getItem("opinagov_active_banner")
      if (savedBanner) {
        const parsed: ActiveBanner = JSON.parse(savedBanner)
        if (parsed.expiresAt > Date.now()) {
          setActiveBanner(parsed)
        } else {
          localStorage.removeItem("opinagov_active_banner")
        }
      }
    } catch {}
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setAdImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleProceedToPix = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adImagePreview) return

    setAdStep("pix")
    setLoadingPix(true)
    setPixCopied(false)

    try {
      const res = await fetch("/api/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1000.0,
          description: `Anuncio Master 40 Dias - ${adTitle || "Banner"}`,
        }),
      })
      const data = await res.json()
      if (res.ok && data.qrCode) {
        setPixData({ qrCode: data.qrCode, qrCodeBase64: data.qrCodeBase64 })
      }
    } catch {
      // Fallback
    } finally {
      setLoadingPix(false)
    }
  }

  const handleConfirmBannerPaid = () => {
    const days40InMs = 40 * 24 * 60 * 60 * 1000
    const newBanner: ActiveBanner = {
      imageUrl: adImagePreview,
      targetUrl: adTargetUrl.startsWith("http") ? adTargetUrl : `https://${adTargetUrl || "opinagov.com.br"}`,
      title: adTitle || "Espaço Patrocinado",
      expiresAt: Date.now() + days40InMs,
    }

    setActiveBanner(newBanner)
    try {
      localStorage.setItem("opinagov_active_banner", JSON.stringify(newBanner))
    } catch {}

    setAdStep("success")
    setTimeout(() => {
      setShowAdModal(false)
      setAdStep("form")
      setAdTitle("")
      setAdTargetUrl("")
      setAdImagePreview("")
      setPixData(null)
    }, 2000)
  }

  const handleCopyPix = () => {
    if (!pixData?.qrCode) return
    navigator.clipboard.writeText(pixData.qrCode)
    setPixCopied(true)
    setTimeout(() => setPixCopied(false), 2500)
  }

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

  const daysLeft = activeBanner
    ? Math.max(1, Math.ceil((activeBanner.expiresAt - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      <SplashReveal />
      <LiveTicker />
      <SiteHeader onCreate={() => setShowCreateDebate(true)} />
      <CommunityTicker />

      <main className="relative pb-24">
        {/* BANNER DINÂMICO DE 40 DIAS OU CHAMADA */}
        <div className="max-w-5xl mx-auto px-4 my-6">
          {activeBanner ? (
            <div className="relative group overflow-hidden rounded-2xl border border-amber-500/40 bg-slate-900 shadow-2xl">
              <a
                href={activeBanner.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <img
                  src={activeBanner.imageUrl}
                  alt={activeBanner.title}
                  className="w-full h-36 sm:h-44 object-cover object-center transition duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex items-end justify-between p-4">
                  <div>
                    <span className="bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                      Patrocinador Oficial
                    </span>
                    <h4 className="text-white font-bold text-sm sm:text-base mt-1 drop-shadow-md">
                      {activeBanner.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs text-amber-300 font-bold">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{daysLeft} dias restantes</span>
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </div>
                </div>
              </a>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-4 shadow-xl flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider">
                  Espaço Patrocinado Master
                </span>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  Suba seu banner exclusivo e anuncie com link direto por <strong>40 dias seguidos</strong> para milhares de eleitores.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAdModal(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg transition ml-auto flex items-center gap-1.5"
              >
                <Megaphone className="h-3.5 w-3.5" />
                Subir Meu Banner — R$ 1.000 (40 Dias)
              </button>
            </div>
          )}
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

      {activeCandidate && (
        <VoteModal
          candidate={activeCandidate}
          onClose={() => setActiveCandidate(null)}
          onConfirm={handleConfirmVote}
        />
      )}

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
                      placeholder="Ex: Reforma tributária deve ser ampliada?"
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

      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setShowAdModal(false)
                setAdStep("form")
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {adStep === "form" && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Megaphone className="h-5 w-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Publicar Banner Patrocinado</h3>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  Envie sua arte e link. O banner entra no ar imediatamente após o Pix e fica visível por <strong>40 dias</strong>.
                </p>

                <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-3.5 mb-4 text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tempo de Veiculação:</span>
                    <strong className="text-white text-sm">40 Dias em Destaque Fixo</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Valor Promocional:</span>
                    <strong className="text-amber-400 text-base font-black">R$ 1.000,00</strong>
                  </div>
                </div>

                <form onSubmit={handleProceedToPix} className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Título / Nome da Empresa
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Minha Empresa / Candidatura"
                      value={adTitle}
                      onChange={(e) => setAdTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Link de Destino (Site ou WhatsApp)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="https://seu-site.com.br ou https://wa.me/..."
                      value={adTargetUrl}
                      onChange={(e) => setAdTargetUrl(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-medium mb-1">
                      Arte do Banner (Formato Retangular)
                    </label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 hover:border-amber-400/60 rounded-xl p-4 cursor-pointer bg-white/5 transition">
                      {adImagePreview ? (
                        <div className="w-full">
                          <img
                            src={adImagePreview}
                            alt="Prévia do Banner"
                            className="w-full h-28 object-cover rounded-lg mb-2"
                          />
                          <span className="text-[11px] text-amber-400 font-bold block text-center">
                            Clique para trocar a imagem
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1.5 py-2">
                          <Upload className="h-7 w-7 text-amber-400" />
                          <span className="text-xs font-semibold text-white">Clique para selecionar o banner</span>
                          <span className="text-[10px] text-slate-400">PNG, JPG ou WEBP (até 5MB)</span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        required={!adImagePreview}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs transition shadow-lg mt-2"
                  >
                    Prosseguir para Pagamento Pix (R$ 1.000,00)
                  </button>
                </form>
              </div>
            )}

            {adStep === "pix" && (
              <div>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-white">Pagamento Pix — Banner 40 Dias</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Após o pagamento, o seu banner entrará no ar imediatamente.
                  </p>
                </div>

                <div className="flex items-center justify-between bg-slate-950 p-3.5 rounded-xl border border-white/10 mb-4">
                  <span className="text-xs text-slate-400">Valor Total:</span>
                  <span className="text-lg font-black text-amber-400">R$ 1.000,00</span>
                </div>

                {loadingPix ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
                    <p className="text-xs text-slate-400">Gerando cobrança Pix...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    {pixData?.qrCodeBase64 ? (
                      <img
                        src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                        alt="QR Code Pix"
                        className="h-44 w-44 rounded-xl border-4 border-white bg-white p-1 mb-3"
                      />
                    ) : (
                      <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-slate-800 border border-white/10 mb-3">
                        <QrCode className="h-16 w-16 text-slate-400" />
                      </div>
                    )}

                    {pixData?.qrCode && (
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs border border-white/10 mb-3 transition"
                      >
                        <Copy className="h-4 w-4" />
                        {pixCopied ? "Código Pix Copiado!" : "Copiar Código Pix (Copia e Cola)"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleConfirmBannerPaid}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg transition text-center"
                    >
                      Já Efetuei o Pix — Ativar Banner no Site por 40 Dias
                    </button>
                  </div>
                )}
              </div>
            )}

            {adStep === "success" && (
              <div className="text-center py-8">
                <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-white">Banner Ativado com Sucesso!</h3>
                <p className="text-xs text-slate-300 mt-2">
                  Sua campanha já está em exibição no topo do OpinaGov e permanecerá ativa pelos próximos <strong>40 dias</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <LiveVoteToast />
    </div>
  )
}
