'use client';

import React, { useState, useEffect } from 'react';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName?: string;
  candidateId?: string;
  onSuccess?: () => void;
}

export function VoteModal({ isOpen, onClose, candidateName = 'Candidato' }: VoteModalProps) {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

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
            candidatoNome: candidateName,
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
  }, [isOpen, candidateName]);

  if (!isOpen) return null;

  function copiarPix() {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    }
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

        <h3 className="text-lg font-bold text-white">Confirmar Apoio Oficial</h3>
        <p className="text-xs text-slate-400 mt-1">
          Apoio para: <span className="text-cyan-400 font-semibold">{candidateName}</span>
        </p>

        <div className="my-6 flex flex-col items-center justify-center min-h-[220px]">
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
                  className="w-48 h-48 rounded-xl bg-white p-2 border border-slate-700"
                />
              )}
              <div className="w-full">
                <p className="text-[11px] text-slate-400 mb-1.5">Ou copie o código abaixo:</p>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 break-all max-h-20 overflow-y-auto select-all">
                  {pixData.qr_code}
                </div>
              </div>
              <button
                onClick={copiarPix}
                className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition ${
                  copiado
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                {copiado ? '✓ Código Copiado!' : 'Copiar Código Pix (R$ 1,00)'}
              </button>
            </div>
          ) : (
            <div className="text-xs text-rose-400">
              Erro ao processar cobrança Pix.
            </div>
          )}
        </div>

        <p className="text-[10px] text-slate-500">
          Pagamento processado via Mercado Pago com auditoria em tempo real.
        </p>
      </div>
    </div>
  );
}

export default VoteModal;