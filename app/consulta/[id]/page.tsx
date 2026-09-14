'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ConsultaIndividualPage() {
  const params = useParams();
  const consultaId = params?.id; // Pega o identificador da URL (ex: prefeito-sao-paulo)

  const [consulta, setConsulta] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<any>(null);
  const [cpfInput, setCpfInput] = useState('');
  
  // Estados do Pix
  const [isGerandoPix, setIsGerandoPix] = useState(false);
  const [pixCopiaECola, setPixCopiaECola] = useState('');
  const [pixCopiado, setPixCopiado] = useState(false);

  useEffect(() => {
    async function carregarConsulta() {
      if (!consultaId) return;

      // Exemplo de busca no Supabase por uma tabela de consultas autorais
      const { data, error } = await supabase
        .from('consultas_autorais')
        .select('*')
        .eq('slug', consultaId)
        .single();

      if (!error && data) {
        setConsulta(data);
      } else {
        // Fallback simulado para demonstração imediata caso a tabela ainda não exista
        setConsulta({
          titulo: `Consulta Cívica #${consultaId}`,
          descricao: "Esta é uma consulta autoral criada de forma independente na plataforma OpinaGov.",
          candidatos: [
            { id: 1, nome: "Candidato A / Opção 1", votos: 340, percentual: 58 },
            { id: 2, nome: "Candidato B / Opção 2", votos: 250, percentual: 42 }
          ]
        });
      }
      setCarregando(false);
    }

    carregarConsulta();
  }, [consultaId]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpfInput(value);
  };

  const abrirModalVoto = (opcao: any) => {
    setOpcaoSelecionada(opcao);
    setCpfInput('');
    setPixCopiaECola('');
    setIsModalOpen(true);
  };

  const handleGerarPix = async () => {
    setIsGerandoPix(true);
    try {
      const response = await fetch('/api/gerar-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpf: cpfInput,
          valor: '1.00',
          tipoProduto: 'voto_autoral',
          idReferencia: opcaoSelecionada.nome
        }),
      });
      const data = await response.json();
      if (data.sucesso) {
        setPixCopiaECola(data.copiaECola);
      } else {
        alert('Erro ao gerar Pix.');
      }
    } catch (err) {
      alert('Erro de conexão.');
    } finally {
      setIsGerandoPix(false);
    }
  };

  const copiarPix = () => {
    navigator.clipboard.writeText(pixCopiaECola);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 3000);
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#070b19] text-white flex items-center justify-center font-sans">
        <div className="animate-pulse text-[#00e5ff] font-bold text-sm">Carregando consulta cívica...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b19] text-white font-sans pb-24 px-6">
      
      {/* Barra Superior */}
      <div className="w-full max-w-4xl mx-auto pt-8 flex justify-between items-center mb-10 border-b border-slate-800/80 pb-4">
        <a href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#00e5ff] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <svg className="w-5 h-5 text-slate-950" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">Opina<span className="text-[#00e5ff]">Gov</span></span>
        </a>
        <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors">Voltar à Página Principal →</a>
      </div>

      {/* Conteúdo Principal da Consulta */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Consulta Cívica Autoral Verificada
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{consulta?.titulo}</h1>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">{consulta?.descricao}</p>
        </div>

        {/* Opções de Voto / Duelo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {consulta?.candidatos?.map((opcao: any, index: number) => (
            <div key={opcao.id || index} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{opcao.nome}</h3>
                  <span className="text-2xl font-extrabold text-[#00e5ff]">{opcao.percentual}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 mb-6 border border-slate-800 overflow-hidden">
                  <div className="bg-[#00e5ff] h-full rounded-full transition-all duration-700" style={{ width: `${opcao.percentual}%` }}></div>
                </div>
              </div>

              <button 
                onClick={() => abrirModalVoto(opcao)}
                className="w-full bg-[#00e5ff] hover:bg-cyan-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition-all text-sm shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                Votar Oficialmente — R$ 1,00
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE VALIDAÇÃO E PIX */}
      {isModalOpen && opcaoSelecionada && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {!pixCopiaECola ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-2 mt-4">Validar Voto</h3>
                <p className="text-sm text-slate-400 mb-6">
                  Você escolheu: <strong className="text-white">{opcaoSelecionada.nome}</strong>. Insira seu CPF para garantir um voto por cidadão.
                </p>
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CPF (Apenas números)</label>
                  <input 
                    type="text" 
                    value={cpfInput} 
                    onChange={handleCpfChange} 
                    placeholder="000.000.000-00" 
                    disabled={isGerandoPix}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <button 
                  disabled={cpfInput.length < 14 || isGerandoPix}
                  onClick={handleGerarPix}
                  className={`w-full font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 
                    ${cpfInput.length === 14 && !isGerandoPix ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                >
                  {isGerandoPix ? 'Processando...' : 'Confirmar e Gerar Pix (R$ 1,00)'}
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center mt-4">
                <h3 className="text-xl font-bold text-white mb-2">Pagamento Pendente</h3>
                <p className="text-xs text-slate-400 mb-4 text-center">Copie o código abaixo para registrar seu voto nesta consulta:</p>
                <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 mb-4">
                  <p className="text-xs text-slate-400 break-all select-all font-mono leading-relaxed h-16 overflow-y-auto">{pixCopiaECola}</p>
                </div>
                <button 
                  onClick={copiarPix}
                  className={`w-full font-bold py-3.5 px-4 rounded-xl text-sm ${pixCopiado ? 'bg-emerald-500 text-slate-950' : 'bg-[#00e5ff] text-slate-950 hover:bg-cyan-400'}`}
                >
                  {pixCopiado ? 'Copiado ✓' : 'Copiar Código Pix'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </main>
  );
}