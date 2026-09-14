'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Cabeçalho com Botão de Doações */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-3xl gap-4 shadow-xl">
          <div>
            <span className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Painel Oficial
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-2">
              Opina <span className="text-emerald-400">Gov</span>
            </h1>
            <p className="text-slate-400 text-sm">Plataforma de Engajamento Cívico e Ação Social</p>
          </div>

          <Link 
            href="/doacoes" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/40 flex items-center gap-2"
          >
            🤝 Doações Humanitárias
          </Link>
        </div>

        {/* Banner Principal / Corrida em Tempo Real */}
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight">Quem lidera a disputa nacional?</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Participe das votações auditadas e ajude a construir novos rumos para a governança e o apoio comunitário.
          </p>
          <div className="pt-4">
            <Link
              href="/admin"
              className="inline-block bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-6 py-2.5 rounded-xl border border-slate-700 transition-all"
            >
              Acessar Painel Administrativo ⚙️
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}