"use client"

import { useState } from "react"
import { ShieldCheck, Lock, FileText, X } from "lucide-react"

export function LgpdFooterModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="w-full border-t border-white/5 bg-slate-950/90 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Ambiente seguro em conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong> e Marco Civil da Internet.</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 underline font-medium transition"
          >
            Políticas de Privacidade & Termos de Uso
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-base">
              <Lock className="h-5 w-5" />
              <h3>Termos de Uso e Proteção de Dados (LGPD)</h3>
            </div>

            <div className="flex flex-col gap-3.5 text-xs text-slate-300 leading-relaxed text-justify">
              <p>
                <strong>1. Natureza do Serviço:</strong> O OpinaGov é uma plataforma de engajamento social e consulta pública independente, não possuindo vinculação oficial com órgãos governamentais ou entidades da Justiça Eleitoral.
              </p>
              <p>
                <strong>2. Tratamento e Finalidade de Dados:</strong> Em estrito cumprimento à Lei Geral de Proteção de Dados (Lei nº 13.709/2018), os dados fornecidos pelo usuário no momento da manifestação cívica destinam-se exclusivamente à autenticação de unicidade da participação e mitigação de robôs e fraudes eletrônicas.
              </p>
              <p>
                <strong>3. Anonimização e Segurança:</strong> Dados cadastrais sensíveis não são comercializados ou compartilhados com terceiros para fins de marketing. O registro de apoio exibe apenas o primeiro nome ou denominação pública indicada voluntariamente pelo participante.
              </p>
              <p>
                <strong>4. Transações via Pix:</strong> As liquidações Pix cumprem os protocolos de segurança bancária determinados pelo Banco Central do Brasil. O valor arrecadado é destinado à cobertura dos custos de hospedagem, moderação e desenvolvimento da plataforma cívica independente.
              </p>
              <p>
                <strong>5. Direitos do Titular:</strong> O usuário tem o direito de solicitar a exclusão de seu comentário ou registro público do mural a qualquer momento, bastando acionar os canais de suporte técnico do portal.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
            >
              Entendido e Ciente
            </button>
          </div>
        </div>
      )}
    </>
  )
}
