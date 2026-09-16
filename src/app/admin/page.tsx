"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ShieldAlert,
  Lock,
  LogOut,
  PlusCircle,
  Trash2,
  CheckCircle,
  Megaphone,
  UserPlus,
  MessageSquare,
  Flame,
  ArrowLeft,
} from "lucide-react"
import {
  initialCandidates,
  initialDebates,
  initialComments,
  type Candidate,
  type Debate,
  type Comment,
} from "@/lib/poll-data"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inputPassword, setInputPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  // Estados de Gerenciamento
  const [activeTab, setActiveTab] = useState<"debates" | "candidates" | "banners" | "comments">("debates")
  const [debates, setDebates] = useState<Debate[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [comments, setComments] = useState<Comment[]>([])

  // Formulário de Novo Duelo Gratuito
  const [debateTitle, setDebateTitle] = useState("")
  const [debateCategory, setDebateCategory] = useState("Economia")

  // Formulário de Novo Candidato
  const [candName, setCandName] = useState("")
  const [candRole, setCandRole] = useState("Presidência da República")
  const [candParty, setCandParty] = useState("")
  const [candNumber, setCandNumber] = useState("")
  const [candColor, setCandColor] = useState("#009b3a")

  // Formulário de Banner Manual
  const [bannerTitle, setBannerTitle] = useState("")
  const [bannerUrl, setBannerUrl] = useState("")
  const [bannerImg, setBannerImg] = useState("")

  useEffect(() => {
    const isAuth = sessionStorage.getItem("opinagov_admin_auth")
    if (isAuth === "true") {
      setIsAuthenticated(true)
      loadAllData()
    }
  }, [])

  const loadAllData = () => {
    try {
      const storedDebates = localStorage.getItem("opinagov_debates")
      setDebates(storedDebates ? JSON.parse(storedDebates) : initialDebates)

      const storedCandidates = localStorage.getItem("opinagov_candidates")
      setCandidates(storedCandidates ? JSON.parse(storedCandidates) : initialCandidates)

      const storedComments = localStorage.getItem("opinagov_comments")
      setComments(storedComments ? JSON.parse(storedComments) : initialComments)
    } catch {
      setDebates(initialDebates)
      setCandidates(initialCandidates)
      setComments(initialComments)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputPassword === "Chefedoopinagov") {
      setIsAuthenticated(true)
      sessionStorage.setItem("opinagov_admin_auth", "true")
      setErrorMsg("")
      loadAllData()
    } else {
      setErrorMsg("Senha de Administrador incorreta.")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("opinagov_admin_auth")
    setIsAuthenticated(false)
    setInputPassword("")
  }

  // --- Ações de Debates ---
  const handleCreateDebateAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!debateTitle.trim()) return

    const newDeb: Debate = {
      id: `deb-${Date.now()}`,
      title: debateTitle.trim(),
      category: debateCategory,
      replies: 0,
      trending: true,
      yesVotes: 1,
      noVotes: 0,
    }

    const updated = [newDeb, ...debates]
    setDebates(updated)
    localStorage.setItem("opinagov_debates", JSON.stringify(updated))
    setDebateTitle("")
    alert("Duelo cívico criado e publicado instantaneamente sem custo!")
  }

  const handleDeleteDebate = (id: string) => {
    if (!confirm("Deseja realmente apagar este duelo do site?")) return
    const updated = debates.filter((d) => d.id !== id)
    setDebates(updated)
    localStorage.setItem("opinagov_debates", JSON.stringify(updated))
  }

  // --- Ações de Candidatos ---
  const handleCreateCandidate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!candName.trim()) return

    const newCand: Candidate = {
      id: `c-${Date.now()}`,
      name: candName.trim(),
      role: candRole,
      party: candParty.trim() || "INDEPENDENTE",
      ballotName: candName.trim(),
      demands: [],
      ballotNumber: candNumber.trim() || "00",
      votes: 1,
            color: candColor,
                }

    const updated = [newCand, ...candidates]
    setCandidates(updated)
    localStorage.setItem("opinagov_candidates", JSON.stringify(updated))
    setCandName("")
    setCandParty("")
    setCandNumber("")
    alert("Candidato/Cargo adicionado com sucesso!")
  }

  const handleDeleteCandidate = (id: string) => {
    if (!confirm("Deseja realmente remover este candidato do painel?")) return
    const updated = candidates.filter((c) => c.id !== id)
    setCandidates(updated)
    localStorage.setItem("opinagov_candidates", JSON.stringify(updated))
  }

  // --- Ações de Banners ---
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bannerImg.trim()) return

    const bannerObj = {
      imageUrl: bannerImg.trim(),
      targetUrl: bannerUrl.trim() || "https://opinagov.com.br",
      title: bannerTitle.trim() || "Espaço Patrocinado",
      expiresAt: Date.now() + 40 * 24 * 60 * 60 * 1000,
    }

    localStorage.setItem("opinagov_active_banner", JSON.stringify(bannerObj))
    alert("Banner ativado manualmente no topo do site por 40 dias!")
  }

  const handleRemoveBanner = () => {
    if (!confirm("Deseja desativar o banner atual do topo do site?")) return
    localStorage.removeItem("opinagov_active_banner")
    alert("Banner removido!")
  }

  // --- Ações de Mural ---
  const handleDeleteComment = (id: string) => {
    const updated = comments.filter((c) => c.id !== id)
    setComments(updated)
    localStorage.setItem("opinagov_comments", JSON.stringify(updated))
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mx-auto mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold text-center text-white mb-1">Painel Master de Controle</h1>
          <p className="text-xs text-slate-400 text-center mb-6">OpinaGov — Administração Central</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-slate-300 font-medium mb-1">Senha de Administrador</label>
              <input
                type="password"
                required
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="Digite a senha mestra..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
              />
            </div>

            {errorMsg && <p className="text-xs text-rose-400 text-center">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs transition shadow-lg mt-1"
            >
              Acessar Painel
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition">
              ← Retornar ao Site Público
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Topo do Painel */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-white/10 hover:border-cyan-500/50 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                Painel Master de Gestão <ShieldAlert className="h-5 w-5 text-cyan-400" />
              </h1>
              <p className="text-xs text-slate-400">Controle total sobre duelos, votações, enquetes e banners</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" /> Sair
          </button>
        </div>

        {/* Abas de Navegação */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto">
          {[
            { id: "debates", label: "Duelos & Consultas", icon: Flame },
            { id: "candidates", label: "Candidatos & Cargos", icon: UserPlus },
            { id: "banners", label: "Banners (40 Dias)", icon: Megaphone },
            { id: "comments", label: "Mural & Comentários", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                  active
                    ? "bg-cyan-600 text-white shadow-lg"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ABA 1: DUELOS E DEBATES */}
        {activeTab === "debates" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-emerald-400" /> Criar Novo Duelo Grátis
              </h2>
              <p className="text-xs text-slate-400 mb-4">Publica no site sem precisar pagar R$ 10 via Pix.</p>

              <form onSubmit={handleCreateDebateAdmin} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">Tema / Pergunta</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Privatização do metrô deve avançar?"
                    value={debateTitle}
                    onChange={(e) => setDebateTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">Categoria</label>
                  <select
                    value={debateCategory}
                    onChange={(e) => setDebateCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
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
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition shadow mt-2"
                >
                  Publicar Duelo Agora
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900 p-5">
              <h2 className="text-sm font-bold text-white mb-4">Duelos Ativos no Site ({debates.length})</h2>
              <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                {debates.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-white/5"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-cyan-400 block mb-0.5">
                        {d.category}
                      </span>
                      <p className="text-xs text-white font-medium">{d.title}</p>
                      <span className="text-[10px] text-slate-400">
                        Sim: {d.yesVotes} | Não: {d.noVotes}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteDebate(d.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      title="Apagar Duelo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: CANDIDATOS E CARGOS */}
        {activeTab === "candidates" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-cyan-400" /> Adicionar Candidato / Cargo
              </h2>
              <p className="text-xs text-slate-400 mb-4">Crie novos nomes para a disputa popular.</p>

              <form onSubmit={handleCreateCandidate} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">Nome Completo / Urna</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Romeu Zema"
                    value={candName}
                    onChange={(e) => setCandName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-300 font-medium mb-1">Cargo Político</label>
                  <select
                    value={candRole}
                    onChange={(e) => setCandRole(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Presidência da República">Presidência da República</option>
                    <option value="Governo Estadual">Governo Estadual</option>
                    <option value="Senado Federal">Senado Federal</option>
                    <option value="Câmara dos Deputados">Câmara dos Deputados</option>
                    <option value="Prefeitura">Prefeitura</option>
                    <option value="Câmara Municipal">Câmara Municipal</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] text-slate-300 font-medium mb-1">Partido</label>
                    <input
                      type="text"
                      placeholder="Ex: NOVO"
                      value={candParty}
                      onChange={(e) => setCandParty(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-300 font-medium mb-1">Número</label>
                    <input
                      type="text"
                      placeholder="Ex: 30"
                      value={candNumber}
                      onChange={(e) => setCandNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition shadow mt-2"
                >
                  Salvar Candidato
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-slate-900 p-5">
              <h2 className="text-sm font-bold text-white mb-4">Candidatos Cadastrados ({candidates.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                {candidates.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{c.name}</h4>
                      <span className="text-[10px] text-cyan-400 block">{c.role}</span>
                      <span className="text-[10px] text-slate-500">
                        {c.party} #{c.ballotNumber} • {c.votes.toLocaleString()} votos
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteCandidate(c.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                      title="Remover Candidato"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: BANNERS DE 40 DIAS */}
        {activeTab === "banners" && (
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 max-w-xl mx-auto">
            <h2 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Megaphone className="h-4 w-4 text-amber-400" /> Ativar Banner de 40 Dias Manualmente
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Coloque qualquer banner no topo do site sem passar pelo pagamento Pix de R$ 1.000.
            </p>

            <form onSubmit={handleSaveBanner} className="flex flex-col gap-3">
              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">Título do Anunciante</label>
                <input
                  type="text"
                  placeholder="Ex: Minha Empresa / Campanha"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">Link de Destino</label>
                <input
                  type="text"
                  placeholder="https://wa.me/... ou https://seusite.com"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-medium mb-1">URL da Imagem do Banner</label>
                <input
                  type="text"
                  required
                  placeholder="Cole o link da imagem (ou data URL)..."
                  value={bannerImg}
                  onChange={(e) => setBannerImg(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-xs transition shadow"
                >
                  Ativar Banner por 40 Dias
                </button>
                <button
                  type="button"
                  onClick={handleRemoveBanner}
                  className="px-3 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-lg text-xs transition border border-rose-500/30"
                >
                  Desativar Banner
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ABA 4: MURAL E COMENTÁRIOS */}
        {activeTab === "comments" && (
          <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
            <h2 className="text-sm font-bold text-white mb-4">Moderação de Comentários do Mural ({comments.length})</h2>
            <div className="flex flex-col gap-2.5 max-h-[500px] overflow-y-auto pr-1">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-white/5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{c.author}</span>
                      <span className="text-[10px] text-slate-500">{c.city} • {c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">"{c.message}"</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteComment(c.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition shrink-0"
                    title="Excluir Comentário"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}





