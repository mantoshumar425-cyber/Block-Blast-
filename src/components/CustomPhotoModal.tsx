/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Upload, Check, Sparkles, Image as ImageIcon, Palette } from 'lucide-react';
import { BoardTheme } from '../types/game';
import { BOARD_THEMES } from '../utils/themes';
import { sounds } from '../utils/audio';

interface CustomPhotoModalProps {
  onClose: () => void;
  currentTheme: BoardTheme;
  onSelectTheme: (theme: BoardTheme) => void;
  customPhotoUrl: string | null;
  onSetCustomPhotoUrl: (url: string | null) => void;
}

interface PhotoPreset {
  id: string;
  name: string;
  tag: string;
  thumbnail: string;
  gradient: string;
}

// Built-in presets matching screenshots (Golden Pup, Cute Cat, Friends, Sunset, Cosmic)
const PHOTO_PRESETS: PhotoPreset[] = [
  {
    id: 'dog',
    name: 'Golden Pup',
    tag: 'Pet',
    thumbnail: '🐕',
    gradient: 'from-amber-400 via-orange-500 to-yellow-600',
  },
  {
    id: 'cat',
    name: 'Winter Kitten',
    tag: 'Pet',
    thumbnail: '🐱',
    gradient: 'from-sky-300 via-indigo-400 to-purple-600',
  },
  {
    id: 'friends',
    name: 'Happy Memories',
    tag: 'People',
    thumbnail: '👥',
    gradient: 'from-rose-400 via-orange-400 to-amber-300',
  },
  {
    id: 'sunset',
    name: 'Sunset Haven',
    tag: 'Nature',
    thumbnail: '🌅',
    gradient: 'from-purple-600 via-rose-500 to-amber-400',
  },
  {
    id: 'galaxy',
    name: 'Cosmic Nebula',
    tag: 'Space',
    thumbnail: '🌌',
    gradient: 'from-indigo-600 via-purple-700 to-cyan-500',
  },
];

export const CustomPhotoModal: React.FC<CustomPhotoModalProps> = ({
  onClose,
  currentTheme,
  onSelectTheme,
  customPhotoUrl,
  onSetCustomPhotoUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'skins'>('photo');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          onSetCustomPhotoUrl(dataUrl);
          onSelectTheme('photo_custom');
          sounds.playLevelVictory();
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('blockblast_custom_photo', dataUrl);
            } catch {}
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (preset: PhotoPreset) => {
    sounds.playClick();
    // Create an inline canvas image for this preset
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 400, 400);
      if (preset.id === 'dog') {
        grad.addColorStop(0, '#f59e0b');
        grad.addColorStop(0.5, '#d97706');
        grad.addColorStop(1, '#92400e');
      } else if (preset.id === 'cat') {
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(0.5, '#6366f1');
        grad.addColorStop(1, '#a855f7');
      } else if (preset.id === 'friends') {
        grad.addColorStop(0, '#fb7185');
        grad.addColorStop(0.5, '#f97316');
        grad.addColorStop(1, '#fbbf24');
      } else if (preset.id === 'sunset') {
        grad.addColorStop(0, '#831843');
        grad.addColorStop(0.4, '#e11d48');
        grad.addColorStop(0.8, '#f59e0b');
        grad.addColorStop(1, '#0284c7');
      } else {
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(0.5, '#4f46e5');
        grad.addColorStop(1, '#06b6d4');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 400);

      // Draw large emoji icon in center
      ctx.font = '120px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(preset.thumbnail, 200, 200);

      const dataUrl = canvas.toDataURL('image/png');
      onSetCustomPhotoUrl(dataUrl);
      onSelectTheme('photo_custom');
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('blockblast_custom_photo', dataUrl);
        } catch {}
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in select-none">
      <div className="relative w-full max-w-sm rounded-[32px] bg-[#1e2330] border-[3.5px] border-[#4f586d] p-5 shadow-2xl text-white max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#343d52] mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-wide text-white">Customize Skins</h2>
              <p className="text-[11px] text-slate-400">Personalize your Block Blast experience</p>
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

        {/* Tab Switcher: UPLOAD IMAGE vs NEW SKINS */}
        <div className="flex p-1 bg-[#151922] rounded-xl border border-[#2d3546] mb-4 gap-1">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('photo');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'photo'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Image</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('skins');
            }}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'skins'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>New Skins</span>
          </button>
        </div>

        {/* Tab 1: Upload Your Image (Matching Screenshot_20261106_130420_d33825ef.jpg) */}
        {activeTab === 'photo' && (
          <div className="flex flex-col gap-3">
            {/* Upload Button Box */}
            <label className="relative w-full py-4 px-4 rounded-2xl bg-gradient-to-b from-[#25334d] to-[#1a2334] border-2 border-dashed border-sky-400/60 hover:border-sky-300 flex flex-col items-center justify-center cursor-pointer transition-all group active:scale-[0.98]">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-sm font-black text-white">Upload Your Photo</span>
              <span className="text-[10px] text-sky-200">Tiles your picture across the 8x8 grid!</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Current Custom Photo Preview */}
            {customPhotoUrl && (
              <div className="p-3 rounded-xl bg-[#141924] border border-sky-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={customPhotoUrl}
                    alt="Custom skin preview"
                    className="w-10 h-10 rounded-lg object-cover border border-white/40"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">Active Custom Photo</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Applied to game board
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onSelectTheme('photo_custom');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    currentTheme === 'photo_custom'
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  {currentTheme === 'photo_custom' ? 'Selected' : 'Use'}
                </button>
              </div>
            )}

            {/* Preset Gallery */}
            <div>
              <span className="text-xs font-bold text-slate-300 block mb-2">Or choose popular presets:</span>
              <div className="grid grid-cols-2 gap-2">
                {PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="p-2.5 rounded-xl bg-[#141924] border border-[#2d3546] hover:border-sky-400 hover:bg-[#1a2130] transition-all flex items-center gap-2.5 text-left cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 border border-white/20 flex items-center justify-center text-xl shrink-0 shadow-sm">
                      {preset.thumbnail}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">{preset.name}</span>
                      <span className="text-[10px] text-slate-400">{preset.tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: New Skins (Matching Screenshot_20261106_130401_761e9ae2.jpg) */}
        {activeTab === 'skins' && (
          <div className="grid grid-cols-2 gap-2 max-h-[55vh] overflow-y-auto pr-1">
            {Object.values(BOARD_THEMES)
              .filter((t) => t.id !== 'photo_custom')
              .map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectTheme(theme.id);
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1b2333] border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] ring-1 ring-cyan-400'
                        : 'bg-[#141924] border-[#2c3344] hover:border-slate-500 hover:bg-[#181e2b]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${theme.previewGradient} border border-white/20 shadow-sm flex items-center justify-center text-white text-xs font-black`}>
                        {theme.id === 'cheese' ? '🧀' : theme.id === 'watermelon' ? '🍉' : theme.id === 'wood' ? '🪵' : theme.id === 'neon' ? '⚡' : '■'}
                      </div>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">{theme.name}</span>
                      <span className="text-[9px] text-slate-400 block line-clamp-1">{theme.tagline}</span>
                    </div>
                  </button>
                );
              })}
          </div>
        )}

        {/* Back / Done Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-black text-white shadow-md transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
