'use client';

import { useState } from 'react';

const casosEmergencia = [
  {
    id: '1',
    titulo: 'Apoio às Famílias Atingidas pelas Enchentes',
    local: 'Região Metropolitana / Comunidades Locais',
    descricao: 'Ajuda humanitária imediata com compra de cestas básicas, água potável e kits de higiene para as famílias desabrigadas.',
    meta: 50000,
    arrecadado: 18450,
  },
  {
    id: '2',
    titulo: 'Fundo de Solidariedade Comunitária',
    local: 'Ação Social Contínua',
    descricao: 'Recursos destinados a suporte emergencial de saúde e alimentação para núcleos familiares em situação de vulnerabilidade extrema.',
    meta: 20000,
    arrecadado: 9200,
  }
];

export default function DoacoesPage() {
  const [casoSelecionado, setCasoSelecionado] = useState(casosEmergencia[0]);
  const [valorDoacao, setValorDoacao] = useState('50');
  const [pixGerado, setPixGerado] = useState<string | null>(null);

  const handleDoar = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação do QR Code Pix que será integrado com a Efí amanhã
    setPixGerado("00020126580014br.gov.bcb.pix... [CHAVE PIX OFICIAL OPINAGOV]");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-3">
          <span className="bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Ação Solidária & Emergencial
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Doações Humanitárias OpinaGov
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Contribua diretamente para quem mais precisa. Transparência total na arrecadação e entrega rápida nas comunidades assistidas.
          </p>
        </div>

        {/* Lista de Casos */}
        <div className="grid md:grid-cols-2 gap-6">
          {casosEmergencia.map((caso) => (
            <div 
              key={caso.id}
              onClick={() => setCasoSelecionado(caso)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer bg-slate-900/50 backdrop-blur-sm ${
                casoSelecionado.id === caso.id 
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-950/50' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <h3 className="text-lg font-bold text-slate-100 mb-1">{caso.titulo}</h3>
              <p className="text-xs text-emerald-400 font-medium mb-3">📍 {caso.local}</p>
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">{caso.descricao}</p>
              
              {/* Barra de Progresso */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Arrecadado: R$ {caso.arrecadado.toLocaleString('pt-BR')}</span>
                  <span>Meta: R$ {caso.meta.toLocaleString('pt-BR')}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, (caso.arrecadado / caso.meta) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bloco de Pagamento Pix */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-emerald-400">
            Apoiar: {casoSelecionado.titulo}
          </h2>

          <form onSubmit={handleDoar} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Escolha ou digite o valor da doação (R$):
              </label>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {['20', '50', '100', '200'].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setValorDoacao(val)}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      valorDoacao === val 
                        ? 'bg-emerald-600 border-emerald-500 text-white shadow-md' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={valorDoacao}
                onChange={(e) => setValorDoacao(e.target.value)}
                placeholder="Outro valor"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                min="1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/30 transition-all duration-200 text-center tracking-wide"
            >
              Gerar Pix Solidário de R$ {valorDoacao}
            </button>
          </form>

          {pixGerado && (
            <div className="mt-6 p-4 bg-slate-950 border border-emerald-500/30 rounded-2xl text-center space-y-3 animate-fade-in">
              <p className="text-sm text-emerald-400 font-semibold">Pix gerado com sucesso! Escaneie ou copie o código abaixo:</p>
              <div className="p-3 bg-white text-slate-950 rounded-xl font-mono text-xs break-all select-all">
                {pixGerado}
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}