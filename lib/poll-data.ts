export type DemandIcon = string;
export type VoteSide = "yes" | "no" | "sim" | "nao";

export interface CandidateDemand {
  label: string;
  icon: DemandIcon;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyNumber: number;
  role: string;
  photo: string;
  avatar?: string;
  votes: number;
  percentage: number;
  color: string;
  demands: CandidateDemand[];
  proposals?: string[];
}

export interface Comment {
  id: string;
  author: string;
  city: string;
  candidateId: string;
  message: string;
  timestamp?: string;
}

export interface Debate {
  id: string;
  title: string;
  category: string;
  replies: number;
  trending: boolean;
  yesVotes: number;
  noVotes: number;
}

export interface SecondaryTopic {
  id: string;
  title: string;
  description?: string;
  category?: string;
  yesVotes: number;
  noVotes: number;
  totalVotes: number;
  simPercent: number;
  naoPercent?: number;
  percentage?: number;
}

export const colorStyles: Record<string, { bg: string; text: string; border: string; bar: string; ring: string; soft: string; button: string; dot: string }> = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bar: "bg-emerald-500",
    ring: "ring-emerald-500/40",
    soft: "bg-emerald-500/20 text-emerald-300",
    button: "bg-emerald-500 hover:bg-emerald-400 text-slate-950",
    dot: "bg-emerald-400"
  },
  sky: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    border: "border-sky-500/30",
    bar: "bg-sky-500",
    ring: "ring-sky-500/40",
    soft: "bg-sky-500/20 text-sky-300",
    button: "bg-sky-500 hover:bg-sky-400 text-slate-950",
    dot: "bg-sky-400"
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    bar: "bg-amber-500",
    ring: "ring-amber-500/40",
    soft: "bg-amber-500/20 text-amber-300",
    button: "bg-amber-500 hover:bg-amber-400 text-slate-950",
    dot: "bg-amber-400"
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    bar: "bg-purple-500",
    ring: "ring-purple-500/40",
    soft: "bg-purple-500/20 text-purple-300",
    button: "bg-purple-500 hover:bg-purple-400 text-slate-950",
    dot: "bg-purple-400"
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/30",
    bar: "bg-rose-500",
    ring: "ring-rose-500/40",
    soft: "bg-rose-500/20 text-rose-300",
    button: "bg-rose-500 hover:bg-rose-400 text-slate-950",
    dot: "bg-rose-400"
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    bar: "bg-cyan-500",
    ring: "ring-cyan-500/40",
    soft: "bg-cyan-500/20 text-cyan-300",
    button: "bg-cyan-500 hover:bg-cyan-400 text-slate-950",
    dot: "bg-cyan-400"
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/30",
    bar: "bg-indigo-500",
    ring: "ring-indigo-500/40",
    soft: "bg-indigo-500/20 text-indigo-300",
    button: "bg-indigo-500 hover:bg-indigo-400 text-slate-950",
    dot: "bg-indigo-400"
  },
  lime: {
    bg: "bg-lime-500/10",
    text: "text-lime-400",
    border: "border-lime-500/30",
    bar: "bg-lime-500",
    ring: "ring-lime-500/40",
    soft: "bg-lime-500/20 text-lime-300",
    button: "bg-lime-500 hover:bg-lime-400 text-slate-950",
    dot: "bg-lime-400"
  }
};

