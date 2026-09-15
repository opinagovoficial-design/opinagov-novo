export type VoteSide = "yes" | "no"

export interface CandidateDemand {
  icon: string
  label: string
}

export interface Candidate {
  id: string
  name: string
  ballotName: string
  role: string
  party: string
  ballotNumber: string
  color: string
  votes: number
  photo?: string
  demands: CandidateDemand[]
}

export interface Comment {
  id: string
  author: string
  city: string
  candidateId: string
  message: string
  timestamp?: string
}

export interface Debate {
  id: string
  title: string
  category: string
  replies: number
  trending: boolean
  yesVotes: number
  noVotes: number
}

export interface SecondaryTopic {
  id: string
  title: string
  category: string
  votes: number
}

export const colorStyles: Record<
  string,
  { bg: string; bar: string; text: string; ring: string; dot: string }
> = {
  emerald: {
    bg: "bg-emerald-600",
    bar: "bg-emerald-500",
    text: "text-emerald-400",
    ring: "ring-emerald-500",
    dot: "bg-emerald-400",
  },
  sky: {
    bg: "bg-sky-600",
    bar: "bg-sky-500",
    text: "text-sky-400",
    ring: "ring-sky-500",
    dot: "bg-sky-400",
  },
  amber: {
    bg: "bg-amber-600",
    bar: "bg-amber-500",
    text: "text-amber-400",
    ring: "ring-amber-500",
    dot: "bg-amber-400",
  },
  orange: {
    bg: "bg-orange-600",
    bar: "bg-orange-500",
    text: "text-orange-400",
    ring: "ring-orange-500",
    dot: "bg-orange-400",
  },
  rose: {
    bg: "bg-rose-600",
    bar: "bg-rose-500",
    text: "text-rose-400",
    ring: "ring-rose-500",
    dot: "bg-rose-400",
  },
  violet: {
    bg: "bg-violet-600",
    bar: "bg-violet-500",
    text: "text-violet-400",
    ring: "ring-violet-500",
    dot: "bg-violet-400",
  },
  cyan: {
    bg: "bg-cyan-600",
    bar: "bg-cyan-500",
    text: "text-cyan-400",
    ring: "ring-cyan-500",
    dot: "bg-cyan-400",
  },
  lime: {
    bg: "bg-lime-600",
    bar: "bg-lime-500",
    text: "text-lime-400",
    ring: "ring-lime-500",
    dot: "bg-lime-400",
  },
}

