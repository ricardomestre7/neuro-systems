import memoryV2Data from './data/memoryV2.json';
import modulesData from './data/memory-systems-modules.json';

export interface MemoryModule {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  version?: string;
  description: string;
  session_frequency: string;
  session_duration_min: number;
  exercises_and_protocols?: {
    id: string;
    name: string;
    type: string;
    duration_min: number;
    scientific_basis: string;
    instructions: string[];
    frequency: string;
  }[];
  kpis?: {
    id: string;
    name: string;
    scale: string;
    target: string;
    alert_threshold?: string;
  }[];
  session_flow?: {
    step: number;
    name: string;
    duration_min: number;
    description: string;
  }[];
}

export interface MemoryKnowledgeBase {
  core_principles: string[];
  scientific_refinements_v2: string[];
  user_journey: Record<string, string>;
  progression_levels: Record<string, string>;
}

export function getMemoryKnowledgeBase(): MemoryKnowledgeBase {
  return (memoryV2Data as any).system_knowledge_base || {
    core_principles: [],
    scientific_refinements_v2: [],
    user_journey: {},
    progression_levels: {}
  };
}

export function getMemoryModules(): Record<string, MemoryModule> {
  const v2Modules = (memoryV2Data as any).modules || {};
  const v1Modules = (modulesData as any).modules || {};

  const merged: Record<string, MemoryModule> = {};

  ['M1_NeuroMap', 'M2_FlowTracker', 'M3_ReconstructionEngine', 'M4_FrequencySupport'].forEach(key => {
    merged[key] = {
      ...(v1Modules[key] || {}),
      ...(v2Modules[key] || {})
    };
  });

  return merged;
}

export interface CognitiveEvaluationResult {
  compositeScore: number; // 0-100
  retentionIndex: number; // 0-10
  tier: 'Iniciante' | 'Intermédio' | 'Avançado';
  herbySynergy: string;
  acousticProtocol: string;
  dailyRoutine: string[];
}

export function evaluateCognitiveSession(
  digitSpan: number, // 3 to 12
  episodicClarity: number, // 0 to 10
  subjectiveFocus: number // 0 to 10
): CognitiveEvaluationResult {
  const normSpan = Math.min(10, Math.max(0, (digitSpan - 3) * 1.4));
  const compositeScore = Math.round(((normSpan * 10) + (episodicClarity * 10) + (subjectiveFocus * 10)) / 3);
  const retentionIndex = Math.round(((episodicClarity * 0.6) + (normSpan * 0.4)) * 10) / 10;

  let tier: 'Iniciante' | 'Intermédio' | 'Avançado' = 'Iniciante';
  if (compositeScore >= 60) tier = 'Intermédio';
  if (compositeScore >= 80) tier = 'Avançado';

  const herbySynergy = compositeScore < 60
    ? 'Bacopa monnieri (500mg extrato padronizado 20% bacosídeos) + Ginkgo biloba (120mg) para oxigenação microvascular cerebral.'
    : 'Hericium erinaceus (Juba de Leão / Lion's Mane 1000mg) para estímulo de Fator de Crescimento Nervoso (NGF) e neurogênese hipocampal.';

  const acousticProtocol = compositeScore < 70
    ? 'Gama 40 Hz isocrônico diurno por 15 minutos (arrasto cortical pré-estudo) + Solfeggio 528 Hz noturno.'
    : 'Binaural 14 Hz (SMR / Ritmo Sensoriomotor) para estabilização de foco sem ansiedade simpática.';

  const dailyRoutine = [
    'Manhã: 10 min de treino de Span Mnemónico + infusão Herby (Bacopa/Tulsi)',
    'Tarde: Pausa de 3 minutos para respiração de foco 4-7-8 e quebra de fadiga digital',
    'Noite: Registo de 1 memória episódica detalhada no Diário NeuroMap antes de dormir'
  ];

  return {
    compositeScore,
    retentionIndex,
    tier,
    herbySynergy,
    acousticProtocol,
    dailyRoutine
  };
}
