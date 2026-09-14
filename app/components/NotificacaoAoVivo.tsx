'use client';

import React, { useState, useEffect } from 'react';

const acoesSimuladas = [
  { nome: 'Cidadão de São Paulo - SP', acao: 'apoiou Luiz Inácio Lula da Silva', tempo: 'agora mesmo' },
  { nome: 'Eleitor do Rio de Janeiro - RJ', acao: 'votou no Plebiscito da Maioridade Penal', tempo: 'há 14 segundos' },
  { nome: 'Cidadão de Belo Horizonte - MG', acao: 'apoiou Flávio Bolsonaro', tempo: 'há 25 segundos' },
  { nome: 'Empresário de Curitiba - PR', acao: 'garantiu o patrocínio corporativo de R$ 1.000', tempo: 'há 1 minuto' },
  { nome: 'Eleitor de Salvador - BA', acao: 'criou uma Nova Consulta Cívica', tempo: 'há 2 minutos' }
];

export default function NotificacaoAoVivo() {
  const [visivel, setVisivel] = useState(false);
  const [indiceAtual, setIndiceAtual] = useState(0);

  useEffect(() => {
    // Intervalo para exibir a notificação a cada 12 segundos
    const intervalo = setInterval(() => {
      setVisivel(false); // Esconde momentaneamente
      setTimeout(() => {
        setIndiceAtual((prev) => (prev + 1) % acoesSimuladas.length);
        setVisivel(true); // Mostra a próxima notificação
      }, 500);
    }, 12000);

    // Mostra a primeira após 3 segundos
    const timerInicial = setTimeout(() => {
      setVisivel(true);
    }, 3000);

    return () => {
      clearInterval(intervalo);
      clearTimeout(timerInicial);
    };
  }, []);

  if (!visivel) return null;

  const item = acoesSimuladas[indiceAtual];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0"></div>
        <div>
          <p className="text-xs font-bold text-white mb-0.5">{item.nome}</p>
          <p className="text-[11px] text-slate-300 leading-snug">{item.acao}</p>
          <span className="text-[9px] text-slate-500 mt-1 block">{item.tempo}</span>
        </div>
      </div>
    </div>
  );
}