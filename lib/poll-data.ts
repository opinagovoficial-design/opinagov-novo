export type Candidate = {
  id: string
  name: string
  role: string
  party: string
  photo: string
  votes: number
  /** Tailwind color token used for bars and accents, e.g. "emerald" */
  color: CandidateColor
  demands: { icon: DemandIcon; label: string }[]
}

export type CandidateColor = "emerald" | "sky" | "amber" | "violet"

export type DemandIcon =
  | "health"
  | "transport"
  | "money"
  | "education"
  | "security"
  | "housing"
  | "environment"
  | "work"

export type Comment = {
  id: string
  author: string
  city: string
  candidateId: string
  message: string
}

export type Debate = {
  id: string
  category: string
  title: string
  yesVotes: number
  noVotes: number
}

/** Fixed color styles per candidate token — avoids dynamic Tailwind class names. */
export const colorStyles: Record<
  CandidateColor,
  { bar: string; text: string; soft: string; ring: string; dot: string; button: string }
> = {
  emerald: {
    bar: "bg-emerald-500",
    text: "text-emerald-400",
    soft: "bg-emerald-500/10 text-emerald-300",
    ring: "ring-emerald-500/40",
    dot: "bg-emerald-500",
    button: "bg-emerald-500 hover:bg-emerald-400 text-emerald-950",
  },
  sky: {
    bar: "bg-sky-500",
    text: "text-sky-400",
    soft: "bg-sky-500/10 text-sky-300",
    ring: "ring-sky-500/40",
    dot: "bg-sky-500",
    button: "bg-sky-500 hover:bg-sky-400 text-sky-950",
  },
  amber: {
    bar: "bg-amber-500",
    text: "text-amber-400",
    soft: "bg-amber-500/10 text-amber-300",
    ring: "ring-amber-500/40",
    dot: "bg-amber-500",
    button: "bg-amber-500 hover:bg-amber-400 text-amber-950",
  },
  violet: {
    bar: "bg-violet-500",
    text: "text-violet-400",
    soft: "bg-violet-500/10 text-violet-300",
    ring: "ring-violet-500/40",
    dot: "bg-violet-500",
    button: "bg-violet-500 hover:bg-violet-400 text-violet-950",
  },
}

export const initialCandidates: Candidate[] = [
  {
    id: "cand-1",
    name: "Luiz Inácio Lula da Silva",
    role: "Presidência da República",
    party: "PT · 13",
    photo: "/candidates/candidate-1.png",
    votes: 15840,
    color: "emerald",
    demands: [
      { icon: "work", label: "Ampliação do PAC" },
      { icon: "money", label: "Isenção de IR até R$ 5 mil" },
      { icon: "environment", label: "Transição Ecológica" },
    ],
  },
  {
    id: "cand-2",
    name: "Tarcísio de Freitas",
    role: "Presidência da República",
    party: "Republicanos · 10",
    photo: "/candidates/candidate-2.png",
    votes: 15120,
    color: "sky",
    demands: [
      { icon: "money", label: "Privatizações estatais" },
      { icon: "transport", label: "Choque de infraestrutura" },
      { icon: "work", label: "Redução da máquina" },
    ],
  },
  {
    id: "cand-3",
    name: "Ronaldo Caiado",
    role: "Presidência da República",
    party: "União Brasil · 44",
    photo: "/candidates/candidate-3.png",
    votes: 13060,
    color: "amber",
    demands: [
      { icon: "security", label: "Tolerância zero na segurança" },
      { icon: "work", label: "Expansão do agronegócio" },
      { icon: "money", label: "Descentralização de recursos" },
    ],
  },
  {
    id: "cand-4",
    name: "Simone Tebet",
    role: "Presidência da República",
    party: "MDB · 15",
    photo: "/candidates/candidate-4.png",
    votes: 12180,
    color: "violet",
    demands: [
      { icon: "money", label: "Responsabilidade fiscal" },
      { icon: "education", label: "Foco na primeira infância" },
      { icon: "work", label: "Reforma administrativa" },
    ],
  },
]

export const initialComments: Comment[] = [
  {
    id: "c1",
    author: "Marina Alves",
    city: "Porto Alegre, RS",
    candidateId: "cand-1",
    message:
      "Espero que a promessa de saúde 24h saia do papel. Vou cobrar isso durante todo o mandato.",
  },
  {
    id: "c2",
    author: "Ricardo Nunes",
    city: "Campinas, SP",
    candidateId: "cand-2",
    message:
      "Redução de taxas ajuda quem empreende. Mas quero ver plano concreto para o comércio de rua.",
  },
  {
    id: "c3",
    author: "Juliana Prado",
    city: "Fortaleza, CE",
    candidateId: "cand-3",
    message: "Ciclovias conectadas de verdade mudam a cidade. Conta com o meu apoio e a minha cobrança.",
  },
  {
    id: "c4",
    author: "Eduardo Lima",
    city: "Curitiba, PR",
    candidateId: "cand-1",
    message: "Creche em tempo integral é o que a periferia mais precisa. Fico de olho no cronograma.",
  },
]

export const initialDebates: Debate[] = [
  {
    id: "d1",
    category: "Mobilidade Urbana",
    title: "Ampliar a malha de ciclovias no centro da cidade?",
    yesVotes: 4213,
    noVotes: 1980,
  },
  {
    id: "d2",
    category: "Comércio e Cidade",
    title: "Liberar o comércio de rua aos domingos?",
    yesVotes: 3187,
    noVotes: 4402,
  },
  {
    id: "d3",
    category: "Segurança Pública",
    title: "Instalar câmeras inteligentes nas praças?",
    yesVotes: 5890,
    noVotes: 1240,
  },
]
