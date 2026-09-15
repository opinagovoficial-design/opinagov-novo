'use client';

import { useState } from 'react';

interface ShareProps {
  userRefCode: string;
  candidatoNome: string;
}

export default function ShareReferralCard({ userRefCode, candidatoNome }: ShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://opinagov.org?ref=${userRefCode}`;
  const whatsappMessage = encodeURIComponent(
    `🔥 Acabei de declarar meu apoio oficial para ${candidatoNome} no OpinaGov! Vamos virar esse jogo. Entre pelo meu link e fortaleça nossa base também: ${shareUrl}`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 text-white shadow-2xl max-w-md mx-auto my-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">🛡️</span>
        <h3 className="text-lg font-bold">Você virou uma Liderança Verificada!</h3>
      </div>
      <p className="text-sm text-slate-300 mb-4">
        Compartilhe seu link exclusivo abaixo. Cada cidadão que apoiar através do seu link sobe sua pontuação no ranking regional de {candidatoNome}!
      </p>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 w-full focus:outline-none"
        />
        <button
          onClick={handleCopy}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-xl text-xs transition-all whitespace-nowrap"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      <a
        href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-green-900/30"
      >
        <span>💬 Compartilhar no WhatsApp</span>
      </a>
    </div>
  );
}
