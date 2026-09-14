'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [candidatos, setCandidatos] = useState([
    { id: 1, nome: 'Luiz Inácio Lula da Silva', partido: 'PT • Nº 13', cargo: 'Presidência da República', votos: 28, liderando: true, cor: 'from-emerald-500 to-teal-600', corBg: 'bg-emerald-500' },
    { id: 2, nome: 'Flávio Bolsonaro', partido: 'PL • Nº 22', cargo: 'Presidência da República', votos: 27, liderando: false, cor: 'from-cyan-500 to-blue-600', corBg: 'bg-cyan-500' },
    { id: 3, nome: 'Ronaldo Caiado', partido: 'PSD • Nº 55', cargo: 'Presidência da República', votos: 23, liderando: false, cor: 'from-amber-500 to-orange-600', corBg: 'bg-amber-500' },
    { id: 4, nome: 'Romeu Zema', partido: 'NOVO • Nº 30', cargo: 'Presidência da República', votos: 22, liderando: false, cor: 'from-purple-500 to-indigo-600', corBg: 'bg-purple-500' },
  ]);

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Banner de Transparência */}
      <div className="bg-[#0b1324] border-b border-slate-800/80 px-4 py-2 text-xs font-medium text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Último apoio registrado há pouco
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="hidden sm:inline">89.300 participações auditadas</span>
        </div>
        <div>Cobertura 100% nacional</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-10">
        {/* Header Principal */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl font-black shadow-lg shadow-cyan-950/40">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight">
                  Opina <span className="text-cyan-400">Gov</span>
                </h1>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  1.250 cidadãos online
                </span>
              </div>
              <p className="text-xs text-slate-400">Painel de Lideranças e Demandas Populares</p>
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="flex items-center gap-3">
            <Link
              href="/doacoes"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 border border-emerald-400/20 active:scale-95"
            >
              🤝 Doações Humanitárias
            </Link>
            <Link
              href="/admin"
              className="bg-white hover:bg-slate-200 text-slate-950 text-xs md:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1"
            >
              + Criar Duelo
            </Link>
          </div>
        </header>

        {/* Bloco de Título e Disputa */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Corrida em Tempo Real
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Quem lidera a disputa nacional?
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              89.300 votos declarados • atualizado ao vivo a cada participação.
            </p>
          </div>

          {/* Barra Master da Disputa */}
          <div className="bg-[#0b1324] border border-slate-800/80 p-5 rounded-3xl space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="text-slate-300">Barra Master da Disputa</span>
                <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1">
                  👑 Luiz lidera - 28%
                </span>
              </div>
              <span className="text-slate-500 font-normal">Divisão proporcional dos votos</span>
            </div>

            {/* Barra Dividida */}
            <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden flex border border-slate-800">
              <div style={{ width: '28%' }} className="bg-emerald-500 h-full"></div>
              <div style={{ width: '27%' }} className="bg-cyan-500 h-full"></div>
              <div style={{ width: '23%' }} className="bg-amber-500 h-full"></div>
              <div style={{ width: '22%' }} className="bg-purple-500 h-full"></div>
            </div>

            {/* Legenda das Porcentagens */}
            <div className="flex flex-wrap gap-4 text-xs font-semibold pt-1">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Luiz 28%
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-cyan-500"></span> Flávio 27%
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-amber-500"></span> Ronaldo 23%
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="h-2 w-2 rounded-full bg-purple-500"></span> Romeu 22%
              </span>
            </div>
          </div>
        </section>

        {/* Grid de Candidatos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {candidatos.map((cand) => (
            <div
              key={cand.id}
              className="bg-[#0b1324] border border-slate-800/80 hover:border-slate-700/80 rounded-3xl p-6 transition-all shadow-xl flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
                        {cand.nome}
                      </h3>
                      {cand.liderando && (
                        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Liderando
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{cand.cargo}</p>
                    <div className="mt-2 inline-block bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                      {cand.partido}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-cyan-400">
                    {cand.votos}%
                  </div>
                </div>

                {/* Barra de progresso individual */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${cand.votos}%` }}
                    className={`h-full ${cand.corBg}`}
                  ></div>
                </div>
              </div>

              {/* Botão de Apoio */}
              <button
                type="button"
                className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold py-3.5 px-4 rounded-2xl transition-all shadow-lg shadow-cyan-950/40 text-sm active:scale-[0.98]"
              >
                Declarar Apoio Oficial — R$ 1,00
              </button>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}