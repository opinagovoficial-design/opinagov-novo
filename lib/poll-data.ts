export type VoteSide = "sim" | "nao"

export type Comment = {
  id: string
  author: string
  city: string
  side: VoteSide
  message: string
}

export type SecondaryTopic = {
  id: string
  category: string
  title: string
  simPercent: number
  totalVotes: number
}

export const initialComments: Comment[] = [
  {
    id: "c1",
    author: "Marina Alves",
    city: "Porto Alegre, RS",
    side: "sim",
    message:
      "A flexibilização pode gerar mais vagas de meio período para estudantes. Desde que os direitos sejam preservados, sou a favor.",
  },
  {
    id: "c2",
    author: "Ricardo Nunes",
    city: "Campinas, SP",
    side: "nao",
    message:
      "Flexibilizar sem garantias vira porta para abuso. Precisamos de regras claras antes de mudar a jornada.",
  },
  {
    id: "c3",
    author: "Juliana Prado",
    city: "Fortaleza, CE",
    side: "sim",
    message: "No comércio local a demanda varia muito. Ter mais liberdade ajuda os pequenos negócios a sobreviverem.",
  },
  {
    id: "c4",
    author: "Eduardo Lima",
    city: "Curitiba, PR",
    side: "nao",
    message: "Trabalho no varejo há 12 anos. Jornada flexível na prática costuma sobrecarregar quem já ganha pouco.",
  },
]

export const secondaryTopics: SecondaryTopic[] = [
  {
    id: "t1",
    category: "Mobilidade Urbana",
    title: "Ampliação da malha de ciclovias no centro da cidade",
    simPercent: 68,
    totalVotes: 4213,
  },
  {
    id: "t2",
    category: "Comércio e Cidade",
    title: "Funcionamento do comércio de rua aos domingos",
    simPercent: 42,
    totalVotes: 3187,
  },
]
