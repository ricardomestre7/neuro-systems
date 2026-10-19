'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NeuroHeaderProps {
  children?: React.ReactNode;
}

export default function NeuroHeader({ children }: NeuroHeaderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passKey, setPassKey] = useState('');
  const [message, setMessage] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('neuro_therapist_auth');
      if (auth) setIsUnlocked(true);
    } catch {}

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passKey.trim().toUpperCase() === 'CYLINDER2026') {
      localStorage.setItem('neuro_therapist_auth', JSON.stringify({
        unlocked: true,
        license: 'CYLINDER2026',
        date: new Date().toLocaleDateString('pt-PT')
      }));
      setIsUnlocked(true);
      setMessage('Acesso Clínico Neuro Systems Desbloqueado!');
      setTimeout(() => setShowModal(false), 1200);
    } else {
      setMessage('Chave inválida. Utilize a chave autorizada.');
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert('Para instalar no seu computador ou telemóvel:\nNo Chrome/Edge: clique no ícone de instalar na barra de endereço ou em "Adicionar ao Ecrã Principal".');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#08091A]/95 backdrop-blur-md border-b border-[#1E1B4B] shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Marca Canónica */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-500/40 flex items-center justify-center text-indigo-300 text-xl font-bold shadow-inner"
              title="Neuro Systems Home"
            >
              🧠
            </Link>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold font-mono tracking-wider text-indigo-300">
                  NEURO SYSTEMS
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#6366F1] hidden sm:inline">
                  ·
                </span>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider font-semibold">
                  NEUROCIÊNCIA & MEMÓRIA CELULAR
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Sistema Canónico VI · Soberano
                </span>
              </div>
              <p className="text-[11px] text-[#A5B4FC]">
                Safe Creative #2610157331452 · Tecnologia Cylinder Margin
              </p>
            </div>
          </div>

          {/* Ações e Navegação Interna */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
            {children}

            <Link
              href="/minicurso"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-200 hover:bg-indigo-500/25 text-xs font-semibold transition-all"
            >
              🎓 Minicurso Clínico
            </Link>

            <button
              onClick={handleInstallPWA}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 text-xs font-semibold transition-all"
              title="Instalar no Computador / Telemóvel"
            >
              📲 Instalar App
            </button>

            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                isUnlocked
                  ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                  : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white hover:brightness-110 shadow-indigo-500/20 font-extrabold'
              }`}
            >
              {isUnlocked ? '🔓 Desbloqueado' : '🔑 Chave Mestra'}
            </button>
          </div>
        </div>
      </header>

      {/* Modal Chave Mestra */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#0E102E] border border-indigo-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-base font-bold text-white">Desbloqueio Neuro Systems</h3>
                  <p className="text-xs text-[#A5B4FC]">Acesso ilimitado à Neuroplasticidade e Reprogramação Celular</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#6366F1] hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A5B4FC] mb-1.5">
                  Chave Mestra Autorizada
                </label>
                <input
                  type="password"
                  placeholder="Insira CYLINDER2026"
                  value={passKey}
                  onChange={(e) => setPassKey(e.target.value)}
                  className="w-full bg-[#08091A] border border-[#1E1B4B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#4338CA] focus:outline-none focus:border-indigo-400 font-mono tracking-widest text-center"
                />
              </div>

              {message && (
                <p className={`text-xs text-center font-medium ${isUnlocked ? 'text-indigo-400' : 'text-rose-400'}`}>
                  {message}
                </p>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#08091A] text-[#A5B4FC] hover:text-white text-xs font-semibold transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white text-xs font-extrabold hover:brightness-110 shadow-lg shadow-indigo-500/20 transition-all"
                >
                  Validar Chave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
