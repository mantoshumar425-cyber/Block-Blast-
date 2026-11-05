/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Play, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MoreGamesModalProps {
  onClose: () => void;
  initialGame?: string;
}

interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  category: string;
}

export const MoreGamesModal: React.FC<MoreGamesModalProps> = ({ onClose, initialGame }) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(() => {
    if (initialGame === 'GOGO! Blast') return 'gogo-blast';
    if (initialGame === 'Rotate Rings') return 'rotate-rings';
    return null;
  });

  // Mini puzzle state for GOGO! Blast
  const [mazeStep, setMazeStep] = useState<number>(0);
  const [ringsAngle, setRingsAngle] = useState<number[]>([0, 90, 180, 270]);
  const [isRingsSolved, setIsRingsSolved] = useState<boolean>(false);

  const games: GameItem[] = [
    {
      id: 'gogo-blast',
      title: 'GOGO! Blast',
      subtitle: 'Draw paths & solve maze puzzle rooms',
      badge: 'HOT 🔥',
      badgeColor: 'bg-[#ff263b]',
      bgColor: 'from-[#1e293b] to-[#0f172a]',
      borderColor: 'border-[#38bdf8]/40',
      category: 'Puzzle',
      icon: (
        <div className="w-12 h-12 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
          <svg className="w-full h-full" viewBox="0 0 60 60" fill="none">
            <rect width="60" height="60" rx="30" fill="#ffffff" />
            <path d="M10 10H50V50H10V10ZM16 16V44H22V22H38V44H44V16H16ZM28 28V38H32V28H28Z" fill="#111827" />
            <path d="M12 48V32H19V38H25V18H35V38H41V24H48" stroke="#ff1744" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
    },
    {
      id: 'rotate-rings',
      title: 'Rotate Rings',
      subtitle: 'Align interlocking vibrant color loops',
      badge: 'NEW ✨',
      badgeColor: 'bg-[#00c853]',
      bgColor: 'from-[#2e2617] to-[#1a150c]',
      borderColor: 'border-[#fbbf24]/40',
      category: 'Casual',
      icon: (
        <div className="w-12 h-12 rounded-full bg-[#ffd54f] p-1 flex items-center justify-center shrink-0 shadow-md">
          <svg className="w-full h-full" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" fill="#ffecb3" />
            <circle cx="23" cy="23" r="11" stroke="#00c853" strokeWidth="4.5" fill="none" />
            <circle cx="37" cy="25" r="11" stroke="#ff1744" strokeWidth="4.5" fill="none" />
            <circle cx="24" cy="37" r="11" stroke="#2979ff" strokeWidth="4.5" fill="none" />
            <circle cx="37" cy="37" r="11" stroke="#ffd600" strokeWidth="4.5" fill="none" />
          </svg>
        </div>
      ),
    },
    {
      id: 'block-rush',
      title: 'Block Blast Rush',
      subtitle: '60-second rapid-fire line clear challenge',
      badge: 'SPEED',
      badgeColor: 'bg-[#ff9100]',
      bgColor: 'from-[#291738] to-[#140b1c]',
      borderColor: 'border-[#c084fc]/40',
      category: 'Arcade',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c084fc] to-[#7c3aed] flex items-center justify-center text-white font-black text-xl shadow-md">
          ⚡
        </div>
      ),
    },
    {
      id: 'color-sort',
      title: 'Water Color Sort 3D',
      subtitle: 'Pour and sort vibrant matching liquids',
      bgColor: 'from-[#172e29] to-[#0c1c18]',
      borderColor: 'border-[#34d399]/40',
      category: 'Logic',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#34d399] to-[#059669] flex items-center justify-center text-white text-xl shadow-md">
          🧪
        </div>
      ),
    },
  ];

  const handleRotateRing = (index: number) => {
    sounds.playClick();
    const updated = [...ringsAngle];
    updated[index] = (updated[index] + 90) % 360;
    setRingsAngle(updated);
    if (updated.every((a) => a === 0)) {
      setIsRingsSolved(true);
      sounds.playLevelVictory();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in select-none">
      <div className="relative w-full max-w-sm rounded-[28px] bg-[#2d3037] border-[3px] border-[#5e616b] p-5 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#434650] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00d426]/20 text-[#00e62e] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">More Games</h2>
              <p className="text-[11px] text-slate-400">Discover popular mini-challenges</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Mini-Game Preview Interactive Area */}
        {activeGameId === 'gogo-blast' && (
          <div className="mb-4 p-4 rounded-2xl bg-[#1e293b] border border-[#38bdf8]/40 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-bold text-sky-400">Mini-Challenge: GOGO! Blast</span>
              <span className="text-[10px] text-slate-400">Tap to advance solver</span>
            </div>
            <div className="relative w-48 h-32 rounded-xl bg-slate-900 border border-slate-700 p-2 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Start 🟢</span>
                <span>Goal 🚩</span>
              </div>
              {/* Path nodes */}
              <div className="flex items-center justify-around py-3">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      mazeStep >= step
                        ? 'bg-[#ff1744] text-white shadow-[0_0_10px_rgba(255,23,68,0.8)]'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    {step + 1}
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  sounds.playPlace();
                  setMazeStep((s) => (s + 1) % 4);
                }}
                className="w-full py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all cursor-pointer"
              >
                {mazeStep === 3 ? '🎉 Solved! Reset' : 'Step Runner ➡️'}
              </button>
            </div>
          </div>
        )}

        {activeGameId === 'rotate-rings' && (
          <div className="mb-4 p-4 rounded-2xl bg-[#2e2617] border border-[#fbbf24]/40 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-bold text-amber-400">Mini-Challenge: Rotate Rings</span>
              <span className="text-[10px] text-slate-400">Align all loops to 0°</span>
            </div>
            <div className="grid grid-cols-2 gap-3 py-2">
              {ringsAngle.map((angle, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRotateRing(idx)}
                  className="w-16 h-16 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center cursor-pointer hover:border-amber-400 transition-all active:scale-95"
                >
                  <div
                    className="w-10 h-10 rounded-full border-4 border-amber-400 border-t-transparent transition-transform duration-200"
                    style={{ transform: `rotate(${angle}deg)` }}
                  />
                </button>
              ))}
            </div>
            {isRingsSolved && (
              <div className="mt-2 text-xs font-bold text-emerald-400 flex items-center gap-1 animate-bounce">
                <Check className="w-4 h-4" /> Solved! Great puzzle reflexes!
              </div>
            )}
          </div>
        )}

        {/* Game Cards List */}
        <div className="space-y-3">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => {
                sounds.playClick();
                setActiveGameId(game.id);
              }}
              className={`p-3 rounded-2xl bg-gradient-to-r ${game.bgColor} border ${game.borderColor} hover:brightness-110 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-md`}
            >
              <div className="flex items-center gap-3">
                {game.icon}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">{game.title}</span>
                    {game.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full ${game.badgeColor} text-[9px] font-black text-white`}>
                        {game.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-300 leading-tight line-clamp-1">{game.subtitle}</p>
                </div>
              </div>

              <button className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white shrink-0 flex items-center gap-1 cursor-pointer">
                <span>Play</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="mt-4 w-full py-2.5 rounded-xl bg-[#4a4d57] hover:bg-[#565964] text-xs font-bold text-slate-200 transition-colors cursor-pointer"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};
