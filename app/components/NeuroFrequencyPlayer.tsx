'use client';

import React, { useState, useEffect, useRef } from 'react';

interface FreqOption {
  label: string;
  hz: number;
  effect: string;
}

const FREQS: FreqOption[] = [
  { label: 'Delta 2 Hz', hz: 2, effect: 'Regeneração Celular Profunda & Sono Reparador' },
  { label: 'Theta 6 Hz', hz: 6, effect: 'Acesso à Memória Biográfica & Reprogramação' },
  { label: 'Alfa 10 Hz', hz: 10, effect: 'Coerência Cortical & Estado de Atenção Plena' },
  { label: 'SMR 14 Hz', hz: 14, effect: 'Ritmo Sensoriomotor & Foco Calmo Sem Ansiedade' },
  { label: 'Gama 40 Hz', hz: 40, effect: 'Integração Hebbiana, Cognição & Estímulo de NGF' },
  { label: 'Solfeggio 528 Hz', hz: 528, effect: 'Harmônica Regenerativa de DNA e Neurônios' },
];

export default function NeuroFrequencyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState<FreqOption>(FREQS[4]); // Gamma 40Hz
  const [volume, setVolume] = useState<number>(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {}
      oscRef.current = null;
    }
    setIsPlaying(false);
  };

  const startAudio = (freqHz: number) => {
    stopAudio();
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqHz, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlaying(true);
    } catch (e) {
      console.error('Audio playback error:', e);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio(selectedFreq.hz);
    }
  };

  const handleSelectFreq = (f: FreqOption) => {
    setSelectedFreq(f);
    if (isPlaying) {
      startAudio(f.hz);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(v, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <div className="bg-[#0E102E] border border-indigo-500/40 rounded-2xl p-4 sm:p-5 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl select-none">🎵</span>
          <div>
            <h4 className="text-sm font-bold text-indigo-200 tracking-wide">
              Gerador de Frequências Cerebrais & Arrasto Hebbiano
            </h4>
            <p className="text-[11px] text-[#A5B4FC]">
              Ondas senoidais clínicas (Delta, Theta, Alfa, SMR, Gama 40Hz) geradas nativamente em tempo real
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
            isPlaying
              ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
              : 'bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold'
          }`}
        >
          {isPlaying ? '⏹ Parar Ondas Cerebrais' : '▶ Tocar Frequência Neural'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {FREQS.map((f) => {
          const isSelected = selectedFreq.hz === f.hz;
          return (
            <button
              key={f.hz}
              onClick={() => handleSelectFreq(f)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-indigo-500/25 border-indigo-400 text-white shadow-md'
                  : 'bg-[#08091A] border-[#1E1B4B] text-[#A5B4FC] hover:text-white hover:border-indigo-500/40'
              }`}
            >
              <div className="text-xs font-mono font-bold text-indigo-300">{f.hz} Hz</div>
              <div className="text-[10px] truncate text-white/90">{f.label.split(' ')[0]}</div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#1E1B4B]">
        <div className="text-xs text-[#A5B4FC]">
          <span className="text-indigo-400 font-mono font-semibold">{selectedFreq.hz} Hz</span>: {selectedFreq.effect}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[11px] text-[#A5B4FC] font-mono">Volume:</span>
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-indigo-400 cursor-pointer"
          />
          <span className="text-[10px] font-mono text-indigo-300 w-8">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
