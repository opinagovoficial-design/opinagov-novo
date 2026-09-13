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
    name: "Helena Marques",
    role: "Prefeitura Municipal",
    party: "MDR · 15",
    photo: "/candidates/candidate-1.png",
    votes: 18520,
    color: "emerald",
    demands: [
      { icon: "health", label: "Saúde integrada 24h" },
      { icon: "transport", label: "Transporte gratuito" },
      { icon: "education", label: "Creche em tempo integral" },
    ],
  },
  {
    id: "cand-2",
    name: "Paulo Rezende",
    role: "Prefeitura Municipal",
    party: "PSC · 40",
    photo: "/candidates/candidate-2.png",
    votes: 15340,
    color: "sky",
    demands: [
      { icon: "money", label: "Redução de taxas" },
      { icon: "work", label: "Apoio ao pequeno negócio" },
      { icon: "security", label: "Guarda municipal ampliada" },
    ],
  },
  {
    id: "cand-3",
    name: "Diego Antunes",
    role: "Prefeitura Municipal",
    party: "REDE · 18",
    photo: "/candidates/candidate-3.png",
    votes: 12760,
    color: "amber",
    demands: [
      { icon: "environment", label: "Cidade mais verde" },
      { icon: "transport", label: "Ciclovias conectadas" },
      { icon: "housing", label: "Moradia popular" },
    ],
  },
  {
    id: "cand-4",
    name: "Renata Villas",
    role: "Prefeitura Municipal",
    party: "PDT · 12",
    photo: "/candidates/candidate-4.png",
    votes: 9880,
    color: "violet",
    demands: [
      { icon: "education", label: "Escola em tempo integral" },
      { icon: "health", label: "Postos de bairro" },
      { icon: "work", label: "Qualificação profissional" },
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
