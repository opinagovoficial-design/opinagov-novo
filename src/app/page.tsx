'use client';

import React, { useState } from 'react';

interface Candidato {
  id: string;
  nome: string;
  cargo: string;
  partido: string;
  numero: string;
  porcentagem: number;
  cor: string;
}

const candidatosIniciais: Candidato[] = [
  { id: '1', nome: 'Luiz Inácio Lula da Silva', cargo: 'Presidência da República', partido: 'PT', numero: '13', porcentagem: 28, cor: '#ef4444' },
  { id: '2', nome: 'Flávio Bolsonaro', cargo: 'Presidência da República', partido: 'PL', numero: '22', porcentagem: 27, cor: '#10b981' },
  { id: '3', nome: 'Ronaldo Caiado', cargo: 'Presidência da República', partido: 'UNIÃO', numero: '44', porcentagem: 23, cor: '#f59e0b' },
  { id: '4', nome: 'Romeu Zema', cargo: 'Presidência da República', partido: 'NOVO', numero: '30', porcentagem: 22, cor: '#f97316' },
];

export default function HomePage() {
  const [candidatoModal, setCandidatoModal] = useState<Candidato | null>(null);
  const [carregandoPix, setCarregandoPix] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function abrirModalApoio(candidato: Candidato) {
    setCandidatoModal(candidato);
    setCarregandoPix(true);
    setPixData(null);
    setCopiado(false);

    try {
      const res = await fetch('/api/gerar-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor: 1.0,
          candidatoNome: candidato.nome,
        }),
      });
      const data = await res.json();
      if (data.qr_code) {
        setPixData({
          qr_code: data.qr_code,
          qr_code_base64: data.qr_code_base64,
        });
      }
    } catch (err) {
      console.error('Erro ao gerar Pix:', err);
    } finally {
      setCarregandoPix(false);
    }
  }

  function fecharModal() {
    setCandidatoModal(null);
    setPixData(null);
  }

  function copiarCodigoPix() {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  }

  return (
    <main className="min-h-screen bg-[#070a13] text-slate-100 p-4 md:p-8">
      {/* Barra de Topo */}
      <header className="max-w-7xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800/80 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xl">
            🏛️
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-white">Opina Gov</h1>
            <p className="text-xs text-slate-400">Painel Oficial de Lideranças & Demandas</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            1.250 cidadãos online agora
          </div>
          <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition">
            + Criar Duelo
          </button>
        </div>
      </header>

      {/* Grid Principal com Conteúdo e Barra Lateral */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Coluna Principal (2/3) */}
        <section className="lg:col-span-2 space-y-6">
          
          {/* Título da Seção */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Corrida em Tempo Real</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">Quem lidera a disputa nacional?</h2>
            <p className="text-xs text-slate-400 mt-1">89.300 votos declarados • atualizado ao vivo a cada participação.</p>
          </div>

          {/* Barra Master da Disputa */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-400">Barra Master da Disputa</span>
              <span className="text-cyan-400 font-bold">Luiz lidera - 28%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
              <div style={{ width: '28%' }} className="bg-red-500 h-full"></div>
              <div style={{ width: '27%' }} className="bg-emerald-500 h-full"></div>
              <div style={{ width: '23%' }} className="bg-amber-500 h-full"></div>
              <div style={{ width: '22%' }} className="bg-orange-500 h-full"></div>
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span>Luiz 28%</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Flávio 27%</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Ronaldo 23%</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500"></span>Romeu 22%</span>
            </div>
          </div>

          {/* Cards dos Candidatos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {candidatosIniciais.map((cand) => (
              <div key={cand.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{cand.nome}</h3>
                      <p className="text-xs text-slate-400">{cand.cargo}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                        {cand.partido} • Nº {cand.numero}
                      </span>
                    </div>
                    <span className="text-2xl font-black text-cyan-400">{cand.porcentagem}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 mt-4 overflow-hidden">
                    <div style={{ width: `${cand.porcentagem}%`, backgroundColor: cand.cor }} className="h-full rounded-full"></div>
                  </div>
                </div>

                <button
                  onClick={() => abrirModalApoio(cand)}
                  className="mt-5 w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition shadow-md shadow-cyan-500/10"
                >
                  Declarar Apoio Oficial — R$ 1,00
                </button>
              </div>
            ))}
          </div>

          {/* Botão Nova Consulta */}
          <div className="flex justify-center pt-2">
            <button className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-slate-600 text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="text-cyan-400 font-bold text-sm">+</span> Criar Nova Consulta (R$ 10)
            </button>
          </div>
        </section>

        {/* Coluna Lateral de Patrocínio e Debates (1/3) */}
        <aside className="space-y-6">
          {/* Card de Patrocínio */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center min-h-[300px]">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-4">Espaço Patrocinado</span>
            <div className="w-16 h-16 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-4">
              🖼️
            </div>
            <h4 className="font-bold text-white text-sm">Anuncie seu negócio aqui</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Alcance mais de 50 mil cidadãos engajados politicamente em todo o Brasil.
            </p>
            <button className="mt-5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition">
              Ver Mídia Kit e Anunciar
            </button>
          </div>

          {/* Card de Próximos Debates */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span> Próximos Debates
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Amanhã • 20:30</span>
              <p className="text-xs font-semibold text-white mt-0.5">Debate CNN Brasil</p>
              <span className="text-[11px] text-slate-400">19:30 - 21:00</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Modal de Pagamento Pix */}
      {candidatoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl text-center">
            <button
              onClick={fecharModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold text-white">Confirmar Apoio Oficial</h3>
            <p className="text-xs text-slate-400 mt-1">
              Destinatário: <span className="text-cyan-400 font-semibold">{candidatoModal.nome}</span>
            </p>

            <div className="my-6 flex flex-col items-center justify-center min-h-[200px]">
              {carregandoPix ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs text-slate-400">Gerando cobrança Pix segura...</p>
                </div>
              ) : pixData ? (
                <div className="flex flex-col items-center gap-4 w-full">
                  {pixData.qr_code_base64 && (
                    <img
                      src={`data:image/png;base64,${pixData.qr_code_base64}`}
                      alt="QR Code Pix"
                      className="w-48 h-48 rounded-xl bg-white p-2 border border-slate-700"
                    />
                  )}
                  <div className="w-full">
                    <p className="text-[11px] text-slate-400 mb-2">Ou use o Pix Copia e Cola:</p>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 break-all max-h-20 overflow-y-auto">
                      {pixData.qr_code}
                    </div>
                  </div>
                  <button
                    onClick={copiarCodigoPix}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                      copiado
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                    }`}
                  >
                    {copiado ? '✓ Código Pix Copiado!' : 'Copiar Código Pix'}
                  </button>
                </div>
              ) : (
                <div className="text-xs text-rose-400">
                  Não foi possível conectar com o Mercado Pago. Verifique o Access Token.
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-500">
              Pagamento processado via intermediação oficial e auditada.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}