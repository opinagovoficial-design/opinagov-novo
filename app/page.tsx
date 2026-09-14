'tsx'
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp, Lock } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula o tempo do efeito autêntico de carregamento (1.8 segundos)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0f1d] text-white selection:bg-cyan-500 selection:text-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070a14]"
          >
            {/* Efeito de brilho de fundo */}
            <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Logo e Ícone com animação de pulso */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center space-y-4 z-10"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
                <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h1 className="text-2xl font-black tracking-widest bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                OPINAGOV
              </h1>
              <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Ambiente Criptografado & Seguro</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo Principal do Site (Sua Dashboard / Duelos / Anúncios) */}
      <div className="p-6 max-w-7xl mx-auto">
        <header className="flex justify-between items-center py-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="font-black text-lg tracking-wider">Opina<span className="text-cyan-400">Gov</span></span>
              <p className="text-xs text-slate-400">Painel de Lideranças e Demandas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Conexão Segura Pix & Supabase</span>
          </div>
        </header>

        {/* Aqui entra o restante do seu dashboard incrível */}
        <section className="py-12 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Quem lidera a disputa nacional?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Participe das consultas auditadas em tempo real e impulsione Rafakó Grupo rumo ao topo.
          </p>
        </section>
      </div>
    </main>
  );
}