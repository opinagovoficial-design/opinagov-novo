export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyNumber: number;
  role: string;
  avatar: string;
  votes: number;
  percentage: number;
  proposals: string[];
}

export interface Comment {
  id: string;
  author: string;
  city: string;
  candidateId: string;
  message: string;
  timestamp: string;
}

export interface Debate {
  id: string;
  title: string;
  category: string;
  replies: number;
  trending: boolean;
}

export const colorStyles: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  PT: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", bar: "bg-red-500" },
  Republicanos: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20", bar: "bg-blue-500" },
  "União Brasil": { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", bar: "bg-cyan-500" },
  MDB: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", bar: "bg-emerald-500" },
  NOVO: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20", bar: "bg-orange-500" },
  PDT: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20", bar: "bg-rose-500" },
  PSD: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20", bar: "bg-yellow-500" },
  PSDB: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", bar: "bg-sky-500" },
  PRTB: { bg: "bg-lime-500/10", text: "text-lime-400", border: "border-lime-500/20", bar: "bg-lime-500" },
  Cidadania: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/20", bar: "bg-pink-500" },
  REDE: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/20", bar: "bg-teal-500" },
  PSOL: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", bar: "bg-purple-500" },
};

export const initialCandidates: Candidate[] = [
  {
    id: "lula",
    name: "Luiz Inácio Lula da Silva",
    party: "PT",
    partyNumber: 13,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    votes: 15840,
    percentage: 28,
    proposals: ["Fortalecimento de programas sociais", "Transição ecológica", "Reforma tributária progressiva"]
  },
  {
    id: "tarcisio",
    name: "Tarcísio de Freitas",
    party: "Republicanos",
    partyNumber: 10,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    votes: 15120,
    percentage: 27,
    proposals: ["Privatizações e concessões", "Segurança pública ostensiva", "Atração de investimentos externos"]
  },
  {
    id: "ronaldo",
    name: "Ronaldo Caiado",
    party: "União Brasil",
    partyNumber: 44,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    votes: 12900,
    percentage: 23,
    proposals: ["Tolerância zero ao crime", "Valorização do agronegócio", "Eficiência administrativa"]
  },
  {
    id: "simone",
    name: "Simone Tebet",
    party: "MDB",
    partyNumber: 15,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    votes: 12340,
    percentage: 22,
    proposals: ["Planejamento fiscal de longo prazo", "Educação em tempo integral", "Igualdade salarial"]
  },
  {
    id: "romeu",
    name: "Romeu Zema",
    party: "NOVO",
    partyNumber: 30,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    votes: 9400,
    percentage: 16,
    proposals: ["Corte rigoroso de gastos", "Desregulamentação econômica", "Modernização da gestão pública"]
  },
  {
    id: "ciro",
    name: "Ciro Gomes",
    party: "PDT",
    partyNumber: 12,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    votes: 8200,
    percentage: 14,
    proposals: ["Projeto Nacional de Desenvolvimento", "Reindustrialização tecnológica", "Refinanciamento do endividamento familiar"]
  },
  {
    id: "ratinho",
    name: "Ratinho Júnior",
    party: "PSD",
    partyNumber: 55,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    votes: 7500,
    percentage: 13,
    proposals: ["Infraestrutura logística integrada", "Sustentabilidade e energia limpa", "Inovação tecnológica no setor público"]
  },
  {
    id: "eduardo",
    name: "Eduardo Leite",
    party: "PSDB",
    partyNumber: 45,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
    votes: 6800,
    percentage: 12,
    proposals: ["Diálogo federativo", "Equilíbrio fiscal e reformas estruturantes", "Incentivo a primeira infância"]
  },
  {
    id: "marcal",
    name: "Pablo Marçal",
    party: "PRTB",
    partyNumber: 28,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    votes: 6200,
    percentage: 11,
    proposals: ["Empreendedorismo e inovação digital", "Desestatização massiva", "Educação financeira nas escolas"]
  },
  {
    id: "helena",
    name: "Helena Chagas",
    party: "Cidadania",
    partyNumber: 23,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    votes: 4100,
    percentage: 7,
    proposals: ["Transparência governamental", "Fortalecimento institucional", "Investimento em cultura e comunicação pública"]
  },
  {
    id: "marina",
    name: "Marina Silva",
    party: "REDE",
    partyNumber: 18,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&h=150&fit=crop&crop=face",
    votes: 3900,
    percentage: 6,
    proposals: ["Desmatamento zero", "Bioeconomia e transição energética", "Demarcação e proteção de territórios tradicionais"]
  },
  {
    id: "boulos",
    name: "Guilherme Boulos",
    party: "PSOL",
    partyNumber: 50,
    role: "Presidência da República",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face",
    votes: 3500,
    percentage: 6,
    proposals: ["Habitação popular e combate aos imóveis ociosos", "Taxação de grandes fortunas", "Tarifa zero no transporte público"]
  }
];

export const initialComments: Comment[] = [
  { id: "1", author: "Carlos M.", city: "São Paulo, SP", candidateId: "tarcisio", message: "Infraestrutura é a chave para o crescimento.", timestamp: "Há 5 min" },
  { id: "2", author: "Ana Paula R.", city: "Belo Horizonte, MG", candidateId: "lula", message: "Foco nos programas sociais e estabilidade alimentar.", timestamp: "Há 12 min" },
  { id: "3", author: "Marcos V.", city: "Goiânia, GO", candidateId: "ronaldo", message: "Segurança e firmeza na gestão do país.", timestamp: "Há 25 min" }
];

export const initialDebates: Debate[] = [
  { id: "1", title: "Prioridades Econômicas e Controle de Inflação 2026", category: "Economia", replies: 142, trending: true },
  { id: "2", title: "Estratégias de Segurança Pública Integrada", category: "Segurança", replies: 89, trending: true },
  { id: "3", title: "Metas Climáticas e Sustentabilidade", category: "Meio Ambiente", replies: 54, trending: false }
];