export const initialCandidates: Candidate[] = [
  {
    id: "lula",
    name: "Luiz Inácio Lula da Silva",
    party: "PT",
    partyNumber: 13,
    role: "Presidência da República",
    photo: "",
    votes: 15840,
    percentage: 28,
    color: "emerald",
    demands: [
      { label: "Programas Sociais", icon: "heart" },
      { label: "Transição Verde", icon: "leaf" },
      { label: "Reforma Tributária", icon: "landmark" }
    ]
  },
  {
    id: "tarcisio",
    name: "Tarcísio de Freitas",
    party: "Republicanos",
    partyNumber: 10,
    role: "Presidência da República",
    photo: "",
    votes: 15120,
    percentage: 27,
    color: "sky",
    demands: [
      { label: "Infraestrutura", icon: "zap" },
      { label: "Segurança Pública", icon: "shield" },
      { label: "Privatizações", icon: "briefcase" }
    ]
  },
  {
    id: "ronaldo",
    name: "Ronaldo Caiado",
    party: "União Brasil",
    partyNumber: 44,
    role: "Presidência da República",
    photo: "",
    votes: 12900,
    percentage: 23,
    color: "amber",
    demands: [
      { label: "Tolerância Zero", icon: "shield" },
      { label: "Agronegócio Forte", icon: "leaf" },
      { label: "Gestão Fiscal", icon: "landmark" }
    ]
  },
  {
    id: "simone",
    name: "Simone Tebet",
    party: "MDB",
    partyNumber: 15,
    role: "Presidência da República",
    photo: "",
    votes: 12340,
    percentage: 22,
    color: "purple",
    demands: [
      { label: "Planejamento Fiscal", icon: "landmark" },
      { label: "Educação Integral", icon: "graduation-cap" },
      { label: "Paridade de Renda", icon: "heart" }
    ]
  },
  {
    id: "romeu",
    name: "Romeu Zema",
    party: "NOVO",
    partyNumber: 30,
    role: "Presidência da República",
    photo: "",
    votes: 9400,
    percentage: 16,
    color: "amber",
    demands: [
      { label: "Corte de Gastos", icon: "landmark" },
      { label: "Desregulamentação", icon: "briefcase" }
    ]
  },
  {
    id: "ciro",
    name: "Ciro Gomes",
    party: "PDT",
    partyNumber: 12,
    role: "Presidência da República",
    photo: "",
    votes: 8200,
    percentage: 14,
    color: "rose",
    demands: [
      { label: "Projeto Nacional", icon: "landmark" },
      { label: "Reindustrialização", icon: "zap" }
    ]
  },
  {
    id: "ratinho",
    name: "Ratinho Júnior",
    party: "PSD",
    partyNumber: 55,
    role: "Presidência da República",
    photo: "",
    votes: 7500,
    percentage: 13,
    color: "sky",
    demands: [
      { label: "Logística Integrada", icon: "briefcase" },
      { label: "Inovação Pública", icon: "zap" }
    ]
  },
  {
    id: "eduardo",
    name: "Eduardo Leite",
    party: "PSDB",
    partyNumber: 45,
    role: "Presidência da República",
    photo: "",
    votes: 6800,
    percentage: 12,
    color: "cyan",
    demands: [
      { label: "Pacto Federativo", icon: "landmark" },
      { label: "Primeira Infância", icon: "heart" }
    ]
  },
  {
    id: "marcal",
    name: "Pablo Marçal",
    party: "PRTB",
    partyNumber: 28,
    role: "Presidência da República",
    photo: "",
    votes: 6200,
    percentage: 11,
    color: "lime",
    demands: [
      { label: "Empreendedorismo", icon: "zap" },
      { label: "Desestatização", icon: "briefcase" }
    ]
  },
  {
    id: "helena",
    name: "Helena Chagas",
    party: "Cidadania",
    partyNumber: 23,
    role: "Presidência da República",
    photo: "",
    votes: 4100,
    percentage: 7,
    color: "rose",
    demands: [
      { label: "Transparência", icon: "landmark" },
      { label: "Comunicação Cívica", icon: "heart" }
    ]
  },
  {
    id: "marina",
    name: "Marina Silva",
    party: "REDE",
    partyNumber: 18,
    role: "Presidência da República",
    photo: "",
    votes: 3900,
    percentage: 6,
    color: "emerald",
    demands: [
      { label: "Desmatamento Zero", icon: "tree" },
      { label: "Transição Energética", icon: "leaf" }
    ]
  },
  {
    id: "boulos",
    name: "Guilherme Boulos",
    party: "PSOL",
    partyNumber: 50,
    role: "Presidência da República",
    photo: "",
    votes: 3500,
    percentage: 6,
    color: "purple",
    demands: [
      { label: "Habitação Popular", icon: "heart" },
      { label: "Tarifa Zero", icon: "zap" }
    ]
  }
];

export const initialComments: Comment[] = [
  { id: "1", author: "Carlos M.", city: "São Paulo, SP", candidateId: "tarcisio", message: "Infraestrutura é a chave para o crescimento.", timestamp: "Há 5 min" },
  { id: "2", author: "Ana Paula R.", city: "Belo Horizonte, MG", candidateId: "lula", message: "Foco nos programas sociais e estabilidade alimentar.", timestamp: "Há 12 min" },
  { id: "3", author: "Marcos V.", city: "Goiânia, GO", candidateId: "ronaldo", message: "Segurança e firmeza na gestão do país.", timestamp: "Há 25 min" }
];

export const initialDebates: Debate[] = [
  { id: "1", title: "Prioridades Econômicas e Controle de Inflação 2026", category: "Economia", replies: 142, trending: true, yesVotes: 890, noVotes: 420 },
  { id: "2", title: "Estratégias de Segurança Pública Integrada", category: "Segurança", replies: 89, trending: true, yesVotes: 730, noVotes: 210 },
  { id: "3", title: "Metas Climáticas e Sustentabilidade", category: "Meio Ambiente", replies: 54, trending: false, yesVotes: 510, noVotes: 180 }
];




