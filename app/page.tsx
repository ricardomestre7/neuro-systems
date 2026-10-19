'use client';

import React, { useState, useMemo } from 'react';
import NeuroHeader from '@/app/components/NeuroHeader';
import NeuroFrequencyPlayer from '@/app/components/NeuroFrequencyPlayer';
import {
  getMemoryModules,
  getMemoryKnowledgeBase,
  evaluateCognitiveSession,
  MemoryModule
} from '@/lib/memory/memoryService';

export default function MemoryPage() {
  const [activeTab, setActiveTab] = useState<'modulos' | 'exercicios' | 'jornada' | 'scanner' | 'prescricao'>('modulos');
  const [selectedModuleKey, setSelectedModuleKey] = useState<string>('M1_NeuroMap');

  // Scanner State
  const [inputDigitSpan, setInputDigitSpan] = useState<number>(7);
  const [inputEpisodicClarity, setInputEpisodicClarity] = useState<number>(7);
  const [inputFocusScore, setInputFocusScore] = useState<number>(8);

  // Prescription Generator State
  const [patientName, setPatientName] = useState('');
  const [therapistName, setTherapistName] = useState('Dr(a). Terapeuta Integrativo');
  const [prescribedItems, setPrescribedItems] = useState<{
    moduleName: string;
    exercise: string;
    scientificBasis: string;
    frequency: string;
    botanicalSupport: string;
  }[]>([
    {
      moduleName: 'M1 NeuroMap',
      exercise: 'Evocação Episódica Guiada (3 detalhes sensoriais)',
      scientificBasis: 'Memória episódica hipocampal e codificação contextual',
      frequency: 'Diária (10 min pela manhã)',
      botanicalSupport: 'Bacopa monnieri 500mg'
    }
  ]);
  const [clinicalNotes, setClinicalNotes] = useState('Manter rotina de sono NREM/REM regular para consolidação sináptica ideal.');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Raw data from vault
  const modules = useMemo(() => getMemoryModules(), []);
  const knowledgeBase = useMemo(() => getMemoryKnowledgeBase(), []);

  // Selected module
  const currentModule = useMemo(() => {
    return modules[selectedModuleKey] || modules['M1_NeuroMap'];
  }, [modules, selectedModuleKey]);

  // Cognitive evaluation calculation
  const evalResult = useMemo(() => {
    return evaluateCognitiveSession(inputDigitSpan, inputEpisodicClarity, inputFocusScore);
  }, [inputDigitSpan, inputEpisodicClarity, inputFocusScore]);

  const addExerciseToPrescription = (ex: any, modName: string) => {
    const exists = prescribedItems.some(i => i.exercise === ex.name);
    if (!exists) {
      setPrescribedItems(prev => [
        ...prev,
        {
          moduleName: modName,
          exercise: ex.name,
          scientificBasis: ex.scientific_basis,
          frequency: ex.frequency || 'Diária',
          botanicalSupport: 'Bacopa monnieri / Hericium erinaceus'
        }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Unified Portal Header */}
      <NeuroHeader />

      {/* Main Calibrated Container with Generous Spacing and Regal Cadence */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 pt-12 sm:pt-16 md:pt-20 pb-28 w-full space-y-12 sm:space-y-16">
        {/* HERO SECTION REGAL */}
        <header className="space-y-5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            SISTEMA CANÔNICO XI · NEUROENGENHARIA COGNITIVA &amp; NEUROPLASTICIDADE
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
              Biohacking Cerebral &amp; Reserva Cognitiva
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
              4 módulos neurofuncionais calibrados (Foco &amp; Alfa, Memória de Trabalho, Clareza Mental e Longevidade Neural), protocolos de estímulo do BDNF e neurogênese, jornada de consolidação sináptica em 8 semanas e scanner neurocognitivo.
            </p>
          </div>

          {/* Badges de Certificação e Arquitetura Canônica */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#0E102E] border border-blue-500/40 text-blue-300 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-sm">
              <span>🧠</span> 4 Módulos Clínicos V2
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#0E102E] border border-[#1E1B4B] text-slate-300 text-xs font-mono flex items-center gap-1.5">
              <span>⚡</span> Neuroplasticidade &amp; BDNF
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#0E102E] border border-[#1E1B4B] text-slate-300 text-xs font-mono flex items-center gap-1.5">
              <span>🗺️</span> Trilha 8 Semanas
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#0E102E] border border-[#1E1B4B] text-slate-400 text-xs font-mono">
              Safe Creative #2610157331452
            </span>
          </div>
        </header>

        {/* NAVEGAÇÃO FLUTUANTE EM PÍLULA ELEVADA */}
        <section className="bg-[#0E102E]/90 backdrop-blur-md border border-[#1E1B4B] p-2 rounded-2xl shadow-xl flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('modulos')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'modulos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🧠</span>
            <span>Módulos V2 (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('exercicios')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'exercicios'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>⚡</span>
            <span>Neuroplasticidade</span>
          </button>

          <button
            onClick={() => setActiveTab('jornada')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'jornada'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>🗺️</span>
            <span>Trilha 8 Semanas</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'scanner'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>📊</span>
            <span>Scanner Cognitivo</span>
          </button>

          <button
            onClick={() => setActiveTab('prescricao')}
            className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'prescricao'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>📋</span>
            <span>Prescrição Memory</span>
          </button>
        </section>

        {/* TAB 1: Módulos Neurocognitivos */}
        {activeTab === 'modulos' && (
          <div className="space-y-8">
            {/* Module Selector Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(modules).map(([key, mod]) => (
                <button
                  key={key}
                  onClick={() => setSelectedModuleKey(key)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedModuleKey === key
                      ? 'bg-blue-950/60 border-blue-500/80 shadow-lg shadow-blue-950/30'
                      : 'bg-[#0E102E] border-[#1E1B4B] hover:border-slate-700'
                  }`}
                >
                  <div className="text-xl mb-1">{mod.icon}</div>
                  <div className="text-xs font-bold text-white">{mod.name}</div>
                  <div className="text-[10px] text-slate-400 truncate">{mod.tagline}</div>
                </button>
              ))}
            </div>

            {/* Selected Module Detail */}
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E1B4B]">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-3 bg-blue-950/50 border border-blue-800/40 rounded-2xl">
                    {currentModule.icon}
                  </span>
                  <div>
                    <div className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                      {currentModule.id} · MEMORY SYSTEMS V2
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      {currentModule.name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">{currentModule.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Sessão:</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {currentModule.session_duration_min} min ({currentModule.session_frequency})
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed bg-[#070B14] p-4 rounded-2xl border border-[#1E1B4B]">
                {currentModule.description}
              </p>

              {/* Session Flow Steps */}
              {currentModule.session_flow && currentModule.session_flow.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>⏱️</span>
                    <span>Fluxo da Sessão Clínica ({currentModule.session_duration_min} min)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {currentModule.session_flow.map((step) => (
                      <div
                        key={step.step}
                        className="p-3.5 bg-[#070B14] border border-[#1E1B4B] rounded-2xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-blue-400 mb-1">
                            <span>Passo {step.step}: {step.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{step.duration_min}m</span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercises in Module */}
              {currentModule.exercises_and_protocols && currentModule.exercises_and_protocols.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span>⚡</span>
                    <span>Exercícios & Protocolos Vinculados ({currentModule.exercises_and_protocols.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentModule.exercises_and_protocols.map((ex) => (
                      <div
                        key={ex.id}
                        className="p-4 bg-[#070B14] border border-[#1E1B4B] hover:border-blue-500/40 rounded-2xl flex flex-col justify-between transition-all"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-white">{ex.name}</span>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                              {ex.duration_min} min
                            </span>
                          </div>

                          <div className="text-[11px] text-blue-300/90 italic mb-2">
                            Base: {ex.scientific_basis}
                          </div>

                          <ul className="text-xs text-slate-400 space-y-1 mb-3">
                            {ex.instructions.map((inst, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>{inst}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          onClick={() => addExerciseToPrescription(ex, currentModule.name)}
                          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-blue-300 transition-colors mt-2"
                        >
                          + Adicionar à Prescrição
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Exercícios de Neuroplasticidade */}
        {activeTab === 'exercicios' && (
          <div className="space-y-6">
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <span>⚡</span>
                <span>Compêndio de Rotinas de Neuroplasticidade & Fixação</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                A memória não é uma gravação estática num disco rígido: é um processo contínuo de reconsolidação sináptica. A cada evocação, o traço mnémico torna-se temporariamente lábil e receptivo a modificação, recontextualização e alívio de estresse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.values(modules).flatMap(m => m.exercises_and_protocols || []).map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300">
                        {ex.id}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/30">
                        {ex.duration_min} min · {ex.frequency}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">{ex.name}</h3>
                    <div className="text-xs text-blue-400 font-medium mb-3">{ex.scientific_basis}</div>

                    <div className="space-y-1.5 mb-4 text-xs text-slate-300 bg-[#070B14] p-3 rounded-xl border border-[#1E1B4B]">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Passos da Rotina:</span>
                      {ex.instructions.map((inst, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-blue-400 font-mono text-[10px]">{i + 1}.</span>
                          <span>{inst}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => addExerciseToPrescription(ex, 'Neuro-Rotina')}
                    className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
                  >
                    + Incluir na Prescrição
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Trilha de 8 Semanas */}
        {activeTab === 'jornada' && (
          <div className="space-y-6">
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <span>🗺️</span>
                <span>Trilha Neurocognitiva de 8 Semanas (User Journey V2)</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                Metodologia progressiva de consolidação de padrões mnémicos desenhada para criar novos circuitos axonais duradouros sem sobrecarga cognitiva.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(knowledgeBase.user_journey).map(([key, desc], idx) => (
                <div
                  key={key}
                  className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-blue-950/60 border border-blue-800/40 text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
                        {key.replace('_', ' ').toUpperCase()}
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        {idx === 0 && 'Estabelecimento de Linha de Base (M1 + M2)'}
                        {idx === 1 && 'Ativação do Motor de Reconstrução Mnémica (M3)'}
                        {idx === 2 && 'Integração Profunda & Reforço Acústico (M3 + M4)'}
                        {idx === 3 && 'Consolidação de Padrões & Manutenção Autônoma'}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">{desc}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/40 px-3 py-1 rounded-xl border border-cyan-800/30 self-start md:self-center shrink-0">
                    2 Semanas
                  </span>
                </div>
              ))}
            </div>

            {/* Scientific Refinements Box */}
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span>🔬</span>
                <span>Refinamentos Neurocientíficos Validados</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                {knowledgeBase.scientific_refinements_v2.map((ref, i) => (
                  <li key={i} className="p-3 rounded-xl bg-[#070B14] border border-[#1E1B4B] flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: Scanner Cognitivo */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            <NeuroFrequencyPlayer />
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                <span>📊</span>
                <span>Scanner de Linha de Base Cognitiva & Receptividade</span>
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                Insira os marcadores de desempenho cognitivo para calcular o Índice NeuroMap, determinar o nível de neuroplasticidade e associar suporte fitoterápico (Herby) e sonoro (Frequencies).
              </p>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-5">
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Span de Dígitos (Extensão): <span className="text-blue-400 font-bold text-sm">{inputDigitSpan} dígitos</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={inputDigitSpan}
                  onChange={(e) => setInputDigitSpan(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                  <span>3 (Alerta)</span>
                  <span>7 (Normal)</span>
                  <span>12 (Superior)</span>
                </div>
              </div>

              <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-5">
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Nitidez Episódica (0-10): <span className="text-cyan-400 font-bold text-sm">{inputEpisodicClarity}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputEpisodicClarity}
                  onChange={(e) => setInputEpisodicClarity(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                  <span>1 (Difusa)</span>
                  <span>5 (Moderada)</span>
                  <span>10 (Vívida)</span>
                </div>
              </div>

              <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-5">
                <label className="block text-xs font-semibold text-slate-400 mb-2">
                  Foco & Atenção Sustentada (0-10): <span className="text-indigo-400 font-bold text-sm">{inputFocusScore}/10</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={inputFocusScore}
                  onChange={(e) => setInputFocusScore(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                  <span>1 (Disperso)</span>
                  <span>5 (Médio)</span>
                  <span>10 (Profundo)</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0E102E] border border-blue-500/30 rounded-2xl p-5 text-center shadow-lg shadow-blue-950/20">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Índice Composto NeuroMap
                </span>
                <span className="text-3xl font-extrabold text-blue-400 font-mono">
                  {evalResult.compositeScore}
                </span>
                <span className="text-xs text-blue-300 ml-1">/100</span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Nível Atribuído: <strong className="text-slate-200">{evalResult.tier}</strong>
                </p>
              </div>

              <div className="bg-[#0E102E] border border-cyan-500/30 rounded-2xl p-5 text-center shadow-lg shadow-cyan-950/20">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Índice de Retenção Hipocampal
                </span>
                <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                  {evalResult.retentionIndex}
                </span>
                <span className="text-xs text-cyan-300 ml-1">/10</span>
                <p className="text-[11px] text-slate-500 mt-2">
                  Consolidação sináptica relativa
                </p>
              </div>

              <div className="bg-[#0E102E] border border-indigo-500/30 rounded-2xl p-5 text-center shadow-lg shadow-indigo-950/20">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Arrasto Neuroacústico
                </span>
                <span className="text-xl font-bold text-indigo-300 mt-1 block">
                  {evalResult.acousticProtocol.split(' ')[0]} {evalResult.acousticProtocol.split(' ')[1]}
                </span>
                <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
                  {evalResult.acousticProtocol}
                </p>
              </div>
            </div>

            {/* Recommendations Box */}
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-6 space-y-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-200/90 leading-relaxed">
                <strong className="text-emerald-400 block mb-1">🌿 Sinergia Fitoterápica Herby Recomendada:</strong>
                {evalResult.herbySynergy}
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Rotina Diária de Estimulação:
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {evalResult.dailyRoutine.map((rout, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#070B14] border border-[#1E1B4B] flex items-center gap-2">
                      <span className="text-blue-400 font-bold">→</span>
                      <span>{rout}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Prescrição Neurocognitiva */}
        {activeTab === 'prescricao' && (
          <div className="space-y-6">
            <div className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                  <span>📋</span>
                  <span>Emissor de Prescrição Neurocognitiva & Mnemónica</span>
                </h2>
                <p className="text-xs text-slate-400 max-w-xl">
                  Gere documentos clínicos personalizados com rotinas mnemónicas, nootrópicos naturais (Herby) e modulação por batimentos binaurais.
                </p>
              </div>

              <button
                onClick={() => setShowPrescriptionModal(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <span>🖨️</span>
                <span>Visualizar / Imprimir Prescrição ({prescribedItems.length})</span>
              </button>
            </div>

            <div className="space-y-3">
              {prescribedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0E102E] border border-[#1E1B4B] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.exercise}</span>
                      <span className="text-[10px] text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/40">
                        {item.moduleName}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 bg-[#070B14] p-2.5 rounded-xl border border-[#1E1B4B]">
                      <strong>Base Científica:</strong> {item.scientificBasis}
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap gap-3">
                      <span>Frequência: <strong className="text-cyan-300">{item.frequency}</strong></span>
                      <span>Suporte Fitoterápico: <strong className="text-emerald-400">{item.botanicalSupport}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => setPrescribedItems(prev => prev.filter((_, i) => i !== idx))}
                    className="text-xs text-slate-500 hover:text-rose-400 p-1"
                  >
                    ✕ Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Modal: Emissão de Prescrição */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E102E] border border-blue-500/40 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setShowPrescriptionModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>

            <div className="text-center pb-4 border-b border-[#1E1B4B] mb-6">
              <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-1">
                SISTEMA REGENERATIVO · PORTAL XI MEMORY
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Prescrição de Suporte Neurocognitivo & Memória
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Propriedade Intelectual Safe Creative #2610157331452 · Tecnologia Cylinder Margin
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nome do Paciente / Interagente:</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Ex: Carlos Alberto"
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Terapeuta Responsável:</label>
                <input
                  type="text"
                  value={therapistName}
                  onChange={(e) => setTherapistName(e.target.value)}
                  className="w-full bg-[#070B14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                Exercícios & Rotinas Selecionados ({prescribedItems.length}):
              </span>

              {prescribedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#070B14] border border-[#1E1B4B] rounded-xl space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.exercise}</span>
                    <button
                      onClick={() => setPrescribedItems(prev => prev.filter((_, i) => i !== idx))}
                      className="text-slate-500 hover:text-rose-400 text-xs p-0.5"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-[11px] text-blue-400">{item.moduleName} · {item.frequency}</div>
                  <div className="text-xs text-slate-200 bg-[#0E102E] p-2 rounded-lg border border-[#1E1B4B]">
                    <strong>Base:</strong> {item.scientificBasis}
                  </div>
                  <div className="text-[11px] text-emerald-300 font-mono">Suporte Nootrópico: {item.botanicalSupport}</div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Orientações de Sono & Estilo de Vida:</label>
              <textarea
                rows={3}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                className="w-full bg-[#070B14] border border-slate-700 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1E1B4B]">
              <button
                onClick={() => setShowPrescriptionModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Voltar
              </button>

              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center gap-2"
              >
                <span>🖨️</span>
                <span>Imprimir / Salvar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
