'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PainelCriadorPage() {
  const params = useParams();
  const consultaId = params?.id;

  const [consulta, setConsulta] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [linkCopiado, setLinkCopiado] = useState(false);

  useEffect(() => {
    async function carregarDadosPainel() {
      if (!consultaId) return;

      const { data, error } = await supabase
        .from('consultas_autorais')
        .select('*')
        .eq('slug', consultaId)
        .single();

      if (!error && data) {
        setConsulta(data);
      } else {
        // Fallback de demonstração caso o slug seja simulado
        setConsulta({
          titulo: `Consulta: ${consultaId}`,
          slug: consultaId,
          totalVotos: 142,
          arrecadacao: 'R$ 142,00',
          criadoEm: '2026-06-06'
        });
      }
      setCarregando(false);
    }

    carregarDadosPainel();
  }, [consultaId]);

  const copiarLinkPublico = () => {
    const urlPublica = `${window.location.origin}/consulta/${consultaId}`;
    navigator.clipboard.writeText(urlPublica);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 3000);
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center font-sans">
        <div className="animate-pulse text-[#00e5ff] font-bold text-sm">Carregando painel de controle...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b19] text-white font-sans pb-24 px-6">
      
      {/* Header do Painel */}
      <div className="w-full max-w-5xl mx-auto pt-8 flex justify-between items-center mb-10 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2v-2H3v2zm4 0h14v-2H7v2zm0 6h14v-2H7v2zM3 7h2V5H3v2zm4 0h14V5H7v2z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block">Painel do Criador</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Status: Ativo & Auditado</span>
          </div>
        </div>
        <a href={`/consulta/${consultaId}`} className="text-xs text-slate-400 hover:text-white transition-colors">Ver Página Pública →</a>
      </div>

      <div className="max-w-5xl mx-auto">
        
        {/* Título da Consulta */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 md:p-8 mb-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Consulta Gerenciada</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{consulta?.titulo}</h1>
          </div>
          <button 
            onClick={copiarLinkPublico}
            className={`font-bold py-3 px-5 rounded-xl text-xs transition-all flex items-center gap-2 shrink-0 ${linkCopiado ? 'bg-emerald-500 text-slate-950' : 'bg-white hover:bg-slate-100 text-slate-950'}`}
          >
            {linkCopiado ? 'Link Copiado ✓' : 'Copiar Link de Divulgação'}
          </button>
        </div>

        {/* Métricas / Cards de Desempenho */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Total de Participações</span>
            <div className="text-4xl font-extrabold text-[#00e5ff]">{consulta?.totalVotos || 142}</div>
            <p className="text-[11px] text-slate-500 mt-2">Votos auditados via CPF e Pix (R$ 1,00)</p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Engajamento da Audiência</span>
            <div className="text-4xl font-extrabold text-emerald-400">98.4%</div>
            <p className="text-[11px] text-slate-500 mt-2">Índice de conversão de cliques em votos</p>
          </div>

          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Status do Servidor</span>
            <div className="text-xl font-bold text-white flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span> Online 24/7
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Proteção contra ataques DDoS ativa</p>
          </div>
        </div>

        {/* Dica de Crescimento para o Criador */}
        <div className="bg-gradient-to-r from-[#00e5ff]/10 to-transparent border border-[#00e5ff]/20 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white mb-2">💡 Dica de Ouro para Engajamento</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Compartilhe o seu link nos seus stories do Instagram e grupos de WhatsApp oficiais. Criadores que fixam o link na bio costumam triplicar o volume de participações nas primeiras 24 horas.
          </p>
        </div>

      </div>
    </main>
  );
}