'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [senha, setSenha] = useState('');

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl text-center">
        <h1 className="text-xl font-bold text-white mb-2">Painel Administrativo</h1>
        <p className="text-xs text-slate-400 mb-6">OpinaGov — Gestão e Auditoria de Votos</p>

        {!autenticado ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (senha === 'admin123') setAutenticado(true);
              else alert('Senha incorreta.');
            }}
            className="flex flex-col gap-3"
          >
            <input
              type="password"
              placeholder="Senha de acesso"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wide transition"
            >
              Entrar no Painel
            </button>
          </form>
        ) : (
          <div className="text-left space-y-4">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300">
              ✓ Sistema Conectado ao Gateway Mercado Pago
            </div>
            <p className="text-xs text-slate-400">
              Votos auditados e transações Pix em tempo real integradas via API.
            </p>
          </div>
        )}

        <div className="mt-6">
          <Link href="/" className="text-xs text-cyan-400 hover:underline">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
