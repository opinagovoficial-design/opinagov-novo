'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DoacoesPage() {
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);

  async function doar(valor: number) {
    setLoading(true);
    try {
      const res = await fetch('/api/gerar-pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ valor, candidatoNome: 'Manutenção da Plataforma OpinaGov' }),
      });
      const data = await res.json();
      if (data.qr_code) {
        setPixData({ qr_code: data.qr_code, qr_code_base64: data.qr_code_base64 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Apoie o OpinaGov</h1>
        <p className="text-xs text-slate-400">
          Somos uma plataforma cívica independente de auditoria popular. Sua contribuição mantém os servidores ativos e seguros.
        </p>

        <div className="grid grid-cols-3 gap-3 my-4">
          {[5, 10, 25].map((val) => (
            <button
              key={val}
              onClick={() => doar(val)}
              className="py-3 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 rounded-xl font-bold text-sm border border-slate-700 transition"
            >
              R$ {val},00
            </button>
          ))}
        </div>

        {loading && <p className="text-xs text-cyan-400">Gerando cobrança Pix...</p>}

        {pixData && (
          <div className="flex flex-col items-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
            {pixData.qr_code_base64 && (
              <img
                src={`data:image/png;base64,${pixData.qr_code_base64}`}
                alt="QR Code Pix"
                className="w-40 h-40 bg-white p-2 rounded-lg"
              />
            )}
            <button
              onClick={() => {
                navigator.clipboard.writeText(pixData.qr_code);
                setCopiado(true);
                setTimeout(() => setCopiado(false), 2000);
              }}
              className="w-full py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg"
            >
              {copiado ? '✓ Código Copiado!' : 'Copiar Código Pix'}
            </button>
          </div>
        )}

        <div className="pt-4">
          <Link href="/" className="text-xs text-slate-400 hover:text-cyan-400 underline">
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