export const initialCandidates: Candidate[] = [
  {
    id: "lula",
    name: "Luiz Inácio Lula da Silva",
    ballotName: "LULA",
    role: "Presidência da República",
    party: "BRASIL PRONTO PRA MAIS",
    ballotNumber: "13",
    color: "emerald",
    votes: 42100,
    photo: "",
    demands: [
      { icon: "health", label: "Fortalecimento do SUS e Políticas Sociais" },
      { icon: "work", label: "Geração de Emprego e Renda Básica" },
    ],
  },
  {
    id: "flavio-bolsonaro",
    name: "Flávio Nantes Bolsonaro",
    ballotName: "FLAVIO BOLSONARO",
    role: "Presidência da República",
    party: "PL",
    ballotNumber: "22",
    color: "sky",
    votes: 39400,
    photo: "",
    demands: [
      { icon: "security", label: "Ordem Pública e Apoio às Forças Policiais" },
      { icon: "money", label: "Liberdade Econômica e Redução do Estado" },
    ],
  },
  {
    id: "ronaldo-caiado",
    name: "Ronaldo Ramos Caiado",
    ballotName: "RONALDO CAIADO",
    role: "Presidência da República",
    party: "PSD",
    ballotNumber: "55",
    color: "amber",
    votes: 28900,
    photo: "",
    demands: [
      { icon: "security", label: "Tolerância Zero contra Facções Criminosas" },
      { icon: "money", label: "Gestão Fiscal e Eficiência Regional" },
    ],
  },
  {
    id: "romeu-zema",
    name: "Romeu Zema Neto",
    ballotName: "ZEMA",
    role: "Presidência da República",
    party: "NOVO",
    ballotNumber: "30",
    color: "orange",
    votes: 24100,
    photo: "",
    demands: [
      { icon: "money", label: "Corte de Gastos Públicos e Desestatização" },
      { icon: "work", label: "Desburocratização para Empresas e Indústria" },
    ],
  },
  {
    id: "renan-santos",
    name: "Renan Antonio Ferreira dos Santos",
    ballotName: "RENAN SANTOS",
    role: "Presidência da República",
    party: "MISSÃO",
    ballotNumber: "14",
    color: "violet",
    votes: 16500,
    photo: "",
    demands: [
      { icon: "education", label: "Reforma Política Profunda e Combate a Privilégios" },
    ],
  },
  {
    id: "augusto-cury",
    name: "Augusto Jorge Cury",
    ballotName: "ESCRITOR AUGUSTO CURY",
    role: "Presidência da República",
    party: "BRASIL DOS NOSSOS SONHOS",
    ballotNumber: "70",
    color: "cyan",
    votes: 14200,
    photo: "",
    demands: [
      { icon: "education", label: "Educação Emocional e Humanização Social" },
    ],
  },
  {
    id: "leonardo-avalanche",
    name: "Leonardo Alves de Araújo",
    ballotName: "LEONARDO AVALANCHE",
    role: "Presidência da República",
    party: "PRTB",
    ballotNumber: "28",
    color: "lime",
    votes: 11800,
    photo: "",
    demands: [
      { icon: "work", label: "Desregulamentação e Empreendedorismo Direto" },
    ],
  },
  {
    id: "wilson-grassi",
    name: "Wilson Grassi Junior",
    ballotName: "VETERINÁRIO WILSON GRASSI",
    role: "Presidência da República",
    party: "DEMOCRATA",
    ballotNumber: "35",
    color: "sky",
    votes: 8900,
    photo: "",
    demands: [
      { icon: "health", label: "Causa Animal e Políticas de Saúde Única" },
    ],
  },
  {
    id: "clariana-barao",
    name: "Clariana Zacarkim Barão",
    ballotName: "CLARIANA BARAO",
    role: "Presidência da República",
    party: "DC",
    ballotNumber: "27",
    color: "amber",
    votes: 6200,
    photo: "",
    demands: [
      { icon: "heart", label: "Valores Cristãos e Políticas para a Família" },
    ],
  },
  {
    id: "samara-martins",
    name: "Samara Martins da Silva Feitosa",
    ballotName: "SAMARA",
    role: "Presidência da República",
    party: "UP",
    ballotNumber: "80",
    color: "rose",
    votes: 5400,
    photo: "",
    demands: [
      { icon: "housing", label: "Reforma Urbana e Defesa da Classe Trabalhadora" },
    ],
  },
  {
    id: "edmilson-costa",
    name: "Edmilson Silva Costa",
    ballotName: "EDMILSON COSTA",
    role: "Presidência da República",
    party: "PCB",
    ballotNumber: "21",
    color: "rose",
    votes: 4100,
    photo: "",
    demands: [
      { icon: "work", label: "Estatização Estratégica e Direitos Populares" },
    ],
  },
  {
    id: "hertz-dias",
    name: "Hertz da Conceição Dias",
    ballotName: "HERTZ DIAS",
    role: "Presidência da República",
    party: "PSTU",
    ballotNumber: "16",
    color: "rose",
    votes: 3200,
    photo: "",
    demands: [
      { icon: "shield", label: "Governo dos Trabalhadores e Combate à Exploração" },
    ],
  },
  {
    id: "rui-costa-pimenta",
    name: "Rui Costa Pimenta",
    ballotName: "RUI COSTA PIMENTA",
    role: "Presidência da República",
    party: "PCO",
    ballotNumber: "29",
    color: "rose",
    votes: 2100,
    photo: "",
    demands: [
      { icon: "zap", label: "Soberania Nacional e Mobilização Operária" },
    ],
  },
]

export const initialDebates: Debate[] = [
  {
    id: "deb-1",
    title: "Prioridades Econômicas e Controle de Inflação",
    category: "Economia",
    replies: 420,
    trending: true,
    yesVotes: 1323,
    noVotes: 618,
  },
  {
    id: "deb-2",
    title: "Estratégias de Segurança Pública Integrada e Prisões Federais",
    category: "Segurança",
    replies: 280,
    trending: true,
    yesVotes: 940,
    noVotes: 260,
  },
  {
    id: "deb-3",
    title: "Metas de Transição Energética e Sustentabilidade",
    category: "Meio Ambiente",
    replies: 154,
    trending: false,
    yesVotes: 690,
    noVotes: 240,
  },
]

export const initialComments: Comment[] = [
  {
    id: "c-1",
    author: "Carlos M.",
    city: "São Paulo, SP",
    candidateId: "flavio-bolsonaro",
    message: "Apoio pela agenda de liberdade econômica e reformas.",
    timestamp: "Há 10 min",
  },
  {
    id: "c-2",
    author: "Ana Paula R.",
    city: "Belo Horizonte, MG",
    candidateId: "lula",
    message: "Foco prioritário na estabilidade social e programas básicos.",
    timestamp: "Há 18 min",
  },
  {
    id: "c-3",
    author: "Marcos V.",
    city: "Goiânia, GO",
    candidateId: "ronaldo-caiado",
    message: "A experiência na segurança pública de Goiás é a referência.",
    timestamp: "Há 32 min",
  },
]
