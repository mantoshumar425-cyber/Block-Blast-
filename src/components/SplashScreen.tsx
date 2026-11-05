/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { sounds } from '../utils/audio';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      onClick={() => {
        sounds.playClick();
        onComplete();
      }}
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-between py-12 px-4 cursor-pointer select-none bg-gradient-to-b from-[#0165ea] via-[#005fe0] to-[#004bbd]"
    >
      {/* Top spacing */}
      <div className="w-full flex justify-end" />

      {/* Main Logo Lockup */}
      <div className="flex flex-col items-center justify-center -mt-10 animate-fade-in">
        {/* BLOCK BLAST 3D Logo */}
        <div className="relative flex flex-col items-center drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
          {/* BLOCK Letters row */}
          <div className="relative flex items-end justify-center select-none font-black text-6xl sm:text-7xl tracking-tight">
            {/* B - Orange */}
            <span
              className="inline-block transform -rotate-3 text-[#ff8800] drop-shadow-[0_6px_0_#b34700]"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #b34700, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              B
            </span>

            {/* L - Sky Blue */}
            <span
              className="inline-block transform rotate-2 text-[#00b0ff] -ml-1 drop-shadow-[0_6px_0_#006ab3]"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #006ab3, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              L
            </span>

            {/* O - Red with Crown */}
            <div className="relative inline-block -mx-1">
              {/* Gold Crown */}
              <div className="absolute -top-6 sm:-top-7 left-1/2 transform -translate-x-1/2 -rotate-12 pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] z-20">
                <svg className="w-10 h-8 sm:w-12 sm:h-9" viewBox="0 0 48 36" fill="none">
                  <path
                    d="M6 30L3 10L15 18L24 6L33 18L45 10L42 30H6Z"
                    fill="url(#crown-gold)"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="24" cy="5" r="2.5" fill="#ffe082" stroke="#fff" strokeWidth="1" />
                  <circle cx="3" cy="9" r="2.5" fill="#ffe082" stroke="#fff" strokeWidth="1" />
                  <circle cx="45" cy="9" r="2.5" fill="#ffe082" stroke="#fff" strokeWidth="1" />
                  <defs>
                    <linearGradient id="crown-gold" x1="24" y1="6" x2="24" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffd54f" />
                      <stop offset="1" stopColor="#ff8f00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <span
                className="inline-block text-[#ff2e43]"
                style={{
                  WebkitTextStroke: '3px #ffffff',
                  paintOrder: 'stroke fill',
                  textShadow: '0 6px 0 #990012, 0 10px 14px rgba(0,0,0,0.4)',
                }}
              >
                O
              </span>
            </div>

            {/* C - Yellow */}
            <span
              className="inline-block transform -rotate-2 text-[#ffcc00] -ml-1 drop-shadow-[0_6px_0_#b38600]"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #b38600, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              C
            </span>

            {/* K - Purple */}
            <span
              className="inline-block transform rotate-3 text-[#b845ff] -ml-1 drop-shadow-[0_6px_0_#6900b3]"
              style={{
                WebkitTextStroke: '3px #ffffff',
                paintOrder: 'stroke fill',
                textShadow: '0 6px 0 #6900b3, 0 10px 14px rgba(0,0,0,0.4)',
              }}
            >
              K
            </span>
          </div>

          {/* BLAST in 3D italic cyan */}
          <div
            className="text-5xl sm:text-6xl font-black italic tracking-wide text-[#2ad8ff] -mt-2 sm:-mt-3"
            style={{
              WebkitTextStroke: '2.5px #ffffff',
              paintOrder: 'stroke fill',
              textShadow: '0 5px 0 #005f99, 0 8px 16px rgba(0,0,0,0.4)',
            }}
          >
            BLAST
          </div>

          {/* ADVENTURE MASTER */}
          <div
            className="text-[13px] sm:text-sm font-extrabold tracking-[0.25em] text-[#38e1ff] uppercase mt-0.5"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.4)',
            }}
          >
            ADVENTURE MASTER
          </div>
        </div>

        {/* Center Golden Block Tumbling Animation */}
        <div className="mt-28 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center animate-bounce duration-1000">
            {/* 4-block stair shape tumbling in 3D */}
            <div className="relative transform rotate-12 transition-transform">
              {/* Block 1 */}
              <div
                className="absolute w-7 h-7 rounded-md border-[2px] shadow-md"
                style={{
                  top: '0px',
                  left: '26px',
                  backgroundColor: '#f59e0b',
                  borderColor: '#fde047 #854d0e #854d0e #fde047',
                }}
              >
                <div className="absolute inset-[1.5px] rounded-[3px] bg-[#d97706]" />
              </div>

              {/* Block 2 */}
              <div
                className="absolute w-7 h-7 rounded-md border-[2px] shadow-md"
                style={{
                  top: '22px',
                  left: '26px',
                  backgroundColor: '#f59e0b',
                  borderColor: '#fde047 #854d0e #854d0e #fde047',
                }}
              >
                <div className="absolute inset-[1.5px] rounded-[3px] bg-[#d97706]" />
              </div>

              {/* Block 3 */}
              <div
                className="absolute w-7 h-7 rounded-md border-[2px] shadow-md"
                style={{
                  top: '22px',
                  left: '4px',
                  backgroundColor: '#f59e0b',
                  borderColor: '#fde047 #854d0e #854d0e #fde047',
                }}
              >
                <div className="absolute inset-[1.5px] rounded-[3px] bg-[#d97706]" />
              </div>

              {/* Block 4 */}
              <div
                className="absolute w-7 h-7 rounded-md border-[2px] shadow-md"
                style={{
                  top: '44px',
                  left: '4px',
                  backgroundColor: '#f59e0b',
                  borderColor: '#fde047 #854d0e #854d0e #fde047',
                }}
              >
                <div className="absolute inset-[1.5px] rounded-[3px] bg-[#d97706]" />
              </div>
            </div>
          </div>

          <div className="text-xs text-blue-200/80 font-bold tracking-widest uppercase mt-8 animate-pulse">
            Tap anywhere to start
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="w-full text-center text-[11px] text-blue-300/60 font-medium">
        Block Blast! Adventure Master
      </div>
    </div>
  );
};
