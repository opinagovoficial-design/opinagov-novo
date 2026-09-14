'use client';
import ShareReferralCard from "@/components/ShareReferralCard";
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [debates, setDebates] = useState<any[]>([]);
  const [candidatos, setCandidatos] = useState<any[]>([]);
  const [senha, setSenha] = useState('');
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    if (autorizado) {
      carregarDadosAdmin();
    }
  }, [autorizado]);

  async function carregarDadosAdmin() {
    const { data: dDebates } = await supabase.from('debates').select('*').order('created_at', { ascending: false });
    if (dDebates) setDebates(dDebates);

    const { data: dCand } = await supabase.from('candidatos').select('*').order('votos_total', { ascending: false });
    if (dCand) setCandidatos(dCand);
  }

  const deletarDebate = async (id: string) => {
    if (confirm('Tem certeza que deseja apagar este debate?')) {
      await supabase.from('debates').delete().eq('id', id);
      carregarDadosAdmin();
    }
  };

  if (!autorizado) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-2xl w-full max-w-sm shadow-2xl">
          <h2 className="text-xl font-bold mb-4">Acesso Administrativo</h2>
          <input 
            type="password" 
            placeholder="Senha de Gestão"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-[#030712] border border-slate-700 rounded-lg p-3 text-sm mb-4 focus:outline-none focus:border-emerald-500"
          />
          <button 
            onClick={() => {
              if (senha === 'admin123') setAutorizado(true);
              else alert('Senha incorreta!');
            }}
            className="w-full py-3 rounded-lg font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer"
          >
            Entrar no Painel
          </button>
        </div>
      </div>
    );
  }

  const totalArrecadadoVotos = candidatos.reduce((acc, c) => acc + (c.votos_total || 0) * 1.00, 0);
  const totalArrecadadoDebates = debates.length * 5.00;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo OpinaGov</h1>
            <p className="text-xs text-slate-400">Moderação e Auditoria Financeira</p>
          </div>
          <a href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg font-medium">Voltar ao Site</a>
        </div>

        {/* Métricas Financeiras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Arrecadação Apoios (R$ 1,00)</p>
            <h3 className="text-3xl font-bold text-emerald-400">R$ {totalArrecadadoVotos.toFixed(2)}</h3>
          </div>
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Arrecadação Debates (R$ 5,00)</p>
            <h3 className="text-3xl font-bold text-emerald-400">R$ {totalArrecadadoDebates.toFixed(2)}</h3>
          </div>
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Total de Debates Ativos</p>
            <h3 className="text-3xl font-bold text-blue-400">{debates.length} salas</h3>
          </div>
        </div><div className="mb-6">
  <ShareReferralCard 
    userRefCode="cidadao_123" 
    candidatoNome="OpinaGov" 
  />
</div>

        {/* Gerenciamento de Debates */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Moderação de Debates da Comunidade</h2>
          <div className="space-y-3">
            {debates.map((deb) => (
              <div key={deb.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">{deb.titulo}</h4>
                  <p className="text-xs text-slate-400">Criado por: {deb.autor_nome} (CPF: {deb.autor_cpf})</p>
                </div>
                <button 
                  onClick={() => deletarDebate(deb.id)}
                  className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs rounded-lg font-medium cursor-pointer"
                >
                  Remover Debate
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}