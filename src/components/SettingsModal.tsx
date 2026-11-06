/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Volume2, VolumeX, Music, Smartphone, Home, RotateCw, Shirt } from 'lucide-react';
import { sounds } from '../utils/audio';
import { BoardTheme } from '../types/game';
import { BOARD_THEMES } from '../utils/themes';

interface SettingsModalProps {
  onClose: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
  currentTheme: BoardTheme;
  onThemeChange: (theme: BoardTheme) => void;
  onHome?: () => void;
  onReplay?: () => void;
  onOpenMoreGames?: () => void;
  onOpenMoreSettings?: () => void;
  onOpenSkinShop?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  isMuted,
  onToggleMute,
  hapticsEnabled,
  onToggleHaptics,
  currentTheme,
  onThemeChange,
  onHome,
  onReplay,
  onOpenMoreGames,
  onOpenMoreSettings,
  onOpenSkinShop,
}) => {
  const [vibrationLevel, setVibrationLevel] = useState<number>(() => sounds.getVibrationLevel());
  const [bgmMuted, setBgmMuted] = useState<boolean>(() => sounds.getMusicVolume() === 0 || isMuted);

  const handleToggleSound = () => {
    sounds.playClick();
    onToggleMute();
  };

  const handleToggleBGM = () => {
    sounds.playClick();
    if (bgmMuted) {
      sounds.setMusicVolume(0.45);
      setBgmMuted(false);
    } else {
      sounds.setMusicVolume(0);
      setBgmMuted(true);
    }
  };

  const handleSetVibrationLevel = (lvl: number) => {
    sounds.playClick();
    const clamped = Math.max(0, Math.min(3, lvl));
    setVibrationLevel(clamped);
    sounds.setVibrationLevel(clamped);
    if (clamped > 0) {
      sounds.triggerHaptic('place');
    }
  };

  // Cycle skins
  const themeKeys: BoardTheme[] = ['classic_slate', 'sky_blue', 'midnight', 'neon', 'solar', 'emerald'];
  const handleCycleSkin = () => {
    sounds.playClick();
    const currentIdx = themeKeys.indexOf(currentTheme);
    const nextIdx = (currentIdx + 1) % themeKeys.length;
    onThemeChange(themeKeys[nextIdx]);
  };

  const currentSkinName = BOARD_THEMES[currentTheme]?.name || 'Default Skin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in select-none">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] rounded-[32px] bg-[#3f4249] border-[3.5px] border-[#767982] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white">
        {/* Header: Centered "Settings" and Top-Right Close Button */}
        <div className="relative flex items-center justify-center pb-2 mb-2">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#f3f4f6] tracking-wide"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            }}
          >
            Settings
          </h2>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute right-0 top-0 p-1 text-[#a5a8b2] hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6 stroke-[3]" />
          </button>
        </div>

        {/* Top Control Section: Sound, BGM, Vibration */}
        <div className="flex items-start justify-around pt-2 pb-4 border-b border-[#525660]">
          {/* 1. Sound Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleToggleSound}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md ${
                isMuted
                  ? 'bg-[#2b2d32] border-2 border-[#525660] text-slate-400'
                  : 'bg-[#555963] border-2 border-[#828691] text-white hover:bg-[#5f636e]'
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-7 h-7 text-rose-400" />
              ) : (
                <Volume2 className="w-7 h-7 fill-white text-white" />
              )}
            </button>
            <span className="mt-2 text-xs font-bold text-slate-200 tracking-wide">Sound</span>
          </div>

          {/* 2. BGM Button */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleToggleBGM}
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md ${
                bgmMuted
                  ? 'bg-[#2b2d32] border-2 border-[#525660] text-slate-400'
                  : 'bg-[#555963] border-2 border-[#828691] text-white hover:bg-[#5f636e]'
              }`}
            >
              <Music className="w-7 h-7 stroke-[2.5]" />
              {/* Red diagonal slash when muted */}
              {bgmMuted && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-1 bg-[#ff263b] rotate-45 rounded-full shadow-sm" />
                </div>
              )}
            </button>
            <span className="mt-2 text-xs font-bold text-slate-200 tracking-wide">BGM</span>
          </div>

          {/* 3. Vibration Button with Level Controller */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <button
                onClick={() => handleSetVibrationLevel(vibrationLevel > 0 ? 0 : 2)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md ${
                  vibrationLevel === 0
                    ? 'bg-[#2b2d32] border-2 border-[#525660] text-slate-400'
                    : 'bg-[#555963] border-2 border-[#828691] text-white hover:bg-[#5f636e]'
                }`}
              >
                <Smartphone className="w-7 h-7 stroke-[2.5]" />
              </button>

              {/* Red notification dot on vibration icon */}
              <div className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#ff263b] border-2 border-[#3f4249]" />
            </div>

            <span className="mt-2 text-xs font-bold text-slate-200 tracking-wide">Vibration</span>

            {/* Stepper buttons: [-] ●-- [+] */}
            <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2c2e33] border border-[#50545f]">
              <button
                onClick={() => handleSetVibrationLevel(vibrationLevel - 1)}
                className="text-xs font-bold text-slate-400 hover:text-white px-0.5 cursor-pointer"
                title="Decrease vibration"
              >
                -
              </button>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((lvl) => (
                  <div
                    key={lvl}
                    onClick={() => handleSetVibrationLevel(lvl)}
                    className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                      vibrationLevel >= lvl ? 'bg-[#ffcc00]' : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleSetVibrationLevel(vibrationLevel + 1)}
                className="text-xs font-bold text-slate-400 hover:text-white px-0.5 cursor-pointer"
                title="Increase vibration"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Haptic Feedback Intensity Slider */}
        <div className="mt-3 mb-1 px-3.5 py-2.5 rounded-2xl bg-[#2d3036] border border-[#50545f]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-slate-200">Haptic Intensity Slider</span>
            <span className="font-black text-[#ffcc00] uppercase text-[11px] tracking-wide">
              {vibrationLevel === 0 ? 'Off' : vibrationLevel === 1 ? 'Light' : vibrationLevel === 2 ? 'Medium' : 'Heavy'}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={vibrationLevel}
            onChange={(e) => handleSetVibrationLevel(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#3f4249] rounded-lg appearance-none cursor-pointer accent-[#ffcc00]"
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1 px-0.5">
            <span className={vibrationLevel === 0 ? 'text-[#ffcc00]' : ''}>Off</span>
            <span className={vibrationLevel === 1 ? 'text-[#ffcc00]' : ''}>Light</span>
            <span className={vibrationLevel === 2 ? 'text-[#ffcc00]' : ''}>Medium</span>
            <span className={vibrationLevel === 3 ? 'text-[#ffcc00]' : ''}>Heavy</span>
          </div>
        </div>

        {/* Vertical Stack of Chunky Beveled Buttons matching Screenshot */}
        <div className="flex flex-col gap-3 pt-3">
          {/* Button 1: More Games - Green */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              if (onOpenMoreGames) onOpenMoreGames();
            }}
            className="group relative w-full h-12 rounded-xl bg-gradient-to-b from-[#00d426] via-[#00bd20] to-[#00a319] border-t-2 border-l border-white/60 border-b-4 border-r border-[#006e12] shadow-[0_4px_0_#006e12] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-start px-5 gap-4 cursor-pointer"
          >
            {/* Gamepad Icon */}
            <svg className="w-6 h-6 text-white fill-white shrink-0 drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M6 7.5a4.5 4.5 0 0 0-4.5 4.5v3a4.5 4.5 0 0 0 7.64 3.22l2.36-2.36h5l2.36 2.36A4.5 4.5 0 0 0 22.5 15v-3A4.5 4.5 0 0 0 18 7.5H6zm0 3h1.5v1.5H9v1.5H7.5V15H6v-1.5H4.5V12H6v-1.5zm11 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>

            <span className="text-xl font-bold italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
              More Games
            </span>

            {/* Red dot badge in corner */}
            <div className="absolute top-1.5 right-2 w-3 h-3 rounded-full bg-[#ff263b] border border-white" />
          </button>

          {/* Button 2: More Settings - Green */}
          <button
            onClick={() => {
              sounds.playClick();
              if (onOpenMoreSettings) onOpenMoreSettings();
            }}
            className="group relative w-full h-12 rounded-xl bg-gradient-to-b from-[#00d426] via-[#00bd20] to-[#00a319] border-t-2 border-l border-white/60 border-b-4 border-r border-[#006e12] shadow-[0_4px_0_#006e12] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-start px-5 gap-4 cursor-pointer"
          >
            {/* Twin Gears Icon */}
            <div className="flex items-center shrink-0">
              <svg className="w-6 h-6 text-white shrink-0 drop-shadow-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>

            <span className="text-xl font-bold italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
              More Settings
            </span>

            {/* Red dot badge in corner */}
            <div className="absolute top-1.5 right-2 w-3 h-3 rounded-full bg-[#ff263b] border border-white" />
          </button>

          {/* Button 3: Home - Green */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              if (onHome) onHome();
            }}
            className="group relative w-full h-12 rounded-xl bg-gradient-to-b from-[#00d426] via-[#00bd20] to-[#00a319] border-t-2 border-l border-white/60 border-b-4 border-r border-[#006e12] shadow-[0_4px_0_#006e12] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-start px-5 gap-4 cursor-pointer"
          >
            <Home className="w-6 h-6 text-white stroke-[2.8] shrink-0 drop-shadow-sm" />
            <span className="text-xl font-bold italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
              Home
            </span>
          </button>

          {/* Button 4: Replay - Green */}
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
              if (onReplay) onReplay();
            }}
            className="group relative w-full h-12 rounded-xl bg-gradient-to-b from-[#00d426] via-[#00bd20] to-[#00a319] border-t-2 border-l border-white/60 border-b-4 border-r border-[#006e12] shadow-[0_4px_0_#006e12] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-start px-5 gap-4 cursor-pointer"
          >
            <RotateCw className="w-6 h-6 text-white stroke-[2.8] shrink-0 drop-shadow-sm" />
            <span className="text-xl font-bold italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
              Replay
            </span>
          </button>

          {/* Button 5: Default Skin - Sky Blue */}
          <button
            onClick={() => {
              if (onOpenSkinShop) {
                sounds.playClick();
                onOpenSkinShop();
              } else {
                handleCycleSkin();
              }
            }}
            className="group relative w-full h-12 rounded-xl bg-gradient-to-b from-[#00a8ff] via-[#0094e8] to-[#007cc7] border-t-2 border-l border-white/60 border-b-4 border-r border-[#00528a] shadow-[0_4px_0_#00528a] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-start px-5 gap-4 cursor-pointer"
            title="Click to change board skin"
          >
            <Shirt className="w-6 h-6 text-white stroke-[2.8] shrink-0 drop-shadow-sm" />
            <span className="text-xl font-bold italic tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
              {currentSkinName}
            </span>
          </button>
        </div>

        {/* Bottom Metadata Matching Screenshot */}
        <div className="mt-4 text-center font-mono text-[9px] text-slate-500/80 leading-tight space-y-0.5 select-none pointer-events-none">
          <div>1.5.32.0.0</div>
          <div>52090902,31432203,31430501,56600202,83162715,56550202</div>
          <div>1000001398</div>
        </div>
      </div>
    </div>
  );
};
