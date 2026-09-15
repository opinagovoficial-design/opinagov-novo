'use client';

import React, { useState, useEffect } from 'react';
import type { Candidate } from '../lib/poll-data';

interface VoteModalProps {
  candidate: Candidate;
  onClose: () => void;
  onConfirm?: (data: { name: string; message: string }) => void;
}

export function VoteModal({ candidate, onClose, onConfirm }: VoteModalProps) {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [voterName, setVoterName] = useState('');
  const [voterMessage, setVoterMessage] = useState('');

  useEffect(() => {
    let ativo = true;
    async function gerarCobranca() {
      setLoading(true);
      setPixData(null);
      setCopiado(false);

      try {
        const res = await fetch('/api/gerar-pix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            valor: 1.0,
            candidatoNome: candidate.name,
          }),
        });
        const data = await res.json();
        if (ativo && data.qr_code) {
          setPixData({
            qr_code: data.qr_code,
            qr_code_base64: data.qr_code_base64,
          });
        }
      } catch (err) {
        console.error('Erro ao gerar cobrança Pix:', err);
      } finally {
        if (ativo) setLoading(false);
      }
    }

    gerarCobranca();

    return () => {
      ativo = false;
    };
  }, [candidate.name]);

  function copiarPix() {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
  }

  function handleConfirmVote() {
    if (onConfirm) {
      onConfirm({
        name: voterName.trim() || 'Cidadão Anônimo',
        message: voterMessage.trim() || 'Apoio oficial confirmado via Pix.',
      });
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl text-center text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-white">Declarar Apoio Oficial</h3>
        <p className="text-xs text-slate-400 mt-1">
          Candidato: <span className="text-cyan-400 font-semibold">{candidate.name}</span>
        </p>

        <div className="my-5 flex flex-col items-center justify-center min-h-[200px]">
          {loading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-slate-400">Gerando cobrança Pix auditada...</p>
            </div>
          ) : pixData ? (
            <div className="flex flex-col items-center gap-4 w-full">
              {pixData.qr_code_base64 && (
                <img
                  src={`data:image/png;base64,${pixData.qr_code_base64}`}
                  alt="QR Code Pix"
                  className="w-44 h-44 rounded-xl bg-white p-2 border border-slate-700"
                />
              )}
              <div className="w-full text-left">
                <label className="text-[11px] text-slate-400 block mb-1">Seu Nome (opcional):</label>
                <input
                  type="text"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  placeholder="Ex: Rafael"
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 mb-2 focus:outline-none focus:border-cyan-500"
                />
                <label className="text-[11px] text-slate-400 block mb-1">Mensagem de Apoio (opcional):</label>
                <input
                  type="text"
                  value={voterMessage}
                  onChange={(e) => setVoterMessage(e.target.value)}
                  placeholder="Deixe uma mensagem..."
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 mb-3 focus:outline-none focus:border-cyan-500"
                />
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 break-all max-h-16 overflow-y-auto select-all">
                  {pixData.qr_code}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <button
                  type="button"
                  onClick={copiarPix}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition ${
                    copiado
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  }`}
                >
                  {copiado ? '✓ Código Copiado!' : 'Copiar Código Pix (R$ 1,00)'}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmVote}
                  className="w-full py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition"
                >
                  Já realizei o pagamento
                </button>
              </div>
            </div>
          ) : (
            <div className="text-xs text-rose-400">
              Erro ao processar cobrança Pix. Verifique a integração.
            </div>
          )}
        </div>

        <p className="text-[10px] text-slate-500">
          Processamento oficial auditado via Mercado Pago.
        </p>
      </div>
    </div>
  );
}

export default VoteModal;