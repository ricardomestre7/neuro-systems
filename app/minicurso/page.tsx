'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NeuroFrequencyPlayer from '../components/NeuroFrequencyPlayer';

export default function MinicursoNeuroPage() {
  const [activeTab, setActiveTab] = useState<'modulo1' | 'modulo2' | 'modulo3' | 'certificado'>('modulo1');
  const [alunoNome, setAlunoNome] = useState('');
  const [notasEstudo, setNotasEstudo] = useState('');
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  useEffect(() => {
    try {
      const savedNotas = localStorage.getItem('minicurso_neuro_notas');
      if (savedNotas) setNotasEstudo(savedNotas);
      const savedAluno = localStorage.getItem('minicurso_neuro_aluno');
      if (savedAluno) setAlunoNome(savedAluno);
    } catch {}
  }, []);

  const handleSalvarNotas = () => {
    try {
      localStorage.setItem('minicurso_neuro_notas', notasEstudo);
      localStorage.setItem('minicurso_neuro_aluno', alunoNome);
      alert('Notas guardadas no seu dispositivo com sucesso!');
    } catch {}
  };

  const handleGerarCertificado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alunoNome.trim()) {
      alert('Por favor, digite o seu nome completo para o certificado.');
      return;
    }
    handleSalvarNotas();
    setActiveTab('certificado');
  };

  return (
    <div className="min-h-screen bg-[#08091A] text-[#EDE9FE] flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-300">
      <header className="sticky top-0 z-40 bg-[#0E102E]/90 backdrop-blur-md border-b border-[#1E1B4B] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1.5"
            >
              ← Voltar ao Neuro Systems
            </Link>
            <span className="text-xs text-[#1E1B4B]">/</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#A5B4FC]">
              MINICURSO DE NEUROCIÊNCIA & REPROGRAMAÇÃO CELULAR
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
            Sistema Canónico VI · Safe Creative #2610157331452
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8 flex-1 space-y-8 w-full">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold bg-indigo-400/10 border border-indigo-400/30 px-3 py-1 rounded-full">
            Formação Clínica Soberana · Neuro Systems
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Neuroplasticidade Hebbiana, Memória Celular & Reprogramação Biográfica
          </h1>
          <p className="text-xs sm:text-sm text-[#A5B4FC] leading-relaxed">
            Domine a reconfiguração de engramas mnemônicos, a neurogênese hipocampal estimulada por fitoterápicos (Hericium erinaceus / Bacopa) e o arrasto oscilatório cortical de Gama 40Hz e SMR 14Hz.
          </p>
        </div>

        <NeuroFrequencyPlayer />

        <div className="flex border-b border-[#1E1B4B] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('modulo1')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo1'
                ? 'bg-[#0E102E] text-indigo-300 border-t-2 border-indigo-400'
                : 'text-[#A5B4FC] hover:text-white'
            }`}
          >
            Módulo 1: Leis de Hebb & Potenciação Sináptica (LTP)
          </button>
          <button
            onClick={() => setActiveTab('modulo2')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo2'
                ? 'bg-[#0E102E] text-indigo-300 border-t-2 border-indigo-400'
                : 'text-[#A5B4FC] hover:text-white'
            }`}
          >
            Módulo 2: Desativação de Engramas & Memória Celular
          </button>
          <button
            onClick={() => setActiveTab('modulo3')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'modulo3'
                ? 'bg-[#0E102E] text-indigo-300 border-t-2 border-indigo-400'
                : 'text-[#A5B4FC] hover:text-white'
            }`}
          >
            Módulo 3: Protocolos de Prescrição Neuro-Regenerativa
          </button>
          <button
            onClick={() => setActiveTab('certificado')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all shrink-0 ${
              activeTab === 'certificado'
                ? 'bg-[#0E102E] text-indigo-300 border-t-2 border-indigo-400'
                : 'text-[#A5B4FC] hover:text-white'
            }`}
          >
            📜 Certificado Safe Creative
          </button>
        </div>

        {activeTab === 'modulo1' && (
          <div className="space-y-6 bg-[#0E102E] p-6 rounded-2xl border border-[#1E1B4B]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>⚡</span> Princípio de Donald Hebb: "Neurons that fire together, wire together"
            </h2>
            <div className="space-y-3 text-xs text-[#A5B4FC] leading-relaxed">
              <p>
                A neuroplasticidade é a capacidade do sistema nervoso de modificar a sua estrutura e função em resposta a estímulos, aprendizagem e reprogramação ativa. A Potenciação de Longo Prazo (LTP) consolida circuitos que são repetidamente ativados através de canais NMDA e receptores AMPA.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#08091A] rounded-xl border border-indigo-500/30">
                  <h4 className="font-bold text-white mb-1">Gama 40 Hz & Coerência Hipocampal</h4>
                  <p className="text-[11px] text-[#A5B4FC]">
                    Estimula a liberação de NGF (Nerve Growth Factor) e BDNF, favorecendo a limpeza de proteínas beta-amiloides e acelerando a plasticidade sináptica.
                  </p>
                </div>
                <div className="p-4 bg-[#08091A] rounded-xl border border-indigo-500/30">
                  <h4 className="font-bold text-white mb-1">SMR 14 Hz (Sensoriomotor)</h4>
                  <p className="text-[11px] text-[#A5B4FC]">
                    Inibe a hiperativação motora e cortical, estabelecendo a base fisiológica de calma focada necessária para a codificação mnemônica sem dispersão.
                  </p>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#08091A] rounded-xl border border-[#1E1B4B] cursor-pointer">
              <input
                type="checkbox"
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
                className="w-4 h-4 accent-indigo-400 rounded"
              />
              <span className="text-xs text-[#EDE9FE]">
                Compreendi as bases neurobiológicas da potenciação a longo prazo (LTP) e o arrasto Gama 40Hz.
              </span>
            </label>
          </div>
        )}

        {activeTab === 'modulo2' && (
          <div className="space-y-6 bg-[#0E102E] p-6 rounded-2xl border border-[#1E1B4B]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🧬</span> Desativação de Engramas Traumáticos & Memória Epigenética Celular
            </h2>
            <div className="space-y-3 text-xs text-[#A5B4FC] leading-relaxed">
              <p>
                Toda a memória emocional traumática fica codificada não apenas como conexões corticais, mas como marcas epigenéticas e estresse oxidativo na mitocôndria dos neurônios e células gliais. O protocolo de reconstrução biográfica permite reabrir a janela de labilidade mnemônica (reconsolidação da memória) e dissociar a carga simpática da imagem mnemônica.
              </p>
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#08091A] rounded-xl border border-[#1E1B4B] cursor-pointer">
              <input
                type="checkbox"
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
                className="w-4 h-4 accent-indigo-400 rounded"
              />
              <span className="text-xs text-[#EDE9FE]">
                Domino os passos da reconsolidação da memória e desativação somato-afetiva.
              </span>
            </label>
          </div>
        )}

        {activeTab === 'modulo3' && (
          <div className="space-y-6 bg-[#0E102E] p-6 rounded-2xl border border-[#1E1B4B]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📋</span> Prescrição Clínica de Suporte Neurocognitivo
            </h2>

            {/* Caderno de Estudos com Persistência Local */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-indigo-300 uppercase">
                  Caderno de Notas Neurocognitivas (Persistência Local)
                </h3>
                <button
                  type="button"
                  onClick={handleSalvarNotas}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                >
                  Salvar Notas
                </button>
              </div>
              <textarea
                value={notasEstudo}
                onChange={(e) => setNotasEstudo(e.target.value)}
                placeholder="Registe os resultados de span mnemónico, doses de nootrópicos e tempos de arrasto acústico..."
                rows={4}
                className="w-full bg-[#08091A] border border-[#1E1B4B] rounded-xl p-3 text-xs text-white placeholder-[#4338CA] focus:outline-none focus:border-indigo-400"
              />
            </div>

            <label className="flex items-center gap-3 p-3 bg-[#08091A] rounded-xl border border-[#1E1B4B] cursor-pointer">
              <input
                type="checkbox"
                checked={check3}
                onChange={(e) => setCheck3(e.target.checked)}
                className="w-4 h-4 accent-indigo-400 rounded"
              />
              <span className="text-xs text-[#EDE9FE]">
                Atingi proficiência para prescrever rotinas cognitivas e emitir certificação clínica.
              </span>
            </label>

            <form onSubmit={handleGerarCertificado} className="p-4 bg-[#08091A] rounded-xl border border-indigo-500/40 space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 uppercase">
                Emissão de Certificado de Neurociência & Memória Celular
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nome completo do terapeuta / neurocientista"
                  value={alunoNome}
                  onChange={(e) => setAlunoNome(e.target.value)}
                  className="flex-1 bg-[#0E102E] border border-[#1E1B4B] rounded-xl px-4 py-2 text-xs text-white placeholder-[#4338CA] focus:outline-none focus:border-indigo-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-extrabold hover:brightness-110 shadow-md transition-all shrink-0"
                >
                  Gerar Certificado
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'certificado' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#A5B4FC]">
                Certificado oficial registrado sob a titularidade Safe Creative internacional.
              </p>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-400 transition-all shadow-md"
              >
                🖨️ Imprimir / Guardar em PDF
              </button>
            </div>

            <div className="bg-[#0E102E] p-8 sm:p-12 rounded-3xl border-2 border-indigo-500/50 text-center space-y-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">
                  SISTEMA CANÓNICO VI · CYLINDER MARGIN
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  CERTIFICADO DE ESPECIALIZAÇÃO CLÍNICA
                </h2>
                <div className="text-xs text-indigo-200/80 font-mono">
                  Neurociência Cognitiva, Neuroplasticidade Hebbiana & Memória Celular
                </div>
              </div>

              <div className="py-4 space-y-3 border-y border-[#1E1B4B]">
                <p className="text-xs text-[#A5B4FC] uppercase tracking-wider">Certificamos com distinção que</p>
                <p className="text-xl sm:text-2xl font-black text-indigo-300 font-serif">
                  {alunoNome || 'Dr(a). Terapeuta Cognitivo'}
                </p>
                <p className="text-xs text-[#A5B4FC] max-w-xl mx-auto leading-relaxed">
                  concluiu com êxito o programa de avaliação cognitiva avançada, estimulação de plasticidade neuronal através de frequências Gama 40Hz e SMR 14Hz, reprogramação de memórias biográficas e prescrição clínica do Sistema Canónico VI.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-[10px] text-[#6366F1] font-mono">
                <div>
                  <p className="text-[#A5B4FC] font-bold">Titular: Ricardo R Pereira</p>
                  <p>Cylinder Margin · cylindermargin.tech</p>
                </div>
                <div className="text-right">
                  <p className="text-indigo-400 font-bold">Safe Creative #2610157331452</p>
                  <p>Data: {new Date().toLocaleDateString('pt-PT')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
