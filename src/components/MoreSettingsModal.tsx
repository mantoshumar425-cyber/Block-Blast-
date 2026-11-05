/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Settings, Volume2, Music, Trash2, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface MoreSettingsModalProps {
  onClose: () => void;
  musicVolume: number;
  onMusicVolumeChange: (val: number) => void;
  sfxVolume: number;
  onSfxVolumeChange: (val: number) => void;
  onOpenHowToPlay: () => void;
  onResetAllData?: () => void;
}

export const MoreSettingsModal: React.FC<MoreSettingsModalProps> = ({
  onClose,
  musicVolume,
  onMusicVolumeChange,
  sfxVolume,
  onSfxVolumeChange,
  onOpenHowToPlay,
  onResetAllData,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in select-none">
      <div className="relative w-full max-w-sm rounded-[28px] bg-[#2d3037] border-[3px] border-[#5e616b] p-5 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#434650] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#00d426]/20 text-[#00e62e] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">More Settings</h2>
              <p className="text-[11px] text-slate-400">Audio Volumes & Game Preferences</p>
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

        {/* Ambient Music Slider */}
        <div className="p-3.5 rounded-2xl bg-[#23252b] border border-[#3b3e47] mb-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Music className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">Music Volume</span>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums">
              {Math.round(musicVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={musicVolume}
            onChange={(e) => onMusicVolumeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#3a3d46] rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* SFX Volume Slider */}
        <div className="p-3.5 rounded-2xl bg-[#23252b] border border-[#3b3e47] mb-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">Sound Effects (SFX)</span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 tabular-nums">
              {Math.round(sfxVolume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={sfxVolume}
            onChange={(e) => onSfxVolumeChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#3a3d46] rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>

        {/* How to Play Guide Shortcut */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
            onOpenHowToPlay();
          }}
          className="w-full mb-3 p-3 rounded-2xl bg-[#23252b] border border-[#3b3e47] hover:bg-[#2b2d35] transition-colors flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">Rules & Scoring Guide</span>
          </div>
          <span className="text-xs text-slate-400">View ➡️</span>
        </button>

        {/* Clear Data / Reset */}
        {onResetAllData && (
          <button
            onClick={() => {
              if (window.confirm('Reset all saved high scores, streaks, and settings?')) {
                sounds.playClick();
                onResetAllData();
                onClose();
              }
            }}
            className="w-full mb-3 p-3 rounded-2xl bg-rose-950/30 border border-rose-800/40 hover:bg-rose-900/30 transition-colors flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-rose-300">Reset Local High Scores</span>
            </div>
            <span className="text-[10px] text-rose-400">Clear</span>
          </button>
        )}

        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-[#4a4d57] hover:bg-[#565964] text-xs font-bold text-slate-200 transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
