'use client';

import React, { useState } from 'react';

interface Candidato {
  id: string;
  nome: string;
  cargo: string;
  partido: string;
  numero: string;
  votos: number;
  corBg: string;
}

const candidatosIniciais: Candidato[] = [
  { id: '1', nome: 'Luiz Inácio Lula da Silva', cargo: 'Presidência da República', partido: 'PT', numero: '13', votos: 28, corBg: 'bg-red-500' },
  { id: '2', nome: 'Flávio Bolsonaro', cargo: 'Presidência da República', partido: 'PL', numero: '22', votos: 27, corBg: 'bg-emerald-500' },
  { id: '3', nome: 'Ronaldo Caiado', cargo: 'Presidência da República', partido: 'UNIÃO', numero: '44', votos: 23, corBg: 'bg-amber-500' },
  { id: '4', nome: 'Romeu Zema', cargo: 'Presidência da República', partido: 'NOVO', numero: '30', votos: 22, corBg: 'bg-orange-500' },
];

export default function HomePage() {
  const [candidatos] = useState<Candidato[]>(candidatosIniciais);
  const [carregando, setCarregando] = useState(false);
  const [pixData, setPixData] = useState<{
    candidato: string;
    qr_code: string;
    qr_code_base64: string;
  } | null>(null);
  const [copiado, setCopiado] = useState(false);

  const handleApoiar = async (candidato: Candidato) => {
    try {
      setCarregando(true);
      const res = await fetch('/api/gerar-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor: 1.0,
          candidato: candidato.nome,
          email: 'contato@opinagov.org',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Erro ao gerar Pix');
        return;
      }

      setPixData({
        candidato: candidato.nome,
        qr_code: data.qr_code,
        qr_code_base64: data.qr_code_base64,
      });
    } catch (err) {
      console.error(err);
      alert('Falha ao conectar com o servidor para gerar Pix.');
    } finally {
      setCarregando(false);
    }
  };

  const copiarPix = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col items-center">
      {/* Cabeçalho */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xl">
            🏛️
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">OpinaGov</h1>
            <p className="text-xs text-slate-400">Painel Oficial de Lideranças & Demandas</p>
          </div>
        </div>
        <div className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Auditoria Ativa
        </div>
      </div>

      <div className="w-full max-w-4xl text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mb-1">CORRIDA EM TEMPO REAL</p>
        <h2 className="text-3xl font-extrabold text-white">Quem lidera a disputa nacional?</h2>
        <p className="text-xs text-slate-400 mt-2">Participe declarando seu apoio oficial auditado.</p>
      </div>

      {/* Grid de Candidatos */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidatos.map((cand) => (
          <div
            key={cand.id}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg hover:border-slate-700 transition"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{cand.nome}</h3>
                  <p className="text-xs text-slate-400">{cand.cargo}</p>
                </div>
                <span className="text-2xl font-black text-cyan-400">{cand.votos}%</span>
              </div>

              <div className="inline-block text-[11px] font-semibold bg-slate-800 text-slate-300 px-2 py-0.5 rounded mb-4">
                {cand.partido} • Nº {cand.numero}
              </div>

              {/* Barra de progresso */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-5">
                <div
                  style={{ width: `${cand.votos}%` }}
                  className={`h-full ${cand.corBg} transition-all duration-500`}
                />
              </div>
            </div>

            <button
              type="button"
              disabled={carregando}
              onClick={() => handleApoiar(cand)}
              className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold rounded-lg transition text-sm disabled:opacity-50"
            >
              {carregando ? 'Gerando Pix...' : 'Declarar Apoio Oficial — R$ 1,00'}
            </button>
          </div>
        ))}
      </section>

      {/* Modal Popup do Pix */}
      {pixData && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setPixData(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Apoio para {pixData.candidato}</h3>
            <p className="text-xs text-slate-400 mb-4">Valor do apoio: <strong className="text-emerald-400">R$ 1,00</strong></p>

            {/* Imagem do QR Code */}
            {pixData.qr_code_base64 ? (
              <div className="bg-white p-3 rounded-xl inline-block mb-4 shadow-inner">
                <img
                  src={`data:image/png;base64,${pixData.qr_code_base64}`}
                  alt="QR Code Pix"
                  className="w-48 h-48 mx-auto"
                />
              </div>
            ) : (
              <p className="text-xs text-amber-400 mb-4">Use o código Pix Copia e Cola abaixo:</p>
            )}

            {/* Campo Copia e Cola */}
            <div className="mb-4">
              <textarea
                readOnly
                rows={3}
                value={pixData.qr_code}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-300 select-all font-mono resize-none focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={copiarPix}
              className={`w-full py-3 rounded-xl font-bold text-sm transition ${
                copiado
                  ? 'bg-emerald-500 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {copiado ? '✓ Código Pix Copiado!' : 'Copiar Código Pix (Copia e Cola)'}
            </button>

            <p className="text-[11px] text-slate-400 mt-4">
              Pagamento processado com segurança via Mercado Pago. O apoio é computado assim que confirmado.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}